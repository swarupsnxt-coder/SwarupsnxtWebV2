import React, { useEffect, useRef } from 'react';
import VoiceStudio from './VoiceStudio';
import PhoneDemo from './PhoneDemo';

const LabCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 60;
    let frameId = 0;

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
        if (!reduceMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(43, 182, 198, ${p.opacity})` : `rgba(43, 182, 198, ${p.opacity + 0.2})`;
        ctx.fill();
      });
      if (!reduceMotion) frameId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      init();
      if (reduceMotion) animate();
    };

    init();
    animate();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const NxtLab: React.FC = () => {
  return (
    <section id="nxt-lab" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-24">
      {/* Background Layer Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LabCanvas />
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#2BB6C6]/5 to-transparent absolute top-0 left-0 animate-scanline opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Try it yourself</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">The NXT Lab</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Chat with our AI assistant to see how an AI chatbot answers your customers. Sample voice-agent calls are coming soon.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
          {/* Voice Studio Column */}
          <div id="voice-studio-container" className="lg:col-span-7 h-full relative group scroll-mt-32">
             <div className="absolute -inset-1 bg-gradient-to-r from-[#2BB6C6]/10 to-[#1e266e]/10 rounded-[2.6rem] blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
             <VoiceStudio />
          </div>

          {/* Phone Demo Column */}
          <div className="lg:col-span-5 flex justify-center h-full scroll-mt-32 relative group/phone-container">
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
