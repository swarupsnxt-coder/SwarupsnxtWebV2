import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAgent, getConfigurationError } from '../services/geminiService';
import { PERSONAS } from '../constants';

const PhoneDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Swarups NXT. I'm Aria, your digital employee. How can I help you automate your revenue streams today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState("Analyzing request...");
  const [currentTime, setCurrentTime] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isTyping) return;
    
    const configError = getConfigurationError();
    if (configError) {
      setMessages(prev => [...prev, 
        { role: 'user', text: trimmedInput },
        { role: 'model', text: `[SYSTEM]: ${configError}` }
      ]);
      setInput("");
      return;
    }

    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: trimmedInput }]);
    setIsTyping(true);
    
    // Cycle through thinking statuses
    const statuses = [
      "Analyzing intent...",
      "Querying knowledge base...",
      "Optimizing response...",
      "Aria is speaking..."
    ];
    let sIdx = 0;
    const statusInterval = setInterval(() => {
      setTypingStatus(statuses[sIdx % statuses.length]);
      sIdx++;
    }, 600);

    try {
      const reply = await chatWithAgent(trimmedInput, PERSONAS[0].description);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `[ERROR]: ${error.message || "Signal lost."}` 
      }]);
    } finally {
      clearInterval(statusInterval);
      setIsTyping(false);
      setTypingStatus("Analyzing request...");
    }
  };

  return (
    <div className="relative mx-auto w-[310px] h-[660px] select-none group">
      {/* Sleek Chassis with no protruding hardware lines */}
      <div className="relative w-full h-full bg-[#1c1c1e] dark:bg-black rounded-[56px] p-[10px] shadow-2xl ring-1 ring-white/10 overflow-hidden border border-white/5 transition-all duration-700">
        
        {/* The Screen */}
        <div className="w-full h-full bg-white dark:bg-[#0b0b0e] rounded-[44px] flex flex-col relative overflow-hidden transition-colors duration-500">
          
          {/* Top Sensors Area (Dynamic Island) */}
          <div className="absolute top-0 left-0 w-full h-11 z-50 flex justify-center pointer-events-none">
            <div className={`mt-3 h-[34px] bg-black rounded-full flex items-center justify-between px-4 ring-1 ring-white/10 shadow-lg transition-all duration-500 ${isTyping ? 'w-[180px]' : 'w-[110px]'}`}>
              <div className="w-4 h-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-orange-500' : 'bg-blue-500/20'}`}></div>
              </div>
              {isTyping && (
                <div className="text-[10px] text-white/60 font-medium animate-pulse overflow-hidden whitespace-nowrap">
                  Processing Signal
                </div>
              )}
              <div className="flex gap-1.5 items-center">
                <div className={`w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]`}></div>
              </div>
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="px-8 pt-5 pb-1 flex justify-between items-center z-40 bg-transparent">
            <span className="text-[14px] font-bold text-slate-900 dark:text-white tracking-tight">{currentTime}</span>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-signal text-[11px] text-slate-900 dark:text-white"></i>
              <i className="fa-solid fa-wifi text-[11px] text-slate-900 dark:text-white"></i>
              <div className="w-[22px] h-[11px] rounded-[3px] border border-slate-400 dark:border-white/30 flex items-center p-[1px] relative">
                <div className="w-[85%] h-full bg-slate-900 dark:bg-white rounded-[1px]"></div>
                <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-slate-400 dark:bg-white/30 rounded-r-sm"></div>
              </div>
            </div>
          </div>

          {/* Chat Interface Header */}
          <div className="px-5 py-3 mt-1 flex items-center gap-3 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl z-30">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1e266e] to-[#2BB6C6] flex items-center justify-center text-white shadow-md">
                <i className="fa-solid fa-robot text-sm"></i>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#1c1c1e]"></span>
            </div>
            <div className="flex-grow">
              <h4 className="text-[14px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-1">Aria NXT</h4>
              <p className="text-[10px] text-[#2BB6C6] font-bold uppercase tracking-wider opacity-80">{isTyping ? 'Synthesizing...' : 'Autonomous Mode'}</p>
            </div>
            <div className="flex gap-4 text-slate-400 dark:text-slate-500">
              <i className="fa-solid fa-video text-xs hover:text-[#2BB6C6] cursor-pointer transition-colors"></i>
              <i className="fa-solid fa-phone text-xs hover:text-[#2BB6C6] cursor-pointer transition-colors"></i>
            </div>
          </div>

          {/* Messaging Thread */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto px-4 py-6 space-y-4 custom-scrollbar bg-slate-50 dark:bg-[#0b0b0e]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[82%] px-4 py-2.5 rounded-[22px] text-[14px] leading-snug shadow-sm transition-all ${
                  m.role === 'user' 
                    ? 'bg-[#007aff] text-white font-medium rounded-tr-none' 
                    : 'bg-[#e9e9eb] dark:bg-[#1c1c1e] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/5 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col items-start gap-1">
                <div className="bg-[#e9e9eb] dark:bg-[#1c1c1e] px-4 py-3 rounded-[22px] rounded-tl-none border border-slate-200 dark:border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
                <span className="ml-2 text-[9px] text-[#2BB6C6] font-mono animate-pulse">{typingStatus}</span>
              </div>
            )}
          </div>

          {/* iOS Input Area */}
          <div className="px-4 pt-3 pb-8 bg-white/90 dark:bg-[#0b0b0e]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 relative z-30">
            <div className="flex items-center gap-3 mb-2">
              <button className="text-[#007aff] dark:text-[#2BB6C6] hover:opacity-70 transition-opacity">
                <i className="fa-solid fa-circle-plus text-2xl"></i>
              </button>
              <div className="relative flex-grow">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="iMessage"
                  className="w-full bg-[#f2f2f7] dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 rounded-full px-5 py-2.5 text-[14px] outline-none focus:ring-1 focus:ring-[#007aff] dark:focus:ring-[#2BB6C6] transition-all text-slate-900 dark:text-white placeholder-slate-500 font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#007aff] dark:bg-[#2BB6C6] rounded-full text-white dark:text-[#0b0b0e] disabled:opacity-30 transition-all hover:scale-110 active:scale-95 shadow-md"
                >
                  <i className="fa-solid fa-arrow-up text-xs font-black"></i>
                </button>
              </div>
            </div>
            
            {/* Home Bar Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-slate-900/10 dark:bg-white/15 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;