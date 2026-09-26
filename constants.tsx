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

// Product list follows CLAUDE.md "What this is". Every card links to WhatsApp with a product-specific message.
export const PRODUCTS = [
  {
    icon: 'fa-microphone-lines',
    iconType: 'fa-solid',
    title: 'AI Voice Agents',
    tag: 'Voice',
    desc: 'Answer inbound calls and make follow-up calls 24x7, in English, Hindi and other Indian languages. The agent hands over to your team when a person is needed.',
    bestFor: 'Missed calls, after-hours enquiries, follow-ups',
    image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&q=80&w=800',
    details: "Your AI voice agent picks up every call, understands what the caller needs and replies naturally in their language. It answers common questions, qualifies new leads, books appointments and calls back people who enquired. Calls that need a person are passed to your staff, so customers are never stuck with a bot.",
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
    details: "Use it when many customers need the same message quickly: a holiday closure, an event reminder, a payment due date or a new offer. Choose a recorded voice or an AI-generated one, pick the languages, and add press-a-key options so interested customers can ask for a callback.",
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
    details: "The chatbot is trained on your products, services and FAQs, so its answers match your business. It collects each visitor's name and requirement, books appointments, and hands the conversation to your team when a person is needed — on your website and on WhatsApp.",
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
    details: "Campaigns go only to customers who have opted in, and each message can be personalised with their name or order details. When customers reply, the AI chatbot answers straight away, so interest from a campaign turns into real conversations instead of unread messages.",
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
    details: "Set it up for inbound support lines or outbound calling teams. The AI takes first-level queries, collects the details and routes each conversation to the right person, so your agents spend their time on the calls that need their judgement.",
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
    details: "Instead of a separate bot for every channel, you get one assistant trained once on your business. Whether customers reach you on Instagram, WhatsApp, your website or by phone, they get consistent answers, and your team handles the conversations that need a person.",
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
    details: "Reply to comments and DMs on your posts and ads, even late at night or in the middle of a busy campaign. The bot answers product questions, shares the right link or next step, and passes serious enquiries to your team as leads.",
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
    details: "We look at the repetitive steps your team does every day — copying enquiries into a sheet, sending reminders, updating customers on status — and automate them. We confirm what is possible with the tools you use today before we start.",
    ctaLabel: 'Ask about automation',
    ctaText: "Hi, I'm interested in SaaS Automation",
  }
];

export const INDUSTRIES: IndustrySector[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    problem: 'Property enquiries arrive at all hours, and leads go cold before a salesperson calls back.',
    solution: 'Answers every enquiry instantly, qualifies budget and location, and books site visits into your team\'s calendar.',
    details: "Works for builders, brokers and property consultants. Use it for new-project launches, enquiries from property portals and ads, site-visit reminders, and follow-ups with prospects who went quiet — in English, Hindi and regional languages.",
    product: 'AI Voice Agents + AI Chatbots',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Modern residential building exterior',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinics',
    problem: 'Front-desk staff are busy with patients, so appointment calls go unanswered and no-shows pile up.',
    solution: 'Books and reschedules appointments by phone or WhatsApp, and sends reminders before each visit.',
    details: "Suits clinics, diagnostic centres and hospitals. Patients can book, reschedule or cancel without waiting on hold, get reminders before their visit, and ask routine questions about timings and services, while your front desk focuses on the patients in front of them.",
    product: 'AI Voice Agents + WhatsApp chatbot',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Hospital corridor',
  },
  {
    id: 'education',
    title: 'Education',
    problem: 'Admission season brings more calls and messages from parents than the team can handle.',
    solution: 'Answers admission and fee-structure questions, shares brochures, and schedules campus visits or counselling calls.',
    details: "Useful for schools, colleges, coaching centres and ed-tech companies. Parents and students get quick answers on courses, eligibility and admission steps at any hour, and your counsellors receive enquiries that are ready for a conversation.",
    product: 'AI Chatbots + AI Voice Agents',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Students working together',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & D2C',
    problem: 'Customers keep asking "where is my order?", and unconfirmed COD orders get returned.',
    solution: 'Shares order status, confirms COD orders before dispatch, and answers product questions on WhatsApp and chat.',
    details: "Built for online stores and D2C brands. Customers get instant order updates, COD orders are confirmed before they ship, and product questions are answered while the buyer is still interested — on WhatsApp, your website and social media.",
    product: 'AI Chatbots + Omnichannel Bots',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Online shopping on a laptop',
  },
  {
    id: 'finance',
    title: 'Finance & NBFC Collections',
    problem: 'Calling every borrower about upcoming or missed EMIs takes a large team and a lot of time.',
    solution: 'Makes polite EMI reminder calls in the borrower\'s language, captures a promise-to-pay date, and flags cases for your team.',
    details: "Designed for NBFCs, lenders and collection teams. Reminder calls stay polite and consistent, happen in the borrower's preferred language, and record the response, so your team can focus on the accounts that need personal attention.",
    product: 'AI Voice Agents',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Financial charts on a screen',
  },
  {
    id: 'automobile',
    title: 'Automobile Dealers',
    problem: 'Test-drive and service enquiries come in after hours, and follow-ups depend on busy staff.',
    solution: 'Books test drives and service appointments, sends service reminders, and follows up with interested buyers.',
    details: "For car and two-wheeler dealerships. The AI agent handles test-drive requests, service bookings and reminders, and follows up with walk-in and online leads, so no interested buyer is forgotten after a showroom visit.",
    product: 'AI Voice Agents + WhatsApp chatbot',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Car parked on a road',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    problem: 'Booking and availability questions arrive around the clock, across phone, WhatsApp and social media.',
    solution: 'Answers room availability and amenity questions, takes booking requests, and hands special requests to your staff.',
    details: "For hotels, resorts and restaurants. Guests get quick answers about rooms, availability and amenities on the channel they prefer, booking requests are captured any time of day, and special requests reach your staff.",
    product: 'Omnichannel Bots + AI Contact Center',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Hotel with a swimming pool',
  },
];

// Channels we work on. No third-party tool integrations are claimed (confirmed Sept 2026).
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
    answer: 'English and common Indian languages, including everyday Hinglish. Tell us which languages your customers speak and we\'ll confirm the coverage for your product and channel.',
  },
  {
    question: 'Which channels do you support?',
    answer: 'Phone calls, WhatsApp, website chat, and social media such as Instagram and Facebook. You can start with one channel and add more later.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Typically a few weeks, depending on the channels and how much your agent needs to know. After a short discovery call, we share a clear timeline for your setup.',
  },
  {
    question: 'Will the AI replace my staff?',
    answer: 'No. It takes care of routine, repetitive calls and messages so your team can spend their time on the conversations that need a person.',
  },
  {
    question: 'What happens when the AI can\'t answer?',
    answer: 'It follows the handover workflow we set up with you, such as transferring the call, passing the chat to your team or alerting the right person, so the customer is never left without an answer.',
  },
  {
    question: 'Do I need a technical team?',
    answer: 'No. We handle the setup, training and changes for you. Your team only needs to tell us how your business works.',
  },
  {
    question: 'How is my customer data handled?',
    answer: 'It depends on your use case. Before going live, we agree with you what data the AI agent uses, where it is stored and who can access it.',
  },
  {
    question: 'Can it work with the tools we already use?',
    answer: 'Tell us which CRM, spreadsheet or booking tool you use, and we\'ll confirm how the AI agent can connect to it.',
  },
  {
    question: 'How do we get started?',
    answer: 'Book a demo. We\'ll understand your needs and show you how an AI agent would handle your customers. Depending on your use case, we can start small, for example on one channel.',
  },
];
