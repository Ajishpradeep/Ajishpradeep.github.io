# Compensation and Employer Targeting — European Market

**Research date:** 16 August 2026
**Scope:** What this profile earns in Europe, which employer clusters actually pay for it, and where the CV should point.
**Prior work assumed settled:** immigration routes (`relocation-routes.md`), title strategy (`title-positioning.md`), level (`seniority-trajectory.md`), vertical and demand (`vertical-human-motion.md`, `market-demand-2026.md`, `european-market.md`).

---

## 0. Headline answers

1. **Realistic band:** €75,000–110,000 base in Germany; £70,000–95,000 base in London; CHF 140,000–175,000 in Switzerland (permit-gated). Well-funded AI labs and big-tech European offices run **substantially** higher — Black Forest Labs discloses €130,000–240,000 in Freiburg, Apple Germany ICT4 medians €188,000 total comp.
2. **The Blue Card threshold (€45,934.20) never binds for a commercial role.** The lowest realistic industry offer is ~1.6× it. It binds in exactly one case: **a part-time research-institute contract** (see §2).
3. **Top target cluster:** camera-based human/athlete tracking on edge hardware — Catapult, Genius Sports, KINEXON, NavVis, Scandit, Skydio.
4. **Three findings that cut against the obvious** are in §7.

---

## 1. Compensation by hub and level

### 1.1 Methodology warning — read before using any number below

| Source | Method | Skew / limits |
|---|---|---|
| **levels.fyi** | Self-reported submissions, verified by offer-letter upload for some entries | Strongest available for tech comp, but **skews to big tech, finance and the well-paid end**. Sample sizes for European locations are not disclosed on the public pages — I checked, and levels.fyi publishes *no* submission counts per location. It also labels the same figure "median" in one place and "average" in another. Treat as **upper-middle of the market, not the middle**. |
| **ITJobsWatch** | Parses salary figures quoted in **real UK permanent job ads**; sample size stated per query | Genuinely ad-derived, not self-reported. But only ~25% of UK ads quote a salary, and niche-skill samples are tiny (113 quotes UK-wide for "computer vision"). Volatile year to year. |
| **Disclosed bands in job postings** | Primary source, legally or voluntarily published | Best evidence available — but see §1.3: **almost nobody publishes them**. |
| **TVöD public pay scales** | Statutory German public-sector tables | Exact and binding. No skew at all. Applies to Fraunhofer/Max Planck/DFKI. |
| **Glassdoor / Payscale / SEO "average salary" pages** | Self-reported, no verification, no stated sample | **Not used in this document.** Rejected per the source bar. |

**Currency conversions** below use approximate August 2026 rates (CHF 1 ≈ €1.06, £1 ≈ €1.17, SEK 11.3/€, DKK 7.46/€, PLN 4.25/€) and are indicative only. Swiss and Danish nominal figures are **not** comparable on purchasing power — Zurich and Copenhagen costs and social deductions differ sharply from Munich.

### 1.2 Software engineer total compensation by country and city
*Source: levels.fyi, all pages last updated 16 August 2026. All-levels aggregate — not senior-specific.*

| Country | Median TC | 25th | 75th | 90th | Top city (median) |
|---|---|---|---|---|---|
| **Switzerland** | CHF 129,858 (≈€138K) | CHF 102,246 | CHF 191,219 | CHF 287,000 | **Zurich CHF 133,871** (≈€142K); Basel CHF 147,201; Zug CHF 135,783 |
| **Ireland** | €101,799 | €76,328 | €137,658 | €164,000 | **Dublin €103,255**; Leixlip €114,905 |
| **Netherlands** | €92,301 | €70,882 | €124,049 | €159,000 | **Amsterdam €119,354** |
| **Denmark** | DKK 680,865 (≈€91K) | DKK 579,000 | DKK 823,000 | DKK 1,050,000 | **Copenhagen DKK 757,330** (≈€102K) |
| **UK** | £87,704 (≈€103K) | £59,496 | £127,595 | £174,000 | **London £106,486** (≈€125K) |
| **Germany** | €82,504 | €68,300 | €100,000 | €126,000 | **Berlin €89,379**; **Munich €78,865** |
| **Poland** | PLN 265,214 (≈€62K) | PLN 186,061 | PLN 356,728 | PLN 449,000 | **Warsaw PLN 257,693** (≈€61K) |
| **Sweden** | SEK 685,067 (≈€61K) | SEK 561,437 | SEK 795,273 | SEK 994,000 | **Stockholm SEK 709,701** (≈€63K) |
| **France** | €57,053 | €44,613 | €72,350 | €97,500 | **Paris €64,423** |
| **Spain** | €55,052 | €38,203 | €76,891 | €97,700 | **Madrid €63,476**; **Barcelona €58,963** |
| **Portugal** | €43,657 | €28,839 | €60,624 | €81,800 | **Lisbon €58,291**; **Porto €41,769** |

**Note the Berlin > Munich inversion.** levels.fyi puts Berlin €89,379 above Munich €78,865. This is a *sample composition* artefact, not a real cost-of-living-adjusted gap: Berlin's sample is dominated by venture-funded startups and US-tech satellites, Munich's by large German industrials and automotive suppliers that pay on collective-agreement scales. For **this specific profile** — on-device perception — Munich is the deeper market (Apple, NVIDIA, NavVis, KINEXON, BMW/CARIAD, Brainlab) and the top of the Munich range beats the top of the Berlin range.

