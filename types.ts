
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export type ProductGroup = 'reach' | 'respond' | 'together';

export interface Product {
  id: string;             // anchor on the home page and URL path of its product page
  icon: string;
  iconType: string;
  title: string;
  tag: string;
  group: ProductGroup;    // PRODUCT_GROUPS on the home page
  summary: string;        // one line, used on small product cards (ProductCard.tsx)
  outcome: string;        // short benefit headline on home page cards
  benefits: { icon: string; text: string }[]; // 3 icon benefits: home cards and product page hero
  desc: string;
  bestFor: string;
  details: string;
  ctaLabel: string;
  ctaText: string;
}

export interface ProductPage {
  productId: string;      // PRODUCTS[].id; also the URL path (/<productId>/)
  seoTitle: string;       // <title> and og:title, max 60 chars
  metaDescription: string; // max 155 chars
  h1: string;
  features: string[];
  industryIds: string[];  // INDUSTRIES[].id shown as examples
  howItWorks: { title: string; desc: string }[];
  relatedIds: string[];   // PRODUCTS[].id shown under "Works well with"
  faqs: { question: string; answer: string }[];
}

export interface IndustrySector {
  id: string;
  title: string;
  problem: string;
  solution: string;
  details: string;
  productIds: string[];    // best-fit PRODUCTS[].id, shown as recommended products
  image: string;
  imageAlt: string;
  // Industry page at /industries/<id>/
  seoTitle: string;        // max 60 chars
  metaDescription: string; // max 160 chars
  h1: string;
  useCases: { title: string; desc: string; productId: string }[];
  faqs: { question: string; answer: string }[];
  ctaText: string;         // prefilled WhatsApp message
}

// Explainer guide at /guides/<slug>/ (content/guides.ts).
export interface Guide {
  slug: string;
  seoTitle: string;        // max 60 chars
  metaDescription: string; // max 160 chars
  h1: string;
  summary: string;         // one line for the /guides/ list
  datePublished: string;   // YYYY-MM-DD
  dateModified: string;    // YYYY-MM-DD; update when the guide changes
  intro: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    embed?: 'channel-comparison';
  }[];
  faqs: { question: string; answer: string }[];
  relatedProductIds: string[];
  sources: { name: string; url: string }[]; // official references
}
