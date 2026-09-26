import React, { useState } from 'react';
import { INDUSTRIES } from '../constants';

const Industries: React.FC = () => {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const active = INDUSTRIES.find(i => i.id === activeTab) ?? INDUSTRIES[0];

  return (
    <section id="solutions" className="py-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-slate-900 dark:text-white">
              Use cases by <br />
              <span className="gradient-text">industry.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">See how an AI agent fits the way your industry works.</p>

            <div className="space-y-4">
              {INDUSTRIES.map((industry) => {
                const isActive = activeTab === industry.id;
                return (
                  <div
                    key={industry.id}
                    className={`rounded-2xl border transition-all shadow-sm ${isActive ? 'bg-white dark:bg-[#1e266e]/40 border-[#2BB6C6] dark:border-[#2BB6C6]' : 'bg-white/50 dark:bg-transparent border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.02]'}`}
                  >
                    <h3>
                      <button
                        onClick={() => setActiveTab(industry.id)}
                        aria-expanded={isActive}
                        aria-controls={`industry-panel-${industry.id}`}
                        className="w-full p-6 flex items-center justify-between text-left"
                      >
                        <span className={`text-xl font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{industry.title}</span>
                        <i className={`fa-solid fa-chevron-right transition-transform ${isActive ? 'rotate-90 text-[#2BB6C6]' : 'text-slate-400 dark:text-slate-600'}`} aria-hidden="true"></i>
                      </button>
                    </h3>
                    {/* All panels stay in the HTML (hidden when closed) so the text is indexable. */}
                    <div id={`industry-panel-${industry.id}`} hidden={!isActive} className="px-6 pb-6 animate-fadeIn space-y-3">
                        <div className="bg-slate-100 dark:bg-[#0f172a] p-4 rounded-xl border border-slate-200 dark:border-white/5">
                          <div className="text-[11px] text-[#2BB6C6] font-bold uppercase tracking-widest mb-1">The problem</div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{industry.problem}</p>
                        </div>
                        <div className="bg-slate-100 dark:bg-[#0f172a] p-4 rounded-xl border border-slate-200 dark:border-white/5">
                          <div className="text-[11px] text-[#2BB6C6] font-bold uppercase tracking-widest mb-1">What the AI agent does</div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{industry.solution}</p>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed px-1">{industry.details}</p>
                        <div className="flex flex-wrap items-center gap-2 text-sm px-1">
                          <span className="font-bold text-slate-500 dark:text-slate-400">Best fit:</span>
                          <span className="font-bold text-slate-900 dark:text-white">{industry.product}</span>
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative group lg:sticky lg:top-28">
            <div className="absolute inset-0 bg-[#2BB6C6]/20 blur-[100px] rounded-full group-hover:bg-[#2BB6C6]/30 transition-all"></div>
            <div className="relative bg-white dark:glass rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-[4/5] transition-all">
              <img
                src={active.image}
                alt={active.imageAlt}
                loading="lazy"
                width={800}
                height={1000}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#0f172a] via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#2BB6C6] mb-2">Use case</div>
                <p className="text-3xl font-bold text-white uppercase" style={{ fontFamily: "'Suez One', serif" }}>{active.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
