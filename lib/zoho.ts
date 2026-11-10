// Zoho CRM (India data centre) client for website leads. Setup: SETUP-ZOHO.md.
// Docs: https://www.zoho.com/crm/developer/docs/api/v8/refresh.html
//       https://www.zoho.com/crm/developer/docs/api/v8/insert-records.html
import type { LeadInput } from './lead';

export interface ZohoEnv {
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_LEAD_SOURCE?: string; // optional: must match a value in the Lead Source picklist
}

const ACCOUNTS_URL = 'https://accounts.zoho.in';
const DEFAULT_API_DOMAIN = 'https://www.zohoapis.in';

export const isZohoConfigured = (env: ZohoEnv) =>
  Boolean(env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN);

// Access tokens last an hour. Reuse one per worker instance so we don't refresh on every lead
// (Zoho limits how often a refresh token can mint new access tokens).
let cached: { token: string; apiDomain: string; exp: number } | null = null;

async function getAccessToken(env: ZohoEnv): Promise<{ token: string; apiDomain: string }> {
  if (cached && cached.exp > Date.now()) return cached;

  const params = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN!,
    client_id: env.ZOHO_CLIENT_ID!,
    client_secret: env.ZOHO_CLIENT_SECRET!,
    grant_type: 'refresh_token',
  });
  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token`, { method: 'POST', body: params });
  const data = await res.json() as { access_token?: string; api_domain?: string; expires_in?: number; error?: string };
  if (!res.ok || !data.access_token) throw new Error(`Zoho token refresh failed: ${data.error ?? res.status}`);

  const apiDomain = data.api_domain?.startsWith('https://www.zohoapis.') ? data.api_domain : DEFAULT_API_DOMAIN;
  const ttlMs = (data.expires_in ?? 3600) * 1000;
  cached = { token: data.access_token, apiDomain, exp: Date.now() + ttlMs - 5 * 60 * 1000 };
  return cached;
}

// "Priya Sharma" -> First_Name "Priya", Last_Name "Sharma". Single names go in Last_Name (required by Zoho).
const splitName = (name: string) => {
  const parts = name.split(/\s+/);
  return parts.length > 1
    ? { First_Name: parts.slice(0, -1).join(' '), Last_Name: parts[parts.length - 1] }
    : { Last_Name: name };
};

export async function createLead(env: ZohoEnv, lead: LeadInput): Promise<string> {
  const { token, apiDomain } = await getAccessToken(env);

  const description = [
    `Product interest: ${lead.product || 'Not specified'}`,
    `Message: ${lead.message || '(none)'}`,
    `Consent: agreed to be contacted about this enquiry by phone, WhatsApp or email (swarupsnxt.com form, ${new Date().toISOString()})`,
  ].join('\n');

  const record: Record<string, string> = {
    ...splitName(lead.name),
    Phone: lead.phone,
    Company: lead.company || 'Not provided',
    Description: description,
  };
  if (lead.email) record.Email = lead.email;
  if (env.ZOHO_LEAD_SOURCE) record.Lead_Source = env.ZOHO_LEAD_SOURCE;

  const res = await fetch(`${apiDomain}/crm/v8/Leads`, {
    method: 'POST',
    headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [record] }),
  });
  if (res.status === 401) cached = null; // token revoked or expired early; next request refreshes

  const data = await res.json().catch(() => ({})) as { data?: { status?: string; code?: string; details?: { id?: string } }[] };
  const result = data.data?.[0];
  if (!res.ok || result?.status !== 'success') {
    throw new Error(`Zoho insert failed: HTTP ${res.status} ${result?.code ?? ''} ${JSON.stringify(result ?? data).slice(0, 300)}`);
  }
  return result.details?.id ?? '';
}
