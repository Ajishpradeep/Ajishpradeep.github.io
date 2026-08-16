# Domain Demand — What the 2026 Market Actually Values in Pradeep's Specific Fields

Research area: not generic resume advice. This file answers *what the market
currently pays attention to in 3D computer vision, edge inference, and LLM
systems*, so that Pradeep's real accomplishments can be ordered by market
weight rather than by chronology or by what sounds impressive.

Every claim is tied to a named source with a credibility note in
[Sources](#sources-and-why-each-is-credible). Where the evidence is thin or
absent, it is called out in [Honest gaps](#honest-gaps) rather than padded.

---

## 0. The headline conclusion, stated up front

**Position as a 3D computer vision / spatial perception specialist who ships to
constrained hardware, and who additionally builds LLM systems. Do not position
as a generalist AI engineer.**

Three findings drive this, and one of them cuts against the obvious intuition:

1. **The LLM/GenAI job market is ~4.5× larger than the vision job market by
   posting volume** (Stanford AI Index 2026 / Lightcast: generative AI appears
   in 0.41% of all US job postings, "visual image recognition" in 0.09%). This
   is real and should not be waved away.
2. **But he cannot win the LLM market on LLM credentials.** His LLM assets
   (agentic workflows, RAG, deterministic grounding, eval design) are good
   engineering but they are the *modal* profile in a market where 138k+ US
   postings mention generative AI. His 3D vision + edge assets are the
   *rare* profile. In the smaller market he is a top-decile candidate; in the
   larger market he is a median one.
3. **The highest-value framing is the intersection**, and it is a genuinely
   scarce one: 3D geometric perception *plus* production edge deployment *plus*
   LLM systems literacy. Every one of the real job postings collected below
   asks for one or two of those three. Very few candidates have all three with
   shipped evidence.

The correct resume strategy is therefore **not** to hide the LLM work — it is to
place it third, as proof of breadth on top of depth, not as the headline.

---

## 1. Hard data: how the market actually splits between vision and LLM

This is the only source found with rigorous, primary, longitudinal numbers on
skill-level demand. Everything else in this space is recruiter marketing.

### Stanford AI Index Report 2026, Chapter 4 (Economy), Figure 4.4.3

Share of **all** US job postings mentioning each AI skill cluster, 2025
(Lightcast data, billions of postings since 2010):

| Skill cluster | Share of all US postings, 2025 |
|---|---|
| Artificial intelligence (broad) | 1.70% |
| Machine learning | 0.99% |
| **Generative AI** | **0.41%** |
| AI agent | 0.23% |
| Natural language processing | 0.22% |
| Neural networks | 0.20% |
| Autonomous driving | 0.14% |
| **Visual image recognition** | **0.09%** |
| Robotics | 0.08% |
| AI ethics, governance, regulation | 0.05% |

Supporting narrative from the same chapter:

- Mentions of generative AI skills in AI job postings **grew 111% from 2024 to
  2025**, but their **share of total AI job postings fell 5%** — i.e. GenAI is
  growing in absolute terms while the AI job market grows around it. It is
  becoming table stakes, not a differentiator.
- The **fastest-growing** skills are deployment/infrastructure ones, not model
  ones: AWS (+1,358% vs 2013–15), scalability (+733%), workflow management
  (+818%). The report's own framing: demand mirrors "the broader investment
  shift toward AI infrastructure and deployment capacity."
- The agentic cluster exploded (0.06% → 0.23% of postings, +280% in one year,
  ~90,000 US postings) while ChatGPT/chatbot/conversational-AI mentions
  *declined* as a share.

### What to conclude from these numbers — carefully

**The naive read is wrong.** "GenAI is 4.5× bigger, so foreground the LLM work"
ignores that posting volume is not the same as odds of being hired. Three
corrections:

- **Competition scales with the market.** The 0.09% vision market is small
  *and* the qualified applicant pool for 3D geometric vision is much smaller
  than the pool for "I've built a RAG pipeline." Multiple recruiter sources
  (DeepRec.ai, KORE1) independently describe CV as a *long-tail specialty* that
  in-house recruiters are slow to fill because they have no candidate database
  for it — the opposite of the LLM market's problem.
- **"Visual image recognition" undercounts him badly.** Lightcast's taxonomy
  bucket does not capture SLAM, multi-view geometry, 3D reconstruction, spatial
  AI, perception, or motion capture. The real 3D perception market is bigger
  than 0.09% implies; it is just fragmented across labels (see §5).
- **Deployment is the growth axis, and that is his edge story.** The AI Index's
  own conclusion — that the fastest growth is in operating systems at scale —
  is a direct argument for foregrounding CoreML/TensorRT/on-device shipping
  over model novelty.

### Europe-specific demand intensity (same chapter, Figures 4.4.1–4.4.2, 4.4.23)

AI postings as share of all postings, 2025:
Luxembourg 3.43% · Spain 3.31% · **UK 1.93%** · **Switzerland 1.59%** ·
Belgium 1.36% · Italy 1.33% · **Germany 1.13%** · Netherlands 1.04% ·
France 0.99% · Austria 0.84%.

Net AI talent migration per 10,000 LinkedIn members, 2025:
Luxembourg 5.23 · **Switzerland 1.72** · UK 1.04 · Austria 0.90 · Spain 0.23 ·
**Germany 0.17**.

AI vs. overall hiring-rate growth, 2025 (top European entries):
Croatia 27.8% · **Belgium 21.5%** · Cyprus 17.1% · Czechia 16.5% ·
Luxembourg 15.6% · Greece 14.7% · Poland 12.3% · Netherlands 11.4% ·
Austria 11.3% · Romania 10.0%.

**Actionable:** Switzerland and the UK are the strongest Europe targets on both
intensity and net-inflow (Zurich has the highest absolute deep-tech salaries in
Europe per DeepRec's 2026 robotics guide: CHF 150–230k senior/lead). Germany has
volume and the densest concentration of companies in *his exact niche*
(Meshcapade in Tübingen, NEURA in Metzingen, automotive perception across
Munich/Stuttgart) but weak net inflow — meaning German roles are filled more
locally, so a targeted, keyword-legible application matters more there.

---

## 2. 3D computer vision: which sub-skills are hot, and where he actually sits

### The 2026 heat map, from real postings and funding signal

**Very hot, large budgets:**
- **Spatial intelligence / world models.** World Labs (Fei-Fei Li, Justin
  Johnson, Ben Mildenhall, Christoph Lassner) raised **$1B in 2026** from AMD,
  Autodesk, NVIDIA, Fidelity, Sea, Emerson Collective, explicitly to expand its
  team, and states it is hiring for "intersectional expertise in computer
  vision, graphics, and robotics."
- **Robotics / embodied AI perception.** Every credible source puts this at or
  near the top (see §6).
- **Neural rendering: NeRF / 3D Gaussian Splatting.** Tesla's own spatial
  computing postings name "NeRFs, Diffusion Models, Gaussian Splatting,
  Multiview Stereo, TSDF Fusion, Structure from Motion, and SLAM" in one
  breath. Niantic Spatial's reconstruction roles ask for pipelines over "point
  clouds, meshes and/or gaussian splats."
- **SLAM / VIO / online calibration.** Apple's Video Computer Vision org
  describes "real time and low power world tracking and sensor calibration
  based on VIO, SLAM and ML solutions." Meta Reality Labs lists "SLAM State
  Estimation, Online Calibration, Sensor Fusion, 3D reconstruction" as its
  specialization menu.
- **3D foundation models (DUSt3R / MASt3R / VGGT lineage).** This is the
  fastest-moving research axis: feed-forward transformers that output camera
  pose, depth, and dense geometry in a single pass, displacing the classical
  keypoint→matching→bundle-adjustment SfM pipeline.

**Warm but narrower:**
- AR/VR and spatial computing (Apple VPG, Meta Reality Labs, Niantic, Snap) —
  hires hard, but heavily PhD-weighted at the research end.
- Autonomous driving perception — still large in absolute terms but the AI
  Index shows autonomous driving at only 0.14% of postings and IEEE Spectrum's
  read of the prior year's Lightcast data noted autonomous driving and robotics
  *declining* as specialized skill demands year-over-year. Treat AV as a stable
  market, not a growth one.

### Where his real experience maps

| What the market wants | What he actually has | Honest strength |
|---|---|---|
| Multi-view geometry, camera calibration, triangulation | Direct, production | **Strong.** This is the exact foundational skillset named in NEURA, Meta, Torc, and Mujin postings. |
| 3D reconstruction | Direct (human subject, not scene) | **Strong but qualified** — see below. |
| Human/object pose estimation | 2D→3D human pose lifting, TCPFormer-family temporal models, YOLO-pose | **Strong**, and named explicitly by Apple, Meta, Mujin, Torc, NEURA. |
| Temporal consistency, occlusion, fast motion | Direct — this is the hard part of his work | **Strong and under-marketed.** Occlusion robustness is exactly what robotics/AR postings care about and rarely see evidenced. |
| SLAM / VIO | **Not present** | **Real gap.** The single most-named 3D skill he lacks. |
| NeRF / Gaussian Splatting | **Not present** | **Real gap.** Second most-named. |
| Depth estimation / stereo / RGB-D / LiDAR | Limited; his 3D comes from multi-view triangulation and monocular lifting | **Partial gap.** He has the geometry, not the sensor breadth. |
| 3D foundation models (VGGT etc.) | **Not present** | Gap, but a recent one — most practitioners lack it too. Cheap to close. |
| Metric validation against physical ground truth | Direct (204 bone measurements vs. published anthropometric ratios; 4.8× noise reduction) | **Rare and genuinely differentiating** — see §4. |

**The honest framing of the reconstruction gap:** he does 3D reconstruction *of
articulated humans*, not *of scenes*. That is a real distinction a hiring
manager will make. The bridge that survives scrutiny: articulated human
reconstruction under occlusion and fast motion is a *harder* temporal
consistency problem than static scene reconstruction, and it uses the same
substrate (calibration, epipolar geometry, triangulation, bundle-style
optimisation, temporal smoothing). He should claim the substrate confidently and
be honest that the object class is human bodies.

**The two gaps worth closing before applying broadly:** SLAM/VIO and Gaussian
Splatting. They co-occur in nearly every 3D posting reviewed. Even a serious
side project on each would remove the most common screening objection. This is
a *portfolio* recommendation, not a resume one — do not list them until real.

---

## 3. Edge / on-device inference: differentiator or commodity?

**Verdict: genuine differentiator, and the most undervalued asset in his current
framing.** Three independent lines of evidence:

1. **The AI Index's own top-line finding** is that the fastest-growing AI skill
   demand is deployment and operating-at-scale capability, not modelling. Edge
   deployment is the constrained-hardware end of exactly that.
2. **Postings ask for it as a named requirement, not a nice-to-have.** Apple's
   "Computer Vision/ML for Human Understanding" role requires experience
   integrating **on-device CV/ML algorithms** and familiarity with **Core ML**,
   alongside pose estimation. NEURA's senior mobile-robotics perception role
   asks for "optimizing vision models for **edge deployment on NVIDIA Jetson**."
   Qualcomm's model-optimization roles ask for quantization/compression
   experience, profiling "across mixed CPU/GPU/NPU load," and familiarity with
   **ARM processors and mobile SoC architecture**, plus quantization frameworks
   (GPTQ, AWQ, SmoothQuant) and AIMET.
3. **The buyers are named and well-funded**: Apple, Qualcomm, NVIDIA, Arm,
   Samsung, Google — plus every robotics company (Jetson is the default robot
   compute platform) and every AR/VR company (thermal and battery budgets make
   on-device non-negotiable).

**Why it is scarce:** the skill only accrues to people who have actually shipped
under a hardware constraint. It cannot be acquired from courses or Kaggle. The
number of engineers who have taken a 3D pose pipeline all the way to running
*entirely on a phone with no cloud dependency* — and can talk about the
quantisation/latency/thermal trade-offs they made — is small.

**Is it a commodity?** Only at the *tooling* level. "I have used CoreML" is
commodity. "I moved a multi-stage 3D reconstruction pipeline to Apple ARM
silicon with no cloud fallback, shipped to paying users" is not. The bullet must
carry the constraint and the outcome, not the tool name.

**Specific advice:** his NVIDIA stack experience (DeepStream, TAO, Metropolis
microservices) is separately valuable and should not be buried with CoreML.
NVIDIA's own Metropolis Vision AI postings (Santa Clara, $224k–$357k) name
DeepStream, Metropolis, Isaac, and shipped "agentic Vision AI applications in
production" in a single requirement list — which is, unusually, a job spec that
matches *both* his vision-edge and his LLM-agent experience at once. That
combination is his single best-fitting posting archetype found in this research.

---

## 4. Impact weighting: what actually carries weight

This is the section where the source quality is weakest. Read the confidence
markers.

### High confidence (multiple independent credible sources)

**1. Production deployment at scale, with the constraint named.** This is the
top-weighted category everywhere. Chip Huyen (author of *Designing Machine
Learning Systems* and *AI Engineering*, former Snorkel/NVIDIA/Netflix,
Stanford instructor) is the most credentialed named voice found: hiring managers
often prefer strong engineers over ML specialists because engineering practice
is harder to acquire than ML concepts, and resumes should show "impact,
achievements, and how responsibilities translated into improvements." His
**7,000+ store deployment at 99.23%/98.93% precision/recall** is the single
strongest asset he has by this standard — it is scale, in production, with
externally-verifiable numbers, in a system he led.

**2. Accuracy improvements *with the method attached*.** Huyen's specific
warning is that bare metrics are worthless without context — "whether
improvements in F1 scores translate to any impact on the product." So
**8cm → 3cm MPJPE** is strong *only* when paired with what produced it and what
it unlocked. Ordered correctly: what became possible at 3cm that was impossible
at 8cm, achieved by [technique], measured by [metric].

**3. Peer-reviewed publication in a real venue.** Scientific Reports (Nature
Portfolio) describing a deployed 7,000-store system is unusual and valuable
precisely *because* it is a production system rather than a benchmark paper. It
is third-party verification of claim #1 above. Note the market's own preference
though: CV/ML job postings that value publications name **CVPR, ECCV, ICCV,
NeurIPS, ICLR, SIGGRAPH** specifically (this exact list appears in
research-track postings). A Scientific Reports paper will not read as a
research-track credential to a CV researcher; it reads as *evidence the system
was real*. Frame it that way — as corroboration of deployment, not as a
publication record.

### Medium confidence

**4. Shipped consumer product with named professional users.** The iOS product
used by PGA professionals is strong for product-facing teams (Apple, sports
tech, health tech) and weak for research teams. It is the most legible
accomplishment to a non-specialist recruiter or hiring manager, which matters
for getting past first screens.

**5. Competition wins.** TAITRA "Go Healthy with Taiwan" — 1 of 3 winners from
638 proposals across 55 countries — has a strong ratio but low name recognition
in Europe. Its value is almost entirely in the *numbers*, not the name. Written
as "1 of 3 selected from 638 proposals across 55 countries" it works as a
credible signal of external validation; written as the award name alone it will
be skimmed past. Keep it, compress it, and lead with the ratio.

### Low confidence — flagged honestly

**6. NVIDIA GTC technical poster.** No credible source was found that quantifies
how ML hiring managers weight an industry-conference poster. General
computer-science convention treats top-tier *conference papers* as
publication-grade and posters as a lesser but positive signal; GTC is a vendor
conference, not a peer-reviewed venue. Best available reasoning, explicitly
labelled as reasoning rather than evidence: it is worth one line, it signals
NVIDIA-ecosystem credibility (which pairs well with the DeepStream/TAO/TensorRT
stack), and it should sit near the edge-deployment material rather than in a
publications section where it invites comparison to CVPR.

### The ranking, applied to his specific assets

1. 7,000+ store production system, 99.23%/98.93% P/R, lead engineer *(scale +
   production + third-party-verified)*
2. Full 3D pose pipeline running entirely on-device, shipped to professional
   users *(deployment under hard constraint — the scarcest thing he has)*
3. 8cm → 3cm MPJPE, with the architectural reason attached *(depth of craft)*
4. Provably unbiased body model via frozen-pathway architecture, verified by
   weight diff; 204 bone measurements validated against published anthropometric
   ratios; 4.8× reconstruction-noise reduction; −73% event-timing error
   *(rigor — see below)*
5. Scientific Reports paper *(corroboration)*
6. TAITRA 1-of-3-from-638 *(external validation)*
7. GTC poster *(ecosystem signal)*
8. LLM systems: agentic workflows, deterministic rule-engine grounding, 8-language
   localisation, eval design *(breadth)*

### On his stated differentiator — rigor about undetectable failure modes

This is real and it is rare, but **it will not survive as an abstract claim.** No
recruiter screens for "architectural correctness guarantees." It only lands as
concrete artefacts:

- "verified bit-identical frozen pathways by weight diff" — this is a *testable
  engineering claim*, which is why it works
- "validated 204 bone measurements against published anthropometric ratios
  rather than internal consistency" — validation against external physical
  reality
- "rule engine computes all numbers; LLM constrained to narration" — the same
  instinct applied to LLM systems, and the single most credible LLM bullet he
  has, because it is an architectural correctness guarantee rather than a
  prompt-engineering claim

Keep the artefacts, drop the philosophy. The philosophy is interview material,
and excellent interview material — it is exactly the "hardest challenges faced
and the learnings through the process" that Huyen says she wants to hear.

---

## 5. Terminology reality check — the exact words postings use

Collected from real postings at Apple, Meta, NVIDIA, Qualcomm, NEURA Robotics,
Niantic Spatial, Torc Robotics, Mujin, and Meshcapade.

### Use these — they appear verbatim in postings

| Term | Where it appears | Notes |
|---|---|---|
| **3D computer vision** | NEURA, Mujin, general | The safest umbrella term. Use it. |
| **multi-view geometry** | NEURA ("3D geometry, camera models, and multi-view geometry"), AV/robotics postings | High-signal to specialists. Use it. |
| **camera calibration** / **intrinsic and extrinsic calibration** | NEURA, Meta ("Online Calibration"), AV postings | Use "camera calibration"; add "extrinsic" if multi-camera. |
| **3D reconstruction** | Meta, Niantic, Torc, NEURA, Apple | Extremely high frequency. Must appear. |
| **pose estimation** | Apple, Meta, Torc, Mujin, NEURA | The generic term. Must appear. |
| **3D human pose estimation** | Apple ("human pose understanding"), academic/industry standard | Use for the human-specific work. |
| **body tracking** | Apple VCV (pioneered "Body Tracking"), Meta ("object and body tracking and pose estimation") | Apple/Meta's internal vocabulary. Worth including once. |
| **3D perception** | Apple job title ("3D Perception/Computer Vision Algorithm Engineer") | Rising as a title-level term. |
| **perception** (as a noun/role) | NEURA, Torc, GM Embodied AI, all robotics | The robotics-world word for what he does. |
| **on-device** | Apple ("integrating on-device CV/ML algorithms") | Apple's exact phrasing. Use it, not "edge" alone, when targeting Apple. |
| **Core ML** | Apple, verbatim | Spell it "Core ML" (Apple's spelling) as well as CoreML somewhere. |
| **TensorRT**, **quantization**, **model compression** | Qualcomm, NEURA, DeepRec stack lists | Use "quantization" (US spelling) for ATS; his target is global. |
| **edge deployment** / **edge AI optimization** | NEURA ("edge deployment on NVIDIA Jetson"), DeepRec | Use alongside "on-device". |
| **temporal consistency**, **occlusion** | Research vocabulary, appears in specialist postings | Under-used by candidates; high signal. |
| **sensor fusion** | Meta, NEURA, Torc | Only if he can defend it. |
| **metric learning**, **embeddings**, **triplet loss**, **instance retrieval** | Retrieval/open-set postings | Precise and defensible. |
| **RAG** / **retrieval augmented generation**, **agentic**, **multi-agent**, **tool use**, **evals** | NVIDIA Metropolis posting; AI Index agentic cluster | Use "agentic" — it grew 280% YoY. Avoid "prompt engineering". |

### Avoid or de-emphasise

- **"motion capture"** on its own — it reads as a *film/VFX* term to a
  non-specialist and as a *hardware* term (Vicon/OptiTrack) to a specialist.
  Use **"markerless motion capture"** if used at all, and pair it with "3D human
  pose estimation" so the ML content is unambiguous.
- **"spatial AI"** — genuinely rising (World Labs, Niantic Spatial, "spatial
  computing" at Apple) but *not yet* a common posting keyword. Use it as flavour
  in a summary line, never as the only label for a skill.
- **"biomechanical analysis" / "kinematic analysis"** as primary framing — this
  reads as sports-science, not engineering. Keep as domain colour *after* the CV
  terminology, e.g. "3D human pose estimation for biomechanical analysis".
- **"prompt engineering"** — its share of AI postings is falling and it signals
  a shallow LLM profile. "Agentic workflows", "tool use", "evaluation design"
  are the current, higher-status equivalents.
- **"GAN"** as a headline skill — the MSc thesis work is real but GANs are a
  fading posting keyword relative to diffusion. Keep it as one line under
  education, not in the skills headline.

### Recommended skills-line ordering

```
3D computer vision · multi-view geometry · camera calibration · triangulation ·
3D human pose estimation · 3D reconstruction · temporal modelling under occlusion
On-device / edge inference · Core ML · TensorRT · quantisation · NVIDIA DeepStream,
TAO Toolkit, Metropolis · Apple ARM silicon · NVIDIA Jetson
Metric learning · open-set recognition · instance retrieval · triplet loss
LLM systems · agentic workflows · tool use · RAG · evaluation design
PyTorch · Python · C++ (if true)
```

---

## 6. Robotics / embodied AI adjacency — is the bridge honest?

**Verdict: yes, the bridge is real, but it is narrower than it first looks, and
one specific framing works far better than the obvious one.**

### The evidence that it is real

- **The foundational skills are named identically.** NEURA Robotics' Zurich
  humanoid perception role asks for "solid understanding of 3D geometry, camera
  models, and multi-view geometry" and responsibilities covering "SLAM, object
  detection and tracking, semantic segmentation, and 3D reconstruction" plus
  "integrating and calibrating diverse perception sensors." Four of those six
  are things he does daily.
- **Edge deployment is a robotics requirement, not a bonus.** NEURA's senior
  mobile-robotics perception role explicitly wants "optimizing vision models for
  edge deployment on NVIDIA Jetson." His Jetson-adjacent NVIDIA stack experience
  (DeepStream/TAO) and his ARM/CoreML work both translate.
- **Human perception is a first-class robotics problem.** NEURA's humanoid
  posting frames the job as perception "for navigation, manipulation, and
  **human-robot interaction**" in "complex, dynamic **human** environments."
  Human keypoint detection for close-proximity HRI and safety is an active,
  funded research and product area. This is the specific door his human-pose
  work opens.
- **The market is hot and pays well in Europe.** DeepRec.ai's Europe robotics
  guide puts perception & SLAM in its top five demand areas and senior/lead
  engineers at €120–180k (Munich), £140–220k (London), CHF 150–230k (Zurich).
- **World Labs is explicitly hiring the intersection** of "computer vision,
  graphics, and robotics" on a $1B raise.

### The evidence that it is narrower than it looks

- **SLAM is the gate, and he does not have it.** It is the single most-named
  robotics perception requirement and it is absent from his profile. This is the
  honest limiter on how far the robotics story carries.
- **The field is shifting toward learned end-to-end policies.** Vision-Language-
  Action models (RT-2, OpenVLA, π0 lineage) collapse separate perception and
  control pipelines into one learned system. The 2026 robotics hiring profile is
  increasingly described as a hybrid of perception engineer and deep-learning
  researcher comfortable with teleoperation data and sim-to-real — not a
  classical geometry specialist. His classical geometry is still needed
  (calibration, rig geometry, evaluation) but it is no longer the centre.
- **Posting volume is small.** Robotics is 0.08% of US postings, the second
  lowest cluster in the AI Index table, and IEEE Spectrum's read of Lightcast
  data noted robotics and autonomous driving *declining* year-over-year as
  specialized skill demands. Robotics is high-prestige and high-pay but
  low-volume; it should be a targeted secondary track, not the primary framing.

### The framing that works

**Do not** write "biomechanics skills transfer to robotics." A robotics hiring
manager will read that as a sports engineer reaching.

**Do** write the substrate directly, and let it be domain-agnostic:

> Built multi-camera 3D perception systems end to end: intrinsic/extrinsic
> calibration, triangulation across views, temporal state estimation robust to
> occlusion and fast motion, validated against external physical ground truth
> rather than internal consistency. Deployed to constrained edge hardware.

Every clause there is a robotics perception requirement stated in robotics
vocabulary. The fact that the tracked object is a human body is a detail he can
give in the next sentence — and in a humanoid/HRI context it is an *advantage*,
not a caveat.

**Best-fit robotics targets, honestly ranked:**
1. Humanoid / HRI perception where humans are the tracked object (NEURA, and
   the humanoid cohort generally) — the strongest genuine fit.
2. Robotics companies needing edge-deployed vision on Jetson — his edge story
   carries more weight than his geometry story here.
3. General autonomy/AV perception — weakest without SLAM; do not lead with it.

---

## 7. Concrete recommendations: what leads, and in what words

### Positioning line (top of resume)

Something structurally like:

> AI Research Engineer — 3D computer vision and on-device inference. Ships
> multi-view geometric perception systems to constrained hardware; production
> deployments from national scale (7,000+ sites) to fully on-device mobile.

Note what that does: leads with the *specialty*, second-mentions the *scarce
skill*, third-mentions *proof of scale*. It does not mention LLMs. LLMs appear
later as evidence of range.

### Ordering rule

**Order by (scarcity × verifiability), not by recency and not by what sounds
advanced.**

- Lead: production 3D vision at scale, externally verified.
- Second: on-device shipping under hard constraints.
- Third: accuracy/rigor bullets with the method attached.
- Fourth: LLM systems, framed as *correctness engineering* (deterministic
  grounding, eval design) rather than as GenAI fluency.
- Last: generative models / MSc thesis, compressed to one line.

### Two-version strategy

The evidence supports maintaining exactly two variants, not more:

1. **Vision/perception variant** (default, ~80% of applications): as above.
2. **AI engineer variant** (for the larger LLM-shaped market): the LLM systems
   bullets move to position two, but the vision work still *leads*, because the
   deterministic-grounding and eval-design story is only credible *because* he
   comes from a domain where numerical correctness is checkable against physics.
   That provenance is the differentiator in a market saturated with RAG
   pipelines. Never present as a pure LLM engineer — he loses his only edge.

### What to add to the portfolio (not the resume) before a broad Europe push

- SLAM/VIO: the most-cited gap, appears in nearly every 3D posting reviewed.
- 3D Gaussian Splatting: second most-cited; also the fastest path to reading as
  "current".
- Optionally a VGGT/DUSt3R-family experiment — cheap, recent, and a strong
  conversation opener with 3D specialists.

---

## Sources and why each is credible

**Primary, high credibility**

1. **Stanford HAI, *AI Index Report 2026*, Chapter 4: Economy** —
   `https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf`
   The only rigorous longitudinal source on skill-level labour demand. Built on
   Lightcast's job-posting database (billions of US postings since 2010) plus
   LinkedIn talent/hiring metrics. Non-commercial, methodologically documented,
   figures individually numbered and sourced. Figures used: 4.4.1, 4.4.2, 4.4.3,
   4.4.15, 4.4.21, 4.4.23. *Caveat: Lightcast's taxonomy bucket for vision is
   "visual image recognition," which undercounts 3D/geometric/spatial work.*

2. **Lightcast analysis of the 2026 AI Index** — `lightcast.io/resources/blog/stanford-ai-2026`
   Lightcast is the labour-market data provider *behind* the AI Index's posting
   analysis; this is the data owner's own commentary. Commercially motivated
   (they sell labour data) but the underlying numbers are the same primary set.

3. **IEEE Spectrum, AI jobs analysis** — `spectrum.ieee.org`
   IEEE's editorially independent magazine; the piece is sourced to LinkedIn,
   Lightcast, Stanford HAI, and McKinsey, and quotes named economists (Peter
   McCrory, LinkedIn; Yolanda Gil, AI Index steering committee). Used here for
   the finding that autonomous driving and robotics *declined* as specialized
   skill demands year-over-year.

**Real job postings from named companies (primary evidence of terminology and
requirements)**

4. **Apple** — "Senior Software Engineer, Computer Vision/ML for Human
   Understanding" (`jobs.apple.com`, req 200622583); "3D Perception/Computer
   Vision Algorithm Engineer"; Video Computer Vision org descriptions. Sources
   for: "on-device CV/ML", "Core ML", "pose estimation", "Body Tracking",
   "VIO, SLAM", "human pose understanding". *Apple postings rotate quickly; two
   of the URLs collected during this research had already 404'd, so the exact
   requisitions are ephemeral — the vocabulary is not.*
5. **Meta Reality Labs** — Computer Vision Engineer postings (`metacareers.com`).
   Source for the specialization menu: "SLAM State Estimation, Online
   Calibration, Sensor Fusion, 3D reconstruction, object detection, segmentation
   and tracking" and "object and body tracking and pose estimation".
6. **NEURA Robotics** (Metzingen & Zurich, Germany/Switzerland) —
   `jobs.neura-robotics.com`, multiple 2026 perception/vision requisitions.
   Source for European robotics vocabulary: "multi-view geometry", "camera
   models", "intrinsic/extrinsic calibration", "6-DoF pose estimation",
   "edge deployment on NVIDIA Jetson", "human-robot interaction".
   *Site blocks automated fetching (HTTP 403); content captured via search
   indexing, so treat exact phrasing as close-paraphrase rather than verbatim.*
7. **Torc Robotics** — "Senior ML Engineer, 3D Reconstruction"
   (`job-boards.greenhouse.io/torcrobotics`, $177k–$213k). Full posting
   retrieved. Source for AV-side vocabulary and the "2D/3D Object Detection,
   Tracking, Sensor Fusion, Semantic Segmentation, SLAM, or BEV" requirement
   pattern.
8. **Mujin** (Tokyo) — "Senior Computer Vision Engineer (Object Detection & 3D
   Pose Estimation)", ¥9–14M, visa-sponsoring. Full posting retrieved. Source
   for industrial 3D pose vocabulary and for evidence that "3D pose estimation"
   appears in job *titles*.
9. **Qualcomm** — Staff/Sr. Staff ML Engineer, Model Optimization; ML/AI
   internship spec. Source for edge vocabulary: quantization, model compression,
   "mixed CPU/GPU/NPU load", "ARM processors and mobile SoC architecture",
   AIMET, GPTQ/AWQ/SmoothQuant.
10. **NVIDIA** — "Senior Software Engineer, Metropolis Vision AI"
    (`nvidia.wd5.myworkdayjobs.com`, JR2011877, $224k–$357k). Source for the
    vision-plus-agentic combined requirement pattern (Metropolis, DeepStream,
    Isaac, "shipped agentic Vision AI applications in production").
11. **Niantic Spatial** — Senior Computer Vision Engineer (Reconstruction),
    $189k–$255k; London CV Software Engineer. Source for "point clouds, meshes
    and/or gaussian splats", "mapping & relocalization".
12. **Meshcapade GmbH** (Tübingen, Germany) — "CV/ML Engineer for 3D Digital
    Humans". Requires 5+ years Python/C++, MSc/PhD, and "demonstrable experience
    with the SMPL family of statistical models". *Directly relevant: this is a
    European company whose entire product is his domain, and SMPL is a
    named requirement he should evaluate against his own experience.*
13. **General Motors** — "Senior ML Engineer, Perception & Embodied AI"
    (`search-careers.gm.com`). Evidence that "Embodied AI" is now an org name at
    incumbent manufacturers, not just startups.

**Industry and community signal**

14. **World Labs funding announcement, 2026** (`worldlabs.ai/blog/funding-2026`)
    and Fast Company profile. $1B raise from AMD, Autodesk, NVIDIA, Fidelity,
    Sea, Emerson Collective. Founders: Fei-Fei Li, Justin Johnson, Christoph
    Lassner, Ben Mildenhall (Mildenhall is the first author of the original NeRF
    paper). Primary-source evidence that "spatial intelligence" is where the
    largest new 3D-vision capital is going, and that the sought profile is
    explicitly cross-disciplinary CV/graphics/robotics.
15. **CVPR 2026 Workshop: Computer Vision for Biomechanics (CVBW)** —
    `cvbw2026.github.io`. Organised by named academics at QUT, ETH Zurich
    (Marilyn Keller), UCL, University of Bath (David Pagnon, of Pose2Sim),
    CSIRO, Griffith. Evidence that his exact niche has an institutional home at
    the field's flagship conference, and that its stated concerns —
    "low-resource settings and on consumer grade devices", physics-informed
    models, multimodal sensor fusion — line up precisely with his on-device
    work. This is the single best community venue for him to be visible in.
16. **DeepRec.ai** — Europe Robotics Salary Guide 2026 and Computer Vision
    discipline page. A deep-tech recruitment agency with offices in Berlin,
    London, Munich, Zurich, Dublin, Boston; the guide is derived from their live
    placement activity. *Commercially motivated — they sell recruitment — so
    treat the demand rhetoric sceptically and the salary bands as directional.
    Used here for European salary bands and for the independent observation that
    CV is a long-tail specialty recruiters struggle to fill.*
17. **Chip Huyen** — *Introduction to Machine Learning Interviews* /
    `huyenchip.com`, plus VentureBeat and Eugene Yan interviews. Author of
    *Designing Machine Learning Systems* (O'Reilly) and *AI Engineering*;
    previously NVIDIA, Snorkel AI, Netflix; taught ML systems design at
    Stanford. The most credentialed *named* voice found on what ML hiring
    managers actually respond to. Used for: production experience over ML
    theory; metrics are worthless without product context; "hardest challenges
    and learnings" as the real interview currency.

**Rejected sources** (checked and discarded): ZipRecruiter/Indeed/Glassdoor
aggregate salary pages (scraped, unvalidated, no methodology); "Top 10 AI Skills
2026" content-farm articles (futurense, secondtalent, ayautomate, nucamp,
propelgrad, iterathon, neuralcoretech, codercops); resume-template vendors
(ResumeWorded, NeuraCV, ProRes, WriteCV, ResumeGeni, CareerBldr, ResumeAdapter)
— all selling a product, none with primary data; viso.ai / labellerr / ksolves
"trends" posts (vendor content marketing); Upwork/Coursera career pages
(lead-generation content).

---

## Honest gaps

Things this research could **not** establish, stated plainly so they are not
mistaken for findings:

1. **No credible data on how ML hiring managers weight a GTC poster.** Nothing
   substantive exists. The recommendation in §4 is reasoning from adjacent
   convention, not evidence. If it matters, ask a practitioner directly.

2. **No hard posting-count data for 3D-specific vision terms.** Lightcast's
   public taxonomy has "visual image recognition" but no SLAM / multi-view
   geometry / 3D reconstruction bucket. The terminology recommendations in §5
   are grounded in *which terms appear in real postings*, which is solid, but
   not in *relative frequency across the whole market*, which would be better.
   Getting that would require paid Lightcast/Adzuna API access.

3. **Little Europe-specific posting text.** Most retrievable full postings were
   US. European postings live on ATS platforms that block automated fetching
   (NEURA returned 403, Ashby and LinkedIn returned empty shells). European
   findings lean harder on the AI Index country data and on DeepRec (a
   commercially motivated source) than is ideal. Recommend spending an hour
   manually reading 15–20 real European postings on
   `jobs.neura-robotics.com`, `metacareers.com`, `jobs.apple.com` (Zurich /
   Munich / Cambridge UK), Meshcapade, Move.ai, and Niantic London, and
   recording exact requirement phrasing.

4. **No direct evidence on whether the vision-specialist framing outperforms
   the generalist framing in practice.** The §0 recommendation is inferred from
   posting-share data plus talent-scarcity commentary. It is a well-supported
   inference, but no A/B evidence exists. If he wants empirical signal, running
   the two-variant strategy in §7 and tracking response rates by variant would
   produce better data than any source found here.

5. **Sports/biomechanics-specific hiring demand was not quantifiable.** The
   companies exist and are funded (Sportsbox AI — $5.5M seed with PGA of America
   involvement; Sparrow Golf — $5.7M; Onform; Hawk-Eye/Sony's SkeleTRACK
   capturing 29 joints per player at 60Hz across NBA arenas; Theia, Vicon,
   KinaTrax on the biomechanics side), and CVBW at CVPR 2026 confirms academic
   momentum — but no posting-level demand data was found. This is a small,
   real, and *unusually well-matched* market for him; it is just not
   measurable from public sources.

6. **His own SMPL familiarity is unknown to this research.** Meshcapade requires
   it by name and it is the lingua franca of 3D human body modelling. If he has
   it, it belongs in the skills line. If he does not, it is a cheap, high-return
   gap to close given his existing body-model work.
