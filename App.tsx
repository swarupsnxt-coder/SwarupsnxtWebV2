import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import NxtLab from './components/NxtLab';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { PrivacyModal, SecurityModal } from './components/Modals';
import { Theme } from './types';

const App: React.FC = () => {
  // The inline script in index.html applies the saved/system theme before first paint;
  // read it back from the <html> class (server render defaults to light).
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT
  );

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      try { localStorage.setItem('nxt_theme', next); } catch { /* storage unavailable */ }
      return next;
    });
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
        <WhyUs />
        <Industries />
        <FAQ />
        <Contact />
      </main>

      <Footer
        onPrivacyClick={() => setShowPrivacy(true)}
        onSecurityClick={() => setShowSecurity(true)}
      />

      <WhatsAppButton />

      {/* Modals */}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showSecurity && <SecurityModal onClose={() => setShowSecurity(false)} />}
    </div>
  );
};

export default App;
