# FAANG / Big-Tech Specific Expectations

Covers research area 6: what Google/Meta/Amazon-style recruiters and hiring
committees actually look for in a resume for research/ML engineering roles.

## Key findings

### The hiring-committee mechanism (Google, as the best-documented example)

- At Google, the resume is not evaluated in isolation — it becomes part of a
  candidate "packet" (resume + interview feedback/scores) reviewed by a
  hiring committee: a panel of senior Googlers, typically uninvolved with the
  original interviews, who read and score the packet independently before a
  committee meeting where scores are discussed and a hire/no-hire
  recommendation is made. This detail matters because it means the resume
  has to hold up on its own, in writing, to readers with zero personal
  context on the candidate and often only a few minutes per packet in a
  batch of ~10 candidates per meeting.
- Google's stated evaluation is against four attributes: General Cognitive
  Ability, Role-Related Knowledge, Leadership, and "Googleyness" — a
  candidate's resume is one input reviewers use to pattern-match against
  Role-Related Knowledge and Leadership specifically (the other two are
  interview-derived). This implies a resume for a Google-style process should
  make role-relevant technical depth and any leadership/ownership signal
  (owning a system end-to-end, mentoring, cross-functional influence) easy to
  find, since those are the two axes a resume can actually move.
- Gayle Laakmann McDowell (author of *Cracking the Coding Interview*,
  *Cracking the Tech Career*, *The Google Resume*; former Google/Microsoft/
  Apple software engineer who personally interviewed 120+ candidates as a
  member of a hiring committee) is one of the few named, credentialed authors
  writing specifically from the hiring-committee seat rather than as a
  generic career coach. Her books are consistently framed around "what
  actually gets a resume kept vs. discarded" from that vantage point, and are
  widely regarded as a credible primary voice in this space — though this
  research pass was not able to pull specific quoted excerpts from her books
  (only bibliographic/summary confirmation that these are her credentials and
  focus), so treat this as a source to consult further rather than a fully
  quoted finding here.

### Laszlo Bock's XYZ formula — the most influential FAANG-adjacent framework

- Laszlo Bock, former Google SVP of People Operations (i.e., ran HR for all
  of Google, including hiring), is the most widely cited named source for a
  concrete resume-writing formula in the tech industry. His formula:
  **"Accomplished [X], as measured by [Y], by doing [Z]."**
- His own worked example (quoted in a secondary piece discussing his
  original writing, "Laszlo Bock and Google's resume advice," which itself
  reproduces his language): rather than "Wrote editorials for the New York
  Times," write something like "Had 50 op-eds published compared to average
  of 6 by most op-ed writers, as a result of providing deep insight into
  [topic] for three years." The formula forces three separate pieces of
  information into one bullet: what was achieved, the evidence it was
  significant (a comparison point or number), and how it was done.
