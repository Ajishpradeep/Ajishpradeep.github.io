# ATS Mechanics — How Parsing Actually Works

Covers research area 5: file format, fonts, columns, headers/footers, tables,
graphics, section-heading conventions, keyword matching, and specific vendor
behavior (Greenhouse, Workday, Taleo, iCIMS).

## Key findings

### How ATS parsing actually works, mechanically

- iCIMS's own blog describes CV/resume parsing as extraction technology that
  "extracts data, usually from a Word or PDF document, and converts it in a
  structured way, often self-completing a form" — pulling contact details,
  experience, education, and skills into structured fields. iCIMS cites
  third-party parsing-engine research (Textkernal) that ~90% of CVs can be
  processed without human intervention — implying the ~10% failure tail is
  disproportionately made up of resumes with unusual formatting.
- Jobscan's own explanation of parser behavior: "most parsers are designed to
  read a document as a continuous, linear stream of text — moving strictly
  left to right and top to bottom." When a table is present, the parser
  "often slices through the table horizontally across the entire page,"
  producing "text-layer scrambling" — i.e., the visual layout and the
  underlying extracted text order diverge, so a two-column resume can
  interleave unrelated fields (e.g., a job title from the left column next to
  a date from the right column).
- A recurring, consistent claim across ATS-adjacent sources (Jobscan,
  Tech Interview Handbook, multiple vendor-agnostic guides): **ATS systems do
  not reliably read headers and footers.** Because many templates place name
  and contact info in a header for visual polish, this is a common, silent
  failure mode — the resume can be "parsed" successfully but arrive at the
  recruiter's desk with no way to contact the candidate. The consistent fix
  is to put name/contact info in the main document body, not the header.
- Correction/important nuance from Jobscan directly (2026 blog post, fetched
  primary source): the "ATS rejects PDFs" myth is largely outdated — most
  modern ATS can read properly-formatted PDFs — but empirically Jobscan's own
  testing has found **.docx files parse more consistently than PDFs across a
  wider range of ATS platforms**, particularly for older or less
  sophisticated parsers. Where a job posting doesn't specify, .docx is the
  statistically safer default; PDF is acceptable and often preferred where
  visual fidelity for a human reviewer downstream matters more than parser
  robustness (e.g., Greenhouse, which is generally considered one of the more
  modern/robust parsers).
- Jobscan states it has analyzed "over 2.5 million resume scans" to
  reverse-engineer parser behavior and has tested templates against Taleo,
  Greenhouse, iCIMS, and Workday specifically, finding that different
  platforms parse and order extracted fields differently — reinforcing that
  there is no single "ATS," only a family of systems with different
  tolerances, and that the safest resume is the one that would parse cleanly
  even if it were just plain text.

### Vendor-specific notes

- **iCIMS**: as of 2024, layered an AI assistant ("iCIMS Copilot," built on
  GPT-4 via Azure OpenAI) on top of the base structured-field parser, which
  adds candidate summarization and a "Role Fit" score computed **only from
  the already-parsed structured output** — meaning if the base parse is
  wrong or incomplete (e.g., dropped header contact info, garbled table
  content), the downstream AI scoring inherits that error. Accepts DOCX,
  PDF, RTF, TXT.
- **Greenhouse**: widely described (across multiple vendor-adjacent guides
  not individually credentialed enough to cite as primary, so treated as
  converging secondary opinion rather than sourced fact) as one of the more
  tolerant/modern parsers, generally handling clean single-column PDFs well.
  This is *not* independently verified against an official Greenhouse
  engineering/product source in this research pass — flagged as a gap.
- **Workday and Taleo**: repeatedly characterized across multiple
  ATS-adjacent sources as older/less forgiving parsers, more prone to table
  and multi-column scrambling. As with Greenhouse, this research pass did not
  find an official Workday or Taleo engineering/product document confirming
  parser internals — this is secondary/converging opinion, not a primary
  vendor source, and should be treated as directionally useful rather than
  authoritative.

### Fonts, section headings, keyword matching

- Convergent guidance across ATS-mechanics sources: use standard, widely
  embedded fonts (Arial, Calibri, Times New Roman, Garamond) at 10–12pt body
  text; avoid decorative or narrow-support fonts that may not embed correctly
  or that OCR/parsing layers misread.
- Use conventional section headings verbatim — "Experience," "Education,"
  "Skills" — rather than creative alternatives ("Where I've Been," "My
  Toolkit"), since parsers frequently pattern-match on exact or near-exact
  heading strings to segment the document into fields.
- Keyword matching: Jobscan's own framing (as a company whose product is
  literally a keyword-match scorer, so this claim carries a commercial
  interest and should be weighted accordingly) describes ATS keyword systems
  as indexing skills/qualifications and allowing recruiters to search/filter
  by them with Boolean logic, rather than the ATS itself "ranking" candidates
  automatically. This lines up with the more neutral finding elsewhere that
  ATS software mostly acts as a searchable database and filter for human
  recruiters, not an autonomous rejection engine — the "robot auto-rejects
  your resume" framing is somewhat overstated relative to how these systems
  are actually used operationally.
