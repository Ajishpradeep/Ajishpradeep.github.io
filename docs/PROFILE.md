# Profile — canonical source of truth

This document consolidates everything real and verifiable about Pradeep Rajasekar
from across the entire portfolio site (`src/data/*.ts`, `src/pages/*.tsx`,
`src/components/*.tsx`) plus the prior standalone resume markdown
(`Pradeep_Rajasekar_Resume_Research_Engineering.md`, kept as one input among many,
not as the source of truth). It is the single place every resume line — on-screen
or PDF — must trace back to.

**Rule for maintaining this file:** every fact here must already exist somewhere
on the live site, or in a corroborating public source cited alongside it. Do not
add anything here that isn't already true and stated elsewhere. If the site changes
(`src/data/*.ts`), update this file to match — it is downstream of the site, not
upstream of it.

Last consolidated: 2026-08-15, from commit `345b7af` (branch `redesign/research-portfolio`).

---

## 1. Identity & summary

- **Name (professional/legal):** Pradeep Rajasekar
- **Alias (used on GitHub, the domain, and any CV forwarded before a visitor
  arrives at the site):** Ajish Pradeep
- **Role:** AI Research Engineer
- **Location:** New Taipei City, Taiwan (About page states "based in Taiwan";
  Contact section states "Taiwan" as the map pin). Open to relocation.
- **Email:** ajishpradeep@gmail.com
- **Experience:** 4+ years in AI (per About page dl: "experience · 4+ years in AI")
- **Languages:** English, Tamil, Malayalam (About page dl: "EN · TA · ML")
- **Status:** Open to research roles / "standing openness to work worth doing"
  (About page: `open to research roles`; `about.open`)

### Citizenship, residency and working preferences

**Provenance note.** Everything in this subsection was stated directly by
Pradeep on 2026-08-15 and appears **nowhere on the site**. It is recorded here
because a direct statement from him outranks the site as a source — but it is
flagged separately so nothing downstream mistakes it for something a visitor
could verify from the public record.

- **Citizenship:** Indian.
- **Residency:** Holds a Taiwan **APRC** (Alien Permanent Resident Certificate)
  — permanent residency in Taiwan, not citizenship. Practically this means open
  work rights in Taiwan with no employer sponsorship and indefinite right to
  stay; it confers nothing in the EU.
- **Timezone:** UTC+8.
- **Education route:** MSc completed in Taiwan (see §3), which is relevant to EU
  Blue Card qualification and to degree-recognition questions.
- **Work preference:** **Remote** going forward, primary target market
  **Europe**, while remaining globally credible. Open to relocation.
- **Identity he wants:** *AI Research Engineer* — with genuine applied and
  production depth, explicitly not positioned as pure research.
- **Current vertical:** 3D computer vision / human-motion AI, presently deep in
  **sport science**.

### Links
| Label | URL |
|---|---|
| Email | mailto:ajishpradeep@gmail.com |
| GitHub | https://github.com/Ajishpradeep |
| LinkedIn | https://linkedin.com/in/ajishpradeep |
| Domain (from prior resume) | https://ajish.online/ |

### Site's own positioning language (source: `src/data/site.ts`, `PRODUCT.md`)

- Tagline: "AI research engineer working across 3D vision, LLM systems and
  on-device inference."
- Intro (his own wording, used verbatim on the homepage): "The fine line
  between hallucination and prediction is not magic or a data dump, it maths.
  I engineer AI where the mathematics is explicit and the physics is enforced.
  It may be an LLM, a vision or multimodal system, generative or predictive —
  the domain changes, the mathematics does not."
- Differentiator line: "A metric that cannot see a fault will certify it.
  Those are the failures I build against."
- About page headline: "I work on the part of AI that has to be true."
- Positioning per `PRODUCT.md`: "3D computer vision where the mathematics is
  explicit and the physics is enforced — multi-view geometry, constrained
  optimisation, and anatomical priors compiled into the network itself, so
  output is physically possible by construction rather than merely plausible."
  Foundation is deliberately mathematical rather than domain-specific:
  generative models → retail vision → 3D biomechanics → agentic LLM systems,
  without starting over each time.

### About page narrative (source: `src/data/about.ts`, `src/pages/About.tsx`)

