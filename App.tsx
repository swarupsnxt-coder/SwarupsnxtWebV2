
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import NxtLab from './components/NxtLab';
import HowItWorks from './components/HowItWorks';
import ComparisonTable from './components/ComparisonTable';
import Industries from './components/Industries';
import ROICalculator from './components/ROICalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GuidedTour from './components/GuidedTour';
import { PrivacyModal, SecurityModal } from './components/Modals';

const App: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('nxt_visited');
    if (!hasVisited) {
      setIsTourActive(true);
      localStorage.setItem('nxt_visited', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-[#2BB6C6] selection:text-[#0f172a]">
      <Navbar />
      
      <main>
        <Hero />
        <Integrations />
        <NxtLab />
        <HowItWorks />
        <ComparisonTable />
        <Industries />
        <ROICalculator />
        <Contact />
      </main>

      <Footer 
        onPrivacyClick={() => setShowPrivacy(true)} 
        onSecurityClick={() => setShowSecurity(true)} 
      />

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showSecurity && <SecurityModal onClose={() => setShowSecurity(false)} />}
      
      {isTourActive && <GuidedTour onComplete={() => setIsTourActive(false)} />}

      {/* Floating Neural Link Widget */}
      <button 
        onClick={() => document.getElementById('nxt-lab')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#2BB6C6] rounded-full shadow-2xl shadow-[#2BB6C6]/40 flex items-center justify-center group animate-bounce hover:animate-none transition-all"
        title="Connect to Neural Engine"
      >
        <i className="fa-solid fa-brain text-[#0f172a] text-2xl group-hover:scale-125 transition-transform"></i>
        <span className="absolute -top-12 right-0 bg-[#1e266e] text-white text-[10px] py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 uppercase font-bold tracking-widest">
          Test Neural Link
        </span>
      </button>
    </div>
  );
};

export default App;
