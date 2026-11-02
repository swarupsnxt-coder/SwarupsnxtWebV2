// POST /api/lead — website enquiry form -> Zoho CRM Leads (Cloudflare Pages Function).
// Setup: see SETUP-ZOHO.md. Never returns raw errors: on any failure the UI gets
// { fallback: true } and offers WhatsApp (prefilled with the visitor's details), Call and Email.

import { validateLead } from '../../lib/lead';
import { verifyTurnstile } from '../../lib/turnstile';
import { ZohoEnv, createLead, isZohoConfigured } from '../../lib/zoho';

interface Env extends ZohoEnv {
  TURNSTILE_SECRET_KEY?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const fallback = (reason: string) => json({ fallback: true, reason, showContact: true });

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.TURNSTILE_SECRET_KEY || !isZohoConfigured(env)) {
    console.error('Lead form not configured: missing TURNSTILE_SECRET_KEY or ZOHO_* secrets');
    return fallback('not_configured');
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid_request' }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success so bots don't retry.
  if (typeof body.website === 'string' && body.website.trim()) return json({ ok: true });

  const { lead, errors } = validateLead(body);
  if (Object.keys(errors).length) return json({ error: 'invalid_fields', errors }, 400);

  if (typeof body.turnstileToken !== 'string' || !body.turnstileToken) return fallback('verification_required');
  try {
    const ok = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
    if (!ok) return fallback('verification_failed');
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return fallback('verification_error');
  }

  try {
    await createLead(env, lead);
    return json({ ok: true });
  } catch (err) {
    console.error('Zoho lead error:', err);
    return fallback('crm_error');
  }
};
