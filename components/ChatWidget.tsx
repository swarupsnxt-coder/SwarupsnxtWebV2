import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAgent, getConfigurationError } from '../services/geminiService';
import { PERSONAS } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Swarup's AI Assistant. Ready to see how we can boost your revenue by 40%?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    const trimmedInput = textToSend.trim();
    if (!trimmedInput || isTyping) return;

    const configError = getConfigurationError();
    if (configError) {
      setMessages(prev => [...prev, 
        { role: 'user', text: trimmedInput },
        { role: 'model', text: `[SYSTEM]: Neural engine offline. Please check API key.` }
      ]);
      setInput("");
      return;
    }

    if (!customMessage) setInput("");
    setMessages(prev => [...prev, { role: 'user', text: trimmedInput }]);
    setIsTyping(true);

    try {
      const reply = await chatWithAgent(trimmedInput, PERSONAS[0].description);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: "ROI Analysis", query: "What ROI can I expect?" },
    { label: "Book Audit", query: "I want to schedule a Free AI Audit." },
    { label: "Voice Demo", query: "Tell me about your voice agents." }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Welcome Bubble */}
      {!isOpen && (
        <div className="mb-4 mr-2 bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-br-none shadow-2xl border border-slate-200 dark:border-white/10 animate-fadeIn max-w-[200px] relative">
          <p className="text-[10px] font-bold text-[#2BB6C6] uppercase tracking-widest mb-1">Aria Bot</p>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Missed calls = Missed revenue. Want to fix that? 🚀</p>
          <div className="absolute -bottom-1 right-0 w-2 h-2 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-white/10 rotate-45"></div>
        </div>
      )}

      {/* Chat Pane */}
      <div className={`mb-4 w-[350px] sm:w-[380px] h-[500px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#1e266e] to-[#2BB6C6] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <i className="fa-solid fa-robot text-lg"></i>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-tight">Swarup Assistant</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Online Now</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>

        {/* Thread */}
        <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-[#2BB6C6] text-[#0f172a] font-bold rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/5 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-1">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-white/5 shadow-inner">
                <div className="flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action.query)}
                className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[9px] font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-all"
              >
                {action.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about AI automation..."
              className="flex-grow bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-[#2BB6C6] transition-all"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 flex items-center justify-center bg-[#2BB6C6] text-[#0f172a] rounded-xl disabled:opacity-30 shadow-lg shadow-[#2BB6C6]/20 transition-all active:scale-95"
            >
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#1e266e] to-[#2BB6C6] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-100 group-hover:scale-110 transition-transform"></div>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
        
        {isOpen ? (
          <i className="fa-solid fa-xmark text-2xl transition-all duration-300"></i>
        ) : (
          <i className="fa-solid fa-comment-dots text-2xl transition-all duration-300 group-hover:rotate-12"></i>
        )}

        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2BB6C6] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#2BB6C6] border-2 border-white dark:border-slate-900"></span>
        </span>
      </button>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatWidget;