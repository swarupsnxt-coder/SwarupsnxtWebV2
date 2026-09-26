# Swarups NXT website — Audit (Phase A1)

Audited: branch `site-upgrade` (= V2 `main` @ 1bc9e83 + docs), repo swarupsnxt-coder/SwarupsnxtWebV2.
Date: 2026-09-26. No code was changed for this audit.

Checks run: read every source file; `npm run build` (passes, 1.2 s); `npx tsc --noEmit` (no errors);
scanned the local and **live** (swarupsnxt.com) JS bundles; probed live `/api/*` endpoints and the OG image URL.

---

## 1. Stack map

| Item | Finding |
|---|---|
| Framework | React 19.2 + TypeScript 5.8 |
| Build tool | Vite 6 (`npm run build` → `dist/`) |
| Router | **None.** Single page; navigation is in-page anchors (`#products`, `#contact`, …) with `scrollIntoView`. No hash routes. |
| Styling | **Tailwind Play CDN** (`<script src="https://cdn.tailwindcss.com">`) with inline `tailwind.config` in `index.html`; global CSS in an inline `<style>` in `index.html`; extra inline `<style>` blocks in `Integrations.tsx`, `ChatWidget.tsx`. No PostCSS/Tailwind build. |
| Icons / fonts | Font Awesome 6.4.0 (full CSS, cdnjs); Google Fonts Inter + Suez One |
| Hosting | Cloudflare Pages; Pages Functions in `functions/api/` (`chat.ts`, `speech.ts`) |
| Output | `dist/index.html` 6.3 kB, `dist/assets/index-*.js` **374 kB (114 kB gzip)** — includes the Gemini SDK |

**Page sections (in render order, `App.tsx`):**

| # | Section | File | Anchor id |
|---|---|---|---|
| – | Navbar | `components/Navbar.tsx` (+ `Logo.tsx`) | – |
| 1 | Hero | `components/Hero.tsx` | `hero` |
| 2 | Integrations marquee | `components/Integrations.tsx` (data: `constants.tsx` `INTEGRATIONS`) | – |
| 3 | NXT Lab (voice + chat demos) | `components/NxtLab.tsx` → `VoiceStudio.tsx`, `PhoneDemo.tsx` | `nxt-lab`, `voice-studio`, `phone-demo` |
| 4 | Products | `components/Products.tsx` (data inline) | `products` |
| 5 | How it works | `components/HowItWorks.tsx` | `how-it-works` |
| 6 | Legacy vs NXT table | `components/ComparisonTable.tsx` | – |
| 7 | Why us | `components/WhyUs.tsx` | `why-us` |
| 8 | Industries | `components/Industries.tsx` (data: `constants.tsx` `INDUSTRIES`) | `solutions` |
| 9 | FAQ | `components/FAQ.tsx` (data: `constants.tsx` `FAQS`) | `faq` |
| 10 | Contact | `components/Contact.tsx` | `contact` |
| – | Footer | `components/Footer.tsx` | – |
| – | Floating "Launch Live Demo" button | `components/ChatWidget.tsx` | – |
| – | Privacy / Security modals | `components/Modals.tsx` | – |

**Unused files/code:** `components/GuidedTour.tsx`, `components/ROICalculator.tsx` (never imported);
`constants.tsx` `COLORS`, `PERSONAS` and `types.ts` `Persona` (unused); `metadata.json` (AI Studio artifact);
the `<script type="importmap">` and `window.process` shim in `index.html` (Vite bundles everything; not used in production).

---

## 2. How the chatbot and voice demo work today

**Chat (`PhoneDemo.tsx`)** → `POST /api/chat {message}` → `functions/api/chat.ts` → copies `env.API_KEY` into a
fake `process.env` → `services/geminiService.ts` `chatWithAgent()` → Gemini model `gemini-3-flash-preview`.
Only the single latest message is sent (no history). The system prompt contains fabricated stats
("80% missed calls", "40% revenue boost") and a "1-week MVP" promise.

