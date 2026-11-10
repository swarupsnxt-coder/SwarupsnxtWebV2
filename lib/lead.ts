// Lead form fields and validation, shared by components/LeadForm.tsx (instant feedback)
// and functions/api/lead.ts (the check that counts).
import { PRODUCTS } from '../constants';

export const LEAD_LIMITS = { name: 80, company: 100, email: 100, message: 1000 } as const;
export const LEAD_PRODUCTS = [...PRODUCTS.map(p => p.title), 'Not sure yet'];

export interface LeadInput {
  name: string;
  phone: string;
  email: string;
  company: string;
  product: string;
  message: string;
  consent: boolean;
}

export type LeadField = keyof LeadInput;
export type LeadErrors = Partial<Record<LeadField, string>>;

// Local part: letters, digits and . _ % + - (no leading, trailing or double dots).
// Domain: labels of letters/digits/hyphens, ending in a TLD of 2+ letters.
const EMAIL_PATTERN = /^[A-Za-z0-9_%+-]+(\.[A-Za-z0-9_%+-]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

// Frequent typos of popular email domains, so we can suggest the right one.
const EMAIL_DOMAIN_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com', 'gmail.cm': 'gmail.com', 'gnail.com': 'gmail.com',
  'yaho.com': 'yahoo.com', 'yahoo.con': 'yahoo.com', 'yhoo.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com', 'hotmail.con': 'hotmail.com', 'outlook.con': 'outlook.com', 'rediffmail.con': 'rediffmail.com',
};

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

// Only digits, spaces, dots, dashes and brackets, with an optional leading +.
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

// Indian numbers become +91XXXXXXXXXX ("75500 07208", "07550007208", "+91 75500-07208" ...).
// Other numbers must start with + and a country code. Returns '' if the number isn't valid.
export const normalisePhone = (phone: string) => {
  const trimmed = phone.trim();
  if (!PHONE_CHARS.test(trimmed)) return '';
  const digits = trimmed.replace(/\D/g, '');
  if (/^(\d)\1+$/.test(digits)) return ''; // 9999999999 and the like

  const indian = trimmed.startsWith('+')
    ? (digits.startsWith('91') ? digits.slice(2) : null)
    : digits.replace(/^(91|0)(?=\d{10}$)/, '');
  if (indian !== null) return /^[6-9]\d{9}$/.test(indian) ? `+91${indian}` : '';

  return /^[1-9]\d{7,14}$/.test(digits) ? `+${digits}` : '';
};

const phoneError = (raw: string) => {
  if (!raw) return 'Please enter your phone or WhatsApp number.';
  if (!PHONE_CHARS.test(raw)) return 'Please use digits only (spaces, dashes and a leading + are fine).';
  return normalisePhone(raw) ? '' : 'Please enter a valid 10-digit Indian mobile number, or +country code and number.';
};

const emailError = (email: string) => {
  if (!email) return '';
  if (email.length > LEAD_LIMITS.email || !EMAIL_PATTERN.test(email)) return 'Please enter a valid email address (like name@company.com), or leave it blank.';
  const [local, domain] = email.split('@');
  const fix = EMAIL_DOMAIN_TYPOS[domain.toLowerCase()];
  return fix ? `Did you mean ${local}@${fix}?` : '';
};

export function validateLead(raw: Record<string, unknown>): { lead: LeadInput; errors: LeadErrors } {
  const rawPhone = str(raw.phone);
  const lead: LeadInput = {
    name: str(raw.name),
    phone: normalisePhone(rawPhone),
    email: str(raw.email),
    company: str(raw.company),
    product: str(raw.product),
    message: str(raw.message),
    consent: raw.consent === true,
  };

  const errors: LeadErrors = {};
  if (lead.name.length < 2) errors.name = 'Please enter your name.';
  else if (lead.name.length > LEAD_LIMITS.name) errors.name = `Please keep your name under ${LEAD_LIMITS.name} characters.`;
  else if (!/\p{L}/u.test(lead.name) || /\d/.test(lead.name)) errors.name = 'Please enter your name using letters (no numbers).';

  const phoneMsg = phoneError(rawPhone);
  if (phoneMsg) errors.phone = phoneMsg;

  const emailMsg = emailError(lead.email);
  if (emailMsg) errors.email = emailMsg;
  if (lead.company.length > LEAD_LIMITS.company) errors.company = `Please keep this under ${LEAD_LIMITS.company} characters.`;
  if (lead.product && !LEAD_PRODUCTS.includes(lead.product)) errors.product = 'Please pick an option from the list.';
  if (lead.message.length > LEAD_LIMITS.message) errors.message = `Please keep your message under ${LEAD_LIMITS.message} characters.`;
  if (!lead.consent) errors.consent = 'Please tick the box so we can contact you.';

  return { lead, errors };
}
