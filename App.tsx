import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import NxtLab from './components/NxtLab';
import HowItWorks from './components/HowItWorks';
import ComparisonTable from './components/ComparisonTable';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PrivacyModal, SecurityModal } from './components/Modals';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('nxt_theme');
    if (saved) return saved as Theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
  });

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nxt_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const scrollToDemo = () => {
    const element = document.getElementById('phone-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <Integrations />
        <NxtLab />
        <HowItWorks />
        <ComparisonTable />
        <Industries />
        <FAQ />
        <Contact />
      </main>

      <Footer 
        onPrivacyClick={() => setShowPrivacy(true)} 
        onSecurityClick={() => setShowSecurity(true)} 
      />

      {/* Floating Chat Trigger - Beautiful Bot Icon */}
      <div className="fixed bottom-8 right-8 z-40 group flex flex-col items-end">
        {/* Label on hover */}
        <div className="mb-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-2xl pointer-events-none">
          Consult Aria Bot
        </div>
        
        <button 
          onClick={scrollToDemo}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1e266e] to-[#2BB6C6] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative overflow-hidden group/btn"
          aria-label="Open Neural Chat"
        >
          {/* Enhanced Pulsating glow effect */}
          <div className="absolute inset-0 bg-[#2BB6C6] opacity-30 animate-pulse group-hover/btn:opacity-50 scale-125"></div>
          
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Bot Icon */}
          <i className="fa-solid fa-robot text-2xl group-hover:rotate-12 transition-transform z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"></i>
          
          {/* Notification Indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2BB6C6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#2BB6C6] border-2 border-white dark:border-[#0f172a]"></span>
          </span>
        </button>
      </div>

      {/* Modals */}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showSecurity && <SecurityModal onClose={() => setShowSecurity(false)} />}
    </div>
  );
};

export default App;