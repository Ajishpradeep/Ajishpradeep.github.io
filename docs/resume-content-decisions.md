# Resume content decisions — what's in, what's out, and why

> **Updated 2026-08-16 after eight market-research passes.** The mechanics
> below (ATS, length, bullet construction, attribution) still hold. What
> changed is *framing*, and those decisions now live in
> `framing-decisions.md` — headline, seniority, vertical weighting, work
> authorisation, and which evidence leads. Five specific reversals are marked
> inline. Read `framing-decisions.md` first; this file covers the rest.

Inputs: `docs/positioning.md` (who this profile is), `docs/PROFILE.md` (the
record), and `docs/resume-research/` (four files). The structured output is
`src/data/resume.ts`; the two renderers hold no content of their own.

Where a decision came from tailored research it cites the file. Where it was a
judgement call with no source behind it, it says so — those are the ones worth
arguing with.

---

## Positioning: vision specialist, not generalist

> **REVISED.** The specialist call held and was reinforced. The headline
> changed to `AI Research Engineer — 3D Computer Vision, On-Device Perception`
> — it now carries a title, drops the LLM term, and swaps "Inference" for
> "Perception" to buy a keyword family. Skills reordered so on-device sits
> second, directly under 3D vision. See `framing-decisions.md` §2.

**Decision (original).** Headline reads *3D Computer Vision · On-Device Inference ·
Applied LLM Systems*, in that order, and the skills block leads with 3D vision.

**Why.** Stanford AI Index 2026 (Ch. 4, Lightcast data over billions of US
postings) gives per-skill posting shares: generative AI 0.41%, AI agents 0.23%,
NLP 0.22%, visual/image recognition 0.09%. The LLM market really is ~4.5×
bigger — and that is the argument *against* leading with it. In the LLM market
his stack is the modal profile; in the smaller vision market he is top-decile.
Same chapter: GenAI's *share* of AI postings fell 5% even as raw mentions grew
111%, i.e. it is becoming table stakes rather than a differentiator. Meanwhile
the fastest-growing skills are deployment and scale ones, which is a direct
argument for foregrounding the on-device work. (`domain-demand.md`)

## Ordering within roles

**Decision.** Each role leads with its hardest, most externally-verifiable
result, not its most recent or most senior-sounding activity. IdeasLab leads
with 8 cm → 3 cm *with the method attached*; President Information leads with
the 7,000-store deployment and its peer-reviewed numbers.

**Why.** Chip Huyen (named ML hiring manager) is explicit that a bare metric
reads as hollow and that what distinguishes a doer is the reasoning behind the
number — so the "Z" of Bock's XYZ formula is not optional decoration.
(`quantifying-impact.md`, `faang-expectations.md`)

## Length: two pages

**Decision.** Two pages, both substantially full.

**Why.** This overrides the earlier one-page decision, which came from
TalentWorks' US 475–600-word finding. ETH Zurich's official application guide
caps MSc-holders at two pages and explicitly identifies the one-page rule as a
*US* convention. Europe is the primary market. (`european-market.md`)

## Type size

**Decision.** 9.8pt body, nothing below 9pt anywhere.

**Why.** ETH's guidance sets an 11pt floor. That is written for sparser student
CVs and is impractical for a dense two-page industry CV, but the previous 9.2pt
was below any defensible floor purely to fit more in. Length is bought by
cutting content, not by shrinking type. Judgement call, splitting the
difference against a sourced floor.

## Attribution: claim the verb, not the noun

> **STRENGTHENED by verification.** The paper's authorship is no longer an
> assumption. Checked against OpenAlex and the article: four authors — Ou,
> Ponce, Lee, Wu, all President Information Corporation — and an
> Acknowledgements thanking only an NSTC grant. He is absent entirely. The
> citation now reads "Ou et al., *Scientific Reports* (2025)", because naming
> the real authors makes non-authorship self-evident and removes the need for
> a disclaimer. It also promotes the GTC poster to his only externally
> verifiable named artifact. See `framing-decisions.md` §8.

**Decision.** The *Scientific Reports* paper does **not** appear under
"Recognition & Research". It is cited inside the President Information Corp
bullet, as documentation of the system he built. The TAITRA entry reads "sole
author of the winning technical proposal; award to IdeasLab Formosa".

**Why.** A paper title under a research heading reads as a publication claim
regardless of the wording beneath it — the heading does the claiming. An
earlier draft handled this with a trailing "I am not a listed author", which
was honest and also read as an apology; the site's own impact dossier already
records that four such disclaimers in a row "read as apologising for being on
the page". Citing the paper as evidence *for the system* is both truer and
stronger. (`european-market.md` § attribution)

## Work authorisation

> **RESOLVED.** No longer empty. It ships as `EU Blue Card eligible` —
> nationality omitted, APRC omitted (it reads as *settled elsewhere* to a
> European screener, and reverses only for Taiwan/APAC applications). He does
> qualify: § 18g AufenthG puts ISCO 21 and 25 on the German shortage list, so
> the reduced 2026 threshold of €45,934.20 applies and never binds
> commercially. Full reasoning in `framing-decisions.md` §5.

**Decision (original).** A `workAuthorization` field exists, renders when set, and ships
**empty**, with the recommended wording in a comment.

