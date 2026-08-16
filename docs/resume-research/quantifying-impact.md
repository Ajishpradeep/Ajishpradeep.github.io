# Quantifying Impact — Honest, Non-Inflated Accomplishment Bullets

Covers research area 7: the XYZ/STAR-derived bullet-writing patterns, and how
to construct strong, honest, non-inflated accomplishment-driven bullets.

## Key findings

### The XYZ formula (Laszlo Bock / Google)

- Formula: **"Accomplished [X], as measured by [Y], by doing [Z]."** X is the
  outcome/accomplishment (not the task assigned), Y is the number/comparison
  that proves it mattered, Z is the specific method or decision that produced
  it.
- Bock's own worked example, reconstructed from a secondary source quoting
  his original piece: "Wrote editorials for the New York Times" (weak — task,
  no evidence, no method) becomes "Had 50 op-eds published compared to an
  average of 6 by most op-ed writers, as a result of providing deep insight
  into [topic] for three years" (strong — outcome + comparison + method).
- The formula's real function is forcing three separate failure modes out of
  a bullet at once: (1) describing a responsibility instead of a result, (2)
  giving a result with no evidence it was significant, and (3) giving a
  result with no visibility into how it was achieved (which is what a
  technical interviewer will actually probe).

### The Stanford variant: Problem → Action → Result

- Stanford Career Education's resume handout teaches essentially the same
  three-part structure under different labels: state the problem/context
  briefly, then the action taken, then the result with a metric. Every bullet
  should open with a past-tense action verb, stay to roughly two lines, and a
  role should carry 3–5 bullets, strongest first. This is functionally the
  same discipline as XYZ, applied at the level of "what to write" rather than
  "how to phrase it" — problem-context is closer to what STAR calls Situation/
  Task, folded into a single clause rather than spelled out.

### Where quantification goes wrong (the "empty metrics" trap)

- Chip Huyen's most specific and useful contribution to this topic: she
  explicitly does **not** want a bare metric as the whole story. Her stated
  preference is to hear about "the hardest challenges faced and the learnings
  through the process" — meaning a number without the technical reasoning
  behind it reads, to an experienced ML hiring manager, as potentially
  hollow or possibly not fully understood/owned by the candidate. This is a
  meaningful corrective to a naive reading of "quantify everything," which
  can produce bullets that are numerically impressive but technically
  content-free (e.g., "+30% improvement" with no hint of what was actually
  built or decided).
- The practical synthesis of Bock's XYZ and Huyen's "hardest problem" point:
  a strong technical bullet states the outcome, the number that proves it,
  *and* the specific technique/decision that produced it — the "Z" in XYZ and
  Huyen's "learnings" are pointing at the same gap. A bullet that only has X
  and Y (outcome + number) without a credible Z (technique) is the weak,
  inflated-sounding pattern to avoid.
- Ted Bauer's critique (secondary source, `thecontextofthings.com`) adds a
  caveat worth carrying forward: quantified bullets only work if the reader
  gets far enough into the resume to read them — meaning quantification
  discipline at the bullet level does not substitute for getting the overall
  structure/ordering right (see `content-and-structure.md` and
  `faang-expectations.md`).

### Honest quantification vs. inflation — how to tell the difference

No single named source in this research pass addressed "how to avoid
inflating numbers" as its own topic directly (this is a genuine gap — see
below), but the following principle is a reasonable synthesis of the sources
found:

- A number is honest when it (a) is independently verifiable or at least
  plausible given a described method, (b) is attached to a specific technique
  that could be explained under interview pressure (Huyen's "explain every
  choice" test), and (c) is stated as-is rather than converted into a derived
  statistic that wasn't actually measured (e.g., turning a raw before/after
  figure into an invented percentage-improvement number is a form of
  quantification that looks stronger but is actually less honest, because
  it's asserting precision that wasn't measured).
- This synthesis lines up with, and is reinforced by, `docs/PROFILE.md`'s own
  internal rule (§10): treat a derived percentage that the primary source
  never actually states as "an unsourced derived claim, not a primary fact."
  That's the correct instinct per this research — Bock's formula rewards a
  real, defensible Y, not the most dramatic-sounding Y that can be
  constructed from the same underlying data.

## Distilled rules/heuristics

1. Every accomplishment bullet should contain three things: outcome, number/
   evidence, and method — omit any one of the three and the bullet is
   measurably weaker (task-only, unproven, or unexplained, respectively).
2. Never state a number that wasn't actually measured or reported at the
   source — if only a raw delta exists (e.g., "8cm → 3cm"), state the delta;
   do not compute and present a derived percentage as if it were an
   independently verified figure.
