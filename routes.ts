// Maps a URL path to the kind of page App renders. Every pre-rendered URL is listed by
// `routes` in entry-server.tsx; anything unknown renders the home page.
import { findProductPage } from './constants';
import { ProductPage } from './types';

export type Route =
  | { kind: 'home' }
  | { kind: 'product'; page: ProductPage };

export const resolveRoute = (path: string): Route => {
  const page = findProductPage(path);
  if (page) return { kind: 'product', page };
  return { kind: 'home' };
};
