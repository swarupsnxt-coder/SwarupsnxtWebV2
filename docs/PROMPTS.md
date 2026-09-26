# Swarups NXT — Claude Code Prompt Pack

## How to use this

1. The hard rules and project facts live in `/CLAUDE.md`. Claude Code reads it automatically
   every session, so they apply to every phase. Keep this file for the phase prompts only.
2. Create a working branch first (you are on `main` by default): `git checkout -b site-upgrade`.
   Cloudflare Pages builds a **preview URL** for every non-production branch. Test there and
   merge to `main` only when a phase is verified.
3. Run the phases **in order**, each in a **fresh Claude Code session** (`/clear` between phases).
   Paste one phase prompt at a time.
4. Each phase ends with a checkpoint where Claude Code stops and reports. Read the report before
   you say "continue".
5. Commit after every phase. If something breaks, `git revert` is your undo button.

### One-time manual step (do this now)
`vite.config.ts` defines `process.env.API_KEY` / `process.env.GEMINI_API_KEY` for the client,
so any build made with `GEMINI_API_KEY` set shipped the Gemini key inside the site's JavaScript.
Delete or rotate that key in Google AI Studio, and remove the `API_KEY` / `GEMINI_API_KEY`
variables from Cloudflare Pages → Settings → Variables and Secrets (Production and Preview).

---

## PHASE A — Full audit, then fix

### A1: Audit only (no code changes)

```
Read the ENTIRE codebase before changing anything. Go through every file: config, routing,
components, pages, styles, assets, public/, functions/ (if any), package.json, build config,
and any leftover AI Studio / Gemini scaffolding.

Produce AUDIT.md in the repo root with these sections:

1. Stack map: framework, build tool, router type (hash vs browser), styling system,
   component structure, where each page section lives (file paths), build output dir.
2. How the chatbot and voice demo currently work: files, data flow, where the Gemini key
   was read from, whether it was exposed in the client bundle, all Gemini-related code and
   dependencies (these will all be removed — CLAUDE.md rule 12).
3. Broken or risky things: dead code, console errors you can predict from reading, unused
   dependencies, outdated packages with known issues, broken links, missing alt text,
   hard-coded secrets, anything that fails silently. Include at least:
   - functions/api/contact.ts does NOT deliver leads: it only logs the email and returns
     "success". Visitors think they reached us; nobody is notified.
   - Fabricated stats and claims (CLAUDE.md rules 1 and 3), e.g. "80% fewer missed calls",
     "40% Revenue Boost", "0% Lead Leakage" (Products.tsx, WhyUs.tsx, FAQ.tsx,
     ROICalculator.tsx), "99.9% / 99.98% uptime" (WhyUs.tsx, Footer.tsx), "99.92%"
     (NxtLab.tsx), "DPDP compliance" (WhyUs.tsx), and the same stats in the chatbot system
     prompt (services/geminiService.ts). List every instance.
   - functions/api/chat.ts and speech.ts return raw `err.message` to the browser.
   - "US English" in the voice demo language list (off-positioning; see Project facts).
   - Demo scripts in components/VoiceStudio.tsx: check every non-English script is in the
     correct script/alphabet and uses fictional business names only.
   - index.html: Tailwind Play CDN in production (not recommended by Tailwind; slow first
     paint), plus an esm.sh import map that duplicates what Vite already bundles.
   - og:image / twitter:image point to /assets/Dark%20version.png, which is not in the repo.
4. Content audit, section by section: current copy, and for each a verdict of
   KEEP / REWRITE / REMOVE with a one-line reason. Flag any fabricated proof (see CLAUDE.md
   rule 1), vague buzzword copy ("next-gen", "cutting-edge", "revolutionary") with no concrete
   outcome, inconsistent product names, and CTAs that don't lead to a contact action.
5. Contact/CTA audit: list every CTA and where it goes. Check WhatsApp links use the
   https://wa.me/<number>?text=<prefilled message> format, mailto: and tel: links work, and
   every "Book a demo" CTA goes to #contact.
6. Performance and accessibility quick wins: image sizes/formats, lazy loading, font loading,
   colour contrast, heading hierarchy (exactly one H1), keyboard navigation, mobile layout.
7. Proposed fix list, grouped as MUST FIX / SHOULD FIX / NICE TO HAVE, each with the files
   affected.

STOP after writing AUDIT.md. Do not change any other file. Summarise the top 10 findings
for me and wait for my approval.
```

