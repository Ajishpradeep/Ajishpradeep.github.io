# ajishpradeep.com

The personal site of **Pradeep Rajasekar** (also known as Ajish Pradeep), AI Research Engineer —
3D computer vision, on-device inference and agentic LLM systems.

A static React site. No backend, no runtime secrets, no third-party runtime dependencies.

## Stack

- **React 18 + TypeScript**, routed with React Router
- **Vite** for build
- **Tailwind CSS** over a small set of CSS custom properties in `src/styles/index.css`
- **lucide-react** for icons
- Deployed to **Cloudflare Workers** (static assets, config in `wrangler.jsonc`) by
  `.github/workflows/deploy.yml` on push to `main`; live at <https://ajishpradeep.com>

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # typecheck, build, then emit route pages + sitemap
npm run preview
npm run lint
```

No environment variables are required. If you have a `.env` from an older version of this site,
it is no longer read by anything.

## Layout

```
index.html                 document shell, JSON-LD, <noscript> fallback
wrangler.jsonc             Cloudflare Workers config (assets dir, 404 handling, custom domain)
scripts/postbuild.mjs      emits a real page per route + 404.html + sitemap.xml
public/                    Resume.pdf, portrait.jpg, favicon, robots.txt, _headers, service-worker tombstone
src/
  app/                     composition root — App shell, router, error boundary
  pages/                   route-level components: Home, About, Resume, CaseStudy, NotFound
  sections/                page-section components, each used on exactly one page
  shell/                   persistent site-wide UI mounted in App.tsx: Nav, Footer, Dock,
                           CommandDeck, SectionRail — not page content
  motion/                  generic, content-agnostic animation primitives
  data/                    all site copy — the source of truth for content
    site.ts                name, role, location, links, headline figures
    seo.json               canonical origin + per-page title/description (read by the build and at runtime)
    work.ts                case studies (the long-form writing)
    impact.ts              externally corroborated milestones, with sources
    research.ts            papers, posters, in-progress work
    lab.ts                 personal repositories
    about.ts               biography and timeline
    resume.ts              on-screen and PDF resume content
  hooks/                   shared React hooks
  lib/                     shared utilities (cn, motion, variants, emphasis)
    resume/                resume-specific PDF generation (resumePdf.tsx, downloadResumePdf.ts)
  styles/                  index.css, fonts.css
  main.tsx                 Vite entry point
```

Cross-folder imports use the `@/` alias (`@/data/site`, `@/sections/Hero`, …), configured in
`vite.config.ts` and `tsconfig.app.json`. Only same-folder sibling imports stay relative
(`./NotFound` from another file in `pages/`).

**Copy lives in `src/data/`, not in components.** That is deliberate: it keeps the writing
reviewable in one place and keeps a future zh-TW translation possible.

## Hosting, routing and search

The site is an assets-only Cloudflare Worker: no server code, static requests are free and
unlimited, and there is room to add a Worker script later (blog API, chatbot, Cloudflare Access
for a private area) without changing hosts.

Rather than a single-page-application rewrite — which answers every unknown URL with a 200 and
shows up in Search Console as soft 404s — `scripts/postbuild.mjs` writes a real `index.html` for
every route the sitemap advertises, each with its own title, description and canonical URL, and
`wrangler.jsonc` serves `404.html` with a real 404 status for anything else. Sitemap `<lastmod>`
dates come from git history, not the build clock. `src/hooks/useDocumentHead.ts` keeps title,
description and canonical in sync on client-side navigation.

Manual deploy: `npx wrangler login` once, then `npm run build && npx wrangler deploy`.

## Accessibility

WCAG 2.1 AA is treated as a requirement. In particular: every animation and simulation has a
`prefers-reduced-motion` path, auto-advancing content has a pause control, all interactive elements
are keyboard-reachable with visible focus, and contrast is checked against AA including the
non-text 3:1 threshold for control boundaries.

## A note on the service worker

`public/service-worker.js` is a tombstone. An earlier version of this site registered a cache-first
worker that precached files which no longer exist; the tombstone unregisters it and clears its
caches. Nothing in the app registers a service worker. It can be deleted once stale registrations
have aged out.

## Contact

- ajishpradeep@gmail.com
- [linkedin.com/in/ajishpradeep](https://linkedin.com/in/ajishpradeep)
- [github.com/Ajishpradeep](https://github.com/Ajishpradeep)
