// Maps a URL path to the kind of page App renders. Every pre-rendered URL is listed by
// `routes` in entry-server.tsx; anything unknown renders the home page.
import { findIndustryPage, findProductPage } from './constants';
import { IndustrySector, ProductPage } from './types';

export type Route =
  | { kind: 'home' }
  | { kind: 'product'; page: ProductPage }
  | { kind: 'industry'; industry: IndustrySector };

export const resolveRoute = (path: string): Route => {
  const page = findProductPage(path);
  if (page) return { kind: 'product', page };
  const industry = findIndustryPage(path);
  if (industry) return { kind: 'industry', industry };
  return { kind: 'home' };
};
