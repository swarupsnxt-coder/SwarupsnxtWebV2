# Website lead form → Zoho CRM: setup guide

The enquiry form in the **Contact** section (and the "Book a demo" popup) sends leads to **Zoho CRM**
(Free edition, India data centre) through a Cloudflare Pages Function (`functions/api/lead.ts`).
Spam protection is the same **Cloudflare Turnstile** widget the chat assistant uses (see `SETUP-AI.md`).

Until the steps below are done, submitting the form shows a friendly card with **"Send these details on
WhatsApp"** (prefilled with what the visitor typed), Call and Email. No lead is lost and the site never breaks.

You need about 15 minutes, your Zoho CRM admin login (**crm.zoho.in**) and the Cloudflare account.

Zoho CRM Free allows 3 users and 5,000 API credits a day. One lead uses one API call. Check
[Zoho CRM editions](https://www.zoho.com/crm/comparison.html) for current limits.

---

## 1. Create a Zoho "Self Client"

1. Sign in at **https://api-console.zoho.in** with the Zoho CRM admin account.
2. Click **Add Client → Self Client → Create Now**, then confirm with **OK**.
3. Open the **Client Secret** tab and copy the **Client ID** and **Client Secret**.

## 2. Generate a refresh token (one time)

1. In the same Self Client, open the **Generate Code** tab.
2. Fill in these fields:
   - **Scope:** `ZohoCRM.modules.leads.CREATE`
   - **Time Duration:** 10 minutes
   - **Description:** `swarupsnxt.com lead form`
3. Click **Create**, pick your CRM organisation, and copy the code it shows. It expires quickly, so do the next step straight away.
4. In the VS Code terminal (Git Bash), run this, replacing the three values:

   ```bash
   curl -s -X POST https://accounts.zoho.in/oauth/v2/token \
     -d grant_type=authorization_code \
     -d client_id=YOUR_CLIENT_ID \
     -d client_secret=YOUR_CLIENT_SECRET \
     -d code=THE_CODE_FROM_STEP_3
   ```

5. Copy the `refresh_token` value from the reply. It does not expire, so **treat it like a password**: don't paste it into chat, code or any committed file.
   - If the reply says `invalid_code`, the code expired. Generate a new one and run the command again.

## 3. Add the secrets to Cloudflare

In the Pages project, go to **Settings → Variables and Secrets** and add these for **both Production and Preview**:

| Name | Type | Value |
|---|---|---|
| `ZOHO_CLIENT_ID` | **Secret** (Encrypt) | Client ID from step 1 |
| `ZOHO_CLIENT_SECRET` | **Secret** (Encrypt) | Client Secret from step 1 |
| `ZOHO_REFRESH_TOKEN` | **Secret** (Encrypt) | refresh token from step 2 |
| `ZOHO_LEAD_SOURCE` | Plaintext (optional) | e.g. `Website`, see the note below |

`TURNSTILE_SECRET_KEY` and `VITE_TURNSTILE_SITE_KEY` are shared with the chat assistant. If you haven't added them yet, follow steps 2–3 of `SETUP-AI.md`.

**Lead Source (optional):** set this only if the value exists in your Lead Source picklist, or Zoho rejects the lead. To add one, go to **crm.zoho.in → Setup → Customization → Modules and Fields → Leads → Lead Source → add "Website"**. Then set `ZOHO_LEAD_SOURCE` to `Website`.

Then redeploy. Variables only apply to new deployments, so go to **Deployments → latest → ⋯ → Retry deployment**.

## 4. Test it

1. Open the site, fill in the form with your own details and submit.
2. You should see "Thanks". The lead appears in **Zoho CRM → Leads**.
   - The name is split into First/Last Name.
   - **Description** holds the product interest, the message and a consent line with the date and time.
   - If the visitor left Company blank, it shows "Not provided".
3. Delete the test lead.

If you see the WhatsApp card instead, check the error in **Cloudflare → Pages project → Deployments → latest → Functions → Real-time logs**. Look for lines starting `Zoho lead error:`.
- `invalid_client` / `invalid_code`: re-check the secrets.
- `MANDATORY_NOT_FOUND`: a field is mandatory in your Leads layout. Make it optional, or tell your developer.
- `INVALID_DATA` on `Lead_Source`: remove `ZOHO_LEAD_SOURCE` or add the value to the picklist.

## 5. Rate limit (recommended)

As with the chat, add a free WAF rule. Go to **swarupsnxt.com → Security → WAF → Rate limiting rules → Create rule** and enter:
- **Name:** `Lead form limit`
- **If:** URI Path *equals* `/api/lead` **and** Method *equals* `POST`
- **Characteristics:** IP
- **Rate:** `3` requests per `10 seconds`
- **Action:** Block for `10 seconds`

On the Free plan, edit the existing chat rule to match both paths (`/api/chat` **or** `/api/lead`) if only one rule is allowed.

---

## Testing locally

Add the Zoho values to `.dev.vars` (git-ignored) next to the Turnstile test secret:

```
TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"
ZOHO_CLIENT_ID="..."
ZOHO_CLIENT_SECRET="..."
ZOHO_REFRESH_TOKEN="..."
```

Then run `npm run pages:dev` and open the URL wrangler prints. Leave the ZOHO lines out to see the fallback card.

## Where things are

| File | What it does |
|---|---|
| `functions/api/lead.ts` | The API: honeypot, validation, Turnstile check, fallback |
| `lib/zoho.ts` | Zoho token refresh (cached ~55 min) and the Leads insert |
| `lib/lead.ts` | Field limits and validation shared by the form and the API |
| `components/LeadForm.tsx` | The form UI (Contact section and "Book a demo" popup) |

Data handling: the Privacy Policy (footer) tells visitors their form details go to our Zoho CRM account. If you
move to another CRM, update the Privacy Policy too.
