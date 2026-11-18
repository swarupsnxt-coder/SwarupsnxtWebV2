import React from 'react';
import { FLOW_STEPS } from '../constants';

// "How it works": the core idea in four steps, from sending a campaign to your team taking over.
const CampaignFlow: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">How it works</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Send once. <span className="gradient-text italic">AI handles the replies.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Bulk messaging gets your message out. AI agents make sure every reply, question and call-back gets an answer.
          </p>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-6xl mx-auto">
          {FLOW_STEPS.map((step, i) => (
            <li key={step.title} className="relative flex lg:block">
              <div className="flex-1 h-full p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#2BB6C6]/10 dark:bg-[#1e266e] flex items-center justify-center text-[#2BB6C6] text-2xl border border-[#2BB6C6]/20">
                    <i className={step.icon} aria-hidden="true"></i>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#2BB6C6]">Step {i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#2BB6C6] text-[#0f172a] items-center justify-center text-xs shadow-lg"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CampaignFlow;
