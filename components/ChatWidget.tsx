import React, { useState, useEffect } from 'react';

const ChatWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the widget after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById('phone-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Optional: Add a subtle highlight effect to the phone when reached
      setTimeout(() => {
        element.classList.add('ring-4', 'ring-[#2BB6C6]/50');
        setTimeout(() => element.classList.remove('ring-4', 'ring-[#2BB6C6]/50'), 2000);
      }, 800);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end group animate-fadeIn">
      {/* Primary Call-to-Action FAB */}
      <button 
        onClick={scrollToDemo}
        className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#1e266e] to-[#2BB6C6] text-white shadow-[0_20px_50px_rgba(43,182,198,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group/btn"
        aria-label="Navigate to Live Demo"
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-100 group-hover/btn:scale-110 transition-transform"></div>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-full"></div>
        
        {/* Pulse effect rings */}
        <div className="absolute inset-0 rounded-full bg-[#2BB6C6]/40 animate-ping [animation-duration:3s]"></div>
        
        <i className="fa-solid fa-headset text-2xl relative z-10 transition-transform duration-500 group-hover/btn:rotate-12"></i>

        {/* Action Label that appears on hover */}
        <span className="absolute right-20 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
          Launch Live Demo
        </span>
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;