import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAgent } from '../services/geminiService';
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
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = async () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported.");
    if (isListening) return recognitionRef.current.stop();
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
    } catch (err) {
      alert("Microphone access is required.");
    }
  };

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    const trimmedInput = textToSend.trim();
    if (!trimmedInput || isTyping) return;
    
    if (!customMessage) setInput("");
    setMessages(prev => [...prev, { role: 'user', text: trimmedInput }]);
    setIsTyping(true);
    
    const statuses = ["Consulting ROI blueprints...", "Mapping automation funnel...", "Synthesizing Strategic Response..."];
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
        text: `[CONNECTION ERROR]\n${error.message || "Failed to connect to Neural Engine."}\n\nTroubleshooting:\n- Ensure API_KEY is set in Cloudflare Settings.\n- Trigger a 'Retry Deployment'.`
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
    { label: "Cost", query: "Is AI expensive?" }
  ];

  return (
    <div className="relative mx-auto w-[320px] h-[680px] select-none group flex items-center justify-center">
      <div className="relative w-full h-full bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-[60px] p-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[3px] border-slate-300 dark:border-slate-800 overflow-hidden">
        <div className="w-full h-full bg-white dark:bg-[#0b0b0e] rounded-[48px] flex flex-col relative overflow-hidden transition-colors">
          
          <div className="absolute top-0 left-0 w-full h-11 z-50 flex justify-center pt-3 pointer-events-none">
            <div className={`h-[34px] bg-black rounded-full flex items-center justify-center px-4 ring-1 ring-white/10 shadow-2xl transition-all ${isTyping || isListening ? 'w-[250px]' : 'w-[120px]'}`}>
              {isTyping && <span className="text-[9px] text-white/90 font-bold uppercase tracking-wider animate-pulse">{typingStatus}</span>}
            </div>
          </div>

          <div className="px-10 pt-5 pb-1 flex justify-between items-center z-40">
            <span className="text-[13px] font-bold text-slate-900 dark:text-white">{currentTime}</span>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-signal text-[10px] text-slate-900"></i>
              <i className="fa-solid fa-wifi text-[10px] text-slate-900"></i>
            </div>
          </div>

          <div className="px-6 py-4 mt-2 flex items-center gap-3 border-b border-slate-100 dark:border-white/5 z-30">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1e266e] to-[#2BB6C6] flex items-center justify-center text-white shadow-lg">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-900 dark:text-white">Swarup Assistant</h4>
              <span className="text-[8px] text-[#2BB6C6] font-black uppercase tracking-widest">NXT Specialist</span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto px-5 py-6 space-y-5 bg-[#f8f9fb] dark:bg-[#0b0b0e]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-[20px] text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                  m.role === 'user' 
                    ? 'bg-[#007aff] text-white rounded-tr-[4px]' 
                    : m.text.includes('[CONNECTION ERROR]')
                      ? 'bg-red-50 text-red-600 border border-red-200 text-[10px] font-mono'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-[4px]'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pt-3 pb-10 bg-white/95 dark:bg-[#0b0b0e]/95 border-t border-slate-100 dark:border-white/5 z-30">
            <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-1">
              {quickActions.map((action, idx) => (
                <button key={idx} onClick={() => handleSend(action.query)} className="flex-shrink-0 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 whitespace-nowrap">{action.label}</button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleListening} className={`w-9 h-9 flex items-center justify-center rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-[#007aff]'}`}>
                <i className={`fa-solid ${isListening ? 'fa-microphone-lines' : 'fa-microphone'}`}></i>
              </button>
              
              <div className="relative flex-grow">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Swarup..."
                  className="w-full bg-[#f2f2f7] border border-slate-200 rounded-full px-5 py-2 text-[14px] outline-none"
                />
                <button onClick={() => handleSend()} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#007aff] rounded-full text-white disabled:opacity-30">
                  <i className="fa-solid fa-arrow-up text-xs font-black"></i>
                </button>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-slate-900/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;