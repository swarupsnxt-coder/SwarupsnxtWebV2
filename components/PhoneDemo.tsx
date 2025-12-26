
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAgent } from '../services/geminiService';
import { PERSONAS } from '../constants';

const PhoneDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to NXT Lab. Ask me anything about our deployment protocol." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const reply = await chatWithAgent(userMsg, PERSONAS[0].description);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to neural engine. Check API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative mx-auto w-[320px] h-[640px] bg-[#1e266e] rounded-[50px] border-[10px] border-[#2BB6C6]/20 shadow-2xl p-4 flex flex-col overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0f172a] rounded-b-2xl z-20"></div>
      
      {/* Screen */}
      <div className="flex-grow bg-[#0f172a] rounded-[35px] flex flex-col p-4 pt-10 overflow-hidden relative">
        <div ref={scrollRef} className="flex-grow overflow-y-auto mb-4 space-y-4 pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${m.role === 'user' ? 'bg-[#2BB6C6] text-[#0f172a]' : 'bg-[#1e266e] text-white'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1e266e] p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your query..."
            className="w-full bg-[#1e266e]/50 border border-white/5 rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#2BB6C6]"
          />
          <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2BB6C6]">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="mt-3 flex justify-center">
        <div className="w-20 h-1 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default PhoneDemo;
