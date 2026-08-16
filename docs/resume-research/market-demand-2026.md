# Market Demand 2026 — Is the Core Specialism Durable, and Which Gap Is Worth Closing?

Research date: 16 August 2026.
Scope: the one question that decides whether the whole positioning is built on
solid ground — **is classical multi-view geometry being displaced by learned 3D
foundation models, and if so on what clock** — plus the SLAM-vs-SMPL gap dispute
that two prior agents left unresolved.

This document **extends and in three places corrects**
`domain-demand.md`, `vertical-human-motion.md` and `seniority-trajectory.md`.
It does not restate them. The three corrections are flagged inline as
**CORRECTION**.

---

## 0. The findings, stated up front

1. **His specialism is not being displaced. One layer of it is.** Split the
   skill into three layers with very different half-lives. The hand-written
   correspondence-and-pose *front-end* has a 3–5 year clock. The
   *estimation, gauge and metric-anchoring* layer has no visible clock and is
   arguably appreciating, because every learned geometry model now needs someone
   who can tell when its geometry is silently wrong. The *runs-in-a-power-budget*
   layer has the longest life of the three, because its constraint is physics.
   His portfolio is concentrated in layers two and three. The displacement risk
   lands on layer one, which is the smallest part of what he actually does.

2. **The real risk is not obsolescence, it is access.** Classical geometry
   appears in 0.53% of 4,506 live postings and 6.8% of computer-vision postings.
   Fourteen of the twenty-one CV postings that mention geometry *also* require
   SLAM, VIO or relocalisation. He is not being made obsolete; he is being
   locked out of a small market by one adjacent requirement.

3. **SLAM-vs-SMPL: neither, as posed. The answer is the localisation
   front-end.** SMPL appears in **zero** of 4,506 postings, and its licensing
   status changed under both prior agents' feet (Epic acquired Meshcapade in
   February 2026; two permissively-licensed alternatives landed in November
   2025). Full classical SLAM is months of work whose front-end half is exactly
   the half being automated. The highest-ROI move is **learned feature matching
   + visual place recognition, delivered as a working monocular visual-odometry
   demo** — roughly a quarter of evenings, zero licensing friction, and it
   converts an existing production asset (his triplet-loss retrieval system)
   into the missing keyword rather than starting from zero.

4. **On-device is structural, not a spike** — the drivers are memory bandwidth,
   thermal envelope and unit economics, not fashion. But the *durable* version
   of the skill is not "I know Core ML"; it is "I hold an accuracy budget under a
   latency and power budget on hardware I don't control, and prove it."

5. **The most underplayed asset is metric-scale anchoring**, and the
   foundation-model literature has just spent eighteen months making it the
   named open problem. He should lead with it.

---

## 1. On-device / edge AI: durable structural trend, not a spike

### 1.1 Replication of the prior sweep on an independent sample

The prior agent's 3,782-posting sweep found on-device/edge terms roughly 3× more
often than any human-motion term. I ran an independent sweep — different company
list, different regex, overlapping only partially — to test whether that ratio
was a sampling artefact.

**Method.** Full posting text pulled from the Greenhouse, Lever and Ashby public
job-board APIs across ~200 attempted company slugs; 55 companies returned open
roles. Deduplicated on (company, title, location). Collected 16 August 2026.

**Sample: 4,506 live postings, 55 companies.**

| Term cluster | All (n=4,506) | EU-located (n=1,453) | CV-mentioning (n=307) | CV **and** EU (n=63) |
|---|---|---|---|---|
| Deployment / edge (`on-device`, `edge inference`, `TensorRT`, `Core ML`, `quantiz*`, `ONNX`, `TFLite`, `ExecuTorch`, `NPU`, `DeepStream`, `OpenVINO`, `model compression`, `Jetson`, `embedded inference`) | **103 (2.29%)** | 25 (1.72%) | **36 (11.73%)** | **10 (15.87%)** |
| SLAM / VIO / relocalisation / place recognition | 26 (0.58%) | 8 (0.55%) | 22 (7.17%) | 6 (9.52%) |
| Classical geometry (`multi-view geometry`, `triangulat*`, `camera calibrat*`, `epipolar`, `SfM`, `photogrammetr*`, `projective geometry`, `homograph*`, `3D reconstruct*`) | 24 (0.53%) | 9 (0.62%) | 21 (6.84%) | 7 (11.11%) |
| Human motion (`human pose`, `3D pose`, `body track*`, `markerless`, `biomechan*`, `mocap`) | 27 (0.60%) | 2 (0.14%) | 3 (0.98%) | 1 (1.59%) |
| NeRF / 3DGS | 11 (0.24%) | 7 (0.48%) | 5 (1.63%) | 4 (6.35%) |
| **SMPL / parametric body model** | **2 (0.04%)** | **0** | 1 (0.33%) | **0** |
| **3D foundation models** (`DUSt3R`, `MASt3R`, `VGGT`, `Depth Anything`, `monocular depth`) | **0 (0.00%)** | **0** | **0** | **0** |
| LLM / agentic / RAG | 1,007 (22.35%) | 351 (23.28%) | 42 (13.68%) | 15 (23.81%) |

Deployment terms outnumber classical geometry **4.3×** and human-motion terms
**3.8×** across the whole sample. **The prior agent's 3× ratio replicates on an
independent company set.** Two independent samples totalling >8,000 postings
agreeing on the ratio is the strongest evidence available that this is a
structural feature of the market and not a sampling artefact.

**Honest deflation of the number, though.** 2.29% of all postings is a small
absolute figure, and the deployment cluster is *diluted*: a large share of the
103 hits are LLM-serving-infrastructure roles (Baseten, Modal, Deepgram,
Cartesia, Perplexity), not vision-on-edge. The number that actually applies to
him is the CV column: **11.7% of CV postings, 15.9% of EU CV postings**. That is
the honest headline, and it is still the largest single cluster in his stack.

### 1.2 Why the trend is structural — the drivers are physics and unit economics

These are the four drivers, and none of them is a hype cycle.

**Memory bandwidth, which does not improve on a fashion schedule.** Vikas
Chandra (Senior Director & Distinguished Scientist, AI, Meta) and Raghuraman
Krishnamoorthi, *On-Device LLMs: State of the Union, 2026*: mobile devices have
"50-90 GB/s; data center GPUs have 2-3 TB/s. That's a 30-50x gap," and available
RAM is "limited to <4GB even on high-end devices." Their conclusion — "4-bit
isn't just 4x less storage; it's 4x less memory traffic" — is exactly why
quantization and compression are a permanent job rather than a tooling
milestone. A named Meta distinguished scientist writing a technical state-of-the-
union is the highest-credibility source available on this question.

**Unit economics.** On-device inference amortises to roughly $0.000003 per
inference against roughly $0.001 in the cloud, and cloud round-trips add
200–500 ms before first token against sub-20 ms on-device. At millions of daily
inferences the arithmetic decides the architecture, not the product manager.

