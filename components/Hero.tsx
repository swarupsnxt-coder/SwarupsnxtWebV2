
import React, { useEffect, useRef, useState } from 'react';
import { WHATSAPP_DEFAULT_TEXT, whatsappLink } from '../constants';

const NeuralCanvas: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Read scroll position from a ref so the animation loop is created once, not on every scroll.
  const scrollRef = useRef(scrollOffset);
  scrollRef.current = scrollOffset;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 70;
    const connectionDistance = 160;
    let frameId = 0;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? 'rgba(43, 182, 198, 0.3)' : 'rgba(43, 182, 198, 0.5)';
      ctx.strokeStyle = isDark ? 'rgba(43, 182, 198, 0.08)' : 'rgba(43, 182, 198, 0.12)';
      const offset = scrollRef.current * 0.15;

      particles.forEach((p, i) => {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const drawY = p.y + offset;

        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, drawY);
            ctx.lineTo(p2.x, p2.y + offset);
            ctx.stroke();
          }
        }
      });
      if (!reduceMotion) frameId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      init();
      if (reduceMotion) draw();
    };

    init();
    draw();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none opacity-60 transition-opacity duration-1000"
    />
  );
};

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
      <NeuralCanvas scrollOffset={scrollY} />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-[#2BB6C6]/10 rounded-full blur-[140px] blob-animation"
          style={{ transform: `translateY(${scrollY * 0.35}px)`, transition: 'transform 0.1s ease-out' }}
        ></div>

        <div
          className="absolute bottom-[20%] right-[5%] w-[700px] h-[700px] bg-[#1e266e]/15 dark:bg-[#1e266e]/30 rounded-full blur-[160px] blob-animation"
          style={{ transform: `translateY(${scrollY * 0.25}px)`, transition: 'transform 0.15s ease-out', animationDelay: '-8s' }}
        ></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#0f172a_90%)] opacity-80 dark:opacity-70"></div>
      </div>

      <div
        className="container mx-auto px-4 relative z-10 text-center"
        style={{ transform: `translateY(${scrollY * -0.2}px)`, transition: 'transform 0.05s ease-out' }}
      >
        <div className="inline-block px-5 py-2 mb-8 glass dark:glass rounded-full border border-slate-200 dark:border-white/20 bg-white/40 dark:bg-white/5 shadow-xl cursor-default">
          <span className="text-[11px] font-black tracking-[0.3em] text-[#2BB6C6] uppercase">AI voice agents &amp; chatbots for Indian businesses</span>
        </div>

        <div className="float-animation">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-[0.95] text-slate-900 dark:text-white tracking-tighter">
            Every call answered.<br />
            <span className="gradient-text italic">Every lead followed up.</span>
          </h1>
        </div>

        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-medium px-4">
          AI agents that talk to your customers on phone, WhatsApp and your website, 24x7, in English, Hindi and other Indian languages. When a person is needed, they hand over to your team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a
            href="#contact"
            onClick={(e) => handleNav(e, 'contact')}
            className="w-full sm:w-auto px-12 py-5 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-xl hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-[#2BB6C6]/40 flex items-center justify-center gap-3 no-underline"
          >
            <span>Book a demo</span>
            <i className="fa-solid fa-calendar-check text-sm" aria-hidden="true"></i>
          </a>
          <a
            href={whatsappLink(WHATSAPP_DEFAULT_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-12 py-5 bg-white/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-2xl text-xl hover:bg-white dark:hover:bg-white/10 transition-all backdrop-blur-md shadow-lg flex items-center justify-center gap-3 no-underline"
          >
            <i className="fa-brands fa-whatsapp text-xl text-[#2BB6C6]" aria-hidden="true"></i>
            <span>WhatsApp us</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[11px]">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check-circle text-[#2BB6C6]" aria-hidden="true"></i>
            <span>24x7 availability</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check-circle text-[#2BB6C6]" aria-hidden="true"></i>
            <span>Indian languages</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check-circle text-[#2BB6C6]" aria-hidden="true"></i>
            <span>Setup handled for you</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
