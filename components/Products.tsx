import React from 'react';
import { PRODUCTS, whatsappLink } from '../constants';


const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2BB6C6]/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Products</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            AI that works <br />
            <span className="gradient-text italic">on every channel.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Start with one product or combine them. We set everything up and train it on your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.title}
              className="group rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2BB6C6]/10"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  width={800}
                  height={384}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-[#2BB6C6] border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full shadow-lg">
                    {product.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#2BB6C6] text-xl shadow-lg border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                    <i className={`${product.iconType} ${product.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#2BB6C6] transition-colors leading-tight">
                    {product.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {product.desc}
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                  <div className="text-[11px] font-black text-[#2BB6C6] uppercase tracking-widest mb-1">Best for</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{product.bestFor}</div>
                </div>

                <a
                  href={whatsappLink(product.ctaText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <span>{product.ctaLabel}</span>
                  <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Not sure which product fits your business?</p>
          <a
            href="#contact"
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
