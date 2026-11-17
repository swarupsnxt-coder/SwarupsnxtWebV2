import { IndustrySector, Product, ProductGroup, ProductPage } from './types';

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

// Official profiles (confirmed by the owner, Nov 2026). Shown in the footer; `inSameAs` ones are
// also listed as `sameAs` on the Organization JSON-LD (entry-server.tsx).
export const SOCIAL_PROFILES = [
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://www.linkedin.com/in/swarupsnxt/', inSameAs: true },
  { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/swarupsnxt/', inSameAs: true },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/swarupsnxt/', inSameAs: true },
  { name: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/@SwarupsNXT', inSameAs: true },
  // Short share link that redirects to the Google Business Profile, so it stays out of sameAs.
  { name: 'Google Maps', icon: 'fa-solid fa-location-dot', url: 'https://maps.app.goo.gl/fw57zneDShmFSzBNA', inSameAs: false },
];

export const WHATSAPP_DEFAULT_TEXT = "Hi Swarups NXT, I'd like to know more about your AI solutions";
export const WHATSAPP_DEMO_TEXT = "Hi Swarups NXT, I'd like to book a demo";

// Product list follows CLAUDE.md "What this is", in the order of business priority (Nov 2026).
// Every card links to WhatsApp with a product-specific message; `id` is the card's anchor (nav dropdown).
export const PRODUCTS: Product[] = [
  {
    id: 'bulk-whatsapp-rcs',
    icon: 'fa-whatsapp',
    iconType: 'fa-brands',
    title: 'Bulk WhatsApp & RCS Engine',
    tag: 'Bulk messaging',
    group: 'reach',
    summary: 'Send offers, reminders and updates to thousands of opted-in customers on WhatsApp and RCS, with AI answering the replies.',
    desc: 'Reach customers where they already are. Send bulk WhatsApp and RCS messages: offers, reminders and updates to opted-in contacts with images, videos, documents and buttons — personalised, with AI answering replies 24x7 and reports on delivered, read and replied.',
    bestFor: 'Festive offers, reminders, order updates, lead follow-ups, win-back',
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
    group: 'reach',
    summary: 'OTPs, transaction alerts and promotional SMS at volume, with delivery status for every message.',
    desc: 'Send OTPs, transaction alerts and promotional SMS at volume. Time-sensitive messages like OTPs go on transactional routes, and you see delivery status for every message.',
    bestFor: 'Login and payment OTPs, order and account alerts, promotions',
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
    group: 'respond',
    summary: 'An AI agent that answers and makes calls 24x7 in Indian languages, and hands over to your team.',
    desc: 'The intelligent upgrade for your phone line. Answer inbound calls and make follow-up calls 24x7, in English, Hindi and other Indian languages. The agent hands over to your team when a person is needed.',
    bestFor: 'Missed calls, after-hours enquiries, follow-ups',
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
    group: 'respond',
    summary: 'Answers questions, captures leads and books appointments on WhatsApp and your website.',
    desc: 'Turn replies to your campaigns into conversations. Answer questions, capture leads and book appointments on WhatsApp and your website — instantly, day or night.',
    bestFor: 'Lead capture, FAQs, appointment booking',
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
    group: 'reach',
    summary: 'One recorded or AI-voiced message to thousands of phones at once, with press-a-key responses.',
    desc: 'Send a recorded or AI-voiced message to thousands of phones at once, in the language your customers speak. Capture interest with press-a-key (IVR) responses and see who answered, missed or pressed a key.',
    bestFor: 'Announcements, appointment and payment reminders, promotions, surveys',
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
    group: 'respond',
    summary: 'Replies to Instagram and Facebook comments and DMs, and turns interested followers into leads.',
    desc: 'Reply to Instagram and Facebook comments and DMs automatically, and turn interested followers into leads.',
    bestFor: 'Social enquiries, campaign responses',
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
    group: 'together',
    summary: 'Automates lead entry, follow-up reminders and status updates, so your team can focus on customers.',
    desc: 'Automate repetitive work between your tools — lead entry, follow-up reminders, status updates — so your team can focus on customers.',
    bestFor: 'Manual data entry, follow-up tasks',
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
    group: 'together',
    summary: 'AI takes routine calls and chats, so your agents handle the conversations that need a person.',
    desc: 'AI handles routine calls and chats, while your agents take the conversations that need a person. Fewer queues, less repetitive work.',
    bestFor: 'High call volumes, support teams',
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
    group: 'together',
    summary: 'One AI assistant across phone, WhatsApp, website chat and social media.',
    desc: 'One AI assistant across phone, WhatsApp, website chat and social media, so customers get the same helpful answers wherever they reach you.',
    bestFor: 'Businesses active on many channels',
    details: "Instead of a separate bot for every channel, you get one assistant trained once on your business. Whether customers reach you on Instagram, WhatsApp, your website or by phone, they get consistent answers, and your team handles the conversations that need a person.",
    ctaLabel: 'Ask about omnichannel bots',
    ctaText: "Hi, I'm interested in Omnichannel Bots",
  }
];

// Home page groups for the product cards (Products.tsx), in display order.
export const PRODUCT_GROUPS: { id: ProductGroup; title: string; desc: string }[] = [
  { id: 'reach', title: 'Reach customers at scale', desc: 'Bulk messages and calls that reach many customers at once.' },
  { id: 'respond', title: 'Answer customers with AI', desc: 'AI agents that reply on calls, chat and social media, 24x7.' },
  { id: 'together', title: 'Run it all together', desc: 'Connect your channels, support team and everyday tasks.' },
];

// "What do you want to do?" (GoalChooser.tsx): each goal points to the product(s) that fit it.
export const GOALS: { icon: string; goal: string; productIds: string[] }[] = [
  { icon: 'fa-solid fa-bullhorn', goal: 'Send offers and updates to thousands of customers', productIds: ['bulk-whatsapp-rcs', 'voice-blast'] },
  { icon: 'fa-solid fa-key', goal: 'Send OTPs and transaction alerts', productIds: ['sms-otp'] },
  { icon: 'fa-solid fa-phone-volume', goal: 'Answer every call, even after hours', productIds: ['ai-voice-agents'] },
  { icon: 'fa-solid fa-comments', goal: 'Reply to website and WhatsApp enquiries instantly', productIds: ['ai-chatbots'] },
  { icon: 'fa-solid fa-hashtag', goal: 'Reply to Instagram and Facebook comments and DMs', productIds: ['social-media-bots'] },
  { icon: 'fa-solid fa-headset', goal: 'Shorten support queues for your team', productIds: ['ai-contact-center'] },
  { icon: 'fa-solid fa-layer-group', goal: 'Give customers one assistant on every channel', productIds: ['omnichannel-bots'] },
  { icon: 'fa-solid fa-gears', goal: 'Stop copying leads and sending reminders by hand', productIds: ['saas-automation'] },
];

// "How it works" on the home page (CampaignFlow.tsx): what happens after you send a campaign.
export const FLOW_STEPS = [
  { icon: 'fa-solid fa-paper-plane', title: 'You send a campaign', desc: 'WhatsApp, RCS, SMS or a voice blast, to customers who have opted in.' },
  { icon: 'fa-solid fa-reply', title: 'Customers respond', desc: 'They ask a question, tap a button, press a key or call you back.' },
  { icon: 'fa-solid fa-robot', title: 'AI answers 24x7', desc: 'In English or their own language, using what it knows about your business.' },
  { icon: 'fa-solid fa-handshake', title: 'Your team takes over', desc: 'Interested leads and tricky questions go to your team, and you see what was delivered and who replied.' },
];

// WhatsApp vs RCS vs SMS vs voice blast (ChannelComparison.tsx). Facts only, no figures.
export type ComparisonChannel = 'whatsapp' | 'rcs' | 'sms' | 'voice';

export const CHANNEL_COMPARISON: {
  channels: { id: ComparisonChannel; name: string; icon: string; productId: string }[];
  rows: { label: string; values: Record<ComparisonChannel, string> }[];
} = {
  channels: [
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', productId: 'bulk-whatsapp-rcs' },
    { id: 'rcs', name: 'RCS', icon: 'fa-solid fa-message', productId: 'bulk-whatsapp-rcs' },
    { id: 'sms', name: 'SMS', icon: 'fa-solid fa-comment-sms', productId: 'sms-otp' },
    { id: 'voice', name: 'Voice blast', icon: 'fa-solid fa-bullhorn', productId: 'voice-blast' },
  ],
  rows: [
    {
      label: 'Reaches',
      values: { whatsapp: 'Customers who use WhatsApp and have opted in', rcs: 'Customers on supported Android phones', sms: 'Every mobile phone', voice: 'Any phone that can take a call, including basic phones' },
    },
    {
      label: 'Needs internet or an app?',
      values: { whatsapp: 'Yes: the WhatsApp app and internet', rcs: 'No app to install: it arrives in the default messaging app', sms: 'No', voice: 'No' },
    },
    {
      label: 'Rich media and buttons',
      values: { whatsapp: 'Images, videos, documents and buttons', rcs: 'Your brand name, images and buttons', sms: 'Text only', voice: 'A spoken message, recorded or AI-voiced' },
    },
    {
      label: 'Customers can respond',
      values: { whatsapp: 'Yes, and AI answers replies 24x7', rcs: 'Yes, by tapping buttons or replying', sms: 'Mostly one-way; add a link or number to reply', voice: 'Yes, by pressing a key, for example to ask for a callback' },
    },
    {
      label: 'Best for',
      values: { whatsapp: 'Offers, reminders, order updates and conversations', rcs: 'Rich, branded promotions to Android users', sms: 'OTPs, transaction alerts and promotions', voice: "Announcements, reminders and surveys, in the customer's language" },
    },
  ],
};

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

// Shared answers reused on product and industry pages, so they stay identical to the home page FAQ.
const sharedFaq = (questionStart: string) => {
  const faq = FAQS.find((f) => f.question.startsWith(questionStart));
  if (!faq) throw new Error(`FAQ not found: ${questionStart}`);
  return faq;
};

export const INDUSTRIES: IndustrySector[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    problem: 'Property enquiries arrive at all hours, and leads go cold before a salesperson calls back.',
    solution: 'Answers every enquiry instantly, qualifies budget and location, and books site visits into your team\'s calendar.',
    details: "Works for builders, brokers and property consultants. Use it for new-project launches, enquiries from property portals and ads, site-visit reminders, and follow-ups with prospects who went quiet — in English, Hindi and regional languages.",
    productIds: ['bulk-whatsapp-rcs', 'ai-voice-agents', 'ai-chatbots'],
    seoTitle: "WhatsApp & AI Calling for Real Estate | Swarups NXT",
    metaDescription: "Answer property enquiries instantly, follow up portal leads, send new-launch campaigns on WhatsApp and book site visits, in English and Indian languages.",
    h1: "WhatsApp campaigns and AI agents for real estate",
    useCases: [
      { title: "New-project launch campaigns", desc: "Send launch details, brochures and site-visit invites on WhatsApp to buyers who have opted in.", productId: 'bulk-whatsapp-rcs' },
      { title: "Instant replies to portal and ad enquiries", desc: "The AI agent calls new leads back straight away and qualifies their budget and location.", productId: 'ai-voice-agents' },
      { title: "Site-visit booking and reminders", desc: "Buyers book a site visit on WhatsApp or your website, and get a reminder before they come.", productId: 'ai-chatbots' },
      { title: "Follow-ups with prospects who went quiet", desc: "Follow-up calls to people who enquired, so no interested buyer is forgotten.", productId: 'ai-voice-agents' },
    ],
    faqs: [
      {
        question: "Can the AI agent qualify property leads?",
        answer: "Yes. It asks about budget, location and requirement, and passes interested buyers to your sales team with the details collected.",
      },
      {
        question: "Does it work for leads from property portals and ads?",
        answer: "Yes. Use it for enquiries from property portals and ads, new-project launches, site-visit reminders and follow-ups with prospects who went quiet.",
      },
      sharedFaq("Which languages"),
      sharedFaq("How long does setup take?"),
    ],
    ctaText: "Hi, I run a real estate business and I'd like to know how Swarups NXT can help",
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Modern residential building exterior',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinics',
    problem: 'Front-desk staff are busy with patients, so appointment calls go unanswered and no-shows pile up.',
    solution: 'Books and reschedules appointments by phone or WhatsApp, and sends reminders before each visit.',
    details: "Suits clinics, diagnostic centres and hospitals. Patients can book, reschedule or cancel without waiting on hold, get reminders before their visit, and ask routine questions about timings and services, while your front desk focuses on the patients in front of them.",
    productIds: ['ai-voice-agents', 'ai-chatbots', 'bulk-whatsapp-rcs'],
    seoTitle: "AI Receptionist & Reminders for Clinics | Swarups NXT",
    metaDescription: "Let patients book, reschedule and get reminders by phone or WhatsApp, 24x7, in their language, while your front desk looks after patients in the clinic.",
    h1: "AI receptionists and reminders for clinics and hospitals",
    useCases: [
      { title: "Appointment booking by phone", desc: "The AI voice agent answers calls, and books or reschedules appointments, even when the front desk is busy.", productId: 'ai-voice-agents' },
      { title: "Booking on WhatsApp", desc: "Patients book, reschedule or cancel on WhatsApp without waiting on hold.", productId: 'ai-chatbots' },
      { title: "Reminders before each visit", desc: "Patients get a reminder on WhatsApp before their appointment.", productId: 'bulk-whatsapp-rcs' },
      { title: "Announcements to many patients", desc: "Holiday closures, health camps or new services, announced by voice call in the patient's language.", productId: 'voice-blast' },
    ],
    faqs: [
      {
        question: "Can patients reschedule or cancel appointments themselves?",
        answer: "Yes. Patients can book, reschedule or cancel by phone or WhatsApp without waiting on hold, and ask routine questions about timings and services.",
      },
      sharedFaq("How is my customer data handled?"),
      sharedFaq("What happens when the AI"),
      sharedFaq("Which languages"),
    ],
    ctaText: "Hi, I run a clinic / hospital and I'd like to know how Swarups NXT can help",
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Hospital corridor',
  },
  {
    id: 'education',
    title: 'Education',
    problem: 'Admission season brings more calls and messages from parents than the team can handle.',
    solution: 'Answers admission and fee-structure questions, shares brochures, and schedules campus visits or counselling calls.',
    details: "Useful for schools, colleges, coaching centres and ed-tech companies. Parents and students get quick answers on courses, eligibility and admission steps at any hour, and your counsellors receive enquiries that are ready for a conversation.",
    productIds: ['ai-chatbots', 'ai-voice-agents', 'bulk-whatsapp-rcs'],
    seoTitle: "AI Admission Enquiry Handling for Education | Swarups NXT",
    metaDescription: "Answer admission and fee questions 24x7, share brochures, book campus visits and send admission-season campaigns on WhatsApp, in Indian languages.",
    h1: "Handle admission season without missing an enquiry",
    useCases: [
      { title: "Admission and fee questions", desc: "Parents and students get answers on courses, eligibility, fees and admission steps at any hour.", productId: 'ai-chatbots' },
      { title: "Call-backs and counselling calls", desc: "The AI agent calls back parents who enquired and schedules campus visits or counselling calls.", productId: 'ai-voice-agents' },
      { title: "Admission-season campaigns", desc: "Admission dates, open-day invites and reminders on WhatsApp, to parents who have opted in.", productId: 'bulk-whatsapp-rcs' },
      { title: "Fee and exam alerts", desc: "SMS alerts for fee due dates and exam schedules.", productId: 'sms-otp' },
    ],
    faqs: [
      {
        question: "Can it share brochures and fee details?",
        answer: "Yes. It answers questions on courses, eligibility, fees and admission steps, and shares your brochures, at any hour.",
      },
      {
        question: "Who handles serious enquiries?",
        answer: "Your counsellors. The AI collects the details and passes on enquiries that are ready for a conversation.",
      },
      sharedFaq("Which languages"),
      sharedFaq("How long does setup take?"),
    ],
    ctaText: "Hi, I run an educational institution and I'd like to know how Swarups NXT can help",
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Students working together',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & D2C',
    problem: 'Customers keep asking "where is my order?", and unconfirmed COD orders get returned.',
    solution: 'Shares order status, confirms COD orders before dispatch, and answers product questions on WhatsApp and chat.',
    details: "Built for online stores and D2C brands. Customers get instant order updates, COD orders are confirmed before they ship, and product questions are answered while the buyer is still interested — on WhatsApp, your website and social media.",
    productIds: ['bulk-whatsapp-rcs', 'ai-chatbots', 'social-media-bots'],
    seoTitle: "WhatsApp Order Updates & COD Confirmation | Swarups NXT",
    metaDescription: "Share order status, confirm COD orders before dispatch, send offers to opted-in customers and answer product questions on WhatsApp, chat and social media.",
    h1: "WhatsApp, SMS and AI for online stores and D2C brands",
    useCases: [
      { title: "Order updates", desc: "Customers get order status updates on WhatsApp, and the chatbot answers \"where is my order?\".", productId: 'bulk-whatsapp-rcs' },
      { title: "COD confirmation", desc: "Cash-on-delivery orders are confirmed with the customer before they ship.", productId: 'ai-chatbots' },
      { title: "Offers and win-back campaigns", desc: "Festive offers and win-back messages to customers who have opted in, with AI answering the replies.", productId: 'bulk-whatsapp-rcs' },
      { title: "Product questions on Instagram and Facebook", desc: "Comments and DMs on your posts and ads are answered while the buyer is still interested.", productId: 'social-media-bots' },
      { title: "Login and payment OTPs", desc: "OTPs and transaction alerts by SMS, which reach every phone.", productId: 'sms-otp' },
    ],
    faqs: [
      {
        question: "Can it confirm cash-on-delivery orders?",
        answer: "Yes. COD orders are confirmed with the customer before they ship, on WhatsApp or chat.",
      },
      {
        question: "Can it answer product questions on Instagram and Facebook?",
        answer: "Yes. Social Media Bots reply to comments and DMs on your posts and ads, and pass serious enquiries to your team.",
      },
      sharedFaq("Can it work with the tools"),
      sharedFaq("How long does setup take?"),
    ],
    ctaText: "Hi, I run an online store and I'd like to know how Swarups NXT can help",
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Online shopping on a laptop',
  },
  {
    id: 'finance',
    title: 'Finance & NBFC Collections',
    problem: 'Calling every borrower about upcoming or missed EMIs takes a large team and a lot of time.',
    solution: 'Makes polite EMI reminder calls in the borrower\'s language, captures a promise-to-pay date, and flags cases for your team.',
    details: "Designed for NBFCs, lenders and collection teams. Reminder calls stay polite and consistent, happen in the borrower's preferred language, and record the response, so your team can focus on the accounts that need personal attention.",
    productIds: ['ai-voice-agents', 'sms-otp', 'voice-blast'],
    seoTitle: "AI EMI Reminder Calls for NBFCs & Lenders | Swarups NXT",
    metaDescription: "Polite EMI reminder calls in the borrower's language, promise-to-pay capture and SMS alerts, so your collection team can focus on the accounts that need them.",
    h1: "EMI reminders and collections support for NBFCs and lenders",
    useCases: [
      { title: "EMI reminder calls", desc: "Polite, consistent reminder calls about upcoming or missed EMIs, in the borrower's language.", productId: 'ai-voice-agents' },
      { title: "Promise-to-pay capture", desc: "The agent records the borrower's response and a promise-to-pay date, and flags cases for your team.", productId: 'ai-voice-agents' },
      { title: "Payment and account alerts", desc: "SMS alerts for due dates and payments, and OTPs for logins and transactions.", productId: 'sms-otp' },
      { title: "Due-date reminders at scale", desc: "One recorded reminder to many borrowers at once, with a press-a-key option to ask for a callback.", productId: 'voice-blast' },
    ],
    faqs: [
      {
        question: "Can the reminder calls be in the borrower's language?",
        answer: "Yes. Reminder calls are made in the borrower's preferred language, and stay polite and consistent.",
      },
      {
        question: "What happens after a reminder call?",
        answer: "The agent records the response and any promise-to-pay date, and flags the accounts that need personal attention for your team.",
      },
      sharedFaq("How is my customer data handled?"),
      sharedFaq("How long does setup take?"),
    ],
    ctaText: "Hi, I work with an NBFC / lender and I'd like to know how Swarups NXT can help",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Financial charts on a screen',
  },
  {
    id: 'automobile',
    title: 'Automobile Dealers',
    problem: 'Test-drive and service enquiries come in after hours, and follow-ups depend on busy staff.',
    solution: 'Books test drives and service appointments, sends service reminders, and follows up with interested buyers.',
    details: "For car and two-wheeler dealerships. The AI agent handles test-drive requests, service bookings and reminders, and follows up with walk-in and online leads, so no interested buyer is forgotten after a showroom visit.",
    productIds: ['ai-voice-agents', 'voice-blast', 'bulk-whatsapp-rcs'],
    seoTitle: "AI Test Drive & Service Booking for Dealers | Swarups NXT",
    metaDescription: "Book test drives and service appointments, send service reminders and follow up with buyers by phone and WhatsApp, for car and two-wheeler dealers.",
    h1: "Test drives, service bookings and follow-ups for dealerships",
    useCases: [
      { title: "Test-drive requests", desc: "Requests that come in after showroom hours are answered and booked for your team.", productId: 'ai-voice-agents' },
      { title: "Service reminders", desc: "A recorded service reminder to many customers at once, with \"press 1 to book\".", productId: 'voice-blast' },
      { title: "Follow-ups with interested buyers", desc: "Walk-in and online leads are followed up on WhatsApp, so no interested buyer is forgotten.", productId: 'bulk-whatsapp-rcs' },
      { title: "Service bookings by phone", desc: "Customers call to book a service and the AI agent books it, any time of day.", productId: 'ai-voice-agents' },
    ],
    faqs: [
      {
        question: "Can it handle test-drive requests after showroom hours?",
        answer: "Yes. The AI agent answers test-drive and service requests at any time, and books them for your team.",
      },
      {
        question: "Can it send service reminders?",
        answer: "Yes, on WhatsApp or by voice call, with a press-a-key option to book the service.",
      },
      sharedFaq("Which languages"),
      sharedFaq("How long does setup take?"),
    ],
    ctaText: "Hi, I run a vehicle dealership and I'd like to know how Swarups NXT can help",
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Car parked on a road',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    problem: 'Booking and availability questions arrive around the clock, across phone, WhatsApp and social media.',
    solution: 'Answers room availability and amenity questions, takes booking requests, and hands special requests to your staff.',
    details: "For hotels, resorts and restaurants. Guests get quick answers about rooms, availability and amenities on the channel they prefer, booking requests are captured any time of day, and special requests reach your staff.",
    productIds: ['omnichannel-bots', 'ai-contact-center', 'social-media-bots'],
    seoTitle: "AI Booking Assistant for Hotels & Restaurants | Swarups NXT",
    metaDescription: "Answer room availability and amenity questions and take booking requests 24x7 on phone, WhatsApp and social media, with special requests sent to staff.",
    h1: "Answer every guest, on every channel, around the clock",
    useCases: [
      { title: "Availability and amenity questions", desc: "Guests get quick answers about rooms, availability and amenities on the channel they prefer.", productId: 'omnichannel-bots' },
      { title: "Booking requests at any hour", desc: "Booking requests by phone are captured even late at night.", productId: 'ai-voice-agents' },
      { title: "Instagram and Facebook enquiries", desc: "Comments and DMs on your posts are answered, and booking enquiries go to your team.", productId: 'social-media-bots' },
      { title: "Busy-season calls", desc: "AI takes routine calls and chats, so your staff can focus on guests.", productId: 'ai-contact-center' },
    ],
    faqs: [
      {
        question: "Can guests ask on Instagram, WhatsApp and the phone?",
        answer: "Yes. With an omnichannel bot, guests get the same answers on phone, WhatsApp, website chat, Instagram and Facebook.",
      },
      {
        question: "What happens with special requests?",
        answer: "They are passed to your staff, following the handover workflow agreed with you.",
      },
      sharedFaq("Which languages"),
      sharedFaq("How long does setup take?"),
    ],
    ctaText: "Hi, I run a hotel / restaurant and I'd like to know how Swarups NXT can help",
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

// How pricing works, per channel. No figures anywhere (CLAUDE.md hard rule 2).
// WhatsApp is billed per message by category since Meta's July 2025 change, not per conversation.
export const PRICING_MODEL = [
  { channel: 'WhatsApp & RCS', icon: 'fa-brands fa-whatsapp', unit: 'Per message', desc: 'You pay for the messages you send, by message type (marketing, utility or authentication), plus the platform charges agreed in your quote.' },
  { channel: 'SMS & OTP', icon: 'fa-solid fa-comment-sms', unit: 'Per message', desc: 'You pay for each SMS sent, so OTPs, alerts and promotions are billed only as you use them.' },
  { channel: 'Contact center (CCaaS)', icon: 'fa-solid fa-headset', unit: 'Per seat', desc: 'You pay for each agent seat your team uses, with AI handling routine calls and chats alongside them.' },
];

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
    howItWorks: [
      { title: "Set up your sender and templates", desc: "We help you set up your business sender and the message templates for your campaigns." },
      { title: "Send your campaign", desc: "Choose who gets it from your opted-in contacts, personalise each message with names or order details, and send." },
      { title: "AI answers the replies", desc: "The AI chatbot replies straight away, 24x7, and passes interested customers to your team." },
      { title: "See the results", desc: "Reports show what was delivered, read and replied." },
    ],
    relatedIds: ['ai-chatbots', 'sms-otp', 'voice-blast'],
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
    howItWorks: [
      { title: "Set up sender IDs and templates", desc: "We help you set up your DLT sender IDs and message templates. The registrations stay in your business's name." },
      { title: "Connect your website or app", desc: "We connect sending to your systems, so OTPs and alerts go out automatically." },
      { title: "Send and track", desc: "OTPs go on transactional routes, and you see the delivery status of every message." },
    ],
    relatedIds: ['bulk-whatsapp-rcs', 'voice-blast', 'saas-automation'],
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
    howItWorks: [
      { title: "Tell us about your calls", desc: "Which calls come in, what callers ask, and when a person should take over." },
      { title: "We train your agent", desc: "On your services, FAQs and booking process, in the languages your callers speak." },
      { title: "It answers and calls 24x7", desc: "Inbound calls are answered, leads are followed up, and calls that need a person go to your staff." },
    ],
    relatedIds: ['ai-chatbots', 'ai-contact-center', 'voice-blast'],
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
    howItWorks: [
      { title: "Share your products and FAQs", desc: "Tell us what customers usually ask and how you book appointments." },
      { title: "We train and set up your chatbot", desc: "On your website and WhatsApp, with answers that match your business." },
      { title: "It answers, captures leads and books", desc: "And it hands the conversation to your team when a person is needed." },
    ],
    relatedIds: ['bulk-whatsapp-rcs', 'social-media-bots', 'omnichannel-bots'],
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
    howItWorks: [
      { title: "Record or choose an AI voice", desc: "Pick a recorded message or an AI-generated voice, in the languages your customers speak." },
      { title: "Add press-a-key options", desc: "For example, press 1 to book or press 2 for a callback." },
      { title: "Send and see responses", desc: "Reports show who answered, missed the call or pressed a key." },
    ],
    relatedIds: ['ai-voice-agents', 'sms-otp', 'bulk-whatsapp-rcs'],
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
  {
    productId: 'social-media-bots',
    seoTitle: 'Instagram & Facebook Auto-Reply Bots | Swarups NXT',
    metaDescription: 'Reply to Instagram and Facebook comments and DMs automatically, answer product questions and turn interested followers into leads. Book a demo.',
    h1: 'Social media bots that reply to every comment and DM',
    features: [
      'Replies to comments on your posts and ads',
      'Answers direct messages on Instagram and Facebook',
      'Answers product questions and shares the right link or next step',
      'Keeps replying late at night and during busy campaigns',
      'Passes serious enquiries to your team as leads',
    ],
    industryIds: ['ecommerce', 'hospitality', 'education'],
    howItWorks: [
      { title: 'Share your products and FAQs', desc: 'Tell us what followers usually ask and where you want to send them next.' },
      { title: 'We set up replies for your pages', desc: 'For comments and DMs on your Instagram and Facebook posts and ads.' },
      { title: 'Followers get answers, your team gets leads', desc: 'Serious enquiries are passed to your team, following the workflow agreed with you.' },
    ],
    relatedIds: ['ai-chatbots', 'omnichannel-bots', 'bulk-whatsapp-rcs'],
    faqs: [
      {
        question: 'Which social media platforms does it work on?',
        answer: 'Instagram and Facebook: comments on your posts and ads, and direct messages.',
      },
      {
        question: 'Can it reply to comments on my ads?',
        answer: 'Yes. It replies to comments on your posts and ads, even late at night or in the middle of a busy campaign.',
      },
      {
        question: 'What happens to serious enquiries?',
        answer: 'The bot passes them to your team as leads, following the handover workflow agreed with you.',
      },
      sharedFaq('Which languages'),
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'saas-automation',
    seoTitle: 'Workflow Automation for Indian Businesses | Swarups NXT',
    metaDescription: 'Automate repetitive work like lead entry, follow-up reminders and customer status updates, so your team can focus on customers. Book a demo.',
    h1: 'Automate the repetitive work your team does every day',
    features: [
      'New enquiries entered automatically, without copying by hand',
      'Follow-up reminders sent on time',
      'Customers kept updated on the status of their request',
      'We confirm what is possible with the tools you use today before we start',
      'Set up and changed for you, with no technical team needed',
    ],
    industryIds: ['real-estate', 'education', 'ecommerce'],
    howItWorks: [
      { title: 'We map your daily steps', desc: 'Copying enquiries into a sheet, sending reminders, updating customers on status.' },
      { title: 'We confirm what is possible', desc: 'With the tools you use today, before any work starts.' },
      { title: 'We automate and support it', desc: 'The steps run on their own, and we make changes when your process changes.' },
    ],
    relatedIds: ['ai-chatbots', 'bulk-whatsapp-rcs', 'ai-contact-center'],
    faqs: [
      {
        question: 'What kind of work can be automated?',
        answer: 'Repetitive steps such as copying enquiries into a sheet, sending follow-up reminders and updating customers on the status of their request.',
      },
      sharedFaq('Can it work with the tools'),
      sharedFaq('Do I need a technical team?'),
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'ai-contact-center',
    seoTitle: 'AI Contact Center (CCaaS) Solutions | Swarups NXT',
    metaDescription: 'AI handles routine calls and chats while your agents take the conversations that need a person. For inbound support and outbound calling teams.',
    h1: 'An AI contact center: AI takes the routine, your agents take the rest',
    features: [
      'AI takes first-level calls and chats',
      "Collects the customer's details before routing",
      'Routes each conversation to the right person',
      'For inbound support lines and outbound calling teams',
      'Fewer queues and less repetitive work for your agents',
      'Priced per agent seat',
    ],
    industryIds: ['hospitality', 'finance', 'healthcare', 'ecommerce'],
    howItWorks: [
      { title: 'Map your queues', desc: 'Which questions are routine, and who in your team handles the rest.' },
      { title: 'AI takes first-level queries', desc: 'It answers routine calls and chats and collects the details your agents need.' },
      { title: 'Agents take what needs judgement', desc: 'Each conversation that needs a person is routed to the right one.' },
    ],
    relatedIds: ['ai-voice-agents', 'omnichannel-bots', 'ai-chatbots'],
    faqs: [
      {
        question: 'What is CCaaS?',
        answer: 'CCaaS (contact center as a service) is a contact center that runs in the cloud, so your team can handle calls and chats without running phone systems in your office. With Swarups NXT, AI handles the routine conversations alongside your agents.',
      },
      {
        question: 'Does it work for inbound and outbound calling?',
        answer: 'Yes. Set it up for inbound support lines or for outbound calling teams.',
      },
      {
        question: 'How is the AI contact center priced?',
        answer: "You pay for each agent seat your team uses, with AI handling routine calls and chats alongside them. Tell us how many agents you have and we'll share a custom quote.",
      },
      sharedFaq('Will the AI replace'),
      sharedFaq('How long does setup take?'),
    ],
  },
  {
    productId: 'omnichannel-bots',
    seoTitle: 'Omnichannel AI Assistant for Every Channel | Swarups NXT',
    metaDescription: 'One AI assistant across phone, WhatsApp, website chat, Instagram and Facebook, trained once on your business. Consistent answers everywhere.',
    h1: 'One AI assistant on every channel',
    features: [
      'One assistant for phone, WhatsApp, website chat, Instagram and Facebook',
      'Trained once on your business',
      'Consistent answers wherever customers reach you',
      'Your team handles the conversations that need a person',
      'Start with one channel and add more later',
    ],
    industryIds: ['hospitality', 'ecommerce', 'real-estate'],
    howItWorks: [
      { title: 'Train it once', desc: 'On your products, services and FAQs.' },
      { title: 'Switch on your channels', desc: 'Start with one channel and add more later.' },
      { title: 'Same answers everywhere', desc: 'Customers get consistent answers, and your team takes the conversations that need a person.' },
    ],
    relatedIds: ['ai-chatbots', 'ai-voice-agents', 'social-media-bots'],
    faqs: [
      {
        question: 'How is this different from a separate chatbot on each channel?',
        answer: 'Instead of a separate bot for every channel, you get one assistant trained once on your business, so customers get the same answers on Instagram, WhatsApp, your website or the phone.',
      },
      {
        question: 'Which channels does it cover?',
        answer: 'Phone, WhatsApp, website chat, Instagram and Facebook. You can start with one channel and add more later.',
      },
      sharedFaq('What happens when the AI'),
      sharedFaq('Which languages'),
      sharedFaq('How long does setup take?'),
    ],
  },
];

export const productPagePath = (productId: string) => `/${productId}/`;
export const industryPagePath = (industryId: string) => `/industries/${industryId}/`;

// Finds the industry for a URL path such as "/industries/healthcare/"; null if none.
export const findIndustryPage = (path: string) => {
  const m = path.match(/^\/industries\/([^/]+)\/?$/);
  return m ? INDUSTRIES.find((i) => i.id === m[1]) ?? null : null;
};

// Product titles for an industry's best-fit products, e.g. "AI Voice Agents + AI Chatbots".
export const productTitles = (ids: string[]) =>
  ids.map((id) => PRODUCTS.find((p) => p.id === id)?.title ?? id).join(' + ');

// Finds the product page for a URL path such as "/sms-otp" or "/sms-otp/"; null = home page.
export const findProductPage = (path: string) => {
  const slug = path.replace(/^\/+|\/+$/g, '');
  return PRODUCT_PAGES.find((p) => p.productId === slug) ?? null;
};
