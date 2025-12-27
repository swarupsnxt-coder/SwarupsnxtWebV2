import React, { useEffect, useRef, useState } from 'react';
import VoiceStudio from './VoiceStudio';
import PhoneDemo from './PhoneDemo';

const LabCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 60;

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 900;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(43, 182, 198, ${p.opacity})` : `rgba(43, 182, 198, ${p.opacity + 0.2})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const StatusNode: React.FC<{ label: string, value: string, icon: string, position: string }> = ({ label, value, icon, position }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`absolute ${position} z-10 hidden xl:flex items-center group cursor-crosshair`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-8 h-8 rounded-full bg-white dark:bg-[#1e266e] border border-slate-200 dark:border-[#2BB6C6]/40 flex items-center justify-center transition-all duration-500 shadow-lg ${isHovered ? 'scale-125 border-[#2BB6C6] shadow-[0_0_15px_rgba(43,182,198,0.5)]' : 'shadow-none'}`}>
        <i className={`fa-solid ${icon} text-[10px] text-[#2BB6C6] ${isHovered ? 'animate-pulse' : ''}`}></i>
      </div>
      <div className={`ml-3 bg-white/90 dark:bg-[#0f172a]/70 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 transition-all duration-500 overflow-hidden whitespace-nowrap shadow-xl ${isHovered ? 'max-w-[200px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 -translate-x-4 pointer-events-none'}`}>
        <div className="text-[8px] font-bold text-[#2BB6C6] uppercase tracking-widest">{label}</div>
        <div className="text-[10px] font-mono text-slate-800 dark:text-white">{value}</div>
      </div>
    </div>
  );
};

const HUDIndicator: React.FC<{ label: string, value: string, position: string, delay?: string }> = ({ label, value, position, delay = "0s" }) => (
  <div className={`absolute ${position} z-20 pointer-events-none animate-fadeIn`} style={{ animationDelay: delay }}>
    <div className="flex flex-col gap-1 items-start">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(43,182,198,0.8)]"></div>
        <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="pl-3.5 border-l border-accent-500/30">
        <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-accent-400">{value}</span>
      </div>
    </div>
  </div>
);

const NxtLab: React.FC = () => {
  return (
    <section id="nxt-lab" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-24">
      {/* Background Layer Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LabCanvas />
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#2BB6C6]/5 to-transparent absolute top-0 left-0 animate-scanline opacity-30"></div>
        <div 
          className="absolute inset-0 opacity-[0.01] dark:opacity-[0.03] animate-flicker"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(255, 255, 255, 0.03))', 
            backgroundSize: '100% 3px, 3px 100%' 
          }}
        ></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.02] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm animate-pulse">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2BB6C6]">Neural Intelligence Sandbox v2.5</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">The NXT Lab</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Experience the sub-200ms future. Real-time neural synthesis and interaction.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
          <StatusNode label="Core Latency" value="184ms" icon="fa-bolt" position="top-40 left-10" />
          <StatusNode label="Neural Sync" value="99.92%" icon="fa-arrows-rotate" position="top-48 right-[8%]" />
          <StatusNode label="Vocal Range" value="12Hz - 22kHz" icon="fa-wave-square" position="bottom-48 right-16" />

          {/* Voice Studio Column */}
          <div id="voice-studio-container" className="lg:col-span-7 h-full relative group scroll-mt-32">
             <div className="absolute -inset-1 bg-gradient-to-r from-[#2BB6C6]/10 to-[#1e266e]/10 rounded-[2.6rem] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
             <VoiceStudio />
          </div>

          {/* Phone Demo Column */}
          <div className="lg:col-span-5 flex justify-center h-full scroll-mt-32 relative group/phone-container">
            {/* Contextual HUD Elements for Phone */}
            <HUDIndicator label="Signal Protocol" value="5G-NEURAL" position="-top-4 -left-16" delay="0.5s" />
            <HUDIndicator label="Secure Link" value="AES-256-GCM" position="top-1/4 -right-20" delay="0.8s" />
            <HUDIndicator label="Token Flow" value="4.2k/sec" position="bottom-1/4 -left-20" delay="1.1s" />
            
            <div id="phone-demo" className="relative rounded-[60px] transition-all duration-500">
              <div className="absolute -inset-8 bg-accent-500/5 rounded-full blur-3xl group-hover/phone-container:bg-accent-500/10 transition-all duration-700"></div>
              <PhoneDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NxtLab;