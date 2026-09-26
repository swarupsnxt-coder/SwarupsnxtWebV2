# Post-launch SEO checklist

Do these after the `site-upgrade` branch is merged to `main` and live on https://swarupsnxt.com. Most steps are one-time and take 5–15 minutes each.

## 1. Redirect www → non-www (Cloudflare) — do first

Right now `www.swarupsnxt.com` serves a separate copy of the site, which counts as duplicate content.

1. **dash.cloudflare.com** → select the **swarupsnxt.com** domain → **Rules** → **Redirect Rules** → **Create rule**.
2. Choose the template **"Redirect from WWW to root"** if offered; otherwise set it up manually:
   - **When incoming requests match:** Hostname *equals* `www.swarupsnxt.com`
   - **Then:** Dynamic redirect, expression `concat("https://swarupsnxt.com", http.request.uri.path)`
   - **Status code:** 301
   - **Preserve query string:** on
3. Deploy. Test: open `https://www.swarupsnxt.com/#faq`. It should land on `https://swarupsnxt.com/#faq`.

(The `www` DNS record must stay proxied, with an orange cloud, for the rule to run.)

## 2. Google Search Console

1. Go to https://search.google.com/search-console and click **Add property**.
2. Choose **Domain** and enter `swarupsnxt.com`. It shows a TXT record. Because DNS is on Cloudflare, use the **"Verify with Cloudflare"** button if shown, or add the TXT record under Cloudflare → DNS.
3. After verification, go to **Sitemaps** and submit `https://swarupsnxt.com/sitemap.xml`.
4. Go to **URL Inspection**, enter `https://swarupsnxt.com/`, then **Request indexing**.
5. Check back in a few days under **Pages** (indexing) and **Enhancements** (structured data).

## 3. Bing Webmaster Tools (also feeds DuckDuckGo, Yahoo and ChatGPT search)

1. Go to https://www.bing.com/webmasters and sign in.
2. Choose **Import from Google Search Console**. It copies the verified site and sitemap in one click.
3. If you're not importing: add the site, verify with the Cloudflare DNS option, then submit the sitemap.

## 4. Google Business Profile

1. Go to https://business.google.com and add **Swarups NXT**.
2. Category: e.g. *Software company* or *Business management consultant*. Pick what fits best.
3. It's a service-area business, so hide the street address if you don't receive visitors, and set the service area to **India** (or your key cities).
4. Add: website `https://swarupsnxt.com`, phone `+91 7550007208`, business hours, a short description (no prices or unverifiable claims), the logo (`/logo-512.png`) and a cover image.
5. Complete verification (Google chooses the method: video, phone or postcard).

## 5. Test structured data and speed

- **Rich Results Test**: https://search.google.com/test/rich-results with the URL `https://swarupsnxt.com/`. Expect *Organization* and *FAQ* detected with no errors. (Since 2023, Google only shows FAQ rich snippets for some government and health sites, so the FAQ markup is still valid and useful but may not show as a snippet.)
- **Schema validator**: https://validator.schema.org with the same URL. Expect 0 errors. It passed with 0 errors and 0 warnings before launch.
- **PageSpeed Insights**: https://pagespeed.web.dev with the same URL. Check both Mobile and Desktop, and note the scores for comparison later.

## 6. Test link previews

- **WhatsApp**: paste `https://swarupsnxt.com` into a chat (with yourself, or a test group). You should see the preview image with "Every call answered. Every lead followed up." WhatsApp caches previews. If you see the old one, test with `https://swarupsnxt.com/?v=2`.
- **LinkedIn**: https://www.linkedin.com/post-inspector. Enter the URL, then **Inspect**. This also refreshes LinkedIn's cache.
- **Facebook / Instagram**: https://developers.facebook.com/tools/debug. Enter the URL, then **Scrape Again**.

## 7. Keep it healthy

- When products, FAQs or contact details change, edit `constants.tsx`. The page, the structured data and the chatbot all update from it. Also update `public/llms.txt` and the `<lastmod>` date in `public/sitemap.xml`.
- Check Search Console monthly for errors and for the queries people use to find the site.
