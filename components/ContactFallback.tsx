import React from 'react';
import { CONTACT, WHATSAPP_DEMO_TEXT, mailtoLink, telLink, whatsappLink } from '../constants';

interface ContactFallbackProps {
  title?: string;
  message?: string;
  compact?: boolean;
}

// Shown wherever an AI feature is unavailable, so visitors always have a way to reach us.
const ContactFallback: React.FC<ContactFallbackProps> = ({
  title = 'This demo is being upgraded',
  message = 'Talk to us directly and we\'ll show you what an AI agent can do for your business.',
  compact = false,
}) => {
  const actions = [
    { label: 'Book a demo', icon: 'fa-solid fa-calendar-check', href: '#contact', primary: true },
    { label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: whatsappLink(WHATSAPP_DEMO_TEXT), external: true },
    { label: 'Call', icon: 'fa-solid fa-phone', href: telLink },
    { label: 'Email', icon: 'fa-solid fa-envelope', href: mailtoLink('Book a demo') },
  ];

  return (
    <div className={`w-full text-center ${compact ? 'space-y-3' : 'space-y-5'}`}>
      <div>
        <p className={`font-bold text-slate-900 dark:text-white ${compact ? 'text-sm' : 'text-lg'}`}>{title}</p>
        <p className={`mt-1 text-slate-600 dark:text-slate-400 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>{message}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`flex items-center justify-center gap-2 rounded-xl font-bold transition-all hover:scale-[1.03] active:scale-95 ${compact ? 'py-2 text-xs' : 'py-3 text-sm'} ${
              a.primary
                ? 'bg-[#2BB6C6] text-[#0f172a] shadow-lg shadow-[#2BB6C6]/20'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-[#2BB6C6]'
            }`}
          >
            <i className={a.icon} aria-hidden="true"></i>
            <span>{a.label}</span>
          </a>
        ))}
      </div>
      {!compact && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {CONTACT.phoneDisplay} · {CONTACT.email}
        </p>
      )}
    </div>
  );
};

export default ContactFallback;