**Installed base making NPUs a procurement default.** Apple A18 Pro at 38 TOPS;
Snapdragon 8 Elite at 45 TOPS with 12 GB LPDDR5X; IDC forecasting NPU-equipped
machines at 94% of new PC shipments by 2028, with AI PCs passing 50% of PC sales
during 2026. Once the silicon is a default line item, someone has to put models
on it.

**Platform commitment across vendors, not one vendor.** Meta's ExecuTorch
supports 12+ hardware backends (Apple, Qualcomm, Arm, MediaTek, Vulkan) and is
deployed across Instagram, WhatsApp, Messenger and Facebook. Qualcomm's stated
hybrid-AI strategy puts real-time, personalised and privacy-sensitive workloads
on-device by design. This is not one company's bet.

**And in Europe specifically, regulation is pulling the same direction.**
Advanced Driver Distraction Warning became mandatory for **all new vehicles
sold or registered in the EU from 7 July 2026** under Regulation (EU) 2019/2144
and Commission Delegated Regulation (EU) 2023/2590. ADDW is, technically, an
in-cabin infrared camera doing gaze direction and head pose in real time on an
automotive SoC. That is embedded human perception mandated by statute across a
continent. Smart Eye's Q1 2026 report describes the GSR effects as "becoming
increasingly visible in the market," with 51% organic growth and a run of DMS
design wins. **This confirms and strengthens the prior agent's ADDW finding —
the date has now passed and the mandate is live.**

### 1.3 Is production edge experience scarce, or commoditising?

**Both, unevenly, and the split matters for how he should frame it.**

*Commoditising:* the on-device **LLM** path. llama.cpp, ExecuTorch (50 KB
runtime footprint), MLX and MediaPipe have converged; 4-bit via GPTQ/AWQ is
"the new default"; speculative decoding gives a documented 2.2–3.6× speedup out
of the box. A competent engineer can ship a quantised 3B model to a phone from
tutorials now. If he positions as "on-device AI engineer" generically, he is
walking into the crowded end.

*Not commoditising:* multi-model **vision** pipelines under a hard latency and
thermal budget. Chandra's own writeup concedes the remaining hard parts —
outlier-aware quantization when quality degrades, memory-bandwidth budgeting,
Mixture-of-Experts on mobile which "doesn't exist yet." Add the vision-specific
problems no tutorial covers: operator coverage gaps between framework and NPU,
calibrating quantization against a *real* data distribution rather than a
sample, layer fusion and execution-graph surgery, sustained-throughput thermal
behaviour, and proving an accuracy budget survives all of it.

**Framing consequence.** The durable claim is not "I know Core ML and
TensorRT" — that is a tooling claim with a shelf life. The durable claim is
"I hold an accuracy budget under a latency and power budget on hardware I do not
control, and I can prove the accuracy survived." That claim gets *stronger*, not
weaker, as tooling improves, because better tooling raises the number of people
who can convert a model and leaves unchanged the number who can certify the
result.

---

## 2. European 3D-perception demand — and a plain statement of the data limit

### 2.1 The limit, stated plainly

**There is no European labour dataset with a 3D-vision bucket, and no European
labour dataset with an edge-AI or on-device bucket either. Anyone quoting a
European "3D computer vision demand" percentage is fabricating it.** I verified
this three ways:

- **Lightcast / Stanford AI Index 2026.** Lightcast's taxonomy for the 2026 AI
  Index is 10 AI skill clusters covering 300+ individual skills, with Agentic AI
  added as the newest cluster this year. There is no edge-AI, on-device,
  embedded-AI or 3D-vision cluster. This confirms and extends
  `domain-demand.md`'s finding that Lightcast has no 3D bucket — it has no edge
  bucket either, which means the on-device finding in §1 *also* cannot be
  corroborated from Lightcast and rests on the posting sweeps.
- **Indeed Hiring Lab (Europe).** Their July 2026 Europe/US work classifies at
  the *job-title* level: a normalised title is "AI-touched" when at least five
  postings under that label carry "AI", "GenAI", "AGI" or "artificial
  intelligence" in the employer's raw title in a quarter. There is no technical
  specialism split at all — the article's own breakdown is into AI
  enablement/consulting, AI training/content, and AI instruction.
- **Eurostat / EU digital-skills reporting** operates at ICT-specialist
  granularity, several orders of magnitude above a sub-discipline of computer
  vision.

### 2.2 What the European data *can* support

Aggregate AI-demand intensity in Europe is real, rising, and behind the leaders:

- Share of postings mentioning AI skills (Lightcast, AI Index 2026): Singapore
  4.7%, Spain 3.3%, US 2.6%, UK 1.9%.
- Indeed AI Tracker share of postings mentioning AI: Ireland 15%, Spain 13%,
  UK 9%.
- AI-touched job titles, Q1 2026 (Indeed Hiring Lab): Germany 288 (4.2% of all
  titles), UK 160 (2.7%), France 138 (3.3%), Netherlands 84 (2.2%), Spain 81
  (2.3%) — up from 72, 61 and 35 respectively in Q1 2022, so roughly 3–4× in
  four years while overall postings moved sideways or down.
- 54–59% of AI-touched titles in Germany, France and the UK now sit *outside*
  tech occupations. Relevant to him only as a caution: aggregate "AI demand is
  booming" headlines are increasingly measuring non-technical roles.

### 2.3 The only European 3D-specific numbers that exist are the ones in §1.1

Of **63 EU-located CV postings**: 7 (11.1%) mention classical geometry, 6 (9.5%)
SLAM/VIO/relocalisation, 10 (15.9%) deployment/edge, 4 (6.3%) NeRF/3DGS, 1
(1.6%) human motion, **0 SMPL, 0 3D foundation models**. Small n — treat as
directional, not precise.

**The structurally important observation is employer concentration.** Nearly the
entire visible European 3D-perception demand in this sample sits at three
companies:

- **Helsing** — *AI Research Engineer, 3D Computer Vision* (Berlin; London;
  Munich; Paris) and the PhD intern variant (adds Barcelona). Spatial
  Intelligence Team: scene matching, geo-registration, SLAM, VIO, 3D
  reconstruction.
- **Wayve** — Research Scientist (London), *Principal Engineer, 3D
  Reconstruction* (Sunnyvale), ML Engineer ADAS (London, Israel). Sixteen
  SLAM-mentioning postings, ten geometry-mentioning; by a distance the densest
  geometry employer in the sample, but with the senior 3D roles in California.
- **NavVis** (Munich) — *Lead ML Engineer, Geometric Spatial AI*, *Senior ML
  Engineer, Semantic Spatial AI*, *Senior SQE, 3D Performance Computing*. Not
  previously identified in any prior research document and a genuinely good fit
  (see §6.4).

That thinness is the real European risk — not that his skill is dying, but that
in a given quarter there may be three to six European employers hiring for it.

### 2.4 The blind spot, quantified