- Avoid graphics, icons, skill-rating bars/charts, and text boxes — these are
  either invisible to parsers or, worse, can inject garbled text/artifacts
  into the extracted output.

## Distilled rules/heuristics

1. Single-column layout, top to bottom, left to right — no side-by-side
   columns, no tables for content that needs to parse correctly.
2. Name, email, phone, location in the **document body**, never in a
   header/footer.
3. Standard section headings verbatim: Experience, Education, Skills.
4. Standard font, 10–12pt body, nothing below 9pt.
5. No icons, skill bars, photos, text boxes, or embedded graphics carrying
   load-bearing information.
6. When the application system allows a choice and doesn't specify: default
   to .docx for maximum parser compatibility across older/unknown ATS; PDF is
   fine and often preferred when the target company's stack is known to be
   modern (e.g., Greenhouse) or when the resume is also meant to be
   downloaded and read by a human as a polished document (which is the more
   common real-world case for a personal portfolio site).
7. Consistent, plain bullet glyph (•) rather than custom symbols/emoji.
8. Mirror the exact phrasing of skills/tools from a target job description
   where honestly applicable, since keyword-search/filter behavior rewards
   exact-string matches over paraphrases.

## How this applies to Pradeep specifically

- The portfolio site is React/TypeScript and the resume feature will almost
  certainly need to generate a **downloadable PDF** for human consumption as
  well as, ideally, a plain-structured HTML/text version. Given the ATS
  research above, the practical recommendation is: **make the PDF itself
  ATS-safe** (single column, no header/footer content, standard fonts,
  standard section names, no icon-only skill indicators) rather than
  assuming a "pretty" web-styled export will parse correctly if it's ever
  uploaded to an ATS. If a .docx export is feasible to offer as a secondary
  download, that further hedges against older parsers (Workday/Taleo-style),
  but PDF alone is a reasonable single deliverable given this is primarily a
  portfolio site, not a mass-application tool.
- Pradeep's skill taxonomy in `PROFILE.md` §7 (mathematical foundations,
  computer vision, LLMs/agentic systems, deployment, research leadership) is
  already close to plain-language, parseable, non-jargon-decorated text — no
  restructuring needed for ATS purposes, just avoid rendering it as an
  icon-based skill-bar chart in the PDF/print version even if a fancier
  visual version exists on the live web page.
- The visually rich case-study pages on the live site (`/work/<slug>`) are
  appropriately kept **separate** from the ATS-safe resume artifact — the
  research strongly supports not conflating "the portfolio page" (which can
  and should be visually distinctive) with "the resume file" (which should
  stay parser-boring by design). This split is already implicit in the
  existing site architecture (case studies live at their own routes; the
  resume is presumably a discrete export) and this research validates
  keeping that separation strict.
- Because several of Pradeep's headline numbers (8cm→3cm, 99.23% precision,
  +30% fidelity) are exactly the kind of high-signal quantified content that
  keyword/skill search rewards, they should appear as **plain inline text in
  bullets**, not as separate infographic-style stat callouts that might only
  exist as an image in the PDF.

## Sources used

- iCIMS official blog, "What is CV/Resume parsing?,"
  `icims.com/blog/what-is-cv-resume-parsing/` — official ATS vendor blog
  post; directly fetched. Contains a real, cited stat (90% touchless
  processing, credited to Textkernal) rather than an unsourced claim.
- Jobscan blog, "Why ATS Tables and Columns Break Your Resume Parsing,"
  `jobscan.co/blog/resume-tables-columns-ats/` — directly fetched. Jobscan is
  a commercial resume-scoring product, so its claims carry a commercial
  interest (it sells the tool that "fixes" the problems it describes); used
  here because it is one of the few sources that describes parser mechanics
  in specific, falsifiable terms (linear left-to-right extraction, table
  slicing) rather than vague "ATS is picky" language, and because Jobscan is
  widely cited as a de facto authority on this exact topic across the
  industry. Its specific claim of "2.5 million resumes analyzed" is
  self-reported and not independently audited in this research pass.
- General/converging secondary sources on Greenhouse, Workday, Taleo, and
  iCIMS parser tolerance — multiple non-individually-credentialed
  ATS-optimization blogs converged on similar characterizations (Greenhouse
  more tolerant, Workday/Taleo less so), but none rose to the "official
  vendor documentation" bar for Workday or Taleo specifically. **This is
  flagged as a genuine gap**: I was not able to find official
  Workday/Taleo/Greenhouse engineering or product documentation describing
  their own parser internals to job seekers, and did not want to cite
  unnamed SEO content as if it were vendor-verified fact for those three
  systems specifically.

**Gap noted**: No official Greenhouse, Workday, or Taleo vendor blog/doc was
found describing their own parsing logic to candidates (only iCIMS published
something in that category). Vendor-specific claims for those three systems
in this file should be treated as converging industry opinion, not confirmed
vendor fact.
