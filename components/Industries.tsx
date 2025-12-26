
import React, { useState } from 'react';
import { INDUSTRIES } from '../constants';

const Industries: React.FC = () => {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);

  return (
    <section id="solutions" className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Trained for your <br />
              <span className="gradient-text">Vertical.</span>
            </h2>
            
            <div className="space-y-4">
              {INDUSTRIES.map((industry) => (
                <div 
                  key={industry.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${activeTab === industry.id ? 'bg-[#1e266e]/40 border-[#2BB6C6]' : 'border-white/5 hover:bg-white/[0.02]'}`}
                  onClick={() => setActiveTab(industry.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{industry.title}</h3>
                    <i className={`fa-solid fa-chevron-right transition-transform ${activeTab === industry.id ? 'rotate-90 text-[#2BB6C6]' : 'text-slate-600'}`}></i>
                  </div>
                  {activeTab === industry.id && (
                    <div className="mt-4 animate-fadeIn">
                      <p className="text-slate-400 text-sm mb-6">{industry.description}</p>
                      <div className="space-y-4">
                        {industry.faqs.map((faq, idx) => (
                          <div key={idx} className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
                            <div className="text-[10px] text-[#2BB6C6] font-bold uppercase tracking-widest mb-1">Scenario</div>
                            <div className="text-xs font-bold text-white mb-1">"{faq.question}"</div>
                            <div className="text-xs text-slate-500">Response: {faq.answer}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[#2BB6C6]/20 blur-[100px] rounded-full group-hover:bg-[#2BB6C6]/30 transition-all"></div>
            <div className="relative glass rounded-[40px] overflow-hidden border-white/10 shadow-2xl aspect-[4/5]">
              <img 
                src={INDUSTRIES.find(i => i.id === activeTab)?.image} 
                alt="Industry Preview" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#2BB6C6] mb-2">Sector Protocol 012</div>
                <h4 className="text-3xl font-bold text-white uppercase">{INDUSTRIES.find(i => i.id === activeTab)?.title}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
