# Swarups NXT website

Marketing site for [swarupsnxt.com](https://swarupsnxt.com): AI voice agents, chatbots and automation for Indian businesses.

Built with React, TypeScript and Vite. Hosted on Cloudflare Pages (`main` = production, other branches = preview deployments).

## Run locally

Prerequisite: Node.js 20+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build into dist/ (includes pre-rendering + structured data)
```

No API keys are needed to run the site. The chat assistant (Cloudflare Workers AI) needs a one-time dashboard setup and runs locally with `npm run pages:dev` — see [SETUP-AI.md](SETUP-AI.md).

## Project notes

- Project rules and facts for contributors (and Claude Code): [CLAUDE.md](CLAUDE.md)
- Upgrade plan, phase by phase: [docs/PROMPTS.md](docs/PROMPTS.md)
- Latest audit: [AUDIT.md](AUDIT.md)
- After launch (search engines, link previews): [POST-LAUNCH-SEO.md](POST-LAUNCH-SEO.md)