I attempted 27 driver-monitoring and automotive-supplier job boards (Smart Eye,
Seeing Machines, Cipia, Tobii, Valeo, Continental, Bosch, ZF, Aptiv, Magna,
Mobileye, Ambarella, Xperi, dSPACE, Elektrobit and others). **Zero were
reachable via Greenhouse, Lever or Ashby.** The European automotive-perception
employer base — which the ADDW mandate has just guaranteed demand for — is
entirely invisible to ATS sweeps. The same is true of Apple, Meta, Sony/Hawk-Eye
and most European mid-caps.

So the sweep numbers are a **lower bound on European demand, biased toward
venture-backed startups**, and the ADDW mandate plus Smart Eye's design-win flow
is the best available proxy for the invisible layer. Any conclusion of the form
"European demand is only N postings" would be wrong; the ratio findings survive
the bias, the absolute counts do not.

---

## 3. THE CRITICAL QUESTION — is classical multi-view geometry being displaced?

### 3.1 Steelmanning the displacement case

It is a serious case and it deserves stating at full strength.

**Two consecutive CVPR best papers point the same way.** VGGT (*Visual Geometry
Grounded Transformer*) took CVPR 2025's best paper for feed-forward multi-view
geometry. CVPR 2026's best paper — announced 9 June 2026 from 16,092
submissions and 4,089 acceptances — is **D4RT**, *Efficiently Reconstructing
Dynamic Scenes One D4RT at a Time* (Google DeepMind / UCL / Oxford). From the
abstract: D4RT "utilizes a unified transformer architecture to jointly infer
depth, spatio-temporal correspondence, **and full camera parameters** from a
single video," running 18–300× faster than prior state of the art and treating
dynamic objects with "no special case, no test-time optimization, and no fusion
step." The honourable mention, Meta's *SAM 3D*, predicts object geometry,
texture and layout from a single image.

Read that abstract as a labour-market signal: depth, correspondence and camera
parameters — that is monocular depth, feature matching and calibration, three of
the classical pipeline's four stages, collapsed into one forward pass, on
*dynamic* scenes, which is the human-motion case. If anything ever threatened
his stack directly, this is it.

**The accuracy case is real in the sparse regime.** A peer-reviewed evaluation of
DUSt3R/MASt3R/VGGT on photogrammetric aerial blocks
(*Geo-spatial Information Science*, arXiv:2507.14798) reports **completeness
gains up to +50% over COLMAP** from fewer than ten images, with VGGT showing
"superior computational efficiency, scalability, and more reliable camera pose
estimation."

**And 3D Gaussian Splatting has genuinely crossed into production.** It trains
in minutes rather than hours, renders at 60+ FPS, and produces editable
geometry rather than opaque weights. During a single month of 2026, "Adobe
Photoshop, Houdini, Blender, Chaos Corona, SolidWorks, PIX4D, Postshot, and Esri
all shipped real splat workflows"; Netflix used a splat solution on an LED volume
for a production shoot; Niantic's Scaniverse produces splats directly on iPhone
and Android; Khronos and the Alliance for OpenUSD have started standardisation.
**On the narrower question the brief asks: yes, 3DGS has displaced NeRF as the
default radiance-field representation.** NeRF survives as a research baseline and
in a few storage-constrained niches (10–50 MB per scene against 500 MB–1.5 GB
for splats), but no one is starting a new production capture pipeline on NeRF in
2026.

That is the case. It is stronger than most people making it realise. Now here is
why it does not land on him.

### 3.2 The five reasons the displacement does not reach his layer

**(1) Metric scale is unobservable from monocular input. This is a theorem, not
an engineering gap.** From *Keep It CALM: Toward Calibration-Free Kilometer-Level
SLAM with Visual Geometry Foundation Models* (arXiv:2604.14795, 2026):

> "the absolute metric scale is theoretically unobservable from monocular
> inputs. Consequently, even with semantic priors learned from massive datasets,
> VGFMs usually cannot recover the accurate metric scale without external
> geometric constraints, resulting in significant scale fluctuations across
> different sub-maps."

No amount of scale, data or architecture fixes this — it is the projective
camera model. Every system that needs a real-world measurement still needs an
external anchor: a calibration target, a known baseline, an IMU, a LiDAR return,
or a known object dimension. Depth Anything 3's metric variant resolves scale by
being *prompted* with sparse low-resolution depth from a cheap LiDAR — i.e. by
an external anchor, exactly as predicted. **Anchoring 3D reconstruction to
real-world scale and validating it against published anthropometric ratios is
the single most displacement-proof thing on his CV, and the literature has spent
eighteen months converging on it as the named open problem.**

**(2) Intrinsics estimation remains ill-posed, and the field's best systems now
route around it with classical machinery.** Same paper:

> "VGFMs often struggle with accurate intrinsic estimation due to the affine
> ambiguity of the camera. For instance, in degenerate motions like straight-line
> driving, distinguishing between a wide road captured with a large Field of View
> and a narrow road with a small FoV is mathematically ill-posed."

The tell is VGGT-SLAM. Its *central contribution* is to align submaps on the
SL(4) manifold using 15-DoF projective transformations rather than similarity
transforms — a design forced entirely by VGGT's inability to estimate
calibration. The Georgia Tech / GTSAM writeup (June 2026) is explicit that the
homography solver degenerates "when submaps view flat floors or a single wall."
Anyone who has debugged a grid-search intrinsics solver understands that failure
in ten seconds. Anyone who has not, does not.

**(3) The classical back-end did not disappear. It got wrapped.** VGGT-SLAM =
VGGT front-end + GTSAM factor graph + loop closure + pose-graph optimisation on
an SL(4) manifold. CAL²M retains SALAD place-recognition descriptors, pose-graph
optimisation and bundle adjustment, and documents why: "residuals caused by these
inaccuracies can accumulate rapidly, leading to catastrophic long-term trajectory
drift and map divergence," with depth maps and point clouds that "frequently
exhibit non-linear warping."

This is the load-bearing point. **The learned models replaced the correspondence
*front-end*. They did not touch the estimation *back-end*.** And the person who
debugs a hybrid system needs epipolar geometry, gauge freedom, error propagation
and bundle adjustment *more* than the person who ran COLMAP end-to-end, because
the front-end is now a black box that fails silently and non-linearly. Classical
geometry moved from "the thing you implement" to "the thing you use to tell
whether the model lied to you." That is a promotion in the value chain, not a
demotion.

**(4) The compute wall is two orders of magnitude wide, and he lives on the far
side of it.** Hard numbers:

| System | Throughput | Hardware |
|---|---|---|
| MASt3R-SLAM | ~15 FPS | RTX 4090 + i9-12th gen |
| VGGT-SLAM 2.0 | ~8.4 FPS (16-frame submap) | RTX 3090 |
| VGGT-SLAM 2.0 + open-set detection | ~6.3 FPS | RTX 3090 |
| VGGT raw frame capacity | ~60 frames max | 24 GB RTX 3090 |
| MASt3R-SLAM / VGGT-SLAM at defaults | **OOM** | 8 GB RTX 4060 Laptop |

