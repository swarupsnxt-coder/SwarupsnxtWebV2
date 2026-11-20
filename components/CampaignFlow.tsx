import React from 'react';
import { FLOW_STEPS } from '../constants';

// Onboarding steps, shown under the flow as "Getting started".
const START_STEPS = [
  { id: '01', title: 'Discovery call', desc: 'We learn how your business handles calls and messages today, and where leads slip through.' },
  { id: '02', title: 'Custom setup & training', desc: 'We build your AI agent and train it on your products, FAQs and processes, in the languages your customers speak.' },
  { id: '03', title: 'Go live & optimise', desc: 'Your agent goes live on the channels you choose. We review conversations and keep improving it.' },
];

// "How it works": the core idea in four steps, from sending a campaign to your team taking over,
// then the three steps to get started.
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

        {/* Getting started: how a business starts with Swarups NXT (Navbar link #getting-started). */}
        <div
          id="getting-started"
          className="scroll-mt-28 mt-16 max-w-6xl mx-auto rounded-[2rem] p-8 md:p-10 bg-white dark:bg-[#1e266e]/10 border border-slate-200 dark:border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Getting started</h3>
            <p className="text-slate-600 dark:text-slate-400">We handle the setup. You focus on your customers.</p>
          </div>
          <ol className="grid md:grid-cols-3 gap-8">
            {START_STEPS.map((step) => (
              <li key={step.id} className="flex gap-4">
                <span className="w-12 h-12 shrink-0 rounded-2xl bg-[#2BB6C6]/10 dark:bg-[#1e266e] border border-[#2BB6C6]/20 flex items-center justify-center text-lg font-bold text-slate-900 dark:text-white">
                  {step.id}
                </span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center md:text-left">
            <a
              href="#contact"
              data-book-demo
              className="inline-flex items-center gap-3 text-[#2BB6C6] font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
            >
              <span>Book a demo</span>
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignFlow;