**Voice (`VoiceStudio.tsx`)** → `POST /api/speech {text, voiceName}` → `functions/api/speech.ts` →
`generateSpeech()` → `gemini-2.5-flash-preview-tts` → base64 raw PCM → decoded in the browser with
`decodeBase64`/`decodeAudioData` imported from `services/geminiService.ts`.

**Key handling / exposure:**
- Runtime key is `env.API_KEY` (Cloudflare Pages variable), used server-side — good in principle.
- But `vite.config.ts` also `define`s `process.env.API_KEY` and `process.env.GEMINI_API_KEY` from
  `GEMINI_API_KEY` at **build time**, and because `VoiceStudio.tsx` imports helpers from
  `geminiService.ts`, the **whole `@google/genai` SDK and that code path are bundled into the browser JS**.
  If `GEMINI_API_KEY` is ever set in the Cloudflare build environment, the key gets embedded in public JS.
- Live bundle check (`/assets/index-DMG7P66G.js`): **no key found**, but the Gemini SDK **is** shipped.

**Live status (probed 2026-09-26): BOTH DEMOS ARE BROKEN.**
- `POST https://swarupsnxt.com/api/chat` → **500**, body contains Google's raw error
  `"API key not valid. Please pass a valid API key."` (raw upstream error leaked to the browser).
- `POST /api/speech` → **500**.
- Visitors see the phone demo reply: *"Signal interrupted. Please ensure your API Key is set in Cloudflare
  Settings."* and the voice demo logs `ERROR: VOCAL ENGINE CONNECTION FAILED`.

**All Gemini-related code / deps to remove (rule 12):** `package.json` `@google/genai`; `services/geminiService.ts`;
`functions/api/chat.ts`, `functions/api/speech.ts`; `vite.config.ts` `define` block; `index.html` import map entry +
`window.process` shim; `/api/*` calls in `PhoneDemo.tsx`, `VoiceStudio.tsx`; Gemini voice names (`Kore`, `Fenrir`,
`Puck`, `Charon`, `Zephyr`) in `VoiceStudio.tsx` and `constants.tsx`; "Gemini 3" copy in `Hero.tsx`,
`ComparisonTable.tsx`, `constants.tsx` (Education FAQ); "Google GenAI" in `Modals.tsx`; `README.md` AI Studio text;
`metadata.json`.

---

## 3. Broken or risky things

**Bugs**
- **Hero animation leak (performance, all visitors).** `Hero.tsx` `NeuralCanvas` effect depends on `scrollOffset`,
  so every scroll event re-runs it and starts a **new `requestAnimationFrame` loop without cancelling the old one**.
  Loops pile up while scrolling (each doing an O(n²) particle pass) → rising CPU, jank, battery drain, especially on phones.
- `NxtLab.tsx` `LabCanvas`: animation loop is never cancelled (minor; doubles in dev StrictMode).
- **Missing colour classes.** Code uses `accent-400`/`accent-500` (`VoiceStudio.tsx`, `NxtLab.tsx`) but the
  Tailwind config only defines a flat `accent` colour, so these classes generate nothing: the Voice Studio header
  icon tile, active persona icon, play-button border, status text and NXT Lab HUD dots render without their colour.
- `VoiceStudio.tsx` uses icon `fa-brain-circuit`, which is not in Font Awesome 6.4 Free → blank icon.
- `ChatWidget.tsx` defines a global `.animate-fadeIn` that overrides the Tailwind one site-wide after 1.5 s.

**Fails silently / broken state (rule 6)**
- Chat and voice demos (see §2): errors shown as technical messages that mention API keys.
- `PhoneDemo.tsx` uses `alert()` for mic errors.
- Floating "Launch Live Demo" button (`ChatWidget.tsx`) sends visitors to the broken demo.

**Broken links / assets**
- **OG / Twitter image** `https://swarupsnxt.com/assets/Dark%20version.png` returns **HTML (the site fallback), not an
  image** → WhatsApp/LinkedIn previews show no picture. The file is not in the repo.
- Footer links to `#` (go nowhere): API Docs, Benchmarks, Case Studies, Careers, Ethics Board.
- Product cards show a "→" arrow but are not clickable.
- External texture image from `transparenttextures.com` (`NxtLab.tsx`); all product/industry photos hot-linked from Unsplash.

