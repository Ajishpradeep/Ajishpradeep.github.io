# Positioning — who this profile is, before anything gets written

> **Superseded in part, 2026-08-16.** This file was written from the portfolio
> alone, before eight market-research passes. It holds up on identity, and is
> wrong or imprecise in four places — each corrected inline below and argued in
> `framing-decisions.md`, which is the operative document for how he is
> presented. Read that one for decisions; read this one for who he is.

Derived from the whole site (`src/data/*.ts`, the case studies, the impact
dossier, the lab repos), not from the old resume draft. Written first, because
the previous attempt produced a competent-looking document that was framed for
nobody in particular, and that is a worse failure than a formatting bug.

Everything below is an *interpretation* of the record. The record itself is
`docs/PROFILE.md`; where the two disagree, PROFILE.md wins.

---

## The paragraph

Pradeep Rajasekar is an applied 3D computer-vision research engineer who works
at the seam where a research architecture meets a deployment constraint that
will not move — an ARM handset, a camera rig with no calibration target, a
number that changes how someone moves their body. The unifying skill is not a
model family or a framework; it is **diagnosing the failure a system's own
metrics cannot see, and then engineering so that failure cannot recur** — a
frozen pathway that is bit-identical by construction rather than regularised
and hoped over, a reconstruction validated against published anthropometry
rather than against its own internal consistency, an LLM forbidden from
computing any number it might get wrong. He has taken that discipline across
generative models, retail vision at national scale, 3D biomechanics and agentic
LLM systems without restarting, because the through-line is mathematical
(linear algebra, multi-view geometry, optimisation, metric learning) rather
than domain-specific. What makes the profile unusually checkable for its length
is that the biggest claims are corroborated by people other than him: an NVIDIA
GTC 2025 poster, a peer-reviewed *Scientific Reports* paper describing a system
he led the vision architecture for across 7,000+ stores, an international award
judged from 638 proposals, and a shipped iOS product in the hands of PGA
professionals.

## What kind of engineer, precisely

**Applied / industrial AI research engineer, 3D vision specialisation, with
production edge-deployment as the second axis.**

He is deliberately *not* three adjacent things, and the distinction matters for
how the resume reads:

- **Not an academic researcher.** No first-author top-tier publications. Framing
  him as a research scientist invites a comparison he loses.
- **Not a generic MLE.** He does real architecture work — a parallel adapter
  over a frozen backbone composed from Progressive Neural Networks, Side-Tuning
  and ControlNet zero-convolutions is not pipeline plumbing.
- **Not an LLM/GenAI engineer.** He has genuine LLM systems work, but it is his
  third-strongest axis and the market's most crowded one. Leading with it puts
  a top-decile vision profile into the modal pile. (See
  `resume-research/domain-demand.md`: generative AI appears in ~0.41% of
  postings versus ~0.09% for visual recognition — the LLM market is ~4.5×
  larger and he cannot win it on LLM credentials, while in the smaller vision
  market he is genuinely unusual.)

## Seniority and trajectory

