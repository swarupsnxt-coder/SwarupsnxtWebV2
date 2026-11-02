import React from 'react';
import { PRICING_MODEL } from '../constants';

// Explains how pricing works without showing any figures (CLAUDE.md hard rule 2).
const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Pay-As-You-Go <br />
            <span className="gradient-text italic">for Scale.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            No fixed plans to squeeze into. Your price is based on the volume you send on each channel, and we share a clear quote after a short call.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {PRICING_MODEL.map((item) => (
            <div
              key={item.channel}
              className="rounded-[2rem] p-8 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[#2BB6C6] text-xl mb-6 border border-slate-100 dark:border-white/5">
                <i className={item.icon} aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.channel}</h3>
              <div className="text-[11px] font-black text-[#2BB6C6] uppercase tracking-widest mb-4">{item.unit}</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto rounded-[2rem] p-8 md:p-12 bg-[#1e266e] border border-[#2BB6C6]/30 shadow-2xl shadow-[#2BB6C6]/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Sending at high volume?</h3>
            <p className="text-slate-300 text-lg">Tell us your monthly volume per channel and we'll put together a custom quote and routing setup for your business.</p>
          </div>
          <a
            href="#contact"
            data-book-demo
            className="shrink-0 px-10 py-4 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#2BB6C6]/30 flex items-center gap-3 no-underline"
          >
            <span>Get a Custom Quote</span>
            <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