Against that: a flagship phone is 38–45 TOPS with under 4 GB usable RAM and
50–90 GB/s of memory bandwidth. There is a Jetson Thor demonstration of
VGGT-SLAM, which is genuine progress — and a Jetson Thor is a several-hundred-watt
robotics module, not a phone in a pocket at a sustained thermal ceiling.

**Feed-forward geometry in 2026 is a data-centre and workstation technology.
His pipeline runs entirely on a phone. These are different markets separated by
roughly 30–50× in memory bandwidth, and that gap is not closing on a
three-year horizon** — the models are getting larger faster than mobile memory
bandwidth is getting wider.

**(5) The peer-reviewed verdict is complementarity, and it degrades in exactly
the regimes production cares about.** The aerial-photogrammetry evaluation
concludes the transformer methods "cannot fully replace traditional SfM and MVS,
but offer promise as complementary approaches, especially in challenging,
low-resolution, and sparse scenarios," with "pose reliability declin[ing] with
more images and geometric complexity" and reduced performance on high-resolution
imagery and larger image sets. The recommendation is to keep COLMAP "when you
need classical optimization, reproducibility, and a known failure model in
production-grade photogrammetry." *Known failure model* is the phrase that
matters: production teams buy predictability, and a transformer that degrades
non-linearly with scene complexity does not offer it yet.

Two supporting data points in the same direction: 3DGS still commonly
initialises from SfM poses — COLMAP-free variants exist (CVPR 2024;
PCR-GS, ICCV 2025) but "struggle to handle scenes with complex camera
trajectories as featured by drastic rotation and translation," so
traditional SfM-based approaches remain widely used. And production AR still runs
classical VIO: ARKit is a tightly-coupled filtering-based visual-inertial
odometry framework, ARCore an MSCKF-style VIO. Billions of devices, no
transformer in the 6-DoF loop.

### 3.3 The hiring signal, which lags research by years and shows nothing yet

**Zero of 4,506 live postings mention DUSt3R, MASt3R, VGGT, Depth Anything,
monocular depth foundation models or feed-forward reconstruction.** Not one.
Including at the most research-forward employers in the sample. Helsing — the
company most likely to be reading these papers — describes its work as "scene
matching, geo-registration, simultaneous localisation and mapping (SLAM), and 3D
reconstruction" and asks for "learned feature matching, place recognition,
visual SLAM, visual-inertial odometry (VIO), or neural 3D representations such
as neural radiance fields (NeRF)." That vocabulary is 2019-to-2023, not 2026.

Job requirements historically lag conference consensus by roughly three to five
years. So the honest reading of the zero is not "foundation models don't
matter" — it is "**there is not yet a leading indicator of a hiring shift, and
when one appears he will have several years of warning.**"

### 3.4 The verdict, with a timescale

Split the specialism and give each layer its own clock.

| Layer | What it is | Half-life | Evidence |
|---|---|---|---|
| **A. Correspondence & pose front-end** | Hand-rolled feature detection, matching, RANSAC-PnP, incremental SfM | **3–5 years as a standalone selling point** | VGGT 2025 + D4RT 2026 best papers; +50% completeness over COLMAP in sparse regimes; learned matchers already default in research |
| **B. Estimation, gauge & metric anchoring** | Calibration models, intrinsics/extrinsics, triangulation geometry, scale resolution, error propagation, validation against ground truth | **No visible clock; appreciating** | Metric scale provably unobservable monocularly; intrinsics ill-posed under degenerate motion; every hybrid system retains BA/pose-graph/loop-closure; "known failure model" is the production requirement |
| **C. Running it in a power budget** | Quantization, compression, graph optimisation, thermal and memory budgeting on target silicon | **Longest of the three** | 30–50× memory-bandwidth gap; models growing faster than mobile memory; foundation-model SLAM OOMs on an 8 GB laptop GPU |

**He is concentrated in B and C. The displacement lands on A.**

**Concrete answer to "does it have a shelf life."** If he markets himself as
*"I implement multi-view geometry pipelines"* — yes, and I would put roughly
five years on it, with visible erosion starting around 2028–2029 as feed-forward
models get small enough for workstation-class edge hardware. If he markets
himself as *"I make 3D perception metrically correct and provably correct on
constrained hardware"* — no shelf life is visible, and the trend is a tailwind,
because every organisation deploying a learned geometry model in the next decade
will need exactly one person who can tell them the reconstruction is wrong before
the customer does.

**The strategic move is not to abandon geometry. It is to stop selling the
implementation and start selling the verification.** That is, verbatim, what
Helsing and NavVis are hiring for: Helsing wants someone who has "iterated on
models and geometric pipelines beyond benchmarks and understand[s] what it takes
to make these systems reliable under real-world data distributions and
deployment constraints"; NavVis wants "systematic evaluations using rigorous
methodology so decisions are driven by evidence rather than impressions" and
someone who will "diagnose, debug, and enhance ML systems when results fall
short."

---

## 4. Skill-by-skill ranking — most in demand vs most commoditised

Ranked by *(demand × scarcity × durability)* for his target cluster of real-time
human perception on constrained hardware, Europe-primary. Frequencies from the
4,506-posting sweep.

### Tier 1 — lead with these

**1. On-device / edge deployment under a hard budget.**
11.7% of CV postings; 15.9% of EU CV postings; 4.3× classical geometry. Durable
for physics reasons (§1.2). *Commoditisation caveat:* the LLM-on-device path is
converging fast; the vision-pipeline path is not. Sell the budget-and-proof
framing, not the tool names.

**2. Metric-scale anchoring and geometric validation.**
Cannot be measured in postings — there is no keyword for it — but it is the
named open problem in the 2026 geometry literature and the thing that makes
every other layer trustworthy. **Highest durability of anything he owns and
currently the most underplayed.**

**3. Classical geometry + calibration.**
6.8% of CV postings, 11.1% of EU CV postings. Low supply, high durability in its
verification form, but **gated**: 14 of 21 geometry postings also require
SLAM/VIO/relocalisation. See §5.

### Tier 2 — genuine, name them, don't lead with them

**4. Applied LLM systems with deterministic grounding and evaluation design.**
22.4% of all postings mention LLM/agentic/RAG — by far the largest cluster in
the entire sample. Also the most crowded and fastest-commoditising. His
differentiator inside it is not RAG (commodity); it is *structured grounding and
evaluation design*, which appears in the *responsibilities* of both Helsing and
NavVis rather than their nice-to-haves. Worth one line, framed as rigour.

**5. Open-set recognition / metric learning / instance retrieval.**
Appears under its own names in almost nothing (0.02–0.11%) — but that is a
**vocabulary failure, not a demand failure.** The identical machinery is called
"visual place recognition" in robotics, "re-identification" in surveillance,
"retrieval" in search, and "open-vocabulary detection" in current CV. Visual
place recognition is trained with triplet and contrastive ranking losses;
NetVLAD and its successors (CosPlace, Conv-AP, MixVPR) are deep metric learning
for image retrieval. **This is the most underexploited asset in his portfolio
and the key to §5.**

