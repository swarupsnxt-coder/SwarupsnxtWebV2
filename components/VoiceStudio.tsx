import React, { useState, useRef, useEffect } from 'react';
import { PERSONAS } from '../constants';
import { Persona } from '../types';
import { generateSpeech, decodeAudioData, getConfigurationError } from '../services/geminiService';

const NeuralVisualizer: React.FC<{ isPlaying: boolean; isProcessing: boolean }> = ({ isPlaying, isProcessing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      const barWidth = 6;
      const spacing = 10;
      const count = Math.floor(canvas.width / (barWidth + spacing));
      const centerY = canvas.height / 2;

      for (let i = 0; i < count; i++) {
        const x = i * (barWidth + spacing);
        const noise = Math.sin(i * 0.2 + time) * 0.5 + 0.5;
        
        let amplitude = 4 * noise + 2;
        if (isPlaying) {
          amplitude = 60 * Math.random() * noise + 10;
          ctx.fillStyle = '#2BB6C6';
        } else if (isProcessing) {
          amplitude = 20 * Math.random() * noise + 5;
          ctx.fillStyle = '#1e266e';
        } else {
          ctx.fillStyle = isDark ? 'rgba(43, 182, 198, 0.2)' : 'rgba(43, 182, 198, 0.4)';
        }
        
        ctx.beginPath();
        ctx.roundRect(x, centerY - amplitude / 2, barWidth, amplitude, 4);
        ctx.fill();
      }

      time += isPlaying ? 0.15 : isProcessing ? 0.08 : 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, isProcessing]);

  return <canvas ref={canvasRef} width={600} height={100} className="w-full h-24 transition-opacity duration-500" />;
};

const VoiceStudio: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [text, setText] = useState("Hello, I'm Aria from Swarups NXT. We specialize in sub-200ms latency AI automation. How can I help you scale today?");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const configError = getConfigurationError() || (errorMsg?.includes("Service Configuration Problem") ? errorMsg : null);

  const handleSpeak = async () => {
    if (!text || isLoading) return;
    setIsLoading(true);
    setErrorMsg(null);
    
    const steps = [
      "Initiating Neural Handshake...",
      "Encoding Semantic Stream...",
      "Synthesizing Vocal Frequencies...",
      "Finalizing PCM Buffer..."
    ];
    
    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
        stepIdx++;
      }
    }, 400);

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      
      const base64Audio = await generateSpeech(text, selectedPersona.voice);
      
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioBuffer = await decodeAudioData(bytes, ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => setIsPlaying(false);
      setIsPlaying(true);
      source.start();
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/10 h-full flex flex-col shadow-2xl transition-all relative overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">NXT Studio</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">Neural Synthesis Engine v3.0</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#2BB6C6]/10 text-[#2BB6C6] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#2BB6C6]/20">
          <span className={`w-2 h-2 rounded-full bg-[#2BB6C6] ${isPlaying || isLoading ? 'animate-ping' : 'opacity-50'}`}></span>
          {isLoading ? 'Processing' : isPlaying ? 'Transmitting' : 'Standby'}
        </div>
      </div>

      {configError && (
        <div className="mb-8 p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-4">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 text-xl"></i>
          <div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-1">Engine Warning</div>
            <p className="text-xs text-amber-800 dark:text-amber-400/80 leading-relaxed">{configError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-10">
        {PERSONAS.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPersona(p);
              setErrorMsg(null);
            }}
            className={`p-5 rounded-2xl border transition-all text-left group ${selectedPersona.id === p.id ? 'border-[#2BB6C6] bg-[#2BB6C6]/5 shadow-[0_0_20px_rgba(43,182,198,0.1)]' : 'border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}
          >
            <div className={`font-bold text-base mb-1 transition-colors ${selectedPersona.id === p.id ? 'text-[#2BB6C6]' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{p.name}</div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{p.description}</div>
          </button>
        ))}
      </div>

      <div className="mb-8 flex-grow">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Neural Input Message</label>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (errorMsg) setErrorMsg(null);
          }}
          className={`w-full bg-slate-50 dark:bg-[#1e266e]/10 border rounded-2xl p-6 text-sm outline-none min-h-[140px] resize-none text-slate-800 dark:text-white transition-all font-medium leading-relaxed ${errorMsg && !configError ? 'border-red-500' : 'border-slate-200 dark:border-white/5 focus:border-[#2BB6C6]'}`}
          placeholder="Craft your agent's response..."
        />
        {errorMsg && !configError && (
          <div className="mt-3 flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest px-1">
            <i className="fa-solid fa-circle-exclamation"></i>
            {errorMsg}
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-[#1e266e]/20 rounded-2xl p-6 mb-10 border border-slate-100 dark:border-white/5 relative">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Signal Analyzer</span>
          {isLoading && (
            <span className="text-[10px] text-[#2BB6C6] font-mono animate-pulse">{loadingStep}</span>
          )}
        </div>
        <NeuralVisualizer isPlaying={isPlaying} isProcessing={isLoading} />
      </div>

      <button
        onClick={handleSpeak}
        disabled={isLoading || !!configError}
        className={`w-full py-5 font-bold rounded-2xl transition-all flex items-center justify-center gap-4 text-lg shadow-xl ${configError ? 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed' : 'bg-[#2BB6C6] text-[#0f172a] hover:scale-[1.02] active:scale-95 shadow-[#2BB6C6]/30'}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
             <i className="fa-solid fa-dna fa-spin"></i>
             <span>Synthesizing...</span>
          </div>
        ) : (
          <>
            <i className="fa-solid fa-wave-square"></i>
            {configError ? 'System Offline' : 'Generate Real-Time Audio'}
          </>
        )}
      </button>
    </div>
  );
};

export default VoiceStudio;