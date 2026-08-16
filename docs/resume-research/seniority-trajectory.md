# Seniority and trajectory: what level does he actually map to, and what is next

> **CORRECTION (2026-08-16), added after this file was written.** This file
> states that Helsing's *AI Research Engineer, Computer Vision (3D)* variant is
> SLAM/VIO/NeRF-gated and therefore excludes him. `market-demand-2026.md`
> re-read the live posting text and found that overstated: the requirement is
> "localisation, scene matching, **or** 3D reconstruction", followed by an OR
> across five techniques (learned feature matching / visual place recognition /
> SLAM / VIO / NeRF) plus "domain adaptation **or** model compression" — and he
> has 3D reconstruction and model compression. PhD and publications are
> nice-to-have there, not required. **Helsing is not gated against him.** Treat
> the SLAM-as-hard-blocker framing below as superseded.

**Scope.** This document answers the *level* question only. The *title taxonomy* question is
settled in `title-positioning.md` (Research Engineer track, no *Scientist*, no bare *AI
Engineer*) and is taken as given here. Where the two documents touch — the "avoid Senior"
recommendation — §6 resolves it explicitly.

**Method.** The core of this research is primary hiring data, not commentary. Three original
datasets were built for it:

1. **573 European engineering/science job postings** pulled in full text from the Greenhouse
   job-board API across 30 named employers operating in Europe (Helsing, Wayve, NavVis,
   PhysicsX, Graphcore, Isomorphic Labs, Black Forest Labs, Doctolib, Adyen, Monzo, N26,
   Celonis, GetYourGuide, HelloFresh, Cognite, Kinexon, Vay, Trustpilot, Veriff, Wise,
   Raisin, Solarisbank, Contentful, Lovable, Together AI, Fivetran, Lightmatter, dunnhumby,
   Nothing, Stability AI). Filtered to European locations and engineering/science titles.
2. **A US-vs-Europe comparison inside a single company** — 299 Amazon postings in the
   Applied Scientist and Machine Learning families, pulled from `amazon.jobs/search.json`,
   split by country.
3. **Verbatim requirement text** from the specific postings that are on-target for this
   candidate (Helsing *AI Research Engineer – 3D Computer Vision*, NavVis *Senior ML
   Engineer – Semantic Spatial AI*, PhysicsX's four-level ML ladder, GitLab's published ML
   job family).

Everything is dated August 2026. Postings churn; the URLs are given so claims can be
re-checked.

---

## 1. How European employers actually level

### 1.1 The single most important structural fact: Europe does not gate on year counts

**71% of European postings state no numeric years-of-experience requirement at all.**

| Title tier (European postings, n=573) | Total | Stating **no** numeric years |
|---|---|---|
| Unmarked (no seniority word) | 196 | 154 (79%) |
| Senior | 192 | **135 (70%)** |
| Staff | 54 | 40 (74%) |
| Lead | 39 | 28 (72%) |
| Principal | 21 | 11 (52%) |
| Manager | 31 | 18 (58%) |
| Junior / Associate | 7 | 2 |
| Intern / Graduate | 7 | 7 |

Restricting to the AI/ML/CV/research subset (n=115), **81 of 115 (70%)** state no number.

This is not an accident of drafting. **Acas** — the UK's statutory Advisory, Conciliation and
Arbitration Service, whose guidance is the reference employers use to stay inside the
Equality Act 2010 — advises employers that requiring a specific number of years' experience
in an advert risks **indirect age discrimination**, and recommends stating the *type* of
experience instead:

> "A job advert for a salesperson that says applicants must have spent 10 years working in
> retail could be discriminating indirectly because of age. This is because the advert
> excludes younger people who might have the skills and qualifications needed."
> — Acas, *Age discrimination: key points for the workplace* / *Types of age discrimination*

The equivalent exposure exists across the EU under Council Directive 2000/78/EC (equal
treatment in employment, age as a protected ground; in Germany implemented as the AGG).

The effect is visible **inside a single company**, holding the job family constant:

| Amazon postings, Basic Qualifications | n | % stating a numeric "N+ years" |
|---|---|---|
| Applied Scientist — United States | 134 | **84%** |
| Applied Scientist — Germany | 7 | **14%** |
| Applied Scientist — United Kingdom | 8 | **13%** |
| Machine Learning — United States | 142 | **87%** |
| Machine Learning — Germany | 2 | 50% |
| Machine Learning — United Kingdom | 6 | **0%** |

Same employer, same job family, same global levelling ladder internally — and the numeric
year requirement all but vanishes on the European side. (European n is small and should be
read as directional, but it points the same way as the independent 573-posting corpus.)

Compare the wording directly:

- Amazon **Applied Scientist, Seattle**: "PhD, or Master's degree **and 4+ years** of CS, CE,
  ML or related field experience".
- Amazon **Applied Scientist, Luxembourg**: "PhD, **or a Master's degree and experience** in
  CS, CE, ML or related field." — the number is simply deleted.
- Amazon **Applied Scientist, Advertising, London**: "PhD, **or a Master's degree and
  experience** in CS, CE, ML or related field research."

**What this means for him.** In the European market the year count is not the gate; the
demonstrated *scope and type* of experience is. A CV strategy built on winning a year-count
argument is optimising for a filter that most European postings do not run. A CV strategy
built on demonstrating scope is optimising for the one they do.

### 1.2 Where a number *is* stated, this is the European ladder

From the 573-posting corpus, minimum years stated by title tier:

| Tier | n (with a number) | Median | Mean | Range |
|---|---|---|---|---|
| Junior / Associate | 5 | 1 | 1.0 | 1–1 |
| **Unmarked** | 42 | **3** | 3.8 | 1–8 |
| **Senior** | 57 | **5** | 5.2 | 2–10 |
| Lead | 11 | 5 | 4.8 | 1–8 |
| Staff | 14 | 8 | 6.8 | 2–10 |
| Principal | 10 | 9 | 7.6 | 3–10 |
| Manager | 13 | 5 | 5.4 | 3–10 |