**Why.** For a non-EU national this is the first question a European recruiter
forms, and the research is specific that it should be stated as a fact with a
named mechanism ("eligible for EU Blue Card") and never as a request ("seeking
sponsorship") — recruiters reject uncertainty, not cost. It is empty because
the site never states his nationality, and inferring a protected characteristic
from where somebody went to university is exactly the confident guess this
project forbids. **Pradeep must fill this in.** (`european-market.md`)

## Personal data: what Europe expects and what it doesn't

- **No photo.** Neutral-to-negative at international tech employers; ETH's ATS
  section bans images; the German Federal Anti-Discrimination Agency is on
  record against the practice.
- **No date of birth, marital status, or dependants.** (Worth noting the
  research found Denmark's official state portal *does* treat these as normal —
  the "Nordics are progressive about this" assumption is wrong — but the target
  is international tech employers, not traditional local firms.)
- **Languages section added.** Europe expects it; the site states three
  languages but no proficiencies, so only English is qualified, and that only
  because it is evidenced (English-taught MSc, solo international proposal,
  sent to present in Warsaw). Pradeep should add CEFR levels.
- **Month-precision dates added.** Europe expects them and a year-only range
  reads as evasive. Flagged unverified in the data file — they come from his
  own earlier draft, which is his claim rather than my inference, but is a
  weaker source than the site.
- **No Europass.** Only expected for EU institutions; its grid would flatten
  the quantified claims that are his advantage.

## Terminology

**Decision.** "3D human pose estimation", "body tracking", "3D perception",
"multi-view geometry", "camera calibration", "Core ML" (Apple's own two-word
spelling), "edge deployment", "quantization". **Cut:** "motion capture" as a
standalone term, "biomechanical analysis" as a primary frame, "prompt
engineering".

**Why.** Taken from the language of real postings at Apple, Meta Reality Labs,
NVIDIA, Qualcomm, NEURA, Niantic and Meshcapade. "Motion capture" alone reads
as VFX/hardware; "biomechanics" as a lead reads as sports science and narrows a
domain-agnostic substrate; "prompt engineering" is declining and signals
shallowness. (`domain-demand.md`)

## What was cut, and why

- **"240fps" and the derived "60% improvement"** — contradicted by the site's
  own explanation that capture rate is not the inference budget, and a derived
  statistic the primary source never states. Both would fail the "explain every
  choice" probe. (`PROFILE.md` §10, `quantifying-impact.md` rule 2)
- **The KAN research entry** — the site itself labels it exploratory with no
  results on a language model yet.
- **Five of six Lab projects** — only CarbonPass survives. `pi_generator` was
  kept in the first pass as evidence of distribution-metric rigour, then cut:
  a review of the public GitHub found 20 repositories, four forks, **every one
  at zero stars**, mostly dated exercises (one misspelled, `ViT_Eperiments`),
  so the account a hiring manager opens after reading the CV reads as a
  learner's portfolio. Against that, a comparison exercise beside a substantial
  2026 build makes the strong one look like the exception. The real fix is not
  a CV edit — see `framing-decisions.md` § what he should do.
- **The five site "principles"** — first-person reflective voice, right for the
  site's Method section, wrong for a CV bullet.
- **Case-study narrative depth** — the literature composition (Progressive
  Neural Networks / Side-Tuning / ControlNet), the U-shaped error diagnosis,
  the four-state visibility scheme. The bit-identity *result* is on the resume
  because it is the differentiator; the full reasoning belongs on the linked
  case-study page, which is what it is for.
- **The `ajish.online` domain** — the site's own canonical link list carries
  only email, GitHub and LinkedIn.
- **The Chinese employer name in the PDF only** — retained on the web view.
  Not a content decision so much as a font-subset one; see `resumePdf.tsx`.

## Format decisions

Single column, literal section headings, plain bullets, no tables, no icons
carrying meaning, contact details in the body. Section-heading letter-spacing
is capped at 0.5 because anything wider makes extractors emit
`E X P E R I E N C E`, which defeats ATS section segmentation — verified by
extracting text, not by eye. (`ats-mechanics.md`)

## Open questions for Pradeep

Ranked by how much they would change the document:

1. ~~**Are you named in the *Scientific Reports* acknowledgements?**~~
   **ANSWERED — no.** Verified against OpenAlex and the article. Four authors,
   none of them him; the Acknowledgements thank only an NSTC grant.
2. **Any patent filings naming you as inventor?** Still open, and still worth
   more than a first-author paper attempt.
3. **Confirm the month-precision dates.** Still open. The
   work-authorisation line is now decided (`EU Blue Card eligible`).
4. ~~**Do you know SMPL?**~~ **Moot.** SMPL appears in 2 of 4,506 live
   postings, zero in Europe, and is de-standardising since Epic acquired
   Meshcapade in Feb 2026. Not worth learning for this market.
5. **CEFR levels**, and whether the Taipei years support a Mandarin claim.
   Still open.
6. **Which GTC was the poster presented at?** New. GTC 2025 ran 17–21 March
   2025, inside the Feb–May 2025 employment gap — if that is when he
   presented, a Talks line dated 03/2025 closes the gap honestly.
