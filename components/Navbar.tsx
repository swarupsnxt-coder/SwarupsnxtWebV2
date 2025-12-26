
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Demo', href: '#nxt-lab' },
    { name: 'Why Us', href: '#how-it-works' },
    { name: 'ROI', href: '#roi' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl border-white/10`}>
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo className="scale-90 sm:scale-100" />
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-slate-300 hover:text-[#2BB6C6] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden sm:block text-xs uppercase tracking-widest font-bold bg-[#2BB6C6] text-[#0f172a] px-6 py-2.5 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-[#2BB6C6]/20">
                Book Demo
              </button>
              <button 
                className="md:hidden text-2xl text-slate-300 hover:text-[#2BB6C6] transition-colors p-2"
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
        className={`fixed inset-0 z-[45] bg-[#0f172a]/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-bold text-white hover:text-[#2BB6C6] transition-colors tracking-widest uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="w-full max-w-xs py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl text-lg uppercase tracking-widest"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Demo Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
