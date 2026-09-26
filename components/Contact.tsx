import React from 'react';
import { CONTACT, WHATSAPP_DEMO_TEXT, mailtoLink, telLink, whatsappLink } from '../constants';

// No contact form by design (see CLAUDE.md). "Book a demo" CTAs across the site land here.
const Contact: React.FC = () => {
  const channels = [
    { icon: 'fa-brands fa-whatsapp', title: 'WhatsApp', value: CONTACT.phoneDisplay, href: whatsappLink(WHATSAPP_DEMO_TEXT), external: true },
    { icon: 'fa-solid fa-phone', title: 'Call', value: CONTACT.phoneDisplay, href: telLink },
    { icon: 'fa-solid fa-envelope', title: 'Email', value: CONTACT.email, href: mailtoLink('Book a demo') },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 relative overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Book a demo</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
              Let's talk about <br />
              <span className="gradient-text italic">your business.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 text-xl leading-relaxed max-w-lg font-medium">
              Tell us how you handle calls and messages today. We'll show you how an AI agent could help, in a short demo built around your business.
            </p>

            <div className="space-y-8 mb-12">
              {channels.map((c) => (
                <div key={c.title} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2BB6C6] shadow-xl group-hover:scale-110 transition-transform">
                    <i className={c.icon} aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white font-bold mb-1">{c.title}</h3>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-[#2BB6C6] font-bold hover:underline"
                    >
                      {c.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#2BB6C6]/20 to-[#1e266e]/20 blur-[60px] opacity-30 pointer-events-none"></div>
            <div className="relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl space-y-8 text-center">
              <div className="w-20 h-20 bg-[#2BB6C6]/10 text-[#2BB6C6] rounded-3xl flex items-center justify-center mx-auto mb-2 text-3xl shadow-inner border border-[#2BB6C6]/20">
                <i className="fa-solid fa-calendar-check" aria-hidden="true"></i>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  Book your <br />
                  <span className="text-[#2BB6C6]">demo</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed px-4">
                  Pick whichever is easiest for you. There's no form to fill.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <a
                  href={whatsappLink(WHATSAPP_DEMO_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#2BB6C6]/30 flex items-center justify-center gap-3"
                >
                  <i className="fa-brands fa-whatsapp text-xl" aria-hidden="true"></i>
                  <span>Book on WhatsApp</span>
                </a>

                <a
                  href={telLink}
                  className="w-full py-5 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-2xl text-lg hover:bg-white dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <span>Call {CONTACT.phoneDisplay}</span>
                </a>

                <a
                  href={mailtoLink('Book a demo')}
                  className="w-full py-5 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-2xl text-lg hover:bg-white dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  <span>Email us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
