
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface Persona {
  id: string;
  name: string;
  voice: string;
  description: string;
  industry: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface IndustrySector {
  id: string;
  title: string;
  description: string;
  image: string;
  faqs: { question: string; answer: string }[];
}
