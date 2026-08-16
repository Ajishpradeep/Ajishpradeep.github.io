# Framing decisions

The output of eight research passes (`docs/resume-research/`), turned into
decisions. `positioning.md` says who he is; this says how he is presented and
why. Where the two disagree, this file is newer and wins.

Every decision names the evidence behind it. Where I exercised judgement past
the evidence, it says so — those are the ones worth arguing with.

---

## The position, in one sentence

**Real-time human perception that runs inside a power budget** — a 3D computer
vision specialist whose scarce half is shipping to constrained hardware, with
sport as the proving ground rather than the identity.

Not a generalist. Not an LLM engineer. Not a sports-science specialist.

## Target cluster

Camera-based human and athlete tracking on edge hardware — sports technology
led, with **automotive in-cabin sensing** as the named secondary (EU ADDW has
been mandatory since 7 July 2026; Smart Eye's Q1 showed automotive revenue
+122% and software licensing +200%). This is the only cluster that needs *both*
halves of his profile, and the one where the PGA Tour evidence is worth a great
deal rather than nothing.

Explicitly deprioritised: **industrial research institutes** (Fraunhofer, MPI,
DFKI, INRIA). They pay roughly 37% of big-tech in the same city, and there is a
specific trap — TVöD E13 Stufe 1 is €70,576 full-time, but these institutes
routinely hire at 50–75% FTE, and **65% FTE = €45,874, about €60 below the
Blue Card threshold**. If he ever talks to one, FTE percentage is the first
question, not the last.

---

## The eight decisions

### 1. Vision specialist, not LLM generalist — held from the previous pass

Confirmed rather than revisited. Stanford AI Index 2026 (Lightcast): generative
AI appears in 0.41% of postings, visual recognition 0.09%. The LLM market is
~4.5× larger, which is the argument *against* competing in it — there his stack
is modal, here it is top-decile.
→ `domain-demand.md`

### 2. Headline: `AI Research Engineer — 3D Computer Vision, On-Device Perception`

The old headline's defect was not accuracy but that it **contained no title**,
so it could not establish an identity. The publication gate attaches to the
noun *Scientist*, not to *Research*: Bosch posts Research Engineer as "PhD or
Master's + 3 years" with publications unmentioned, and AI Research Scientist
with a top-venue publication record under *Basic* Qualifications. Meta's AI
Research Engineer minimum is a Bachelor's. imec's Senior AI Research Engineer
accepts "PhD **or** 5+ years industrial experience". Inria's *ingénieur de
recherche* is Master's-entry.

**His preferred identity survives contact with the evidence.** He must never
claim a *Scientist* title.

`Applied LLM Systems` was cut from the headline: since swyx's 2023 essay, "AI
Engineer" has drifted to mean a foundation-model API builder, so the AI prefix
already risks that misread — an adjacent LLM term turns ambiguity into a
conclusion. The LLM work stays in skills and experience as range.
→ `title-positioning.md`, `credibility-artifacts.md`

### 3. Seniority: borderline senior. Target it, never self-assign it

Over the bar on every published behavioural criterion, under it on tenure.
So: no level word in the headline, apply to Senior requisitions anyway, signal
level through scope nouns rather than rank. This resolves a real disagreement
between two agents — the title agent was right about the *headline*, and wrong
to extend that to *application strategy*.

**The operative rule is that the head noun of the title picks the clock.**
*AI Engineer / Software Engineer* postings count software-engineering years —
dunnhumby's Senior AI Engineer asks for "8+ years software engineering,
including 3+ years production AI/ML", which is his profile verbatim. *ML
Engineer / Scientist* postings count ML years only. There is no single correct
answer to "3 years or 8?"; match the clock to the posting in the cover letter,
and put **dates only** on the CV.

Also: **71% of European postings state no years requirement at all** (573-posting
corpus), including 70% of Senior-titled ones — Acas advises employers that year
counts risk indirect age discrimination. The years argument is one Europe is
mostly not having.
→ `seniority-trajectory.md`

### 4. Vertical: lean in ~30%, not 80%. Asset as evidence, trap as identity

A sweep of **3,782 live postings** across 30 companies — a list deliberately
stacked toward motion-adjacent employers — found human-motion terms in 25, and
"3D human pose" in exactly **one**, against **69** mentioning on-device or edge
inference. His substrate is ~3× more in demand than his domain, in a sample
biased toward the domain.

And the vertical's own employers agree: Catapult *requires* multi-view
geometry, camera calibration and TensorRT quantisation, then files "a genuine
**interest** in sports analytics" under nice-to-have. Sword Health files pose
estimation and body modelling under "would love to see". Leading with the
domain means competing on the tiebreak.