**6. 3D human pose / temporal lifting / occlusion robustness.**
0.60% of all postings, 0.98% of CV postings, 1 posting in 63 EU CV postings.
Genuinely rare skill, genuinely tiny explicit market. **Confirms
`vertical-human-motion.md`: asset as evidence, liability as identity.**

**7. Multi-object tracking and temporal consistency.**
3.6% of CV postings. Modest, steady, uncontroversial. Supporting evidence for
the pose work rather than a headline.

### Tier 3 — real work, but not market-facing keywords

**8. Novel architecture composition** (Progressive Neural Networks / Side-Tuning
/ ControlNet zero-conv → provably regression-free adapter). Zero postings ask for
it. It is an interview and portfolio asset. Reframe it as a *reliability
guarantee* rather than novelty — see §6.3.

**9. Vendor-specific NVIDIA stack** (TAO Toolkit, DeepStream, Metropolis
microservices). 42 of 4,506 postings mention Jetson/DeepStream/TAO combined
(0.93%), and 1 of 63 EU CV postings. Reads as vendor lock-in rather than
transferable engineering. Demote to a tools line.

**10. Core ML specifically.** 8 postings (0.18%); **zero** EU CV postings. It is
proof-of-shipping, not a keyword. Lead with the achievement, name the tool
second.

### Most commoditised — do not spend words on these

Training loops; fine-tuning standard detectors and segmenters; "PyTorch";
generic "computer vision"; RAG-as-such; prompt engineering. All are table stakes
now and consume resume space that Tier 1 needs.

### One important structural caveat on the "intersection" thesis

`domain-demand.md` argues his rare value is the geometry × deployment × LLM
intersection. The sweep both supports and qualifies that. **Of 36 CV postings
mentioning deployment, only 2 also mention geometry. Of 21 mentioning geometry,
only 2 also mention deployment.** The intersection is genuinely rare — but rare
cuts both ways. Very few individual requisitions ask for both, which means the
combination is a **differentiator inside a requisition he already qualifies
for**, not a key that opens additional requisitions. Practical consequence: he
must pick which term makes him *findable* (deployment, for volume; geometry +
localisation, for fit) and use the other as the thing that wins the interview.
Leading with the intersection as a headline will match neither ATS filter.

---

## 5. ADJUDICATION — SLAM vs SMPL

### 5.1 The SMPL case collapses on the evidence

**Frequency.** SMPL, SMPL-X and "parametric body model" appear in **2 of 4,506
postings (0.04%), zero in Europe, zero in the CV+EU subset.** The prior agent's
3,782-posting sweep also produced no standalone SMPL requirement — SMPL sat
inside a 25-hit human-motion cluster that was, on inspection, dominated by
mechanical-engineering uses of "biomechanics." Two independent sweeps totalling
over 8,000 live postings, and the term does not appear as a requirement.

The vertical agent's claim that SMPL "gates ~20% of the human-motion vertical" is
arithmetically fragile even if true: 20% of a vertical that is 0.98% of CV
postings is 0.2% of CV postings. The gate is real in the sense that some
human-mesh-recovery roles need it. It is not material at portfolio-allocation
scale.

**CORRECTION — the licensing picture changed under both prior agents.** The
vertical agent's finding that "Meshcapade holds exclusive commercial
sub-licensing" is **now out of date**:

- **Epic Games announced its acquisition of Meshcapade on 18 February 2026**
  (Max Planck Society announcement, primary source), with the team joining
  Epic's AI Research group and Epic establishing a presence in Tübingen's Cyber
  Valley.
- **SMPL licensing did not go to Epic.** Per Max Planck: "MI [Max Planck
  Innovation] will now directly take over the licensing of the SMPL technology,"
  and it "remains available to both existing and new customers." So the paid
  dependency persists but the counterparty changed.

**And more decisive: SMPL is de-standardising.** Two permissively licensed
parametric body models landed in November 2025:

- **Naver Anny** (arXiv:2511.03589) — code under **Apache 2.0**, built on
  MakeHuman assets, 564 interpretable artist-defined blendshapes, covering
  infants through elders.
- **Meta MHR (Momentum Human Rig)** (arXiv:2511.15586, `facebookresearch/MHR`) —
  anatomically-inspired parametric full-body model with a decoupled
  skeleton/shape design, released under an explicitly industry-friendly licence,
  designed to be "friendly for both CG and CV communities."

Plus NVlabs' SOMA-X, which exists specifically to unify parametric body models.

**So the "learn SMPL" recommendation now means: spend several weeks on a
licence-encumbered artefact, to satisfy zero verified postings out of 8,000+,
while two permissive competitors with big-lab backing are actively displacing it
as the standard, and the licence itself just changed hands.** That is a poor
allocation of scarce learning time by any reading.

The transferable insight — that a low-dimensional parametric shape+pose prior
regularises 3D human reconstruction — is a concept he can absorb in a weekend
and speak to credibly in an interview. That is sufficient. It does not merit a
project.

### 5.2 The SLAM case is much stronger — but the seniority agent's specific gate is wrong

**Frequency and, critically, co-occurrence.** SLAM/VIO/relocalisation appears in
7.2% of CV postings and 9.5% of EU CV postings — roughly 12× SMPL's rate on the
whole sample. But the decisive number is not the frequency. It is this:

> **Of the 21 CV postings that mention classical geometry, 14 also require
> SLAM, VIO or relocalisation.**

SLAM is not a parallel market to his geometry skill. **It is the dominant
co-requirement of the exact market his geometry skill addresses.** Two-thirds of
the doors his best classical skill unlocks have a second lock on them.

**CORRECTION to `seniority-trajectory.md`.** The seniority agent reported that
Helsing's *3D Computer Vision* research-engineer variant "requires SLAM/VIO/NeRF"
and therefore excludes him. Reading the live posting text verbatim, that is not
what it says. The two relevant bullets:

> "Have hands-on experience developing localisation, scene matching, **or 3D
> reconstruction** systems. You have iterated on models and geometric pipelines
> beyond benchmarks and understand what it takes to make these systems reliable
> under real-world data distributions and deployment constraints."

> "Are deeply familiar with modern approaches to geometric computer vision and
> deep learning, including learned feature matching, place recognition, visual
> SLAM, visual-inertial odometry (VIO), **or** neural 3D representations such as
> neural radiance fields (NeRF), and have applied techniques such as domain
> adaptation **or model compression** to practical problems."

