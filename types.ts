
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface ProductPage {
  productId: string;      // PRODUCTS[].id; also the URL path (/<productId>/)
  seoTitle: string;       // <title> and og:title, max 60 chars
  metaDescription: string; // max 155 chars
  h1: string;
  features: string[];
  industryIds: string[];  // INDUSTRIES[].id shown as examples
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
