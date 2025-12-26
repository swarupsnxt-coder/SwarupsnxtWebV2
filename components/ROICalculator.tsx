
import React, { useState } from 'react';

const ROICalculator: React.FC = () => {
  const [agents, setAgents] = useState(5);
  const [salary, setSalary] = useState(45000);
  
  // Logic: Human cost = agents * salary. NXT cost = Human cost * 0.1 (90% reduction).
  // Savings = Human cost * 0.9.
  const annualHumanCost = agents * salary;
  const annualSavings = annualHumanCost * 0.4; // 40% efficiency multiplier based on specific user request
  
  return (
    <section id="roi" className="py-24 bg-[#0f172a] border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[40px] border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <i className="fa-solid fa-calculator text-white/5 text-8xl"></i>
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">ROI Projection</h2>
              <p className="text-slate-500 mb-8">Calculate your annual savings with NXT Digital Employees.</p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Current Support Staff</label>
                    <span className="text-[#2BB6C6] font-bold">{agents} Employees</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={agents} 
                    onChange={(e) => setAgents(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#1e266e] rounded-lg appearance-none cursor-pointer accent-[#2BB6C6]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Avg. Annual Salary ($)</label>
                    <span className="text-[#2BB6C6] font-bold">${salary.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="20000" 
                    max="150000" 
                    step="5000"
                    value={salary} 
                    onChange={(e) => setSalary(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#1e266e] rounded-lg appearance-none cursor-pointer accent-[#2BB6C6]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#1e266e]/30 p-8 rounded-3xl border border-white/10 text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#2BB6C6] mb-4 font-bold">Projected Annual Savings</div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500 mb-8">at 40% increased efficiency protocol</div>
              <button className="w-full py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#2BB6C6]/20">
                Unlock This ROI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
