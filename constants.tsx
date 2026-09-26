import { IndustrySector } from './types';

// Single source of truth for contact details and prefilled messages.
export const CONTACT = {
  phone: '+917550007208',
  phoneDisplay: '+91 7550007208',
  email: 'hello@swarupsnxt.com',
  whatsappNumber: '917550007208',
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const mailtoLink = (subject: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

export const telLink = `tel:${CONTACT.phone}`;

export const WHATSAPP_DEFAULT_TEXT = "Hi Swarups NXT, I'd like to know more about your AI solutions";
export const WHATSAPP_DEMO_TEXT = "Hi Swarups NXT, I'd like to book a demo";

export const INDUSTRIES: IndustrySector[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    problem: 'Property enquiries arrive at all hours, and leads go cold before a salesperson calls back.',
    solution: 'Answers every enquiry instantly, qualifies budget and location, and books site visits into your team\'s calendar.',
    product: 'AI Voice Agents + AI Chatbots',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Modern residential building exterior',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinics',
    problem: 'Front-desk staff are busy with patients, so appointment calls go unanswered and no-shows pile up.',
    solution: 'Books and reschedules appointments by phone or WhatsApp, and sends reminders before each visit.',
    product: 'AI Voice Agents + WhatsApp chatbot',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Hospital corridor',
  },
  {
    id: 'education',
    title: 'Education',
    problem: 'Admission season brings more calls and messages from parents than the team can handle.',
    solution: 'Answers admission and fee-structure questions, shares brochures, and schedules campus visits or counselling calls.',
    product: 'AI Chatbots + AI Voice Agents',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Students working together',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & D2C',
    problem: 'Customers keep asking "where is my order?", and unconfirmed COD orders get returned.',
    solution: 'Shares order status, confirms COD orders before dispatch, and answers product questions on WhatsApp and chat.',
    product: 'AI Chatbots + Omnichannel Bots',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Online shopping on a laptop',
  },
  {
    id: 'finance',
    title: 'Finance & NBFC Collections',
    problem: 'Calling every borrower about upcoming or missed EMIs takes a large team and a lot of time.',
    solution: 'Makes polite EMI reminder calls in the borrower\'s language, captures a promise-to-pay date, and flags cases for your team.',
    product: 'AI Voice Agents',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Financial charts on a screen',
  },
  {
    id: 'automobile',
    title: 'Automobile Dealers',
    problem: 'Test-drive and service enquiries come in after hours, and follow-ups depend on busy staff.',
    solution: 'Books test drives and service appointments, sends service reminders, and follows up with interested buyers.',
    product: 'AI Voice Agents + WhatsApp chatbot',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Car parked on a road',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    problem: 'Booking and availability questions arrive around the clock, across phone, WhatsApp and social media.',
    solution: 'Answers room availability and amenity questions, takes booking requests, and hands special requests to your staff.',
    product: 'Omnichannel Bots + AI Contact Center',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Hotel with a swimming pool',
  },
];

// Channels (not third-party integrations) — see AUDIT.md TODO on confirming integrations.
export const CHANNELS = [
  { name: 'Phone Calls', icon: 'fa-solid fa-phone' },
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
  { name: 'Website Chat', icon: 'fa-solid fa-comments' },
  { name: 'Instagram', icon: 'fa-brands fa-instagram' },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-messenger' },
];

export const FAQS = [
  {
    question: 'Which languages do your AI agents speak?',
    // TODO(confirm): language coverage per product/channel.
    answer: 'English and all major Indian languages: Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi and Odia. They also understand everyday Hinglish.',
  },
  {
    question: 'Which channels do you support?',
    answer: 'Phone calls, WhatsApp, website chat, and social media such as Instagram and Facebook. You can start with one channel and add more later.',
  },
  {
    question: 'How long does setup take?',
    // TODO(confirm): typical timeline ("1 week" vs "a few weeks").
    answer: 'It depends on the channels and how much your agent needs to know. After a short discovery call, we share a clear timeline for your setup.',
  },
  {
    question: 'Will the AI replace my staff?',
    answer: 'No. It takes care of routine, repetitive calls and messages so your team can spend their time on the conversations that need a person.',
  },
  {
    question: 'What happens when the AI can\'t answer?',
    // TODO(confirm): handover method (call transfer / chat handover / notification).
    answer: 'It hands the conversation over to your team, so the customer is never left without an answer.',
  },
  {
    question: 'Do I need a technical team?',
    answer: 'No. We handle the setup, training and changes for you. Your team only needs to tell us how your business works.',
  },
  {
    question: 'How is my customer data handled?',
    // TODO(confirm): data storage and processing details.
    answer: 'Your business information is used only to set up and run your AI agent. We walk you through exactly how your data is handled during the discovery call.',
  },
  {
    question: 'Can it work with the tools we already use?',
    // TODO(confirm): supported CRMs and tools.
    answer: 'Tell us which CRM, spreadsheet or booking tool you use, and we\'ll confirm how the AI agent can connect to it.',
  },
  {
    question: 'How do we get started?',
    // TODO(confirm): pilot offering.
    answer: 'Book a demo. We\'ll understand your needs, show you how an AI agent would handle your customers, and suggest a small first step on one channel.',
  },
];