> I am an AI Research Engineer based in Taiwan, currently at IdeasLab Formosa.
> My work sits at the point where a research architecture stops being a paper
> and starts being something a person depends on — a phone that has to
> reconstruct a golf swing in three dimensions from two consumer cameras, a
> coaching system whose numbers change how someone moves their body, a store
> with no cashier in it.
>
> That transition is where most of the interesting problems live. A model that
> validates beautifully can be quietly broken in a way its own metric cannot
> see. A reconstruction can be internally consistent and absolutely
> meaningless. A language model can be fluent, confident and wrong. None of
> those are training problems, and none of them are visible from a loss curve.
>
> My background is mathematical rather than domain-specific, and that is
> deliberate. Linear algebra, probabilistic modelling, multi-view geometry and
> optimisation do not care whether the input is an image, a sentence or a
> skeleton. Having those foundations is what has let me move from generative
> models to retail vision to 3D biomechanics to agentic LLM systems without
> starting over each time — the domain changes, the mathematics does not.
>
> Alongside the engineering I write the technical narratives: proposals,
> conference submissions, mathematical walkthroughs. One of those proposals
> won an international award against 638 submissions. I also authored my
> organisation's AI coding standards and mentor the engineering team on
> working with AI tools without giving up reproducibility — which is, in the
> end, the same concern as everything else here.

---

## 2. Experience (reverse chronological)

### AI Research Engineer — IdeasLab Formosa, Taipei, Taiwan
**2025 — present**

Source: `src/data/about.ts` timeline entry 1; corroborated by case studies 01–03
in `src/data/work.ts` and by `src/data/impact.ts`.

- Led R&D of the 2D-to-3D pose lifting system behind a markerless golf-swing
  analysis app (XView AI) that runs its whole pipeline on the phone.
- Reduced mean per-joint 3D error 8cm → 3cm, pelvis-relative; +30% reconstruction
  fidelity under occlusion and fast motion.
- Deployed to Apple ARM silicon via CoreML with no cloud round-trip and no
  footage leaving the device; used by PGA professionals.
- Architecting a domain-grounded agentic LLM coaching system with deterministic
  scoring and citable output.
- Authored the organisation's AI coding agent rules, skills and hooks; mentors
  the engineering team on AI-assisted development.
- Technical lead on the proposal that won the TAITRA "Go Healthy Taiwan" award;
  selected to represent engineering at Taiwan Expo Europe.

### AI Engineer — President Information Corp (統一資訊), Taipei, Taiwan
**2023 — 2025** (prior resume gives more precise range: Nov 2023 – Feb 2025)

Source: `src/data/about.ts` timeline entry 2; corroborated by case study 04 in
`src/data/work.ts` and `src/data/impact.ts` ("planogram-scale" entry, citing a
peer-reviewed paper).

- Led a real-time planogram compliance system presented as a technical poster
  at NVIDIA GTC 2025.
- Combined dense detection with fine-tuned embeddings for training-free
  catalogue scaling.
- Deployed occlusion-robust product recognition to Taiwan's 8th unmanned
  7-Eleven store; +30% performance.
- Built NVIDIA Metropolis microservices, TAO, DeepStream and TensorRT
  pipelines across cloud and edge.
- LLM-assisted NER on GCP Document AI; predictive analytics across 5M+ data
  points at 95% confidence.

### Software Developer — AIBS Software Solutions, Coimbatore, India
**2017 — 2021** (prior resume: May 2017 – August 2021)

Source: `src/data/about.ts` timeline entry 4.

- Custom ERP systems for manufacturing workflows; inventory and tax tracking
  resolving 95% of reported discrepancies.
- Full-stack engineering — where the habit of shipping things people actually
  use started.

---

## 3. Education

Source: `src/data/about.ts` timeline entries 3 and 5.

### MSc, Electrical Engineering & Computer Science
National Taipei University of Technology, Taipei, Taiwan · **2021 — 2023** · GPA 3.8/4.0
- Thesis: *Content and Spatial Aware Generative Model for Inpainting*
- GAN architectures, attention mechanisms and the mathematical foundations of
  deep learning.

