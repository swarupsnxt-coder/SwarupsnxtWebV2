import React, { useState, useEffect } from 'react';
import ContactFallback from './ContactFallback';

// The live chat demo is rebuilt in Phase C1 (Cloudflare Workers AI). Until then the phone
// shows a short intro and the contact options instead of calling an AI endpoint.
const PhoneDemo: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px] h-[640px] sm:h-[680px] select-none group flex items-center justify-center">
      <div className="relative w-full h-full bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-[60px] p-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[3px] border-slate-300 dark:border-slate-800 overflow-hidden">
        <div className="w-full h-full bg-white dark:bg-[#0b0b0e] rounded-[48px] flex flex-col relative overflow-hidden transition-colors">

          <div className="absolute top-0 left-0 w-full h-11 z-50 flex justify-center pt-3 pointer-events-none" aria-hidden="true">
            <div className="h-[34px] w-[120px] bg-black rounded-full ring-1 ring-white/10 shadow-2xl"></div>
          </div>

          <div className="px-10 pt-5 pb-1 flex justify-between items-center z-40" aria-hidden="true">
            <span className="text-[13px] font-bold text-slate-900 dark:text-white">{currentTime}</span>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-signal text-[10px] text-slate-900 dark:text-slate-400"></i>
              <i className="fa-solid fa-wifi text-[10px] text-slate-900 dark:text-slate-400"></i>
            </div>
          </div>

          <div className="px-6 py-4 mt-2 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 z-30">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1e266e] to-[#2BB6C6] flex items-center justify-center text-white shadow-lg">
              <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
            </div>
            <div>
              <p className="text-[15px] font-bold text-slate-900 dark:text-white">Swarups NXT Assistant</p>
              <span className="text-[11px] text-[#2BB6C6] font-bold">AI chatbot demo</span>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto px-4 py-4 space-y-3 bg-[#f8f9fb] dark:bg-[#0b0b0e]">
            <div className="flex justify-start animate-fadeIn">
              <div className="max-w-[85%] px-4 py-2.5 rounded-[20px] rounded-tl-[4px] text-[13px] leading-relaxed shadow-sm bg-white text-slate-800 dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                Namaste! I answer customer questions, capture leads and book appointments — 24x7.
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
              <ContactFallback compact title="Live chat demo is being upgraded" message="Talk to our team and we'll show you what I can do for your business." />
            </div>
          </div>

          <div className="px-4 pt-3 pb-6 bg-white/95 dark:bg-[#0b0b0e]/95 border-t border-slate-100 dark:border-white/5 z-30">
            <label htmlFor="phone-demo-input" className="sr-only">Message (demo coming soon)</label>
            <input
              id="phone-demo-input"
              disabled
              placeholder="Live demo coming soon"
              className="w-full bg-[#f2f2f7] dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-white/5 rounded-full px-5 py-2 text-[14px] outline-none opacity-70 cursor-not-allowed"
            />
            <div className="mt-4 mx-auto w-[120px] h-[5px] bg-slate-900/10 dark:bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;
