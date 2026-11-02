import React from 'react';

// Kept free of numbers and compliance claims (CLAUDE.md hard rules 1 and 3): each point says
// what is agreed with the client, not a guarantee.
const points = [
  {
    icon: 'fa-solid fa-signal',
    title: 'Uptime commitments in writing',
    desc: 'Service levels for each channel are set out in your agreement, so you know what to expect before you go live.',
  },
  {
    icon: 'fa-solid fa-code',
    title: 'APIs & webhooks for your CRM',
    desc: 'Send messages from your own systems and receive delivery and reply updates back. We confirm what each platform supports for your tools.',
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Data handling agreed upfront',
    desc: 'Before go-live, we agree with you what customer data is used, where it is stored and who can access it.',
  },
];

const Infrastructure: React.FC = () => {
  return (
    <section id="infrastructure" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2BB6C6_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
            Enterprise-grade <span className="gradient-text italic">infrastructure.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Built for high-volume sending, whether you're a growing business or a large enterprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {points.map((point) => (
            <div key={point.title} className="group text-center p-8 rounded-[2rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1e266e] flex items-center justify-center mx-auto mb-6 text-2xl text-[#2BB6C6] border border-slate-200 dark:border-[#2BB6C6]/20 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                <i className={point.icon} aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{point.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