### A2: Apply approved fixes

```
Apply the MUST FIX and SHOULD FIX items from AUDIT.md that I approved: {{LIST_OR "all"}}.

Also:
- FIRST, fix lead delivery in functions/api/contact.ts (MUST FIX). Restore Zoho CRM lead
  creation + Resend email notification. A working version exists in the old repo's history:
  `git show old-main:functions/api/contact.ts`. Env vars: RESEND_API_KEY, OWNER_EMAIL,
  ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL, ZOHO_API_URL.
  HTML-escape every user field before putting it in the email. Keep the honeypot check and
  server-side validation. Return an error (not "success") if neither Zoho nor email succeeded,
  so the form can show the WhatsApp/Call/Email fallback. Make sure components/Contact.tsx
  actually posts to /api/contact and handles the error. List the env vars I must add in
  Cloudflare.
- Remove all Gemini / @google/genai / AI Studio code and dependencies (CLAUDE.md rule 12):
  * the `process.env.API_KEY` / `process.env.GEMINI_API_KEY` defines in vite.config.ts
  * the esm.sh import map (Vite bundles React itself) and the `window.process` shim in index.html
  * `@google/genai` in package.json (then reinstall and commit package-lock.json)
  * services/geminiService.ts, and the Gemini calls behind functions/api/chat.ts and
    functions/api/speech.ts (make both return a structured fallback until Phase C)
  * the API_KEY shim in functions/api/contact.ts
  * the /api/chat and /api/speech usage in components/PhoneDemo.tsx and
    components/VoiceStudio.tsx
  * the AI Studio text and GEMINI_API_KEY step in README.md (rewrite it for this project)
  Leave the chatbot and voice demo UI in place but have them show a friendly "demo is being
  upgraded — talk to us directly" card with the four contact actions, until Phase C replaces
  them. Afterwards, grep the repo and dist/ for "genai", "gemini" and "API_KEY" and report hits.
- Rewrite weak copy flagged REWRITE in the audit. Tone: clear, confident, plain English,
  outcome-focused for Indian business owners (fewer missed calls, faster replies, more
  follow-ups, 24x7 availability, multilingual). Short sentences. No buzzword stacking.
  No invented numbers.
- Make CTAs consistent site-wide: primary = "Book a demo" (→ #contact), secondary = WhatsApp.
  Add a floating WhatsApp button (bottom-right, mobile-safe, with a pre-filled message
  "Hi Swarups NXT, I'd like to know more about your AI solutions").
- Contact section: Book a demo (scrolls to the contact form, with the subject pre-selected as
  "Book a demo" if the form has a subject field), WhatsApp, Call (tel:), Email (mailto:).
- Add these content sections if they don't exist (all without fake proof):
  * "How it works" — 3 steps: Discovery call → Custom setup & training → Go live & optimise.
  * "Use cases by industry" — short cards: real estate, healthcare/clinics, education,
    e-commerce/D2C, finance/NBFC collections, automobile dealers, hospitality. Each card:
    the problem, what the AI agent does, which Swarups NXT product fits.
  * "Why Swarups NXT" — only claims the company can actually deliver: Indian languages,
    setup handled for you, works with WhatsApp and phone, human handover, support.
    Mark any claim you're unsure about with a TODO comment and list it in your report
    so I can confirm.
  * FAQ — 8–10 questions a prospect would ask (languages supported, setup time, does it
    replace staff, human handover, data handling, which channels, how to start a pilot).
    Answers must not include prices or compliance claims. Put answers you can't verify
    as TODO for me to confirm.

Run the build, fix errors, commit in logical chunks. Report: what changed, file list,
and every TODO needing my input.
```

---

## PHASE B — Add products: WhatsApp Campaign and Voice Blast

