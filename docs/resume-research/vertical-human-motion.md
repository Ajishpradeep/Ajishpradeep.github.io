# Vertical Analysis — Sports Science / Human-Motion AI: Asset or Niche Trap?

Research question: does deep specialisation in sports-science and human-motion AI
help or hurt Pradeep's positioning for a European research/perception engineering
role, and which adjacent markets absorb the identical skill set?

Every claim below is tied to a named, dated source in
[Sources](#10-sources-with-credibility-notes). Where evidence is thin it is marked
as such in [Honest gaps](#11-honest-gaps) rather than padded out.

Builds on `domain-demand.md`, `title-positioning.md`, `seniority-trajectory.md`.
It does not restate them; where it corrects them, that is flagged explicitly.

---

## 0. The call, stated up front

**Asset as evidence. Trap as identity.**

The sport-science work is the single most valuable *proof* on his CV and the
single most dangerous *label*. Both halves of that sentence are supported by
hard evidence, and they resolve into one instruction:

> Lead with the capability — 3D human perception that runs on device. Let sport
> be the proving ground that demonstrates it, never the category that contains it.

Three findings drive this, and the second is the one that settles the argument.

1. **The human-motion vertical is genuinely tiny by posting volume.** In a sweep
   of 3,782 live postings across 30 companies deliberately loaded with
   motion-adjacent employers, only 25 postings (0.7%) mentioned any human-motion
   term at all, and most of those were mechanical-engineering "biomechanics"
   false positives. Exactly **one** posting in the entire sample used the phrase
   "3D human pose". By contrast, 69 postings (1.8%) mentioned on-device / edge
   inference terms. **His deployment substrate is ~3× more in demand than his
   domain**, even in a sample stacked in the domain's favour. (§1.1)

2. **The vertical's own employers rank the domain as a nice-to-have and the
   substrate as a requirement.** This is the decisive evidence, and it comes from
   the hiring managers themselves rather than from career-advice opinion.
   Catapult — the healthiest company in sports tech — puts *multi-view geometry,
   camera calibration, TensorRT/ONNX quantisation* in **WHAT YOU'LL NEED**, and
   puts *"A genuine interest in sports analytics, tracking technology, or elite
   human performance"* in **NICE TO HAVE**. Sword Health does the same thing:
   production CV depth is required, *"Experience with pose estimation, body
   modeling, movement intelligence, or human-motion work"* sits under **"What we
   would love to see"**. (§4.1)

3. **He has already crossed a vertical boundary once**, retail CV → sport
   science, using the same substrate. That is not a talking point; it is the
   portfolio-level proof that the substrate is the transferable asset. It should
   be made visible on the page rather than left for a reader to infer. (§4.3)

**Practical calibration:** name the sport domain, keep the elite-sport proof
(PGA Tour usage, K.J. Choi, TAITRA), and subordinate it grammatically. "Golf"
should never be the first noun a recruiter's eye lands on. Concrete wording in
§7.

---

## 1. Market reality — how big and how healthy

### 1.1 The quantitative sweep (primary evidence, collected for this document)

I pulled full posting text from every company I could reach through the
Greenhouse, Lever and Ashby public job-board APIs, choosing a company list
deliberately weighted toward motion-adjacent employers (sports tech, humanoid
robotics, XR, digital health, AV, wearables).

**Sample: 3,782 live postings across 30 companies with open roles, August 2026.**

| Term cluster | Postings | Share |
|---|---|---|
| Any human-motion term (`human pose`, `human motion`, `body track`, `markerless`, `SMPL`, `skeletal track`, `gait analys`, `biomechan`, `motion capture`, `mocap`) | 25 | 0.7% |
| Geometry substrate (`multi-view geometry`, `triangulat`, `camera calibrat`, `3D reconstruct`, `epipolar`, `structure from motion`) | 12 | 0.3% |
| **On-device / edge (`on-device`, `edge inference`, `TensorRT`, `Core ML`, `quantiz`, `ONNX Runtime`)** | **69** | **1.8%** |

Breaking down the 25 human-motion hits by company shows how soft the number is:

| Company | Hits / total postings | What the hits actually are |
|---|---|---|
| Figure AI | 16 / 127 | 8 are *mechanical* engineers where "biomechanics" describes hand/actuator design. Only 1 is a real perception role. |
| 1X | 3 / 83 | A Biomechanics Researcher (robot design, not perception) + 2 incidental |
| Catapult | 1 / 28 | "biomechanics" inside an ML/data infra JD |
| Hudl | 1 / 24 | incidental |
| Agility Robotics | 1 / 62 | teleoperation architecture, mentions motion capture as a data source |
| Oura | 1 / 107 | Human Factors Researcher |
| Humanoid (London) | 1 / 84 | teleoperation |
| **Sword Health** | **1 / 25** | **the only posting in 3,782 that says "3D human pose"** |

**Why this matters and what it does not prove.** It is a genuine measurement, not
a projection. But the sample only covers companies that publish through open ATS
APIs, which systematically excludes Meta, Apple, Sony/Hawk-Eye, Smart Eye, Bosch,
Continental, Vicon and most European mid-caps — all of whom use closed systems.
So the *absolute* count understates the market. The *ratio* is the robust finding:
even inside a curated pool of motion-adjacent companies, the on-device deployment
skill appears roughly three times more often than the human-motion domain. Any CV
that leads with the domain is optimising for the smaller signal.

This **corrects a possible over-reading of `domain-demand.md`**: that document
correctly established vision < LLM by volume. This one establishes a second,
tighter nesting — *human-motion vision is a small fraction of vision itself*,
while *edge deployment is broader than either*.

### 1.2 The vertical's health is sharply bifurcated

Sports tech is not one market. It splits cleanly into a healthy software/data
business and a distressed hardware-mocap business, and the difference determines
whether a given employer is a good bet.

**Healthy — data/SaaS sports tech**

- **Catapult Group (ASX:CAT)**, FY26 results announced 20 May 2026: revenue
  **US$140.7M, +19%** constant currency; management EBITDA **+67% to US$24.7M**;
  **ACV +28% to US$133.8M** (+18% organic, excluding the Perch and IMPECT
  acquisitions); 506 new multi-solution pro teams, +62% YoY. Profitable, growing,
  and acquiring. This is audited public-company reporting, not a vendor claim.
- Catapult is simultaneously running **three open computer-vision roles in
  London** — Computer Vision Engineer, Senior CV & Tracking Engineer, Principal
  CV & Tracking Engineer. A three-rung ladder open at once is a team being built,
  not a backfill.

**Healthy — and growing faster, in the adjacent automotive interior-sensing
segment**

- **Smart Eye AB (Gothenburg)**, Q1 2026: net sales **SEK 126.5M, +40%**; organic
  growth **+51%**; automotive segment **+122%**; software licensing revenue
  **+200%**; EBITDA **SEK 26.9M**, up from a **loss of SEK 17.9M** a year
  earlier. The company attributes this directly to the EU General Safety
  Regulation moving vehicle programmes from development into serial production.
  See §3.3 — this is the single strongest demand signal found anywhere in this
  research.

**Distressed — hardware motion capture**

- **Movella / Xsens (Enschede, NL)** — the inertial-mocap incumbent — delisted
  from Nasdaq **April 2024**, filed Form 15 to suspend SEC reporting in **January
  2025**, completed a **restructuring with secured lenders following events of
  default** in May 2025, and now trades at **$0.0002**. It has rebranded back to
  Xsens. The company that defined wearable motion capture has been effectively
  wiped out as an equity story.

**Thin — pure markerless-mocap startups**

- **Move.ai (London)**: $10M seed, October 2023 (VentureBeat). No subsequent
  round found. No working careers page at `/careers`, `/company/careers`. Their
  public *About* page is currently serving **placeholder template content** —
  the named "team" (Alex Morgan, Taylor Kim, Jordan Patel, Casey Rivera) and
  testimonials ("Taylor Morgan", "Jordan Lee") are generic filler names, not
  real people. I am not drawing a conclusion about the company's viability from
  a website defect, but as an *employer signal* — no round in ~3 years, no
  careers page, unfinished marketing site — Move.ai should not be planned around.

**Contracting — weak evidence, flagged**

- **Kitman Labs (Dublin)**: $82.3M raised total; currently **one** open role
  group-wide, a frontend developer. Glassdoor reviews reference "3 rounds of
  layoffs in the last 1.5 years". Glassdoor is anecdotal and self-selecting; the
  single-open-role datapoint is verifiable and points the same direction. Treat
  as suggestive, not established.

**Perfect fit, but not hiring**

- **Vicon / Oxford Metrics (Oxford, LSE:OMG)** is launching **Nexus Markerless**
  for life sciences in 2026 — explicitly targeting *biomechanics, clinical gait
  analysis, and sports science*. That is Pradeep's exact domain, at a UK company,
  as a new product line with recurring-revenue ambitions. But the group's live
  Pinpoint feed carries **two** open roles total (an electrical design engineer
  at a different subsidiary, and an FP&A manager). Neither is CV. **The
  best-matched company in Europe is not currently hiring for it.** This is the
  clearest single illustration of the vertical's problem: high fit, low volume.

**A useful negative**

- **Sportradar** has **62 live jobs** across Vienna, Ljubljana, Warsaw, Bremen,
  London, Sevilla, St. Gallen, Athens — a large European engineering footprint —
  and **zero computer-vision roles**. Sports *data* is a large European employer;
  sports *vision* is not the same market and must not be counted as one.

---

## 2. Who actually hires for 3D human motion AI

Verified live postings first, then named-but-unverified employers.

### 2.1 Verified live postings (pulled from ATS APIs, August 2026)

**Sword Health — Senior Computer Vision Engineer, Porto, Portugal**
`jobs.lever.co/swordhealth/e7126f07-242a-494b-8f51-ea2c90943bf8`

The closest match to Pradeep's profile found in the entire research. Verbatim
from the posting:

> "The Computer Vision team, part of the Algorithms org, builds the models behind
> that. We turn a camera feed into an accurate read of human movement, **2D and
> 3D pose and body dynamics, in real time, on-device or in-the-cloud**, and turn
> that movement into clinical signals."

Responsibilities include *"Own core computer vision models, from 3D human pose to
statistical body modeling"*, *"Ship those models to run real-time in the cloud and
on-device on tablets, owning the conversion and optimization in between"*, and
*"Extend movement understanding into multimodal territory, combining it with
language and reasoning"*.

That last bullet is worth pausing on: **this role wants 3D human pose + on-device
optimisation + LLM/multimodal reasoning — the exact three-way intersection
`domain-demand.md` identified as his rare combination.** It is direct
confirmation that the intersection thesis is not theoretical.

Company scale: >$500M raised (Khosla, General Catalyst, Founders Fund), 1M+
members, 15M+ AI sessions, 59 clinical studies, 43 patents.

⚠️ **Visa signal, negative and explicit:** *"this position does not offer
relocation assistance. Candidates must possess a valid EU visa and be based in
Portugal."* This is the only hard sponsorship statement found in the whole sweep,
and it is a bar, not an invitation. Sword is a target only if EU status is
resolved first.

**Catapult — Computer Vision Engineer, London**
`job-boards.greenhouse.io/catapultsports/jobs/8071128`

Requirements read as a checklist of his substrate:

> **Geometric Computer Vision:** Develop robust mathematical pipelines for camera
> calibration, homography estimation, and coordinate mapping…
> **Core Algorithmic Background:** …classical computer vision (**multi-view
> geometry**, object tracking, spatial transformation)…
> **Execution Graph Optimisation:** Familiarity with optimising model runtimes and
> inference execution graphs for real-time applications using **TensorRT or ONNX
> Runtime** (e.g., quantisation, layer fusion).

Nice-to-haves include *"projective geometry"* and *"Sports Video Benchmarks…
SoccerNet, SportsMOT"*, and — critically for §4 — *"Domain Alignment: A genuine
interest in sports analytics, tracking technology, or elite human performance."*
**Interest**, not experience.

**Catapult — Senior Computer Vision & Tracking Engineer, London (hybrid)**
`job-boards.greenhouse.io/catapultsports/jobs/8124397` — updated 12 Aug 2026

The best-matched open role found. Requires only **4+ years**, which places it at
his seniority (consistent with `seniority-trajectory.md`'s borderline-Senior
finding). Verbatim:

> "…building the perception stack that turns vision data into athlete performance
> insights — from neural network inference on edge AI accelerators, to 3D object
> tracking, to the data science that validates and extends what our system can
> measure. Today, that means tracking barbell-based weightlifting with sub-rep
> precision; **tomorrow it means general human movement.**"

Nice-to-haves: *"3D geometry, state estimation, filtering, optimization"*,
*"depth cameras… and 3D perception"*, *"embedded Linux, **Docker on ARM**, and
systems-level debugging"*. **No SLAM requirement. No SMPL requirement.**

**Catapult — Principal Computer Vision & Tracking Engineer, London** — same team,
8+ years, player-coach over 1–2 engineers. Relevant as the ceiling above the
Senior role, not as a current target.

**Genius Sports — Senior Software Engineer, Edge Vision Platform, Lausanne,
Switzerland** `boards.greenhouse.io/geniussports/jobs/7832876003`

> "…we are looking to increase our capabilities for capturing video and running
> computer vision algorithms at the edge. This role focuses on the Vision
> platform, which consists of **an iOS application running on iPhone-based
> cameras in sport venues**, and the backend web services that support this
> fleet."

An iOS-based on-device sports vision fleet in Switzerland. The platform/backend
emphasis makes it a partial rather than perfect match, but the technology
overlap — Apple silicon, on-device inference, sport — is unusually exact. Genius
Sports owns Second Spectrum, which produces *"tracking, skeletal pose, eventing,
and video streams"*.

**Veo — Machine Learning Engineer, Copenhagen** `jobs.lever.co/veo/ca215f17…`

AI team of **15 researchers and engineers**; 50,000+ clubs in 90+ countries.
Responsibilities include *"Write efficient inference pipelines for cloud and
edge"*. Notably: *"Experience with computer vision is advantageous but not a
must"* — an unusually open door, and evidence that this employer weights
engineering capability over domain.

**KINEXON — Computer Vision Engineer (m/f/d), Munich**

Building a vision-based Local Positioning System for player and ball tracking;
tracking pipelines and statistics aggregators for sport. A real German sports-CV
employer. (Sourced via Built In listing rather than a direct API pull — see
honest gaps.)

**Figure AI — Helix AI Engineer, Localization and Mapping, San Jose**
The only robotics posting in the sweep that names both **"human motion"** and
**"human pose"** — but in the same JD as *structure from motion* and *3D
reconstruction*, i.e. gated by the SLAM gap.

**Humanoid — London** (UK humanoid startup, 84 open roles). Deep-learning team
entirely in London: World Models, VLA pre-training, RL manipulation/
locomanipulation, Neural Network Performance Engineer. But the perception role is
*"Senior Autonomy Engineer – SLAM & Navigation"*. **Confirms and sharpens
`domain-demand.md`'s robotics assessment: the European humanoid door exists, and
the SLAM gap is exactly what closes it.**

### 2.2 Named employers where hiring is credible but not API-verifiable

- **Hawk-Eye Innovations / Sony Sports (Basingstoke, London, Bristol)** — ball,
  player and object tracking across tennis, football, cricket; JDs describe
  *"multi-view geometry, image processing"*. Their SkeleTRACK product does
  skeletal player tracking for semi-automated offside. Their Pinpoint job feed
  returned empty at fetch time, so I could not confirm which roles are open now.
- **Meta Reality Labs, Zurich** — the Mixed Reality org there covers machine
  perception, Avatars, and AR/VR remote presence. Codec Avatars is the flagship
  3D-human programme (Embody 3D: 500 hours of multi-camera 3D motion from 439
  participants). The most substantial 3D-human-motion research team in Europe.
- **Niantic (London, Zurich, Hamburg)** — CV roles exist, but the ones found are
  *reconstruction* and *AR mapping* flavoured, i.e. SLAM-gated.
- **Snap** — holds a patent on *"Egocentric human body pose tracking"*; body
  tracking is an active area.
- **Vicon (Oxford)** — Nexus Markerless for life sciences, 2026. Not hiring now.
- **Smart Eye (Gothenburg)**, **Seeing Machines (UK/Australia)**, **Bosch**,
  **Continental**, **Aptiv**, **Xperi** — automotive interior sensing, §3.3.

---

## 3. Adjacent markets, ranked

Ranked by *directness of transfer* (does he need retraining?) × *hiring volume*.

### Tier 1 — identical skill set, real and current openings

**1. Digital MSK / rehab / movement health — the strongest transfer found**

Ranked first despite a smaller employer count because the *fit is exact* and the
roles are open. Sword Health's JD is a line-for-line description of what he
already does: camera → 2D and 3D pose → body dynamics → real-time, on-device →
downstream clinical reasoning, with a multimodal LLM layer on top. Zero
retraining. His golf-swing biomechanics work — validated against published
anthropometric ratios, with kinematic event detection — maps directly onto
"movement quality assessment against clinical norms".

Employers: **Sword Health (Porto/Lisbon)**, Hinge Health, Kaia Health (Munich),
Exakt Health. Plus clinical gait labs, which Vicon is explicitly courting.

Caveat: regulatory (MDR/CE marking) overhead is real in clinical products, and
the Sword posting bars visa sponsorship.

**2. Sports technology proper**

Directness: identical, obviously. Volume: small in absolute terms but
**disproportionately European and currently open** — Catapult ×3 London, Genius
Sports Lausanne, Veo Copenhagen, KINEXON Munich, Hawk-Eye UK, Hudl London. For a
Europe-targeting candidate this punches above its global weight. Health is good
at the top (Catapult) and poor at the hardware-mocap end.

**3. Driver and occupant monitoring / automotive interior sensing — highest
volume, regulation-forced**

This is the finding most likely to be under-weighted, and the demand driver is
not a market projection but a law that took effect **five weeks before this
document was written**.

Under the **EU General Safety Regulation**, **Advanced Driver Distraction Warning
(ADDW) became mandatory on all new vehicles sold in the EU from 7 July 2026**
(following Driver Drowsiness and Attention Warning, DDAW, in July 2024). Every
new car sold in Europe now ships an infrared camera doing real-time head-pose and
gaze estimation on embedded hardware, with hard latency thresholds written into
the regulation (warning after 6s of off-road gaze below 50 km/h, 3.5s above).

Smart Eye's Q1 2026 numbers (§1.2) are what that mandate looks like on an income
statement: automotive +122%, software licensing +200%, EBITDA swinging from
−17.9M to +26.9M SEK.

Transfer quality: **high but not perfect.** It is camera-based human perception
under real-time embedded constraints — his substrate exactly. But the perception
target is face, gaze, head pose and occupant body pose rather than full-body
multi-view triangulation, and automotive brings a genuine learning curve in
functional safety (ISO 26262) and OEM programme cadence. Call it a 70–80%
transfer with a 6-month domain ramp, against a market growing at 40%+ with legal
compulsion behind it.

Employers, Europe-heavy by nature: **Smart Eye (Gothenburg)**, **Seeing Machines
(UK)**, **Bosch**, **Continental**, **Aptiv**, **Xperi/DTS**, plus every European
Tier-1 and OEM building compliance in-house.

### Tier 2 — strong substrate transfer, partially gated

**4. XR / spatial computing**

Body tracking, hand tracking and avatars are precisely this substrate, and Meta
Reality Labs Zurich is the largest concentration of 3D-human-motion research in
Europe. But the *mapping and reconstruction* roles — which are the majority of
posted XR CV roles — require SLAM/VIO and increasingly Gaussian splatting, which
is exactly the confirmed gap. **Target body/hand-tracking and avatar teams; do
not apply to AR-mapping teams.** This is the same distinction prior research
found at Helsing (3D Computer Vision variant excludes him, general Computer
Vision variant does not), and it generalises.

Employers: Meta Reality Labs (Zurich), Niantic (London/Zurich/Hamburg), Snap,
Apple, Varjo (Helsinki), Ultraleap (Bristol).

**5. Humanoid robotics and HRI**

Real demand for human-motion understanding — human demonstration data,
teleoperation retargeting, human-aware navigation. Figure's Helix perception role
names human pose and human motion; 1X runs a dedicated Biomechanics Researcher;
Agility's teleoperation architecture role names motion capture. But: the roles
are overwhelmingly **US-located** (Figure and 1X both San Jose / San Carlos;
Agility Fremont/Salem/Pittsburgh), and the European option (Humanoid, London) is
RL/VLA/SLAM-shaped. **This refines `domain-demand.md`'s conclusion:** the
robotics bridge is real, the SLAM gate is real, and the additional constraint not
previously captured is *geography* — the human-motion-friendly humanoid roles are
in California.

**6. Animation, games, virtual production**

Directness is high; hiring is thin and US-weighted; and the segment's incumbent
vendors are the distressed ones (Movella/Xsens). Vicon Shōgun, Epic, Unity,
Wonder Dynamics, DeepMotion, RADiCAL. Deprioritise.

### Tier 3 — substrate transfers, domain does not

**7. Autonomous driving / ADAS perception**

**Wayve (London)** was the only employer besides Catapult in the entire 3,782-
posting sweep whose JDs pair *multi-view geometry* and *3D reconstruction* with
*inference optimisation* roles (Staff ML Performance Engineer – Inference
Optimisation; Staff ML Performance Engineer – Compiler; Research Scientist,
Wayve Labs, London). His geometry and edge skills transfer cleanly; his human-
motion domain does not, and some roles are SLAM-gated. Worth applying to for the
substrate roles specifically.

---

## 4. Asset or pigeonhole — the evidence

### 4.1 The employers themselves answer this

The cleanest evidence is structural: **where in a JD does the human-motion domain
appear?** In every posting examined, it appears in the *optional* section while
the geometric and engineering substrate appears in the *required* section.

| Employer | REQUIRED | OPTIONAL / NICE TO HAVE |
|---|---|---|
| Catapult (CV Engineer, London) | multi-view geometry, camera calibration, object tracking, PyTorch/TF, Python+C++, TensorRT/ONNX quantisation, Docker/AWS | *"Domain Alignment: A genuine **interest** in sports analytics, tracking technology, or elite human performance"*; SoccerNet/SportsMOT benchmarks; projective geometry |
| Sword Health (Senior CV, Porto) | 5+ yrs CV in production, depth in **one of** detection/segmentation/tracking/pose/3D, MLOps, multimodal, PyTorch/JAX | *"**Experience with pose estimation, body modeling, movement intelligence, or human-motion work**"* |
| Catapult (Senior CV & Tracking) | 4+ yrs, production ownership, Python + C/C++, ambiguity ownership | CV/ML experience; 3D geometry, state estimation, filtering; depth cameras; Docker on ARM |
| Veo (MLE, Copenhagen) | MSc/PhD, large-scale ML, strong coding | *"Experience with computer vision is advantageous but not a must"* |

Read the Catapult Senior row again: **computer vision itself is a nice-to-have**
for a computer vision role at the leading sports-tech company. What is required is
production engineering judgement.

This is the answer to "is golf-swing biomechanics impressive specialisation or
narrow?" — **neither, to a hiring manager, because it is not the thing being
assessed.** Domain is a tiebreak and a signal of motivation. The substrate is the
gate. A CV that leads with the domain is competing on the tiebreak.

### 4.2 The corollary: domain still earns something real

Two things, and they are worth keeping:

- **Motivation signal.** Catapult explicitly asks for *interest* in elite human
  performance. Someone who shipped a product used by PGA Tour professionals
  clears that bar without argument, and clears it against candidates who cannot.
- **Validation literacy.** The rarest thing on his CV is not pose estimation —
  it is having validated a 3D reconstruction against published anthropometric
  ratios across 204 bone measurements, and having reduced event-detection timing
  error by 73%. Sword's JD asks for someone who *"turn[s] that movement into
  clinical signals"* and builds *"evaluation"*; Catapult's Senior role asks the
  holder to *"analyze tracking accuracy, build quality metrics"*. **Ground-truth
  validation of human-motion measurement is a scarce, transferable skill, and it
  happens to be exactly what a sport-science vertical teaches.** This is the one
  place where the domain experience is genuinely load-bearing rather than
  decorative — and it transfers verbatim into clinical, automotive-safety and
  robotics-evaluation contexts.

### 4.3 The retail → sport crossing is the argument, and it should be visible

He has already moved his substrate across two unrelated verticals — dense
detection plus triplet-loss embeddings for open-set retail product recognition
across 7,000+ stores, then multi-view 3D human pose for golf. A reader who sees
both on one page cannot conclude "sports guy". A reader who sees only the recent
role can.

**Implication for CV structure:** do not let the 7-ELEVEN work compress to a
single line as it recedes in time. It is not just prior experience; it is the
counterexample that disproves the pigeonhole. Keep enough of it visible that the
pattern — *same geometric/embedding substrate, different vertical* — is legible
at a glance.

### 4.4 What I could not establish

I could not find credible, named-practitioner or survey evidence on how hiring
managers *subjectively* react to vertical-switching CVs. Searches returned SEO
listicles and recruiter content-marketing, which I rejected. The argument in §4.1
is stronger anyway because it is behavioural — what employers *write into their
own requirement sections* — rather than attitudinal. But the subjective question
remains genuinely open. See honest gaps.

The one credible practitioner source found is Nikolay Falaleev (Computer Vision
Lab), writing under his own name on the structural similarity between sports
analytics and autonomous-vehicle stacks: both require *"precise calibration"* and
*"extrinsic calibration to align data from different sensors"*, both use
spatio-temporal multi-task networks, and football pitch-control analysis is
structurally the same problem as probabilistic trajectory prediction for AVs.
It supports the transfer thesis, though it is one engineer's blog post, not
hiring data.

---

## 5. Europe-weighted employer list

| Employer | HQ / EU sites | What they do with human motion | Live CV/ML role found? | Remote / visa notes |
|---|---|---|---|---|
| **Catapult** | London (also Köln, Melbourne, Boston) | Athlete tracking, edge CV, movement recognition; "tomorrow… general human movement" | ✅ **3 open, London** (CV / Senior / Principal) | Hybrid, London-based. No sponsorship statement either way. Also has a Taoyuan, **Taiwan** manufacturing site — a possible internal-transfer angle worth probing |
| **Sword Health** | Porto & Lisbon, PT | 2D/3D pose + body dynamics, on-device on tablets, → clinical signals + multimodal LLM | ✅ **Senior CV Engineer, Porto** | Remote/hybrid within Portugal. ⚠️ **Explicitly no relocation; requires existing valid EU visa** |
| **Smart Eye** | Gothenburg, SE | Driver & interior sensing: gaze, head pose, occupant monitoring, embedded | Algorithm teams recruiting MLEs (site-confirmed, no API) | On-site Gothenburg culture. Sweden has a functioning work-permit route |
| **Genius Sports / Second Spectrum** | Lausanne CH, London | Player tracking, **skeletal pose**, edge CV on **iPhone-based venue cameras** | ✅ Senior SWE, Edge Vision Platform, Lausanne | Switzerland — non-EU, separate permit regime, quota-limited for third-country nationals |
| **Hawk-Eye / Sony Sports** | Basingstoke, London, Bristol | Ball/player/object tracking, SkeleTRACK skeletal tracking, multi-view geometry | Roles exist; feed empty at fetch — unconfirmed | UK; Sony-backed, established sponsor of skilled-worker visas historically |
| **KINEXON** | Munich, DE | Vision-based local positioning, player & ball tracking | CV Engineer (m/f/d), Munich | Germany — EU Blue Card route is the cleanest in Europe |
| **Veo** | Copenhagen, DK | Automatic sports camera; AI team of 15; cloud + **edge** inference | ✅ Machine Learning Engineer | CV experience *"advantageous but not a must"* — unusually open |
| **Hudl** | London, Barcelona, Chiavari IT | Sports video & analysis | Senior Engineer, London (UK Remote listed) | Explicit UK-remote option on one role |
| **Meta Reality Labs** | **Zurich** | Codec Avatars, body tracking, remote presence — largest 3D-human research group in Europe | Roles exist (closed ATS) | Big-tech relocation support typical; research bar is high |
| **Niantic** | London, Zurich, Hamburg | AR mapping, 8th Wall | Roles exist | ⚠️ CV roles found are **reconstruction/SLAM-gated** |
| **Vicon / Oxford Metrics** | Oxford, UK | **Nexus Markerless** for life sciences 2026: biomechanics, clinical gait, sports science | ❌ 2 group-wide roles, neither CV | Perfect domain fit, no current opening. Worth a speculative approach |
| **Wayve** | London | AV; multi-view geometry + 3D reconstruction + **inference optimisation** roles | ✅ Several, London | Substrate transfer only; strong European AI employer |
| **Humanoid** | London | Humanoid robotics; large London DL team | ✅ Many, London | ⚠️ Perception role is **SLAM & Navigation** — gated |
| **Kitman Labs** | Dublin, IE | Sports intelligence platform | ❌ 1 role, frontend | Contraction signals — deprioritise |
| **Sportradar** | Vienna, Ljubljana, Warsaw, Bremen, London, Sevilla | Sports **data**, not sports vision | ❌ 62 roles, **zero CV** | Large EU employer, wrong discipline |
| **Movella / Xsens** | Enschede, NL | Inertial mocap | — | ⚠️ Delisted, defaulted, restructured. Avoid |
| **Move.ai** | London | Markerless mocap | ❌ no careers page | ⚠️ $10M seed 2023, nothing since; placeholder website content |

**Europe verdict:** the vertical is *more* viable in Europe than globally.
London is the single densest node (Catapult ×3, Hawk-Eye, Hudl, Wayve, Humanoid,
Move.ai), followed by a German/Nordic cluster (KINEXON Munich, Smart Eye
Gothenburg, Veo Copenhagen) and two strong outliers (Sword Porto, Genius
Lausanne, Meta Zurich). That is a genuinely workable target list — roughly 8–12
credible employers with live or near-live roles, which is thin for a broad search
but sufficient for a focused one.

---

## 6. Does the SMPL gap gate this vertical?

**Short answer: it gates about a fifth of it, it is the cheapest gap he has to
close, and there is a licensing reason it matters less commercially than its
academic prominence suggests.**

### 6.1 The non-obvious licensing fact

The **SMPL academic licence prohibits commercial use outright** — including
*"the use of the Software to train methods/algorithms/neural networks/etc. for
commercial use of any kind"*. Commercial use requires a paid licence, and
**Meshcapade holds the exclusive right to sub-license SMPL commercially** (Max
Planck Gesellschaft, `smpl.is.tue.mpg.de/modellicense.html`; Meshcapade
`meshcapade.com/smpl`).

The consequence is that SMPL is **not** an industry-wide baseline the way, say,
OpenCV or PyTorch is. It is a licensed dependency. A commercial product either
paid Meshcapade for it or deliberately routed around it. That is why it is absent
from every sports-tech JD examined — Catapult, Hawk-Eye, Genius Sports, KINEXON,
Veo all work in skeleton/keypoint space, not parametric mesh space.

### 6.2 Where it does and does not gate

**Gates hard (avoid or close the gap first):**
- Meshcapade itself, and avatar/body-shape companies whose product *is* the mesh
- Digital-human, virtual try-on and body-measurement products
- Research roles at MPI-adjacent labs and Codec-Avatars-style teams

**Does not gate at all:**
- Catapult (all three London roles) — never mentions it
- Hawk-Eye, Genius Sports/Second Spectrum, KINEXON, Veo — skeletal/keypoint
- Automotive DMS — head pose and gaze, not body mesh
- Most sports-tech and tracking work generally

**Named as a preference, not a bar — the important middle case:**
Sword Health's posting puts *"from 3D human pose to statistical body modeling"* in
the responsibilities and *"pose estimation, **body modeling**, movement
intelligence, or human-motion work"* under **"What we would love to see"**. So
even at the employer that most wants it, it is a *bonus*, listed alongside things
he already has ("pose estimation", "human-motion work"). He satisfies the clause
without SMPL.

### 6.3 Recommendation

**Close this gap; do not close the SLAM gap.** The asymmetry is decisive:

- **SMPL** is a bounded, weekend-to-fortnight project. Public tooling is mature
  (SMPLify-X, MMHuman3D, the SMPL Blender add-on). Given that he already has
  multi-view triangulation and 204-bone anthropometric validation, fitting a
  parametric body model to his existing 3D joint outputs is an incremental step,
  not a new discipline — and it produces a demonstrable artefact.
- **SLAM/VIO/Gaussian splatting** is a multi-month capability build, and it gates
  a *different* set of roles (AR mapping, humanoid autonomy, AV localisation)
  that he should be deprioritising anyway per §3.

One small, honest CV line — parametric body-model fitting on top of his existing
multi-view pipeline — converts a stated gap into a stated strength for the Sword-
and Meshcapade-shaped half of the market, at very low cost. **This is the highest
return-on-effort action identified in this document.**

---

## 7. How the CV should frame the sport-science work

### 7.1 The principle

**Frame it as an application of general 3D perception, with the sport named as
the proving ground and the elite-sport credibility preserved as evidence.**

Not "sports-science AI specialist". Not, at the other extreme, a sanitised
"3D perception engineer" with the domain scrubbed out — that would throw away
the PGA Tour usage, the K.J. Choi association and the TAITRA award, which are the
rarest credibility signals he has and cannot be reconstructed.

The resolution is grammatical, not editorial: **capability is the subject, sport
is the prepositional phrase.**

### 7.2 Concrete wording

**Headline** — keep `title-positioning.md`'s recommendation unchanged. It already
does this correctly:

> `AI Research Engineer — 3D Computer Vision, On-Device Perception`

The domain is deliberately absent from the headline. That is right. Do not add
"Sports Science" or "Human Motion" to it.

**Summary line — use this shape:**

> Build 3D human-motion perception systems that run entirely on device —
> multi-view calibration, triangulation and 3D pose lifting, validated against
> ground-truth anthropometry and shipped in a consumer iOS product used by PGA
> Tour professionals. Previously the same substrate for open-set retail product
> recognition across 7,000+ stores.

Why this works:
- "3D human-motion perception" leads — searchable, domain-neutral, correct
- "on device" second — the substrate that §1.1 shows is 3× more in demand
- the sport appears **only as proof of shipping**, in a subordinate clause, and
  it appears as *"PGA Tour professionals"* (credibility) rather than *"golf swing
  analysis"* (narrowness)
- the final sentence pre-empts the pigeonhole in one line, doing the §4.3 job
  explicitly

**Role heading — name the vertical, don't lead with it:**

> `AI Research Engineer, IdeasLab Formosa — 3D human perception for markerless
> motion analysis (sports science)`

Vertical in parentheses. Present, findable, subordinate.

**Bullet-level rules:**

| Instead of | Write |
|---|---|
| "Biomechanical analysis of the golf swing" | "3D kinematic analysis validated against published anthropometric ratios across 204 bone measurements" |
| "Swing-phase detection" | "Temporal event detection under fast motion and occlusion — reduced timing error 73%" |
| "Golf coaching LLM" | "Agentic LLM system grounded in a deterministic rule engine (69 weighted rules, 8 languages) to eliminate hallucinated guidance" |
| "Markerless motion capture" | "Multi-camera calibration, triangulation and 3D reconstruction" — per `domain-demand.md`, avoid "motion capture" as a standalone term |

The pattern: **state the technique, then the domain-specific validation as
evidence of rigour.** Every one of those left-hand phrases reads as golf. Every
right-hand phrase reads as 3D perception engineering that happens to have been
proven on golf — and each is *more* impressive, not less, because it exposes the
hard part.

**Where the sport should be loud:** the credibility artefacts. NVIDIA GTC 2025
poster, TAITRA award (1 of 3 from 638 proposals, 55 countries), PGA Tour usage,
K.J. Choi as advisor/investor. These are unambiguous external validation and lose
their force if genericised. Keep them verbatim and let them sit in an
awards/recognition block where the domain specificity is an asset rather than a
category.

### 7.3 Targeted variants

Because §3 identifies three different Tier-1 markets, one summary line will not
serve all. Recommended swaps of the *first clause only*:

- **Sports tech (Catapult, Hawk-Eye, Genius, KINEXON, Veo):** keep as written;
  add "elite human performance" once. Domain alignment is a stated nice-to-have —
  claim it.
- **Digital health / MSK (Sword, Kaia, Hinge):** lead
  *"3D human-motion perception with clinically-validated measurement"* and
  foreground the 204-bone anthropometric validation and the deterministic
  grounding of the LLM layer. Sword's whole thesis is trustworthy movement
  measurement feeding safe reasoning; his rule-engine grounding is directly on
  point.
- **Automotive interior sensing (Smart Eye, Seeing Machines, Tier-1s):** lead
  *"real-time human perception on embedded hardware, safety-relevant accuracy
  validation"*. De-emphasise multi-camera, emphasise single-camera 3D lifting,
  latency, and validation methodology.

---

## 8. What changes in the other research documents

- `domain-demand.md` — its robotics-adjacency conclusion is **confirmed and
  narrowed**: the SLAM gate is real, and a *geographic* gate not previously noted
  also applies (human-motion-friendly humanoid roles are in California; European
  humanoid roles are RL/VLA/SLAM). Its terminology guidance ("3D human pose
  estimation", avoid "motion capture", avoid "biomechanical analysis" as primary
  frame) is **independently corroborated** by the Catapult and Sword JDs.
- `title-positioning.md` — the recommended headline needs **no change**. This
  research supports leaving the vertical out of it.
- `seniority-trajectory.md` — add **Catapult Senior CV & Tracking Engineer,
  London (4+ years)** alongside the NavVis Munich role as a strongly matched live
  posting. It is arguably the better match of the two: no SLAM requirement,
  explicit edge/ARM emphasis, explicit 3D geometry, and it names general human
  movement as the roadmap.

---

## 9. Summary of the decision

| Question | Answer |
|---|---|
| Asset or trap? | **Asset as evidence, trap as identity.** Lean in ~30%, not 80%. |
| How hard to lean? | Name the vertical; never lead with it; keep elite-sport credibility loud in the awards block, quiet in the headline. |
| Target market cluster | Digital movement health + sports tech + automotive interior sensing — unified as *"real-time human perception on constrained hardware"*. |
| Highest-value single action | Close the SMPL gap (cheap, bounded). Not SLAM (expensive, gates roles he should skip). |
| Best live European target | Catapult Senior CV & Tracking Engineer, London. |
| Biggest under-weighted market | Automotive interior sensing — EU ADDW mandate live since 7 July 2026. |

---

## 10. Sources, with credibility notes

### Primary — job postings pulled directly from employer ATS APIs (highest confidence)

All fetched August 2026 via public Greenhouse / Lever / Ashby / SmartRecruiters
job-board APIs, giving **full posting text** rather than search snippets.

- Catapult — CV Engineer (`.../catapultsports/jobs/8071128`), Senior CV &
  Tracking (`.../8124397`, updated 12 Aug 2026), Principal CV & Tracking
  (`.../7904485`), Senior ML/Data Engineer (`.../8083099`). Employer's own words.
- Sword Health — Senior Computer Vision Engineer, Porto
  (`jobs.lever.co/swordhealth/e7126f07-242a-494b-8f51-ea2c90943bf8`). Full text
  including requirement/nice-to-have structure and the visa clause.
- Genius Sports — Senior SWE, Edge Vision Platform, Lausanne
  (`boards.greenhouse.io/geniussports/jobs/7832876003`).
- Veo — Machine Learning Engineer, Copenhagen (`jobs.lever.co/veo/ca215f17…`).
- Figure AI, Agility Robotics, 1X, Humanoid — full boards via Greenhouse/Ashby.
- Oxford Metrics — live Pinpoint RSS feed (`oxfordmetrics.pinpointhq.com/jobs.rss`),
  2 items, confirming the *absence* of CV hiring.
- Sportradar — SmartRecruiters API, 62 postings, confirming zero CV roles.
- **The 3,782-posting sweep** (§1.1): 30 companies with live postings across
  sports tech, humanoid robotics, XR, AV, digital health, wearables. Reproducible;
  the company list and regexes are stated in §1.1. Credible as a *ratio*
  measurement; biased as an *absolute count* (see gaps).

### Primary — public-company financial reporting (high confidence)

- **Catapult Group (ASX:CAT)** FY26 results, announced 20 May 2026 — revenue
  US$140.7M (+19% cc), management EBITDA +67% to US$24.7M, ACV +28% to
  US$133.8M. Audited, exchange-filed. Credible because a listed company's
  reported revenue carries legal liability, unlike a vendor press release.
- **Smart Eye AB (Nasdaq Stockholm)** Interim Report Q1 Jan–Mar 2026 (published
  on smarteye.se and via MFN/Nasdaq) — net sales SEK 126.5M (+40%), organic +51%,
  automotive +122%, software licensing +200%, EBITDA SEK 26.9M vs −17.9M.
- **Movella Holdings** — Nasdaq delisting (April 2024), Form 15 filing (Jan 2025,
  effective Apr 2025), completion of restructuring with secured lenders following
  events of default (announced 6 May 2025 on xsens.com). SEC-filing-grounded.
- **Oxford Metrics plc (LSE:OMG)** — company announcements re Vicon markerless
  launch (11 Mar 2025) and the FY26 life-sciences markerless platform. RNS
  announcements are regulated disclosures.

### Primary — regulation (high confidence)

- **EU General Safety Regulation**, Advanced Driver Distraction Warning (ADDW),
  mandatory for all new vehicles from **7 July 2026**; DDAW from July 2024.
  Corroborated across multiple independent outlets (Forbes, Reason, Carscoops,
  Autonext) reporting the same date and the same 6s / 3.5s gaze thresholds.
  Credible because it is a legal instrument with a fixed date, not a forecast —
  and because Smart Eye's audited revenue independently confirms the commercial
  effect.

### Primary — licensing terms (high confidence)

- **SMPL Model License**, Max-Planck-Gesellschaft
  (`smpl.is.tue.mpg.de/modellicense.html`) and **SMPL-X**
  (`smpl-x.is.tue.mpg.de/modellicense.html`) — academic licence prohibits
  commercial use including training for commercial purposes.
- **Meshcapade** (`meshcapade.com/smpl`, `github.com/Meshcapade/SMPL_blender_addon`)
  — exclusive commercial sub-licensing rights. Primary legal text from the
  rights-holders themselves.

### Named practitioner (medium-high confidence)

- **Nikolay Falaleev**, Computer Vision Lab —
  *"Deep Learning in Sports and Autonomous Vehicles"* (27 Oct 2023). Writing
  under his own name with a verifiable track record in sports CV. Credible as
  informed technical opinion on structural transferability; **not** hiring data,
  and now ~3 years old.

### Medium confidence — verified content, unverified currency

- **KINEXON** Computer Vision Engineer (m/f/d), Munich — description of the
  vision-based LPS work is specific and consistent with their product, but
  sourced through a Built In listing rather than a direct API pull, so I cannot
  confirm it is currently open.
- **Hawk-Eye Innovations** CV role descriptions ("multi-view geometry, image
  processing"; ball/player/object tracking across tennis, football, cricket) —
  consistent across several independent listings, but their Pinpoint feed
  returned empty, so currency is unconfirmed.
- **Meta Reality Labs Zurich** — Mixed Reality org scope and the Codec Avatars /
  Embody 3D programme are well documented; specific open roles not verified via
  a machine-readable feed.
- **Move.ai** — $10M seed October 2023 (VentureBeat, credible tech press). The
  placeholder website content is a direct observation from fetching
  `move.ai/about`, reported as an employer signal only.

### Low confidence — flagged as such, used only directionally

- **Kitman Labs** layoff history — Glassdoor employee reviews. Self-selecting and
  anecdotal. Used only because it points the same direction as the verifiable
  single-open-role datapoint.

### Rejected

- All "sports tech market to reach $X billion by 2030" reports — unverifiable
  projections from firms selling the report. None cited.
- SEO listicles returned for the hiring-manager-attitudes query (mobilunity,
  tealhq, viso.ai, peopleinai, tekrecruiter, getrocket) — recruiter content
  marketing with no data behind the claims. Rejected, which is why §4.4 states
  the question as open rather than answering it from these.
- SportsPro "20 sports tech ideas to invest in now" and similar listicles —
  editorial, not evidence.

---

## 11. Honest gaps

1. **The 3,782-posting sweep is biased toward open-ATS companies.** It excludes
   Meta, Apple, Sony/Hawk-Eye, Smart Eye, Bosch, Continental, Aptiv, Vicon and
   most European mid-caps, all of whom use closed systems (Workday, Pinpoint with
   auth, bespoke). The 0.7% figure therefore understates the true market size.
   The *ratio* between human-motion and edge-inference terms is the defensible
   finding; the absolute count is not.

2. **Visa sponsorship evidence is very thin.** Exactly one hard signal was found
   in the entire sweep (Sword Health's explicit "no relocation, must already hold
   an EU visa"). For Catapult, KINEXON, Veo, Genius Sports and Hawk-Eye I found
   **no** statement in either direction. Absence of a statement is not evidence
   of willingness. This needs per-employer investigation before any application
   strategy is built on it, and it interacts with `european-market.md`'s
   work-authorisation analysis, which should be treated as authoritative here.

3. **No compensation data was gathered.** Sword's posting references bands but
   does not publish figures in the API payload. Catapult publishes none. Seniority
   and salary calibration should stay with `seniority-trajectory.md`.

4. **Hiring-manager attitudes to vertical-switching remain unmeasured** (§4.4).
   The behavioural argument from JD structure is strong but indirect. I found no
   survey, no named recruiter writing with data, and no hiring-manager account of
   how a "golf biomechanics" line actually reads in a screen. If this matters
   enough to resolve, the realistic route is asking practitioners directly, not
   more searching.

5. **Hawk-Eye's current openings could not be confirmed.** Given Sony's backing
   and their UK footprint they are likely a significant employer, and their JDs
   name multi-view geometry explicitly — but I cannot state what is open today.

6. **Clinical gait analysis was under-researched.** Vicon's life-sciences push
   points at an established market of hospital and university gait labs, but
   these hire through academic and healthcare channels invisible to startup job
   APIs. The transfer looks excellent on paper; the hiring mechanics are unknown.

7. **Second Spectrum / Stats Perform / Theia Markerless / PlaySight / Simi /
   STATSports / Output Sports** were probed but returned no machine-readable
   boards. Their absence from this document reflects tooling limits, not a
   judgement that they are unimportant — though the Second Spectrum work is at
   least partially visible through the Genius Sports board.

8. **The Catapult Taiwan angle is unexplored.** Catapult has a Senior Manager of
   Global Manufacturing role in Taoyuan, Taiwan, which means a legal entity and
   staff in his current country. Whether an internal Taiwan → London path exists
   is unknown and would need a direct conversation, but given his APRC and
   location it is a cheap thing to probe.
