// Build-time render (used by scripts/prerender.mjs) so search engines and link previews
// see the full page content without running JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { CONTACT, FAQS, PRODUCTS } from './constants';

const SITE = 'https://swarupsnxt.com/';
const ORG_ID = `${SITE}#organization`;

export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// schema.org structured data, generated from the same content the page shows.
export function jsonLd(): string {
  const graph = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Swarups NXT',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}logo-512.png`, width: 512, height: 512 },
      image: `${SITE}og-image.png`,
      description: 'AI integration partner that sets up, customises and supports AI voice agents, chatbots and automation for Indian businesses.',
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
      areaServed: { '@type': 'Country', name: 'India' },
      contactPoint: [{
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: CONTACT.phone,
        email: CONTACT.email,
        areaServed: 'IN',
      }],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}#website`,
      url: SITE,
      name: 'Swarups NXT',
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
    },
    ...PRODUCTS.map((p) => ({
      '@type': 'Service',
      name: p.title,
      serviceType: p.title,
      description: `${p.desc} ${p.details}`,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'India' },
      url: `${SITE}#products`,
    })),
    {
      '@type': 'FAQPage',
      '@id': `${SITE}#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  // Escape "<" so the JSON can't close the <script> tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
