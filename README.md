# ajishpradeep.github.io

The personal site of **Pradeep Rajasekar** (also known as Ajish Pradeep), AI Research Engineer —
3D computer vision, on-device inference and agentic LLM systems.

A static React site. No backend, no runtime secrets, no third-party runtime dependencies.

## Stack

- **React 18 + TypeScript**, routed with React Router
- **Vite** for build
- **Tailwind CSS** over a small set of CSS custom properties in `src/index.css`
- **lucide-react** for icons
- Deployed to **GitHub Pages** by `.github/workflows/deploy.yml` on push to `main`

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
scripts/postbuild.mjs      emits a real page per route + 404.html + sitemap.xml
public/                    Resume.pdf, profile_pic.png, favicon, robots.txt, service-worker tombstone
src/
  data/                    all site copy — the source of truth for content
    site.ts                name, role, location, links, headline figures
    work.ts                case studies (the long-form writing)
    impact.ts              externally corroborated milestones, with sources
    research.ts            papers, posters, in-progress work
    lab.ts                 personal repositories
    about.ts               biography and timeline
    domains.ts             the four capability areas
  components/              section and interactive components
  pages/                   Home, About, CaseStudy, NotFound
```

**Copy lives in `src/data/`, not in components.** That is deliberate: it keeps the writing
reviewable in one place and keeps a future zh-TW translation possible.

## Content rules

Two rules govern what may appear on this site:

1. **Every claim carries its source.** No figure, award, or affiliation appears without a real
   reference. `src/data/impact.ts` keeps the externally corroborated record separate from personal
   account, and labels which is which — the public record credits organisations, and this site does
   not blur that into individual credit.
2. **Nothing is fabricated.** There are no testimonials, client names, or invented metrics, and
   their absence is intentional.

## Routing on GitHub Pages

Pages has no SPA rewrite rule. Rather than relying only on a `404.html` fallback — which renders
correctly but answers with an HTTP 404 status, so crawlers drop the URLs — `scripts/postbuild.mjs`
writes a real `index.html` for every route the sitemap advertises, each with its own title,
description and canonical URL. `404.html` remains as the catch-all for unknown paths.

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
