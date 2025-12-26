
import React from 'react';

const steps = [
  { id: '01', title: 'Architect', desc: 'We map your specific industry workflows and knowledge base into a neural architecture.' },
  { id: '02', title: 'Integrate', desc: 'NXT connects to your CRM, ERP, and API endpoints with zero-latency handshakes.' },
  { id: '03', title: 'Deploy', desc: 'Go live with sub-200ms voice agents across all digital and phone channels.' },
  { id: '04', title: 'Scale', desc: 'Monitor ROI metrics and expand autonomy through continuous neural feedback loops.' }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#0f172a] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2BB6C6_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">The Deployment Protocol</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">From strategic blueprint to hyper-realistic production in less than 48 hours.</p>
        </div>

        <div className="relative grid md:grid-cols-4 gap-12">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[12.5%] w-[75%] h-[2px] bg-gradient-to-r from-[#2BB6C6]/0 via-[#2BB6C6]/30 to-[#2BB6C6]/0 -z-0"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="text-center group relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-[#1e266e] flex items-center justify-center mx-auto mb-8 border border-[#2BB6C6]/20 group-hover:bg-[#2BB6C6] group-hover:scale-110 transition-all duration-500 shadow-xl shadow-[#2BB6C6]/5 group-hover:shadow-[#2BB6C6]/30">
                <span className="text-3xl font-bold text-white group-hover:text-[#0f172a]">{step.id}</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-[#2BB6C6] transition-colors">{step.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
