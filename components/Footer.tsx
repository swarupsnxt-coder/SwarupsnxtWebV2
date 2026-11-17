
import React from 'react';
import Logo from './Logo';
import { CONTACT, INDUSTRIES, PRODUCTS, PRODUCT_PAGES, SOCIAL_PROFILES, industryPagePath, mailtoLink, productPagePath, telLink } from '../constants';
import { GUIDES, GUIDES_PATH, guidePath, guideShortTitle } from '../content/guides';

interface FooterProps {
  isHome?: boolean;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ isHome = true, onPrivacyClick, onTermsClick }) => {
  const linkClass = "hover:text-[#2BB6C6] transition-colors";
  // Home page sections, linked back to from product pages.
  const section = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="bg-slate-50 dark:bg-[#0f172a] pt-24 pb-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          <div className="sm:col-span-2">
            <Logo className="mb-6" />
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              Bulk WhatsApp, RCS, SMS and voice messaging, with AI agents that answer the replies. We set up, customise and support leading platforms for businesses across India.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <i className="fa-solid fa-envelope text-[#2BB6C6]" aria-hidden="true"></i>
                <a href={mailtoLink('Enquiry')} className={linkClass}>{CONTACT.email}</a>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <i className="fa-solid fa-phone text-[#2BB6C6]" aria-hidden="true"></i>
                <a href={telLink} className={linkClass}>{CONTACT.phoneDisplay}</a>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3" aria-label="Swarups NXT on social media and Google Maps">
              {SOCIAL_PROFILES.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Swarups NXT on ${p.name}`}
                    title={p.name}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-colors"
                  >
                    <i className={p.icon} aria-hidden="true"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-products">
            <h2 id="footer-products" className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Products</h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              {PRODUCT_PAGES.map((p) => (
                <li key={p.productId}>
                  <a href={productPagePath(p.productId)} className={linkClass}>
                    {PRODUCTS.find((product) => product.id === p.productId)?.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-industries">
            <h2 id="footer-industries" className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Industries</h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              {INDUSTRIES.map((i) => (
                <li key={i.id}><a href={industryPagePath(i.id)} className={linkClass}>{i.title}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-resources">
            <h2 id="footer-resources" className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Resources</h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href={GUIDES_PATH} className={linkClass}>All guides</a></li>
              {GUIDES.map((g) => (
                <li key={g.slug}><a href={guidePath(g.slug)} className={linkClass}>{guideShortTitle(g)}</a></li>
              ))}
              <li><a href={section('nxt-lab')} className={linkClass}>NXT Lab</a></li>
              <li><a href={section('faq')} className={linkClass}>FAQ</a></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Company</h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#contact" data-book-demo className={linkClass}>Book a demo</a></li>
              <li><a href={section('pricing')} className={linkClass}>Pricing</a></li>
              <li><button onClick={onPrivacyClick} className={`${linkClass} text-left`}>Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className={`${linkClass} text-left`}>Terms of Service</button></li>
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Swarups NXT. All Rights Reserved.</p>
          <span>Chennai, Tamil Nadu, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