- Bock has also publicly stated that GPA and test scores are largely
  worthless as hiring signals at Google beyond the first couple of years out
  of school ("G.P.A.'s are worthless as a criteria for hiring, and test
  scores are worthless... we found that they don't predict anything") —
  reinforcing the content-and-structure finding that GPA should not be a
  headline element for a ~4-year-experienced candidate.
- Caveat found in the same research: a secondary critique (Ted Bauer,
  "thecontextofthings.com") of Bock's formula is worth noting honestly — the
  XYZ formula assumes a reader will get past the first six seconds of
  scanning to actually read the accomplishment detail. His point is that
  formula quality doesn't substitute for a resume that also establishes
  identity/positioning fast, near the top, before the reader ever reaches the
  XYZ-formatted bullets. This is a useful check against over-indexing on
  bullet-level craft while neglecting the top-of-resume framing.

### What ML/AI research-engineering hiring specifically rewards

- Chip Huyen (interviewer at NVIDIA and Snorkel AI, author of *Designing
  Machine Learning Systems*, reviews 150–200 applications/month at her own
  hiring volume and reads every one personally) gives some of the only
  first-person, named, ML-specific hiring guidance found in this research:
  - She explicitly wants to see **the hardest challenge faced and what was
    learned from it**, not "empty metrics" — i.e., a metric alone (e.g., "+X%
    accuracy") without the reasoning/tradeoffs behind it reads as weaker,
    not stronger, to an ML hiring manager than a metric anchored in a real
    engineering decision.
  - In interviews, she and her team will "pick one project from your resume
    and make you explain every choice" — meaning every claim on an ML
    resume, especially named tools/frameworks, should be something the
    candidate can defend at implementation depth, not a keyword the
    candidate merely touched. This is a direct argument against padding a
    skills section with technologies used only superficially.
  - Depth of explanation is explicitly used by her to distinguish "talkers"
    from "doers" — i.e., resume claims get load-tested in the interview loop,
    so a resume that only lists outcomes without any underlying technical
    specificity sets up a mismatch that surfaces (badly) later in the
    process rather than avoiding scrutiny.
  - For recent-grad/early-career ML candidates specifically, she rates
    GitHub/public code artifacts as one of the strongest possible
    substitutes for a thin professional work history — "publish your code on
    GitHub and invest your time to build some decent GitHub repos."

### Format/design preferences at big tech specifically

- Recurring, consistent theme across FAANG-adjacent sources: big-tech
  recruiters are **not** impressed by resume design/creativity and may
  actively be put off by it — the stated preference is a "simple and
  consistent design, font, spacing and sizing throughout." The instruction to
  differentiate through content rather than visual design is repeated by
  multiple FAANG-recruiter-attributed sources independently (Google
  recruiter guidance, ACS/Information Age interview).
- This is a meaningfully different posture than a personal portfolio
  website's home page, which *should* be visually distinctive — the FAANG
  research specifically argues the resume artifact itself should be the
  plain, content-forward one, even when the surrounding site/brand is bold.

## Distilled rules/heuristics

1. Treat the resume as a document that has to work with zero personal
   context and only a few minutes of attention from a reader who wasn't in
   the interview room — front-load role-relevant technical depth and
   ownership/leadership signal, since those are the two levers a resume can
   actually move in a committee-style process.
2. Apply Bock's XYZ pattern to every accomplishment bullet: what was
   achieved, the number/comparison that proves it mattered, how it was done
   — but don't rely on the formula alone to carry the top of the resume;
   establish clear role/positioning framing before the reader gets deep into
   bullet detail.
3. Every named tool/technology/claim on the resume must be something the
   candidate can defend at implementation depth in an interview — do not list
   technologies touched only superficially, because ML-specific interview
   loops are documented to probe exactly this.
4. Prefer "hardest problem solved + what was learned/tradeoffs made" framing
   over a bare metric with no reasoning behind it, specifically for ML/
   research roles.
5. GPA is not a meaningful signal past the first ~2 years out of school —
   keep it small if included at all, and never lead with it.
6. Resume design should be plain and consistent — save visual boldness for
   the portfolio site itself, not the resume artifact.
7. GitHub/public research artifacts substitute meaningfully for thin
   professional history, and remain a credibility signal even with strong
   professional history, since they let a reader verify claims independently.

## How this applies to Pradeep specifically

- The hiring-committee framing (resume must work cold, without a personal
  advocate in the room) argues strongly for exactly the kind of
  externally-corroborated claims already logged in `PROFILE.md` §5 — the
  NVIDIA GTC 2025 technical poster and the Scientific Reports paper
  (99.23%/98.93% precision/recall, 7,000+ stores) are precisely the sort of
  evidence a cold committee reader can independently trust, because they
  don't depend on taking Pradeep's word for it. These should be surfaced
  prominently, not treated as footnotes.
- Chip Huyen's "hardest challenge, not empty metrics" framing is a strong
  argument for keeping the *reasoning* behind the pose-lifting accuracy work
  visible even in compressed resume form — e.g., framing the 8cm→3cm result
  as solved via "temporal consistency modelling, motion-aligned lifting and
  spatial refinement" (already the exact language in `PROFILE.md` case study
  01) rather than just stating the number in isolation. The number alone is
  a fact; the number plus the named technique is what an ML hiring manager
  is actually trained to look for.
- Her "every claim gets picked apart in-loop" point is a direct argument for
  restraint on any of the flagged unverifiable claims in `PROFILE.md` §10/§11
  (240fps, 60% derived accuracy figure, any authorship claim on the
  Scientific Reports paper) — these are exactly the kind of claims that fail
  under the "explain every choice" interview pressure this research
  describes, so excluding them isn't just an honesty preference, it's also
  the FAANG-hiring-optimal choice.
- Bock's XYZ formula maps directly onto material already in `PROFILE.md`:
  e.g. "Reduced mean per-joint 3D error 8cm→3cm (Y), pelvis-relative, by
  building temporal consistency modelling and motion-aligned lifting into
  the 2D-to-3D pose stack (Z)" is already close to XYZ-formatted; the
  resume-writing task is mostly compression and consistency of this pattern
  across all four case studies, not invention of new framing.
  Note: the "Bock example" cited above is reconstructed from a secondary
  source quoting his original language, not from a primary Bock document
  directly fetched in this research pass — flagged accordingly below.
- Pradeep's role titles ("R&D lead," "lead engineer," "technical lead on the
  proposal," "architect") are already calibrated and explicitly *not*
  inflated to "staff/principal/director" per `PROFILE.md` §11 — this aligns
  with the hiring-committee finding that claims get checked, and with the
  general FAANG-adjacent norm against title inflation on a resume.
- On design: given the plain-resume-design finding, the resume artifact
  built into the React site should almost certainly render/export as a
  clean, single-column, typographically restrained document even though the
  surrounding portfolio site is bold and visually distinctive — the two
  should not share a design language 1:1.

## Sources used

- Candor.co, "Google's Hiring Committee — all the juicy details,"
  `candor.co/articles/interview-prep/google-s-hiring-committee-all-the-deets`
  — used only for the general mechanism description (packet review, scoring,
  ~10 candidates/meeting); Candor is a career-coaching company, not an
  official Google source, so this is treated as informed secondary
  description, not primary/official confirmation. Flagged as commercial/
  secondary.
- General, repeatedly-converging description of Google's four hiring
  attributes (General Cognitive Ability, Role-Related Knowledge, Leadership,
  Googleyness) — this is publicly well-documented Google hiring-process
  information reported across many credible tech-hiring writeups; not
  sourced to one single primary Google document in this research pass.
- Gayle Laakmann McDowell — author bio/credentials (ex-Google/Microsoft/
  Apple engineer, 120+ hiring-committee interviews, author of *Cracking the
  Coding Interview*, *Cracking the Tech Career*, *The Google Resume*) via
  Wikipedia and Goodreads bibliographic confirmation
  (`en.wikipedia.org/wiki/Gayle_Laakmann_McDowell`). Credible as a named,
  credentialed former hiring-committee member and established author; her
  specific book content was not directly quotable in this research pass —
  flagged as a source to consult directly (the books themselves) rather than
  a fully verified finding here.
- Laszlo Bock — former Google SVP of People Operations; XYZ formula and GPA
  quote reported via `thecontextofthings.com` (Ted Bauer's blog, which
  directly quotes and critiques Bock's original writing) and cross-confirmed
  via multiple independent secondary summaries (LinkedIn posts referencing
  his "My Personal Formula for a Winning Résumé" piece, Harbert College of
  Business summary). Bock is a named, highly credible primary source (ran
  hiring/HR for Google); however, this research pass worked from
  secondary sources quoting him rather than fetching his original essay
  directly — flagged accordingly.
- Chip Huyen, ML Interviews Book §2.3.1.1 and personal blog career-advice
  post — see full citation in `content-and-structure.md`; reused here for
  its FAANG/ML-hiring-specific content (hardest-challenge framing, in-loop
  claim verification, GitHub-as-credibility-signal).
- ACS/Information Age interview with Erica Rivera, Google Senior Recruiter —
  see full citation in `content-and-structure.md`; reused here for the
  "recruiters aren't impressed by design" finding.

**Gap noted**: I was not able to find an official, on-the-record
Meta or Amazon-specific equivalent to Google's Bock/hiring-committee material
in this research pass — the findings above are strongest for Google and for
ML/infra hiring generally (via Huyen), and should not be over-generalized as
confirmed Meta/Amazon-specific practice without further sourcing.
