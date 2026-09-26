
import React from 'react';
import Logo from './Logo';
import { CONTACT, mailtoLink, telLink } from '../constants';

interface FooterProps {
  onPrivacyClick: () => void;
  onSecurityClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onSecurityClick }) => {
  const linkClass = "hover:text-[#2BB6C6] transition-colors";

  return (
    <footer className="bg-slate-50 dark:bg-[#0f172a] pt-24 pb-12 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              AI voice agents, chatbots and automation for Indian businesses — set up and supported by our team.
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
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Explore</h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#products" className={linkClass}>Products</a></li>
              <li><a href="#solutions" className={linkClass}>Industries</a></li>
              <li><a href="#nxt-lab" className={linkClass}>NXT Lab</a></li>
              <li><a href="#faq" className={linkClass}>FAQ</a></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">Company</h2>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#contact" className={linkClass}>Book a demo</a></li>
              <li><button onClick={onPrivacyClick} className={`${linkClass} text-left`}>Privacy Policy</button></li>
              <li><button onClick={onSecurityClick} className={`${linkClass} text-left`}>Terms of Service</button></li>
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {/* TODO(confirm): legal company name ("Swarups NXT" vs "Swarups NXT Intelligence"). */}
          <p>© {new Date().getFullYear()} Swarups NXT Intelligence. All Rights Reserved.</p>
          <span>Chennai, Tamil Nadu, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