Roughly **mid-level IC trending senior** — refined by the research to
**borderline senior**: over the bar on every published behavioural criterion,
under it on tenure. The practical rule that emerged, which this file guessed at
and the research made precise: **the head noun of a posting's title picks the
clock.** *AI Engineer / Software Engineer* postings count software-engineering
years (dunnhumby's Senior AI Engineer asks "8+ years software engineering,
including 3+ years production AI/ML" — his profile verbatim); *ML Engineer /
Scientist* postings count ML years only. See `framing-decisions.md` §3.

The honest reading depends on which clock you use:

- ~3 years in AI industry roles (Nov 2023 → now), or ~5 counting the MSc
  research from 2021.
- ~8 years total professional engineering, including four years of full-stack
  work at AIBS (2017–2021) before the MSc.

Scope evidence pointing upward, all from the record: "R&D lead", "lead
engineer", sole authorship of a winning international proposal, authorship of
the organisation's AI coding standards, mentoring the engineering team, and
being the person sent to present in Warsaw. That is a senior-flavoured
responsibility set on a mid-level tenure.

**Decision taken from this:** the resume states no year count at all. A tenure
figure at the top hands a screener a level before they have seen the evidence,
and the evidence is the argument. The dates are directly beneath and can speak.

## Core domains, in order of real depth

1. **3D computer vision** — 3D human pose estimation and 2D-to-3D lifting,
   multi-view geometry, camera calibration, triangulation, 3D reconstruction,
   temporal consistency under occlusion and fast motion.
2. **On-device / edge inference** — Core ML on Apple ARM, TensorRT, DeepStream,
   TAO, quantisation. Scarce, and the market pays for it.
3. **Open-set recognition / metric learning** — detection plus fine-tuned
   embeddings, retrieval instead of classification, proven at national scale.
4. **LLM systems engineering** — agentic, grounded, deterministic-hybrid
   architectures. Real, current, and third.
5. **Generative models** — GANs and attention, from the MSc. Foundational,
   least current, earns a line rather than a section.

## The strongest, most differentiated thing

Not any single metric. It is the **combination of genuine geometric depth with
production shipping under hard constraints, plus a documented habit of rigour
that most candidates cannot evidence at all.** Concretely: 8 cm → 3 cm is a
good number, but "I made the regression architecturally impossible and verified
it by weight diff" is the sentence that separates him from everyone else with a
good number. The rigour artefacts — bit-identity, 204 bone measurements against
anthropometric ratios, rules validated by finding the ones that fire on 100% of
sessions — are the differentiator, and they are also exactly what an ML hiring
manager probes for when they pick one project and ask you to defend every
choice.

## Honest weaknesses, stated so they can be worked on

- ~~**No SLAM/VIO and no Gaussian Splatting**, which co-occur in nearly every 3D
  vision posting reviewed. This is the largest single gap.~~
  **CORRECTED.** Two independent posting sweeps (3,782 and 4,506 live roles)
  found this overstated. Helsing — the posting used to justify the claim —
  requires "localisation, scene matching, **or** 3D reconstruction" plus
  "domain adaptation **or** model compression", and he has two of those, so it
  does not gate him. The real gap to close is **learned feature matching +
  visual place recognition**, because VPR is triplet-loss image retrieval and
  his 7,000-store system is the same machine pointed at streets — weeks of
  work rather than months, reusing what he has. See `framing-decisions.md` §7.
- **No first-author peer-reviewed publication.** For research-lab roles this
  is a real ceiling; for industrial R&D it is substantially offset by shipped
  systems and the GTC poster.
- **The Scientific Reports paper is not his.** He built the system it
  describes; he is not an author. **Now verified in full**: four authors — Ou,
  Ponce, Lee, Wu, all President Information Corporation — and an
  Acknowledgements section thanking only an NSTC grant, with his name nowhere
  in the text. So it is evidence about the *system*, never about him, and is
  cited as "Ou et al." so non-authorship is self-evident. This also makes the
  **GTC poster his only externally verifiable artifact carrying his own name**,
  which is a stronger reason to foreground it than this file originally gave.
- **"Sports biomechanics" is a narrow-sounding domain label** if led with, even
  though the underlying substrate is domain-agnostic. Framed as 3D perception
  throughout, with the sport as the application rather than the identity.

## Where this profile should aim

**Superseded — see `framing-decisions.md` § target cluster for the operative
answer.** The list below was a reasonable guess from the portfolio; the
research narrowed it and reversed one item.

The narrowed target is **camera-based human and athlete tracking on edge
hardware**, sports-led, with **automotive in-cabin sensing** as the named
secondary (EU ADDW mandatory since 7 July 2026). That is the only cluster
requiring both halves of his profile.

The reversal worth noting: **industrial research labs are now explicitly
deprioritised**, not recommended. They pay roughly 37% of big-tech in the same
city, and their common 50–75% FTE contracts can fall *below* the Blue Card
salary threshold (65% FTE ≈ €45,874 against a €45,934.20 floor) — which would
make the role legally unusable to him regardless of its appeal.

The original guess, kept for the record: 3D perception / spatial AI teams;
on-device and edge ML teams (Apple, Qualcomm, NVIDIA and their European sites);
AR/VR and spatial computing; robotics perception; industrial/applied research
labs where shipping counts as much as publishing.