### BSc, Information Technology
Sri Ramakrishna Mission Vidyalaya College, Coimbatore, India · **2011 — 2014** · GPA 7.9/10
- Foundations in computer science, algorithms and systems design.

---

## 4. Case studies / projects (professional work)

Source: `src/data/work.ts`. Each carries role, org, period, stack, problem,
and outcome — the fullest technical detail on the site lives here. Only the
resume-relevant summary is reproduced below; the full narrative (failure
diagnosis, architecture reasoning) lives in the case study pages themselves at
`/work/<slug>`.

### 01 — Markerless 3D motion capture, on a phone
`/work/markerless-3d-motion` · IdeasLab Formosa · 2025 — present
**Role:** R&D lead — architecture, training, deployment
**Stack:** PyTorch, YOLO-pose, CoreML, Temporal lifting (TCPFormer-family),
Multi-view geometry, Apple Vision

A 29-keypoint pose model and 2D-to-3D lifting stack that put full golf-swing
biomechanics on a phone — body and club, from two consumer cameras, with
nothing leaving the device.

Metrics:
- 8cm → 3cm mean per-joint error, pelvis-relative
- 0.000px body drift, verified by weight diff (frozen backbone/neck/body output
  channels — deployed body pathway is bit-identical to the base model)
- +30% fidelity under occlusion
- On-device: no cloud, no footage leaves the phone

Outcome:
- Mean per-joint 3D error reduced 8cm → 3cm, pelvis-relative, via temporal
  consistency modelling, motion-aligned lifting and spatial refinement.
- Full analysis stack running locally on Apple ARM silicon, no cloud
  round-trip, no footage leaving the device — shipped in an iOS app used by
  PGA professionals.
- Club-tracking model beating prior generations on club accuracy while being
  the only one with a provably unbiased body model.
- An internal benchmarking suite for evaluating robustness across long-tailed
  action distributions.

Technical grounding cited on the page: Progressive Neural Networks (2016,
frozen columns + adapter-mediated lateral connections), Side-Tuning (ECCV
2020, trainable side network fused into an unchanged pretrained one),
ControlNet's zero-convolutions (ICCV 2023, zero-initialised blocks). Benchmarked
against AthletePose3D (2025)'s finding that TCPFormer (37.9mm on Human3.6M)
degrades to 213mm zero-shot on high-speed sport, recovering to ~66mm fine-tuned.

### 02 — An LLM that is never allowed to do the maths (agentic coaching LLM)
`/work/agentic-coaching-llm` · IdeasLab Formosa · 2025 — present
**Role:** Architect — rule engine, scoring, prompt design, evaluation
**Stack:** Claude, Gemini, Tool use, RAG, Python, Structured prompting

A domain-grounded agentic coaching system where every number is computed
deterministically in Python and the model is constrained to narration — with a
second pipeline that inverts the arrangement.

Metrics:
- 0 numbers the LLM may compute
- 69 deterministic rules, weighted 0–100
- 8 languages, prompts included
- 2 pipelines, opposite LLM roles

Outcome:
- A coaching system whose every quantitative claim is deterministic,
  reproducible and cited back to a specific rule.
- Rulebook ownership handed to domain experts through configuration, with rule
  validity measured against real sessions.
- Full localisation across 8 languages, including prompt-level translation.
- Consumed in production as a library by the wider product platform through a
  narrow public API.

Technical grounding cited on the page: PAL (ICML 2023, decomposition is the
model's job, solving belongs to the interpreter), Turpin et al. (NeurIPS 2023,
on models fluently rationalising rather than reporting).

### 03 — Fixing the geometry underneath everything (reconstruction infrastructure)
`/work/reconstruction-infrastructure` · IdeasLab Formosa · 2025 — present
**Role:** Research engineer — diagnosis, correction, validation at scale
**Stack:** Multi-view geometry, Camera calibration, Triangulation, NumPy,
Anthropometrics

Multi-camera calibration, 3D reconstruction and event detection — the shared
infrastructure whose silent errors propagate into every downstream number.

Metrics:
- 4.8× lower reconstruction noise
- 10–46× bone-length consistency gain
- 204 bone measurements validated
- −73% event-detection timing error

Outcome:
- Calibration, reconstruction and event-detection errors corrected at the
  source, every claim measured on a real annotated corpus (not synthetic
  proxies).
