import React from 'react';
import { Persona, IndustrySector } from './types';

export const COLORS = {
  BRAND: '#1e266e', 
  ACCENT: '#2BB6C6', 
  DARK_BG: '#0f172a'
};

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
    description: 'Patient scheduling and follow-ups with HIPAA-ready protocols.',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
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
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Boost sales with personalized shopping assistants and order tracking bots.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    faqs: [
      { question: 'Can it handle complex order queries?', answer: 'Yes, it integrates with Shopify and other ERPs to provide real-time status.' }
    ]
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Provide 24/7 tutoring and administrative support for students and parents.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    faqs: [
      { question: 'Can it explain complex topics?', answer: 'Leveraging Gemini 3, our agents can simplify advanced academic concepts.' }
    ]
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Optimize supply chain communication and delivery coordination with automated tracking agents.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    faqs: [
      { question: 'Can it coordinate driver schedules?', answer: 'Our agents can handle dispatch notifications and ETA updates via voice or text.' }
    ]
  }
];

export const INTEGRATIONS = [
  { name: 'Salesforce', logo: 'fa-cloud' },
  { name: 'HubSpot', logo: 'fa-hubspot' },
  { name: 'Zoho', logo: 'fa-database' },
  { name: 'Shopify', logo: 'fa-shopify' },
  { name: 'Slack', logo: 'fa-slack' },
  { name: 'WhatsApp', logo: 'fa-whatsapp' }
];

export const FAQS = [
  {
    question: "What is sub-200ms latency?",
    answer: "Most AI agents take 2-5 seconds to respond, which feels robotic. Our proprietary optimization pipeline reduces the time between user input and AI response to under 200 milliseconds, making conversations feel truly human."
  },
  {
    question: "How long does it take to deploy?",
    answer: "Standard deployments take a few weeks. Our implementation protocol handles full architectural mapping and integration with your existing CRM and knowledge base."
  },
  {
    question: "Does it support Indian regional languages?",
    answer: "Yes, our agents are built for the Indian market and understand natural regional phrasing in major Indian languages as well as 'Hinglish'."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade AES-256 encryption and are compliant with the DPDP Act 2023. Your lead data is strictly yours."
  },
  {
    question: "Can I try it before I buy?",
    answer: "Yes! You can test our live models in the 'NXT Lab' section of this page or schedule a free AI audit for a custom demo."
  }
];