Distribution inside "Senior" (n=57): 2 yrs ×2, 3 yrs ×8, 4 yrs ×2, 5 yrs ×27, 6 yrs ×6,
7 yrs ×6, 8 yrs ×5, 10 yrs ×1. **21% of European Senior-titled postings that state a number
ask for 4 years or fewer.** The mode is 5, but the left tail is real and it is not junk —
it includes PhysicsX London, GetYourGuide Berlin, Kinexon Munich and Wayve London.

(Caveat on the automated extraction: the minimum-year figure is the smallest experience
number in the posting, which occasionally picks up a secondary requirement — e.g. Doctolib
*Senior AI Engineer*, Nantes reads "4+ years as a software engineer" primary and "2+ years
with Python" secondary; the table records 2. The hand-verified examples cited elsewhere in
this document use the primary requirement.)

### 1.3 Europe does not use L3/L4/L5, but the underlying bands are the same

The premise that European employers band differently from US ladders is **half right**.
What differs is the *surface*, not the *structure*:

- The public, US-originated ladders converge on the same shape: **Monzo** (UK) runs six
  levels with Senior at level 4; **Dropbox** runs IC1–IC7 with no "Senior" title word at all
  (IC1–IC4 are all "Software Engineer", IC5 is Staff); **GitLab** runs Associate →
  Intermediate → Senior → Staff → Manager. Titles differ; the scope steps do not.
- European scale-ups increasingly level against **compensation-benchmarking frameworks**
  rather than home-grown ladders — Ravio's IC track (P1–P6) and management track (M1–M5) is
  the most widely used in European tech, because benchmarking requires a shared level
  vocabulary across companies. *(Ravio is a European compensation-benchmarking firm sourcing
  data directly from customers' HR systems; their level definitions were not directly
  retrievable during this research — the site returned HTTP 429 — so this is reported from
  their published blog summaries and carries lower confidence than the posting data.)*
- **US big tech EU offices use the global ladder unchanged.** Amazon Berlin/London/Luxembourg
  Applied Scientist postings carry the same Basic Qualifications template as Seattle, with
  the year figures stripped for the legal reason in §1.1. The internal level is identical.

**Consequence:** the same title means materially different things at different European
employers, and there is no European-wide level standard to appeal to. This is why the
recommendation in §5 is stated as *two tracks*, not one.

### 1.4 The "unmarked title" is a distinct European hiring pattern, and it is his best route

196 of 573 European postings (34%) carry no seniority word at all. Two variants matter:

- **Level-agnostic postings that level in interview.** Isomorphic Labs, *ML Research
  Engineer, London*: "**We are looking for Research Engineers with different levels of
  experience — Mid through to Senior, Staff, Principal or equivalent levels.**" One posting,
  four levels, level assigned after the loop.
- **Research Engineer postings with no experience requirement at all.** Helsing's entire
  European *AI Research Engineer* family (3D Computer Vision, Computer Vision, Foundation
  Models, ML Engineering, RL, Robotics — Berlin/London/Munich/Paris) states **no years
  figure anywhere**; the requirement is "Hold an MSc in computer science, machine learning,
  robotics, or a closely related field". Graphcore's *AI Research Engineer* (Bristol/
  Cambridge/London): "Master's, PhD **or equivalent experience** in a technical discipline".
  Black Forest Labs (Freiburg) uses *Member of Technical Staff — Research Engineer* with no
  level and no years.

This confirms and extends `title-positioning.md`: the Research Engineer track in Europe does
not gate on publications **and does not gate on tenure either**. It is the one title family
where his ~3 years cannot be used against him at the filter stage, because no filter is
stated.

---

## 2. Does pre-MSc software engineering count? — the decisive question, with posting evidence

**Answer: it counts, but only for titles whose head noun is *Engineer*. It does not count for
titles whose head noun is *Scientist*, and it does not count where the posting explicitly
resets the clock at graduation. This is not a grey area — European employers state which
clock they are running, and the tell is the title.**

### 2.1 Evidence that engineering years count — the two-clock postings

The strongest evidence is postings that state **both** clocks in one requirement:

> **dunnhumby, Senior AI Engineer** — "**8+ years of software engineering experience,
> including 3+ years building production AI/ML applications**"

That is his profile almost exactly: ~7–8 years since 2017 in professional engineering,
~3 years of production AI/ML. This is the cleanest single match found in the entire corpus.

> **Doctolib, Senior AI Engineer (x/f/m), Nantes** — "Have **4+ years of experience as a
> software engineer**, with hands-on experience in AI/ML systems"
>
> **Doctolib, Senior AI Engineer, Phone Assistant, Berlin** — "You have **6+ years of
> experience as a software engineer**, with significant experience using Python"
>
> **Doctolib, Senior/Staff AI Engineer, Milan** — "Have **4+ years of experience as a
> software engineer**, with hands-on experience in AI/ML systems"

> **Cognite, Applied AI Engineer, Oslo** — "You have **3+ years of relevant experience in
> software engineering, AI solution architecture, or similar roles**"

> **Amazon, Applied Scientist (US template)** — "PhD, or Master's degree and **4+ years of
> CS, CE, ML or related field experience**" — note *CS, CE, **or** ML*: general computer
> science and computer engineering experience is explicitly inside the count.

