
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-500 dark:text-slate-400">Everything you need to know about Swarups NXT Intelligence.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className="group bg-slate-50 dark:bg-[#1e266e]/10 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#2BB6C6]/50"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2BB6C6] transition-colors">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'rotate-180 bg-[#2BB6C6] border-[#2BB6C6] text-[#0f172a]' : 'text-slate-400 group-hover:text-[#2BB6C6]'}`}>
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#2BB6C6]/10 to-[#1e266e]/10 p-10 rounded-[40px] border border-[#2BB6C6]/20 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic">Still have questions?</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">Our solution architects are ready to help you map your 40% revenue boost with a custom blueprint.</p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-[#2BB6C6]/20"
            >
              Contact Architect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
