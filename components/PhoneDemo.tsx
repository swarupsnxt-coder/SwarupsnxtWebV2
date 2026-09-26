import React, { useState, useEffect, useRef } from 'react';
import ContactFallback from './ContactFallback';

// Website assistant (Phase C1). Talks to /api/chat (Cloudflare Pages Function + Workers AI).
// Turnstile runs once before the first message; the server then issues a 30-minute session.

type Role = 'user' | 'assistant';
interface Message { role: Role; content: string }

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

// Public site key (safe in the frontend). Falls back to Cloudflare's always-pass test key in local dev only.
const TURNSTILE_SITE_KEY: string =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? '1x00000000000000000000BB' : '');
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const MAX_CHARS = 500;

const GREETING: Message = {
  role: 'assistant',
  content: "Namaste! I'm the Swarups NXT assistant. Ask me anything about AI voice agents, chatbots or WhatsApp campaigns. What business are you in?",
};

const STARTERS = [
  'What can an AI voice agent do for my business?',
  'How do WhatsApp campaigns work?',
  'Do you support Tamil and Hindi?',
  'How do we get started?',
];

let turnstileScript: Promise<void> | null = null;
const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileScript) {
    turnstileScript = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => { turnstileScript = null; reject(new Error('Turnstile failed to load')); };
      document.head.appendChild(s);
    });
  }
  return turnstileScript;
};

const PhoneDemo: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [unavailable, setUnavailable] = useState(!TURNSTILE_SITE_KEY);

  const sessionRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const widgetHostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  // Scroll the chat itself (not the page) to the newest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, showContact]);

  useEffect(() => () => {
    if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
  }, []);

  // Runs the Turnstile widget (usually invisible; shows a checkbox only if needed) and returns a token.
  const getTurnstileToken = async (): Promise<string> => {
    await loadTurnstile();
    const host = widgetHostRef.current;
    if (!window.turnstile || !host) throw new Error('Turnstile unavailable');
    if (widgetIdRef.current) window.turnstile.remove(widgetIdRef.current);

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Verification timed out')), 30000);
      widgetIdRef.current = window.turnstile!.render(host, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        size: 'flexible',
        callback: (token: string) => { clearTimeout(timer); resolve(token); },
        'error-callback': () => { clearTimeout(timer); reject(new Error('Verification failed')); },
        'expired-callback': () => { clearTimeout(timer); reject(new Error('Verification expired')); },
      });
    });
  };

  const firstQuestion = messages.find(m => m.role === 'user')?.content;
  const whatsappText = firstQuestion
    ? `Hi Swarups NXT, I was chatting with your assistant about: "${firstQuestion.slice(0, 100)}"`
    : undefined;

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || sending || limitReached || unavailable) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setSending(true);

    try {
      const history = nextMessages.filter(m => m !== GREETING);
      const payload: Record<string, unknown> = { messages: history };
      if (sessionRef.current) payload.session = sessionRef.current;
      else payload.turnstileToken = await getTurnstileToken();

      let res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      let data = await res.json().catch(() => ({}));

      // Session expired: verify again once, then retry.
      if (data.needsVerification && sessionRef.current) {
        sessionRef.current = null;
        res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, turnstileToken: await getTurnstileToken() }),
        });
        data = await res.json().catch(() => ({}));
      }

      if (data.session) sessionRef.current = data.session;
      if (data.limitReached) setLimitReached(true);
      if (data.showContact) setShowContact(true);

      if (typeof data.reply === 'string' && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else if (data.limitReached) {
        setMessages(prev => [...prev, { role: 'assistant', content: "We've reached the chat limit for now. Our team would love to continue the conversation — pick an option below." }]);
      } else {
        setUnavailable(true);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setUnavailable(true);
    } finally {
      setSending(false);
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const hasUserMessage = messages.some(m => m.role === 'user');
  const inputDisabled = sending || limitReached || unavailable;

  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px] h-[640px] sm:h-[680px] group flex items-center justify-center">
      <div className="relative w-full h-full bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-[60px] p-[12px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[3px] border-slate-300 dark:border-slate-800 overflow-hidden">
        <div className="w-full h-full bg-white dark:bg-[#0b0b0e] rounded-[48px] flex flex-col relative overflow-hidden transition-colors">

          <div className="absolute top-0 left-0 w-full h-11 z-50 flex justify-center pt-3 pointer-events-none" aria-hidden="true">
            <div className={`h-[34px] bg-black rounded-full ring-1 ring-white/10 shadow-2xl flex items-center justify-center transition-all ${sending ? 'w-[180px]' : 'w-[120px]'}`}>
              {sending && <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider animate-pulse">Typing…</span>}
            </div>
          </div>

          <div className="px-10 pt-5 pb-1 flex justify-between items-center z-40 select-none" aria-hidden="true">
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
              <span className="text-[11px] text-[#2BB6C6] font-bold">{unavailable ? 'Offline — contact us below' : 'AI assistant'}</span>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto px-4 py-4 space-y-3 bg-[#f8f9fb] dark:bg-[#0b0b0e]"
            role="log"
            aria-live="polite"
            aria-label="Chat with the Swarups NXT assistant"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-[20px] text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap break-words ${
                  m.role === 'user'
                    ? 'bg-[#1e266e] text-white rounded-tr-[4px]'
                    : 'bg-white text-slate-800 dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-tl-[4px]'
                }`}>
                  <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>
                  {m.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="px-4 py-3 rounded-[20px] rounded-tl-[4px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex gap-1">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d}ms` }}></span>
                  ))}
                </div>
              </div>
            )}

            {!hasUserMessage && !unavailable && (
              <div className="flex flex-col items-start gap-2 pt-1">
                {STARTERS.map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={sending}
                    className="text-left px-3 py-2 bg-white dark:bg-slate-800 border border-[#2BB6C6]/40 rounded-2xl text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:border-[#2BB6C6] hover:text-[#2BB6C6] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {(showContact || unavailable) && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm">
                <ContactFallback
                  compact
                  whatsappText={whatsappText}
                  title={unavailable ? 'The assistant is unavailable right now' : 'Talk to our team'}
                  message={unavailable ? "Reach us directly and we'll answer your questions." : 'Pick whichever is easiest for you.'}
                />
              </div>
            )}
          </div>

          <div className="px-4 pt-3 pb-6 bg-white/95 dark:bg-[#0b0b0e]/95 border-t border-slate-100 dark:border-white/5 z-30">
            <div ref={widgetHostRef} className="empty:hidden mb-2"></div>
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor="phone-demo-input" className="sr-only">Message the assistant</label>
              <input
                id="phone-demo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_CHARS}
                disabled={inputDisabled}
                placeholder={unavailable ? 'Assistant unavailable' : limitReached ? 'Chat limit reached' : 'Ask about our AI solutions…'}
                className="flex-grow min-w-0 bg-[#f2f2f7] dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-white/5 rounded-full px-4 py-2 text-[14px] outline-none focus:border-[#2BB6C6] disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={inputDisabled || !input.trim()}
                aria-label="Send message"
                className="w-9 h-9 shrink-0 flex items-center justify-center bg-[#2BB6C6] rounded-full text-[#0f172a] disabled:opacity-30 transition-opacity"
              >
                <i className="fa-solid fa-arrow-up text-xs" aria-hidden="true"></i>
              </button>
            </form>
            <div className="mt-3 mx-auto w-[120px] h-[5px] bg-slate-900/10 dark:bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;