Three things follow. First, bullet 2 is satisfied outright by 3D reconstruction —
and its second sentence ("beyond benchmarks… reliable under real-world data
distributions and deployment constraints") is a near-verbatim description of what
he does. Second, bullet 3 is an **OR of five items**, not a SLAM requirement,
and its trailing clause is satisfied by model compression, which he has. Third,
PhD and top-tier publications are in the **"Nice to have"** block; the hard
requirement is an MSc. The role is not publication-gated and not SLAM-gated.

**It is gated on possessing any one of: learned feature matching, place
recognition, visual SLAM, VIO, or NeRF.** That is a materially different and much
cheaper gate than "SLAM."

### 5.3 The ruling

> **Neither SMPL nor full SLAM. The single highest-ROI gap is the localisation
> front-end: learned feature matching plus visual place recognition, delivered
> as one working monocular visual-odometry demo.**

**Why this beats both prior recommendations on every axis:**

**Effort — this is the cheapest of the three by a wide margin, because he is
already most of the way there.** Visual place recognition *is* deep metric
learning for image retrieval. NetVLAD was trained with triplet loss; its
successors (CosPlace, Conv-AP, MixVPR) are variants of the same ranking-loss
machinery. **His 7,000-store instance-retrieval system built on fine-tuned
triplet-loss embeddings is the identical apparatus pointed at shelves instead of
streets.** A VPR project on a public benchmark (Pitts30k, Mapillary Street-Level
Sequences, Nordland) is a re-targeting exercise measured in weeks, not a new
field. Learned feature matching (SuperPoint → SuperGlue/LightGlue, or LoFTR) is
dense detection plus descriptor matching — again, his existing stack. Bolting
both into a monocular VO loop with PnP + RANSAC + a small pose graph reaches
"I have built visual odometry" in roughly a quarter of evenings. Full classical
VI-SLAM — IMU pre-integration, sliding-window marginalisation, C++/Ceres/GTSAM
depth — is six months and mostly buys the half that feed-forward models are
automating.

**Doors opened — the widest of the three.** It satisfies Helsing's bullet 3
directly, in the posting's own words. It admits him to the 14-of-21 geometry
postings that carry a localisation co-requirement. It is the honest bridge to the
robotics adjacency that `domain-demand.md` correctly identified as SLAM-gated.
And it is *specifically* the "or place recognition / or learned feature matching"
branch, which means he gets the gate for a fraction of the cost of the SLAM
branch. SMPL, by contrast, opens zero verified postings in the sample.

**Licensing friction — zero.** SuperPoint, LightGlue, LoFTR, NetVLAD successors
and all the standard VPR benchmarks are open and freely usable. SMPL is a
negotiated commercial licence with an undisclosed price and a counterparty that
changed in February 2026.

**Future-proofing — he learns the current version, not the legacy version.**
The correspondence front-end is precisely the layer §3 identifies as having a
3–5 year clock in its *hand-written* form. Learning the *learned* front-end is
learning the thing that is replacing the thing, not the thing being replaced.

**Framing risk — low, if he is disciplined.** He must say "monocular visual
odometry and place recognition," which he will have built, and must **not** say
"SLAM," which implies loop closure, mapping and back-end optimisation at
production quality. Overclaiming here is easily caught in interview by anyone
who has built one.

### 5.4 The sequenced plan

| Priority | Action | Effort | Unlocks |
|---|---|---|---|
| **1** | Re-label the existing retrieval work in localisation vocabulary — "instance-level retrieval with fine-tuned triplet embeddings, open-set, deployed across 7,000+ sites" and note the equivalence to place recognition | **Days.** No new learning. | Immediate. This is free and it is currently being left on the table. |
| **2** | VPR project on a public benchmark (Pitts30k / MSLS), reporting Recall@1/@5 against a published baseline | 3–4 weeks | Satisfies Helsing bullet 3's "place recognition" branch with evidence |
| **3** | Swap in learned feature matching (LightGlue or LoFTR) and build a monocular VO loop: matcher → PnP + RANSAC → small pose graph, on KITTI or EuRoC | 6–8 weeks | "Hands-on localisation" becomes literally true; the geometry-role co-requirement clears |
| **4** | Run the whole thing quantised on a phone or Jetson, and report the accuracy/latency/power trade-off curve | 2–3 weeks | Converts the gap-closing project into a **differentiator**: almost nobody who has VPR also has the deployment envelope characterised. This is the intersection artefact §4 says he is missing. |
| **5** | Name metric-scale anchoring explicitly as a method, with the 204-measurement validation as evidence | Days | Aligns his most durable asset with the literature's named open problem |
| — | *SMPL* | *Skip.* | Read the SMPL and MHR papers; be able to discuss the shape-prior concept. No project. |

Step 4 is the one that turns a gap-closing exercise into a positioning asset,
and it is the step nobody else closing this gap will take.

---

## 6. How to surface the real portfolio against this demand picture

### 6.1 Underplayed — promote these

**1. Metric-scale anchoring and validation against ground truth.**
Currently buried inside a sports-science story. It is the single most durable and
least commoditised thing he owns, and the 2026 geometry literature has converged
on it as the named limitation of every learned model (§3.2). Language:
*"metric-accurate 3D reconstruction anchored to real-world scale, validated
against published anthropometric ratios across 204 bone measurements."*
Emphasis on *metric*, *real-world scale*, *validated against ground truth* —
not on *sport*.

**2. The retrieval / metric-learning system, in localisation vocabulary.**
Right now this reads as retail. Reframed, it is one hop from visual place
recognition and it is the thing that makes the localisation gap closeable rather
than structural (§5.3). This is the largest single unrealised gain in the whole
portfolio and it costs nothing but rewording.

**3. The calibration debugging story.** The grid-search intrinsics solver he
diagnosed and fixed currently reads as a chore. It is the highest-signal
evidence of geometric depth on the CV, because finding a *silent* geometric
failure is precisely the skill a team wraps around a foundation model (§3.2).
Language: *"diagnosed and corrected a failing grid-search intrinsics solver; the
error was silent in the reprojection metric and only visible in downstream metric
scale."* If he can say something in that shape, it is worth more than any tool
name on the page.

**4. Evaluation and benchmark design.** Both Helsing and NavVis put rigorous
evaluation in the *responsibilities*, not the nice-to-haves — NavVis: "Design
systematic evaluations using rigorous methodology so decisions are driven by
evidence rather than impressions"; Helsing: "design rigorous experiments, and
conduct benchmarks to evaluate and improve real-world performance." He has this
and does not sell it.

**5. Model compression and quantization, in those exact words.** Helsing's
bullet 3 makes "domain adaptation or model compression" a hard requirement. He
satisfies it. It should appear verbatim.

### 6.2 Overplayed — demote these

**1. "Sports science" / "human motion analysis" as an identity.** 0.60% of all
postings; 0.98% of CV postings; **one** of 63 EU CV postings. This confirms
`vertical-human-motion.md` on independent data. Keep it as *evidence of a hard
problem solved under real constraints*; drop it as a category label.

**2. TAO Toolkit / DeepStream / Metropolis as headline items.** 0.93% of
postings combined, 1 of 63 EU CV postings. Vendor-stack names read as lock-in.
TensorRT and quantization are the transferable words; the rest belongs on a
tools line.

**3. Core ML as a headline keyword.** 8 postings (0.18%), zero EU CV postings.
Lead with the *achievement* — "shipped a complete real-time 3D analysis pipeline
running entirely on-device on a phone" — and name Core ML as the mechanism.
The achievement is rare; the tool name is not searched for.

**4. "Novel architecture" framing on the regression-free adapter.** No posting
asks for architectural novelty, and the word "novel" invites a publications
question he cannot win with no first-author papers. Reframe it as an engineering
guarantee: *"zero-regression adapter for a model already in production, verified
bit-identical by weight diff."* That is a **reliability** claim, which is what
deployment teams buy, and it routes entirely around the publication gap.

**5. Any research-scientist framing at publication-gating employers.** Helsing's
*engineer* variant asks for an MSc with publications as nice-to-have; its *PhD
intern* variant requires the PhD. The engineer variants are the target. Framing
himself as a researcher invites comparison on the axis where he is weakest.

### 6.3 The positioning sentence this evidence supports

Not a recommendation on wording — that belongs to `title-positioning.md` — but
the evidence points at a specific shape:

> Real-time 3D perception engineer: metric-accurate geometry, validated against
> ground truth, running inside a latency and power budget on hardware I don't
> control.

Every clause in that is defensible from his actual work, and every clause maps
to a durable layer from §3.4. Note what is absent: sport, vendor tool names,
"novel," and "research."

### 6.4 One concrete European target the prior research missed

**NavVis (Munich), *Lead Machine Learning Engineer — Geometric Spatial AI***
(`job-boards.eu.greenhouse.io/navvis/jobs/4931997101`) and the two adjacent
Munich roles. Reality-capture and spatial-intelligence company; customers upload
~500 million m² of spatial data per year with survey-grade point clouds down to
3 mm resolution; the JD is explicit that "at petabyte scale every solution must
balance quality, speed, memory use, robustness, and cost," and that "most of your
time goes into moving these methods from research into production, not just
exploring them." The sister role names Gaussian splats as a forward-looking data
type. Requirements are MS/PhD *or equivalent practical experience*, 5–7+ years,
"solid foundation in the mathematics of geometry, linear algebra, and
optimization" — no SLAM requirement, no publication requirement.

Caveat, stated honestly: the deep requirement is **point-cloud** deep learning
(PointNet++, sparse convolutional networks, graph neural networks), which is
adjacent to but not identical to his image-based 3D work. The Semantic Spatial AI
variant is the closer fit, since it is framed around evaluation, integration and
production judgement rather than point-cloud architecture depth. Worth pursuing;
worth being honest with himself about the delta.

---

## 7. Sources, with credibility notes

### Primary — collected for this document (highest confidence for ratios, lower for absolute counts)

- **4,506-posting ATS sweep**, Greenhouse / Lever / Ashby public job-board APIs,
  55 companies with open roles, 16 August 2026. Full posting text, deduplicated.
  *Credible because it is full-text primary data with a stated method, and
  because its central ratio replicates the prior agent's independent sweep.*
  **Known bias:** covers only employers using open ATS APIs — systematically
  excludes Apple, Meta, Bosch, Continental, Valeo, ZF, Smart Eye, Seeing
  Machines, Sony/Hawk-Eye and most European mid-caps. 27 attempted automotive /
  DMS supplier boards were all unreachable. Absolute counts understate; ratios
  survive.

### Primary — job postings quoted verbatim

- Helsing, *AI Research Engineer — 3D Computer Vision*, Berlin/London/Munich/Paris
  (`helsing.ai/jobs/4911999101`) — the requirement text that corrects
  `seniority-trajectory.md`.
- Helsing, *AI Research Intern (PhD) — 3D Computer Vision*
  (`helsing.ai/jobs/4941957101`) — names the Spatial Intelligence Team and its
  SLAM/VIO scope; the publication requirement lives here, not in the engineer role.
- NavVis, *Lead ML Engineer — Geometric Spatial AI* and *Senior ML Engineer —
  Semantic Spatial AI*, Munich (`job-boards.eu.greenhouse.io/navvis/jobs/4931997101`,
  `.../4835176101`).
- Wayve — *Principal Engineer, 3D Reconstruction*; *Research Scientist, Wayve
  Labs* (London / Sunnyvale / Vancouver).

### Primary — regulation (high confidence)

- **Regulation (EU) 2019/2144** (General Safety Regulation) and **Commission
  Delegated Regulation (EU) 2023/2590** — ADDW mandatory for new vehicle *types*
  from 7 July 2024 and **all new vehicles from 7 July 2026**. Confirmed against
  the European Commission's own 8 July 2026 announcement. *Confirms and updates
  the prior agent's ADDW finding — the date has now passed.*
- **EU Digital Omnibus on AI**, in force 27 July 2026 (OJ 24 July 2026). Relevant
  as a **partial correction to any AI-Act-driven demand timing**: high-risk
  obligations were *deferred* — Annex III stand-alone systems to 2 December 2027,
  Annex I embedded-in-product systems to **2 August 2028**. Any framing that
  leans on imminent AI Act compliance demand should move a year to the right.

### Primary — corporate and institutional announcements (high confidence)

- **Max-Planck-Gesellschaft**, 18 February 2026 — Epic Games acquiring
  Meshcapade; "MI will now directly take over the licensing of the SMPL
  technology," which "remains available to both existing and new customers."
  *Primary institutional source; supersedes the vertical agent's Meshcapade
  exclusive-sub-licence finding.*
- **Smart Eye AB Q1 2026 interim report** (Nasdaq Stockholm listed) — 51% organic
  growth; multiple DMS design wins; GSR effects "becoming increasingly visible in
  the market." *Audited public-company reporting.*

### Primary — peer-reviewed and arXiv papers

- **D4RT**, arXiv:2512.08924, **CVPR 2026 Best Paper** (Google DeepMind / UCL /
  Oxford) — feed-forward joint inference of depth, spatio-temporal correspondence
  and **full camera parameters** from a single video; 18–300× faster than prior
  SOTA. *Best-paper status from 16,092 submissions makes this the strongest
  available signal of research direction. Note: weights not yet publicly
  released as of the CVPR write-ups, which bounds near-term production impact.*
- **"An Evaluation of DUSt3R/MASt3R/VGGT 3D Reconstruction on Photogrammetric
  Aerial Blocks"**, arXiv:2507.14798 / *Geo-spatial Information Science* — +50%
  completeness over COLMAP in sparse regimes; degradation with image count,
  resolution and geometric complexity; explicit conclusion that they "cannot
  fully replace traditional SfM and MVS." *Peer-reviewed, quantitative,
  application-domain evaluation rather than a self-report by the method authors —
  the most credible single source on the displacement question.*
- **"Keep It CALM: Toward Calibration-Free Kilometer-Level SLAM with Visual
  Geometry Foundation Models"**, arXiv:2604.14795 — the theorem-level statement
  that metric scale is unobservable monocularly; affine ambiguity in intrinsics
  estimation; documented drift accumulation and non-linear warping.
  *Load-bearing for §3.2, and credible precisely because the authors are
  advocates of the foundation-model approach describing its own limits.*
- **"Foundation Models in Robotics: A Comprehensive Review"**, arXiv:2604.15395 —
  depth-foundation priors "injected to stereo/VIO pipelines for stabilizing scale
  and short-horizon pose"; latency and compute cost identified as critical
  constraints for real-time control. *Survey; complementarity framing rather than
  replacement.*
- **MHR: Momentum Human Rig** (arXiv:2511.15586, `facebookresearch/MHR`) and
  **Anny** (arXiv:2511.03589, `naver/anny`, Apache 2.0) — the permissive
  parametric-body-model alternatives that undercut the SMPL investment case.

### Named practitioners (high confidence)

- **Vikas Chandra** (Senior Director & Distinguished Scientist, AI, Meta) with
  **Raghuraman Krishnamoorthi**, *On-Device LLMs: State of the Union, 2026* —
  the 30–50× memory-bandwidth gap, <4 GB usable RAM, 4-bit as default, and the
  admission that MoE on mobile "doesn't exist yet." *Verifiable credentials,
  technical specificity, no product being sold.*
- **GTSAM / Georgia Tech**, *Bringing Geometric Foundation Models to SLAM:
  VGGT-SLAM and SL(4) Factor Graph Optimization*, June 2026 — the SL(4)
  formulation forced by VGGT's inability to estimate calibration; the ~60-frame
  memory bound on a 24 GB 3090; degeneracy on flat floors and single walls.
  *The reference implementation's own maintainers documenting the classical
  scaffolding the learned model still requires.*

### Labour-market datasets with stated methodology

- **Lightcast / Stanford AI Index 2026, Chapter 4** — 10 AI skill clusters,
  300+ skills, Agentic AI added in 2026. AI-skill posting share: Singapore 4.7%,
  Spain 3.3%, US 2.6%, UK 1.9%. *Used here principally as a **negative**
  finding: the taxonomy contains no edge-AI, on-device, embedded or 3D-vision
  cluster.*
- **Indeed Hiring Lab**, *AI Is No Longer Just a Tech Occupation Story*, 8 July
  2026 — stated method (normalised titles, ≥5 postings with AI in the raw title
  per quarter); Q1 2026 AI-touched titles Germany 288 / UK 160 / France 138 /
  NL 84 / ES 81; Indeed AI Tracker AI-mention share Ireland 15%, Spain 13%,
  UK 9%. *Transparent method, genuine European coverage; **no** technical
  specialism breakdown, which is itself the finding.*
- **IDC** (via secondary reporting) — NPU-equipped machines at 94% of new PC
  shipments by 2028. *Medium-high: a named analyst house with a stated forecast,
  but accessed second-hand rather than from the primary report.*

### Medium confidence — used directionally only

- **radiancefields.com / Michael Rubloff** — specialist trade publication
  tracking the radiance-field field; the source for the 3DGS production-adoption
  list (Adobe, Houdini, Blender, PIX4D, Esri, Netflix LED volume; 212 tools;
  Niantic Spatial's $250M spin-out). *Specialist and consistently accurate, but
  a one-person publication and partisan toward the field it covers.*
- **learnopencv** benchmark figures for MASt3R-SLAM (15 FPS on RTX 4090).
  *Reproducible, widely cited, but a content site rather than peer review; the
  VGGT-SLAM 2.0 figures come from the paper itself and are firmer.*
- Edge-AI market-size aggregations. *Flagged and largely discarded — see below.*

### Explicitly rejected

- Every "edge AI market size, CAGR of X%" report from market.us, Grand View,
  SNS Insider, Mordor and openpr: no stated methodology, mutually inconsistent
  numbers, and sold as reports.
- Recruiter and course-marketing content on CV-engineer demand and salaries
  (ZipRecruiter, Coursera, Upwork, KORE1, tekrecruiter, peopleinai, prakashinfotech,
  divogue): the "LinkedIn projected 35% growth for computer vision engineers"
  claim in particular could not be traced to any LinkedIn Economic Graph
  publication and is treated as unsourced.
- SEO tool-comparison pages (toolhunter, neuralcoretech, thefuture3d guides) and
  "2026 compliance guide" content farms.
- Any camera-calibration "guide" published by a vision-hardware or model vendor.

---

## 8. Honest gaps — what I could not establish

1. **No European 3D-vision demand figure exists, from anyone.** Not from
   Lightcast, not from Indeed, not from Eurostat. My 63-posting EU CV subsample
   is the only 3D-specific European measurement in this document and n=63 is too
   small to defend to two significant figures. Treat every EU percentage in §2.3
   as directional.

2. **The European automotive and DMS employer base is unmeasurable by ATS
   sweep.** All 27 attempted supplier boards were closed. The ADDW mandate and
   Smart Eye's reporting establish that demand exists and is growing; they cannot
   establish its volume, seniority mix, or whether it is filled internally.

3. **I could not determine whether D4RT outputs metric-scale geometry.** The
   abstract, project page and the Voxel51 write-up are all silent on it, and the
   weights are not released. Given the theoretical result on monocular scale
   unobservability, up-to-scale is the strong prior — but I did not verify it,
   and this matters, because a genuinely metric feed-forward model would be a
   real threat to layer B in §3.4. **This is the single finding most worth
   re-checking when the D4RT paper's full text and weights land.**

4. **I could not find a credible named practitioner stating directly that
   classical geometry hiring is declining or holding.** The evidence in §3 is
   assembled from papers, postings and benchmarks; no senior industry figure was
   found saying it in those words. The three-layer timescale in §3.4 is my
   synthesis, not a sourced claim, and should be labelled as such if it is
   reused.

5. **CVPR topic-share time series could not be obtained.** I have 2026 totals
   (16,092 submissions, 4,089–4,090 accepted, ~25% acceptance), the named top
   submission areas (image/video synthesis; vision-language-reasoning;
   multi-modal; **3D from multiview and sensors**; medical/biological vision), and
   one comparable figure (vision-language and multimodal-LLM papers rising from
   4.9% to 10.6% of the highlighted set). I could not obtain a year-over-year
   percentage series for 3D or geometry topics, so I cannot say whether 3D's
   share is rising, flat or falling — only that it remains among the top
   submission areas.

6. **The "20% of the human-motion vertical is SMPL-gated" figure from
   `vertical-human-motion.md` could not be reproduced or refuted** on my sample,
   because my sample contains too few human-motion postings (27 across 4,506) to
   compute a meaningful denominator. My finding is narrower and firmer: SMPL
   appears in 2 of 4,506 postings and 0 in Europe. Both statements can be true;
   the vertical is simply very small.

7. **I did not verify whether the Helsing 3D Computer Vision posting text changed
   between the seniority agent's read and mine.** The OR-structure I quote is
   from the live posting on 16 August 2026. If the posting was edited in the
   interim, the seniority agent may have read it correctly at the time. Either
   way, the current text is what a current application is judged against.
