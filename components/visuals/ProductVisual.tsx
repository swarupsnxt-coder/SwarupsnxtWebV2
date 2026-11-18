import React from 'react';
import {
  Automation, ContactCenter, Omnichannel, SmsOtp, SocialBot, VoiceAgentCall, VoiceBlast, WebsiteChatbot, WhatsAppCampaign,
} from './mockups';

// One illustrative mockup per product (PRODUCTS[].id). Pure HTML/CSS: no images to load.
const MOCKUPS: Record<string, { label: string; Mockup: React.FC }> = {
  'bulk-whatsapp-rcs': { label: 'Sample WhatsApp campaign message with offer buttons and an AI reply', Mockup: WhatsAppCampaign },
  'sms-otp': { label: 'Sample OTP and order alert SMS on a phone lock screen', Mockup: SmsOtp },
  'ai-voice-agents': { label: 'Sample AI voice agent call booking a clinic appointment in Hinglish', Mockup: VoiceAgentCall },
  'ai-chatbots': { label: 'Sample website chatbot answering an admission enquiry and booking a visit', Mockup: WebsiteChatbot },
  'voice-blast': { label: 'Sample voice blast reminder sent to many phones with press-a-key options', Mockup: VoiceBlast },
  'social-media-bots': { label: 'Sample Instagram comment answered automatically with a direct message', Mockup: SocialBot },
  'saas-automation': { label: 'Sample automation: website enquiry to lead sheet, reminder and team alert', Mockup: Automation },
  'ai-contact-center': { label: 'Sample support queue where AI handles routine queries and an agent takes a complaint', Mockup: ContactCenter },
  'omnichannel-bots': { label: 'One AI assistant connected to phone, WhatsApp, web chat, Instagram and Facebook', Mockup: Omnichannel },
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
  const { label, Mockup } = entry;
  const sm = size === 'sm';

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
