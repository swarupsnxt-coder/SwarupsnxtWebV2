import React from 'react';

const WhyUs: React.FC = () => {
  const benefits = [
    {
      icon: 'fa-solid fa-language',
      title: 'Speaks your customers\' language',
      // TODO(confirm): language coverage per product/channel.
      desc: 'English, Hindi and other major Indian languages, including the everyday Hinglish your customers actually use.',
    },
    {
      icon: 'fa-solid fa-screwdriver-wrench',
      title: 'Setup handled for you',
      desc: 'We configure, train, launch and support your AI agent. No technical team needed on your side.',
    },
    {
      icon: 'fa-brands fa-whatsapp',
      title: 'Works on WhatsApp and phone',
      desc: 'Reach customers on the channels they already use every day — phone calls, WhatsApp, your website and social media.',
    },
    {
      icon: 'fa-solid fa-people-arrows',
      title: 'Human handover',
      // TODO(confirm): handover method (call transfer / chat handover / notification).
      desc: 'When a conversation needs a person, the AI passes it to your team, so no customer is left without an answer.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Why Swarups NXT</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">Built for <br /><span className="gradient-text italic">Indian businesses</span></h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Fewer missed calls, faster replies and more follow-ups — without adding headcount.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group p-8 rounded-[2rem] bg-slate-50 dark:bg-[#1e266e]/10 border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[#2BB6C6]/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1e266e] flex items-center justify-center text-[#2BB6C6] text-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                <i className={benefit.icon} aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-[#2BB6C6] transition-colors">{benefit.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-1 bg-gradient-to-r from-transparent via-[#2BB6C6]/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default WhyUs;