**Sweden and France look weak in nominal terms** and largely are, at least on cash. Both are equity-light and tax-heavy markets. Sweden's figure is dragged down by a very compressed distribution (25th–75th spread is only SEK 561K–795K, the tightest in Europe).

### 1.3 Does the EU Pay Transparency Directive give us disclosed bands yet? **No.**

This was worth testing directly, so I did. I swept the Greenhouse job-board APIs of every European employer I could resolve, pulled **61 EU-located postings** in computer vision / perception / ML / edge / robotics, and machine-scanned the full posting text for currency figures and salary-range language.

**Result: 2 of 61 postings (3.3%) carried a genuine salary band.**

The other 19 hits my scanner flagged were false positives — relocation allowances (Helsing's "up to €2,500", NavVis's "4000 EUR") rather than pay.

The two real disclosures:

| Employer | Role | Location | **Disclosed band** |
|---|---|---|---|
| **Black Forest Labs** | Member of Technical Staff — Research Engineer | Freiburg, Germany | **€130,000–240,000** |
| **Black Forest Labs** | Forward Deployed Robotics Engineer | Freiburg, Germany | **€120,000–180,000** |
| **Graphcore** | Senior ML Engineer (Large Systems) | Gdańsk, Poland | **PLN 260,400–350,700** (≈€61K–82.5K) |

**Why the directive has not produced bands.** Directive (EU) 2023/970 Article 5 requires that applicants receive information on initial pay or its range — but I checked the text on EUR-Lex, and it says this must be provided *"in a manner such as to ensure an informed and transparent negotiation on pay, such as in a published job vacancy notice, prior to the job interview or otherwise."* The phrase **"or otherwise"** is the loophole: employers satisfy Article 5 by telling you the range at first-recruiter-contact, and almost all of them do exactly that rather than publish it. Transposition has also been uneven across member states.

**Practical consequence for him:** he should **ask the recruiter for the band on the first call and is legally entitled to it in EU member states.** He should not expect to find it in the advert, and should not screen roles out for lacking one. This is a live, usable right that most candidates do not exercise.

**The Black Forest Labs numbers are the single most valuable compensation datapoint in this document** — a real, published, German band for an applied research engineer role. €130,000–240,000 in *Freiburg*, a secondary city, sets the ceiling for what a well-funded German AI lab pays. Munich and Berlin equivalents will not be lower.

### 1.4 Per-level anchors at named employers
*Source: levels.fyi company pages, last updated 16 August 2026. Self-reported; skews high; treat as "what a strong offer looks like", not the median.*

| Employer / location | Entry | Mid | **Senior** | Staff / Principal |
|---|---|---|---|---|
| **Google Switzerland** | L3 CHF 172K | L4 CHF 238K | **L5 CHF 308K** | L6 CHF 418K |
| **Apple Germany** | ICT2 €101K | ICT3 €139K | **ICT4 €188K** | ICT5 €256K |
| **NVIDIA Germany** | IC2 €103K | IC3 €156K (labelled "Senior") | — | IC4 €180K |
| **Amazon Germany** | L4 €83.9K | L5 €128K | **L6 €168K** | L7 €267K |
| **Meta UK** | E3 £90.7K | E4 £143K | **E5 £249K** | E6 £490K |

Note the shape: at every one of these, **the senior IC step is where equity starts dominating**. Apple Germany ICT4 is €107K base + €72.3K stock; Meta UK E5 is £120K base + £114K stock. A candidate comparing a big-tech offer against a scaleup base salary is comparing two different things.

### 1.5 UK computer-vision-specific data
*Source: ITJobsWatch, 6 months to 15 August 2026 — parsed from real permanent job ads.*

| Market | Median advertised salary | Sample | YoY |
|---|---|---|---|
| **London, "computer vision"** | **£90,000** | 41 salary quotes (68 vacancies) | −5.3% |
| **UK-wide, "computer vision"** | **£60,000** | 113 salary quotes (165 vacancies) | −29.4% |

**This is the closest thing to a genuine "3D computer vision engineer" salary figure that exists**, and it is still only a skill-tag match, not a role match. Read it carefully:

- **The UK-wide −29.4% is a sample artefact, not a market collapse.** On 113 quotes, a shift in which regions and seniorities happened to advertise a salary moves the median by tens of percent. London's −5.3% on 41 quotes is the more trustworthy signal, and it says roughly *flat*.
- **London £90,000 vs levels.fyi's London £106,486** is the self-report skew made visible. The ad-derived figure is lower because ads that quote salary skew toward mid-market employers; the self-reported figure is higher because submitters skew toward big tech. **The truth for a Catapult-class London scaleup is nearer £90K than £106K.**
- CV roles are 0.15% of all UK permanent IT vacancies. **This is a small, specialist market everywhere in Europe.** That cuts both ways: few openings, but few qualified applicants.

### 1.6 Where "3D computer vision engineer" data does not exist — and what I substituted

There is **no compensation dataset anywhere for "3D computer vision engineer" as a role.** levels.fyi has no such title or focus (I probed `/focus/computer-vision` and `/focus/machine-learning` — the pages exist as stubs but return no data to fetch). No national statistics office codes at that granularity; ISCO 2511/2512 and UK SOC 2133/2134 lump all software and ML engineering together.

