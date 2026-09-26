
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
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
