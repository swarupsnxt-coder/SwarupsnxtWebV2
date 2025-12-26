
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', useCase: '', honeypot: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Spam protection
    
    setStatus('loading');
    // Simulated submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', useCase: '', honeypot: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's build your <br /><span className="text-[#2BB6C6]">Neural Team.</span></h2>
            <p className="text-slate-400 mb-10 text-lg">Our solution architects will help you design a deployment protocol tailored to your enterprise KPI goals.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1e266e] flex items-center justify-center text-[#2BB6C6]">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">Direct Line</h4>
                  <p className="text-sm text-slate-500">+91 1800-NXT-CORP</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1e266e] flex items-center justify-center text-[#2BB6C6]">
                  <i className="fa-solid fa-envelope-open-text"></i>
                </div>
                <div>
                  <h4 className="font-bold text-white">Protocol Query</h4>
                  <p className="text-sm text-slate-500">nexus@swarups-nxt.ai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-10 rounded-[30px] border-white/10 shadow-2xl">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-20 h-20 bg-[#2BB6C6]/20 rounded-full flex items-center justify-center text-[#2BB6C6] text-4xl mb-6">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Protocol Received</h3>
                <p className="text-slate-500">An architect will contact you within 4 business hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[#2BB6C6] text-sm font-bold uppercase tracking-widest hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="honeypot" value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} className="hidden" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Agent Name (You)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0f172a] border border-white/5 rounded-xl px-5 py-4 focus:border-[#2BB6C6] outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Corporate Node (Email)</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0f172a] border border-white/5 rounded-xl px-5 py-4 focus:border-[#2BB6C6] outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Organization</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Acme Global Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-[#0f172a] border border-white/5 rounded-xl px-5 py-4 focus:border-[#2BB6C6] outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Neural Use Case</label>
                  <select 
                    required
                    value={formData.useCase}
                    onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                    className="w-full bg-[#0f172a] border border-white/5 rounded-xl px-5 py-4 focus:border-[#2BB6C6] outline-none text-white text-sm appearance-none"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="sales">Sales & Revenue</option>
                    <option value="support">Customer Support</option>
                    <option value="internal">Internal Operations</option>
                    <option value="healthcare">Healthcare Simulation</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-[#2BB6C6] text-[#0f172a] font-bold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Encrypting & Sending...' : 'Initialize Demo Protocol'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