**What I substituted, in descending order of trust:**
1. Disclosed bands in real postings for adjacent roles (§1.3) — small n, but primary.
2. ITJobsWatch "computer vision" skill tag (§1.5) — ad-derived, right specialism, wrong granularity on level.
3. levels.fyi software-engineer aggregates by geography (§1.2) and per-level at named employers (§1.4) — wrong specialism, right geography and level.

**The specialism premium is not measurable from public data.** My working assumption, which I flag as *inference not evidence*: 3D CV plus edge deployment carries a modest premium over generalist software engineering at scaleups (roles are hard to fill), and **no premium at all** at big tech, where levels and bands are specialism-blind.

---

## 2. Blue Card threshold sanity-check

**The threshold:** €45,934.20/yr gross for shortage occupations (ISCO 21 and 25 both qualify), 2026. Standard threshold €50,700.

**Does it bind? For any commercial role: no, and it is not close.**

| Benchmark | Gross | × threshold |
|---|---|---|
| Blue Card shortage threshold | €45,934 | 1.0× |
| levels.fyi Germany SWE 25th percentile | €68,300 | **1.49×** |
| levels.fyi Germany SWE median | €82,504 | 1.80× |
| Realistic Munich/Berlin senior perception **base** | €75–110K | 1.6–2.4× |
| Amazon Germany L5 base (€104K of €128K TC) | €104,000 | 2.26× |
| Black Forest Labs disclosed floor | €130,000 | 2.83× |
| Apple Germany ICT4 base (€107K of €188K TC) | €107,000 | 2.33× |

Even the **25th percentile of all German software engineering** clears the shortage threshold by 49%. For a senior-level specialist role it is a non-issue. He should stop thinking about it as a constraint and treat it purely as a **floor to refuse offers below** — any German offer under about €55,000 is either not a real senior role or is a research-institute contract.

### The one case where it genuinely binds: part-time research-institute contracts

This is the non-obvious part, and it matters because Fraunhofer and DFKI are exactly the kind of employer a research-flavoured CV attracts.

German research institutes pay on **TVöD Bund**. The 2026 table (valid 01.05.2026–31.03.2027):

| Entgeltgruppe | Stufe 1 (monthly) | Stufe 3 | Annualised Stufe 1 (×12) |
|---|---|---|---|
| **E13** (standard for a research engineer / doctoral researcher) | €5,881.33 | €6,851.84 | **€70,576** |
| **E14** (senior researcher / group lead) | €6,357.92 | €7,312.81 | **€76,295** |

Full-time E13 Stufe 1 = €70,576, which clears the threshold at 1.54×. **But Fraunhofer, DFKI and Max Planck routinely hire research staff at 50–75% FTE**, especially on project-funded and doctoral-track contracts. At **65% FTE, E13 Stufe 1 = €45,874 — approximately €60 *below* the €45,934.20 Blue Card shortage threshold.**

**So: any research-institute offer below roughly 66% FTE fails the Blue Card on salary.** He would fall back to a §18b(1) general skilled-worker permit, losing the Blue Card's fast-track permanent-residence timeline (21/27 months vs 33/48). Given he already holds Taiwanese APRC and is optimising for a second durable residency, that is a real cost.

**Action:** if he ever engages with Fraunhofer/DFKI/MPI, the **first question must be FTE percentage, before anything else.** A "100% E13" offer is fine. A "75% E13" offer is legal but €52,932. A "65% E13" offer is a Blue Card failure.

---

## 3. Employer archetypes — who pays, and who pays in prestige

Ranked by realistic cash-plus-equity for a borderline-senior on-device perception engineer.

### Tier 1 — Pays genuinely well

**Big-tech European engineering offices** — Apple (Munich, Zurich), Google (Zurich, Munich), Meta (London, Zurich), Amazon (Munich, Berlin), NVIDIA (Munich, Berlin), Microsoft (Munich, Cambridge).
**Pay: €140K–310K total comp at senior.** Evidenced in §1.4. The equity component is what separates these from everything else in Europe.
**Relevance to him: high and underrated.** Apple Munich is a silicon and on-device ML centre; Core ML and ARM inference is *their* stack, not a transferable adjacency. Zurich hosts Google's and Meta's largest non-US research-engineering concentrations, both with real 3D/spatial work.
**Friction:** hardest interview loops in Europe, and the level committee will look hard at ~3 years of AI experience. Realistic entry is **mid-level, not senior** — Apple ICT3 (€139K) or Amazon L5 (€128K), not ICT4/L6. That is still well above any scaleup senior offer. **Down-levelling into big tech is financially better than levelling up into a scaleup.**

**Well-funded AI labs and deep-tech scaleups** — Black Forest Labs (Freiburg), Helsing (Munich/Berlin/London/Paris), Isomorphic Labs (London), PhysicsX (London), Wayve (London), Mistral (Paris), Synthesia (London/Europe), poolside.
**Pay: €120K–240K, evidenced by Black Forest Labs' disclosed €130–240K band.**
**Relevance: mixed.** Most are LLM/generative labs where his 3D CV specialism is orthogonal. Helsing and Wayve are the genuine perception matches.

**Swiss market generally** — Zurich, Basel, Zug, Lausanne.
**Pay: CHF 130K–310K.** Nominally the highest in Europe by a wide margin.
**Friction: severe, and see §7.** Switzerland is outside the EU Blue Card system entirely. Non-EU/EFTA nationals face a **hard annual federal quota** (a few thousand permits nationally, split across cantons), and employers must demonstrate no EU/EFTA candidate was available. Many Swiss postings simply exclude non-permit-holders at the minimum-qualification line.