**Security / secrets**
- No secrets committed. `.env.local` is gitignored (`*.local`); `.env` now also ignored.
- `vite.config.ts` build-time key injection + client-bundled SDK (see §2) — must go.
- `/api/chat` and `/api/speech` return raw `err.message` (leaks upstream error JSON).
- Old `functions/api/contact.ts` stub is **still live on production** (`POST /api/contact` → 200 "success"); it is
  deleted on `site-upgrade` and will disappear when merged.

**Content accuracy**
- Voice demo scripts (`VoiceStudio.tsx`):
  - **Malayalam Real Estate (line 60) and Malayalam EdTech (line 115) are mixed with Telugu script** — unreadable to Malayalam speakers and will be mispronounced.
  - Hindi Banking (line 79): typo "लेन-देवन" → "लेन-देन".
  - "US English" in the language list (off-positioning).
  - Business names are fictional (Swarup Clinic, NXT Finance…) — OK.
  - Four tones (Enthusiastic, Assertive, Calm & Caring, Efficiency Pro) vs two planned in Phase C2.
  - "LATENCY: 184ms | QUALITY: 48KHZ PCM" is fake (audio is 24 kHz); "Live Transcript" label (not live).
- `www.swarupsnxt.com` serves the site separately (200, no redirect) → duplicate content (Phase D).

**Dependencies**
- `@google/genai` (to remove). No Tailwind package (runtime CDN instead). Otherwise current (React 19, Vite 6, TS 5.8).
- No lockfile committed (`package-lock.json` missing) → Cloudflare may install different versions each build.

---

## 4. Content audit (section by section)

Legend: **KEEP / REWRITE / REMOVE**. ⚠️ = fabricated proof (rule 1), 💲 = pricing (rule 2), ⚖️ = compliance claim (rule 3).