- Reconstruction anchored to real-world scale, validated against published
  anthropometric data across all sessions and bones (mean 0.977× expected
  ratio across 204 measurements).
- Remaining limitations documented explicitly (open calibration variance,
  triangulation conditioning, synchronisation edge cases).

### 04 — Retail vision AI that scales without retraining (planogram vision)
`/work/planogram-vision-ai` · President Information Corp · 2023 — 2025
**Role:** Lead engineer — architecture, training, production deployment
**Stack:** YOLO, Triplet loss, TensorRT, DeepStream, TAO Toolkit, GCP, Metropolis

Dense detection combined with fine-tuned embeddings, so a product catalogue can
grow without touching the model. Presented at NVIDIA GTC 2025.

Metrics:
- GTC 2025 NVIDIA technical poster
- +30% recognition performance gain
- Deployed to Store #8, unmanned 7-Eleven
- 5M+ data points modelled

Outcome:
- Selected as an NVIDIA GTC 2025 technical poster.
- Production deployment in an unmanned retail store, running on edge hardware
  under real customer traffic.
- A catalogue-scaling architecture that removed retraining from the
  operational loop entirely.

Architectural reference cited: Tonioni & Di Stefano (2018) — instance-level
retrieval as the reference architecture for open-set product recognition.
Industry comparison cited: Amazon Just Walk Out and the ITRI/7-Eleven X-STORE
build in Taiwan, both fusing camera + sensor rather than solving occlusion from
vision alone.

### 05 — Generative inpainting in the low-data regime (MSc thesis)
`/work/inpainting-thesis` · National Taipei University of Technology · 2022 — 2023
**Role:** Author
**Stack:** PyTorch, GANs, Attention mechanisms, Receptive field design

A GAN architecture combining contextual and spatial attention, targeting the
failure modes (mode collapse, memorisation, underfitting) that appear
specifically when training data is scarce.

Metrics: 3 failure modes addressed; 3.8/4.0 MSc GPA.

Outcome: Published as an MSc thesis at National Taipei University of
Technology; foundation for a working understanding of attention that
transfers directly to transformer-based systems.

---

## 5. Impact — externally corroborated milestones

Source: `src/data/impact.ts`. Each entry below carries at least one independent
public source; figures are read directly from those sources. Distinguishes
"public record" (what the organisation/press states) from "my part" (his own
account of his contribution) — preserved as separate fields below, per the
site's own rule against blurring the two.

### Winner — "Go Healthy with Taiwan" 2025 (TAITRA · Taiwan Excellence · IdeasLab, 2025)
**Public record:** One of three global winners of TAITRA's 2025 "Go Healthy
with Taiwan" competition, chosen from 638 proposals across 55 countries, for a
baseball motion-analysis system built on the XView motion-analysis technology.
Grand Finals held in Taipei, 10 December 2025, six finalist teams, three
winners each receiving USD 30,000. IdeasLab works with the Taiwan Institute of
Sports Science on AI-based motion analysis (separately reported).
**His part:** Authored the proposal end to end — establishing what baseball
biomechanics demands (injury-prevention physics, not only performance gain)
and how far a golf-tuned lifting stack carries into a different high-speed
motion class. Market scope and standards came from the business side; the
technical argument is his.
**Sources:**
- Go Healthy with Taiwan — official programme: https://gohealthy.taiwanexcellence.org/
- Grand Finals coverage (638 proposals, 55 countries): https://newshub.medianet.com.au/2025/12/top-innovators-compete-in-taipei-as-go-healthy-with-taiwan-finals-spotlight-health-tech-advances/133652/
- Winners and the baseball system: https://thebetterindia.com/innovation/go-healthy-with-taiwan-2026-health-innovation-challenge-12141541

