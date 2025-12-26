import React from 'react';

const ComparisonTable: React.FC = () => {
  const rows = [
    { feature: 'Core Intelligence', legacy: 'Decision Trees/Scripts', nxt: 'Neural Reasoning (Gemini 3)' },
    { feature: 'Response Latency', legacy: '2.5s - 5.0s', nxt: 'Sub-200ms Real-time' },
    { feature: 'Emotional IQ', legacy: 'Robotic/Linear', nxt: 'Context-Aware Empathy' },
    { feature: 'Integration Complexity', legacy: 'Months (Custom Dev)', nxt: 'Hours (Native API Hooks)' },
    { feature: 'Operational Cost', legacy: '$20 - $45 per hour', nxt: 'Starting at $1.50 per hour' },
    { feature: 'Data Privacy', legacy: 'Third-party storage', nxt: 'Encrypted Neural Vault' },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">Legacy vs. NXT</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">The evolution of digital labor is here.</p>
        </div>

        <div className="bg-white dark:bg-slate-900/50 dark:backdrop-blur-xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl max-w-5xl mx-auto transition-all">
          <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800/80 p-6 border-b border-slate-200 dark:border-white/10 text-center uppercase tracking-[0.2em] text-[10px] font-black">
            <div className="text-left text-slate-500 dark:text-slate-400">Feature Protocol</div>
            <div className="text-slate-500 dark:text-slate-400">Standard Legacy</div>
            <div className="text-[#2BB6C6]">Swarups NXT</div>
          </div>
          
          {rows.map((row, i) => (
            <div 
              key={i} 
              className={`grid grid-cols-3 p-6 border-b border-slate-100 dark:border-white/5 items-center transition-colors ${
                i % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/20' : 'bg-white dark:bg-transparent'
              }`}
            >
              <div className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                {row.feature}
              </div>
              <div className="text-center text-slate-500 dark:text-slate-500 text-xs md:text-sm font-medium">
                {row.legacy}
              </div>
              <div className="text-center text-slate-900 dark:text-white font-black text-xs md:text-sm flex items-center justify-center gap-2 group">
                <i className="fa-solid fa-circle-check text-[#2BB6C6] hidden sm:inline group-hover:scale-125 transition-transform"></i>
                <span className="tracking-tight">{row.nxt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;