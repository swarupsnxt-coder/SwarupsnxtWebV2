import React from 'react';
import {
  Automation, ContactCenter, Omnichannel, SmsOtp, SocialBot, VoiceAgentCall, VoiceBlast, WebsiteChatbot, WhatsAppCampaign,
} from './mockups';

// One illustrative visual per product (PRODUCTS[].id). `photo: true` shows the sample photo at
// /images/products/<id>.webp (4:3, fictional "NXT ..." businesses, no figures); otherwise, or if a
// photo is removed, the coded HTML/CSS mockup is shown. To upgrade a photo, replace the .webp file.
const MOCKUPS: Record<string, { label: string; Mockup: React.FC; photo?: boolean }> = {
  'bulk-whatsapp-rcs': { label: 'Sample WhatsApp message from a store with a festive offer, two reply buttons and a customer question', Mockup: WhatsAppCampaign, photo: true },
  'sms-otp': { label: 'Sample OTP and order update SMS on a phone lock screen', Mockup: SmsOtp, photo: true },
  'ai-voice-agents': { label: 'Sample call with a clinic AI receptionist offering an appointment slot in Hinglish', Mockup: VoiceAgentCall, photo: true },
  'ai-chatbots': { label: 'Sample school website chatbot answering an admission enquiry and offering a campus visit', Mockup: WebsiteChatbot, photo: true },
  'voice-blast': { label: 'Sample automated service reminder call with press 1 to book and press 2 for a callback', Mockup: VoiceBlast, photo: true },
  'social-media-bots': { label: 'Sample social media comment asking for a price, answered automatically with a direct message', Mockup: SocialBot, photo: true },
  'saas-automation': { label: 'Sample automation: website enquiry to lead sheet, customer reminder and sales team alert', Mockup: Automation, photo: true },
  'ai-contact-center': { label: 'Sample support queue where AI handles routine queries and a complaint goes to an agent', Mockup: ContactCenter, photo: true },
  'omnichannel-bots': { label: 'One AI assistant connected to phone, chat, web chat, Instagram and Messenger', Mockup: Omnichannel, photo: true },
};

const photoSrc = (productId: string) => `/images/products/${productId}.webp`;

// For other places that show a product's sample photo (e.g. the home hero). Null when the product
// has no photo, so callers can skip it.
export const productPhoto = (productId: string): { src: string; alt: string } | null => {
  const entry = MOCKUPS[productId];
  return entry?.photo ? { src: photoSrc(productId), alt: entry.label } : null;
};

interface ProductVisualProps {
  productId: string;
  // sm: cropped preview for cards; lg: full mockup for product page heroes.
  size?: 'sm' | 'lg';
  className?: string;
}

const ProductVisual: React.FC<ProductVisualProps> = ({ productId, size = 'lg', className = '' }) => {
  const entry = MOCKUPS[productId];
  if (!entry) return null;
  const { label, Mockup, photo } = entry;
  const sm = size === 'sm';

  if (photo) {
    return (
      <div
        className={`relative overflow-hidden bg-slate-100 dark:bg-[#0f172a] ${
          sm ? 'h-56' : 'aspect-[4/3] rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl shadow-[#2BB6C6]/10'
        } ${className}`}
      >
        <img
          src={photoSrc(productId)}
          alt={label}
          width={1600}
          height={1200}
          loading={sm ? 'lazy' : 'eager'}
          decoding="async"
          fetchPriority={sm ? 'auto' : 'high'}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-3 right-3 z-10 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
          Sample
        </span>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden bg-gradient-to-br from-[#2BB6C6]/15 via-slate-100 to-[#1e266e]/15 dark:from-[#2BB6C6]/10 dark:via-[#0f172a] dark:to-[#1e266e]/40 ${
        sm ? 'h-56 px-6 pt-6' : 'rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl shadow-[#2BB6C6]/10 p-6 sm:p-10'
      } ${className}`}
    >
      <span className="absolute top-3 right-3 z-10 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
        Sample
      </span>
      <div aria-hidden="true" className={sm ? 'pointer-events-none select-none' : ''}>
        <Mockup />
      </div>
      {sm && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-[#131b2e] to-transparent"></div>}
    </div>
  );
};

export default ProductVisual;