### Taiwan Expo Europe 2026 — the work on an international floor (TAITRA · EXPO XXI Warsaw, 2026)
**Public record:** The motion-analysis work shown under the Taiwan Excellence
banner at Taiwan Expo in Europe, 22–24 June 2026, EXPO XXI Warsaw. Official
exhibitor listing names Ideas Lab, Formosa, with XView as the listed product;
company also exhibited at Taipei Cycle Show, 25–28 March 2026.
**His part:** Carried the research onto the main stage for an international
audience that had not come for the mathematics — a different discipline from
building it, and why he was the one sent.
**Sources:**
- Official exhibitor listing (Ideas Lab, Formosa · XView): https://www.taiwanexpoeurope.com.tw/en/exhibitor/5655073AE4F501E7DDB9B191CD6B48F0/info.html
- Taiwan Excellence — Expo Europe programme and dates: https://www.taiwanexcellence.org/en/press/newsroom/1506

### XView AI — markerless swing analysis, shipped (IdeasLab · iOS, 2025)
**Public record:** XView AI — first markerless app to offer complete golf
swing analysis in real time, tracking body, shaft and club, running offline
with no cloud dependency. XView AI Pro launched spring 2025; Free and Plus
versions August 2025. K.J. Choi (nine-time PGA Tour champion) joined as
advisor and the company's first outside investor. Martin Borgmeier (World
Long Drive champion) is a brand ambassador. IdeasLab Inc founded New York
2017; IdeasLab Formosa registered 2023, based in Neihu, Taipei.
**His part:** The 2D-to-3D pose lifting the analysis reads its numbers from,
and the CoreML deployment keeping the whole pipeline on the handset, are his
work (case study 01).
**Sources:**
- Launch announcement: https://www.prnewswire.com/news-releases/ideaslab-announces-xview-ai-the-first-markerless-app-to-offer-complete-golf-swing-analysis-and-insights-in-real-time-302455186.html
- XView AI on the App Store: https://apps.apple.com/us/app/xview-ai-golf-swing-analysis/id1616121788
- Martin Borgmeier ambassador announcement: https://www.prnewswire.com/news-releases/ideaslab-signs-world-long-drive-champion-martin-borgmeier-as-brand-ambassador-for-xview-ai-302496847.html

### Retail vision AI at national scale (President Information Corporation, 2023 — 2025)
**Public record:** Peer-reviewed paper (Scientific Reports, December 2025)
describes a real-time planogram compliance system using computer vision and
virtual shelves, deployed across 7,000+ 7-ELEVEN stores in Taiwan. Reports
99.23% precision / 98.93% recall on shelf detection, 94.61% precision / 93.02%
recall on product detection, 98.39% Top-1 accuracy few-shot on unseen products.
**His part:** The detection and embedding architecture behind the programme —
dense detection for where a product is, a fine-tuned metric space for which
product it is, so a new SKU costs vectors instead of a training run (case
study 04). He was lead engineer on this programme.
**Sources:**
- Scientific Reports (2025), real-time planogram compliance, 7,000+ stores: https://pubmed.ncbi.nlm.nih.gov/41402356/

**Full citation, verified 2026-08-16 via OpenAlex** — use this form wherever
the paper is cited, because naming the authors is what makes it unambiguous
that the paper is not his:

> Ou, T.-Y., Ponce, A., Lee, C., & Wu, A. (2025). *Real-time retail planogram
> compliance application using computer vision and virtual shelves.*
> Scientific Reports, 16 December 2025. DOI: 10.1038/s41598-025-27773-5

All four authors are affiliated to President Information Corporation, Taipei
(Ou additionally to National Kaohsiung University of Science and Technology).
Pradeep is not an author and is not acknowledged — see §11.

---

## 6. Research log

Source: `src/data/research.ts`.

| Title | Venue | Year | Status |
|---|---|---|---|
| Scalable Vision AI for Planogram Compliance | NVIDIA GTC 2025 — Technical Poster | 2025 | presented |
| Content and Spatial Aware Generative Model for Inpainting | MSc Thesis, National Taipei University of Technology | 2023 | published |
| Pose Lifting and Biomechanical Motion Analysis | Applied R&D, IdeasLab Formosa | 2025 — | in-progress |
| The Transformer Architecture — a mathematical walkthrough | Public technical writing | 2024 | published — https://github.com/Ajishpradeep/Case_Study |
| Efficient LLM Inference via Kolmogorov–Arnold Networks | Independent research | undated | in-progress (exploratory: small approximation study only, no LM results yet) — https://github.com/Ajishpradeep/kan_experiment |

---

## 7. Skills / capabilities

