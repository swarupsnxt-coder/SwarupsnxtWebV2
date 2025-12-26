
import React, { useState } from 'react';

interface GuidedTourProps {
  onComplete: () => void;
}

const steps = [
  { target: 'hero', text: 'Welcome to the future. Our neural agents operate at sub-200ms latency.' },
  { target: 'nxt-lab', text: 'Test our live Gemini-powered models in the Voice Studio.' },
  { target: 'roi', text: 'Calculate the enterprise efficiency gains for your specific team size.' },
];

const GuidedTour: React.FC<GuidedTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      const element = document.getElementById(steps[currentStep + 1].target);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-[#0f172a]/60 pointer-events-auto"></div>
      
      <div className="glass p-8 rounded-3xl border-[#2BB6C6] max-w-sm relative z-10 pointer-events-auto shadow-[0_0_50px_rgba(43,182,198,0.2)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-[#2BB6C6] uppercase tracking-[0.3em]">Protocol Tour {currentStep + 1}/{steps.length}</span>
          <button onClick={onComplete} className="text-slate-500 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
        </div>
        <p className="text-white text-lg font-bold mb-6">{steps[currentStep].text}</p>
        <div className="flex gap-4">
          <button 
            onClick={handleNext}
            className="flex-grow py-3 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl text-sm"
          >
            {currentStep === steps.length - 1 ? 'Start Protocol' : 'Next Step'}
          </button>
          <button 
            onClick={onComplete}
            className="px-6 py-3 glass border-white/10 text-white font-bold rounded-xl text-sm"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
