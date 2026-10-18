# Quran Studio — Marketing Site

Astro marketing + download site for [Quran Studio](https://github.com/DashingMZA/quran-studio).

**Single source of truth:** `src/config/site.ts`  
Edit URLs, SEO, socials, GA, verification codes, and the latest release there — the whole site updates.

## Stack

- **Astro 7** (static)
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- TypeScript
- PWA-ready (`manifest.webmanifest`)
- **Cloudflare Workers** static assets (`wrangler.jsonc`)
- **Vercel** static (`vercel.json`)

## Develop

```bash
pnpm install
pnpm dev
```

Requires **Node.js 24+** and **pnpm 12.9.1** (see `packageManager`).

## Build & test

```bash
pnpm build
pnpm preview
pnpm test          # types + build + internal link check
```

## Update latest release

1. Open `src/config/site.ts`
2. Update `LATEST_RELEASE` (version, tag, publishedAt, download URLs)
3. Rebuild

## Deploy

### Cloudflare Workers (static assets)

```bash
pnpm deploy:cf
# or: pnpm build && npx wrangler deploy
```

Config: `wrangler.jsonc` → serves `./dist` with SPA-style 404 handling.

### Vercel

Connect the GitHub repo in the Vercel dashboard, or:

```bash
pnpm build
# framework auto-detected; vercel.json sets build/output
npx vercel --prod
```

Any other static host can serve the `dist/` folder.