Source: `src/data/research.ts` (`capabilities`), cross-checked against case
studies and the prior resume's "Core Competencies" list. Grouped as the site
groups them.

**Mathematical foundations:** Linear algebra, probabilistic modelling,
multi-view geometry, optimisation, metric learning, temporal modelling.

**Computer vision:** 2D/3D pose estimation and lifting, dense object detection
(YOLO/DETR), open-set recognition via embedding retrieval, 3D reconstruction,
kinematic/biomechanical analysis, temporal consistency under occlusion and
fast motion.

**LLMs & agentic systems:** Fine-tuning on domain corpora, agentic workflows
with tool use, structured grounding, RAG pipelines, evaluation design for
high-stakes correctness, Claude/Gemini APIs.

**Deployment & inference:** CoreML, ARM edge deployment, TensorRT, DeepStream,
quantisation and compression, cloud-native microservices (GCP Vertex AI),
inference-cost optimisation.

**Research leadership:** Technical proposal writing, conference submissions,
AI coding standards for engineering teams, mentorship, cross-functional
collaboration with domain experts.

**Languages & frameworks** (from prior resume, corroborated by case-study
stacks above): Python, JavaScript, PyTorch, TensorFlow, HuggingFace
Transformers, JAX.

---

## 8. Principles / working style (as stated on site)

Source: `src/data/research.ts` (`principles`) — kept here as evidence of
working method, not resume bullets themselves.

1. A metric blind to the failure is not a metric.
2. Make the regression impossible, not unlikely.
3. The shape of an error names its cause.
4. Know which failures training cannot fix.
5. Deterministic where it can be.
6. Write down what is still broken.

---

## 9. Personal projects (Lab)

Source: `src/data/lab.ts`. Personal builds, verified against each repo's own
README before listing on the site (forks/tutorial follow-alongs excluded).
Included here for completeness; resume-worthiness is a Phase 3 decision, not
assumed.

