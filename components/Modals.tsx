import React, { useEffect, useId, useRef } from 'react';
import { CONTACT, telLink, whatsappLink, WHATSAPP_DEMO_TEXT } from '../constants';
import LeadForm from './LeadForm';

interface ModalProps {
  onClose: () => void;
}

// Open modals, newest last, so Escape closes only the top one (e.g. Privacy opened from the demo form).
const openModals: string[] = [];

// Always uses the dark palette so text stays readable in light mode too.
const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    openModals.push(titleId);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openModals[openModals.length - 1] === titleId) onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      openModals.splice(openModals.indexOf(titleId), 1);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose, titleId]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-md" onClick={onClose} aria-hidden="true"></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[30px] border border-white/10 bg-[#0f172a] shadow-2xl relative z-10 flex flex-col"
      >
        <div className="p-6 sm:p-8 border-b border-white/5 flex justify-between items-center gap-4 sticky top-0 bg-[#0f172a] z-20">
          <h2 id={titleId} className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-white">{title}</h2>
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-2xl" aria-hidden="true"></i>
          </button>
        </div>
        <div className="p-6 sm:p-8 text-slate-300 text-sm leading-relaxed space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// "Book a demo" popup. The `dark` wrapper makes the form use its dark styles on the dark modal.
export const LeadFormModal: React.FC<ModalProps & { onPrivacyClick: () => void }> = ({ onClose, onPrivacyClick }) => (
  <Modal title="Book a demo" onClose={onClose}>
    <div className="dark space-y-6">
      <p className="text-slate-300">
        Share a few details and we'll get back to you to arrange a short demo built around your business.
        Prefer to talk now?{' '}
        <a href={whatsappLink(WHATSAPP_DEMO_TEXT)} target="_blank" rel="noopener noreferrer" className="font-bold text-[#2BB6C6] hover:underline">WhatsApp</a>
        {' '}or{' '}
        <a href={telLink} className="font-bold text-[#2BB6C6] hover:underline">call {CONTACT.phoneDisplay}</a>.
      </p>
      <LeadForm onPrivacyClick={onPrivacyClick} />
    </div>
  </Modal>
);

const LAST_UPDATED = '2 November 2026';

// Plain-English policy text, checked for accuracy against how the website works (Oct 2026).
// Have a lawyer confirm it before relying on it in client contracts.
const Section: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <section>
    <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">{n}</div>
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <div className="space-y-3">{children}</div>
  </section>
);

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => <strong className="text-white">{children}</strong>;

