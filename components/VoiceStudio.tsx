
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PERSONAS } from '../constants';
import { Persona } from '../types';
import { generateSpeech, decodeAudioData } from '../services/geminiService';

const NeuralVisualizer: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
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
      ctx.strokeStyle = '#2BB6C6';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const amplitude = isPlaying ? 30 : 5;
        const frequency = isPlaying ? 0.05 : 0.02;
        const y = centerY + Math.sin(x * frequency + time) * amplitude * Math.sin(time * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += isPlaying ? 0.2 : 0.05;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return <canvas ref={canvasRef} width={400} height={100} className="w-full h-24" />;
};

const VoiceStudio: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [text, setText] = useState("Hello, I'm Aria from Swarups NXT. How can I transform your business today?");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleSpeak = async () => {
    if (!text || isLoading) return;
    setIsLoading(true);

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      
      const base64Audio = await generateSpeech(text, selectedPersona.voice);
      
      // Manual decoding of base64 to bytes
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
    } catch (error) {
      console.error("Speech generation failed", error);
      alert("AI Voice Generation failed. Please ensure your API key is configured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 border-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">The NXT Voice Studio</h3>
        <span className="px-3 py-1 bg-[#2BB6C6]/20 text-[#2BB6C6] rounded text-[10px] font-bold uppercase tracking-widest">Live API</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {PERSONAS.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPersona(p)}
            className={`p-4 rounded-xl border transition-all text-left ${selectedPersona.id === p.id ? 'border-[#2BB6C6] bg-[#2BB6C6]/10' : 'border-white/5 hover:border-white/20'}`}
          >
            <div className="font-bold text-sm">{p.name}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{p.description}</div>
          </button>
        ))}
      </div>

      <div className="mb-6 flex-grow">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Simulation Script</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-[#0f172a] border border-white/5 rounded-xl p-4 text-sm focus:border-[#2BB6C6] outline-none min-h-[120px] resize-none"
          placeholder="Enter what the agent should say..."
        />
      </div>

      <div className="bg-[#0f172a] rounded-xl p-4 mb-8 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Neural Visualizer</span>
          <span className="text-[10px] text-[#2BB6C6] uppercase tracking-widest">{isPlaying ? 'Output Active' : 'Idle'}</span>
        </div>
        <NeuralVisualizer isPlaying={isPlaying} />
      </div>

      <button
        onClick={handleSpeak}
        disabled={isLoading}
        className="w-full py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <i className="fa-solid fa-spinner fa-spin"></i>
        ) : (
          <>
            <i className="fa-solid fa-waveform"></i>
            Synthesize Realism
          </>
        )}
      </button>
    </div>
  );
};

export default VoiceStudio;
