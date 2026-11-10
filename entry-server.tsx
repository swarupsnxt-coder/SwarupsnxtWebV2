// Build-time render (used by scripts/prerender.mjs) so search engines and link previews
// see the full page content without running JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { CONTACT, FAQS, PRODUCTS, PRODUCT_PAGES, findProductPage, productPagePath } from './constants';

const SITE = 'https://swarupsnxt.com/';
const ORG_ID = `${SITE}#organization`;
const pageUrl = (productId: string) => `${SITE}${productPagePath(productId).slice(1)}`;

// Every pre-rendered route. Home keeps the title/description written in index.html (meta: null).
export const routes = [
  { path: '/', meta: null },
  ...PRODUCT_PAGES.map((p) => ({
    path: productPagePath(p.productId),
    meta: { title: p.seoTitle, description: p.metaDescription, url: pageUrl(p.productId) },
  })),
];

export function render(path: string): string {
  return renderToString(
    <React.StrictMode>
      <App path={path} />
    </React.StrictMode>
  );
}

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Swarups NXT',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}logo-512.png`, width: 512, height: 512 },
  image: `${SITE}og-image-v3.png`,
  description: 'Integration partner that sets up, customises and supports bulk WhatsApp and RCS, enterprise SMS and OTP, AI voice agents, chatbots and automation for Indian businesses.',
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
};

const service = (p: typeof PRODUCTS[number]) => ({
  '@type': 'Service',
  name: p.title,
  serviceType: p.title,
  description: `${p.desc} ${p.details}`,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'India' },
  url: findProductPage(p.id) ? pageUrl(p.id) : `${SITE}#products`,
});

const faqPage = (id: string, faqs: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

// schema.org structured data for a route, generated from the same content the page shows.
export function jsonLd(path: string): string {
  const page = findProductPage(path);
  let graph: object[];

  if (!page) {
    graph = [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${SITE}#website`,
        url: SITE,
        name: 'Swarups NXT',
        inLanguage: 'en-IN',
        publisher: { '@id': ORG_ID },
      },
      ...PRODUCTS.map(service),
      faqPage(`${SITE}#faq`, FAQS),
    ];
  } else {
    const product = PRODUCTS.find((p) => p.id === page.productId)!;
    const url = pageUrl(page.productId);
    graph = [
      organization,
      service(product),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE}#products` },
          { '@type': 'ListItem', position: 3, name: product.title, item: url },
        ],
      },
      faqPage(`${url}#faq`, page.faqs),
    ];
  }

  // Escape "<" so the JSON can't close the <script> tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