| Section | Current copy (key parts) | Verdict | Reason |
|---|---|---|---|
| Page title / meta | "Unlock Next Gen AI Solutions", "next-gen…" | REWRITE | Buzzword; Phase D will set search-focused titles. |
| Navbar | Links; CTA "Book Demo" → WhatsApp | REWRITE | "Book a demo" must go to `#contact`; CTA hidden between 768–1024 px. |
| Hero badge | "Protocol Gemini 3-Pro Active" | REMOVE | Gemini is being removed; jargon. |
| Hero headline | "Stop Chatting. Start Closing." | REWRITE | Confusing for a company that sells chatbots; no concrete outcome. |
| Hero sub | "hyper-realistic Digital Employees… entire sales funnel with sub-200ms latency" | REWRITE ⚠️ | Unverified latency figure; overclaims. |
| Hero CTAs | "Initialize Agent", "Watch Protocol" → demos | REWRITE | Jargon; primary CTA should be Book a demo, secondary WhatsApp. |
| Hero trust row | "SOC2 Type II", "HIPAA Ready", "DPDP Compliant" | REMOVE ⚖️ | Certifications/compliance not verified. |
| Integrations | Salesforce, HubSpot, Zoho, Shopify, Slack, WhatsApp logos | REWRITE / confirm | Partner logos count as proof; keep only integrations you actually deliver (TODO). |
| NXT Lab header | "Neural Intelligence Sandbox v2.5", "sub-200ms future" | REWRITE ⚠️ | Jargon + unverified figure. |
| NXT Lab HUD | 184ms, 99.92%, 12Hz–22kHz, 5G-NEURAL, AES-256-GCM, 4.2k/sec | REMOVE ⚠️ | Decorative fake metrics. |
| Products (section) | "Enterprise Grade AI Armory" | REWRITE | Buzzword. |
| Products – cards | "80% fewer missed calls", "0% Lead Leakage", "3x Engagement Rate", "15hrs/week saved", "40% Revenue Boost" under "Target ROI" | REWRITE ⚠️ | Remove every stat; describe concrete outcomes instead. |
| Products – list | Voice Agents, WhatsApp Chatbots, Social Media Bots, Unified CRM, Marketing Automation, Deployment MVP | REWRITE / confirm | Missing AI Contact Center (CCaaS), Omnichannel bots, SaaS automation; WhatsApp Campaigns + Voice Blast come in Phase B. "Unified CRM" and "Deployment MVP" — confirm these are products (TODO). |
| How it works | 4 steps: Architect / Integrate / Deploy / Scale; "zero-latency handshakes", "sub-200ms" | REWRITE ⚠️ | Replace with 3 plain steps: Discovery call → Custom setup & training → Go live & optimise. |
| Legacy vs NXT table | "$20–$45 per hour" vs "Starting at $1.50 per hour"; "2.5–5.0s" vs "Sub-200ms"; "Months" vs "Hours"; "Gemini 3" | REMOVE 💲⚠️ | Pricing + invented numbers; "Hours" contradicts "a few weeks" elsewhere. |
| Why us | "99.9% uptime, DPDP compliance", "80% Fewer Missed Calls", "40% Revenue Boost", "our partners see…", "The only AI automation partner…", "Enterprise Leaders" | REWRITE ⚠️⚖️ | Remove stats/compliance/superlatives; "Enterprise leaders" conflicts with "Indian MSMEs". |
| Industries | Real estate, Healthcare ("HIPAA-ready"), Finance ("detect fraud"), E-commerce ("integrates with Shopify"), Education ("Leveraging Gemini 3"), Logistics; "Sector Protocol 012" | REWRITE ⚖️ | Remove HIPAA/DPDP/Gemini/unverified capability claims; add automobile dealers + hospitality per plan; drop jargon label. |
| FAQ | "sub-200ms latency" Q; "AES-256… compliant with DPDP Act 2023"; "few weeks"; "test our live models" | REWRITE ⚠️⚖️ | Remove latency/compliance; demo is not live; expand to 8–10 prospect questions. |
| FAQ CTA | "map your 40% revenue boost" | REWRITE ⚠️ | Stat. |
| Contact | "Direct Neural Uplink", "Scale your Empire", "autonomous neural team", "Free AI Audit", "upgrading our automated intake system", "< 2 Hours", "Architects Online" | REWRITE | Jargon; response-time/online claims unverified; add Call; confirm "Free AI Audit" is a real offer (TODO). |
| Footer | "global pioneer in Hyper-Realistic AI Digital Employees"; dead links; "Uptime: 99.98%"; "© 2025 Swarups NXT Intelligence" | REWRITE ⚠️ | Remove superlative + uptime + dead links; year is out of date; company name differs ("…Intelligence") — confirm (rule 4). |
| Privacy modal | "Zero-Storage Policy", cookies for "Auth tokens and CSRF" and "tour completion", vendors "Google GenAI, Vapi, Retell", "SOC2", DPDP | REVIEW (legal) | Several statements don't match the site (no auth, no cookies — theme uses localStorage; no tour; Gemini removed). Needs your/legal review; I will not rewrite legal text without approval. |
| Security modal | Reseller framework, liability cap, support 10–6 Mon–Fri, no uptime guarantee | REVIEW (legal) | Contradicts marketing ("99.9% uptime", "proprietary pipeline", "bespoke neural architectures, no generic wrappers"). Decide positioning (TODO). |
| Floating button | "Launch Live Demo" → phone demo | REWRITE | Leads to a broken demo; A2 adds floating WhatsApp button. |

---

## 5. Contact / CTA audit

