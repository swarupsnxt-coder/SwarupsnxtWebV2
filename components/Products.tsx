import React from 'react';

const products = [
  {
    icon: 'fa-microphone-lines',
    iconType: 'fa-solid',
    title: 'AI Voice Agents',
    tag: 'Flagship',
    desc: 'Hyper-realistic voice bots with sub-200ms latency. Handles inbound inquiries and outbound follow-ups 24/7 with human-like empathy.',
    roi: '80% fewer missed calls',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: 'fa-whatsapp',
    iconType: 'fa-brands',
    title: 'WhatsApp Chatbots',
    tag: 'High Conversion',
    desc: 'Intelligent automation for India\'s most used app. Instant lead capture, automated catalog sharing, and real-time appointment booking.',
    roi: '0% Lead Leakage',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: 'fa-share-nodes',
    iconType: 'fa-solid',
    title: 'Social Media Bots',
    tag: 'Growth',
    desc: 'Automate DMs and comments on Instagram, Facebook, and LinkedIn. Convert social engagement into hot leads instantly.',
    roi: '3x Engagement Rate',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: 'fa-database',
    iconType: 'fa-solid',
    title: 'Unified CRM',
    tag: 'Infrastructure',
    desc: 'Seamless integration with Zoho, HubSpot, and Google Sheets. Stop manual data entry and keep your sales team focused on closing.',
    roi: '15hrs/week saved',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: 'fa-bullhorn',
    iconType: 'fa-solid',
    title: 'Marketing Automation',
    tag: 'ROI Focused',
    desc: 'Automated follow-up sequences and lead nurturing workflows that ensure no prospect ever goes cold.',
    roi: '40% Revenue Boost',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: 'fa-rocket',
    iconType: 'fa-solid',
    title: 'Deployment MVP',
    tag: 'Strategic',
    desc: 'Custom AI solutions tailored to your unique business bottleneck. From conceptual blueprint to live deployment in just a few weeks.',
    roi: 'Accelerated Time-to-Value',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  }
];

const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-500 scroll-mt-28">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2BB6C6]/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#2BB6C6]/30 rounded-full bg-[#2BB6C6]/5 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2BB6C6]">The Product Suite</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Enterprise Grade <br />
            <span className="gradient-text italic">AI Armory.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Strategic tools designed to eliminate manual bottlenecks and maximize your business ROI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div 
              key={idx} 
              className="group rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2BB6C6]/10"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-[#2BB6C6] border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full shadow-lg">
                    {product.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#2BB6C6] text-xl shadow-lg border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                    <i className={`${product.iconType} ${product.icon}`}></i>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#2BB6C6] transition-colors leading-tight">
                    {product.title}
                  </h4>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {product.desc}
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-black text-[#2BB6C6] uppercase tracking-widest mb-1">Target ROI</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{product.roi}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right-long text-slate-300 dark:text-slate-700 group-hover:text-[#2BB6C6] group-hover:translate-x-2 transition-all"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-8">Need a custom neural integration?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 text-[#2BB6C6] font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
          >
            <span>Discuss Custom Blueprint</span>
            <i className="fa-solid fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;