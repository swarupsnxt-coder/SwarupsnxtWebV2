import React from 'react';

const steps = [
  { id: '01', title: 'Discovery call', desc: 'We learn how your business handles calls and messages today, and where leads slip through.' },
  { id: '02', title: 'Custom setup & training', desc: 'We build your AI agent and train it on your products, FAQs and processes, in the languages your customers speak.' },
  { id: '03', title: 'Go live & optimise', desc: 'Your agent goes live on the channels you choose. We review conversations and keep improving it.' },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2BB6C6_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">How it works</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We handle the setup. You focus on your customers.</p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16.66%] w-[66.66%] h-[2px] bg-gradient-to-r from-[#2BB6C6]/0 via-[#2BB6C6]/30 to-[#2BB6C6]/0 -z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="text-center group relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-[#1e266e] flex items-center justify-center mx-auto mb-8 border border-slate-200 dark:border-[#2BB6C6]/20 group-hover:bg-[#2BB6C6] group-hover:scale-110 transition-all duration-500 shadow-xl shadow-[#2BB6C6]/5 group-hover:shadow-[#2BB6C6]/30">
                <span className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-[#0f172a]">{step.id}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-[#2BB6C6] transition-colors">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