| Location | Label | Goes to | OK? |
|---|---|---|---|
| Navbar (desktop ≥1024 px) | Book Demo | `wa.me/917550007208?text=…interested in a demo!` | ❌ should be `#contact` |
| Navbar (mobile menu) | Book Demo Now | same WhatsApp link | ❌ should be `#contact` |
| Navbar (768–1023 px) | – | no CTA visible | ❌ |
| Hero | Initialize Agent | `#phone-demo` (broken demo) | ❌ |
| Hero | Watch Protocol | `#voice-studio` (broken demo) | ❌ |
| Products | Discuss Custom Blueprint | `#contact` | ✅ (copy REWRITE) |
| FAQ | Chat with Us | `wa.me/…?text=…questions about your AI solutions.` | ✅ |
| Contact | +91 7550007208 ("Direct Hotline") | WhatsApp link (not a call) | ⚠️ label says hotline, opens WhatsApp |
| Contact | WhatsApp Neural Link | `wa.me/…?text=…Free AI Audit!` | ✅ format (copy REWRITE) |
| Contact | hello@swarupsnxt.com / Request Custom Blueprint | `mailto:hello@swarupsnxt.com?subject=AI%20Audit%20Request` | ✅ |
| Contact | Call | – | ❌ missing `tel:` |
| Footer | email / phone | `mailto:hello@…`, `tel:+917550007208` | ✅ |
| Footer | NXT Lab | `#nxt-lab` | ✅ |
| Footer | API Docs, Benchmarks, Case Studies, Careers, Ethics Board | `#` | ❌ dead |
| Privacy modal | grievance@swarupsnxt.com | `mailto:` | ✅ (confirm mailbox exists) |
| Floating button | Launch Live Demo | scrolls to phone demo | ❌ broken demo |

All `wa.me` links use the correct `https://wa.me/<number>?text=<urlencoded>` format and the right number.

---

## 6. Performance and accessibility quick wins

**Performance**
- Fix the Hero rAF leak (biggest runtime cost).
- Tailwind **Play CDN** compiles CSS in the browser at load (large script, flash of unstyled content; not for production) → build-time Tailwind (Phase D).
- Font Awesome full CSS + webfonts for ~40 icons → subset or inline SVG (Phase D).
- 12+ Unsplash images: no `loading="lazy"`, no `width`/`height`, served at 800 px, grayscale-filtered → lazy-load + self-host WebP (Phase D).
- Gemini SDK in the client bundle (~100+ kB) → removed in A2.
- Global `*, *::before, *::after { transition … }` rule in `index.html` makes every element transition colours; three full-screen canvas animations run continuously → respect `prefers-reduced-motion`, pause off-screen.

**Accessibility**
- ✅ Exactly one `<h1>` (Hero). ❌ Heading levels skip: Integrations uses `<h3>` before any `<h2>`; card titles in Products / How it works / Why us use `<h4>` directly under `<h2>`; Footer uses `<h4>`.
- Industries list items are clickable `<div>`s — not keyboard reachable; no `aria-expanded`.
- FAQ accordion buttons lack `aria-expanded` / `aria-controls`.
- Modals: no `role="dialog"`, no Escape-to-close, no focus trap; close button has no label. In **light mode** the modal header text inherits dark text on a dark header and body headings are `text-white` on a light glass panel → poor/illegible contrast.
- Icon-only buttons without labels: PhoneDemo mic and send buttons; modal close.
- Form controls without associated labels: VoiceStudio `<label>` not linked to `<select>`; PhoneDemo input has only a placeholder.
- Very small text (8–10 px, heavy letter-spacing) used widely for meaningful content; `text-slate-400/500` on white fails contrast at those sizes.
- Generic alt text: `alt="Industry Preview"`.
- Mobile layout to verify in browser: ComparisonTable 3 columns at 360 px (cramped; moot if removed); Hero trust row does not wrap; NXT Lab HUD labels positioned outside the phone (`-left-16/-right-20`) on small screens; floating button `bottom-8 right-8` covers content.

---

## 7. Proposed fix list

