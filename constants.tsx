
import React from 'react';
import { Persona, IndustrySector } from './types';

export const COLORS = {
  BRAND: '#283593', // Refined Navy
  ACCENT: '#2BB6C6', // Cyan
  DARK_BG: '#0f172a'
};

export const LOGO = (className?: string) => (
  <div className={`flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${className || ''}`}>
    <div className="relative w-12 h-10 shrink-0">
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Navy Path of the Stylized S */}
        <path 
          d="M20 60H65C75 60 85 52 85 40C85 28 75 20 65 20H15V28" 
          stroke={COLORS.BRAND} 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Cyan Path of the Stylized S */}
        <path 
          d="M80 52V60H35C25 60 15 52 15 40C15 28 25 20 35 20H80" 
          stroke={COLORS.ACCENT} 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-3xl font-bold tracking-tight" style={{ color: COLORS.BRAND, fontFamily: 'Inter, sans-serif' }}>
        Swarups
      </span>
      <span className="text-lg font-black tracking-widest self-end -mt-1" style={{ color: COLORS.ACCENT, fontFamily: "'Suez One', serif" }}>
        NXT
      </span>
    </div>
  </div>
);

export const PERSONAS: Persona[] = [
  { id: 'p1', name: 'Aria', voice: 'Kore', description: 'Empathetic & Calm', industry: 'Healthcare' },
  { id: 'p2', name: 'Victor', voice: 'Fenrir', description: 'Professional & Authoritative', industry: 'Finance' },
  { id: 'p3', name: 'Luna', voice: 'Puck', description: 'Energetic & Friendly', industry: 'Real Estate' },
  { id: 'p4', name: 'Atlas', voice: 'Charon', description: 'Precise & Technical', industry: 'Technology' },
];

export const INDUSTRIES: IndustrySector[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Automate property tours and lead qualification with 24/7 availability.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    faqs: [
      { question: 'Can it book site visits?', answer: 'Yes, our agents sync directly with your CRM calendar.' },
      { question: 'Does it understand floor plans?', answer: 'Advanced reasoning allows it to explain architectural details accurately.' }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Patient scheduling and follow-ups with HIPPA-ready protocols.',
    image: 'https://images.unsplash.com/photo-1504813184591-01552661c8a5?auto=format&fit=crop&q=80&w=800',
    faqs: [
      { question: 'Is it patient-data secure?', answer: 'We use end-to-end encryption compliant with DPDP Act 2023.' }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Scalable support for insurance claims and mortgage processing.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    faqs: [
      { question: 'Can it detect fraud?', answer: 'Our agents flag conversational anomalies in real-time.' }
    ]
  }
];

export const INTEGRATIONS = [
  { name: 'Salesforce', logo: 'fa-salesforce' },
  { name: 'HubSpot', logo: 'fa-hubspot' },
  { name: 'Zoho', logo: 'fa-database' },
  { name: 'Shopify', logo: 'fa-shopify' },
  { name: 'Slack', logo: 'fa-slack' },
  { name: 'WhatsApp', logo: 'fa-whatsapp' }
];
