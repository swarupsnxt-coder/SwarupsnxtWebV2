import { IndustrySector, ProductPage } from './types';

// Single source of truth for contact details and prefilled messages.
export const CONTACT = {
  phone: '+917550007208',
  phoneDisplay: '+91 7550007208',
  email: 'hello@swarupsnxt.com',
  grievanceEmail: 'grievance@swarupsnxt.com',
  whatsappNumber: '917550007208',
  supportHours: { time: '10:00 AM – 6:00 PM IST', days: 'Monday to Friday (excluding public holidays)' },
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const mailtoLink = (subject: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

export const telLink = `tel:${CONTACT.phone}`;

export const WHATSAPP_DEFAULT_TEXT = "Hi Swarups NXT, I'd like to know more about your AI solutions";
export const WHATSAPP_DEMO_TEXT = "Hi Swarups NXT, I'd like to book a demo";

// Product list follows CLAUDE.md "What this is", in the order of business priority (Nov 2026).
// Every card links to WhatsApp with a product-specific message; `id` is the card's anchor (nav dropdown).
export const PRODUCTS = [
  {
    id: 'bulk-whatsapp-rcs',
    icon: 'fa-whatsapp',
    iconType: 'fa-brands',
    title: 'Bulk WhatsApp & RCS Engine',
    tag: 'Bulk messaging',
    desc: 'Reach customers where they already are. Send bulk WhatsApp and RCS messages: offers, reminders and updates to opted-in contacts with images, videos, documents and buttons — personalised, with AI answering replies 24x7 and reports on delivered, read and replied.',
    bestFor: 'Festive offers, reminders, order updates, lead follow-ups, win-back',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    details: "Campaigns go only to customers who have opted in, and each message can be personalised with their name or order details. When customers reply, the AI chatbot answers straight away, so interest from a campaign turns into real conversations instead of unread messages. RCS adds rich, branded messages in the default messaging app on supported Android phones.",
    ctaLabel: 'Plan a bulk campaign',
    ctaText: "Hi, I'm interested in bulk WhatsApp & RCS messaging",
  },
  {
    id: 'sms-otp',
    icon: 'fa-comment-sms',
    iconType: 'fa-solid',
    title: 'Enterprise SMS & OTP',
    tag: 'SMS',
    desc: 'Send OTPs, transaction alerts and promotional SMS at volume. Time-sensitive messages like OTPs go on transactional routes, and you see delivery status for every message.',
    bestFor: 'Login and payment OTPs, order and account alerts, promotions',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&q=80&w=800',
    details: "SMS reaches every phone, with or without internet or apps. We help you set up your DLT-registered sender IDs and message templates (the registrations stay in your business's name), connect sending to your website or app, and set up delivery reports so you can see what reached each customer.",
    ctaLabel: 'Ask about SMS & OTP',
    ctaText: "Hi, I'm interested in Enterprise SMS & OTP",
  },
  {
    id: 'ai-voice-agents',
    icon: 'fa-microphone-lines',
    iconType: 'fa-solid',
    title: 'AI Voice Agents',
    tag: 'Voice',
    desc: 'The intelligent upgrade for your phone line. Answer inbound calls and make follow-up calls 24x7, in English, Hindi and other Indian languages. The agent hands over to your team when a person is needed.',
    bestFor: 'Missed calls, after-hours enquiries, follow-ups',
    image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&q=80&w=800',
    details: "Your AI voice agent picks up every call, understands what the caller needs and replies naturally in their language. It answers common questions, qualifies new leads, books appointments and calls back people who enquired. Calls that need a person are passed to your staff, so customers are never stuck with a bot.",
    ctaLabel: 'Ask about voice agents',
    ctaText: "Hi, I'm interested in AI Voice Agents",
  },
  {
    id: 'ai-chatbots',
    icon: 'fa-comments',
    iconType: 'fa-solid',
    title: 'AI Chatbots',
    tag: 'Chat',
    desc: 'Turn replies to your campaigns into conversations. Answer questions, capture leads and book appointments on WhatsApp and your website — instantly, day or night.',
    bestFor: 'Lead capture, FAQs, appointment booking',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800',
    details: "The chatbot is trained on your products, services and FAQs, so its answers match your business. It collects each visitor's name and requirement, books appointments, and hands the conversation to your team when a person is needed — on your website and on WhatsApp.",
    ctaLabel: 'Ask about chatbots',
    ctaText: "Hi, I'm interested in AI Chatbots",
  },
  {
    id: 'voice-blast',
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
    id: 'social-media-bots',
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
    id: 'saas-automation',
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
  },
  {
    id: 'ai-contact-center',
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
    id: 'omnichannel-bots',
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
  { name: 'SMS', icon: 'fa-solid fa-comment-sms' },
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
    answer: 'WhatsApp, SMS, phone calls, website chat, and social media such as Instagram and Facebook. You can start with one channel and add more later.',
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

// How pricing works, per channel. No figures anywhere (CLAUDE.md hard rule 2).
// WhatsApp is billed per message by category since Meta's July 2025 change, not per conversation.
export const PRICING_MODEL = [
  { channel: 'WhatsApp & RCS', icon: 'fa-brands fa-whatsapp', unit: 'Per message', desc: 'You pay for the messages you send, by message type (marketing, utility or authentication), plus the platform charges agreed in your quote.' },
  { channel: 'SMS & OTP', icon: 'fa-solid fa-comment-sms', unit: 'Per message', desc: 'You pay for each SMS sent, so OTPs, alerts and promotions are billed only as you use them.' },
  { channel: 'Contact center (CCaaS)', icon: 'fa-solid fa-headset', unit: 'Per seat', desc: 'You pay for each agent seat your team uses, with AI handling routine calls and chats alongside them.' },
];

// Shared answers reused on product pages, so they stay identical to the home page FAQ.
const sharedFaq = (questionStart: string) => {
  const faq = FAQS.find((f) => f.question.startsWith(questionStart));
  if (!faq) throw new Error(`FAQ not found: ${questionStart}`);
  return faq;
};

// One page per main product at /<productId>/ (pre-rendered by scripts/prerender.mjs).
// Content only restates confirmed facts from PRODUCTS, FAQS and PRICING_MODEL; no figures or proof.
export const PRODUCT_PAGES: ProductPage[] = [
  {
    productId: 'bulk-whatsapp-rcs',
    seoTitle: 'Bulk WhatsApp & RCS Messaging in India | Swarups NXT',
    metaDescription: 'Send bulk WhatsApp and RCS campaigns to opted-in customers, with images, buttons and personalisation, and AI answering replies 24x7. Book a demo.',
    h1: 'Bulk WhatsApp & RCS messaging, with AI handling the replies',
    features: [
      'Campaigns to opted-in customers: offers, reminders, order updates and lead follow-ups',
      'Rich messages with images, videos, documents and buttons',
      "Personalised with each customer's name or order details",
      'An AI chatbot that answers replies straight away, 24x7',
      'Reports on delivered, read and replied',
      'RCS: rich, branded messages in the default messaging app on supported Android phones',
    ],
    industryIds: [],
    faqs: [
      {
        question: 'Who can I send bulk WhatsApp messages to?',
        answer: "Only customers who have opted in to receive messages from your business. Collecting and keeping that opt-in is your business's responsibility, as set out in our Terms of Service.",
      },
      {
        question: 'What is RCS messaging?',
        answer: 'RCS (Rich Communication Services) is the upgrade to SMS. On supported Android phones, your messages arrive in the default messaging app with your brand name, images and buttons, without the customer installing anything.',
      },
      {
        question: 'What happens when customers reply to a campaign?',
        answer: 'The AI chatbot answers straight away, using what it knows about your products and services. When a person is needed, the conversation goes to your team, following the handover workflow agreed with you.',
      },
      {
        question: 'How is bulk WhatsApp and RCS messaging priced?',
        answer: "You pay for the messages you send, by message type (marketing, utility or authentication), plus the platform charges agreed in your quote. Tell us your monthly volume and we'll share a custom quote.",
      },
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'sms-otp',
    seoTitle: 'Enterprise SMS & OTP Service in India | Swarups NXT',
    metaDescription: 'Send OTPs, transaction alerts and promotional SMS at volume, with delivery status for every message. Set up and supported by Swarups NXT. Book a demo.',
    h1: 'Enterprise SMS & OTP, set up for your business',
    features: [
      'Login and payment OTPs sent on transactional routes',
      'Order, account and transaction alerts',
      'Promotional SMS campaigns',
      'Delivery status for every message',
      'Sending connected to your website or app',
      "Help setting up DLT sender IDs and templates, registered in your business's name",
    ],
    industryIds: [],
    faqs: [
      {
        question: 'Why use SMS when customers have WhatsApp?',
        answer: 'SMS reaches every phone, with or without internet or apps, so it is the dependable choice for OTPs and important alerts. Many businesses use SMS and WhatsApp together.',
      },
      {
        question: 'Do I need DLT registration to send business SMS in India?',
        answer: "Yes. Business SMS in India is sent using sender IDs and message templates registered on DLT. We help you set them up, and the registrations stay in your business's name.",
      },
      {
        question: 'Can you connect OTPs and alerts to my website or app?',
        answer: 'Yes. We connect sending to your website or app, and set up delivery reports so you can see what reached each customer.',
      },
      {
        question: 'How is SMS priced?',
        answer: "You pay for each SMS sent, so OTPs, alerts and promotions are billed only as you use them. Tell us your monthly volume and we'll share a custom quote.",
      },
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'ai-voice-agents',
    seoTitle: 'AI Voice Agents for Indian Businesses | Swarups NXT',
    metaDescription: 'AI voice agents that answer calls and make follow-up calls 24x7 in English, Hindi and other Indian languages, and hand over to your team. Book a demo.',
    h1: 'AI voice agents that answer every call, 24x7',
    features: [
      'Answers inbound calls day and night, including after hours',
      'Calls back people who enquired and follows up with leads',
      'Answers common questions and qualifies new leads',
      'Books appointments',
      'Speaks English, Hindi and other Indian languages',
      'Passes calls to your staff when a person is needed',
    ],
    industryIds: ['real-estate', 'healthcare', 'education', 'finance', 'automobile'],
    faqs: [
      sharedFaq('Which languages'),
      {
        question: 'Can the voice agent make outbound calls?',
        answer: 'Yes. It can call back people who enquired, follow up with leads and make reminder calls, for example for appointments or EMIs.',
      },
      sharedFaq('What happens when the AI'),
      sharedFaq('Will the AI replace'),
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'ai-chatbots',
    seoTitle: 'AI Chatbots for WhatsApp & Websites | Swarups NXT',
    metaDescription: 'AI chatbots trained on your business that answer questions, capture leads and book appointments on WhatsApp and your website, 24x7. Book a demo.',
    h1: 'AI chatbots for WhatsApp and your website',
    features: [
      'Trained on your products, services and FAQs',
      'Answers questions instantly, day or night',
      "Collects each visitor's name and requirement",
      'Books appointments',
      'Turns replies to your WhatsApp campaigns into conversations',
      'Hands the conversation to your team when a person is needed',
    ],
    industryIds: ['real-estate', 'healthcare', 'education', 'ecommerce', 'automobile'],
    faqs: [
      {
        question: 'Which channels can the chatbot work on?',
        answer: 'Your website and WhatsApp. For Instagram and Facebook comments and DMs, see Social Media Bots; for one assistant across every channel, see Omnichannel Bots.',
      },
      sharedFaq('Which languages'),
      sharedFaq('What happens when the AI'),
      sharedFaq('Do I need a technical team?'),
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'voice-blast',
    seoTitle: 'Voice Blast & Voice Broadcast Service | Swarups NXT',
    metaDescription: "Send a recorded or AI-voiced message to thousands of phones at once, in your customers' language, with press-a-key responses and call reports.",
    h1: 'Voice blast: one message, thousands of calls',
    features: [
      'A recorded voice or an AI-generated one',
      'Messages in the languages your customers speak',
      'Press-a-key (IVR) options, for example to ask for a callback',
      'Reports on who answered, missed the call or pressed a key',
      'Suits announcements, reminders, promotions and surveys',
    ],
    industryIds: [],
    faqs: [
      {
        question: 'What is a voice blast?',
        answer: 'A voice blast, also called a voice broadcast, sends the same recorded or AI-voiced message to many phone numbers at once. It suits announcements, reminders and offers that many customers need to hear quickly.',
      },
      {
        question: 'Can customers respond to a voice blast?',
        answer: 'Yes. Add press-a-key options so interested customers can, for example, ask for a callback. You then see who answered, missed the call or pressed a key.',
      },
      sharedFaq('Which languages'),
      sharedFaq('How long does setup take?'),
    ],
  },
];

export const productPagePath = (productId: string) => `/${productId}/`;

// Finds the product page for a URL path such as "/sms-otp" or "/sms-otp/"; null = home page.
export const findProductPage = (path: string) => {
  const slug = path.replace(/^\/+|\/+$/g, '');
  return PRODUCT_PAGES.find((p) => p.productId === slug) ?? null;
};
