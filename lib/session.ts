// Short-lived signed chat session: issued after a successful Turnstile check so visitors aren't
// challenged on every message. Format: base64url(JSON payload) + "." + base64url(HMAC-SHA256).
// The payload carries a message count, re-issued on every reply, to cap messages per session.

export const SESSION_TTL_MS = 30 * 60 * 1000;

export interface SessionPayload {
  sid: string;
  exp: number; // epoch ms
  n: number;   // messages used in this session
}

const encoder = new TextEncoder();

const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromBase64Url = (s: string) => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4);
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
};

const getKey = (secret: string) =>
  crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

export async function signSession(payload: SessionPayload, secret: string): Promise<string> {
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', await getKey(secret), encoder.encode(body)));
  return `${body}.${toBase64Url(sig)}`;
}

export async function verifySession(token: string, secret: string): Promise<SessionPayload | null> {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const ok = await crypto.subtle.verify('HMAC', await getKey(secret), fromBase64Url(sig), encoder.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    if (typeof payload.n !== 'number') return null;
    return payload;
  } catch {
    return null;
  }
}
