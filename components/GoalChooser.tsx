import React from 'react';
import { GOALS, PRODUCTS, findProductPage, productPagePath } from '../constants';

// "What do you want to do?": each goal links to the product page(s) that fit it. Plain links, no
// state, so search engines and visitors without JavaScript see the same thing.
const GoalChooser: React.FC = () => {
  const productHref = (id: string) => (findProductPage(id) ? productPagePath(id) : `#${id}`);

  return (
    <section id="goals" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Find the right product</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            What do you <span className="gradient-text italic">want to do?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Pick your goal to see the product that fits. Not sure? Book a demo and we'll suggest one.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {GOALS.map((g) => (
            <li
              key={g.goal}
              className="flex flex-col p-7 rounded-[2rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1e266e] flex items-center justify-center text-[#2BB6C6] text-xl mb-5 shadow-sm border border-slate-100 dark:border-white/5">
                <i className={g.icon} aria-hidden="true"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-5 flex-grow">{g.goal}</h3>
              <div className="space-y-2">
                {g.productIds.map((id) => (
                  <a
                    key={id}
                    href={productHref(id)}
                    className="flex items-center justify-between gap-3 text-sm font-bold text-[#2BB6C6] hover:gap-4 transition-all"
                  >
                    <span>{PRODUCTS.find((p) => p.id === id)?.title}</span>
                    <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GoalChooser;
