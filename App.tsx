import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import NxtLab from './components/NxtLab';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import Infrastructure from './components/Infrastructure';
import Pricing from './components/Pricing';
import WhyUs from './components/WhyUs';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { LeadFormModal, PrivacyModal, TermsModal } from './components/Modals';
import ProductPage from './components/ProductPage';
import { findProductPage } from './constants';
import { Theme } from './types';

// `path` is the URL path: window.location.pathname in the browser, the route being
// pre-rendered at build time (entry-server.tsx). Product paths render a ProductPage.
const App: React.FC<{ path: string }> = ({ path }) => {
  const productPage = findProductPage(path);

  // The inline script in index.html applies the saved/system theme before first paint;
  // read it back from the <html> class (server render defaults to light).
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT
  );

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
  }, [theme]);

  // "Book a demo" links (marked data-book-demo) open the form popup. They keep href="#contact",
  // so without JavaScript, or with a modifier key held, they still go to the Contact section.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target instanceof Element) || !e.target.closest('[data-book-demo]')) return;
      e.preventDefault();
      setShowLeadForm(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const openPrivacy = useCallback(() => setShowPrivacy(true), []);
  const closePrivacy = useCallback(() => setShowPrivacy(false), []);
  const closeLeadForm = useCallback(() => setShowLeadForm(false), []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      try { localStorage.setItem('nxt_theme', next); } catch { /* storage unavailable */ }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} isHome={!productPage} />

      <main>
        {productPage ? (
          <ProductPage page={productPage} onPrivacyClick={openPrivacy} />
        ) : (
          <>
            <Hero />
            <Integrations />
            <Products />
            <Infrastructure />
            <Pricing />
            <NxtLab />
            <HowItWorks />
            <WhyUs />
            <Industries />
            <FAQ />
            <Contact onPrivacyClick={openPrivacy} />
          </>
        )}
      </main>

      <Footer
        isHome={!productPage}
        onPrivacyClick={openPrivacy}
        onTermsClick={() => setShowTerms(true)}
      />

      <WhatsAppButton />

      {/* Modals */}
      {showLeadForm && <LeadFormModal onClose={closeLeadForm} onPrivacyClick={openPrivacy} />}
      {showPrivacy && <PrivacyModal onClose={closePrivacy} />}
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default App;
