import React from 'react';
import { GUIDES, guidePath } from '../content/guides';
import Contact from './Contact';

// /guides/: list of explainer guides.
const GuidesIndex: React.FC<{ onPrivacyClick: () => void }> = ({ onPrivacyClick }) => (
  <>
    <section id="hero" className="pt-40 pb-24 bg-slate-50 dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2BB6C6]/10 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-[#2BB6C6] transition-colors">Home</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-900 dark:text-white">Guides</li>
          </ol>
        </nav>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.05] text-slate-900 dark:text-white tracking-tight">
          Guides to business messaging in India
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-16 max-w-3xl font-medium">
          Plain-English explainers on WhatsApp, RCS, SMS and voice, so you can choose the right channel and know what to prepare.
        </p>
        <ul className="grid md:grid-cols-2 gap-6">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <a
                href={guidePath(g.slug)}
                className="group flex flex-col h-full p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all"
              >
                <i className="fa-solid fa-book-open text-[#2BB6C6] text-xl mb-5" aria-hidden="true"></i>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#2BB6C6] transition-colors">{g.h1}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{g.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6]">
                  Read the guide <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <Contact onPrivacyClick={onPrivacyClick} />
  </>
);

export default GuidesIndex;
