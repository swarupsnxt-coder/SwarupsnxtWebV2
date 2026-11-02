import React, { useEffect, useId, useRef, useState } from 'react';
import { CONTACT, mailtoLink, telLink, whatsappLink } from '../constants';
import { LEAD_LIMITS, LEAD_PRODUCTS, LeadErrors, LeadField, LeadInput, validateLead } from '../lib/lead';
import { TURNSTILE_SITE_KEY, getTurnstileToken, removeTurnstile } from './turnstile';

// Enquiry form -> /api/lead -> Zoho CRM (setup: SETUP-ZOHO.md). If anything fails, the visitor
// gets a one-tap WhatsApp message prefilled with what they typed, plus Call and Email.

interface LeadFormProps {
  onPrivacyClick: () => void;
  initialProduct?: string;
}

type Status = 'idle' | 'sending' | 'success' | 'fallback';

const FIELD_ORDER: LeadField[] = ['name', 'phone', 'email', 'company', 'product', 'message', 'consent'];

const inputClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:border-[#2BB6C6] focus:ring-2 focus:ring-[#2BB6C6]/20 disabled:opacity-60 ${
    invalid ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
  }`;

const whatsappSummary = (v: LeadInput) =>
  [
    "Hi Swarups NXT, I'd like to book a demo.",
    v.name && `Name: ${v.name}`,
    v.phone && `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    v.company && `Company: ${v.company}`,
    v.product && `Interested in: ${v.product}`,
    v.message && `Message: ${v.message.slice(0, 500)}`,
  ].filter(Boolean).join('\n');

