import React from 'react';
import { INDUSTRIES, PRODUCTS, PRODUCT_PAGES, productPagePath, whatsappLink } from '../constants';
import { ProductPage as ProductPageData } from '../types';
import FAQ from './FAQ';
import Contact from './Contact';

// Products that the NXT Lab demo on the home page lets visitors try.
const DEMO_PRODUCTS = ['ai-voice-agents', 'ai-chatbots'];

interface ProductPageProps {
  page: ProductPageData;
  onPrivacyClick: () => void;
}

// Landing page for one product at /<productId>/; content comes from PRODUCTS + PRODUCT_PAGES.
const ProductPage: React.FC<ProductPageProps> = ({ page, onPrivacyClick }) => {
  const product = PRODUCTS.find((p) => p.id === page.productId);
  if (!product) return null;

  const industries = INDUSTRIES.filter((i) => page.industryIds.includes(i.id));
  const otherPages = PRODUCT_PAGES.filter((p) => p.productId !== page.productId);
  const productTitle = (id: string) => PRODUCTS.find((p) => p.id === id)?.title ?? id;

  return (
    <>
      <section id="hero" className="pt-40 pb-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2BB6C6]/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-[#2BB6C6] transition-colors">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#products" className="hover:text-[#2BB6C6] transition-colors">Products</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-900 dark:text-white">{product.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5">
                <i className={`${product.iconType} ${product.icon} text-[#2BB6C6] text-sm`} aria-hidden="true"></i>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">{product.title}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-[1.05] text-slate-900 dark:text-white tracking-tight">
                {page.h1}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                {product.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  data-book-demo
                  className="px-8 py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-[#2BB6C6]/20 text-center"
                >
                  Book a demo
                </a>
                <a
                  href={whatsappLink(product.ctaText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-bold rounded-xl hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  {product.ctaLabel}
                </a>
              </div>
              {DEMO_PRODUCTS.includes(product.id) && (
                <a href="/#nxt-lab" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all">
                  Try the live AI demo <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                </a>
              )}
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl shadow-[#2BB6C6]/10">
              <img src={product.image} alt="" width={800} height={533} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">What you get</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12 max-w-3xl">{product.details}</p>

            <ul className="grid md:grid-cols-2 gap-4 mb-16">
              {page.features.map((f) => (
                <li key={f} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <i className="fa-solid fa-circle-check text-[#2BB6C6] mt-1" aria-hidden="true"></i>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[11px] font-black text-[#2BB6C6] uppercase tracking-widest mb-4">Best for</h3>
            <ul className="flex flex-wrap gap-3">
              {product.bestFor.split(', ').map((use) => (
                <li key={use} className="px-4 py-2 rounded-full bg-[#2BB6C6]/10 text-slate-900 dark:text-white text-sm font-semibold first-letter:uppercase">{use}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {industries.length > 0 && (
        <section id="solutions" className="py-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-28">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-slate-900 dark:text-white">How businesses use it</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {industries.map((i) => (
                  <div key={i.id} className="p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{i.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{i.problem}</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{i.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <FAQ items={page.faqs} subtitle={`Common questions about ${product.title}.`} />

      <section aria-labelledby="more-products" className="py-20 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="more-products" className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">More from Swarups NXT</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherPages.map((p) => (
                <li key={p.productId}>
                  <a
                    href={productPagePath(p.productId)}
                    className="flex items-center justify-between gap-3 h-full p-5 rounded-2xl border border-slate-200 dark:border-white/10 font-bold text-slate-900 dark:text-white hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all"
                  >
                    {productTitle(p.productId)}
                    <i className="fa-solid fa-arrow-right-long text-xs text-[#2BB6C6]" aria-hidden="true"></i>
                  </a>
                </li>
              ))}
            </ul>
            <a href="/#products" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all">
              See all products <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </section>

      <Contact onPrivacyClick={onPrivacyClick} />
    </>
  );
};

export default ProductPage;
