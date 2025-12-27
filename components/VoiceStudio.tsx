import React, { useState, useEffect, useRef } from 'react';

const VoiceStudio: React.FC = () => {
  const [industry, setIndustry] = useState('Real Estate');
  const [language, setLanguage] = useState('Indian English');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [personaKey, setPersonaKey] = useState('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [syncPercentage, setSyncPercentage] = useState(0);
  const [statusLogs, setStatusLogs] = useState<string[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const visualizerDataArrayRef = useRef<Uint8Array | null>(null);
  const particlesRef = useRef<any[]>([]);
  const currentRequestId = useRef<number>(0);

  const INDUSTRIES = ['Real Estate', 'Healthcare', 'Banking', 'Finance', 'E-commerce', 'EdTech'];
  const LANGUAGES = ['Indian English', 'US English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi', 'Punjabi'];
  
  const PERSONAS = {
    enthusiastic: {
      name: 'Enthusiastic',
      icon: 'fa-bolt',
      voices: { female: 'Kore', male: 'Fenrir' },
      directive: 'Speak with high energy and a friendly smile.',
      fallbackParams: { pitch: 1.3, rate: 1.2 }
    },
    assertive: {
      name: 'Assertive',
      icon: 'fa-user-tie',
      voices: { female: 'Kore', male: 'Fenrir' },
      directive: 'Speak with authority and confidence.',
      fallbackParams: { pitch: 1.0, rate: 1.05 }
    },
    calm: {
      name: 'Calm & Caring',
      icon: 'fa-leaf',
      voices: { female: 'Zephyr', male: 'Puck' },
      directive: 'Speak softly with deep empathy.',
      fallbackParams: { pitch: 0.9, rate: 0.8 }
    },
    neutral: {
      name: 'Efficiency Pro',
      icon: 'fa-robot',
      voices: { female: 'Kore', male: 'Puck' },
      directive: 'Speak with clear, efficient neutrality.',
      fallbackParams: { pitch: 1.0, rate: 1.0 }
    }
  };

  const SCRIPTS: Record<string, Record<string, string>> = {
    'Real Estate': {
      'Indian English': "Hi there! This is Swarup from Luxury Homes. I'm following up on your inquiry. Would you like to schedule a virtual tour?",
      'Hindi': "नमस्ते! मैं लक्ज़री होम्स से बात कर रही हूँ। क्या हम एक वर्चुअल टूर शेड्यूल कर सकते हैं?",
      'Tamil': "வணக்கம்! நான் லக்சுரி ஹோம்ஸிலிருந்து அழைக்கிறேன். நீங்கள் கேட்ட புதிய வீடுகள் பற்றிய தகவல்கள் என்னிடம் உள்ளன."
    }
  };

  const getScript = () => {
    const ind = SCRIPTS[industry] || SCRIPTS['Real Estate'];
    return ind[language] || ind['Indian English'] || "Connection established. Ready to communicate.";
  };

  const initParticles = (width: number, height: number) => {
    const pts = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    particlesRef.current = pts;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let audioLevel = 0;

      if (isPlaying && analyserRef.current && visualizerDataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(visualizerDataArrayRef.current);
        const sum = visualizerDataArrayRef.current.reduce((a, b) => a + b, 0);
        audioLevel = sum / (visualizerDataArrayRef.current.length * 1.2);
      } else if (isBuffering) {
        audioLevel = 15 + Math.sin(Date.now() / 80) * 12;
      }

      ctx.lineWidth = 0.5;
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const speedMultiplier = 1 + (audioLevel / 12);
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + audioLevel / 25), 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(34, 211, 238, ${p.opacity})` : `rgba(30, 38, 148, ${p.opacity + 0.2})`;
        ctx.fill();
      }

      const coreSize = 30 + (audioLevel / 1.5);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 4);
      
      if (isPlaying) {
        gradient.addColorStop(0, isDark ? 'rgba(34, 211, 238, 0.8)' : 'rgba(43, 182, 198, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (isBuffering) {
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, isBuffering]);

  const addLog = (msg: string) => {
    setStatusLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg.toUpperCase()}`, ...prev.slice(0, 1)]);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const stopAudio = () => {
    currentRequestId.current += 1;
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch (e) {}
      sourceRef.current = null;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsBuffering(false);
    setSyncPercentage(0);
  };

  const speakWithAPI = async (text: string) => {
    const reqId = ++currentRequestId.current;
    const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
    
    setIsBuffering(true);
    setSyncPercentage(20);
    addLog(`INIT NEURAL HANDSHAKE...`);

    try {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName: persona.voices[gender] })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      if (reqId !== currentRequestId.current) return;

      const base64Audio = data.base64Audio;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      
      const buffer = await decodeAudioData(decode(base64Audio), ctx);
      
      if (!analyserRef.current) {
        analyserRef.current = ctx.createAnalyser();
        analyserRef.current.fftSize = 64;
        visualizerDataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
      source.onended = () => { 
        if (reqId === currentRequestId.current) {
          setIsPlaying(false); 
          addLog("TRANSMISSION IDLE."); 
        }
      };
      sourceRef.current = source;
      
      setSyncPercentage(100);
      setIsBuffering(false);
      setIsPlaying(true);
      source.start();
    } catch (e) {
      console.error("API TTS Failed:", e);
      addLog("ERROR. FALLBACK ACTIVE.");
      speakWithFallback(text);
    }
  };

  const speakWithFallback = (text: string) => {
    setIsBuffering(false);
    const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
    addLog("OS SYNTHESIS OVERRIDE.");
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = (gender === 'female' ? 1.2 : 0.8) * persona.fallbackParams.pitch;
    utter.rate = persona.fallbackParams.rate;
    utter.onstart = () => setIsPlaying(true);
    utter.onend = () => { setIsPlaying(false); addLog("TRANSMISSION IDLE."); };
    window.speechSynthesis.speak(utter);
  };

  const handleAction = async () => {
    if (isPlaying || isBuffering) { stopAudio(); return; }
    speakWithAPI(getScript());
  };

  return (
    <div id="voice-studio" className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-5 md:p-8 border border-slate-200 dark:border-white/10 shadow-xl flex flex-col gap-6 h-full transition-all duration-500">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3 self-start">
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-500 shadow-lg ${isBuffering ? 'bg-purple-600 animate-pulse shadow-purple-500/30' : 'bg-accent-500 shadow-accent-500/20'}`}>
              <i className={`fa-solid ${isBuffering ? 'fa-dna' : 'fa-brain'}`}></i>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-[0.3em]">Vocal Engine</h3>
            <p className="text-[8px] font-bold uppercase tracking-widest text-accent-600">NXT-Core-Alpha Online</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="bg-slate-50/80 dark:bg-slate-950/40 rounded-[2rem] p-5 md:p-6 border border-slate-200 dark:border-white/5 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sector Matrix</label>
                <select 
                  value={industry} 
                  onChange={(e) => { setIndustry(e.target.value); stopAudio(); }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white outline-none"
                  disabled={isBuffering}
                >
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Dialect Node</label>
                <select 
                  value={language} 
                  onChange={(e) => { setLanguage(e.target.value); stopAudio(); }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white outline-none"
                  disabled={isBuffering}
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Vocal Signature</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button onClick={() => { setGender('female'); stopAudio(); }} disabled={isBuffering} className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === 'female' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>Female</button>
                  <button onClick={() => { setGender('male'); stopAudio(); }} disabled={isBuffering} className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === 'male' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}>Male</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PERSONAS).map(([key, v]) => (
                  <button 
                    key={key}
                    onClick={() => { setPersonaKey(key); stopAudio(); }}
                    disabled={isBuffering}
                    className={`p-3 rounded-2xl text-[9px] font-black border transition-all flex items-center gap-2 ${personaKey === key ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-100 text-slate-500 dark:bg-slate-800 dark:border-white/5 dark:text-slate-400'}`}
                  >
                    <i className={`fa-solid ${v.icon}`}></i>
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 font-mono text-[8px] border border-white/5 h-16 flex items-center relative overflow-hidden shadow-inner">
             <div className="flex gap-2 items-center">
                <span className={`w-1.5 h-1.5 rounded-full ${isBuffering ? 'bg-purple-500 animate-ping' : 'bg-accent-500 animate-pulse'}`}></span>
                <span className="text-accent-500/80">{statusLogs[0] || 'NEURAL LINK STABLE'}</span>
             </div>
             {isBuffering && (
               <div className="absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-all duration-300" style={{ width: `${syncPercentage}%` }}></div>
             )}
          </div>
        </div>

        <div className="lg:w-1/2 relative rounded-[2.5rem] bg-slate-100/30 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col items-center justify-center p-8 min-h-[350px]">
          <div className="absolute inset-0 pointer-events-none">
             <canvas ref={canvasRef} className="w-full h-full opacity-70" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <button 
              onClick={handleAction}
              disabled={isBuffering}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 transform hover:scale-110 active:scale-95 ${isPlaying || isBuffering ? 'bg-white border-2 border-accent-400 shadow-[0_0_60px_rgba(34,211,238,0.4)]' : 'bg-slate-900 text-white shadow-xl'}`}
            >
              {isBuffering ? <i className="fa-solid fa-circle-notch fa-spin text-accent-500 text-3xl"></i> : isPlaying ? <i className="fa-solid fa-stop text-accent-500 text-3xl"></i> : <i className="fa-solid fa-play text-3xl"></i>}
            </button>

            {(isPlaying || isBuffering) && (
              <div className="bg-white/95 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl p-5 shadow-2xl max-w-[240px] text-center animate-fadeIn">
                <p className="text-[10px] text-slate-800 dark:text-gray-100 font-bold italic leading-relaxed">
                   {isBuffering ? "Connecting to Neural Grid..." : `"${getScript()}"`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;