> **NavVis, Senior Software Engineer, 3D Perception (C++ and Python), Munich** — "**5–10
> years of professional experience as a Software Engineer**"
> (https://job-boards.eu.greenhouse.io/navvis/jobs/4809045101)

### 2.2 Evidence that engineering years do **not** count — the ML-only clock

The same companies switch clocks when the title switches noun:

> **Doctolib, Senior Machine Learning Engineer — Applied AI & LLMs, Paris** — "You have **7+
> years of experience in Machine Learning, Deep Learning, or AI Engineering**"
>
> **Doctolib, Senior Staff Machine Learning Engineer — Clinical, Paris** — "**10+ years in
> ML/AI** with 3+ years at Staff+ or Principal level"

> **Helsing, Machine Learning Engineer, Detection and Tracking** — "Have **5+ years of
> experience in applied machine learning or computer vision**"

> **Adyen, Senior Machine Learning Scientist, Amsterdam** — "You have **5+ years of
> experience as a machine learning or data scientist**"

> **NavVis, Lead Machine Learning Engineer — Geometric Spatial AI, Munich** — "**5–7+ years
> of hands-on experience applying machine learning and deep learning** to point cloud
> processing, filtering, registration, or surface reconstruction"
> (https://job-boards.eu.greenhouse.io/navvis/jobs/4931997101)

**The pattern replicates across four independent companies (Doctolib, NavVis, Helsing,
Adyen) and is stated inside single companies' own posting sets.** It is the most reliable
finding in this document:

| Title head noun | Which years the posting counts | His number |
|---|---|---|
| *AI Engineer* / *Applied AI Engineer* / *Software Engineer* | Software engineering years, ML as a qualifier | **~7–8** |
| *Machine Learning Engineer* / *ML Scientist* / *Applied Scientist* | ML/DL years only | **~2.6–3** |
| *Research Engineer* (Helsing, Graphcore, Isomorphic, BFL) | **Neither — no number stated** | n/a |

### 2.3 The hardest counter-evidence: postings that reset the clock at graduation

**PhysicsX** (London deep-tech, ML for engineering simulation) runs the clearest published
level ladder found in Europe, and it counts years **post-degree, explicitly**:

| PhysicsX title (London / NY / Singapore) | Stated requirement |
|---|---|
| ML Software Engineer, Research (London) | "Ideally >2 years of experience in a data-driven role **in a professional setting**" |
| Machine Learning Engineer (NY / SF) | "at least **2 years industry experience (post Masters or PhD)** in a commercial, non-research environment" |
| Machine Learning Engineer (Singapore) | "at least **3 years industry experience (post Masters or PhD)**" |
| **Senior** Machine Learning Engineer (London / NY) | "**at least 3 years industry experience (post Masters or PhD)** in a commercial, non-research environment, you're ready to not only execute but also lead and mentor others" |
| **Senior** ML Software Engineer, Research (London) | "**4 years** of experience in a data-driven role **in a professional industry** setting" |
| **Principal** Machine Learning Engineer (Singapore) | "at least **5 years industry experience (post Masters or PhD)**" |

"(post Masters or PhD)" is an explicit instruction to discard the pre-MSc years. Under
PhysicsX's rule his clock reads ~2 years 7 months, against a Senior bar of 3. He is a hair
under — but the accompanying clause ("ready to not only execute but also lead and mentor
others") is a scope test he passes.

**Amazon's senior bar is the other hard wall.** *Sr. Applied Scientist — Computer Vision*:
"4+ years of building machine learning models for business application" **and** "PhD, **or
Master's degree and 6+ years of applied research experience**". He does not reach 6.

### 2.4 The regulatory analogue — Europe *does* treat engineering experience as substitutive

Germany's Residence Act §18g(2) permits an EU Blue Card for **IT specialists with three
years of relevant professional IT experience in the last seven years and no university
degree at all**, treating that experience as a "comparable qualification" to a degree at the
lower shortage-occupation salary threshold (€45,934.20 for 2026). This is the clearest
statement of the European principle: *relevant professional experience substitutes for
formal credentials, provided it is relevant to the role offered.* He has both the degree and
the experience; the point is that the direction of European practice is substitutive, not
subtractive.

### 2.5 What to actually do with the pre-MSc years

1. **Never write a single aggregate number.** "8 years of experience" invites the reader to
   ask "of what?", and the answer differs by posting (§2.2). It also does not survive
   arithmetic: 2017–2021 (~4 yrs) + Nov 2023–Aug 2026 minus the 2025 gap (~2 yrs 7 mo) =
   **~6.5–7 years of employment**, ~9 years elapsed since career start. "~8 years" is
   defensible only if the MSc is counted as professional time, which a European reader will
   not assume. **Verify the exact 2017 and 2021 months before any number is written down.**
2. **Let month-precision dates carry it.** A European CV lists MM/YYYY for every entry
   (`european-market.md`). A reader who wants the total computes it and gets the honest
   figure; a reader who does not, doesn't. This is also the ATS-safe choice, since the 70%
   of European postings that state no year figure are not parsing for one.
3. **Keep AIBS on the CV, compressed to 2–3 lines, and framed as production-systems
   ownership, not as ERP.** Its value is not "four more years of AI" — it is the thing that
   makes "shipped a 3D pipeline running entirely on a phone" credible rather than lucky. In
   the two-clock postings of §2.1 it is *literally the requirement*.
4. **Match the clock to the posting.** When applying to an *AI Engineer* / *Applied AI
   Engineer* / *Software Engineer* role, the cover letter says "eight years building
   production systems, the last three in applied AI." When applying to a *Machine Learning
   Engineer* / *Applied Scientist* role, the cover letter never mentions eight, and leads
   with scope: 3D pose pipeline shipped on-device, 8 cm → 3 cm MPJPE, regression-free
   adapter verified by weight diff.

---

## 3. Mid vs Senior for a research/applied IC in CV/ML — the published criteria

### 3.1 GitLab — the only credible **ML-specific** published ladder found

GitLab's handbook is fully public and versioned, and the Machine Learning Engineering job
family states requirements per level verbatim
(https://handbook.gitlab.com/job-families/engineering/development/data-science/machine-learning/):

| Level | Requirement (verbatim) |
|---|---|
| Associate ML Engineer | "1 or more years of experience in ML, **or** a Master's or PhD degree with a focus on Machine Learning" |
| ML Engineer (Intermediate) | "2 or more years of experience in ML, **or** a Master's or PhD degree with a focus on Machine Learning" |
| **Senior ML Engineer** | "**3 or more years of experience in ML, or a Master's or PhD degree with a focus on Machine Learning**" |
| Staff ML Engineer | "5 or more years of experience in ML, **or a PhD** degree with a focus on Machine Learning" |

Two things to read carefully. First, **at Senior the Master's is an alternative to the years,
not an addition** — "3 or more years in ML, *or* a Master's or PhD with a focus on Machine
Learning". His MSc (EECS, National Taipei University of Technology, GPA 3.8, thesis on GAN
inpainting with contextual and spatial attention) satisfies that branch on its own, and he
also independently satisfies the years branch to within a few months. Second, **at Staff the
Master's stops working** — the degree branch narrows to PhD only. That is the wall, and it
is where the publication/PhD problem from `credibility-artifacts.md` finally bites.

The behavioural difference GitLab attaches to Senior vs Intermediate:

| Intermediate | Senior |
|---|---|
| "Solve technical problems of **moderate** scope and complexity" | "Solve technical problems of **high** scope and complexity" |
| "**Craft** code that meets our internal standards … Maintain and advocate for these standards through code review" | "**Help to define and improve our internal standards** for style, maintainability, and best practices" |
| "Collaborate … **as a machine learning specialist**" | "Collaborate … **as a specialist and subject matter expert** in machine learning" |
| "Confidently ship **small** features and improvements with **guidance and support**" | "Confidently ship **moderately sized** features with **minimal guidance**" |
| — | "**Exert influence on the overall objectives and long-range goals of your team**" |

**"Help to define and improve our internal standards" is the Senior line, and he has done
exactly that** — he authored his organisation's AI coding standards. That is not a soft
claim; it is the literal wording of the Senior criterion in a published ladder.

### 3.2 Monzo — the behavioural ladder, with zero year criteria

Monzo publishes its Engineering Progression Framework in full
(https://github.com/monzo/progression-framework, v4.1 dated 15/09/2025). Six levels; Senior
is level 4. Five dimensions: Mastery, Impact, Influence, Comms & Feedback, Leadership.
**There is not one years-of-experience criterion anywhere in the framework.** Level 4
criteria, verbatim, with his evidence against each:

| Monzo L4 (Senior) criterion | His evidence |
|---|---|
| Impact: "**Solves ambiguous problems**" | 3D pose from 2D lifting under phone compute budget; open-set recognition with metric learning |
| Impact: "**Leads writing small/medium scope proposals**" | **Sole author** of the winning TAITRA proposal — 1 of 3 winners from 638 proposals, 55 countries |
| Influence: "**Drives changes to engineering practices with well-reasoned arguments**" | Authored the organisation's AI coding standards |
| Influence: "Shapes the direction of systems designs with less experienced engineers" | Mentors the engineering team; titled R&D lead on projects |
| Leadership: "**Helps the growth of engineers around them through coaching and mentoring**" | Mentors the engineering team |
| Comms: "Shares technical context and direction for less experienced engineers" | Same |
| Mastery: "Identifies and fixes performance bottlenecks"; "Writes code that serves as a definitive example for new engineers" | Core ML / TensorRT / DeepStream / quantisation; full 3D pipeline on-device |

And one that sits a level **above**:

| Monzo L5 (Staff) criterion | His evidence |
|---|---|
| Influence: "**Represents Monzo at conferences/events**" | NVIDIA GTC 2025 technical poster (peer-selected by content committee); selected to represent engineering at Taiwan Expo Europe 2026 |

Where he does **not** reach L5: "Solves the 'hard problem' in a project … and sees it through
to resolution" at platform scale, "Leads incident resolutions", "Bootstraps new teams",
"Owns technical decisions with high risk and low reversibility" across a squad. His scope is
project-deep, not organisation-wide.

**Read against the only published behavioural framework with a Senior definition, he is a
clean level 4 with two level-5 influence markers.** That is the strongest single piece of
evidence for a Senior claim in this entire document, and it does not depend on tenure at all.

### 3.3 What named practitioners say

**Will Larson** — former CTO of Calm, engineering leadership at Stripe, Uber and Digg; author
of *An Elegant Puzzle* and *Staff Engineer: Leadership beyond the management track*
(https://staffeng.com/book/), verbatim:

> "At most technology companies, you'll reach Senior Software Engineer, **the career level**
> for software engineers, **in five to eight years**. At that career level, you'll no longer
> be required to work towards the next promotion, and being promoted beyond it is
> exceptional rather than expected."

This is the honest counterweight and it should not be softened. Larson's five-to-eight is
measured in *engineering* years, not ML years — on that clock he is at ~7 and inside the
band; on the ML clock he is at ~3 and outside it. **Which clock applies is exactly the §2.2
title question, which is why the title he applies under determines whether Senior is a
stretch or a fit.**

**Honest gap:** no credible ML-specific *practitioner* essay on the mid→senior transition was
found. Searches on this returned almost exclusively SEO listicles (Zippia, CareerKarma,
Coursera, 4dayweek, KORE1, Noble Desktop) which are excluded by the source bar. GitLab's
published family (§3.1) is the substitute, and it is a better source anyway — it is an
employer's own binding definition rather than commentary.

### 3.4 Synthesis — the four things that move mid → senior in CV/ML

Every credible source above reduces to the same four, none of which is tenure:

1. **Ambiguity absorption** — is the problem handed to you scoped, or do you scope it?
   (Monzo L4 "solves ambiguous problems"; GitLab "high scope and complexity"; Wayve Staff
   "pathfinding in ambiguous problems".)
2. **Standard-setting** — do you follow the team's practices, or define them? (GitLab Senior
   "help to define and improve our internal standards"; Monzo L4 "drives changes to
   engineering practices".)
3. **Force multiplication** — does the work of others improve because of you? (Monzo L4
   coaching/mentoring; PhysicsX Senior "ready to not only execute but also **lead and mentor
   others**".)
4. **Production reliability under constraint** — Helsing's repeated phrasing: "you have
   iterated on models **beyond benchmarks** and understand what it takes to make these
   systems reliable under real-world data distributions and deployment constraints."

He has documented evidence for all four. What he lacks is **duration** and **externally
attributable scale** — see §7.

---

## 4. His arithmetic, stated precisely

| Period | Duration | Counts toward |
|---|---|---|
| 2017–2021, AIBS Software Solutions (India) | ~4 yrs | Software engineering clock only |
| 2021–2023, MSc EECS, NTUT (thesis: GAN inpainting) | 2 yrs | Degree branch of GitLab/Amazon/Helsing requirements; *research* experience at Bosch-style "PhD or Master's + 3 years" postings |
| Nov 2023 – Feb 2025, President Information Corp | ~1 yr 4 mo | Both clocks |
| Mar – Apr 2025 | gap (§6) | — |
| May 2025 – Aug 2026, IdeasLab Formosa | ~1 yr 4 mo | Both clocks |

- **AI/ML industry experience: ~2 yrs 7 mo** (~2.6). Rounds to "approaching three years",
  not "three years" — and PhysicsX-style postings count exactly this number.
- **Professional engineering employment: ~6 yrs 7 mo.** Elapsed since career start: ~9 years.
- **"~8 years" is not supportable as employment time.** Do not write it. Dates only (§2.5).

Longest single tenure post-MSc: 16 months. This matters and is addressed in §7.

---

## 5. Decisive recommendation: the level to claim and the titles to target

### The level

> **He maps to Senior on scope and to mid/career-level-minus-one on tenure. Target Senior;
> do not self-assign it.**

More precisely, the band splits by employer segment, and he should run **two application
tracks in parallel**:

**Track A — level-unmarked Research Engineer roles (highest expected value, apply first).**
These state no level and no years; the level is decided in the loop, where his scope
evidence competes rather than his date arithmetic. This is the single best structural fit
for his profile in Europe.

- `AI Research Engineer` — Helsing (Berlin / London / Munich / Paris) — MSc requirement,
  no years, and **edge deployment is listed as a *nice to have*, which he has strongly**.
  Note: the *3D Computer Vision* variant requires SLAM/VIO/NeRF familiarity, which is his
  stated gap — **apply to the general *Computer Vision* variant, which does not**
  (https://helsing.ai/jobs/4334842101).
- `AI Research Engineer` — Graphcore (Bristol / Cambridge / London): "Master's, PhD or
  equivalent experience".
- `ML Research Engineer` — Isomorphic Labs (London): explicitly "Mid through to Senior,
  Staff, Principal".
- `Member of Technical Staff — Research Engineer` — Black Forest Labs (Freiburg): no level,
  no years.
- `Machine Learning Software Engineer, Research` — PhysicsX (London): ">2 years in a
  professional setting" — he clears this outright.
- `Research Engineer` — imec (Leuven), Inria *ingénieur de recherche* — per
  `credibility-artifacts.md`, Master's-entry.

**Track B — Senior-titled roles where the bar is behavioural or ≤4 years (apply, do not
self-censor).** Real, currently-posted examples:

- `Senior Machine Learning Engineer — Semantic Spatial AI`, **NavVis, Munich** — "A Master's
  or PhD in a relevant field (**equivalent practical experience is equally valued**)" and
  "**Several years** of experience applying machine learning to real-world problems
  (**exceptional candidates with less experience will also be considered**)."
  (https://job-boards.eu.greenhouse.io/navvis/jobs/4835176101) — *This is the single
  best-matched Senior posting found: Munich, 3D spatial AI, point clouds and reconstruction,
  no number, explicit under-experience escape hatch.*
- `Senior Machine Learning Engineer`, **PhysicsX, London** — 3 years post-MSc.
- `Senior Machine Learning Software Engineer, Research`, **PhysicsX, London** — 4 years.
- `Senior AI/ML Ops Engineer`, **GetYourGuide, Berlin** — "3+ years building production
  systems for ML/AI at scale, and you've shipped AI/LLM-based product features end-to-end".
- `Senior AI Engineer`, **Doctolib** (Nantes / Milan) — "4+ years as a software engineer with
  hands-on experience in AI/ML systems" — the software-engineering clock, which he clears.
- `Senior AI Research Engineer`, **imec, Leuven** — "PhD **or** 5+ years of relevant
  industrial experience" (per `title-positioning.md`) — borderline; apply late in the cycle.

**Also viable, unmarked, and domain-perfect:** `Computer Vision Engineer`, `Perception
Engineer`, `3D Vision Engineer`, `Machine Learning Engineer` at NavVis, Vay, Wayve (ADAS),
Kinexon (Munich, real-time sports tracking — his President/PGA sports-vision background maps
directly), Nomagic (Warsaw).

**Do not apply to, yet:**

- Anything `Staff` or `Principal` — GitLab's Staff branch narrows to PhD-only; the European
  median for Staff is 8 years; Doctolib requires "10+ years in ML with 3+ at Staff+".
- Amazon `Sr. Applied Scientist` — "Master's **and 6+ years** of applied research experience".
- Anything containing `Scientist` — publication gate, per `title-positioning.md`.
- Helsing `Machine Learning Engineer, Detection and Tracking` — "5+ years in applied ML or CV"
  on the ML clock.
- `Senior Machine Learning Engineer` at Doctolib Paris — "7+ years in ML".

### Realistic next title

**`Senior Machine Learning Engineer` or `Senior Computer Vision / Perception Engineer` at a
European scale-up or mid-size deep-tech (NavVis, PhysicsX, GetYourGuide, Kinexon, Nomagic
tier) — or an unmarked `(AI) Research Engineer` at a frontier lab (Helsing, Graphcore,
Isomorphic, BFL), where the internal level will land at mid-to-senior.**

A Senior title at a frontier lab (Helsing, Wayve, DeepMind) or a US-big-tech EU office is a
**next-move-after-next**, reachable in 18–24 months of continued tenure at IdeasLab plus one
externally verifiable artefact under his own name (see `credibility-artifacts.md`).

---

## 6. Resolving the tension: should he claim "Senior"?

**The title/positioning agent is right, but its reasoning is right for a narrower reason than
it stated, and if generalised it would cost him the roles he should be getting.**

The correct answer separates three surfaces that the word "claim" conflates.

### 6.1 The headline — do NOT write "Senior". Confirmed.

`title-positioning.md` §6 rejects `Senior AI Research Engineer` because "he is not titled
Senior. Immediately checkable, immediately fatal." **That is correct, and the seniority
evidence in this document does not overturn it — it reinforces it, for a reason the prior
agent did not have:**

- **The headline is the one line that is cross-checked in five seconds.** A self-awarded rank
  no employer conferred, sitting above an Experience section that says *AI Research
  Engineer*, converts a *scope* argument (which he wins) into a *credibility* argument
  (which he cannot win). The prior agent's rule — *the headline title must be ≤ the employer
  title in seniority and scientific claim* — is sound and should be kept verbatim.
- **And in Europe "Senior" in a headline buys almost nothing anyway.** 70% of European
  Senior-titled postings state no years requirement (§1.1); Acas actively steers employers
  away from tenure-based screening; Monzo's and GitLab's Senior definitions contain no
  tenure criterion at all. The rank word is not what European screening runs on. So the
  trade is: near-zero recall gain, non-trivial verification risk. Bad trade on ROI alone,
  before any honesty argument.

**Keep `AI Research Engineer — 3D Computer Vision, On-Device Perception`.**

### 6.2 The titles he applies to — DO target Senior. This is where the prior agent's logic must not be extended.

The prior agent was reasoning about a *headline*. If that reasoning were carried into
*application strategy* — "don't go for Senior roles, your tenure doesn't support it" — it
would be wrong, and expensively so. The evidence:

- 70% of European Senior postings state no year requirement to fail.
- 21% of those that do ask for ≤4 years.
- The best-matched Senior posting in the corpus (NavVis Munich) explicitly invites
  under-experienced applicants: "*exceptional candidates with less experience will also be
  considered*". Helsing's Robotics SWE posting does the same: "5+ years … **or are an
  outstanding early-career candidate who can demonstrate exceptional technical ability**."
  Helsing's CV postings add: "*We encourage you to apply even if you don't meet all the
  listed qualifications; ability and impact cannot be summarised in a few bullet points.*"
- GitLab's published Senior ML Engineer bar — "3+ years in ML **or** a Master's/PhD with a
  focus on ML" — he satisfies **on both branches independently**.
- Monzo's Senior definition is purely behavioural and he meets it on every dimension (§3.2).

**Applying under a Senior-titled req while holding a non-Senior title is not a claim about
yourself. It is an application.** Nobody is deceived; the CV states his actual title and
dates. The only thing that happens is the employer decides. Not applying is the strictly
worse error, because it forfeits roles he is qualified for in exchange for avoiding a risk
that does not exist.

### 6.3 How the CV signals level without asserting rank

Through **scope nouns and verifiable artefacts**, in the bullets, using the vocabulary the
published ladders themselves use. Every item below is something he did, and each maps to a
named Senior criterion:

| CV phrasing to use | Ladder criterion it triggers |
|---|---|
| "**Authored** the organisation's AI coding standards" | GitLab Senior: "help to **define and improve our internal standards**"; Monzo L4 Influence |
| "**Sole author** of the winning proposal — 1 of 3 selected from 638 across 55 countries (TAITRA, 2025)" | Monzo L4 Impact: "**leads writing** small/medium scope proposals" |
| "**Mentors** the engineering team" | GitLab/Monzo L4 Leadership; PhysicsX Senior: "lead and **mentor others**" |
| "**Led** the vision architecture for …" / "R&D lead" | Monzo L4: gets buy-in on technical decision-making |
| "Shipped a full 3D human-pose pipeline running **entirely on-device** (Core ML / ARM)" | Helsing: "reliable under real-world **deployment constraints**"; Helsing nice-to-have: "end-to-end AI systems on edge devices" |
| "MPJPE 8 cm → 3 cm; 4.8× lower reconstruction noise; −73% event-timing error; 204 bone measurements validated against published anthropometric ratios" | Helsing: "iterated on models **beyond benchmarks**" |
| "Regression-free adapter: deployed pathway **bit-identical to base, verified by weight diff**" | GitLab Senior: "high scope and complexity"; production-reliability discipline |
| "NVIDIA GTC 2025 technical poster (peer-selected)"; "Selected to represent engineering at Taiwan Expo Europe 2026" | Monzo **L5** Influence: "represents [company] at conferences/events" |

**The rule to encode: assert scope, never rank. Let the reader assign the level — and make it
impossible for them to assign anything below Senior.**

### 6.4 One place where "senior" *can* appear safely

The cover letter, as a **statement about the role, not about himself**: *"I'm applying at the
senior level; my current title is AI Research Engineer, and the scope is X, Y, Z."* This is
an unambiguous, honest, checkable framing that positions him without a self-awarded rank on
a document that gets cross-referenced. It also solves the recruiter-confusion failure mode
that `title-positioning.md` §6 flagged running the other way.

---

## 7. The employment gap, Feb–May 2025

**Recommendation: state the true months and do nothing else. Do not hide it, do not fill it,
do not switch to year-only dates.**

Reasoning:

1. **It is two months of actual gap.** `02/2025` → `05/2025` on a month-precise CV shows an
   interval of two full months (March, April). That is a notice-period-and-job-search
   interval, which is the single most ordinary thing on a European CV.
2. **European HR does not treat short, explicable gaps as disqualifying.** A Stepstone
   Österreich study with market-research agency MindTake, combining face-to-face interviews
   with HR managers and eye-tracking of CV review, found: *"Die oft als No-Go angesehen
   Lücken im Lebenslauf, sehen nahezu alle Personaler (**92%**) nicht als problematisch an,
   wenn der Kandidat diese begründen kann."* — 92% of HR managers do not regard CV gaps as
   problematic where the candidate can explain them. The same study found recruiters spend
   an average of **43 seconds** actually looking at a CV (measured), against 2 minutes
   self-reported. **A two-month gap does not survive 43 seconds of attention.** *(Source
   caveat: this is an Austrian recruiter study reported via wirtschaftsforum.de; the sample
   size was not published. Directional, not precise.)*
3. **Concealment is the actual risk, and it is asymmetric.** `european-market.md` already
   records that German-convention CVs are read for continuity and *"gaps are noticed in a way
   they are not in"* other markets. That cuts both ways: a reader attuned to continuity is
   also attuned to **year-only dates on an otherwise month-precise document**, which reads as
   deliberate obscuration and is far more damaging than the two months it hides. Never round
   `02/2025` to `2025`.
4. **There is a free, honest fix available — verify it.** NVIDIA GTC 2025 ran **17–21 March
   2025** (nvidia.com), which falls **inside the gap window**. If his GTC poster was
   presented at that event rather than at a later 2025 GTC, then a *Selected Work / Talks &
   Posters* line dated `03/2025` sits exactly in the empty months and closes the visual gap
   with his strongest externally verifiable credential — no filler entry, no invention,
   nothing to defend. **Confirm which GTC event the poster was presented at before relying
   on this.** If it was a later GTC, drop this point entirely; the gap is still fine on its
   own under (1)–(3).
5. **Prepare one sentence, deliver it once.** If asked: the plain, true reason in a single
   clause, no elaboration, no apology. Per the Stepstone finding, explicability — not
   absence — is what the 92% are responding to.

**Do not** insert "Career break", "Sabbatical", "Independent research" or similar for two
months. Labelling a two-month interval draws more attention than the interval does.

---

## 8. What supports a senior claim, and what undermines it — honestly

### Supports

1. **He satisfies GitLab's published Senior ML Engineer requirement on both branches
   independently** — "3+ years in ML **or** a Master's/PhD with a focus on ML". This is an
   employer's own binding definition, not commentary. *(Strongest evidence.)*
2. **He meets every dimension of Monzo's Level-4 (Senior) behavioural framework**, and
   touches Level-5 on Influence via external representation. A framework with zero tenure
   criteria places him at Senior on behaviour alone. *(Strongest evidence.)*
3. **Standard-setting is documented, not claimed** — he authored the organisation's AI coding
   standards. That is the verbatim GitLab Senior criterion.
4. **Force multiplication is documented** — mentors the engineering team; R&D lead on
   projects. PhysicsX's Senior clause ("ready to not only execute but also lead and mentor
   others") is satisfied.
5. **Independent, externally verifiable selection events under his own name**: NVIDIA GTC
   2025 poster (peer-selected by a content committee); TAITRA award, **sole author**, 1 of 3
   from 638 proposals across 55 countries. Sole authorship of a winning international
   proposal is exactly Monzo L4 Impact ("leads writing … proposals") and is unusually strong
   for the tenure.
6. **Production evidence beyond benchmarks** — the exact thing Helsing's postings repeatedly
   name as the bar. A full 3D pipeline running entirely on a phone, plus quantified deltas
   (8 cm → 3 cm MPJPE, 4.8× noise reduction, −73% timing error), plus a discipline artefact
   (bit-identical deployed pathway verified by weight diff) that most engineers at any level
   never produce.
7. **A shipped product used by PGA Tour professionals** — real users, real stakes, verifiable
   externally.
8. **The two-clock postings (§2.1) fit him almost exactly** — dunnhumby's "8+ years of
   software engineering, including 3+ years building production AI/ML" is his profile
   verbatim, at Senior.
9. **The European market's own structure favours him** — 70% of Senior postings have no year
   gate; the credible ladders have no year criterion at all.

### Undermines

1. **Tenure, on the clock that most ML-titled postings run.** ~2 yrs 7 mo of AI industry
   experience against a European Senior median of 5. On Larson's framing he is inside the
   career-level band only if the engineering clock applies.
2. **No employer has ever titled him Senior.** Every reference check, every LinkedIn view
   confirms this. It is why §6.1 holds.
3. **Short post-MSc tenures — 16 months and 16 months.** This is the most underrated
   liability. European employers read for continuity (`european-market.md`), and senior
   claims rest on having *owned a system through its consequences*: the second year, the
   regression, the migration, the on-call. Two 16-month stints do not evidence that, and no
   amount of CV phrasing fixes it. **The most valuable career action available to him is
   staying at IdeasLab through a third year.**
4. **His single strongest research-lead claim is externally unverifiable.** He led the vision
   architecture for a system described in a peer-reviewed *Scientific Reports* paper, and is
   neither an author nor acknowledged — independently verified. A senior research claim that
   cannot be checked is, to a careful reader, a claim that cannot be counted.
5. **No first-author publication.** Irrelevant for *Research Engineer* and *ML Engineer*
   (established in `title-positioning.md` and `credibility-artifacts.md`), but it is the
   binding constraint at Staff (GitLab's Staff branch is PhD-only) and at anything
   *Scientist*.
6. **No SLAM/VIO and no Gaussian Splatting.** This directly excludes the highest-value
   single posting in the corpus — Helsing *AI Research Engineer – 3D Computer Vision*, which
   names "visual SLAM, visual-inertial odometry (VIO), or neural 3D representations such as
   neural radiance fields (NeRF)" in its core requirements, not its nice-to-haves. Two of the
   three top European 3D-vision employers (Helsing, NavVis) build on exactly this stack.
   **This is the highest-return technical gap to close** and it is closeable in months, not
   years, unlike tenure or publications.
7. **No line management, and no employer-conferred tech-lead title.** "R&D lead" and "lead
   engineer" are project-scoped and self-described. Monzo L5 items — bootstrapping teams,
   leading incident resolution, owning irreversible decisions across a squad — have no
   evidence behind them.
8. **The "~8 years" figure does not survive arithmetic** (§4). If it appears anywhere and a
   reader checks it, it damages the items in the "supports" column that are true.

### The honest bottom line

He is a **borderline Senior**: over the bar on every behavioural criterion in every published
ladder examined, under the bar on tenure at the median European employer, and precisely at
the bar at employers that count post-MSc years (GitLab, PhysicsX). Borderline candidates get
levelled by the interview loop, not by the CV — which is why the recommendation is to make
the CV maximally scope-dense and level-silent, and to spend the level argument in Track A
postings where no level is stated at all.

---

## 9. Sources, with credibility notes

**Primary hiring data (highest weight — these are the employers' own binding statements):**

- **Greenhouse job-board API**, `boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true`
  — full posting HTML, unmediated by aggregators or SEO rewrites. 573 European postings
  across 30 named employers, August 2026. *Credible because it is the employer's own text at
  the moment of hiring; the weakness is that it is a snapshot and postings churn.*
- **Amazon jobs search API**, `amazon.jobs/en/search.json` — 299 postings with the
  `basic_qualifications` field intact, enabling the US/EU within-company comparison. *EU
  sample sizes are small (n=7, 8, 2, 6) and should be read as directional.*
- **Specific postings quoted:** Helsing *AI Research Engineer – 3D Computer Vision*
  (helsing.ai/jobs/4911999101) and *– Computer Vision* (4334842101); NavVis *Senior ML
  Engineer – Semantic Spatial AI* (job-boards.eu.greenhouse.io/navvis/jobs/4835176101),
  *Senior SWE 3D Perception* (…/4809045101), *Lead MLE Geometric Spatial AI* (…/4931997101);
  PhysicsX ML ladder (Greenhouse ids 4652630101, 4851342101, 4648881101, 4749999101);
  Isomorphic Labs *ML Research Engineer* (5578430004); Graphcore *AI Research Engineer*
  (8632582002); Doctolib, dunnhumby, Cognite, Adyen, GetYourGuide, Kinexon, Wayve as cited.

**Published engineering ladders (high weight — employer-authored, versioned, public):**

- **GitLab handbook, Machine Learning Engineering job family** —
  handbook.gitlab.com/job-families/engineering/development/data-science/machine-learning/.
  *The only credible ML-specific published ladder found. Quotes verified against the raw
  page, not a summary. GitLab's handbook is the company's operative HR document, publicly
  versioned in git.*
- **Monzo Engineering Progression Framework** — github.com/monzo/progression-framework
  (backend.md, 6 levels × 5 dimensions) and monzo.com/documents/engineering-progression-
  framework-v4-1.pdf (v4.1, 15/09/2025). *UK employer, actively maintained, used for real
  compensation decisions. The yaml source was read directly; the v4.1 PDF could not be text-
  extracted in this environment (no pdftotext/pypdf available), so all Monzo quotes come
  from the GitHub source, which is a slightly earlier version.*
- **Dropbox career framework** — dropbox.github.io/dbx-career-framework/. *Used only for the
  structural point that IC1–IC4 all carry the plain "Software Engineer" title.*
- **progression.fyi** — index of 45 publicly published frameworks (CircleCI, Square, Rent the
  Runway, Etsy, Financial Times, Spotify, GOV.UK DDaT, GitLab, Monzo, Dropbox…). *Used as a
  directory. CircleCI's and Square's Google-Sheet matrices could not be retrieved in a
  parseable form and are not cited for content; the FT framework site blocked fetching.*

**Named practitioners (medium-high weight):**

- **Will Larson**, *Staff Engineer: Leadership beyond the management track*, staffeng.com/book/
  — quoted verbatim on the five-to-eight-year career level. *Former CTO of Calm; engineering
  leadership at Stripe, Uber, Digg; two published books on engineering careers. Writes under
  his own name with verifiable credentials.*

**Regulatory and official (high weight, but indirect):**

- **Acas** (UK statutory Advisory, Conciliation and Arbitration Service) — guidance on age
  discrimination in job adverts and years-of-experience requirements; *Age discrimination:
  key points for the workplace* (2024). *Statutory body; its Codes of Practice are
  admissible in employment tribunals. The specific "10 years in retail" example was retrieved
  via search-result extraction of the Acas guidance; direct fetches of the individual Acas
  pages and the PDF did not surface it verbatim, so treat the exact wording as
  paraphrase-grade while the substance (years requirements risk indirect age discrimination;
  state type of experience instead) is well attested across the Acas corpus.*
- **German Residence Act (AufenthG) §18g(2)** — EU Blue Card for IT specialists with 3 years'
  relevant experience and no degree; 2026 shortage-occupation salary threshold €45,934.20.
  *Statutory. Retrieved via secondary immigration-law sources (sz-legal.de, Jobbatical,
  germany.info), which agree on the substance.*
- **NVIDIA** — GTC 2025 held 17–21 March 2025, San Jose (nvidia.com/gtc/). *Primary.*

**Lower weight, flagged as such:**

- **Stepstone Österreich / MindTake study** on CV gaps (92% of HR managers) and CV reading
  time (43 seconds measured by eye-tracking), reported via wirtschaftsforum.de. *Real study
  by a named job board and a named market-research agency, but sample size and fieldwork date
  are not published in the accessible report. Austrian, so German-speaking market only.*
- **Ravio** European compensation benchmarking (IC track P1–P6, M1–M5). *Genuine European
  data source drawing from customers' HR systems, but the site returned HTTP 429 to every
  fetch attempt, so the level definitions here come from search-result summaries of Ravio's
  blog and are the least verified claim in this document.*

**Explicitly rejected:** Zippia, CareerKarma, Coursera career-path articles, 4dayweek.io,
KORE1, Noble Desktop, JobCannon, fonzi.ai, smithspektrum, zenvanriel, "AI Engineer Leveling
Frameworks 2026"-type content, and all TowardsDataScience career listicles. These dominated
search results for "ML engineer career ladder" and "mid vs senior ML" and contain no
primary data.

---

## 10. Honest gaps in this research

1. **No credible ML-specific practitioner writing on the mid→senior transition was found.**
   Searches returned content farms exclusively. GitLab's published family substitutes, but a
   named ML engineering manager writing about levelling ML ICs would be a better source and
   this research did not locate one.
2. **The Amazon US/EU comparison has small European samples** (n = 7, 8, 2, 6). The direction
   is corroborated by the independent 573-posting corpus, but a proper test would need a
   larger EU pull across several US employers (Microsoft, Google, Meta, Apple EU offices),
   which their careers sites do not expose via an open API.
3. **No US-big-tech-in-Europe posting text was obtained.** Google, Meta and Microsoft careers
   pages are JavaScript-rendered and were not retrievable. The claim that their EU offices
   run the unchanged global ladder rests on the Amazon evidence plus the structural argument,
   not on direct verification at those three.
4. **Ravio's level definitions were not directly verified** (HTTP 429). If the P1–P6 mapping
   matters to a decision, it should be re-checked.
5. **Continental-European ladders specifically** — the German IG Metall ERA collective-
   agreement pay groups (EG 12–14 for engineers), which govern levelling at Bosch, Siemens,
   Continental and the automotive tier-1s, were not researched. For a candidate targeting
   German industrial employers this is a real omission and the highest-value follow-up.
6. **Salary data by level in Europe is absent from this document.** The brief asked about
   level, not compensation, and no official European salary-by-level survey was verified to
   the standard required. If a compensation target is needed, that is separate research.
7. **His exact 2017 and 2021 employment months at AIBS are unknown**, so §4's arithmetic is
   ±6 months. Verify before writing any date on the CV.
8. **Which GTC event the 2025 poster was presented at is unverified** (§7.4). The
   gap-filling recommendation is contingent on it being the March 2025 San Jose event.
9. **Whether "R&D lead" and "lead engineer" appear in any written artefact** (an offer
   letter, an internal org chart, a project charter) was not established. If they do, they
   are stronger than described here; if they are purely conversational, §7 item 7 stands.
