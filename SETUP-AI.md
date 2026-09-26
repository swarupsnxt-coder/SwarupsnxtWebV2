# Website AI assistant: setup guide

The chat assistant in the NXT Lab section runs on **Cloudflare Workers AI** through a Cloudflare Pages Function (`functions/api/chat.ts`). There is **no API key**: Workers AI is connected through a "binding". Spam protection is **Cloudflare Turnstile** (free CAPTCHA).

Until the steps below are done, the chat shows a friendly "assistant unavailable" card with the WhatsApp, Call, Email and Book-a-demo buttons. The site never breaks.

You need about 15 minutes and access to the Cloudflare account that hosts the site.

---

## 1. Add the Workers AI binding

1. Go to **dash.cloudflare.com → Workers & Pages** and open the site's Pages project.
2. Go to **Settings → Bindings → Add → Workers AI**.
3. **Variable name:** `AI` (exactly this, in capitals).
4. Save. Do this for **both Production and Preview**. The environment selector is at the top of the Settings page.

## 2. Create a Turnstile widget

1. In the Cloudflare dashboard, open **Turnstile** in the left sidebar, then **Add widget**.
2. **Widget name:** `swarupsnxt.com chat`.
3. **Hostnames:** add
   - `swarupsnxt.com`
   - `www.swarupsnxt.com`
   - `<your-project>.pages.dev` (this covers preview URLs such as `site-upgrade.<your-project>.pages.dev`)
4. **Widget mode:** **Invisible** (recommended) or **Managed**. The chat shows a checkbox only if Cloudflare really needs one.
5. Create it. You get two keys:
   - **Site key**: public. It goes in the website build (step 3).
   - **Secret key**: private. It goes in an encrypted variable only (step 3). Never put it in code.

## 3. Add the variables

In the Pages project, go to **Settings → Variables and Secrets** and add these for **both Production and Preview**:

| Name | Type | Value |
|---|---|---|
| `VITE_TURNSTILE_SITE_KEY` | Plaintext | the Turnstile **site key** (public; the build puts it into the page) |
| `TURNSTILE_SECRET_KEY` | **Secret** (Encrypt) | the Turnstile **secret key** |
| `SESSION_SECRET` | **Secret** (Encrypt) | a long random string (see below) |

**How to generate `SESSION_SECRET`:** in the VS Code terminal, run

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then copy the 64-character output. Use a different value for Production and Preview if you like.

Also delete the old `API_KEY` / `GEMINI_API_KEY` variables if they are still there.

## 4. Redeploy

Variables and bindings only apply to new deployments. Go to **Deployments**, open the latest `site-upgrade` deployment, then **⋯ → Retry deployment**. Or push any commit.

## 5. Rate limit (recommended)

Each chat session is already capped at **20 messages** and needs Turnstile to start. To stop anyone hammering the endpoint from one IP address, add one free WAF rule:

1. Go to **dash.cloudflare.com → select the `swarupsnxt.com` domain → Security → WAF → Rate limiting rules → Create rule**.
2. **Rule name:** `Chat API limit`.
3. **If incoming requests match:** URI Path *equals* `/api/chat` **and** Request Method *equals* `POST`.
4. **With the same characteristics:** IP (the only option on the Free plan).
5. **When rate exceeds:** `5` requests per `10 seconds`.
6. **Then take action:** Block, for `10 seconds` (Free plan values).
7. Deploy.

**Why a WAF rule and not code:** it's free, runs before the function (so blocked requests use no AI neurons), and needs no database. **Limitation:** WAF rules apply to `swarupsnxt.com` only, not to `*.pages.dev` preview URLs. On previews, Turnstile and the 20-message cap still apply.

## 6. Check usage against the free allowance

- Workers AI includes **10,000 neurons per day free**, reset at 00:00 UTC. See [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/).
- The current model (`@cf/meta/llama-3.1-8b-instruct-fp8`) uses about **35–45 neurons per chat message**, so roughly **200–250 messages a day** fit in the free allowance.
- To see usage, go to **dash.cloudflare.com → AI → Workers AI**, which shows neurons used per day.
- If the free allowance runs out on the Free plan, the assistant shows the contact card until the next day. Nothing breaks.

To change the model (for example `@cf/meta/llama-4-scout-17b-16e-instruct` for better quality in Indian languages, at about 2x the neurons), edit `MODEL_ID` in `lib/llm.ts`.

---

## Testing locally

Workers AI always runs on Cloudflare's servers, even in local development, and counts against your allowance. Local testing needs you to be logged in to Cloudflare.

1. Create a file named `.dev.vars` in the project root. It's already git-ignored. Put Cloudflare's official **test** Turnstile secret in it:

   ```
   TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"
   SESSION_SECRET="any-local-random-string"
   ```

   The dev build automatically uses the matching always-pass test site key, so no `VITE_TURNSTILE_SITE_KEY` is needed locally.
2. Log in once: `npx wrangler@4 login`.
3. Run `npm run pages:dev`, then open the URL wrangler prints (usually http://localhost:8788).

`npm run dev` (the Vite dev server) does **not** run Pages Functions. The chat there shows the unavailable card.

## Where things are

| File | What it does |
|---|---|
| `functions/api/chat.ts` | The API: Turnstile check, session, limits, fallback |
| `lib/llm.ts` | The model call (swap provider here; `MODEL_ID` constant) |
| `lib/knowledge.ts` | The assistant's instructions and knowledge, built from `constants.tsx` |
| `lib/session.ts` | Signed 30-minute session tokens |
| `components/PhoneDemo.tsx` | The chat UI |

Limits: 500 characters per message, last 8 messages of history sent to the model, 220 output tokens, 15-second model timeout, 20 messages per session.