```
Add two new product cards to the EXISTING product section, matching the existing card
component, layout, icons style, and animations exactly. Reuse the same component; do not
create a parallel design. If the product data is in an array/config, add entries there.

Product 1: WhatsApp Campaigns
- One-line: Reach customers where they already are — broadcast offers, reminders, and
  updates on WhatsApp, with replies handled by AI.
- Key capabilities (3–5 bullets, match the length of existing cards):
  bulk broadcasts to opted-in contacts, rich media (images, video, documents, buttons),
  personalised messages, AI chatbot to answer replies 24x7, campaign reporting
  (delivered / read / replied).
- Use cases: offers and festive campaigns, appointment and payment reminders,
  order and delivery updates, lead follow-ups, re-engaging old customers.
- CTA: "Plan a WhatsApp campaign" → WhatsApp link with prefilled text
  "Hi, I'm interested in WhatsApp campaigns".

Product 2: Voice Blast
- One-line: Send a recorded or AI-voiced message to thousands of phones at once —
  in the language your customers speak.
- Key capabilities: bulk automated calls, recorded or AI-generated voice, all major Indian
  languages, press-a-key responses (IVR) to capture interest, call reports
  (answered / missed / key pressed).
- Use cases: announcements, event and appointment reminders, payment reminders,
  promotions, surveys and feedback.
- CTA: "Plan a voice blast" → WhatsApp link with prefilled text
  "Hi, I'm interested in Voice Blast".

Rules: no pricing, no compliance mentions, no delivery-rate or reach statistics.
If the site has per-product detail pages or modals, create matching ones for both products
following the same pattern. Make sure the navigation/menu and footer product lists include
them if other products are listed there. Check mobile layout: the grid must still look
balanced with the added cards (fix column counts if the last row looks orphaned).

Build, test responsive breakpoints, commit, and report with file list.
```

---

## PHASE C — Rebuild the AI chatbot and voice demo (free / near-free stack)

### Decided architecture (do not deviate without asking)

- **Chatbot:** Cloudflare Pages Function (`/functions/api/chat`) calling **Cloudflare Workers AI**
  through a binding (no API key exists anywhere). Protected by **Cloudflare Turnstile** (free
  CAPTCHA) plus a per-IP rate limit.
- **Voice demo:** **pre-generated audio clips** served as static files. There are no runtime API
  calls and no runtime cost. The clips are generated once, locally, by a script using a TTS
  provider's free tier.
- **No Gemini** anywhere (CLAUDE.md rule 12).

### C1: Chatbot

```
Rebuild the website chatbot using Cloudflare Workers AI via a Cloudflare Pages Function.
Read the current Cloudflare docs for Pages Functions, Workers AI bindings, and Turnstile
before writing code, and pick a current instruction-tuned text model that Workers AI lists
as available (prefer a small, fast Llama or similar model with good Indian-language support).
Put the model ID in one constant.

Backend: /functions/api/chat.(ts|js)
- Uses env.AI (Workers AI binding) — no API keys.
- Provider abstraction: put the model call in one function (e.g. lib/llm.ts) so we can
  later swap to another provider (Groq, Claude, OpenAI) by editing one file. Do not add a
  Gemini adapter.
- Validates a Cloudflare Turnstile token on the FIRST message of a session
  (secret in env.TURNSTILE_SECRET_KEY), then issues a short-lived signed session token
  (HMAC with env.SESSION_SECRET, 30 min expiry) so the user isn't challenged every message.
- Rate limit: max 20 messages per session and a per-IP cap (use a simple in-code limiter
  with KV if needed, or document a Cloudflare WAF rate-limiting rule I should add in the
  dashboard — tell me which you chose and why).
- Caps: max 500 characters per user message, keep only the last 8 turns of history,
  limit output tokens to keep replies short.
- Streams the response if the chosen approach supports it cleanly; otherwise returns JSON.
- On ANY error (model down, quota, timeout > 15s), returns a structured fallback so the
  UI shows the contact card. Never return a raw error to the user.

System prompt / knowledge:
- Build a knowledge file (functions/api/knowledge.ts or .md) from the site's actual content:
  company overview, every product including WhatsApp Campaigns and Voice Blast,
  use cases, how it works, FAQ, contact options.
- The bot acts as the Swarups NXT assistant. Its jobs: answer questions about the products
  and show what an AI chatbot can do; understand the visitor's business and suggest the
  right product; after 3–4 useful exchanges, or whenever the visitor shows buying intent,
  invite them to book a demo or chat on WhatsApp.
- It must: never quote prices ("pricing depends on your requirements — let's set up a
  quick call"); never invent clients, stats, or integrations not in the knowledge file;
  politely decline off-topic requests and steer back; reply in the language the user writes
  in — English or any language in the CLAUDE.md Project facts list, including Hinglish and
  other code-mixed text; keep replies under ~80 words; use no markdown the UI can't render.

Frontend:
- Keep the existing chatbot look and feel from the site; restyle only if the audit found
  it broken.
- Render Turnstile (invisible/managed mode) before the first message.
- Show 3–4 suggested starter questions (e.g. "What can an AI voice agent do for my
  business?", "How do WhatsApp campaigns work?", "Which Indian languages do you support?",
  "How do we get started?").
- When the bot suggests contact, or after the session cap, render action buttons:
  Book a demo (scrolls to #contact and closes/minimises the chat) / WhatsApp / Call / Email.
  WhatsApp prefilled text should include a one-line summary of what the visitor asked about.
- Typing indicator, error fallback card, mobile-friendly, keyboard accessible, and
  the chat must not block the page on small screens.

Deliverables:
- Code, plus a SETUP-AI.md with exact dashboard steps for me:
  1. Cloudflare Pages → project → Settings → Bindings: add Workers AI binding named AI
     (for both Production and Preview).
  2. Create a Turnstile widget for swarupsnxt.com + the pages.dev preview domain; where to
     put the site key (public, OK in frontend) and secret key (env var only).
  3. Env vars to add: TURNSTILE_SECRET_KEY, SESSION_SECRET (tell me how to generate one).
  4. Any KV namespace or WAF rate-limit rule needed.
  5. How to check Workers AI usage against the free daily allowance.
- A local testing guide using `wrangler pages dev`.
STOP and report before moving to C2.
```

