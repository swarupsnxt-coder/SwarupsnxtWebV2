
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
    <section className="py-24 bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Legacy vs. NXT</h2>
          <p className="text-slate-500">The evolution of digital labor is here.</p>
        </div>

        <div className="glass rounded-3xl border-white/10 overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-3 bg-[#1e266e]/50 p-6 border-b border-white/10 text-center uppercase tracking-widest text-[10px] font-bold">
            <div className="text-left text-slate-400">Feature Protocol</div>
            <div className="text-slate-400">Standard Legacy</div>
            <div className="text-[#2BB6C6]">Swarups NXT</div>
          </div>
          
          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 p-6 border-b border-white/5 items-center ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
              <div className="font-semibold text-white text-sm md:text-base">{row.feature}</div>
              <div className="text-center text-slate-500 text-xs md:text-sm">{row.legacy}</div>
              <div className="text-center text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-check text-[#2BB6C6] hidden sm:inline"></i>
                {row.nxt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
