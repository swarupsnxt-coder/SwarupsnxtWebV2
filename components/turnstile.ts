// Browser-side Cloudflare Turnstile helpers, shared by the chat demo and the lead form.
// Only call these from event handlers or effects (they touch window/document).

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

// Public site key (safe in the frontend). Falls back to Cloudflare's always-pass test key in local dev only.
export const TURNSTILE_SITE_KEY: string =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? '1x00000000000000000000BB' : '');
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let turnstileScript: Promise<void> | null = null;
export const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileScript) {
    turnstileScript = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => { turnstileScript = null; reject(new Error('Turnstile failed to load')); };
      document.head.appendChild(s);
    });
  }
  return turnstileScript;
};

type WidgetRef = { current: string | null };

export const removeTurnstile = (widgetIdRef: WidgetRef) => {
  if (widgetIdRef.current) {
    window.turnstile?.remove(widgetIdRef.current);
    widgetIdRef.current = null;
  }
};

// Runs the Turnstile widget in `host` (usually invisible; shows a checkbox only if needed) and returns a token.
export const getTurnstileToken = async (host: HTMLElement | null, widgetIdRef: WidgetRef): Promise<string> => {
  await loadTurnstile();
  if (!window.turnstile || !host) throw new Error('Turnstile unavailable');
  removeTurnstile(widgetIdRef);

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Verification timed out')), 30000);
    widgetIdRef.current = window.turnstile!.render(host, {
      sitekey: TURNSTILE_SITE_KEY,
      appearance: 'interaction-only',
      size: 'flexible',
      callback: (token: string) => { clearTimeout(timer); resolve(token); },
      'error-callback': () => { clearTimeout(timer); reject(new Error('Verification failed')); },
      'expired-callback': () => { clearTimeout(timer); reject(new Error('Verification expired')); },
    });
  });
};