**Rule: capability is the subject, sport is the prepositional phrase.**
"PGA Tour professionals" (credibility), never "golf swing analysis"
(narrowness) — same product, opposite reading. The 7-ELEVEN work stays visible
because retail → sport is the counterexample that disproves the pigeonhole.
→ `vertical-human-motion.md`

### 5. Work authorisation: `EU Blue Card eligible`. Nothing else

He qualifies — a two-year second-cycle degree from a state university is what
Directive (EU) 2021/1883 contemplates, and § 18g AufenthG puts ISCO 21 and 25
on the German shortage list, giving a reduced 2026 threshold of **€45,934.20**.
That threshold never binds commercially: it sits 1.6–2.4× below any realistic
offer.

Stated as a fact with a named mechanism, never as a request. "Eligible for",
never "seeking sponsorship" — recruiters reject uncertainty, not cost.

**Nationality omitted** (European convention omits it; "Blue Card eligible"
already implies non-EU, so the signal survives without the protected
characteristic). **APRC omitted**, which is the counter-intuitive one: it is his
strongest legal status and worth nothing here, because "Permanent Resident of
Taiwan" reads as *settled elsewhere* and hands a screener a
relocation-probability objection. **This reverses for Taiwan/APAC applications**,
where "Taiwan permanent resident (APRC) — no work permit or sponsorship
required" is a genuine asset and should be swapped in.

A finding that changes the whole shape of the search: **"does this company
sponsor?" is the wrong question in most of Europe.** Only the UK, Netherlands
and Denmark operate employer licensing. Germany, Ireland, Sweden, France,
Spain, Portugal, Poland and Belgium have no register and no licence — any
trading employer can hire a Blue Card holder. The "one sponsorship signal in
3,782 postings" finding does not mean nobody sponsors; it means most European
employers have nothing to advertise.
→ `aprc-scope.md`, `relocation-routes.md`

### 6. The specialism is durable. One layer of it is not

Split three ways:

| Layer | Clock |
|---|---|
| Hand-written correspondence / pose front-end | **~3–5 years.** VGGT won CVPR 2025 best paper; D4RT (CVPR 2026) jointly infers depth, correspondence and full camera parameters from one video |
| Metric anchoring / estimation | **No visible clock.** Metric scale is provably unobservable from monocular input, so every learned model still needs an external anchor |
| Runs in a power budget | **Most durable.** MASt3R-SLAM: 15 FPS on a 4090. VGGT-SLAM 2.0: 8.4 FPS on a 3090. Both OOM on an 8GB laptop GPU, against a phone's <4GB and a 30–50× bandwidth gap |

**He is concentrated in the two durable layers.** Foundation-model geometry is
data-centre technology; he ships on phones. Zero of 4,506 live postings mention
DUSt3R, MASt3R, VGGT or Depth Anything.

One necessary downgrade: the geometry+deployment intersection appears in only
2 of 36 CV-deployment postings. It differentiates him *within* a requisition;
it does not open extra ones. Do not oversell it as a market-widening asset.
→ `market-demand-2026.md`

### 7. Gap to close: learned feature matching + visual place recognition

Neither SLAM nor SMPL, which is where two agents landed before adjudication.

SMPL appears in **2 of 4,506 postings, zero in Europe**, and is actively
de-standardising — Epic acquired Meshcapade on 18 Feb 2026, licensing reverted
to Max Planck Innovation, and two permissive alternatives landed in Nov 2025
(Naver's Anny under Apache 2.0, Meta's MHR). SLAM turned out not to gate him
either: Helsing's posting requires "localisation, scene matching, **or** 3D
reconstruction" and an OR across five techniques, plus "domain adaptation **or**
model compression" — he has two of those.

**VPR *is* triplet-loss image retrieval.** His 7,000-store product-recognition
system is the same machine pointed at streets. Weeks rather than months, zero
licensing friction, and it extends expertise he already has instead of bolting
on a new field. Ship it as a monocular VO demo.
→ `market-demand-2026.md`

### 8. Evidence: promote the poster, cite the paper as someone else's

**Verified independently**: the *Scientific Reports* paper has four authors —
Ou, Ponce, Lee, Wu, all President Information Corporation — and an
Acknowledgements section thanking only an NSTC grant. He appears nowhere in it.

So the paper is **not evidence about him**; it is evidence the *system* is real
and performs as stated. It stays in the role bullet, cited as **"Ou et al.,
*Scientific Reports* (2025)"** — naming the actual authors makes non-authorship
self-evident without the trailing disclaimer an earlier draft used, which read
as apologising for being on the page. Never a "Publications" heading.