| Name | Year | Stack/tags | Description |
|---|---|---|---|
| [CarbonPass](https://github.com/Ajishpradeep/CarbonPass) | 2026 | Python; Local VLM, OR-Tools MILP, FastAPI, CBAM | Local-first AI turning a Taiwanese factory's photographed paperwork into carbon accounting — EU CBAM template, material-loss mapping, grid-aware scheduling, anonymised peer benchmarking. Runs a vision-language model on-premise. |
| [Magic Shuffle](https://github.com/Ajishpradeep/Magic-Shuffle) | 2026 | JavaScript; LLM grounding, Spotify API, Deterministic fallback | A song picker reading state (energy, sleep, stress) plus weather and calendar, choosing and explaining a track. Spotify verifies every named track; a deterministic path works with no API keys. |
| [data_automation_pipeline](https://github.com/Ajishpradeep/data_automation_pipeline) | 2025 | Python; LLM data prep, LaTeX preservation, OCR | Converts PDFs, web pages and source files into clean Markdown for LLM consumption, preserving LaTeX/code blocks, parallelised, optional OCR for scientific PDFs. |
| [CardPilot](https://github.com/Ajishpradeep/LLM-on-Business-card) | 2025 | Python; Gemini, ChromaDB, Semantic search, Gradio | Multimodal extraction from business-card images into structured records embedded in ChromaDB for natural-language queries. |
| [pi_generator](https://github.com/Ajishpradeep/pi_generator) | 2024 | Python; Normalising flows, Transformers, Distribution metrics | Masked transformer vs. RealNVP normalising flow learning a 5D point distribution, compared on MMD, KL divergence, Wasserstein distance. |
| [Pulse](https://github.com/Ajishpradeep/pulse) | 2026 | Python · three.js; Real-time, WebSocket, On-device inference, Privacy | Shared 3D world on a projector at a live event — attendees scan a QR code, appear as characters, facial emotion (computed on-device) drives character and room mood. Built in a day. Note: source repo has no README; description is from memory of building it (flagged as such on the site). |

---

## 10. Prior standalone resume — cross-reference only

`Pradeep_Rajasekar_Resume_Research_Engineering.md` (repo root) is an earlier,
denser resume draft. It is **not** the source of truth — the ground rules for
this project explicitly say the website is the living record and the old PDF
is one input among many. Cross-checked against the site content above:

- All companies, dates, degrees and headline metrics in the old resume agree
  with `src/data/about.ts` and `src/data/work.ts`, with tighter month-level
  date precision in a few places (captured in sections 2–3 above).
- The old resume states "240fps on-device markerless motion tracking" — the
  current site does **not** repeat this figure anywhere (the current site's
  `marquee` deliberately dropped a similar framing; see `src/data/site.ts`
  comments on `marquee`, which explain that a raw framerate figure invites a
  benchmark comparison it can't defend and that capture-rate ≠ inference
  budget, per case study 01's "Deployment as a constraint" section: *"Real-time
  frame-rate figures describe capture, not the inference budget."*). **Flagged
  gap: do not carry "240fps" onto the new resume — it is contradicted by the
  current site's own explanation of what "on-device" means for this product.**
- The old resume states "60% accuracy improvement (8cm → 3cm)" as a derived
  percentage. The site itself never states a percentage for this — only the
  raw 8cm → 3cm figures. Treat "60%" as an unsourced derived claim, not a
  primary fact; if used, it must be computed and framed the same way the site
  frames the 3cm delta (see `site.ts` marquee comment: state the delta, not an
  invented percentage on top of it).
- The old resume states month-precise employment dates ("May 2025 – Present",
  "November 2023 – February 2025", "May 2017 – August 2021") where the site
  only gives years. These are more specific but unverified against the site;
  flagged as a fact to confirm with Pradeep directly before using month
  precision on the new resume — default to the site's year-level precision
  unless he confirms the months.
- The old resume's "Predictive analytics… 95% confidence" and "5M+ data
  points" match `about.ts` exactly.
- The old resume's "PGA professionals" usage and "President Information Corp"
  Chinese name (統一資訊) match the site.

---

## 11. Known gaps / unverifiable claims (flagged, not filled)

Per the truth-only ground rule, these are explicitly **not** carried onto the
resume without further sourcing:
- Exact month-level start/end dates for each role (site gives years only; old
  resume gives months but is not the source of truth). **Now used on the resume
  at month precision, flagged unverified in `src/data/resume.ts` — European
  convention expects months and a year-only range reads as evasive. Still needs
  his confirmation.**
- ~~Whether he is named in the *Scientific Reports* acknowledgements.~~
  **RESOLVED 2026-08-16 — he is not.** Verified independently against the
  OpenAlex record for PMID 41402356 and the article itself. Four authors:
  Tsung-Yin Ou, Andrés Ponce, Cody Lee, Areoll Wu — all affiliated to President
  Information Corporation, Taipei (Ou also to NKUST). The Acknowledgements
  thank only an NSTC grant; there is no personal acknowledgement of anyone, and
  his name appears nowhere in the full text.

  Consequence, and it cuts two ways. The paper is **not evidence about him** —
  it corroborates that the *system* is real, nationally deployed and performs
  as stated, but says nothing verifiable about his role in it. So it may be
  cited as corroboration of the system, never as a credential of his own. The
  citation must name the actual authors, which makes non-authorship
  self-evident without needing a negative clause.

  It also means the **NVIDIA GTC 2025 poster is the only externally verifiable
  artifact that carries his own name** — which is a stronger reason to give it
  prominence than the earlier research assumed.
- Any patent filings naming him as inventor.
- CEFR proficiency levels for his languages, and whether the years in Taipei
  support any claim to Mandarin. Neither is asserted.
- Whether he has SMPL / parametric-body-model experience — adjacent to
  everything he does and named explicitly in relevant job postings, but never
  mentioned on the site.
- The "240fps" and "60% accuracy improvement" framings from the old resume
  (see §10 — contradicted or unsourced by the current site).
- Any claim of authorship/co-authorship on the Scientific Reports paper — the
  impact dossier explicitly separates "public record" (the paper, company
  credited) from "my part" (his architecture contribution) and never claims
  he is a listed author.
- Rank/seniority self-description beyond what's stated ("lead engineer", "R&D lead",
  "architect", "technical lead on the proposal") — these exact role labels are
  the ones printed on the site and should not be inflated (e.g. no "principal",
  "staff", "director" framing anywhere in the source material).
