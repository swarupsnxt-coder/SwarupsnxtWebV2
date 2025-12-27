import React from 'react';

const Contact: React.FC = () => {
  const whatsappLink = "https://wa.me/917550007208?text=Hello%20Swarups%20NXT,%20I'm%20interested%20in%20a%20Free%20AI%20Audit!";
  const emailLink = "mailto:hello@swarupsnxt.com?subject=AI%20Audit%20Request";

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2BB6C6]">Direct Neural Uplink</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
              Scale your <br />
              <span className="gradient-text italic">Empire.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 text-xl leading-relaxed max-w-lg font-medium">
              Our solution architects will help you deploy your first autonomous neural team in a few weeks. Let's build the future of your revenue.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2BB6C6] shadow-xl group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Email Protocol</h4>
                  <a href={emailLink} className="text-sm text-[#2BB6C6] font-bold hover:underline">hello@swarupsnxt.com</a>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2BB6C6] shadow-xl group-hover:scale-110 transition-transform">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Direct Hotline</h4>
                  <a href={whatsappLink} className="text-sm text-[#2BB6C6] font-bold hover:underline">+91 7550007208</a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#2BB6C6]/20 to-[#1e266e]/20 blur-[60px] opacity-30 pointer-events-none"></div>
            <div className="relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl space-y-8 text-center">
              <div className="w-20 h-20 bg-[#2BB6C6]/10 text-[#2BB6C6] rounded-3xl flex items-center justify-center mx-auto mb-2 text-3xl shadow-inner border border-[#2BB6C6]/20">
                <i className="fa-solid fa-rocket animate-pulse"></i>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  Ready for your <br />
                  <span className="text-[#2BB6C6]">Free AI Audit?</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-4">
                  We are currently upgrading our automated intake system. For immediate priority deployment, connect with our lead architects directly.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#2BB6C6]/30 flex items-center justify-center gap-3"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  <span>WhatsApp Neural Link</span>
                </a>
                
                <a 
                  href={emailLink}
                  className="w-full py-5 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-2xl text-lg hover:bg-white dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-envelope"></i>
                  <span>Request Custom Blueprint</span>
                </a>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black">
                  Current Response Time: &lt; 2 Hours
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Architects Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;