### MUST FIX
| # | Fix | Files |
|---|---|---|
| M1 | Remove all fabricated stats, fake metrics and superlatives (rule 1) | `Products.tsx`, `WhyUs.tsx`, `FAQ.tsx`, `constants.tsx`, `NxtLab.tsx`, `Hero.tsx`, `HowItWorks.tsx`, `Footer.tsx`, `VoiceStudio.tsx`, `Contact.tsx` |
| M2 | Remove compliance/certification claims: SOC2, HIPAA, DPDP, AES-256 (rule 3) | `Hero.tsx`, `WhyUs.tsx`, `constants.tsx`, `NxtLab.tsx` |
| M3 | Remove pricing — delete Legacy vs NXT table and unused ROI calculator (rule 2) | `ComparisonTable.tsx`, `App.tsx`, `ROICalculator.tsx` |
| M4 | Remove Gemini entirely; demos show a friendly "talk to us directly" card with WhatsApp / Call / Email / Book a demo until Phase C (rules 6, 12); stop returning raw errors | `vite.config.ts`, `index.html`, `package.json`, `services/geminiService.ts`, `functions/api/chat.ts`, `functions/api/speech.ts`, `PhoneDemo.tsx`, `VoiceStudio.tsx`, `constants.tsx`, `README.md`, `metadata.json` |
| M5 | Fix Hero animation loop leak | `Hero.tsx` |
| M6 | CTAs: "Book a demo" → `#contact` (navbar desktop + mobile, show on tablet); Hero primary = Book a demo, secondary = WhatsApp; floating WhatsApp button replaces "Launch Live Demo"; Contact adds Call (`tel:`) | `Navbar.tsx`, `Hero.tsx`, `ChatWidget.tsx`, `Contact.tsx` |
| M7 | Remove dead footer links | `Footer.tsx` |
| M8 | Fix voice demo script errors (Malayalam×2 with Telugu script, Hindi typo); remove "US English" | `VoiceStudio.tsx` |

### SHOULD FIX
| # | Fix | Files |
|---|---|---|
| S1 | Rewrite copy flagged REWRITE (Hero, NXT Lab header, Products, Why us, Industries, FAQ, Contact, Footer) in plain, outcome-focused English | those components, `constants.tsx` |
| S2 | How it works → 3 steps; Industries add automobile dealers + hospitality (problem / what the agent does / product); FAQ → 8–10 questions | `HowItWorks.tsx`, `constants.tsx`, `Industries.tsx`, `FAQ.tsx` |
| S3 | Fix missing `accent-400/500` colours and blank `fa-brain-circuit` icon | `index.html` (Tailwind config) or components, `VoiceStudio.tsx`, `NxtLab.tsx` |
| S4 | Accessibility: keyboard-operable Industries, `aria-expanded` on accordions, dialog semantics + Escape + light-mode contrast in modals, labels on icon buttons/inputs, heading order, minimum readable text sizes | `Industries.tsx`, `FAQ.tsx`, `Modals.tsx`, `PhoneDemo.tsx`, `VoiceStudio.tsx`, cards |
| S5 | Delete dead code: `GuidedTour.tsx`, unused constants/types, import map + `process` shim, `metadata.json`; commit `package-lock.json` | various |
| S6 | Footer year (dynamic), company name consistency (after you confirm) | `Footer.tsx` |
| S7 | Privacy/Security text: correct statements that no longer match the site (cookies, vendors, SOC2) — **only after your review** | `Modals.tsx` |
| S8 | Remove `alert()`; replace with inline messages | `PhoneDemo.tsx` |

### NICE TO HAVE (mostly Phase D)
- Build-time Tailwind instead of Play CDN; trim Font Awesome; self-host/lazy-load images as WebP.
- OG image fix (needs the image from you) — can be done early if you send it.
- `prefers-reduced-motion` support; pause canvases off-screen; cancel `LabCanvas` loop.
- www → non-www redirect (Cloudflare dashboard).
- Replace `transparenttextures.com` background with a local asset or remove.

---

## TODO — business facts needed from you (rule 10)
1. **Integrations:** which of Salesforce, HubSpot, Zoho, Shopify, Slack, WhatsApp do you actually deliver?
2. **Products:** confirm the final list. Are "Unified CRM" and "Deployment MVP" products? Add AI Contact Center (CCaaS), Omnichannel bots, SaaS automation?
3. **"Free AI Audit":** is this a real offer? (If not, CTAs become "Book a demo".)
4. **Delivery time:** "1 week" (chatbot prompt) vs "a few weeks" (FAQ/Products) — which is true?
5. **Positioning:** Security terms describe a *reseller/integrator* of third-party AI SaaS, while marketing says "proprietary pipeline" / "bespoke neural architectures, not generic wrappers". Which should the site say?
6. **Company name:** footer says "Swarups NXT Intelligence"; everywhere else "Swarups NXT". Which is correct?
7. **Legal text:** who should review the Privacy/Security modals? Does grievance@swarupsnxt.com exist?
8. **OG image:** please provide a 1200×630 image (or approve generating one from the logo).
