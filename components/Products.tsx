import React from 'react';
import { whatsappLink } from '../constants';

// Product list follows CLAUDE.md "What this is". Every card links to WhatsApp with a product-specific message.
const products = [
  {
    icon: 'fa-microphone-lines',
    iconType: 'fa-solid',
    title: 'AI Voice Agents',
    tag: 'Voice',
    desc: 'Answer inbound calls and make follow-up calls 24x7, in English, Hindi and other Indian languages. The agent hands over to your team when a person is needed.',
    bestFor: 'Missed calls, after-hours enquiries, follow-ups',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Ask about voice agents',
    ctaText: "Hi, I'm interested in AI Voice Agents",
  },
  {
    icon: 'fa-bullhorn',
    iconType: 'fa-solid',
    title: 'Voice Blast',
    tag: 'Voice broadcast',
    desc: 'Send a recorded or AI-voiced message to thousands of phones at once, in the language your customers speak. Capture interest with press-a-key (IVR) responses and see who answered, missed or pressed a key.',
    bestFor: 'Announcements, appointment and payment reminders, promotions, surveys',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Plan a voice blast',
    ctaText: "Hi, I'm interested in Voice Blast",
  },
  {
    icon: 'fa-comments',
    iconType: 'fa-solid',
    title: 'AI Chatbots',
    tag: 'Chat',
    desc: 'Answer questions, capture leads and book appointments on WhatsApp and your website — instantly, day or night.',
    bestFor: 'Lead capture, FAQs, appointment booking',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Ask about chatbots',
    ctaText: "Hi, I'm interested in AI Chatbots",
  },
  {
    icon: 'fa-whatsapp',
    iconType: 'fa-brands',
    title: 'WhatsApp Campaigns',
    tag: 'Campaigns',
    desc: 'Reach customers where they already are. Broadcast offers, reminders and updates to opted-in contacts with images, videos, documents and buttons — personalised, with AI answering replies 24x7 and reports on delivered, read and replied.',
    bestFor: 'Festive offers, reminders, order updates, lead follow-ups, win-back',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Plan a WhatsApp campaign',
    ctaText: "Hi, I'm interested in WhatsApp campaigns",
  },
  {
    icon: 'fa-headset',
    iconType: 'fa-solid',
    title: 'AI Contact Center',
    tag: 'Contact center',
    desc: 'AI handles routine calls and chats, while your agents take the conversations that need a person. Fewer queues, less repetitive work.',
    bestFor: 'High call volumes, support teams',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Ask about the contact center',
    ctaText: "Hi, I'm interested in the AI Contact Center",
  },
  {
    icon: 'fa-layer-group',
    iconType: 'fa-solid',
    title: 'Omnichannel Bots',
    tag: 'Omnichannel',
    desc: 'One AI assistant across phone, WhatsApp, website chat and social media, so customers get the same helpful answers wherever they reach you.',
    bestFor: 'Businesses active on many channels',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Ask about omnichannel bots',
    ctaText: "Hi, I'm interested in Omnichannel Bots",
  },
  {
    icon: 'fa-share-nodes',
    iconType: 'fa-solid',
    title: 'Social Media Bots',
    tag: 'Social',
    desc: 'Reply to Instagram and Facebook comments and DMs automatically, and turn interested followers into leads.',
    bestFor: 'Social enquiries, campaign responses',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Ask about social media bots',
    ctaText: "Hi, I'm interested in Social Media Bots",
  },
  {
    icon: 'fa-gears',
    iconType: 'fa-solid',
    title: 'SaaS Automation',
    tag: 'Automation',
    desc: 'Automate repetitive work between your tools — lead entry, follow-up reminders, status updates — so your team can focus on customers.',
    bestFor: 'Manual data entry, follow-up tasks',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    ctaLabel: 'Ask about automation',
    ctaText: "Hi, I'm interested in SaaS Automation",
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
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB6C6]">Products</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            AI that works <br />
            <span className="gradient-text italic">on every channel.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Start with one product or combine them. We set everything up and train it on your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.title}
              className="group rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-[#2BB6C6]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2BB6C6]/10"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  width={800}
                  height={384}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-slate-900/90 text-[#2BB6C6] border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full shadow-lg">
                    {product.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#2BB6C6] text-xl shadow-lg border border-slate-100 dark:border-white/5 group-hover:scale-110 group-hover:bg-[#2BB6C6] group-hover:text-[#0f172a] transition-all duration-500">
                    <i className={`${product.iconType} ${product.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#2BB6C6] transition-colors leading-tight">
                    {product.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {product.desc}
                </p>

                <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                  <div className="text-[11px] font-black text-[#2BB6C6] uppercase tracking-widest mb-1">Best for</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{product.bestFor}</div>
                </div>

                <a
                  href={whatsappLink(product.ctaText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2BB6C6] hover:gap-3 transition-all"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                  <span>{product.ctaLabel}</span>
                  <i className="fa-solid fa-arrow-right-long text-xs" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">Not sure which product fits your business?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-[#2BB6C6] font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
          >
            <span>Book a demo</span>
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