3. Pair every quantified result with the specific technique that produced it
   — a number alone, especially in ML/research contexts, reads as potentially
   hollow to an experienced technical reader.
4. Open every bullet with a past-tense action verb; never open with a date or
   a passive construction ("Was responsible for...").
5. Keep bullets to roughly two lines and 3–5 per role, ordered
   strongest/hardest first — quantification discipline doesn't help a bullet
   that's buried fourth or fifth in a list a time-pressured reader never
   reaches.
6. Prefer externally-corroborated numbers (numbers backed by a third-party
   publication, press mention, or public benchmark) over purely
   self-reported ones wherever both exist for the same accomplishment — they
   survive scrutiny better and require no leap of faith from the reader.

## How this applies to Pradeep specifically

- `docs/PROFILE.md` already contains bullet-ready material that maps almost
  directly onto the XYZ pattern without needing invention:
  - X: reduced mean per-joint 3D pose error; Y: 8cm → 3cm, pelvis-relative;
    Z: temporal consistency modelling, motion-aligned lifting, spatial
    refinement — deployed via CoreML on-device with no cloud round-trip.
  - X: retail product recognition deployed at national scale; Y: 99.23%/
    98.93% precision/recall on shelf detection (externally corroborated by a
    peer-reviewed Scientific Reports paper, not self-reported), 7,000+
    stores; Z: dense detection combined with fine-tuned embeddings for
    training-free catalogue scaling.
  - X: won an international innovation award; Y: 1 of 3 global winners out
    of 638 proposals across 55 countries; Z: authored the technical proposal
    end-to-end, arguing how a golf-tuned lifting stack generalizes to a new
    high-speed motion class (baseball) under injury-prevention physics
    constraints.
  These already satisfy both Bock's XYZ test and Huyen's "hardest problem,
  not empty metric" test, because the "Z" in each case is a real, defensible
  technical decision, not filler.
- Per PROFILE.md §10/§11, two specific numbers should be **excluded** on
  exactly the grounds this research file establishes:
  - "240fps" — contradicted by the current site's own explanation that
    capture-rate is not the same as inference budget; including it would be
    exactly the "impressive-sounding but not actually defensible under
    questioning" failure mode Huyen's research warns about.
  - The derived "60% accuracy improvement" framing — this is a computed
    statistic the primary source (the site itself) never states; per rule 2
    above, the honest move is to state the raw 8cm → 3cm delta only, not a
    percentage built on top of it.
- The Scientific Reports precision/recall figures and the GTC 2025 poster are
  Pradeep's strongest quantified claims specifically *because* they're
  externally corroborated rather than self-reported — per the last
  heuristic, these should be given more prominence (not necessarily more
  bolding, but earlier placement / clearer sourcing) than self-reported
  internal metrics like the reconstruction-infrastructure numbers (4.8×
  lower reconstruction noise, 10–46× bone-length consistency gain), which are
  real and well-documented on the site but currently lack a third-party
  citation the way the GTC/Scientific-Reports items do.

## Sources used

- Laszlo Bock's XYZ formula — see full citation and credibility notes in
  `faang-expectations.md` (same source, reused here for the bullet-mechanics
  angle specifically).
- Stanford Career Education resume handout — see full citation in
  `content-and-structure.md`; reused here for the Problem→Action→Result
  variant of the same underlying discipline.
- Chip Huyen — see full citation in `content-and-structure.md` and
  `faang-expectations.md`; reused here specifically for the "empty metrics"
  critique, which is her most original and specific contribution to this
  topic.
- Ted Bauer, `thecontextofthings.com` — used narrowly for the caveat that
  bullet-level quantification discipline doesn't substitute for
  top-of-resume framing; a personal career-focused blog, not an
  institutional source, so weighted as a useful critique rather than a
  primary finding.
- `docs/PROFILE.md` (this repository) — used as the factual substrate to
  test the XYZ/honesty framework against; not an external source, but the
  canonical fact-of-record for this project per its own stated rule ("every
  fact here must already exist somewhere on the live site").

**Gap noted**: I did not find a named, credentialed source writing
specifically about *how to detect your own inflation* (as opposed to how to
write a strong true bullet) — e.g. a resume-ethics or fact-checking-focused
piece. The "honest quantification vs. inflation" section above is my
synthesis of Bock + Huyen + the project's own PROFILE.md rules rather than a
single sourced finding, and is flagged as such rather than attributed to an
authority that didn't actually say it.