const MailLink: React.FC<{ email: string; subject: string }> = ({ email, subject }) => (
  <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`} className="text-[#2BB6C6] font-bold hover:underline">{email}</a>
);

// Sections are numbered automatically (01, 02, ...) so they stay in order when edited.
const LegalDocument: React.FC<{ title: string; sections: [string, React.ReactNode][]; onClose: () => void }> = ({ title, sections, onClose }) => (
  <Modal title={title} onClose={onClose}>
    <div className="space-y-6">
      <p className="text-xs text-slate-400">Last updated: {LAST_UPDATED}</p>
      {sections.map(([heading, body], i) => (
        <Section key={heading} n={String(i + 1).padStart(2, '0')} title={heading}>{body}</Section>
      ))}
    </div>
  </Modal>
);

const PRIVACY_SECTIONS: [string, React.ReactNode][] = [
  ['Who we are', <>
    <p>Swarups NXT is a sole proprietorship based in Chennai, Tamil Nadu, India. We are an integration partner and reseller: we set up, customise, support and resell AI and communication platforms from third-party providers for businesses, sometimes under our own brand or our client's brand. This policy explains how we handle personal data when you visit swarupsnxt.com or contact us, under India's Digital Personal Data Protection Act, 2023.</p>
  </>],
  ['What we collect on this website', <>
    <ul className="list-disc pl-5 space-y-2">
      <li><Strong>Enquiry form</Strong>: your name and phone number, and, if you choose to give them, your email address, company, the product you are interested in and your message. You tick a box to agree that we may contact you about your enquiry. Cloudflare Turnstile checks that the form is sent by a person, not a bot. Your entries are stored in our Zoho CRM account (Zoho Corporation), which is hosted in Zoho's India data centre.</li>
      <li><Strong>When you contact us directly</Strong> by WhatsApp, phone or email: your name, phone number or email address, and whatever you choose to tell us.</li>
      <li><Strong>Website chat assistant</Strong> (when available): the messages you type are sent to Cloudflare Workers AI to generate replies, and Cloudflare Turnstile checks that you are not a bot. Please do not share sensitive personal information in the chat.</li>
      <li><Strong>Technical data</Strong>: like any website, our hosting provider (Cloudflare) and the services that deliver our fonts, icons and images (Google Fonts, cdnjs, Unsplash) receive your IP address and basic browser information when a page loads.</li>
      <li><Strong>Browser storage</Strong>: we store only your light/dark theme choice in your browser's local storage. We do not use advertising or cross-site tracking cookies.</li>
    </ul>
  </>],
  ['How we use it', <>
    <p>We use your information to reply to your enquiry, arrange demos, prepare proposals, provide and support the services you ask for, and keep the website secure and free from abuse. We contact you only about your enquiry and the services you ask about, and we will not add you to marketing campaigns unless you separately agree. We do not sell your personal data.</p>
  </>],
  ['Data we handle for our clients', <>
    <p>When we set up an AI agent, voice blast, WhatsApp campaign or other communication service for a business, it may process personal data of that business's customers (for example, callers, chat users or campaign recipients). The client decides why and how that data is used and is responsible for having a lawful basis, such as consent, to contact those people. We, and the platform providers we use, process the data on the client's behalf and only as agreed with the client in writing before go-live. If you received a call or message sent for one of our clients, please contact that business first; we will help them respond to your request.</p>
  </>],
  ['Who we share it with', <>
    <p>Only with the service providers we need to run this website and deliver our services (such as Cloudflare, Zoho, WhatsApp and our email provider), with the AI and communication platforms used for a client's project as agreed with that client, or when required by law. Some of these providers may process data outside India.</p>
  </>],
  ['How long we keep it', <>
    <p>We keep enquiry information, including form entries in our CRM, for as long as we need it to respond to you, follow up on your enquiry and maintain our business records. We delete it when it is no longer needed, or sooner if you ask, unless the law requires us to keep it longer.</p>
  </>],
  ['Your rights', <>
    <p>You can ask us what personal data we hold about you, ask us to correct, complete, update or erase it, or withdraw any consent you have given (for example, to stop us contacting you). Withdrawing consent does not affect anything we did before. You can also nominate someone to exercise these rights on your behalf. To do any of this, email our grievance contact (see below). If you are not satisfied with our response, you may complain to the Data Protection Board of India.</p>
  </>],
  ['Children', <>
    <p>This website and our services are meant for businesses and are not directed at children.</p>
  </>],
  ['Changes to this policy', <>
    <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
  </>],
  ['Contact and grievances', <>
    <p>For privacy requests, complaints or grievances, write to:</p>
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-envelope text-[#2BB6C6]" aria-hidden="true"></i>
      <MailLink email={CONTACT.grievanceEmail} subject="Privacy request" />
    </div>
    <p>For general questions: <MailLink email={CONTACT.email} subject="Privacy question" /></p>
    <p>Swarups NXT, Chennai, Tamil Nadu, India</p>
  </>],
];

const TERMS_SECTIONS: [string, React.ReactNode][] = [
  ['About these terms', <>
    <p>These terms apply to your use of swarupsnxt.com and to the services Swarups NXT provides. If you sign a separate written agreement, proposal or order with us, that document takes priority wherever it differs from these terms. "You" or "the client" means the business using our services.</p>
  </>],
  ['Our role', <>
    <p>Swarups NXT is an independent integration partner and reseller. We set up, customise, support and resell AI and communication platforms developed by third-party providers ("Platform Providers"). We are not the Platform Provider, and these terms do not make us an agent of any Platform Provider.</p>
  </>],
  ['White-label and third-party platforms', <>
    <p>Services may be delivered under the Swarups NXT brand or under your brand ("white-label"), while running on Platform Providers' infrastructure. Your use of those platforms is also subject to the Platform Providers' own terms and policies, which we will point you to where relevant. Platform Providers may change, limit, suspend or discontinue features, channels or their charges. If that happens, we will tell you as soon as we reasonably can and work with you on an alternative, but we are not responsible for their decisions.</p>
  </>],
  ['Website information', <>
    <p>Content on this website is general information about our services. It is not an offer or a quote. The scope, timelines and fees of any project are agreed with you in writing.</p>
  </>],
  ['Your responsibilities and acceptable use', <>
    <p>For any calls, messages, campaigns or chats sent or handled through our services, you are responsible for:</p>
    <ul className="list-disc pl-5 space-y-2">
      <li>having the consent or other lawful basis needed to contact each recipient, and keeping a record of it;</li>
      <li>honouring opt-out, unsubscribe and do-not-disturb preferences promptly;</li>
      <li>the accuracy and lawfulness of your content, contact lists, sender names, numbers, templates and offers;</li>
      <li>following the laws, regulations and channel rules that apply to your business and your communications.</li>
    </ul>
    <p>You must not use our services for spam, fraud, phishing, harassment, impersonation, misleading claims, or any unlawful or harmful content. We, or a Platform Provider, may pause or stop a campaign, number or account that appears to break these rules or the Platform Provider's policies, with notice where reasonably possible.</p>
  </>],
  ['SMS and TRAI DLT registration', <>
    <p>Commercial SMS in India must be sent through the DLT (Distributed Ledger Technology) system set up under TRAI rules. You are responsible for registering your business as the principal entity, and for obtaining and keeping current approval of your sender IDs (headers), message templates and consent records on DLT. We can help you prepare these registrations, but they remain in your name and under your control. Messages that do not match an approved header and template may be blocked by telecom operators, and we are not responsible for messages blocked for this reason.</p>
  </>],
  ['WhatsApp opt-in and Meta policies', <>
    <p>You may send WhatsApp messages only to people who have opted in to receive messages from your business on WhatsApp, and you are responsible for collecting and recording that opt-in. You must follow Meta's WhatsApp Business policies, including its rules on message templates, message categories and opt-outs. Meta may limit, pause or block a number, template or account that breaks its policies or receives poor feedback from recipients; we are not responsible for such actions by Meta.</p>
  </>],
  ['Fees, usage charges and payment', <>
    <p>Fees are set out in your written quote, proposal or invoice, plus applicable taxes. Usage-based charges from Platform Providers (for example, call minutes, messaging or conversation fees, phone numbers or credits) may be billed to you as agreed in writing. Invoices are payable within the time stated on them. We may suspend services if payment is overdue, after giving you notice.</p>
  </>],
  ['Cancellation and refunds', <>
    <p>You can cancel an ongoing service as set out in your agreement. Unless agreed otherwise in writing, fees for setup and customisation work already done, and usage, credits or third-party charges already consumed or committed, are non-refundable. Any refund of unused prepaid amounts follows your written agreement.</p>
  </>],
  ['Intellectual property', <>
    <p>You keep ownership of your data, content, brand and customer lists, and allow us to use them only to provide the services. The platforms remain the property of their Platform Providers. You may use the configurations, conversation flows, prompts, scripts and workflows we create for you for your business while our engagement continues, or as agreed in writing. Our general know-how and reusable templates remain ours.</p>
  </>],
  ['Confidentiality', <>
    <p>Each of us will keep the other's non-public business information confidential, use it only for the engagement, and share it only with people and providers who need it for that purpose, unless the law requires disclosure.</p>
  </>],
  ['AI responses', <>
    <p>AI systems can sometimes produce inaccurate or unexpected responses. We design, train and test each AI agent carefully, but Swarups NXT is not responsible for the factual accuracy or quality of individual responses generated by third-party AI models. You remain responsible for decisions you make based on them, and for reviewing the information your AI agent is trained on.</p>
  </>],
  ['No warranties', <>
    <p>Except as agreed in writing, our services and this website are provided "as is". To the extent the law allows, we do not give implied warranties such as fitness for a particular purpose or uninterrupted operation.</p>
  </>],
  ['Indemnity', <>
    <p>You agree to compensate Swarups NXT for losses, penalties and reasonable costs arising from third-party claims caused by your content, your contact lists, your failure to meet the responsibilities above, or your misuse of the services.</p>
  </>],
  ['Limitation of liability', <>
    <p>To the maximum extent permitted by Indian law, the total liability of Swarups NXT for all claims arising out of or related to these terms or our services, whether in contract, tort or otherwise, shall not exceed the amount you actually paid to Swarups NXT in the three (3) months immediately before the event giving rise to the claim. We are not liable for indirect or consequential losses, such as lost profits or lost data.</p>
  </>],
  ['Availability and support hours', <>
    <p>The underlying infrastructure is operated by the Platform Providers, so Swarups NXT does not guarantee uninterrupted availability of any platform or of this website. We provide technical support during:</p>
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 inline-block">
      <p className="text-white font-mono font-bold">{CONTACT.supportHours.time}</p>
      <p className="text-xs">{CONTACT.supportHours.days}</p>
    </div>
  </>],
  ['Term and termination', <>
    <p>Each engagement runs for the period in your agreement. Either party may end it as the agreement allows, or straight away if the other seriously breaches these terms and does not fix the breach within a reasonable time after notice. When an engagement ends, you pay for services provided up to that date, and we help you export your data where the platform allows, then delete or return it as agreed.</p>
  </>],
  ['Events beyond our control', <>
    <p>Neither party is responsible for delays or failures caused by events beyond its reasonable control, such as network or telecom outages, Platform Provider outages or policy changes, government action, natural disasters or power failures.</p>
  </>],
  ['Governing law', <>
    <p>These terms are governed by the laws of India. Any dispute arising out of or in connection with them is subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.</p>
  </>],
  ['Contact', <>
    <p>Questions about these terms: <MailLink email={CONTACT.email} subject="Terms of Service" /></p>
  </>],
];

export const PrivacyModal: React.FC<ModalProps> = ({ onClose }) => (
  <LegalDocument title="Privacy Policy" sections={PRIVACY_SECTIONS} onClose={onClose} />
);

export const TermsModal: React.FC<ModalProps> = ({ onClose }) => (
  <LegalDocument title="Terms of Service" sections={TERMS_SECTIONS} onClose={onClose} />
);
