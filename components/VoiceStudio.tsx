import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const VoiceStudio: React.FC = () => {
  const [industry, setIndustry] = useState('Real Estate');
  const [language, setLanguage] = useState('Indian English');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [personaKey, setPersonaKey] = useState('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [syncPercentage, setSyncPercentage] = useState(0);
  const [generatedScript, setGeneratedScript] = useState('');
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
      directive: 'Speak with high energy, excitement, and a bright, friendly smile in your voice.',
      fallbackParams: { pitch: 1.3, rate: 1.2 }
    },
    assertive: {
      name: 'Assertive',
      icon: 'fa-user-tie',
      voices: { female: 'Kore', male: 'Fenrir' },
      directive: 'Speak with authority, confidence, and a professional, commanding tone.',
      fallbackParams: { pitch: 1.0, rate: 1.05 }
    },
    calm: {
      name: 'Calm & Caring',
      icon: 'fa-leaf',
      voices: { female: 'Zephyr', male: 'Puck' },
      directive: 'Speak softly, slowly, and with deep empathy and reassurance.',
      fallbackParams: { pitch: 0.9, rate: 0.8 }
    },
    neutral: {
      name: 'Efficiency Pro',
      icon: 'fa-robot',
      voices: { female: 'Kore', male: 'Puck' },
      directive: 'Speak with a neutral, clear, and highly efficient informative tone.',
      fallbackParams: { pitch: 1.0, rate: 1.0 }
    }
  };

  const SCRIPTS: Record<string, Record<string, string>> = {
    'Real Estate': {
      'Indian English': "Hi there! This is Swarup from Luxury Homes. I'm following up on your inquiry about the park-facing apartments. Would you like to schedule a virtual tour this weekend?",
      'US English': "Hello! This is a follow-up from the premium realty group regarding the listings you saved. Is there a specific property you'd like more details on?",
      'Hindi': "नमस्ते! मैं लक्ज़री होम्स से बात कर रही हूँ। आपने हमारे नए अपार्टमेंट्स के बारे में पूछा था। क्या हम इस बारे में बात कर सकते हैं?",
      'Tamil': "வணக்கம்! நான் லக்சுரி ஹோம்ஸிலிருந்து அழைக்கிறேன். நீங்கள் கேட்ட புதிய வீடுகள் பற்றிய தகவல்கள் என்னிடம் உள்ளன.",
      'Telugu': "నమస్కారం! లగ్జరీ హోమ్స్ నుండి స్వరూప్ మాట్లాడుతున్నాను. మీరు అడిగిన అపార్ట్‌మెంట్ల వివరాలు నా దగ్గర ఉన్నాయి.",
      'Malayalam': "നമസ്കാരം! ലക്ഷ്വറി ഹോംസിൽ നിന്ന് സ്വരൂപ് ആണ് സംസാരിക്കുന്നത്. നിങ്ങൾ അന്വേഷിച്ച പുതിയ ഫ്ലാറ്റുകളെ കുറിച്ച് സംസാരിക്കാൻ സാധിക്കുമോ?",
      'Kannada': "ನಮಸ್ಕಾರ! ಲಕ್ಸುರಿ ಹೋಮ್ಸ್‌ನಿಂದ ಸ್ವರೂಪ್ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ನೀವು ವಿಚಾರಿಸಿದ ಹೊಸ ಮನೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಲು ಕರೆ ಮಾಡಿದ್ದೇನೆ.",
      'Marathi': "नमस्कार! मी लग्झरी होम्समधून बोलत आहे. आपण ज्या नवीन अपार्टमेंट्सबद्दल विचारले होते, त्याबद्दल बोलायचे होते.",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਲਗਜ਼ਰੀ ਹੋਮਜ਼ ਤੋਂ ਬੋਲ ਰਿਹਾ ਹਾਂ। ਤੁਹਾਡੀ ਨਵੀਂ ਅਪਾਰਟਮੈਂਟ ਦੀ ਪੁੱਛਗਿੱਛ ਦੇ ਸੰਬੰਧ ਵਿੱਚ ਗੱਲ ਕਰਨੀ ਸੀ।"
    },
    'Healthcare': {
      'Indian English': "Good morning. I'm calling from Apollo Wellness to confirm your health checkup tomorrow at 10 AM. Please remember to fast for 8 hours before the test.",
      'US English': "Hi, this is a reminder for your upcoming appointment with the specialist. Please arrive 15 minutes early to complete your paperwork.",
      'Hindi': "नमस्ते, मैं आपके कल के हेल्थ चेकअप की पुष्टि करने के लिए कॉल कर रही हूँ। कृपया समय पर पहुँचें।",
      'Tamil': "வணக்கம், நாளை உங்கள் மருத்துவ பரிசோதனை இருப்பதை உறுதி செய்ய அழைக்கிறேன்.",
      'Telugu': "నమస్కారం, అపోలో వెల్‌నెస్ నుండి మీ రేపటి హెల్త్ చెకప్ గురించి కాల్ చేస్తున్నాను.",
      'Malayalam': "നമസ്കാരം, നാളത്തെ നിങ്ങളുടെ ഹെൽത്ത് ചെക്കപ്പ് സ്ഥിരീകരിക്കാനാണ് ഞാൻ വിളിക്കുന്നത്. കൃത്യസമയത്ത് എത്താൻ ശ്രദ്ധിക്കുമല്ലോ.",
      'Kannada': "ನಮಸ್ಕಾರ, ನಾಳೆಯ ನಿಮ್ಮ ಆರೋಗ್ಯ ತಪಾಸಣೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ಕರೆ ಮಾಡುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಬನ್ನಿ.",
      'Marathi': "नमस्कार, आपल्या उद्याच्या आरोग्य तपासणीची पुष्टी करण्यासाठी मी कॉल केला आहे. कृपया वेळेवर उपस्थित राहा.",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਤੁਹਾਡੀ ਕੱਲ੍ਹ ਦੀ ਸਿਹਤ ਜਾਂਚ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਫ਼ੋਨ ਕੀਤਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਸਮੇਂ ਸਿਰ ਪਹੁੰਚੋ ਜੀ।"
    },
    'Banking': {
      'Indian English': "Hello! I'm calling from NXT Bank. We've detected an unauthorized attempt on your credit card. Did you just authorize a transaction of five thousand rupees?",
      'US English': "This is an urgent notification regarding your account security. We have blocked a suspicious login attempt from a new device.",
      'Hindi': "नमस्ते, हम आपके बैंक खाते की सुरक्षा के लिए कॉल कर रहे हैं। क्या आपने अभी कोई ट्रांजेक्शन किया है?",
      'Tamil': "வணக்கம், உங்கள் வங்கி கணக்கின் பாதுகாப்பு குறித்து அழைக்கிறோம்.",
      'Telugu': "నమస్కారం, మేము ఎన్ఎక్స్టీ బ్యాంక్ నుండి మాట్లాడుతున్నాము. మీ ఖాతా భద్రత గురించి కాల్ చేస్తున్నాము.",
      'Malayalam': "നമസ്കാരം, നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിന്റെ സുരക്ഷയുമായി ബന്ധപ്പെട്ട് വിളിക്കുകയാണ്. നിങ്ങൾ ഇപ്പോൾ എന്തെങ്കിലും ഇടപാട് നടത്തിയോ?",
      'Kannada': "ನಮಸ್ಕಾರ, ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯ ಭದ್ರತೆಯ ಬಗ್ಗೆ ಮಾತನಾಡಲು ಕರೆ ಮಾಡಿದ್ದೇನೆ. ನೀವು ಈಗ ಯಾವುದಾದರೂ ವ್ಯವಹಾರ ಮಾಡಿದ್ದೀರಾ?",
      'Marathi': "नमस्कार, आपल्या बँक खात्याच्या सुरक्षिततेबाबत माहिती देण्यासाठी मी कॉल केला आहे. आपण आता काही व्यवहार केला आहे का?",
      'Punjabi': "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਤੁਹਾਡੇ ਬੈਂਕ ਖਾਤੇ ਦੀ ਸੁਰੱਖਿਆ ਦੇ ਸਬੰਧ ਵਿੱਚ ਫ਼ੋਨ ਕੀਤਾ ਹੈ। ਕੀ ਤੁਸੀਂ ਹੁਣੇ ਕੋਈ ਲੈਣ-ਦੇਣ ਕੀਤਾ ਹੈ?"
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

        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineOpacity = (1 - dist / 85) * 0.2 * (1 + audioLevel / 12);
            ctx.strokeStyle = isDark ? `rgba(34, 211, 238, ${lineOpacity})` : `rgba(30, 38, 148, ${lineOpacity + 0.1})`;
            ctx.stroke();
          }
        }
      }

      const coreSize = 30 + (audioLevel / 1.5);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 4);
      
      if (isPlaying) {
        gradient.addColorStop(0, isDark ? 'rgba(34, 211, 238, 0.8)' : 'rgba(43, 182, 198, 0.9)');
        gradient.addColorStop(0.2, isDark ? 'rgba(34, 211, 238, 0.1)' : 'rgba(43, 182, 198, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (isBuffering) {
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
        gradient.addColorStop(0.2, 'rgba(168, 85, 247, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, isDark ? 'rgba(51, 65, 85, 0.1)' : 'rgba(203, 213, 225, 0.3)');
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

  const speakWithGenAI = async (text: string) => {
    const reqId = ++currentRequestId.current;
    const apiKey = process.env.API_KEY;
    const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
    
    if (!apiKey || apiKey === 'undefined' || apiKey.trim() === '') {
      addLog("API KEY MISSING. FALLBACK ACTIVE.");
      speakWithFallback(text); 
      return; 
    }
    
    setIsBuffering(true);
    addLog(`ENCODING VOCAL SIGNAL...`);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const voiceName = persona.voices[gender];
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { 
            voiceConfig: { 
              prebuiltVoiceConfig: { voiceName: voiceName as any } 
            } 
          }
        }
      });
      
      if (reqId !== currentRequestId.current) return;

      const candidate = response.candidates?.[0];
      const base64Audio = candidate?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      
      if (!base64Audio) {
        addLog("SYNC FAILED. FALLBACK.");
        speakWithFallback(text);
        return;
      }
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      
      const buffer = await decodeAudioData(decode(base64Audio), ctx);
      
      if (reqId !== currentRequestId.current) return;

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
      
      addLog("STREAMING NEURAL VOICE...");
      setSyncPercentage(100);
      setTimeout(() => {
        setIsBuffering(false);
        setIsPlaying(true);
        source.start();
      }, 300);
    } catch (e) {
      console.error("GenAI TTS Failed:", e);
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
    utter.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utter);
  };

  const handleAction = async () => {
    if (isPlaying || isBuffering) { stopAudio(); return; }
    const script = getScript();
    setGeneratedScript('');
    speakWithGenAI(script);
  };

  return (
    <div id="voice-studio" className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-5 md:p-8 border border-slate-200 dark:border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.3)] flex flex-col gap-6 h-full transition-all duration-500">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3 self-start">
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-500 shadow-lg ${isBuffering ? 'bg-purple-600 animate-pulse shadow-purple-500/30' : 'bg-accent-500 shadow-accent-500/20'}`}>
              <i className={`fa-solid ${isBuffering ? 'fa-dna' : 'fa-brain'} ${isPlaying ? 'animate-bounce' : ''}`}></i>
            </div>
            <div className={`absolute -top-1 -right-1 w-3 h-3 border-2 border-white dark:border-slate-900 rounded-full transition-colors duration-500 ${isBuffering ? 'bg-purple-500 animate-ping' : 'bg-green-500'}`}></div>
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-[0.3em]">Vocal Engine</h3>
            <p className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-500 ${isBuffering ? 'text-purple-500 animate-pulse' : 'text-accent-600 dark:text-accent-400'}`}>
                {isBuffering ? `Neural Sync: ${Math.round(syncPercentage)}%` : 'NXT-Core-Alpha Online'}
            </p>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-white/10">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Template Mode Active</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="bg-slate-50/80 dark:bg-slate-950/40 rounded-[2rem] p-5 md:p-6 border border-slate-200 dark:border-white/5 flex flex-col gap-5 transition-colors">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sector Matrix</label>
                  <i className="fa-solid fa-microchip text-[10px] text-accent-500/50"></i>
                </div>
                <select 
                  value={industry} 
                  onChange={(e) => { setIndustry(e.target.value); stopAudio(); }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-500/20 transition-all appearance-none disabled:opacity-50"
                  disabled={isBuffering}
                >
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Dialect Node</label>
                  <i className="fa-solid fa-globe text-[10px] text-accent-500/50"></i>
                </div>
                <select 
                  value={language} 
                  onChange={(e) => { setLanguage(e.target.value); stopAudio(); }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-500/20 transition-all appearance-none disabled:opacity-50"
                  disabled={isBuffering}
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Vocal Signature</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                  <button 
                    onClick={() => { setGender('female'); stopAudio(); }}
                    disabled={isBuffering}
                    className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === 'female' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'} disabled:opacity-50`}
                  >
                    Female
                  </button>
                  <button 
                    onClick={() => { setGender('male'); stopAudio(); }}
                    disabled={isBuffering}
                    className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === 'male' ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'} disabled:opacity-50`}
                  >
                    Male
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PERSONAS).map(([key, v]) => (
                  <button 
                    key={key}
                    onClick={() => { setPersonaKey(key); stopAudio(); }}
                    disabled={isBuffering}
                    className={`relative p-3 rounded-2xl text-[9px] font-black border transition-all flex flex-col items-start gap-1 group/voice ${personaKey === key ? 'bg-slate-900 dark:bg-slate-800 border-slate-900 dark:border-slate-700 text-white shadow-xl' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-accent-500/30'} disabled:opacity-50`}
                  >
                    <div className="flex items-center gap-2">
                        <i className={`fa-solid ${v.icon} ${personaKey === key ? 'text-accent-400' : 'text-slate-300'}`}></i>
                        <span>{v.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 font-mono text-[8px] border border-white/5 h-12 flex items-center justify-between overflow-hidden relative">
             <div className="flex gap-2 items-center relative z-10">
                <span className={`w-1.5 h-1.5 rounded-full ${isBuffering ? 'bg-purple-500 animate-ping' : 'bg-accent-500 animate-pulse'}`}></span>
                {statusLogs.map((log, idx) => (
                  <span key={idx} className={`whitespace-nowrap overflow-hidden text-ellipsis ${isBuffering ? 'text-purple-400' : 'text-accent-500/80'}`}>
                    {log}
                  </span>
                ))}
             </div>
             {isBuffering && (
               <div className="absolute inset-0 bg-purple-500/5 animate-pulse"></div>
             )}
          </div>
        </div>

        <div className="lg:w-1/2 relative rounded-[2.5rem] bg-slate-100/30 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 overflow-hidden flex flex-col items-center justify-center p-8 min-h-[350px] md:min-h-[400px] group/hud transition-colors">
          <div className="absolute inset-0 pointer-events-none">
             <canvas ref={canvasRef} className="w-full h-full opacity-70 group-hover/hud:opacity-100 transition-opacity duration-1000" />
          </div>

          {isBuffering && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/30 dark:bg-brand-900/30 backdrop-blur-md transition-all duration-500 animate-fade-in">
               <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-accent-500/20 border-t-accent-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <i className="fa-solid fa-dna text-accent-500 text-2xl animate-pulse"></i>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] animate-pulse">
                    Forging Neural Pathway...
                 </p>
                 <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                   <div 
                    className="h-full bg-accent-500 transition-all duration-300" 
                    style={{ width: `${syncPercentage}%` }}
                   ></div>
                 </div>
                 <p className="text-[8px] font-black text-accent-400 uppercase tracking-widest">{Math.round(syncPercentage)}% Complete</p>
               </div>
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full gap-8">
            <button 
              onClick={handleAction}
              disabled={isBuffering}
              className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-700 transform hover:scale-110 active:scale-95 group/main-node
              ${isPlaying || isBuffering 
                ? 'bg-white dark:bg-slate-800 border-2 border-accent-400 shadow-[0_0_60px_rgba(34,211,238,0.2)] dark:shadow-[0_0_60px_rgba(34,211,238,0.4)]' 
                : 'bg-slate-900 dark:bg-slate-800 border-2 border-transparent shadow-2xl shadow-slate-900/20 dark:shadow-brand-900/30'}`}
            >
              <div className={`text-4xl transition-all duration-700 ${isPlaying || isBuffering ? 'text-accent-500 rotate-180' : 'text-white'}`}>
                 {isBuffering ? <i className="fa-solid fa-circle-notch fa-spin"></i> : isPlaying ? <i className="fa-solid fa-stop"></i> : <i className="fa-solid fa-play"></i>}
              </div>
              
              {(isPlaying || isBuffering) && (
                <div className="absolute inset-[-10px] rounded-full border-2 border-accent-500/30 animate-ping"></div>
              )}
            </button>

            <div className={`transition-all duration-700 px-6 transform ${(isPlaying || isBuffering) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
               <div className={`bg-white/95 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl p-5 shadow-2xl max-w-[240px] text-center relative ${isBuffering ? 'animate-pulse' : ''}`}>
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-colors ${isBuffering ? 'bg-purple-500' : 'bg-accent-500'}`}></div>
                  <p className="text-[10px] text-slate-800 dark:text-gray-100 font-bold leading-relaxed italic">
                     {isBuffering && !isPlaying ? (
                       <span className="opacity-50 italic">Synthesizing vocal patterns...</span>
                     ) : (
                       `"${isPlaying ? getScript() : ''}"`
                     )}
                  </p>
               </div>
            </div>
          </div>
          
          <div className="absolute top-6 left-6 text-[7px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-l border-t border-slate-200 dark:border-slate-800 pt-1 pl-1">Input: {isPlaying ? 'Streaming' : isBuffering ? 'Buffering' : 'Ready'}</div>
          <div className="absolute bottom-6 right-6 text-[7px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-r border-b border-slate-200 dark:border-slate-800 pb-1 pr-1">Status: {isBuffering ? 'Busy' : 'Link OK'}</div>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;