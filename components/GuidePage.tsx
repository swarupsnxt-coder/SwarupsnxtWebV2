import React from 'react';
import { GUIDES, GUIDES_PATH, guidePath, guideShortTitle } from '../content/guides';
import { WHATSAPP_DEFAULT_TEXT, whatsappLink } from '../constants';
import { Guide } from '../types';
import ChannelComparison from './ChannelComparison';
import Contact from './Contact';
import FAQ from './FAQ';
import ProductCard from './ProductCard';

interface GuidePageProps {
  guide: Guide;
  onPrivacyClick: () => void;
}

// Formats YYYY-MM-DD as e.g. "17 November 2026" without depending on the runtime's locale data.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

// One explainer guide at /guides/<slug>/; content comes from content/guides.ts.
const GuidePage: React.FC<GuidePageProps> = ({ guide, onPrivacyClick }) => {
  const others = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <article>
        <header id="hero" className="pt-40 pb-16 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2BB6C6]/10 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-10 max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href="/" className="hover:text-[#2BB6C6] transition-colors">Home</a></li>
                <li aria-hidden="true">/</li>
                <li><a href={GUIDES_PATH} className="hover:text-[#2BB6C6] transition-colors">Guides</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-slate-900 dark:text-white">{guideShortTitle(guide)}</li>
              </ol>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5">
              <i className="fa-solid fa-book-open text-[#2BB6C6] text-sm" aria-hidden="true"></i>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Guide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-[1.1] text-slate-900 dark:text-white tracking-tight">{guide.h1}</h1>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Last updated <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time> · Swarups NXT
            </p>
          </div>
        </header>

        <div className="py-16 bg-white dark:bg-[#0f172a] transition-colors duration-500">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-12">{guide.intro}</p>

            {guide.sections.map((section) => (
              <section key={section.heading} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-5">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{p}</p>
                ))}
                {section.bullets && (
                  <ul className="space-y-3 mb-5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        <i className="fa-solid fa-circle-check text-[#2BB6C6] mt-1.5 text-base" aria-hidden="true"></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.embed === 'channel-comparison' && (
                  <div className="xl:-mx-40"><ChannelComparison embedded /></div>
                )}
              </section>
            ))}

            <aside className="mt-16 p-8 md:p-10 rounded-[2rem] bg-[#1e266e] border border-[#2BB6C6]/30 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Want us to set this up for you?</h2>
              <p className="text-slate-300 mb-8">Tell us what you want to send and to whom. We'll suggest the right channels and handle the setup.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" data-book-demo className="px-8 py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-105 transition-all text-center">Book a demo</a>
                <a
                  href={whatsappLink(WHATSAPP_DEFAULT_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all inline-flex items-center justify-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Chat on WhatsApp
                </a>
              </div>
            </aside>

            {guide.sources.length > 0 && (
              <section className="mt-12 text-sm text-slate-500 dark:text-slate-400">
                <h2 className="font-bold uppercase tracking-widest text-[11px] text-slate-500 dark:text-slate-400 mb-3">Official sources</h2>
                <ul className="space-y-2">
                  {guide.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2BB6C6]">{s.name}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      {guide.faqs.length > 0 && <FAQ items={guide.faqs} subtitle="Quick answers on this topic." />}

      <section aria-labelledby="guide-products" className="py-24 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="guide-products" className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white">Related products</h2>
            <ul className="grid md:grid-cols-3 gap-6">
              {guide.relatedProductIds.map((id) => <ProductCard key={id} productId={id} />)}
            </ul>
            <h2 className="text-2xl font-bold mt-20 mb-6 text-slate-900 dark:text-white">More guides</h2>
            <ul className="grid md:grid-cols-3 gap-4">
              {others.map((g) => (
                <li key={g.slug}>
                  <a href={guidePath(g.slug)} className="block h-full p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] font-bold text-slate-900 dark:text-white hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all">
                    {g.h1}
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

export default GuidePage;
