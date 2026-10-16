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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

// Accepts "+91 75500 07208", "07550007208", "(075) 5000-7208" etc.; keeps a leading + only.
export const normalisePhone = (phone: string) => {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.startsWith('+') ? `+${digits}` : digits;
};

export function validateLead(raw: Record<string, unknown>): { lead: LeadInput; errors: LeadErrors } {
  const lead: LeadInput = {
    name: str(raw.name),
    phone: normalisePhone(str(raw.phone)),
    email: str(raw.email),
    company: str(raw.company),
    product: str(raw.product),
    message: str(raw.message),
    consent: raw.consent === true,
  };

  const errors: LeadErrors = {};
  if (lead.name.length < 2) errors.name = 'Please enter your name.';
  else if (lead.name.length > LEAD_LIMITS.name) errors.name = `Please keep your name under ${LEAD_LIMITS.name} characters.`;

  const digitCount = lead.phone.replace(/\D/g, '').length;
  if (digitCount < 10 || digitCount > 15) errors.phone = 'Please enter a valid phone number (10 to 15 digits).';

  if (lead.email && (lead.email.length > LEAD_LIMITS.email || !EMAIL_PATTERN.test(lead.email))) {
    errors.email = 'Please enter a valid email address, or leave it blank.';
  }
  if (lead.company.length > LEAD_LIMITS.company) errors.company = `Please keep this under ${LEAD_LIMITS.company} characters.`;
  if (lead.product && !LEAD_PRODUCTS.includes(lead.product)) errors.product = 'Please pick an option from the list.';
  if (lead.message.length > LEAD_LIMITS.message) errors.message = `Please keep your message under ${LEAD_LIMITS.message} characters.`;
  if (!lead.consent) errors.consent = 'Please tick the box so we can contact you.';

  return { lead, errors };
}
