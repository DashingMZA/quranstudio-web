# Quran Studio — Marketing Site

Astro marketing + download site for [Quran Studio](https://github.com/DashingMZA/quran-studio).

**Single source of truth:** `src/config/site.ts`  
Edit URLs, SEO, socials, GA, verification codes, and the latest release there — the whole site updates.

## Stack

- Astro 5 (static)
- Tailwind CSS
- TypeScript
- PWA-ready (`manifest.webmanifest`)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Update latest release

1. Open `src/config/site.ts`
2. Update `LATEST_RELEASE` (version, tag, publishedAt, download URLs)
3. Rebuild

## Deploy

Any static host (Vercel, Cloudflare Pages, Netlify, GitHub Pages).  
Set the site URL in `astro.config.mjs` / `site.ts` if needed.
