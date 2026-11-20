import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS, WHATSAPP_DEFAULT_TEXT, productPagePath, whatsappLink } from '../constants';
import { productPhoto } from './visuals/ProductVisual';

// Sample photos of three products beside the headline; each links to its product page.
const HERO_PRODUCTS = ['bulk-whatsapp-rcs', 'ai-voice-agents', 'ai-chatbots'];

const HeroCollage: React.FC = () => {
  const tiles = HERO_PRODUCTS.flatMap((id) => {
    const photo = productPhoto(id);
    const product = PRODUCTS.find((p) => p.id === id);
    return photo && product ? [{ id, photo, title: product.title }] : [];
  });
  if (tiles.length === 0) return null;

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mr-0">
      <div className="absolute -inset-6 bg-[#2BB6C6]/15 blur-3xl rounded-full pointer-events-none" aria-hidden="true"></div>
      <ul className="relative grid grid-cols-2 gap-4">
        {tiles.map((t, i) => (
          <li key={t.id} className={i === 0 ? 'col-span-2' : ''}>
            <a
              href={productPagePath(t.id)}
              className="group relative block aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl shadow-[#2BB6C6]/10 bg-slate-100 dark:bg-slate-800"
            >
              <img
                src={t.photo.src}
                alt={t.photo.alt}
                width={1600}
                height={1200}
                loading="eager"
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {i === 0 && (
                <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                  Sample
                </span>
              )}
              <span className="absolute left-3 bottom-3 text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#0f172a]/80 text-white backdrop-blur-sm">
                {t.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
        className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-12 items-center max-w-7xl py-12"
        style={{ transform: `translateY(${scrollY * -0.2}px)`, transition: 'transform 0.05s ease-out' }}
      >
        <div className="text-center lg:text-left">
          <div className="inline-block px-5 py-2 mb-8 glass dark:glass rounded-full border border-slate-200 dark:border-white/20 bg-white/40 dark:bg-white/5 shadow-xl cursor-default">
            <span className="text-[11px] font-black tracking-[0.3em] text-[#2BB6C6] uppercase">WhatsApp, SMS &amp; AI agents for Indian businesses</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.05] text-slate-900 dark:text-white tracking-tight">
            Scale Customer Engagement on{' '}
            <span className="gradient-text italic">WhatsApp, SMS, and Voice.</span>
          </h1>

          <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            Send bulk WhatsApp, SMS, RCS and voice messages to your customers, and let AI agents answer the replies 24x7. We set everything up for you, with no coding needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <a
              href="#contact"
              data-book-demo
              className="w-full sm:w-auto px-10 py-4 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#2BB6C6]/40 flex items-center justify-center gap-3 no-underline"
            >
              <span>Book a Demo</span>
              <i className="fa-solid fa-calendar-check text-sm" aria-hidden="true"></i>
            </a>
            <a
              href={whatsappLink(WHATSAPP_DEFAULT_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-[#2BB6C6] text-slate-900 dark:text-white font-bold rounded-2xl text-lg hover:bg-[#2BB6C6]/10 transition-all flex items-center justify-center gap-3 no-underline"
            >
              <i className="fa-brands fa-whatsapp text-xl text-[#2BB6C6]" aria-hidden="true"></i>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[11px]">
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

        <HeroCollage />
      </div>
    </section>
  );
};

export default Hero;
