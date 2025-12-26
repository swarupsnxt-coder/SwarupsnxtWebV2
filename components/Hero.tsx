
import React, { useEffect, useRef } from 'react';

const NeuralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 60;
    const connectionDistance = 150;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(43, 182, 198, 0.2)';
      ctx.strokeStyle = 'rgba(43, 182, 198, 0.05)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0f172a]">
      <NeuralCanvas />
      
      {/* Neural Background Effect - Dynamic Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2BB6C6]/10 rounded-full blur-[120px] blob-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#1e266e]/30 rounded-full blur-[140px] blob-animation" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_70%)] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 glass rounded-full border-white/20 animate-bounce">
          <span className="text-xs font-bold tracking-[0.2em] text-[#2BB6C6] uppercase">Now in Beta: Gemini 3 Integration</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
          Stop Chatting.<br />
          <span className="gradient-text">Start Closing.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          The world's first Hyper-Realistic Digital Employees. 
          Experience <span className="text-[#2BB6C6] font-bold">sub-200ms latency</span> and <span className="text-[#2BB6C6] font-bold">4x ROI</span> for your enterprise sales and support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-4 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl text-lg hover:scale-105 transition-all shadow-xl shadow-[#2BB6C6]/20">
            Deploy Your Agent
          </button>
          <button className="w-full sm:w-auto px-10 py-4 glass border-white/20 font-bold rounded-xl text-lg hover:bg-white/10 transition-all">
            Watch Protocol 
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-10">
          <div className="group cursor-default">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#2BB6C6] transition-colors">200ms</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Latency</div>
          </div>
          <div className="group cursor-default">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#2BB6C6] transition-colors">400%</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">ROI Growth</div>
          </div>
          <div className="group cursor-default">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#2BB6C6] transition-colors">24/7</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Autonomy</div>
          </div>
          <div className="group cursor-default">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#2BB6C6] transition-colors">99.9%</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">Uptime</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 cursor-pointer" onClick={() => document.getElementById('nxt-lab')?.scrollIntoView({ behavior: 'smooth' })}>
        <i className="fa-solid fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;