### C2: Voice demo (pre-generated clips)

```
Rebuild the voice demo as a pre-recorded sample player, keeping the existing UX concept:
the visitor picks Industry, Language, Voice (Male/Female), and Tone, then plays a sample
AI voice-agent call.

Matrix:
- Industries (5): Real estate, Healthcare/clinic, Education, E-commerce/D2C, Finance/collections
- Languages (11): English (Indian) + all major Indian languages from the CLAUDE.md Project
  facts list (Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia)
- Voice: Male, Female
- Tone (2): Friendly, Assertive
Total clips = 5 × 11 × 2 × 2 = 220. Before generating, show me the clip count, the total
estimated TTS characters, and how that compares with the provider's free-tier limit.
If a language has no suitable male or female neural voice, tell me instead of substituting.
If the old UI had more tone options, reduce them to these two and tell me.
Remove "US English" from the language list.

Step 1 — Scripts:
- Write one 30–40 second conversation per industry: an AI agent handling a realistic
  inbound or outbound call (e.g. real estate: site-visit booking; clinic: appointment +
  reminder; education: admission enquiry; e-commerce: COD order confirmation;
  finance: polite EMI reminder). The customer speaks 2–3 short lines, and the agent drives
  toward a clear outcome (booking made, confirmation captured, callback scheduled).
  Use fictional business names only.
- Natural Indian phrasing. For every non-English language, write natural conversational
  scripts (code-mixing English business terms is fine and realistic), not literal
  translations. Verify each script uses the correct script/alphabet for its language.
- Tone variants: Friendly = warm, relaxed; Assertive = crisp, direct, still polite.
- Save as data/voice-demo-scripts.json. STOP and show me the English scripts for
  approval before generating any audio.

Step 2 — Generation script (runs locally only, never on the site):
- scripts/generate-voice-demos.mjs reading scripts JSON → writing MP3s to
  public/audio/voice-demo/{industry}-{lang}-{gender}-{tone}.mp3 plus a manifest.json.
- Primary TTS provider: Microsoft Azure AI Speech (free F0 tier). Use Indian-locale neural
  voices for every language in the Project facts list (en-IN, hi-IN, bn-IN, mr-IN, te-IN,
  ta-IN, gu-IN, kn-IN, ml-IN, pa-IN, or-IN); verify current voice names, availability per
  gender, and free-tier limits in the Azure docs.
  Agent voice = selected gender; customer voice = a different fixed voice so the call
  sounds like two people. Use SSML prosody (rate/pitch/emphasis) to create the tone variants
  where the voice has no built-in style.
- Make the provider pluggable (one adapter file) with a second adapter for Sarvam AI
  (Indian-language TTS) in case its quality is better for some languages — I'll A/B a few
  clips per language.
- Support generating a subset (e.g. --langs en,hi,ta) so I can review a few languages
  before running all 220.
- Keys come from a local .env (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION, SARVAM_API_KEY).
  Ensure .env is in .gitignore. Never commit keys.
- Skip clips that already exist (so re-runs are cheap); a --force flag regenerates.
- Target ~64 kbps mono MP3 to keep files small.

Step 3 — Player UI:
- Keep the existing selectors/visual design. Loads the clip from the manifest, has a
  play/pause, progress bar, and a live transcript that highlights line by line (store
  per-line timestamps in the manifest, or show the full transcript if timing isn't
  available).
- Label it honestly: "Sample AI voice agent calls". Do NOT label it "live".
- Under the player: "Want this for your business? Book a demo (→ #contact) / WhatsApp us".
- Preload nothing until the user interacts (performance). Works on iOS Safari
  (audio must start from a user gesture).

Report: clip count, total audio size, voices used per language, and any clips that failed.
```

