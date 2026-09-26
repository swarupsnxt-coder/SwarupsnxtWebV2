import React, { useEffect, useId, useRef } from 'react';
import { CONTACT, mailtoLink } from '../constants';

interface ModalProps {
  onClose: () => void;
}

// Always uses the dark palette so text stays readable in light mode too.
const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

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

const LAST_UPDATED = '26 September 2026';

// Plain-English policy text, checked for accuracy against how the website works (Sept 2026).
// Have a lawyer confirm it before relying on it in client contracts.
const Section: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <section>
    <div className="text-[#2BB6C6] font-black text-xs mb-2 tracking-widest uppercase">{n}</div>
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <div className="space-y-3">{children}</div>
  </section>
);

export const PrivacyModal: React.FC<ModalProps> = ({ onClose }) => (
  <Modal title="Privacy Policy" onClose={onClose}>
    <div className="space-y-6">
      <p className="text-xs text-slate-400">Last updated: {LAST_UPDATED}</p>

      <Section n="01" title="Who we are">
        <p>Swarups NXT is a sole proprietorship based in Chennai, Tamil Nadu, India. We are an integration partner: we set up, customise and support AI and communication platforms from third-party providers for businesses. This policy explains how we handle personal data when you visit swarupsnxt.com or contact us, under India's Digital Personal Data Protection Act, 2023.</p>
      </Section>

      <Section n="02" title="What we collect on this website">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-white">When you contact us</strong> by WhatsApp, phone or email: your name, phone number or email address, and whatever you choose to tell us. There is no contact form on this website.</li>
          <li><strong className="text-white">Website chat assistant</strong> (when available): the messages you type are sent to Cloudflare Workers AI to generate replies, and Cloudflare Turnstile checks that you are not a bot. Please do not share sensitive personal information in the chat.</li>
          <li><strong className="text-white">Technical data</strong>: like any website, our hosting provider (Cloudflare) and the services that deliver our fonts, icons and images (Google Fonts, cdnjs, Unsplash) receive your IP address and basic browser information when a page loads.</li>
          <li><strong className="text-white">Browser storage</strong>: we store only your light/dark theme choice in your browser's local storage. We do not use advertising or cross-site tracking cookies.</li>
        </ul>
      </Section>

      <Section n="03" title="How we use it">
        <p>We use your information to reply to you, arrange demos, provide and support the services you ask for, and keep the website secure and free from abuse. We do not sell your personal data.</p>
      </Section>

      <Section n="04" title="Data we handle for our clients">
        <p>When we set up an AI agent for a business, it may process personal data of that business's customers (for example, callers or chat users). How that data is used, where it is stored and who can access it depends on the use case, and is agreed with the client in writing before go-live. The client decides the purpose; we process the data on their behalf and only as agreed.</p>
      </Section>

      <Section n="05" title="Who we share it with">
        <p>Only with the service providers we need to run this website and deliver our services (such as Cloudflare, WhatsApp and our email provider), with the AI and communication platforms used for a client's project as agreed with that client, or when required by law.</p>
      </Section>

      <Section n="06" title="How long we keep it">
        <p>We keep enquiry information for as long as we need it to respond to you and to maintain our business records, and delete it when it is no longer needed, unless the law requires us to keep it longer.</p>
      </Section>

      <Section n="07" title="Your rights">
        <p>You can ask us what personal data we hold about you, ask us to correct, complete, update or erase it, or withdraw any consent you have given. You can also nominate someone to exercise these rights on your behalf. To do any of this, email us (see below). If you are not satisfied with our response, you may complain to the Data Protection Board of India.</p>
      </Section>

      <Section n="08" title="Children">
        <p>This website and our services are meant for businesses and are not directed at children.</p>
      </Section>

      <Section n="09" title="Changes to this policy">
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
      </Section>

      <Section n="10" title="Contact and grievances">
        <p>For privacy questions, requests or complaints, contact us at:</p>
        <div className="flex items-center gap-3 text-[#2BB6C6] font-bold">
          <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          <a href={mailtoLink('Privacy request')} className="hover:underline">{CONTACT.email}</a>
        </div>
        <p>Swarups NXT, Chennai, Tamil Nadu, India</p>
      </Section>
    </div>
  </Modal>
);

export const SecurityModal: React.FC<ModalProps> = ({ onClose }) => (
  <Modal title="Terms of Service" onClose={onClose}>
    <div className="space-y-6">
      <p className="text-xs text-slate-400">Last updated: {LAST_UPDATED}</p>

      <Section n="01" title="About these terms">
        <p>These terms apply to your use of swarupsnxt.com and to the services Swarups NXT provides. If you sign a separate written agreement with us, that agreement takes priority wherever it differs from these terms.</p>
      </Section>

      <Section n="02" title="Our role">
        <p>Swarups NXT is an independent integration partner. We set up, customise and support AI and communication platforms developed by third-party providers ("Platform Providers"). Your use of those platforms may also be subject to the Platform Providers' own terms.</p>
      </Section>

      <Section n="03" title="Website information">
        <p>Content on this website is general information about our services. It is not an offer or a quote. The scope, timelines and pricing of any project are agreed with you in writing.</p>
      </Section>

      <Section n="04" title="AI responses">
        <p>AI systems can sometimes produce inaccurate or unexpected responses. We design, train and test each AI agent carefully, but Swarups NXT is not responsible for the factual accuracy or quality of individual responses generated by third-party AI models. You remain responsible for decisions you make based on them.</p>
      </Section>

      <Section n="05" title="Limitation of liability">
        <p>To the maximum extent permitted by Indian law, the total liability of Swarups NXT for all claims arising out of or related to these terms or our services, whether in contract, tort or otherwise, shall not exceed the amount you actually paid to Swarups NXT in the three (3) months immediately before the event giving rise to the claim.</p>
      </Section>

      <Section n="06" title="Support hours">
        <p>We provide technical support during:</p>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 inline-block">
          <p className="text-white font-mono font-bold">10:00 AM — 06:00 PM IST</p>
          <p className="text-xs">Monday to Friday (excluding public holidays)</p>
        </div>
      </Section>

      <Section n="07" title="Availability">
        <p>The underlying infrastructure is operated by the Platform Providers, so Swarups NXT does not guarantee uninterrupted availability of any platform or of this website.</p>
      </Section>

      <Section n="08" title="Governing law">
        <p>These terms are governed by the laws of India. Any dispute arising out of or in connection with them is subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.</p>
      </Section>

      <Section n="09" title="Contact">
        <p>Questions about these terms: <a href={mailtoLink('Terms of Service')} className="text-[#2BB6C6] font-bold hover:underline">{CONTACT.email}</a></p>
      </Section>
    </div>
  </Modal>
);
