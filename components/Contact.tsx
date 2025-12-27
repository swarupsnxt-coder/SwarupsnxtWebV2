import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', useCase: '', message: '', honeypot: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Spam protection
    
    setStatus('loading');
    // Simulated submission for demo purposes
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', useCase: '', message: '', honeypot: '' });
    }, 1500);
  };

  const inputClasses = "w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#2BB6C6] focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-slate-500 font-medium";
  const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3 ml-1";

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500 relative flex items-center justify-center min-h-[600px]">
        <div className="text-center animate-fadeIn px-4">
          <div className="w-24 h-24 bg-[#2BB6C6]/10 text-[#2BB6C6] rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner border border-[#2BB6C6]/20">
            <i className="fa-solid fa-paper-plane animate-bounce"></i>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Signal Received.</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 font-medium">A solution architect has been assigned to your case. Expected response time: sub-24 hours.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 border border-[#2BB6C6] text-[#2BB6C6] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#2BB6C6] hover:text-[#0f172a] transition-all"
          >
            Send Another Request
          </button>
        </div>
      </section>
    );
  }

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
              Our solution architects will help you deploy your first autonomous neural team in under 48 hours. Let's build the future of your revenue.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2BB6C6] shadow-xl group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Expert Integration Support</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Direct access to our senior engineering team for API hooks.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2BB6C6] shadow-xl group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Enterprise-Grade Security</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">DPDP Act 2023 compliant data vaulting protocol.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#2BB6C6]/20 to-[#1e266e]/20 blur-[60px] opacity-30 pointer-events-none"></div>
            <form 
              onSubmit={handleSubmit}
              className="relative bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl space-y-6"
            >
              <input type="text" className="hidden" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Full Identity</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    className={inputClasses}
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Work Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@company.com" 
                    className={inputClasses}
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Organization</label>
                <input 
                  type="text" 
                  required
                  placeholder="Global Tech Inc." 
                  className={inputClasses}
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClasses}>Industry Protocol</label>
                <select 
                  required
                  className={inputClasses + " appearance-none"}
                  value={formData.useCase}
                  onChange={e => setFormData({...formData, useCase: e.target.value})}
                >
                  <option value="" className="dark:bg-slate-900">Select Industry</option>
                  <option value="Real Estate" className="dark:bg-slate-900">Real Estate</option>
                  <option value="Healthcare" className="dark:bg-slate-900">Healthcare</option>
                  <option value="Finance" className="dark:bg-slate-900">Finance</option>
                  <option value="E-commerce" className="dark:bg-slate-900">E-commerce</option>
                  <option value="Education" className="dark:bg-slate-900">Education</option>
                  <option value="Other" className="dark:bg-slate-900">Custom Protocol</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>Project Description</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Describe your current bottleneck and how AI can solve it..." 
                  className={inputClasses + " resize-none"}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-[#2BB6C6] text-[#0f172a] font-black rounded-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#2BB6C6]/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <>
                    <span>Initialize Consultation</span>
                    <i className="fa-solid fa-arrow-right-long text-sm"></i>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                Secure 256-bit encrypted transmission
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;