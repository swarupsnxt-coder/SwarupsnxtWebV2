import React from 'react';
import { CHANNELS } from '../constants';

// TODO(confirm): add third-party CRM/tool logos here only for integrations we actually deliver.
const Integrations: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0f172a] border-y border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Works where your customers already are</h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center space-x-16">
          {[...CHANNELS, ...CHANNELS].map((channel, i) => (
            <div key={i} aria-hidden={i >= CHANNELS.length} className="flex items-center space-x-4 text-slate-400 dark:text-slate-400 hover:text-[#2BB6C6] transition-all duration-500">
              <div className="w-10 h-10 flex items-center justify-center">
                <i className={`${channel.icon} text-4xl`} aria-hidden="true"></i>
              </div>
              <span className="text-xl font-bold font-sans uppercase tracking-widest">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Integrations;
