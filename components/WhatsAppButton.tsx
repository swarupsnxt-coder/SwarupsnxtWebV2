import React from 'react';
import { WHATSAPP_DEFAULT_TEXT, whatsappLink } from '../constants';

const WhatsAppButton: React.FC = () => (
  <a
    href={whatsappLink(WHATSAPP_DEFAULT_TEXT)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Swarups NXT on WhatsApp"
    className="fixed z-[90] right-4 sm:right-8 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#1e266e] to-[#2BB6C6] text-white shadow-[0_20px_50px_rgba(43,182,198,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
  >
    <i className="fa-brands fa-whatsapp text-3xl" aria-hidden="true"></i>
    <span className="hidden sm:block absolute right-20 bg-[#0f172a] text-white text-xs font-bold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
      Chat on WhatsApp
    </span>
  </a>
);

export default WhatsAppButton;
