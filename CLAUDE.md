# Project: Swarups NXT marketing website (swarupsnxt.com)

## What this is
Marketing site for Swarups NXT, an AI solutions company (AI voice agents, AI chatbots, AI contact
center solution (CCaaS), omnichannel bots, social media bots, WhatsApp campaigns, voice blast,
SaaS automation) selling to businesses of any industry, pan-India.
Originally generated with Google Gemini / AI Studio. Hosted on Cloudflare Pages, auto-deployed
from GitHub (main = production; other branches = preview deployments).

Phase-by-phase upgrade prompts live in `docs/PROMPTS.md`. Paste them one at a time; they are not
standing instructions.

## Project facts
- Business WhatsApp: 917550007208
- Business email: hello@swarupsnxt.com
- Business phone for calls: +91 7550007208
- Book a demo: links to the on-page Contact section (`#contact`), which offers WhatsApp, Call
  and Email. There is NO contact form and no external booking tool; do not add either
  without asking.
- Languages (chatbot and voice demo): English (Indian) + all major Indian languages:
  Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia.
- Canonical domain: https://swarupsnxt.com (non-www)

## Tech stack
- React 19 + TypeScript, built with Vite 6 (output: `dist/`)
- Tailwind CSS via the Play CDN script in `index.html` (theme config and custom keyframes are
  inline there; there is no `tailwind.config.js`). Font Awesome and Google Fonts (Inter,
  Suez One) are loaded from CDNs in `index.html`.
- Cloudflare Pages Functions in `functions/api/` (`chat.ts`: website assistant on Workers AI via
  the `AI` binding, protected by Turnstile). Shared server code in `lib/` (`llm.ts`,
  `knowledge.ts`, `session.ts`). Setup steps: `SETUP-AI.md`.
- GitHub repo: swarupsnxt-coder/SwarupsnxtWebV2 (connected to Cloudflare Pages)

## Key files
- `App.tsx`: page composition, modal/theme state
- `components/`: one file per section or widget (Navbar, Hero, Products, Industries, WhyUs,
  HowItWorks, FAQ, Contact, ChatWidget, PhoneDemo, VoiceStudio, NxtLab, Modals, ...)
- `constants.tsx`: contact details, products, industries, FAQ — used by the page AND the
  chatbot's knowledge (`lib/knowledge.ts`), so edit content there; `types.ts`: shared types
- `components/Contact.tsx`: `#contact` section (WhatsApp / Call / Email, no form)
- `index.html`: meta/OG tags, Tailwind CDN config, global styles

## Commands
```bash
npm install
npm run dev      # local dev server
npm run build    # production build (must pass before finishing any task)
```
Pages Functions can be tested locally with `npx wrangler pages dev`.

## Coding conventions
- Small, reusable components in `components/`; new sections composed in `App.tsx`.
- Tailwind utility classes for styling; keep animations lightweight and consistent.
- Preserve the existing dark mode / theme behaviour.
- Keep changes focused; no unrelated modernisation.

## HARD RULES (never break these)
1. NEVER invent testimonials, client names, client logos, case studies, statistics, awards,
   certifications, partner badges, user counts, or percentages. The company has no published
   clients yet. If a section needs proof and none exists, use a different section type
   (how it works, use cases, FAQ, demo) instead. If existing code already contains fabricated
   proof (e.g. "500+ clients", fake testimonials, "98% accuracy"), flag it in your report.
2. NEVER show pricing, price ranges, or "starting at" figures anywhere.
3. NEVER add regulatory/compliance claims (TRAI, DLT, Meta policy, GDPR, ISO, etc.).
4. DO NOT change brand colours, logo, brand fonts, company name, or founder/company details.
   You may fix typos in them only after asking.
5. NEVER put API keys, secrets, or tokens in frontend code, in `VITE_*`/`NEXT_PUBLIC_*`/
   `REACT_APP_*` env vars, in a Vite `define`, or in any committed file. Secrets live only in
   Cloudflare Pages environment variables / bindings, or in a local `.env` that is gitignored.
6. The site must never show a broken state. Every AI feature must have a graceful fallback
   that shows the contact options (WhatsApp, email, call, book a demo).
7. Every primary CTA leads to one of: Book a demo (→ `#contact`), WhatsApp chat, Call, Email.
8. `npm run build` must pass before you finish any task.
9. Make small, focused commits with clear messages. Do not commit to `main`; work on a branch
   (e.g. `site-upgrade`).
10. When uncertain about a business fact, ASK. Do not guess and do not fill with lorem ipsum.
11. Before using any third-party API, model name, or library version, check its current
    official docs. Model IDs and free-tier limits change; do not rely on memory.
12. Do NOT use Google Gemini, `@google/genai`, or AI Studio anywhere (frontend, functions,
    or scripts).
