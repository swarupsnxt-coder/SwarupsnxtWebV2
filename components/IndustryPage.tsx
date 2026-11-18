import React from 'react';
import { INDUSTRIES, PRODUCTS, industryPagePath, productPagePath, whatsappLink } from '../constants';
import { IndustrySector } from '../types';
import FAQ from './FAQ';
import Contact from './Contact';
import ProductCard from './ProductCard';

interface IndustryPageProps {
  industry: IndustrySector;
  onPrivacyClick: () => void;
}

// Landing page for one industry at /industries/<id>/; content comes from INDUSTRIES.
const IndustryPage: React.FC<IndustryPageProps> = ({ industry, onPrivacyClick }) => {
  const others = INDUSTRIES.filter((i) => i.id !== industry.id);
  const product = (id: string) => PRODUCTS.find((p) => p.id === id);

  return (
    <>
      <section id="hero" className="pt-40 pb-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2BB6C6]/10 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-[#2BB6C6] transition-colors">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#solutions" className="hover:text-[#2BB6C6] transition-colors">Industries</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-900 dark:text-white">{industry.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5">
                <i className="fa-solid fa-briefcase text-[#2BB6C6] text-sm" aria-hidden="true"></i>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">{industry.title}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-[1.05] text-slate-900 dark:text-white tracking-tight">
                {industry.h1}
              </h1>
              <div className="space-y-4 mb-10">
                <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="text-[11px] text-[#2BB6C6] font-bold uppercase tracking-widest mb-1">The problem</div>
                  <p className="text-slate-700 dark:text-slate-300">{industry.problem}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="text-[11px] text-[#2BB6C6] font-bold uppercase tracking-widest mb-1">What we set up</div>
                  <p className="text-slate-700 dark:text-slate-300">{industry.solution}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  data-book-demo
                  className="px-8 py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-[#2BB6C6]/20 text-center"
                >
                  Book a demo
                </a>
                <a
                  href={whatsappLink(industry.ctaText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-bold rounded-xl hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl shadow-[#2BB6C6]/10 aspect-[4/3] lg:aspect-[4/5]">
              <img src={industry.image} alt={industry.imageAlt} width={800} height={1000} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" aria-labelledby="use-cases-title" className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="use-cases-title" className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Use cases</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12 max-w-3xl">{industry.details}</p>
            <ul className="grid md:grid-cols-2 gap-6">
              {industry.useCases.map((u) => {
                const p = product(u.productId);
                return (
                  <li key={u.title} className="flex flex-col p-8 rounded-[2rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{u.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">{u.desc}</p>
                    {p && (
                      <a href={productPagePath(p.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all">
                        <i className={`${p.iconType} ${p.icon}`} aria-hidden="true"></i>
                        {p.title}
                        <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="recommended" className="py-24 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="recommended" className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Best fit for {industry.title.toLowerCase()}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-12">The products businesses like yours usually start with. We set them up for you.</p>
            <ul className="grid md:grid-cols-3 gap-6">
              {industry.productIds.map((id) => <ProductCard key={id} productId={id} />)}
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={industry.faqs} subtitle={`Common questions from ${industry.title.toLowerCase()} businesses.`} />

      <section aria-labelledby="other-industries" className="py-20 bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="other-industries" className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">Other industries</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((i) => (
                <li key={i.id}>
                  <a
                    href={industryPagePath(i.id)}
                    className="flex items-center justify-between gap-3 h-full p-5 rounded-2xl border border-slate-200 dark:border-white/10 font-bold text-slate-900 dark:text-white hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all"
                  >
                    {i.title}
                    <i className="fa-solid fa-arrow-right-long text-xs text-[#2BB6C6]" aria-hidden="true"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Contact onPrivacyClick={onPrivacyClick} />
    </>
  );
};

export default IndustryPage;
