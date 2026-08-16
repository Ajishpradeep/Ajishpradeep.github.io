# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, all confirmed as primary, arriving with very different amounts of patience:

- **Research hiring managers** — leads at AI labs and research teams evaluating depth. They read the case studies end to end, and the thing they are actually assessing is the reasoning about failure modes, not the headline numbers. They spend real time.
- **Recruiters screening fast** — non-technical or semi-technical screeners with 30–60 seconds. They need role, headline figures, location, and the resume without hunting.
- **Industry collaborators and clients** — sports-tech, retail, and manufacturing partners deciding whether this person can build something for them. They care about systems that shipped and what happened after they shipped.

A fourth group — peers and conference contacts arriving from GTC, a paper, or GitHub — is real but not a design constraint; the research entries and Lab repos already serve them.

The site must work for the 30-second read and the 20-minute read without either one being the compromised version.

## Product Purpose

A personal site for Pradeep Rajasekar, AI Research Engineer, that makes an inbound conversation worth starting and confirms credibility for visitors who arrived from somewhere else.

Two success conditions, both confirmed:

1. **Inbound role conversation** — an email or LinkedIn message about a research or engineering position, sent because the site made it worth sending.
2. **Credibility confirmed** — a visitor who arrived via a referral, a CV, or a talk leaves certain the person is real and serious. Much of the traffic is not cold; the site is frequently the second touch, not the first.

Resume downloads and collaboration or speaking enquiries are welcome outcomes but not what the site is optimised for.

## Positioning

The work sits where a research architecture stops being a paper and becomes something a person depends on — and the differentiating claim is about a specific class of problem found there: a model that validates beautifully while being quietly broken in a way its own metric cannot see.

The stated technical position: 3D computer vision where the mathematics is explicit and the physics is enforced — multi-view geometry, constrained optimisation, and anatomical priors compiled into the network itself, so output is physically possible by construction rather than merely plausible.

The foundation is mathematical rather than domain-specific, deliberately: generative models → retail vision → 3D biomechanics → agentic LLM systems, without starting over. That mobility is part of the claim.

## Operating Context

Visitors evaluate through documents and processes the site feeds rather than replaces: an internal ATS or hiring thread, a forwarded resume PDF, a LinkedIn profile, a GitHub account. The site is one artifact inside somebody else's evaluation workflow, and is often opened alongside a CV that already made the same claims.

Based in New Taipei City, Taiwan; open to relocation. Currently at IdeasLab Formosa.

## Capabilities and Constraints

**Hard technical constraints:**

- **Fully static, deployed to GitHub Pages** via `.github/workflows/deploy.yml` on push to `main`. No serverless functions and no runtime secrets. An earlier version of the site had a Netlify config, `netlify/functions/`, and a Gemini-powered terminal — all since removed; future work must not reintroduce a runtime backend dependency.
- **No SPA rewrite on Pages** — the build copies `index.html` to `404.html` to serve client routes.
- **Bilingual EN / zh-TW is future work, not current scope.** Not required now, but design and implementation must not make it impossible: keep copy in `src/data/*.ts`, keep text out of images, and leave layouts tolerant of denser CJK line lengths and different line-break behaviour.

**Content constraints:**

- Copy lives in typed data modules under [src/data/](src/data/) — site, work (case studies), research, impact, lab, about, domains, resume — and is authored, not templated.

## Brand Commitments

- **Both names, deliberately.** *Pradeep Rajasekar* is the professional name and leads the site; *Ajish Pradeep* is the handle people search, and it is the GitHub account, the domain (`ajishpradeep.github.io`), and the schema.org `alternateName`. Future work must keep both legible together rather than suppressing either.
- Voice is first-person, plainly stated, and unhedged — technical claims are made precisely and failures are described directly. Copy in [src/data/about.ts](src/data/about.ts) is the reference for register.
- Assets: `public/profile_pic.png` (portrait), `public/Resume.pdf`, `public/favicon.svg`.

## Evidence on Hand

Real and verified, in the repository:

- **Case studies** — [src/data/work.ts](src/data/work.ts): markerless 3D motion capture on-device (8cm → 3cm mean per-joint error, 240fps on Apple ARM via CoreML, 0.000px body drift vs. the base model), retail planogram compliance, and further studies with problem framing, sections, and outcomes.
- **Impact dossier** — [src/data/impact.ts](src/data/impact.ts): milestones carrying independent public sources, including the TAITRA "Go Healthy with Taiwan" 2025 win (1 of 3 from 638 proposals across 55 countries) and Taiwan Expo Europe 2026 exhibitor listing. Every figure quoted was read from an attached source.
- **Research** — [src/data/research.ts](src/data/research.ts): NVIDIA GTC 2025 technical poster, MSc thesis on content- and spatial-aware generative inpainting, in-progress KAN inference work.
- **Lab** — [src/data/lab.ts](src/data/lab.ts): personal repositories verified against each project's own README. Forks, tutorial follow-alongs, and empty repos are deliberately excluded.
- **Résumé** — `Pradeep_Rajasekar_Resume_Research_Engineering.md` and `public/Resume.pdf`.

**The sourcing rule is binding and generalises beyond the dossier:** no number, award, or affiliation appears without a real source. Where the public record credits an organisation rather than an individual, the personal contribution is stated in a separately labelled field so the two are never blurred. Do not fabricate testimonials, client names, metrics, or endorsements — there are none on hand, and their absence is deliberate.

## Product Principles

1. **Two reading speeds, one artifact.** The 30-second scan and the 20-minute read are both first-class. Neither may be served by degrading the other.
2. **Claims carry their receipts.** Verified record and personal account are visibly different things. A figure without a source does not ship.
3. **Depth is the differentiator, and it must be reachable.** The reasoning about invisible failure modes is the strongest asset; it cannot be buried under summary.
4. **Second touch, not first.** Assume the visitor already saw the CV. The site earns its place by adding what a CV structurally cannot.
5. **Static and self-contained.** No runtime dependency the visitor's network or a vendor can take away.

## Accessibility & Inclusion

**WCAG 2.1 AA is a hard requirement**, not an aspiration: AA contrast ratios, full keyboard operability, and honoured `prefers-reduced-motion`. This binds the motion-heavy elements of the site in particular — animated diagrams, the capability graph, canvas backgrounds, and reveal-on-scroll behaviour must each have a reduced-motion path and must never be the sole carrier of information.
