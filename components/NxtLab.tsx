
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
    const particleCount = 45;

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 900;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 182, 198, ${p.opacity})`;
        ctx.fill();
        
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(43, 182, 198, ${0.08 * (1 - distance / 110)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-30" />;
};

const StatusNode: React.FC<{ label: string, value: string, icon: string, position: string }> = ({ label, value, icon, position }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`absolute ${position} z-20 hidden xl:flex items-center group cursor-crosshair`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-8 h-8 rounded-full bg-[#1e266e] border border-[#2BB6C6]/40 flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-125 border-[#2BB6C6] shadow-[0_0_15px_rgba(43,182,198,0.5)]' : 'shadow-none'}`}>
        <i className={`fa-solid ${icon} text-[10px] text-[#2BB6C6] ${isHovered ? 'animate-pulse' : ''}`}></i>
      </div>
      <div className={`ml-3 glass px-3 py-2 rounded-lg border-white/10 transition-all duration-500 overflow-hidden whitespace-nowrap ${isHovered ? 'max-w-[200px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 -translate-x-4 pointer-events-none'}`}>
        <div className="text-[8px] font-bold text-[#2BB6C6] uppercase tracking-widest">{label}</div>
        <div className="text-[10px] font-mono text-white">{value}</div>
      </div>
    </div>
  );
};

const NxtLab: React.FC = () => {
  return (
    <section id="nxt-lab" className="py-24 bg-[#0f172a] relative overflow-hidden">
      <LabCanvas />
      
      {/* Background Blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-[#2BB6C6]/5 rounded-full blur-[180px] blob-animation opacity-60" style={{ animationDuration: '35s' }}></div>
      <div className="absolute bottom-[-10%] left-[-8%] w-[550px] h-[550px] bg-[#1e266e]/20 rounded-full blur-[150px] blob-animation opacity-40" style={{ animationDelay: '-15s', animationDuration: '40s' }}></div>
      <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] bg-[#2BB6C6]/8 rounded-full blur-[100px] blob-animation opacity-30" style={{ animationDuration: '18s', animationDelay: '-3s' }}></div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2BB6C6]/30 to-transparent absolute top-0 left-0 animate-scanline"></div>
      </div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2BB6C6]">Intelligence Sandbox v2.5</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">The NXT Lab</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Interact with our core neural models. Experience the sub-200ms latency of our voice synthesis and the high-reasoning capabilities of our chat engine.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-[#2BB6C6]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <VoiceStudio />
          </div>

          <div className="order-1 lg:order-2 relative py-12">
            <div className="text-center mb-10 lg:hidden">
              <span className="text-xs uppercase tracking-widest text-[#2BB6C6] font-bold">Mobile Simulation</span>
            </div>
            
            <div className="relative group max-w-[340px] mx-auto">
              {/* Decorative Status Nodes around Phone */}
              <StatusNode 
                position="-top-8 -left-12" 
                label="Neural Load" 
                value="12.4% ACTIVE" 
                icon="fa-brain" 
              />
              <StatusNode 
                position="top-1/4 -right-16" 
                label="Voice Pipeline" 
                value="KORE-HD READY" 
                icon="fa-waveform" 
              />
              <StatusNode 
                position="bottom-1/3 -left-20" 
                label="Encryption" 
                value="AES-256 SECURE" 
                icon="fa-shield-halved" 
              />
              <StatusNode 
                position="-bottom-6 -right-8" 
                label="Uptime" 
                value="99.998% STABLE" 
                icon="fa-bolt" 
              />

              {/* Enhanced 3D Floating/Glow Effect Container */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#2BB6C6]/10 via-transparent to-[#1e266e]/15 blur-3xl rounded-[100px] opacity-30 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {/* Device Shadow & Reflection */}
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#2BB6C6]/20 blur-xl rounded-full opacity-50"></div>
              
              <PhoneDemo />
              
              {/* Telemetry scrolling text */}
              <div className="hidden xl:block absolute -left-24 top-0 h-full overflow-hidden w-8 opacity-20 pointer-events-none">
                <div className="animate-telemetry text-[6px] font-mono text-[#2BB6C6] uppercase flex flex-col gap-2">
                  <span>0x7f3e 48kbps</span>
                  <span>nexus_init_ok</span>
                  <span>sync_200ms</span>
                  <span>buf_overflow_0</span>
                  <span>tls_1.3_aes</span>
                  <span>pcm_raw_float</span>
                  <span>0x7f3e 48kbps</span>
                  <span>nexus_init_ok</span>
                  <span>sync_200ms</span>
                  <span>buf_overflow_0</span>
                  <span>tls_1.3_aes</span>
                  <span>pcm_raw_float</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: -10%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes telemetry {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-telemetry {
          animation: telemetry 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default NxtLab;
