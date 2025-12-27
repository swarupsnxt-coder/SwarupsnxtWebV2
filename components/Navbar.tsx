import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Theme } from '../types';

interface NavbarProps {
  theme?: Theme;
  toggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappLink = "https://wa.me/917550007208?text=Hello%20Swarups%20NXT,%20I'm%20interested%20in%20a%20demo!";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'NXT Lab', href: 'nxt-lab' },
    { name: 'Products', href: 'products' },
    { name: 'Why Us', href: 'why-us' },
    { name: 'Industries', href: 'solutions' },
    { name: 'Process', href: 'how-it-works' },
    { name: 'FAQ', href: 'faq' },
    { name: 'Contact', href: 'contact' }
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl dark:shadow-2xl transition-all duration-500`}>
            <a href="#hero" className="flex items-center" onClick={(e) => handleNav(e, 'hero')}>
              <Logo />
            </a>
            
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={`#${link.href}`} 
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-[#2BB6C6] dark:hover:text-[#2BB6C6] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-[#2BB6C6] transition-all hover:scale-110 active:scale-95 shadow-sm"
                aria-label="Toggle Theme"
              >
                <i className={`fa-solid ${theme === Theme.DARK ? 'fa-sun' : 'fa-moon'} transition-transform duration-500 ${theme === Theme.DARK ? 'rotate-[360deg]' : 'rotate-0'}`}></i>
              </button>
              
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block text-xs uppercase tracking-widest font-bold bg-[#2BB6C6] text-[#0f172a] px-6 py-2.5 rounded-lg hover:brightness-110 hover:scale-105 transition-all shadow-lg shadow-[#2BB6C6]/20 text-center"
              >
                Book Demo
              </a>
              
              <button 
                className="md:hidden text-2xl text-slate-600 dark:text-slate-300 hover:text-[#2BB6C6] transition-colors p-2 flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[45] bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`} 
              className="text-2xl font-bold text-slate-900 dark:text-white hover:text-[#2BB6C6] transition-colors tracking-widest uppercase"
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl text-lg uppercase tracking-widest shadow-xl shadow-[#2BB6C6]/20 text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Demo Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;