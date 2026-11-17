// Plain-English explainer guides at /guides/<slug>/ (GuidePage.tsx), listed at /guides/.
// Rules: no figures, prices or "compliant" claims (CLAUDE.md hard rules 1-3). Regulatory facts
// were checked against official sources on 2026-11-17 and are kept general; recheck them and
// update `dateModified` whenever a guide is edited.
import { Guide } from '../types';

export const GUIDES: Guide[] = [
  {
    slug: 'whatsapp-vs-rcs-vs-sms-vs-voice-blast',
    seoTitle: 'WhatsApp vs RCS vs SMS vs Voice Blast | Swarups NXT',
    metaDescription: 'Which channel should your business use to reach customers in India? A plain-English comparison of WhatsApp, RCS, SMS and voice blast, and when to use each.',
    h1: 'WhatsApp, RCS, SMS or voice blast: which channel should your business use?',
    summary: 'What each channel is good at, who it reaches, and how businesses combine them.',
    datePublished: '2026-11-17',
    dateModified: '2026-11-17',
    intro: 'Indian businesses can reach customers on WhatsApp, RCS, SMS and by voice call. Each channel reaches different people and suits a different job. This guide compares them side by side, so you can pick the right one for each message.',
    sections: [
      {
        heading: 'The four channels at a glance',
        paragraphs: ['The table below compares what each channel reaches, what it needs on the customer\'s phone, and what it is best for.'],
        embed: 'channel-comparison',
      },
      {
        heading: 'When to use WhatsApp',
        paragraphs: [
          'WhatsApp suits messages where you want the customer to look, tap and reply: offers, reminders, order updates and lead follow-ups. Messages can carry images, videos, documents and buttons, and can be personalised with the customer\'s name or order details.',
          'Because customers reply on WhatsApp, a campaign quickly becomes many conversations. An AI chatbot can answer those replies straight away and pass interested customers to your team. You can only message customers who have opted in.',
        ],
      },
      {
        heading: 'When to use RCS',
        paragraphs: [
          'RCS (Rich Communication Services) is the upgrade to SMS. On supported Android phones, your message arrives in the default messaging app with your brand name, images and buttons, without the customer installing anything.',
          'Use it for rich, branded promotions to Android users. For customers whose phones do not support RCS, reach them by SMS or WhatsApp instead.',
        ],
      },
      {
        heading: 'When to use SMS',
        paragraphs: [
          'SMS reaches every mobile phone, with or without internet or apps. That makes it the dependable choice for OTPs, transaction alerts and other messages that must arrive, as well as simple promotions.',
          'Business SMS in India uses sender IDs and message templates registered on DLT, so plan that setup before you start sending.',
        ],
      },
      {
        heading: 'When to use voice blast',
        paragraphs: [
          'A voice blast sends one recorded or AI-voiced message to many phones at once. It reaches any phone that can take a call, including basic phones, and customers hear the message in their own language instead of reading it.',
          'Add press-a-key options, such as "press 1 for a callback", and you see who answered, who missed the call and who pressed a key. It suits announcements, reminders and short surveys.',
        ],
      },
      {
        heading: 'Using channels together',
        paragraphs: ['Most businesses use more than one channel, each for what it does best. For example:'],
        bullets: [
          'OTPs and payment alerts by SMS, because they must reach every phone.',
          'Offers and order updates on WhatsApp, with AI answering the replies.',
          'Reminders by voice blast for customers who are more likely to listen than read.',
          'Rich, branded promotions by RCS for Android users.',
        ],
      },
      {
        heading: 'Questions to ask before you choose',
        paragraphs: ['A few questions usually point to the right channel:'],
        bullets: [
          'Do your customers use smartphones and WhatsApp, or do many use basic phones?',
          'Do you want customers to reply, or is the message one-way?',
          'Is the message time-critical, like an OTP?',
          'Would your customers rather read the message or hear it, and in which language?',
          'Have your customers opted in to hear from you on this channel?',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which is better for promotions: WhatsApp or SMS?',
        answer: 'WhatsApp suits promotions where you want customers to see images, tap buttons and reply, and it needs their opt-in. SMS reaches every phone, including those without internet. Many businesses use both.',
      },
      {
        question: 'Can I use more than one channel?',
        answer: 'Yes. You can start with one channel and add more later. We help you set up each channel for the job it does best.',
      },
    ],
    relatedProductIds: ['bulk-whatsapp-rcs', 'sms-otp', 'voice-blast'],
    sources: [],
  },
  {
    slug: 'what-is-rcs-messaging',
    seoTitle: 'What Is RCS Messaging? A Guide for Businesses | Swarups NXT',
    metaDescription: 'RCS messaging explained in plain English: how rich, branded business messages reach Android users in the default messaging app, and when to use RCS.',
    h1: 'What is RCS messaging? A plain-English guide for Indian businesses',
    summary: 'How RCS business messages work, what customers see, and when RCS is the right choice.',
    datePublished: '2026-11-17',
    dateModified: '2026-11-17',
    intro: 'RCS (Rich Communication Services) is the upgrade to SMS. It lets businesses send rich, branded messages that arrive in the default messaging app on supported phones, with images and buttons, and without the customer installing a new app.',
    sections: [
      {
        heading: 'What customers see',
        paragraphs: ['Instead of a plain text message from a short sender ID, an RCS business message can show:'],
        bullets: [
          'Your brand name and logo, with a verified badge once your business is verified',
          'Images and rich cards, for example a product with its details',
          'Buttons and suggested replies, such as "View offer" or "Talk to us"',
        ],
      },
      {
        heading: 'How RCS differs from SMS',
        paragraphs: [
          'SMS is text only and reaches every phone, with or without internet. RCS needs a supported phone and a data connection (mobile data or Wi-Fi), and in return it carries your branding, images and buttons. Customers can also respond by tapping a button or replying.',
          'Because not every phone supports RCS, businesses usually keep SMS or WhatsApp for customers that RCS cannot reach, and always use SMS for messages that must arrive, like OTPs.',
        ],
      },
      {
        heading: 'How RCS differs from WhatsApp',
        paragraphs: [
          'Both carry rich messages with buttons. WhatsApp needs the customer to use the WhatsApp app and to have opted in to messages from your business. RCS arrives in the phone\'s built-in messaging app, so the customer does not need a separate app.',
        ],
      },
      {
        heading: 'Getting started with RCS',
        paragraphs: ['To send RCS business messages, a business needs:'],
        bullets: [
          'A verified business sender profile with your brand name, logo and description',
          'Approval from the platform and mobile networks before you go live',
          'Messages designed for rich cards and buttons, with a plan for customers whose phones do not support RCS',
        ],
      },
      {
        heading: 'When RCS is a good fit',
        paragraphs: [
          'RCS suits rich, branded promotions and updates to Android users: new collections, offers with images, appointment or delivery updates with buttons. It works well alongside WhatsApp and SMS rather than replacing them.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the customer need to install an app for RCS?',
        answer: 'No. On supported phones, RCS messages arrive in the default messaging app. The phone needs a data connection (mobile data or Wi-Fi).',
      },
      {
        question: 'What happens if a customer\'s phone does not support RCS?',
        answer: 'They will not receive the RCS message, so plan another channel for them, such as SMS or WhatsApp. We help you set this up when we plan your campaigns.',
      },
      {
        question: 'How is RCS priced?',
        answer: 'RCS is billed per message, and the platform charges are part of your quote. Tell us your monthly volume and we\'ll share a custom quote.',
      },
    ],
    relatedProductIds: ['bulk-whatsapp-rcs', 'sms-otp', 'ai-chatbots'],
    sources: [
      { name: 'Google: RCS for Business', url: 'https://developers.google.com/business-communications/rcs-business-messaging' },
    ],
  },
  {
    slug: 'dlt-registration-for-business-sms-india',
    seoTitle: 'DLT Registration for Business SMS in India | Swarups NXT',
    metaDescription: 'What DLT registration is, and what Indian businesses need before sending OTPs, alerts or promotional SMS: principal entity, sender IDs, templates and consent.',
    h1: 'DLT registration for business SMS in India: what you need before sending',
    summary: 'The DLT basics in plain English: principal entity, sender IDs, templates and consent.',
    datePublished: '2026-11-17',
    dateModified: '2026-11-17',
    intro: 'Every business that sends commercial SMS in India, from OTPs to promotions, has to register on a DLT (Distributed Ledger Technology) platform first. This guide explains the parts of DLT registration in plain English, so you know what to prepare.',
    sections: [
      {
        heading: 'Why DLT exists',
        paragraphs: [
          'TRAI\'s Telecom Commercial Communications Customer Preference Regulations, 2018 (TCCCPR), and their later amendments and directions, set the rules for commercial messages in India. Their aim is to cut spam and fraud and to respect customers\' preferences. DLT platforms, run by the telecom operators, record who is sending, from which sender ID and with which message templates.',
        ],
      },
      {
        heading: 'What your business registers',
        paragraphs: ['DLT registration has a few parts. Each one is registered in your business\'s name:'],
        bullets: [
          'Principal entity: your business, registered with its business documents on an operator\'s DLT platform.',
          'Headers (sender IDs): the name customers see as the sender of your SMS.',
          'Content templates: the approved wording of each message, with the changing parts (like a name or an OTP) marked as variables.',
          'Consent: where the rules require it, how you collect and record each customer\'s consent to receive your messages.',
        ],
      },
      {
        heading: 'Message types',
        paragraphs: [
          'Templates are registered by type, such as promotional, service or transactional messages. The type decides which rules apply, for example whether customers\' do-not-disturb (DND) preferences block the message. OTPs and transaction alerts are registered differently from offers and promotions.',
          'Telecom operators check each message against your registered headers and templates. A message that does not match an approved template is not delivered.',
        ],
      },
      {
        heading: 'Before you start sending',
        paragraphs: ['A short checklist:'],
        bullets: [
          'Keep your business registration documents ready for the principal entity registration.',
          'Choose sender IDs that customers will recognise as your brand.',
          'Write each message you plan to send, and mark the parts that change.',
          'Decide which messages are promotional and which are OTPs or alerts.',
          'Make sure you have the customer consent the rules require for each message type.',
        ],
      },
      {
        heading: 'How Swarups NXT helps',
        paragraphs: [
          'We help you set up your DLT sender IDs and message templates, connect sending to your website or app, and set up delivery reports. The registrations stay in your business\'s name, and keeping them and your customer consent up to date is your business\'s responsibility, as set out in our Terms of Service.',
          'This guide is a plain-English overview, not legal advice. The rules are updated from time to time, so check the current requirements on your DLT platform or on TRAI\'s website.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need DLT registration to send OTPs?',
        answer: 'Yes. Business SMS in India, including OTPs and transaction alerts, is sent using sender IDs and message templates registered on DLT.',
      },
      {
        question: 'Whose name are the DLT registrations in?',
        answer: 'Your business\'s. We help you set up your sender IDs and templates, and the registrations stay in your business\'s name.',
      },
      {
        question: 'Why was my SMS not delivered?',
        answer: 'One common reason is that the message did not match an approved template exactly, or was sent from a sender ID that is not linked to that template. Delivery reports show what reached each customer.',
      },
    ],
    relatedProductIds: ['sms-otp', 'bulk-whatsapp-rcs', 'voice-blast'],
    sources: [
      { name: 'TRAI: regulations', url: 'https://www.trai.gov.in/release-publication/regulations' },
      { name: 'TRAI: directions', url: 'https://www.trai.gov.in/release-publication/directions' },
    ],
  },
  {
    slug: 'bulk-whatsapp-messaging-basics',
    seoTitle: 'Bulk WhatsApp Messaging Basics for Businesses | Swarups NXT',
    metaDescription: 'Bulk WhatsApp messaging explained: customer opt-in, message templates, marketing, utility and authentication messages, the 24-hour window and pricing.',
    h1: 'Bulk WhatsApp messaging basics: opt-in, templates and message types',
    summary: 'Opt-in, templates, message categories and how WhatsApp charges, in plain English.',
    datePublished: '2026-11-17',
    dateModified: '2026-11-17',
    intro: 'Bulk WhatsApp messaging lets a business send offers, reminders and updates to many customers at once, through the WhatsApp Business Platform. It works differently from messaging friends on the WhatsApp app. This guide covers the basics you need before your first campaign.',
    sections: [
      {
        heading: 'Opt-in comes first',
        paragraphs: [
          'You can only send WhatsApp messages to customers who have agreed to hear from your business on WhatsApp. Collect opt-in where customers already deal with you, for example on your website, at checkout, in your store or on a form, and keep a record of it.',
          'Collecting and keeping that opt-in is your business\'s responsibility, as set out in our Terms of Service. Customers who did not ask for your messages are more likely to block or report you, which can limit your ability to send.',
        ],
      },
      {
        heading: 'Templates for messages you start',
        paragraphs: [
          'When your business starts the conversation, for example a campaign or a reminder, you send a template message: a pre-approved message format that can include your customer\'s name, order details, images, videos, documents and buttons. Templates are reviewed by WhatsApp before you can use them.',
        ],
      },
      {
        heading: 'The message categories',
        paragraphs: ['WhatsApp groups template messages by purpose, and the category affects how each message is charged:'],
        bullets: [
          'Marketing: offers, announcements, new products and win-back messages.',
          'Utility: updates about something the customer already did, like an order, booking or payment.',
          'Authentication: one-time passcodes for logins and verification.',
        ],
      },
      {
        heading: 'The 24-hour customer service window',
        paragraphs: [
          'When a customer messages you, a 24-hour customer service window opens, and it restarts each time they message again. Within that window you can reply freely, without a template. This is where an AI chatbot helps most: it answers replies to your campaign straight away, while the window is open and the customer is interested.',
        ],
      },
      {
        heading: 'How WhatsApp charges',
        paragraphs: [
          'Since 1 July 2025, Meta charges per delivered message instead of per conversation. Rates depend on the message category and the customer\'s country, and Meta updates its pricing rules, including which messages are free, from time to time. Your quote from Swarups NXT combines these message charges with the platform charges agreed with you.',
        ],
      },
      {
        heading: 'Tips for a good first campaign',
        paragraphs: [],
        bullets: [
          'Send only to customers who opted in, and make it easy for them to stop.',
          'Personalise the message and keep it short, with one clear button.',
          'Plan who answers the replies: an AI chatbot for common questions, your team for the rest.',
          'Watch delivered, read and replied reports, and improve the next campaign.',
          'Start with a smaller group of customers before sending to everyone.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I send bulk WhatsApp messages from the regular WhatsApp Business app?',
        answer: 'Campaigns at volume are sent through the WhatsApp Business Platform, which supports approved templates, personalisation and reports. We set this up for you.',
      },
      {
        question: 'What happens when customers reply to a campaign?',
        answer: 'The AI chatbot answers straight away, using what it knows about your products and services. When a person is needed, the conversation goes to your team, following the handover workflow agreed with you.',
      },
      {
        question: 'How is bulk WhatsApp and RCS messaging priced?',
        answer: "You pay for the messages you send, by message type (marketing, utility or authentication), plus the platform charges agreed in your quote. Tell us your monthly volume and we'll share a custom quote.",
      },
    ],
    relatedProductIds: ['bulk-whatsapp-rcs', 'ai-chatbots', 'omnichannel-bots'],
    sources: [
      { name: 'Meta: WhatsApp Business Platform pricing', url: 'https://developers.facebook.com/docs/whatsapp/pricing' },
      { name: 'WhatsApp Business Messaging Policy', url: 'https://business.whatsapp.com/policy' },
    ],
  },
];

export const guidePath = (slug: string) => `/guides/${slug}/`;
export const GUIDES_PATH = '/guides/';

// Breadcrumb name: the SEO title without the brand suffix.
export const guideShortTitle = (g: Guide) => g.seoTitle.replace(/ \| Swarups NXT$/, '');

// Finds the guide for a URL path such as "/guides/what-is-rcs-messaging/"; null if none.
export const findGuide = (path: string) => {
  const m = path.match(/^\/guides\/([^/]+)\/?$/);
  return m ? GUIDES.find((g) => g.slug === m[1]) ?? null : null;
};

export const isGuidesIndex = (path: string) => /^\/guides\/?$/.test(path);
