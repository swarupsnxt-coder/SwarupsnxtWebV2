
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
  summary: string;        // one line, used on home page cards
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
  product: string;
  image: string;
  imageAlt: string;
}