---

## PHASE D — SEO and discoverability

```
Goal: search engines, AI search tools, and WhatsApp/LinkedIn link previews must see real
page content without running JavaScript. Currently the served HTML contains only meta tags.

1. Pre-rendering:
   - Pick the least invasive way to output fully rendered static HTML at build time for
     every route, given this project's framework (e.g. a Vite prerender plugin, vite-ssg,
     or equivalent). If the site uses hash routing (#/about), switch to clean path routes
     with a Cloudflare Pages SPA fallback and add redirects from old hash URLs if feasible.
   - Verify by building and running: grep the built index.html for the H1 text and product
     names. Show me the proof.
2. Technical SEO:
   - Unique <title> (≤60 chars) and meta description (≤155 chars) per page/section route,
     written for Indian business search intent (e.g. "AI voice agents for business in India",
     "WhatsApp marketing automation", "voice broadcasting service").
   - Canonical tags pointing to https://swarupsnxt.com. Give me the Cloudflare dashboard
     steps for a redirect rule www → non-www (301), because both currently serve the site
     separately (duplicate content).
   - sitemap.xml, robots.txt (allow all, reference the sitemap), and an llms.txt summarising
     the company and products for AI crawlers.
   - JSON-LD structured data: Organization (name, logo, url, contact point with phone/email,
     areaServed: India), a Service entry for each product, FAQPage from the FAQ section.
     Validate the JSON-LD against the schema.org types.
   - OG image: index.html points og:image/twitter:image at /assets/Dark%20version.png, which
     is not in the repo. Add the image as public/og-image.png (1200×630, no spaces in the
     filename) and update all references. Ask me for the image if none exists.
   - Replace the Tailwind Play CDN with a build-time Tailwind setup (same theme config and
     class output, so the design doesn't change) and self-host or trim Font Awesome.
   - One H1 per page, logical H2/H3 hierarchy, descriptive alt text on every image,
     descriptive link text (no bare "click here").
3. Performance (Core Web Vitals):
   - Convert large images to WebP/AVIF with width/height set; lazy-load below-the-fold
     images; preload the hero image and primary font; remove unused JS/CSS;
     code-split the chatbot and voice demo so they load only when opened.
   - Report the before/after bundle size.
4. Content for search:
   - Make sure each product and each industry use case has enough indexable text
     (~80–150 words) with natural keywords. No keyword stuffing, no fake stats.
5. Give me a POST-LAUNCH-SEO.md checklist of manual steps: verify the domain in Google Search
   Console and Bing Webmaster Tools, submit the sitemap, create/complete a Google Business
   Profile, test pages in the Rich Results Test and PageSpeed Insights, and test link previews
   by pasting the URL in WhatsApp.

Build, verify, commit, report.
```

---

## Final verification prompt (run after all phases)

```
Do a final end-to-end review of the site-upgrade branch:
- Build passes; no console errors on any page (list anything you can't verify statically).
- Every CTA, WhatsApp, tel:, and mailto: link works and has the right prefilled text; every
  "Book a demo" CTA scrolls to #contact.
- grep the whole repo and built output for: API keys/secrets, "gemini", "genai", "API_KEY",
  "lorem", "TODO", "₹", "$", "price", "testimonial", and any numbers followed by "%" or "+".
  Report every hit.
- Chatbot: fallback card appears when the AI endpoint fails (simulate it).
- Voice demo: every manifest entry has a file; every file is in the manifest; every
  language in the Project facts list is present.
- Mobile check at 360px, 768px, 1280px widths for every section.
Produce RELEASE-NOTES.md summarising all changes and remaining TODOs for me.
```
