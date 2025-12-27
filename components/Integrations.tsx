import React from 'react';
import { INTEGRATIONS } from '../constants';

const ZohoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all">
    <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#E1261C" />
    <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#49B14F" />
    <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#008CD1" />
    <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#F9B113" />
  </svg>
);

const SalesforceIcon = () => (
  <i className="fa-brands fa-salesforce text-4xl text-[#00A1E0]"></i>
);

const Integrations: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0f172a] border-y border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Seamlessly Integrated With</h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center space-x-16">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((int, i) => (
            <div key={i} className="flex items-center space-x-4 text-slate-400 dark:text-slate-400 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:text-slate-900 dark:hover:text-white">
              <div className="w-10 h-10 flex items-center justify-center">
                {int.logo === 'CUSTOM_ZOHO' ? (
                  <ZohoIcon />
                ) : int.name === 'Salesforce' ? (
                  <SalesforceIcon />
                ) : (
                  <i className={`${int.logo} text-4xl`}></i>
                )}
              </div>
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