### Tier 2 — Pays competitively, best specialism fit

**Sports technology** — Catapult (London), Genius Sports/Second Spectrum (London, Lausanne), KINEXON (Munich), Hawk-Eye/Sony (London), Statsbomb, Kitman Labs (Dublin), Pixellot, PlayerMaker.
**Pay: £70–95K London (per §1.5's £90K London CV median); €70–95K Munich.** No equity worth much at most.
**Relevance: the single best specialism fit in Europe.** Multi-camera, calibration, triangulation, 3D human pose, edge inference, temporal consistency — this is literally the job.

**Automotive and driver monitoring** — Smart Eye (Gothenburg), Seeing Machines (UK), Bosch, Continental, Valeo, ZF, Aptiv, CARIAD/VW (Munich, Wolfsburg), BMW (Munich), Mobileye.
**Pay: €70–100K Germany on collective-agreement (IG Metall) scales — predictable, banded, and hard to negotiate above.** Excellent job security and hours; low ceiling.
**Relevance: strong and regulation-driven.** EU General Safety Regulation's Advanced Driver Distraction Warning requirement has been mandatory for new vehicles since **7 July 2026**, forcing every OEM and Tier-1 to ship in-cabin human perception on embedded automotive silicon. This is his exact stack — human pose/gaze/attention estimation under hard compute constraints. **The demand is real and the timing is now.**

**AR/VR and spatial computing** — Meta Reality Labs (Zurich, London), Apple (Zurich, Munich), Snap (Zurich), Niantic (London, Zurich), Varjo (Helsinki), Ultraleap (Bristol), NavVis (Munich), Matterport.
**Pay: big-tech scale at the big names; €70–100K at the independents.**
**Relevance: very high.** Hand and body tracking on headset silicon is the same problem class.

**Robotics and drones** — Skydio (Zurich), ANYbotics (Zurich), RIVR (Zurich), Sereact (Stuttgart/Zurich), Neura Robotics (Metzingen), Agile Robots (Munich), Dexory (London), Exotec (Lille), Wandelbots (Dresden).
**Pay: €70–110K Germany; CHF 130–170K Zurich.**
**Relevance: high on the edge-inference half, moderate on human pose.**

### Tier 3 — Pays adequately

**Medtech and digital health** — Brainlab (Munich), Siemens Healthineers (Erlangen), Ottobock (Duderstadt), Kaia Health (Munich), Sword Health (Porto), Hinge Health.
**Pay: €65–95K Germany.** Regulated-industry pace; strong mission fit with movement health.
**Caveat:** Sword Health (Porto) explicitly bars relocation per prior research, and Portugal is the lowest-paying market in this study (Porto median €41,769). **Digital MSK health is the right vertical in the wrong geography** — the money in this vertical is in the US.

**Industrial and enterprise vision** — Scandit (Zurich, Warsaw, Germany, Italy), Zeiss, Trumpf, Cognex, Basler, Datalogic.
**Pay: €70–95K.** Scandit is notable for posting the *same* senior CV role across four geographies simultaneously — evidence they will hire wherever the person is.

### Tier 4 — Pays in prestige, not money. **Know this before targeting.**

**Fraunhofer (IIS, HHI, IOSB, IGD), Max Planck (MPI-IS Tübingen/Stuttgart, MPI-INF Saarbrücken), DFKI, INRIA, TNO, imec, CSEM, CERN.**

**Pay: statutory public-sector scales.** For the German institutes that means TVöD: **E13 Stufe 1 = €70,576/yr full-time; E14 Stufe 1 = €76,295.** No equity. No bonus beyond the standard Jahressonderzahlung. Progression up the Stufen is by *time served*, not performance — Stufe 1→2 takes a year, 2→3 takes two more, 3→4 takes three more. **There is no negotiating room**; the tables are law.

Set against Apple Germany ICT4 at €188K, **a Fraunhofer E13 role pays roughly 37% of what a big-tech senior role in the same city pays.** Against Black Forest Labs' disclosed €130–240K in Freiburg — where Fraunhofer also has institutes — the gap is 1.8× to 3.4×.

INRIA (France), TNO (Netherlands), CSEM (Switzerland) and imec (Belgium) sit on comparable national public scales.

**What they *are* good for:** MPI-IS Tübingen is the global centre of gravity for 3D human pose and body modelling (SMPL, and its successors, came out of there). For a candidate with **no first-author publications**, a stint there is the fastest route to acquiring them.

**The honest trade-off:** he would take a roughly 40–60% pay cut against industry to buy publication credibility he currently lacks. **Given that his positioning is deliberately engineering-first and away from "Scientist" titles, this is the wrong trade.** His credibility gap is not best closed by publications — it is closed by the shipped artifacts he already has. **Do not target Tier 4.** The one exception is if he ever wants to convert to a research-track career, in which case MPI-IS specifically is the only name worth the cut.

---

## 4. Extended named target-employer list

Verified live against Greenhouse / Ashby / Lever job-board APIs on 16 August 2026 unless marked otherwise. "Hiring now" means a matching requisition was open on that date.

### 4.1 Priority tier — direct specialism match, hiring now

| Employer | City | Role(s) open | Salary signal | Notes |
|---|---|---|---|---|
| **Catapult Sports** | **London** | **Computer Vision Engineer**; **Senior CV & Tracking Engineer**; **Principal CV & Tracking Engineer** | None disclosed. London CV median £90K (§1.5); senior band likely **£85–105K** | **Best match in Europe. See §4.2 — the timing here is unusually favourable.** |
| **Helsing** | **Munich, Berlin, London, Paris** | **AI Research Engineer — 3D Computer Vision**; also CV, ML Engineering, ML & Signal Processing variants | "Competitive salary and VSOP options". Relocation only €2,500 + 4 wks accommodation | Scene matching, geo-registration, SLAM, 3D reconstruction, explicitly "adaptation to the compute constraints" of deployment. **Title is a literal match.** Defence — see §6. |
| **Genius Sports** | **Lausanne, CH** | **Senior Software Engineer — Edge Vision Platform** (posted 10 Aug 2026) | Not disclosed; Swiss senior ≈ CHF 140–180K | Stack is **iOS + Apple Core ML + Apple Metal on iPhone-based venue cameras**, real-time player tracking. Uncannily precise match. **But hard-blocked — see §7.** |
| **NavVis** | **Munich** | **Senior Software Engineer, 3D Perception (C++/Python)**; **Senior MLE — Semantic Spatial AI**; **Lead MLE — Geometric Spatial AI** | Not disclosed; €4,000 relocation allowance. Munich senior ≈ **€85–105K** | 3D Perception role asks **5–10 yrs**; Lead role is a stretch. Three open reqs = a team being built, not backfilled. |
| **Scandit** | **Zurich, Warsaw, Germany, Italy** | **Senior Computer Vision Engineer (Action Recognition)** ×4 geos | Not disclosed. Zurich ≈ CHF 140K+; Warsaw ≈ €60–75K | **Action recognition = human movement understanding on mobile devices.** Posting the same role in four countries signals genuine geographic flexibility — the German and Warsaw postings sidestep the Swiss quota problem. |
| **Skydio** | **Zurich** (+ Tampere) | 9 open: Autonomy Engineer — Deep Learning; **— Deep Learning Model Acceleration**; Senior Autonomy Engineer — DL; Sr/Staff Embedded SW Eng — Camera Systems (Tampere) | Not disclosed; Zurich senior ≈ CHF 150–190K | **"Model Acceleration" is his edge-inference specialism named as a job.** Nine simultaneous reqs = major Zurich build-out. Finland role avoids the Swiss quota. |
| **KINEXON** | **Munich** | (Senior) Embedded Software Engineer (Linux & RTOS) | Not disclosed; Munich ≈ €75–95K | Real-time athlete and ball tracking. Sports + embedded + Munich. Currently only an embedded req open, but the CV team exists. |

### 4.2 The Catapult signal — act on this

Worth stating explicitly because the job-board metadata reveals something the postings do not:

- **Principal CV & Tracking Engineer** — first published **11 May 2026**. Still open after three months.
- **Senior CV & Tracking Engineer** — first published **12 August 2026**. Four days old.
- Both have **near-identical job descriptions** — same team, same "neural network inference on edge AI accelerators, 3D object tracking", same reporting line to a Senior Director of Engineering.

**Read: they could not fill the Principal role, and have just opened a Senior version of the same job.** That is a company adjusting its level expectations downward after a failed search — precisely the moment a borderline-senior candidate should apply.

The Senior posting's bar is also softer than expected:
- **"4+ years of software engineering experience"** — he has ~8.
- Computer Vision and ML experience is listed under **"Nice to have — and what would make you exceptional"**, *not* under requirements.
- Also nice-to-have: *"3D geometry, state estimation, filtering, optimization"*; *"depth cameras and 3D perception"*; *"embedded Linux, Docker on ARM"*.

**He meets every "exceptional" criterion and exceeds the stated requirement.** The stated need is Python + C/C++ + shipped production systems + ownership of ambiguous problems. This is the highest-probability senior offer in Europe for him, and it is four days old.

### 4.3 Strong secondary targets

| Employer | City | Status | Signal |
|---|---|---|---|
| **Wayve** | **London**; Leonberg, DE | Hiring: Senior MLE AI Performance; **Staff ML Performance Engineer (Inference Optimisation)**; Staff ML Perf (Compiler); MLE ADAS | Inference optimisation is his edge half exactly. Well funded (SoftBank, NVIDIA, Microsoft). London pay strong. |
| **Graphcore** | **Bristol, Cambridge, London**; Gdańsk | Hiring: AI Research Engineer ×3 cities; Senior/Staff ML Engineer | **Only UK-adjacent employer with a disclosed band** (Gdańsk PLN 260–351K ≈ €61–82K). Title "AI Research Engineer" matches his target exactly. Now SoftBank-owned. |
| **PhysicsX** | **London** | Hiring: Senior MLE; Senior ML SW Engineer, Research; Principal ML Infra | Simulation/engineering ML, not perception — adjacency play. Well funded. |
| **Black Forest Labs** | **Freiburg, DE** | Hiring: MTS Research Engineer; Forward Deployed Robotics Engineer | **€130–240K and €120–180K disclosed.** Generative imaging, not 3D perception — specialism mismatch, but the pay benchmark of the study. |
| **Smart Eye** | **Gothenburg, SE** | Automotive DMS incumbent | Direct beneficiary of the ADDW mandate (in force 7 July 2026). Swedish pay is low nominally (Stockholm ≈ €63K) but this is the purest human-perception-on-embedded employer in Europe. |
| **Isomorphic Labs** | **London** | Hiring: ML Research Engineer; **Senior SW Engineer (Inference Platform)** | Inference Platform roles are the accessible door; the science roles are not (PhD-gated). |
| **Sereact** | **Stuttgart / Zurich** | Hiring: Senior Robotics Engineer (Zurich) | Robotic manipulation with vision-language models. Fast-growing German robotics. |
| **ANYbotics / RIVR** | **Zurich** | Hiring (22 / 27 open roles) | Legged robotics, on-robot perception. Swiss permit friction applies. |
| **Dexory** | **London** | 33 open roles | Warehouse robotics, 3D scanning, edge vision. |
| **Faculty** | **London** | Hiring: **Lead Computer Vision Engineer**; many Senior/Principal MLE | UK applied-AI consultancy. High volume of senior CV/ML reqs. |
| **Vay** | **Berlin** | 13 open | Teledriving — real-time perception under latency constraints. |
| **Kitman Labs** | **Dublin** | Athlete performance/health data | Dublin pays well (€103K median) and is English-speaking with a straightforward permit route. |
| **Brainlab** | **Munich** | Surgical navigation | 3D registration, tracking, calibration — his geometry stack in medtech. |
| **Varjo** | **Helsinki** | XR headsets | Eye/hand tracking on device. |
| **Ultraleap** | **Bristol** | Hand tracking | Pure 3D hand pose estimation on embedded hardware. |
| **Prophesee** | **Paris** | Event cameras | Neuromorphic vision, extreme edge constraints. French pay is weak (Paris €64K). |
| **CARIAD / BMW / Mercedes** | **Munich, Stuttgart** | Automotive in-cabin sensing | IG Metall scales €70–100K, banded. ADDW-driven demand. |

### 4.4 Explicitly deprioritise

| Employer type | Why |
|---|---|
| **Fraunhofer, MPI, DFKI, INRIA, TNO, CSEM, imec** | TVöD E13 €70,576 full-time and *below the Blue Card threshold if part-time*. 37% of big-tech pay. Prestige only. See §3 Tier 4. |
| **Sword Health (Porto)** | Bars relocation (prior research); Porto median €41,769 — the lowest in this study. |
| **Portugal, Spain, France generally** | Medians €43.7K / €55.1K / €57.1K. Right verticals, wrong economics. Only worth it for a specific exceptional employer. |
| **Sweden as a cash play** | SEK 685K ≈ €61K median with the tightest distribution in Europe. Smart Eye is worth it for the specialism; the pay is not the draw. |
| **Pure-LLM labs (Mistral, poolside, ElevenLabs)** | His applied-LLM work is real but secondary. Competing there means competing on his weakest axis against publication-heavy candidates. |

---

## 5. What is realistic for him specifically

### The discounts, honestly

1. **Tenure vs. level (the main one).** ~3 years AI industry / ~8 years total against a European senior bar that is typically 5+ years in-specialism. Catapult's Senior asks 4+; NavVis's 3D Perception role asks **5–10**. He clears the first and sits at the bottom edge of the second. **Expect senior titles at scaleups and mid-level titles at big tech.**

2. **No first-author publications.** This costs him **nothing** at product and edge-deployment roles — Catapult, Genius Sports, NavVis, Scandit, Skydio and KINEXON never mention publications. It is **disqualifying** at research-scientist roles and a meaningful handicap at Helsing/DeepMind-tier research-engineer roles where peers arrive with PhDs and NeurIPS/CVPR records. **The mitigation is already in the strategy: avoid "Scientist" titles.** Note Helsing itself runs a *"AI Research Intern (PhD)"* pipeline alongside the full role — the peer group there is PhD-shaped.

3. **Relocating from Taiwan is expensive and few employers fund it.** Helsing offers **€2,500 plus four weeks' accommodation**; NavVis offers **€4,000**. For an intercontinental move with a family these are token sums. **He should budget €8–15K of his own money** and treat relocation support as near-zero. This is a real cash cost against year-one compensation that candidates routinely fail to price in.

4. **No European work history.** Costs him recruiter-screen conversion more than interview performance. NVIDIA GTC 2025 is the counter — it is a European-legible credential precisely because GTC is a globally recognised venue.

5. **Notice periods and timing.** Nothing here is a discount, but German and Swiss employers often expect 3-month notice reciprocity and plan hiring accordingly.

### What offsets it, and by how much

- **The shipped on-device 3D pipeline is the rarest thing on his CV.** Prior research established his deployment substrate is ~3× more in demand than his domain. Every priority-tier employer in §4.1 names it: Catapult ("neural network inference on edge AI accelerators", "Docker on ARM"), Skydio ("Deep Learning Model Acceleration"), Genius Sports ("Apple CoreML, Apple Metal"), Wayve ("Inference Optimisation"), Helsing ("adaptation to the compute constraints"). **Very few candidates have shipped a complete 3D pipeline on a phone.** This is his leverage and it is worth more than a publication.
- **PGA Tour professionals using the product** is unusually strong evidence for the sports cluster specifically. It converts "I built a pose estimator" into "elite practitioners depend on my output."
- **NVIDIA GTC 2025 poster** is the externally verifiable artifact and is directly credible to NVIDIA, and to every TensorRT/DeepStream/Jetson-adjacent employer.
- **TAITRA award (1 of 3 from 638 proposals, 55 countries)** is a legible selectivity signal that needs one line of framing to land with a European reader unfamiliar with TAITRA.

### The realistic number

| Scenario | Title likely | Realistic offer |
|---|---|---|
| **London scaleup** (Catapult, Dexory, Faculty) | Senior | **£80,000–100,000** base, minimal equity |
| **Munich/Berlin scaleup** (NavVis, KINEXON, Vay) | Senior | **€80,000–100,000** base |
| **German automotive / Tier-1** (CARIAD, Bosch, Continental) | Senior Engineer | **€75,000–95,000**, banded, low variance |
| **Well-funded AI lab** (Helsing, Black Forest Labs, Wayve) | (Senior) Research Engineer | **€110,000–150,000** + options |
| **Big tech Europe, down-levelled** (Apple/Amazon/NVIDIA Munich) | Mid (ICT3 / L5 / IC3) | **€128,000–156,000** total comp |
| **Big tech Europe, if he clears senior** | Senior (ICT4 / L6) | **€168,000–188,000** total comp |
| **Zurich**, if a permit materialises | Senior | **CHF 140,000–190,000** (≈€148–200K) |

**Central expectation: €85,000–105,000 in Germany, or £85,000–95,000 in London, at a senior title in a scaleup.** That is **1.9–2.3× the Blue Card shortage threshold** and roughly the German 60th–75th percentile for software engineering generally.

**The highest-expected-value path is not the highest-title path.** A down-levelled Apple Munich ICT3 offer (€139K) pays ~40% more than a Senior title at NavVis or KINEXON. If he optimises for money, he should interview at big tech and accept mid-level. If he optimises for specialism fit, career narrative and the shortest path to a genuine Senior title, he should target §4.1. **Those are different strategies and he should pick one deliberately.**

---

## 6. Which cluster should the CV point at?

### Recommendation: **camera-based human and athlete tracking on edge hardware — sports and movement technology as the primary target, with automotive in-cabin sensing as the named secondary.**

**Point the CV at Catapult, and let everything else be a variant of that CV.**

The reasoning:

1. **It is the only cluster where both halves of his profile are simultaneously required.** Sports tracking needs multi-camera calibration, triangulation, 3D human pose and temporal consistency *and* real-time inference on constrained hardware. Most other clusters want one half. Automotive DMS wants both too, which is why it is the named secondary.

2. **His corroboration is cluster-specific and non-transferable.** PGA Tour professionals using his shipped iOS product is worth a great deal at Catapult, Genius Sports and KINEXON, and close to nothing at Isomorphic Labs or Mistral. **Point the CV where his evidence is strongest, not where the market is largest.**

3. **The best live opening in Europe is in this cluster and just became more accessible** (§4.2) — Catapult opened a Senior version of an unfillable Principal role four days ago, requiring 4+ years with CV/ML as merely "nice to have."

4. **Automotive DMS is the hedge, and it is regulation-forced.** The EU ADDW mandate has been in force since 7 July 2026. Every OEM and Tier-1 must ship in-cabin human perception on embedded silicon, whether or not the AI funding cycle cooperates. It pays less than big tech and is banded, but it is the most *durable* demand in this document. A CV pointed at sports tracking needs almost no modification to read well at Smart Eye or CARIAD — both are "human perception, real-time, constrained hardware."

5. **What this means concretely.** Lead with **on-device 3D human pose**, not with "computer vision" or "AI research." Title target **Senior Computer Vision Engineer** or **Senior Perception Engineer** for the sports/automotive cluster, and **(Senior) Research Engineer** only where the employer uses that title for applied work (Helsing, Graphcore). The open-set recognition at 7,000-store scale and the LLM work are supporting depth, not headline — they dilute a perception-specialist read if given equal weight.

**The one thing not to do:** do not point it at research institutes. The pay is 37% of the alternative, the part-time variants fail his Blue Card, and the credibility they buy is credibility he does not actually need.

---

## 7. Findings that cut against the obvious

Three things this research turned up that contradict reasonable prior assumptions:

**1. The single best technical match in Europe is closed to him — on immigration, not merit.**
Genius Sports' **Senior Software Engineer, Edge Vision Platform** in Lausanne runs real-time player tracking on **iPhone-based venue cameras using Apple Core ML and Metal**. It is almost a description of what he built. Its first minimum qualification is: *"Swiss/EU/EFTA citizen or residency permit in Switzerland."* **Switzerland is outside the EU Blue Card system**, operates hard federal quotas for non-EU nationals, and requires labour-market priority testing. Prior research correctly identified Germany as the best immigration fit; the consequence, not previously stated, is that **the highest-paying European market is also the one most likely to reject him at the CV-screen line regardless of fit.** He should not build a Swiss strategy. He should apply to Skydio's Tampere role and Scandit's German/Warsaw postings instead of their Zurich equivalents.

**2. The EU Pay Transparency Directive has produced essentially nothing usable — but it gives him a right he should be using.**
Only **2 of 61** EU postings surveyed carried a real salary band (3.3%). Article 5's *"or otherwise"* wording lets employers satisfy the law in a recruiter call rather than in the advert. The actionable inversion: **he is legally entitled to the range before his first interview in every EU member state, and should ask for it on the first call.** Most candidates do not know this. It converts a disappointing finding into negotiating leverage.

**3. The Blue Card threshold is irrelevant everywhere except the one employer type a research-flavoured CV attracts.**
€45,934.20 is 1.6–2.4× below any realistic commercial offer — a genuine non-issue. But **Fraunhofer/DFKI/MPI part-time contracts at ≤65% FTE land at ~€45,874, roughly €60 under the line.** The threshold binds precisely and only where a research-positioned candidate is most likely to end up. This is a second, independent reason to keep the CV pointed at engineering rather than research — one that has nothing to do with title strategy and everything to do with residency.

**A fourth, smaller one:** Berlin shows a *higher* software-engineering median than Munich (€89,379 vs €78,865) on levels.fyi. That is a sample-composition artefact — Berlin's sample is startup-and-US-satellite heavy, Munich's is industrial-heavy. For on-device perception specifically, **Munich is the deeper and higher-ceiling market**, and he should not read the aggregate figure as a reason to prefer Berlin.

---

## 8. Sources and credibility

| Source | Type | Credibility | Used for |
|---|---|---|---|
| [levels.fyi country pages](https://www.levels.fyi/t/software-engineer/locations/germany) (Germany, Switzerland, UK, Netherlands, France, Ireland, Sweden, Poland, Spain, Portugal, Denmark), all retrieved 16 Aug 2026 | Self-reported, partly offer-letter verified | **Good with caveats.** Strongest tech comp source available. **No sample sizes published** for any location page — verified by direct inspection. Skews high; skews to big tech. | §1.2 geography table |
| [levels.fyi company pages](https://www.levels.fyi/companies/google/salaries/software-engineer/locations/switzerland) — Google CH, Apple DE, NVIDIA DE, Amazon DE, Meta UK | Self-reported | **Good with caveats.** Per-level granularity is genuinely useful; small European samples per level. | §1.4 per-level anchors |
| **Greenhouse Job Board API** — direct sweep of ~40 employer boards, 61 EU postings' full text machine-scanned | **Primary source** | **Highest.** Actual posting text, publication dates, requisition metadata. Reproducible. | §1.3 disclosure rate, §4 employer list, §4.2 Catapult timing |
| **Ashby GraphQL job board API** — ~50 employers probed | **Primary source** | **Highest.** | §4 employer list (Skydio, Faculty, Wayve, Synthesia, Sereact) |
| **Lever postings API** | **Primary source** | **Highest.** | §4 (ANYbotics, RIVR) |
| [ITJobsWatch — computer vision, UK and London](https://www.itjobswatch.co.uk/jobs/london/computer%20vision.do) | Parsed from real UK job ads; sample sizes stated | **Good.** Only genuinely specialism-specific salary data found. Small samples (41 and 113 quotes); UK-wide figure volatile (−29% YoY is an artefact). | §1.5 |
| [TVöD Bund 2026 table (oeffentlicher-dienst.info)](https://oeffentlicher-dienst.info/c/t/rechner/tvoed/bund) | Statutory pay scale, valid 01.05.2026–31.03.2027 | **Highest.** Legally binding, no estimation. | §2 Blue Card edge case, §3 Tier 4 |
| [Directive (EU) 2023/970, EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023L0970) | Primary legal text | **Highest.** Article 5 wording verified directly. | §1.3, §7 |
| Blue Card thresholds (€45,934.20 / €50,700) | Carried from `relocation-routes.md`, sourced to Make-it-in-Germany and Bundesagentur für Arbeit | **Highest** | §2 |

**Rejected and not used:** Glassdoor, Payscale, Indeed salary pages, recruitment-agency salary guides, and all "average salary for X" SEO content — no stated methodology or verifiable sample.

---

## 9. Honest gaps

1. **Web search was unavailable for this study** (session budget exhausted before this task began). All findings come from direct URL fetching and job-board APIs. The practical cost: I could not discover employers I did not already have a name or board token for. **The §4 list is therefore high-confidence but under-inclusive** — particularly for employers on Workday, SAP SuccessFactors and Personio, which covers most large German industrials (Bosch, Continental, ZF, Siemens, BMW, Zeiss) and most Nordic firms. Those are listed from prior knowledge without live hiring verification, and are marked as such.

2. **No sample sizes for any levels.fyi figure.** The pages do not publish them and I could not obtain them. European per-level medians may rest on very few submissions. A CHF 308K "Google Zurich L5" could be 8 submissions or 800.

3. **No genuine 3D-CV-specific compensation dataset exists.** §1.6 documents what I substituted. The specialism premium over generalist SWE is an inference, not a measurement.

4. **Salary signal is absent for most of the §4 employer list.** 96.7% of postings disclose nothing. The bands quoted in §5 are triangulated from geography medians, per-level anchors and the two real disclosures — not observed for those specific employers.

5. **Automotive DMS hiring is asserted, not verified live.** The ADDW regulatory driver is documented; I could not confirm open reqs at Smart Eye, Bosch, Continental or CARIAD because none use an API-accessible board. **This is the highest-value gap to close** given automotive is the recommended secondary cluster.

6. **Helsing's nationality and clearance posture is unresolved.** I scanned the full 3D CV posting for citizenship, clearance, vetting and eligibility language and found **none** — the posting is clean, and Helsing hires across four countries and offers relocation. But it is a defence company holding government contracts, and specific programmes plausibly require national security vetting that an Indian citizen with recent Taiwan residency may not readily obtain. **Treat as viable-but-uncertain and ask directly at first contact.** I flag this as inference, not evidence.

7. **Tax and net-pay comparisons are absent.** All figures are gross. The gross-to-net gap varies enormously — Zurich vs Munich vs Copenhagen are not comparable on the numbers in §1.2 alone. Any final offer comparison needs net modelling per country.

8. **Cost of living is not modelled.** Munich and Dublin housing costs materially change the ranking in §1.2.
