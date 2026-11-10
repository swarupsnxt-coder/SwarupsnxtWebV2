import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { Theme } from '../types';
import { findProductPage, productPagePath } from '../constants';

interface NavbarProps {
  theme?: Theme;
  toggleTheme?: () => void;
  isHome?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

// Products dropdown order = business priority; entries open the product's own page when it has
// one (PRODUCT_PAGES), otherwise scroll to its card on the home page.
// Resources keeps the sections that left the top level (NXT Lab, Why Us, Process) reachable.
const NAV_ITEMS: NavItem[] = [
  {
    name: 'Products',
    href: 'products',
    children: [
      { name: 'Bulk WhatsApp & RCS', href: 'bulk-whatsapp-rcs' },
      { name: 'Enterprise SMS & OTP', href: 'sms-otp' },
      { name: 'AI Voicebots', href: 'ai-voice-agents' },
      { name: 'AI Chatbots', href: 'ai-chatbots' },
      { name: 'CCaaS & Omnichannel', href: 'ai-contact-center' },
    ],
  },
  { name: 'Solutions', href: 'solutions' },
  { name: 'Pricing', href: 'pricing' },
  {
    name: 'Resources',
    href: 'faq',
    children: [
      { name: 'Try the AI demo (NXT Lab)', href: 'nxt-lab' },
      { name: 'How it works', href: 'how-it-works' },
      { name: 'Why Swarups NXT', href: 'why-us' },
      { name: 'FAQ', href: 'faq' },
    ],
  },
  { name: 'Contact', href: 'contact' },
];

const linkClass = "text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-[#2BB6C6] dark:hover:text-[#2BB6C6] transition-colors";

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, isHome = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close an open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownsRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenDropdown(null); };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDropdown]);

  // Section ids live on the home page; from a product page, link back to them.
  const hrefFor = (id: string) =>
    findProductPage(id) ? productPagePath(id) : isHome ? `#${id}` : `/#${id}`;

  // Scrolls to the section when it is on this page; otherwise the link is followed normally.
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    if (findProductPage(id)) return;
    const element = document.getElementById(id);
    if (!element) return;
    e.preventDefault();
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl dark:shadow-2xl transition-all duration-500`}>
            <a href={isHome ? '#hero' : '/'} className="flex items-center" onClick={isHome ? (e) => handleNav(e, 'hero') : undefined}>
              <Logo />
            </a>

            <div ref={dropdownsRef} className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => item.children ? (
                <div key={item.name} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    aria-expanded={openDropdown === item.name}
                    aria-controls={`nav-menu-${item.href}`}
                    className={`${linkClass} flex items-center gap-1.5`}
                  >
                    {item.name}
                    <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} aria-hidden="true"></i>
                  </button>
                  <ul
                    id={`nav-menu-${item.href}`}
                    hidden={openDropdown !== item.name}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 p-2 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 shadow-2xl"
                  >
                    {item.children.map((child, i) => (
                      <li key={child.href}>
                        <a
                          href={hrefFor(child.href)}
                          onClick={(e) => handleNav(e, child.href)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#2BB6C6]/10 hover:text-[#2BB6C6] transition-colors"
                        >
                          {item.name === 'Products' && <span className="text-[10px] font-black text-[#2BB6C6] w-3">{i + 1}</span>}
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={hrefFor(item.href)}
                  onClick={(e) => handleNav(e, item.href)}
                  className={linkClass}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-[#2BB6C6] transition-all hover:scale-110 active:scale-95 shadow-sm"
                aria-label="Toggle dark mode"
              >
                {/* Icon follows the <html class="dark"> via CSS so pre-rendered HTML matches on hydration. */}
                <i className="fa-solid fa-moon dark:hidden" aria-hidden="true"></i>
                <i className="fa-solid fa-sun hidden dark:inline-block" aria-hidden="true"></i>
              </button>

              <a
                href="#contact"
                data-book-demo
                onClick={() => setIsMobileMenuOpen(false)}
                className="hidden sm:block text-xs uppercase tracking-widest font-bold bg-[#2BB6C6] text-[#0f172a] px-6 py-2.5 rounded-lg hover:brightness-110 hover:scale-105 transition-all shadow-lg shadow-[#2BB6C6]/20 text-center"
              >
                Book a demo
              </a>

              <button
                className="lg:hidden text-2xl text-slate-600 dark:text-slate-300 hover:text-[#2BB6C6] transition-colors p-2 flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        inert={!isMobileMenuOpen}
        className={`fixed inset-0 z-[45] bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center h-full space-y-6 px-4 pt-32 pb-8 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-3 text-center">
              <a
                href={hrefFor(item.href)}
                className="text-2xl font-bold text-slate-900 dark:text-white hover:text-[#2BB6C6] transition-colors tracking-widest uppercase"
                onClick={(e) => handleNav(e, item.href)}
              >
                {item.name}
              </a>
              {item.children?.map((child) => (
                <a
                  key={child.href}
                  href={hrefFor(child.href)}
                  className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#2BB6C6] transition-colors"
                  onClick={(e) => handleNav(e, child.href)}
                >
                  {child.name}
                </a>
              ))}
            </div>
          ))}
          <a
            href="#contact"
            data-book-demo
            className="w-full max-w-xs py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl text-lg uppercase tracking-widest shadow-xl shadow-[#2BB6C6]/20 text-center shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book a demo
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
