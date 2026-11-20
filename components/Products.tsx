import React from 'react';
import { PRODUCTS, PRODUCT_GROUPS, productPagePath, whatsappLink } from '../constants';
import ProductVisual from './visuals/ProductVisual';
import BenefitList from './BenefitList';

// Compact cards in three groups: outcome + three icon benefits; the full description lives on
// each product's own page.
const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2BB6C6]/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Products</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Messaging and AI <br />
            <span className="gradient-text italic">on every channel.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Start with bulk WhatsApp or SMS, then add AI agents that handle the replies. We set everything up for your business.
          </p>
        </div>

        <div className="space-y-20">
          {PRODUCT_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="mb-8 max-w-6xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{group.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{group.desc}</p>
              </div>

              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {PRODUCTS.filter((p) => p.group === group.id).map((product) => (
                  <li
                    key={product.id}
                    id={product.id}
                    className="scroll-mt-28 group rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 hover:-translate-y-1 flex flex-col overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2BB6C6]/10"
                  >
                    <ProductVisual productId={product.id} size="sm" />
                    <div className="p-7 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#2BB6C6] text-xl shadow-lg border border-slate-100 dark:border-white/5 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                          <i className={`${product.iconType} ${product.icon}`} aria-hidden="true"></i>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{product.title}</h4>
                      </div>

                      <p className="text-[#2BB6C6] font-bold leading-snug mb-5">{product.outcome}</p>

                      <BenefitList benefits={product.benefits} className="mb-6 flex-grow" />

                      <div className="pt-5 border-t border-slate-200 dark:border-white/5">
                        <div className="text-[11px] font-black text-[#2BB6C6] uppercase tracking-widest mb-1">Best for</div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{product.bestFor}</div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <a
                          href={productPagePath(product.id)}
                          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-[#2BB6C6] hover:gap-3 transition-all"
                        >
                          <span>Learn more<span className="sr-only"> about {product.title}</span></span>
                          <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                        </a>
                        <a
                          href={whatsappLink(product.ctaText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all"
                        >
                          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                          <span>{product.ctaLabel}</span>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Not sure which product fits your business?</p>
          <a
            href="#contact"
            data-book-demo
            className="inline-flex items-center gap-3 text-[#2BB6C6] font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
          >
            <span>Book a demo</span>
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