That verification promotes the **NVIDIA GTC 2025 poster to his only externally
verifiable artifact carrying his own name**, so its entry now says *selected by
technical review from an extended abstract* — it is committee-reviewed, not
attendance.

Added: **the disproved hypothesis.** The case where he tested his own
explanation for a rule misfire against real session data and it was wrong. It
is the one bullet a cynical reader cannot dismiss as padding.
→ `credibility-artifacts.md`

---

## What I decided against

- **A "Senior" headline.** Tenure does not support a self-assigned rank, and the
  claim is unnecessary — he applies to Senior requisitions regardless.
- **Stating remote preference on the CV.** It conflicts with "Relocating to
  Europe", and stating a working-arrangement preference before there is an
  offer narrows the field while he has no leverage. Remote-within-Europe is
  straightforward to negotiate after an offer, and is a different thing from
  remote-from-Taiwan, which he confirmed he is not pursuing.
- **A DACH-specific CV variant.** The maintenance cost exceeds the benefit; the
  one line that would differ is already the one line that generalises.
- **Claiming a degree-comparability statement.** True only once he has one.
  Add "MSc (ZAB comparability statement available)" when it is in hand.
- **Listing `pi_generator`.** See below — the GitHub problem is real, and a
  second, weaker project makes the strong one look like an exception.

---

## What he should actually do, ranked

1. **Order original-language NTUT transcripts while physically in Taipei.** The
   longest-tail dependency in the whole plan and near-impossible to fix
   remotely. Days, not weeks.
2. **anabin lookup on NTUT** (10 minutes), then **apply for the ZAB Statement of
   Comparability** — €208, employer-independent, ~2 weeks on the Blue Card
   fast-track versus 3 months standard. Unlocks Blue Card, Skilled Worker and
   Opportunity Card simultaneously.
3. **Apply to Catapult, Senior CV & Tracking Engineer, London.** Their Principal
   role has been open and unfilled since 11 May; on 12 August they opened a
   Senior version with a near-identical description at 4+ years, CV/ML under
   nice-to-have. He exceeds every "exceptional" criterion. Highest-probability
   senior offer identified in Europe.
4. **Publish one deep technical writeup of the frozen-pathway adapter.**
   ~20 hours, no employer permission needed at technique level, converts his
   strongest claim from assertion to something checkable. **Raise an invention
   disclosure first** — publishing can destroy patent novelty permanently.
5. **Fix the GitHub.** 20 repos, four forks, every one at zero stars, mostly
   dated exercises, one misspelled (`ViT_Eperiments`). It is linked from the CV
   and the site, and currently reads as a learner's portfolio. Archive the
   noise; the writeup above becomes the pinned repository.
6. **Ship the VPR / monocular VO demo** (decision 7).
7. **Start UK Global Talent in parallel** — the only route requiring no employer.
8. **Stay at IdeasLab through a third year if possible.** Two consecutive
   16-month tenures are a larger liability than the three-year AI history, and
   no CV wording fixes it.

---

## Compensation expectation

Central case **€85–105K base in Germany** or **£85–95K in London** at a senior
title in a scaleup; well-funded AI labs €110–150K; big tech in Europe pays
materially more even down-levelled (Apple Germany ICT3 €139K, Amazon L5 €128K,
NVIDIA IC3 €156K).

Two practical notes. The **EU Pay Transparency Directive** produced almost
nothing usable — 2 of 61 EU postings carried a real band — but Article 5's "or
otherwise" wording means **he is entitled to the range before first interview
and should ask**. And **Zurich should not anchor expectations**: nominally
highest, but Switzerland sits outside the Blue Card regime with hard quotas,
and the single best technical match found in Europe (Genius Sports Lausanne —
player tracking on iPhone cameras via Core ML and Metal, almost a description
of his shipped work) is closed to him on immigration, not merit.
→ `compensation-targeting.md`

---

## Open items he must resolve

- **Confirm the month-precision dates** on all three roles (currently from his
  own earlier draft, unverified).
- **Which GTC was the poster presented at?** GTC 2025 ran 17–21 March 2025,
  inside his Feb–May 2025 employment gap. If that is when he presented, a Talks
  line dated 03/2025 closes the gap honestly. Not asserted without confirmation.
- **CEFR levels** for the languages line, and whether the years in Taipei
  support a Mandarin claim.
- **Any patent filings** naming him as inventor.
- **Dutch reduced Blue Card criterion** (€4,754/mo) appears tied to graduating
  within 3 years; his 2023 MSc means that window closes during 2026. Needs
  direct IND confirmation.
- **Written NIA confirmation** that he is classified 外國專業人才 before
  relocating — that classification is what preserves the APRC on a five-year
  re-entry rule rather than the general 183-day average.
