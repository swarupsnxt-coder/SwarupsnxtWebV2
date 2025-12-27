import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAgent, getConfigurationError } from '../services/geminiService';
import { PERSONAS } from '../constants';

const PhoneDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Namaste! I'm Swarup's AI Assistant.\n\n• 80% fewer missed calls\n• 40% revenue boost\n\nWhat business are you in?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [typingStatus, setTypingStatus] = useState("Analyzing request...");
  const [currentTime, setCurrentTime] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true; 
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = async () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Microphone access is required.");
    }
  };

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    const trimmedInput = textToSend.trim();
    if (!trimmedInput || isTyping) return;
    
    const configError = getConfigurationError();
    if (configError) {
      setMessages(prev => [...prev, 
        { role: 'user', text: trimmedInput },
        { role: 'model', text: `[SYSTEM ERROR]\n${configError}` }
      ]);
      setInput("");
      return;
    }

    if (!customMessage) setInput("");
    setMessages(prev => [...prev, { role: 'user', text: trimmedInput }]);
    setIsTyping(true);
    
    const statuses = [
      "Consulting ROI blueprints...",
      "Mapping automation funnel...",
      "Qualifying bottlenecks...",
      "Synthesizing Strategic Response..."
    ];
    let sIdx = 0;
    const statusInterval = setInterval(() => {
      setTypingStatus(statuses[sIdx % statuses.length]);
      sIdx++;
    }, 800);

    try {
      const reply = await chatWithAgent(trimmedInput, PERSONAS[0].description);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `[ERROR]: Neural link interrupted. Check your API configuration.` 
      }]);
    } finally {
      clearInterval(statusInterval);
      setIsTyping(false);
      setTypingStatus("Analyzing request...");
    }
  };

  const quickActions = [
    { label: "Missed Calls", query: "I'm missing too many calls." },
    { label: "Timeline", query: "How fast can you deploy?" },
    { label: "Cost", query: "Is AI expensive?" },
    { label: "Hinglish", query: "Can you talk in Hinglish?" }
  ];

  return (
    <div className="relative mx-auto w-[320px] h-[680px] select-none group flex items-center justify-center">
      {/* Frame Components */}
      <div className="absolute -left-[3px] top-[100px] w-[3px] h-8 bg-slate-300 dark:bg-slate-700 rounded-l-md border-r border-black/10 z-10"></div>
      <div className="absolute -left-[3px] top-[150px] w-[3px] h-14 bg-slate-300 dark:bg-slate-700 rounded-l-md border-r border-black/10 z-10"></div>
      <div className="absolute -left-[3px] top-[220px] w-[3px] h-14 bg-slate-300 dark:bg-slate-700 rounded-l-md border-r border-black/10 z-10"></div>
      <div className="absolute -right-[3px] top-[180px] w-[3px] h-20 bg-slate-300 dark:bg-slate-700 rounded-r-md border-l border-black/10 z-10"></div>

      <div className="relative w-full h-full bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-[60px] p-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-1 ring-slate-400/20 dark:ring-white/5 border-[3px] border-slate-300 dark:border-slate-800 transition-all duration-700 overflow-hidden">
        <div className="w-full h-full bg-[#1c1c1e] dark:bg-black rounded-[50px] p-[2px] overflow-hidden relative shadow-inner">
          <div className="w-full h-full bg-white dark:bg-[#0b0b0e] rounded-[48px] flex flex-col relative overflow-hidden transition-colors duration-500">
            
            {/* Dynamic Island */}
            <div className="absolute top-0 left-0 w-full h-11 z-50 flex justify-center pt-3 pointer-events-none">
              <div className={`h-[34px] bg-black rounded-full flex items-center justify-between px-4 ring-1 ring-white/10 shadow-2xl transition-all duration-500 ${isTyping || isListening ? 'w-[250px]' : 'w-[120px]'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isTyping ? 'bg-cyan-400 animate-pulse' : isListening ? 'bg-red-500 animate-ping' : 'bg-slate-800'}`}></div>
                  {(isTyping || isListening) && (
                    <span className="text-[9px] text-white/90 font-bold uppercase tracking-wider animate-fadeIn">
                      {isListening ? 'Vocal Input Active' : typingStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="px-10 pt-5 pb-1 flex justify-between items-center z-40 bg-transparent">
              <span className="text-[13px] font-bold text-slate-900 dark:text-white">{currentTime}</span>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-signal text-[10px] text-slate-900 dark:text-white"></i>
                <i className="fa-solid fa-wifi text-[10px] text-slate-900 dark:text-white"></i>
              </div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 mt-2 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-xl z-30">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1e266e] to-[#2BB6C6] flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-800">
                  <i className="fa-solid fa-user-tie text-base"></i>
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-white dark:border-[#1c1c1e]"></div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">Swarup Assistant</h4>
                <span className="text-[9px] text-[#2BB6C6] font-black uppercase tracking-widest">Strategic Specialist</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto px-5 py-6 space-y-5 custom-scrollbar bg-[#f8f9fb] dark:bg-[#0b0b0e]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[82%] px-4 py-2.5 rounded-[20px] text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                    m.role === 'user' 
                      ? 'bg-[#007aff] text-white font-medium rounded-tr-[4px]' 
                      : m.text.includes('[SYSTEM ERROR]') 
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-tl-[4px] font-mono text-[10px]'
                        : 'bg-white dark:bg-[#1c1c1e] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 rounded-tl-[4px]'
                  }`}>
                    {m.text}
                    {m.text.includes('[SYSTEM ERROR]') && (
                      <button 
                        onClick={() => window.location.reload()} 
                        className="mt-3 block w-full py-2 bg-red-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
                      >
                        Retry Protocol
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start gap-1">
                  <div className="bg-white dark:bg-[#1c1c1e] px-4 py-2.5 rounded-[20px] rounded-tl-[4px] border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex gap-1 items-center py-1">
                      <div className="w-1.5 h-1.5 bg-[#2BB6C6] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#2BB6C6]/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#2BB6C6]/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 pt-3 pb-10 bg-white/95 dark:bg-[#0b0b0e]/95 backdrop-blur-2xl border-t border-slate-100 dark:border-white/5 relative z-30">
              <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-1">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action.query)}
                    className="flex-shrink-0 px-3.5 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap hover:bg-[#2BB6C6]/10 hover:border-[#2BB6C6] transition-all"
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleListening}
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition-all shadow-md ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-white/5 text-[#007aff] dark:text-[#2BB6C6]'}`}
                >
                  <i className={`fa-solid ${isListening ? 'fa-microphone-lines' : 'fa-microphone'} text-xl`}></i>
                </button>
                
                <div className="relative flex-grow">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isListening ? "Listening..." : "Message Swarup..."}
                    className="w-full bg-[#f2f2f7] dark:bg-[#1a1a1c] border border-slate-200 dark:border-white/10 rounded-full px-5 py-2 text-[14px] outline-none focus:ring-1 focus:ring-[#007aff] transition-all text-slate-900 dark:text-white"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#007aff] rounded-full text-white disabled:opacity-30"
                  >
                    <i className="fa-solid fa-arrow-up text-xs font-black"></i>
                  </button>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-slate-900/10 dark:bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PhoneDemo;