const LeadForm: React.FC<LeadFormProps> = ({ onPrivacyClick, initialProduct = '' }) => {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const [values, setValues] = useState<LeadInput>({
    name: '', phone: '', email: '', company: '', product: initialProduct, message: '', consent: false,
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<LeadErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const widgetHostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => () => removeTurnstile(widgetIdRef), []);

  const update = <K extends LeadField>(field: K, value: LeadInput[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // After the first submit, re-check as the visitor fixes things.
    if (attempted) setErrors(validateLead(next as unknown as Record<string, unknown>).errors);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setAttempted(true);

    const { lead, errors: found } = validateLead(values as unknown as Record<string, unknown>);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find(f => found[f]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }

    if (!TURNSTILE_SITE_KEY) { setStatus('fallback'); return; }

    setStatus('sending');
    try {
      const turnstileToken = await getTurnstileToken(widgetHostRef.current, widgetIdRef);
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, website: honeypot, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        setStatus('success');
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus('idle');
      } else {
        setStatus('fallback');
      }
    } catch (err) {
      console.error('Lead form error:', err);
      setStatus('fallback');
    } finally {
      removeTurnstile(widgetIdRef);
    }
  };

  if (status === 'success') {
    const firstName = values.name.trim().split(/\s+/)[0];
    return (
      <div className="text-center space-y-5 py-6 animate-fadeIn" role="status">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2BB6C6]/10 text-[#2BB6C6] border border-[#2BB6C6]/20 flex items-center justify-center text-2xl">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">Thanks{firstName ? `, ${firstName}` : ''}!</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We've received your details and will get back to you during our support hours ({CONTACT.supportHours.time}, Mon–Fri).
          </p>
        </div>
        <a
          href={whatsappLink(whatsappSummary(values))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:underline"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Need us sooner? Message us on WhatsApp
        </a>
      </div>
    );
  }

  if (status === 'fallback') {
    const secondary = 'w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-[#2BB6C6] transition-colors';
    return (
      <div className="text-center space-y-5 animate-fadeIn" role="alert">
        <div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">We couldn't send the form just now</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your details aren't lost. Send them to us on WhatsApp in one tap, or call or email us.
          </p>
        </div>
        <a
          href={whatsappLink(whatsappSummary(values))}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-[#2BB6C6] text-[#0f172a] font-black rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2BB6C6]/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i>
          Send these details on WhatsApp
        </a>
        <div className="grid grid-cols-2 gap-2">
          <a href={telLink} className={secondary}><i className="fa-solid fa-phone" aria-hidden="true"></i>Call</a>
          <a href={mailtoLink('Book a demo')} className={secondary}><i className="fa-solid fa-envelope" aria-hidden="true"></i>Email</a>
        </div>
        <button type="button" onClick={() => setStatus('idle')} className="text-xs font-bold text-slate-500 hover:text-[#2BB6C6] transition-colors">
          Back to the form
        </button>
      </div>
    );
  }

  const sending = status === 'sending';
  const errorFor = (field: LeadField) =>
    errors[field] ? <p id={id(`${field}-error`)} className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[field]}</p> : null;
  const a11y = (field: LeadField) => ({
    id: id(field),
    'aria-invalid': Boolean(errors[field]) || undefined,
    'aria-describedby': errors[field] ? id(`${field}-error`) : undefined,
  });
  const label = (field: LeadField, text: string, optional = false) => (
    <label htmlFor={id(field)} className="block mb-1.5 text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
      {text}{optional && <span className="ml-1 normal-case tracking-normal font-medium text-slate-400">(optional)</span>}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 text-left">
      <fieldset disabled={sending} className="space-y-4">
        <legend className="sr-only">Book a demo</legend>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            {label('name', 'Name')}
            <input {...a11y('name')} type="text" autoComplete="name" maxLength={LEAD_LIMITS.name} required
              value={values.name} onChange={e => update('name', e.target.value)} className={inputClass(!!errors.name)} />
            {errorFor('name')}
          </div>
          <div>
            {label('phone', 'Phone / WhatsApp')}
            <input {...a11y('phone')} type="tel" autoComplete="tel" inputMode="tel" maxLength={20} required placeholder="+91"
              value={values.phone} onChange={e => update('phone', e.target.value)} className={inputClass(!!errors.phone)} />
            {errorFor('phone')}
          </div>
          <div>
            {label('email', 'Email', true)}
            <input {...a11y('email')} type="email" autoComplete="email" maxLength={LEAD_LIMITS.email}
              value={values.email} onChange={e => update('email', e.target.value)} className={inputClass(!!errors.email)} />
            {errorFor('email')}
          </div>
          <div>
            {label('company', 'Company', true)}
            <input {...a11y('company')} type="text" autoComplete="organization" maxLength={LEAD_LIMITS.company}
              value={values.company} onChange={e => update('company', e.target.value)} className={inputClass(!!errors.company)} />
            {errorFor('company')}
          </div>
        </div>

        <div>
          {label('product', 'Interested in', true)}
          <select {...a11y('product')} value={values.product} onChange={e => update('product', e.target.value)} className={inputClass(!!errors.product)}>
            <option value="">Choose a product</option>
            {LEAD_PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errorFor('product')}
        </div>

        <div>
          {label('message', 'How do you handle calls and messages today?', true)}
          <textarea {...a11y('message')} rows={3} maxLength={LEAD_LIMITS.message}
            value={values.message} onChange={e => update('message', e.target.value)} className={`${inputClass(!!errors.message)} resize-y`} />
          {errorFor('message')}
        </div>

        {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
        <div className="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor={id('website')}>Website</label>
          <input id={id('website')} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input {...a11y('consent')} type="checkbox" checked={values.consent} onChange={e => update('consent', e.target.checked)}
              className="mt-1 w-4 h-4 shrink-0 accent-[#2BB6C6]" />
            <label htmlFor={id('consent')} className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              I agree that Swarups NXT may contact me about this enquiry by phone, WhatsApp or email. See our{' '}
              <button type="button" onClick={onPrivacyClick} className="font-bold text-[#2BB6C6] hover:underline">Privacy Policy</button>.
            </label>
          </div>
          {errorFor('consent')}
        </div>
      </fieldset>

      <div ref={widgetHostRef} className="empty:hidden"></div>

      <button
        type="submit"
        disabled={sending}
        className="w-full py-4 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#2BB6C6]/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
      >
        {sending
          ? <><i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i><span>Sending…</span></>
          : <><i className="fa-solid fa-calendar-check" aria-hidden="true"></i><span>Book my demo</span></>}
      </button>
    </form>
  );
};

export default LeadForm;
