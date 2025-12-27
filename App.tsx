import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import NxtLab from './components/NxtLab';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import ComparisonTable from './components/ComparisonTable';
import WhyUs from './components/WhyUs';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <Integrations />
        <NxtLab />
        <Products />
        <HowItWorks />
        <ComparisonTable />
        <WhyUs />
        <Industries />
        <FAQ />
        <Contact />
      </main>

      <Footer 
        onPrivacyClick={() => setShowPrivacy(true)} 
        onSecurityClick={() => setShowSecurity(true)} 
      />

      {/* Modern Floating Chat Widget */}
      <ChatWidget />

      {/* Modals */}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showSecurity && <SecurityModal onClose={() => setShowSecurity(false)} />}
    </div>
  );
};

export default App;