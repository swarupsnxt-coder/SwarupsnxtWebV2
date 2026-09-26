import React, { useState } from 'react';
import { FAQS, whatsappLink } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400">Straight answers to the questions business owners ask us most.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="group bg-slate-50 dark:bg-[#1e266e]/10 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#2BB6C6]/50"
                >
                  <h3>
                    <button
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full px-6 sm:px-8 py-6 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2BB6C6] rounded-3xl"
                    >
                      <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#2BB6C6] transition-colors">{faq.question}</span>
                      <span className={`shrink-0 w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#2BB6C6] border-[#2BB6C6] text-[#0f172a]' : 'text-slate-400 group-hover:text-[#2BB6C6]'}`}>
                        <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    hidden={!isOpen}
                    className="px-6 sm:px-8 pb-8 pt-2 animate-fadeIn"
                  >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-gradient-to-br from-[#2BB6C6]/10 to-[#1e266e]/10 p-10 rounded-[40px] border border-[#2BB6C6]/20 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic">Still have questions?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">Message us on WhatsApp and we'll answer them — no sales script.</p>
            <a
              href={whatsappLink('Hi Swarups NXT, I have some questions about your AI solutions')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-[#2BB6C6]/20 text-center"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
