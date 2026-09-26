// POST /api/chat — website assistant (Cloudflare Pages Function + Workers AI).
// Setup: see SETUP-AI.md. Never returns raw errors: on any failure the UI gets
// { fallback: true } and shows the contact card instead.

import { AiBinding, ChatMessage, generateReply } from '../../lib/llm';
import { CONTACT_MARKER, SYSTEM_PROMPT } from '../../lib/knowledge';
import { SESSION_TTL_MS, signSession, verifySession } from '../../lib/session';

interface Env {
  AI?: AiBinding;
  TURNSTILE_SECRET_KEY?: string;
  SESSION_SECRET?: string;
}

interface ChatRequest {
  messages?: { role?: string; content?: string }[];
  turnstileToken?: string;
  session?: string;
}

export const MAX_MESSAGE_CHARS = 500;
export const MAX_HISTORY_MESSAGES = 8;
export const MAX_MESSAGES_PER_SESSION = 20;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const fallback = (reason: string, extra: Record<string, unknown> = {}) =>
  json({ fallback: true, reason, showContact: true, ...extra });

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = await res.json() as { success?: boolean };
  return data.success === true;
}

// The UI can't render markdown; flatten anything the model sends anyway.
const toPlainText = (text: string) =>
  text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .trim();

const INTENT_PATTERN = /\b(book (a )?demo|whatsapp|call us|contact (us|our team)|get in touch)\b/i;

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.AI || !env.TURNSTILE_SECRET_KEY || !env.SESSION_SECRET) {
    console.error('Chat not configured: missing AI binding, TURNSTILE_SECRET_KEY or SESSION_SECRET');
    return fallback('not_configured');
  }

  let body: ChatRequest;
  try {
    body = await request.json() as ChatRequest;
  } catch {
    return json({ error: 'invalid_request' }, 400);
  }

  // Keep only well-formed user/assistant turns, capped in length and count.
  const history: ChatMessage[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content!.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .slice(-MAX_HISTORY_MESSAGES);

  const last = body.messages?.[body.messages.length - 1];
  if (!history.length || history[history.length - 1].role !== 'user' || typeof last?.content !== 'string') {
    return json({ error: 'invalid_request' }, 400);
  }
  if (last.content.trim().length > MAX_MESSAGE_CHARS) {
    return json({ error: 'message_too_long', limit: MAX_MESSAGE_CHARS }, 400);
  }

  // Session: reuse a valid signed session, otherwise require a fresh Turnstile token.
  let session = body.session ? await verifySession(body.session, env.SESSION_SECRET) : null;
  if (!session) {
    if (!body.turnstileToken) return fallback('verification_required', { needsVerification: true });
    try {
      const ok = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
      if (!ok) return fallback('verification_failed', { needsVerification: true });
    } catch (err) {
      console.error('Turnstile verification error:', err);
      return fallback('verification_error');
    }
    session = { sid: crypto.randomUUID(), exp: Date.now() + SESSION_TTL_MS, n: 0 };
  }

  if (session.n >= MAX_MESSAGES_PER_SESSION) {
    return json({ limitReached: true, showContact: true });
  }

  const nextSession = await signSession({ ...session, n: session.n + 1 }, env.SESSION_SECRET);

  try {
    const raw = await generateReply(env.AI, [{ role: 'system', content: SYSTEM_PROMPT }, ...history]);
    const hasMarker = raw.includes(CONTACT_MARKER);
    const reply = toPlainText(raw.split(CONTACT_MARKER).join('')).trim();
    const reachedCap = session.n + 1 >= MAX_MESSAGES_PER_SESSION;

    return json({
      reply,
      session: nextSession,
      showContact: hasMarker || INTENT_PATTERN.test(reply) || reachedCap,
      limitReached: reachedCap,
    });
  } catch (err) {
    console.error('Chat model error:', err);
    return fallback('model_error', { session: nextSession });
  }
};
