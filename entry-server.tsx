// Build-time render (used by scripts/prerender.mjs) so search engines and link previews
// see the full page content without running JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { CONTACT, FAQS, INDUSTRIES, PRODUCTS, PRODUCT_PAGES, industryPagePath, productPagePath } from './constants';
import { resolveRoute } from './routes';

export const SITE = 'https://swarupsnxt.com/';
const ORG_ID = `${SITE}#organization`;
const pageUrl = (productId: string) => `${SITE}${productPagePath(productId).slice(1)}`;
const industryUrl = (id: string) => `${SITE}${industryPagePath(id).slice(1)}`;

// Every pre-rendered route. Home keeps the title/description written in index.html (meta: null).
export const routes = [
  { path: '/', meta: null },
  ...PRODUCT_PAGES.map((p) => ({
    path: productPagePath(p.productId),
    meta: { title: p.seoTitle, description: p.metaDescription, url: pageUrl(p.productId) },
  })),
  ...INDUSTRIES.map((i) => ({
    path: industryPagePath(i.id),
    meta: { title: i.seoTitle, description: i.metaDescription, url: industryUrl(i.id) },
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
  '@id': `${pageUrl(p.id)}#service`,
  name: p.title,
  serviceType: p.title,
  description: `${p.desc} ${p.details}`,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'India' },
  url: pageUrl(p.id),
});

const breadcrumbs = (items: { name: string; item: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
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
  const route = resolveRoute(path);
  let graph: object[];

  if (route.kind === 'industry') {
    const { industry } = route;
    const url = industryUrl(industry.id);
    graph = [
      organization,
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: industry.seoTitle,
        description: industry.metaDescription,
        inLanguage: 'en-IN',
        about: industry.productIds.map((id) => ({ '@id': `${pageUrl(id)}#service` })),
        publisher: { '@id': ORG_ID },
      },
      breadcrumbs([
        { name: 'Home', item: SITE },
        { name: 'Industries', item: `${SITE}#solutions` },
        { name: industry.title, item: url },
      ]),
      faqPage(`${url}#faq`, industry.faqs),
    ];
  } else if (route.kind === 'home') {
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
    const page = route.page;
    const product = PRODUCTS.find((p) => p.id === page.productId)!;
    const url = pageUrl(page.productId);
    graph = [
      organization,
      service(product),
      breadcrumbs([
        { name: 'Home', item: SITE },
        { name: 'Products', item: `${SITE}#products` },
        { name: product.title, item: url },
      ]),
      faqPage(`${url}#faq`, page.faqs),
    ];
  }

  // Escape "<" so the JSON can't close the <script> tag early.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
