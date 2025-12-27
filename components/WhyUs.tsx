import React from 'react';

const WhyUs: React.FC = () => {
  const benefits = [
    {
      icon: 'fa-brain',
      title: 'Bespoke Intelligence',
      desc: 'Custom-tailored neural architectures designed specifically for your unique business logic and proprietary datasets. We don\'t do generic wrappers.'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Enterprise Reliability',
      desc: 'Mission-critical stability with 99.9% uptime, DPDP compliance, and hardened security protocols for total enterprise peace of mind.'
    },
    {
      icon: 'fa-phone-slash',
      title: '80% Fewer Missed Calls',
      desc: 'Our AI agents handle 24/7 lead capture. No more losing business during lunch hours or after 6 PM.'
    },
    {
      icon: 'fa-chart-line',
      title: '40% Revenue Boost',
      desc: 'By eliminating lead leakage and automating follow-ups, our partners see an immediate surge in conversions.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2BB6C6]">The NXT Advantage</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">Why Enterprise Leaders <br /><span className="gradient-text italic">Choose Swarups NXT</span></h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            The only AI automation partner that speaks the language of Indian MSMEs: ROI, Speed, and Reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-[2rem] bg-slate-50 dark:bg-[#1e266e]/10 border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[#2BB6C6]/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1e266e] flex items-center justify-center text-[#2BB6C6] text-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                <i className={`fa-solid ${benefit.icon}`}></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-[#2BB6C6] transition-colors">{benefit.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
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