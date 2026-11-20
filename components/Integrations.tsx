import React from 'react';
import { CHANNELS, productPagePath } from '../constants';

// Channels only: no third-party tool integrations are claimed (confirmed Sept 2026).
// A static grid (no marquee), so each channel appears once; each tile opens its product page.
const Integrations: React.FC = () => {
  return (
    <section id="channels" className="py-20 bg-white dark:bg-[#0f172a] border-y border-slate-200 dark:border-white/5 transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Works where your customers already are</h2>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {CHANNELS.map((channel) => (
            <li key={channel.name}>
              <a
                href={productPagePath(channel.productId)}
                className="group h-full flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-11 h-11 shrink-0 rounded-xl bg-white dark:bg-[#1e266e] border border-slate-100 dark:border-white/5 flex items-center justify-center text-xl text-[#2BB6C6] group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-colors duration-300">
                  <i className={channel.icon} aria-hidden="true"></i>
                </span>
                <span>
                  <span className="block font-bold text-slate-900 dark:text-white">{channel.name}</span>
                  <span className="block text-sm leading-snug text-slate-600 dark:text-slate-400">{channel.desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Integrations;
