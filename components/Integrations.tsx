
import React from 'react';
import { INTEGRATIONS } from '../constants';

const Integrations: React.FC = () => {
  return (
    <section className="py-20 bg-[#0f172a] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">Seamlessly Integrated With</h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center space-x-12">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((int, i) => (
            <div key={i} className="flex items-center space-x-3 text-slate-400 grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-white">
              <i className={`fa-brands ${int.logo} text-4xl`}></i>
              <span className="text-xl font-bold font-sans uppercase tracking-widest">{int.name}</span>
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
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Integrations;
