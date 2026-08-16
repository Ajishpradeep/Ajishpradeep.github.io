# Title Positioning — What "AI Research Engineer" Means to the Market, and the Exact CV Headline

**Scope.** This document answers one question: what the title *AI Research Engineer*
signals to the market, how it compares to adjacent titles, and what exact string the
CV headline should carry.

**Builds on, does not repeat:**
- `credibility-artifacts.md` — settled that the Research Engineer track does not gate
  on publications. Not re-verified here; extended with same-employer A/B evidence.
- `domain-demand.md` — settled the vocabulary: 3D vision specialist, not LLM
  generalist; use "3D human pose estimation", "multi-view geometry", "3D perception";
  place LLM work third.
- `european-market.md` — CV conventions, attribution standards.
- `ats-mechanics.md` — parsing behaviour; ATS keyword search is Boolean search over
  the parsed document text, run by a human recruiter.

---

## 0. The conclusion, stated up front

**The current headline is wrong, but not for the reason you would expect.** It is not
too modest and it is not inaccurate. Its defect is that it contains **no title at
all**, and he has told us his goal is that a title be his professional identity. A
three-item capability list cannot establish an identity, and it gives a
title-oriented reader nothing to latch onto in the seven seconds they spend on the
page.

**Replace it with:**

```
AI Research Engineer — 3D Computer Vision, On-Device Perception
```

Reasoning in full at §5. In one sentence: this is his real employer-given title
(so it carries zero self-assignment risk), immediately disambiguated by the domain
anchor that stops "AI" being read as "LLM app builder," and it packs six independently
searchable strings — *AI Research Engineer*, *Research Engineer*, *3D*,
*Computer Vision*, *On-Device*, *Perception* — into eight words.

**The one thing that cuts against his stated preference:** the "AI" prefix has been
materially devalued between 2023 and 2026 by the rise of "AI Engineer" as the title
for software engineers building on foundation-model APIs (§3.4). This is a real cost
to the string he wants. It is not, however, a reason to abandon the title — his
employer gave it to him and amputating "AI" would misstate it. It is a reason the
title can never appear *alone*. Adjacency to "3D Computer Vision" cures it.

---

## 1. Title-by-title market definitions, with evidence

### 1.1 Research Engineer

**What it is.** The archetypal research-plus-production hybrid. The person who turns
research ideas into systems that run, and whose implementation work feeds back into
the research.

Primary-source definitions:

- **Google DeepMind** frames the role as the bridge between ambitious research ideas
  and functional, large-scale systems, with responsibilities that "shift with project
  phases from prototypes to engineering milestones to production." Minimum
  qualifications across London postings run from *Bachelor's or equivalent practical
  experience + 2 years* (Python/C++, JAX or PyTorch) to *MSc in Computer Science or
  higher, or equivalent practical experience*. Publications appear under **preferred**,
  never minimum.
- **Akihiro Matsukawa** (Research Engineering FAQs, mtskw.com; ex-DeepMind, now
  Citadel — writing under his own name with a verifiable career history) defines the
  goal as "enabling, contributing to, and accelerating ML research by bringing
  engineering expertise to the projects." Concrete day-to-day: "implementing
  algorithms and related baselines under a common API to allow for rapid
  experimentation," setting up distributed training, building evaluation tooling. He
  states a PhD and publications are **not required**, and draws the useful line
  against software engineering: "research scientists and research engineers work
  directly on specific research projects, while a software engineer typically works on
  the platforms that support many projects."
- **Chip Huyen** (*ML Interviews Book* §1.1.2.2 — author of *Designing Machine
  Learning Systems*, ex-NVIDIA/Snorkel/Netflix): the scientist "comes up with original
  ideas," the engineer "uses their engineering skills to set up and run experiments
  for these ideas" — but she immediately qualifies that the split is "mainly a product
  of bureaucracy — research scientists are supposed to have bigger academic clout and
  are often better paid," and notes it is "not uncommon to see research scientists and
  research engineers be equal contributors to papers," citing *Attention Is All You
  Need* and the GPT-2 paper.

**European instances of the exact title, fetched directly:**

| Employer | Exact title | Location | Degree gate | Publications |
|---|---|---|---|---|
| Flanders Make (Belgian strategic research centre, listed on EURAXESS) | *Research Engineer Computer Vision & Machine Learning* | Heverlee/Leuven, BE | "A master's degree **or** PhD in computer vision or another relevant domain" | Not mentioned |
| Bosch | *Research Engineer — End-to-End Planning in Autonomous Systems* | Renningen, DE / Sunnyvale | "PhD ... **or** a Master's degree with 3+ years industry experience" | Not mentioned |
| Mistral AI | *Research Engineer* / *Research Software Engineer* | Paris / London | — | — |
| Nomagic | *Senior Machine Learning Research Engineer* | Warsaw, PL | — | — |
| imec | *Senior AI Research Engineer* | Leuven, BE | "PhD **or** 5+ years of relevant industrial experience" | Not mentioned |

The Flanders Make posting is worth dwelling on because it is almost a description of
Pradeep's own work: "performing camera calibration for stereo/3D imaging," feature
extraction and classifier training, "creating functional prototypes for industrial
applications." It is on EURAXESS, the European Commission's own researcher-mobility
portal, and it asks for a Master's.

**Pattern.** Across every employer found, the constant string is the noun phrase
**"Research Engineer."** What varies is the modifier: *AI*, *Machine Learning*, *Deep
Learning*, *Computer Vision*, *Research Software*. This matters for the headline: the
searchable core of his title is "Research Engineer," and it survives regardless of
which modifier a recruiter happens to type.

### 1.2 AI Research Engineer

**It is a real employer title, but a minority variant.** Meta posts it verbatim
(metacareers job 882415754757202, "AI Research Engineer"). The rest of the market
prefers a domain modifier over "AI": Apple uses *Machine Learning Research Engineer*,
Bosch and DeepMind use bare *Research Engineer*, Nomagic uses *Machine Learning
Research Engineer*.

Searches for the exact phrase on European job boards surface mostly **aggregator
reposts** (Jobgether, which republishes other companies' listings across Belgium,
Estonia and France) rather than first-party employer postings. That is weak evidence
of the string's independent market weight in Europe.

**Verdict:** legitimate, employer-attested, and safely inside every publication gate
found — but it is not the highest-recall string in Europe, and it carries the
"AI"-prefix dilution risk of §3.4. Keep it; do not rely on it alone.

### 1.3 Research Scientist / AI Research Scientist

**This is the credential-gated title, and the gate is on the noun "Scientist," not on
the word "Research."** The cleanest evidence is a same-employer A/B at Bosch, both
postings fetched directly:

> **Bosch, *AI Research Scientist — GenAI*, Basic Qualifications:**
> "Ph.D. in Computer Science or Engineering, or a related discipline **or master's
> degree with 3+ years industry experience**" … *and* … "**Publication record in top
> venues including ICML, ICLR, ICRA, CVPR, ICCV, ECCV, NeurIPS, etc.**"

The degree line is *identical* to Bosch's Research Engineer postings. The difference
is one added line — a publication record, listed under **Basic** (not preferred)
Qualifications. Responsibilities include "document and disseminate research findings
through high-caliber publications and/or patent submissions."

Meta shows the same structure: *AI Research Scientist* (London/Paris/Zurich) is
PhD-and-publication gated, while *AI Research Engineer* / *Research Engineer* takes a
"Bachelor's degree ... or equivalent practical experience" as its minimum and lists
"first author publications in computer vision, machine learning or computer graphics
peer-reviewed conferences (e.g. CVPR, ECCV, ICCV, NeurIPS, ICLR, or SIGGRAPH)" under
**Preferred**.

Two structural notes that are often missed:

1. **At Meta the title tracks the credential, not the work.** Aidan Lakshman (PhD,
   accepted a Research Scientist offer at Meta, writing under his own name at
   ahl27.com): "the title 'Research Scientist' is what's given to employees with a
   PhD, and their actual responsibilities can vary widely" — spanning SWE-equivalent
   work, Central Applied Science statistics, and genuine AI/ML research. So "Research
   Scientist" on someone else's CV does **not** reliably mean they do more research
   than a Research Engineer. It reliably means they have a PhD.
2. **Bosch's Scientist posting accepting "master's + 3 years" shows the degree is
   negotiable while the publication record is not.** For Pradeep this is decisive in
   the other direction from the usual anxiety: the barrier to *Scientist* is the one
   thing he does not have, and the barrier to *Engineer* is not.

**Verdict: never use "Scientist" about himself, anywhere in the document.** It is the
single claim he cannot substantiate, and it is checkable in thirty seconds.

### 1.4 Applied Scientist

**Amazon's title, and the best-documented ladder in the industry.** Amazon's own
careers copy defines the role as people who "work and solve a broad array of practical
problems, dramatically improving customer experience, reducing costs, and driving
speed and automation," with emphasis on "careful consideration of modeling
assumptions, a thorough review of ML literature, experimentation using
state-of-the-art methods, and **error-free scalable implementations**." The loop is
four 55-minute interviews with "members of our science community."

A real Amazon posting — *Senior Applied Scientist (Computer Vision), Camera and
Sensors*, Cambridge UK — lists Basic Qualifications as neural deep learning methods,
programming in Java/C++/Python, applied research experience, large-scale ML systems,
"experience with conducting research in a corporate setting," and **PhD or Master's
degree**.

The Applied Scientist vs Research Scientist distinction inside Amazon is documented
only through practitioner consensus rather than an official Amazon page (Amazon's own
"how we hire" page does not draw the line). The convergent practitioner account:
Applied Scientists must clear a coding bar equivalent to an entry-level SDE and push
their own code to production; Research Scientists are not held to that bar and build
prototypes that are handed to an Applied Scientist for productionisation. **Treat this
as directionally reliable but not officially sourced.**

**Relevance to Pradeep:** *Applied Scientist* is the one "Scientist"-suffixed title
whose entry route is genuinely open to him (Master's + experience, production coding
bar, no stated publication gate). He should **apply** to it. He should not **call
himself** it.

### 1.5 Machine Learning Engineer

**The high-volume production title.** Rarely requires a PhD; the paper-based framing
(Piskala, arXiv 2601.06087) is that MLEs "focus on implementation and deployment;
traditionally require less theoretical depth but increasingly contribute to
research-oriented tasks." Glassdoor shows ~641 MLE-keyword postings in Germany.

Its defect for Pradeep is that it is *under-specific in exactly the wrong direction*.
It reads as "trains and serves models," which erases 3D geometry, calibration and
triangulation — the parts of his work that are rare. Fine as an application target,
poor as an identity.

### 1.6 Computer Vision Engineer

**The highest-recall domain title in Europe, and the most internally ambiguous.**
Glassdoor shows ~531 "computer vision engineer" and ~903 "computer vision" postings in
Germany, ~368 in the Netherlands, ~201 in Switzerland, and LinkedIn shows 20,000+
"Computer Vision Engineer" matches EU-wide. (Caveats on these counts at §7.)

The ambiguity is real and named by practitioners. Lindsay Worthington (Head of
Operations, People in AI — a named author at a recruiting firm, so a commercially
interested source): the title "covers an enormous range — from researchers fine-tuning
ViT architectures on a GPU cluster to engineers deploying real-time detection
pipelines on edge hardware with specific latency budgets. These are completely
different roles. Most recruiters can't tell them apart." She splits the market into
self-driving/perception, healthcare/medical imaging, and industrial/embedded vision,
and states "You cannot hire for one and expect them to do the other jobs well."

**Consequence for the headline:** "Computer Vision" is the string that gets him found,
but it must never appear unqualified, or he lands in the undifferentiated pile. The
qualifier "3D" is what does the differentiating work — and `domain-demand.md` already
established that "3D perception" is rising to title-level status (Apple posts *3D
Perception/Computer Vision Algorithm Engineer*).

### 1.7 Perception Engineer

**The robotics/AV-sector name for the same work, and a title he currently gets zero
search coverage on.** Real European postings: NEURA Robotics, *Vision & Perception
Engineer — Humanoid*, Zurich (SLAM, object detection and tracking, semantic
segmentation, 3D reconstruction, modern C++); a Zurich *Perception Engineer (Computer
Vision & Edge AI)*; ~129 perception-engineer-keyword postings in Germany.

Typical European requirements: "MSc or BSc in Robotics, Computer Science, Embedded
Systems, or similar," 3+ years (medior) / 5+ years (senior), C++/Python, PyTorch,
camera/LiDAR/radar, "Bayesian filtering, SLAM, linear algebra, and geometry." No
publication gate anywhere in this family.

NVIDIA's own senior/principal *Perception Engineer — Obstacle Foundation Models*
postings describe "applied research and development of innovative deep learning and
multi-sensor fusion algorithms" and "3D perception ... including opportunities to
explore BEV and transformer-based 3D perception" — i.e. this title contains real
research content while never using the word "research."

**This is the highest-value keyword he is currently missing**, and the reason
"Perception" earns a slot in the recommended headline over "Inference."

### 1.8 Member of Technical Staff (MTS)

**A deliberate refusal to distinguish.** OpenAI adopted it in 2023 (Greg Brockman has
attributed the idea to Alan Kay at Xerox PARC); Anthropic uses a single "Member of
Technical Staff" with no research-versus-engineering split. Stated rationales:
avoiding a researcher/engineer caste system, letting people move between pre-training,
post-training, product and infra without renegotiating a title, and — in a talent war
— leaking less information about scope and level to competitors. Internal levels and
paybands still exist; they are simply not externally visible.

**Sourcing caveat:** this is documented through tech press and practitioner blogs
rather than an official OpenAI/Anthropic policy page. Directionally solid, not primary.

**Relevance:** minimal for the headline (an MTS title conveys nothing on a CV and is
not something he can claim), but it is a useful *argument*: the frontier labs
themselves concluded the research/engineering title split is not worth defending.
That is a legitimate line to use in an interview if someone presses on "are you a
researcher or an engineer?"

### 1.9 European-specific grades

**Inria, *ingénieur de recherche* (IR).** This is not a market title — it is a **grade
in the French public research service**, filled by *concours* (competitive exam). The
Légifrance *arrêtés* authorising Inria's external competitions confirm the mechanism:
an admissibility phase scored on the application dossier (coefficient 2) followed by an
oral before a jury covering the candidate's career path, motivations, and fitness for
the functions. Entry qualification is a Master's-level degree, and it is a permanent
post. Inria also recruits IR-equivalent staff on fixed-term contracts outside the
concours.

Two practical caveats, flagged rather than resolved: the *concours* route runs in
French, and public-service competitions carry nationality conditions that would need
checking against his situation. **Treat the IR grade as evidence that Europe has a
formal, permanent, Master's-entry research-engineering career — not as a target he
should optimise a CV headline for.**

**German-language titles.** German employers frequently avoid "Research Engineer"
entirely. ZEISS advertises *Computer Vision Expert* (Oberkochen; "a doctorate is an
advantage," several years of Python/C++/Azure DevOps, **"very good German and English"**).
Siemens uses *Senior R&D Engineer for Medical Imaging – AI*. Other common German
constructions are *Entwicklungsingenieur*, *Wissenschaftlicher Mitarbeiter* (which in
industry means something closer to "researcher," not "PhD student"), and *Experte*.

**Consequence:** an English-language CV headline cannot cover German title vocabulary
and should not try. The German market is reached through skill keywords, not title
strings — which is the same conclusion §3 reaches for a different reason.

---

## 2. Which titles hard-gate on a PhD or first-author publications

This table is the practical answer. "Hard gate" means the requirement appears under
*Basic* / *Minimum* / *Required* qualifications, not *Preferred*.

| Title | PhD hard gate | Publications hard gate | Evidence |
|---|---|---|---|
| Research Engineer | **No** | **No** | DeepMind (BSc/MSc or equivalent practical experience; publications *preferred*); Bosch (PhD **or** MSc + 3y); Flanders Make (MSc **or** PhD); imec (PhD **or** 5y industry) |
| AI Research Engineer | **No** | **No** | Meta: minimum "Bachelor's degree ... or equivalent practical experience"; first-author publications under *Preferred* |
| Machine Learning Research Engineer | **No** | **No** | Apple SIML/ISE: "Masters or Ph.D. ... **or comparable professional experience**"; research background "demonstrated through publications in top-tier journals or conferences, **patents, or impactful software developments**" |
| Applied Scientist | **No** (MSc route documented) | **No** (not stated in postings found) | Amazon Senior Applied Scientist (CV), Cambridge UK: "PhD **or** Master's degree" |
| Research Scientist / AI Research Scientist | Effectively **yes** — and where the degree is negotiable the publication line is not | **Yes** | Bosch AI Research Scientist: publication record in ICML/ICLR/ICRA/CVPR/ICCV/ECCV/NeurIPS listed under **Basic Qualifications**; Meta AI Research Scientist PhD-gated |
| Machine Learning Engineer | No | No | Convergent across postings |
| Computer Vision Engineer | No | No | Typical EU requirement: "BSc or Master's in CS, AI, ML or closely related discipline" |
| Perception Engineer | No | No | "MSc or BSc in Robotics, Computer Science, Embedded Systems, or similar," 3+/5+ years |
| Member of Technical Staff | No formal gate; de facto extremely high bar | No | Flat-title convention |
| Inria *ingénieur de recherche* | No — Master's entry | No | Légifrance concours *arrêtés*; grade definition |

**The Apple line is the most useful sentence in this entire document for him**, because
it names his exact evidence class. Apple accepts a research background "demonstrated
through publications in top-tier journals or conferences, **patents, or impactful
software developments**." A shipped, fully on-device 3D human-pose pipeline is an
impactful software development. This also independently corroborates the previously
*unverified* Apple claim recorded in `european-market.md` §3.1 — though see §7 on how
it was obtained.

**One counter-example worth holding.** Not every Research Engineer posting is open.
Bosch's *Research Engineer for AI Validation* (Renningen) required "a completed PhD in
Computer Science, Statistics, Physics, or a comparable technical field" with no
Master's alternative. The title does not guarantee the gate is open; it only means the
gate is usually open. He should read every posting's qualification block rather than
trusting the title.

---

## 3. How this reads to a European recruiter — and how they actually search

### 3.1 The mechanical facts

- **LinkedIn Recruiter's *Job title* filter searches the title field of current and
  past positions — not the headline.** The *Keywords* filter scans the whole profile,
  headline included. Boolean (uppercase AND/OR/NOT, quoted phrases) works in the Job
  titles, Companies and Keywords filters. Stop words are dropped from the Keywords
  filter (*and, or, the, of, at, by, to, for, with, in, from, not, but, after*).
- **Consequence, and it is a clean one:** his LinkedIn *position title* should remain
  the exact employer-given "AI Research Engineer" — that is the field the title filter
  reads, and it is true. The LinkedIn *headline* and the CV top line are a different
  surface, reached by keyword search, and that is where domain strings must live.
- **On the CV side**, `ats-mechanics.md` established that ATS keyword search is
  Boolean search over the parsed document run by a human recruiter, not an autonomous
  ranking engine. So any string in the headline is matchable text. The headline is
  simultaneously the most-read *and* the most-searched line on the page.

### 3.2 The single most important finding: title-only search has terrible recall

**Glen Cathey** — SVP of Strategic Talent Acquisition and Innovation at Kforce,
previously Randstad Sourceright, with a 16+ year documented sourcing career, published
on **LinkedIn's own Talent Solutions blog** — reports a concrete, methodologically
stated result:

> Searching "data scientist" returned **~600 results**. Excluding that term and
> searching on related keywords instead surfaced **over 6,000** qualified
> professionals — roughly **90% of the potential matches** that the title-only search
> never saw.

His stated method is to OR-chain title variants against AND-ed skill terms — for a
Hadoop role, `(software engineer OR developer OR programmer) AND (Hadoop OR HDFS OR
Hive OR Yarn OR MapReduce)` — which doubled his result set. He describes a "hidden
talent pool" of two kinds: candidates recruiters *cannot* find, and candidates
recruiters *do not* find.

**Three conclusions follow, and they drive the entire headline design:**

1. **You cannot know which recruiter is reading.** A skilled sourcer OR-chains title
   variants and will find him under almost any title. An in-house recruiter under time
   pressure types one string. The headline must therefore be robust to the second case.
2. **Skill and domain terms out-recall title terms by roughly an order of magnitude.**
   This is the empirical answer to "identity title vs searchable title": the searchable
   thing was never the title. It was always the domain vocabulary.
3. **Therefore the tension is largely false.** He does not have to choose. A headline
   has room for a title *and* two domain anchors, and the domain anchors are doing most
   of the recall work regardless.

### 3.3 What a recruiter's eye does with the top of the page

The Ladders 2018 eye-tracking study (30 professional recruiters, eye-tracking hardware,
observed over 10 weeks across hundreds of resumes) found an average initial screen of
**7.4 seconds**, and that resumes which survived had "simple layouts, with clear
sections and heading titles," "bold titles and bulleted accomplishments," and text
that drew the eye down the page; failures had "cluttered layouts, a lack of white
space, multiple columns and long sentences" and "a lack of section or job headers."
Secondary coverage of the study additionally reports that recruiters look at the
current title and company first, then dates, then education.

**Credibility caveat, stated plainly:** Ladders is a commercial job board with an
interest in resume anxiety; n=30 is small; and the specific "current title and company
first" claim appears in secondary write-ups — the primary PDF could not be
text-extracted in this research pass. **Weight it as directional support for
"title-shaped information belongs at the top, in a scannable line," not as proof.**

**Gergely Orosz** (*The Tech Resume Inside Out*, developed with input from 17+ named
tech hiring managers and recruiters; ex-Uber engineering manager) supplies the
convergent and better-sourced version: the CV's job is to get past screening, not to be
an accurate autobiography; tailor each application rather than sending one master
document; keep the most relevant material at the top.

**That last point licences something important:** the headline is a *tailoring slot*.
It is legitimate — expected, even — for its wording to shift between applications.

### 3.4 The "AI" problem, and it is the real argument against his preferred string

In June 2023 **Shawn "swyx" Wang** published *The Rise of the AI Engineer* (Latent
Space), defining the AI Engineer as "a software engineer who is building with AI, not
necessarily being a researcher or an ML engineer, but knowing just enough AI concepts
and limitations to put things into production applications." The essay was widely
endorsed (Karpathy among them) and the title stuck. LinkedIn's Economic Graph now
lists *AI Engineer* among the fastest-growing job titles of the last three years, and
the World Economic Forum's write-up of LinkedIn data groups it with "Forward-Deployed
Engineers and Data Annotators" in a 1.3-million-role wave.

**So in 2026 the role-prefix "AI" primarily connotes foundation-model application
engineering.** A European recruiter skimming "AI Research Engineer" with no further
context has a live probability of filing him as "LLM app builder with a research-y
title." That is precisely the misread `domain-demand.md` warns against — where he is a
median candidate rather than a top-decile one.

**This does not kill the title.** It establishes a constraint: *"AI Research Engineer"
must never appear on the CV without a domain anchor in the same visual unit.* One
adjacent phrase — "3D Computer Vision" — resolves the ambiguity completely and costs
four words.

---

## 4. Searchable title vs identity title — and how the tension actually resolves

The tension is usually framed as a trade: put "AI Research Engineer" and lose
findability, or put "Computer Vision Engineer" and lose identity. **The evidence says
this framing is wrong on both halves.**

**Half one — the searchable half is not a title.** Cathey's ~600-vs-6,000 result
(§3.2) shows domain and skill terms out-recall title terms by roughly 10×. Chasing the
exact three-word phrase "Computer Vision Engineer" would be optimising for a search
that competent recruiters have been told for a decade not to run — and no honest CV of
a person titled *AI Research Engineer* can contain that phrase anyway.

**Half two — the identity half is not established by a title alone.** A bare title in a
headline is a claim. What makes it stick is the *pairing*: a title next to a domain
that is specific enough to be checkable. "AI Research Engineer" alone is a claim.
"AI Research Engineer — 3D Computer Vision, On-Device Perception" is a claim with a
falsifiable specialisation attached, and the Experience section two inches below either
supports it or doesn't.

**The resolution strong CVs use is layering, not compromise.** Three surfaces, three
jobs:

| Surface | Job | Content |
|---|---|---|
| **Headline** (one line, under the name) | Identity + top-of-funnel keyword coverage | Employer title + two domain anchors |
| **Profile line** (1–2 lines beneath) | Kill the "research means doesn't ship" doubt | The shipped artefact and its hardest constraint |
| **Experience entries** | Verifiability | Employer titles verbatim, never adjusted |

Under this layering, the headline title is *never* load-bearing for truth — the
Experience section is — which is exactly why putting it there is safe.

**Tailoring rule (from Orosz + the exact-string-match finding in `ats-mechanics.md`
rule 8):** when applying to a posting whose own title is *Computer Vision Engineer*,
*3D Perception Engineer*, *Perception Engineer* or *Machine Learning Engineer*, mirror
that posting's vocabulary in the **second half** of the headline and in the Skills
block. Never touch the first half, and never touch the Experience entries. The
employer-given title stays constant across every version of the document; the domain
anchors flex.

---

## 5. The recommended headline — exact string and defence

### The string

```
AI Research Engineer — 3D Computer Vision, On-Device Perception
```

**ASCII-safe variant**, for `.docx` submissions or any ATS whose parser you don't
trust with an em dash:

```
AI Research Engineer: 3D Computer Vision and On-Device Perception
```

### Why each element is there

**1. `AI Research Engineer` leads.**
It is his real, employer-given title, which removes self-assignment risk entirely
(§6). It is a title that carries genuine research legitimacy while gating on nothing
he lacks (§2). And it is what he wants his identity to be — a headline that omits it
cannot deliver that.

**2. It leads, rather than trails, deliberately.**
Ladders' scan finding and general E/F-pattern reading behaviour both put the highest
value on the leftmost words of the topmost line. If the title is the identity, it
occupies that position.

**3. `3D Computer Vision` is the disambiguator and the recall engine.**
It defuses the swyx "AI Engineer" misread (§3.4) in four words. It contains "Computer
Vision," the single highest-volume domain keyword in the European market (~903 postings
in Germany, ~368 Netherlands, ~201 Switzerland, 20,000+ EU-wide on LinkedIn). And the
"3D" prefix is the differentiator that `domain-demand.md` established as his scarce
asset — it moves him out of the undifferentiated CV-engineer pile that Worthington
describes.

**4. `On-Device Perception` buys the one keyword family he currently has zero coverage
on.**
"Perception" is a live title-level term across European robotics and AV hiring — NEURA
Robotics (Zurich), the Zurich *Perception Engineer (Computer Vision & Edge AI)* role,
NVIDIA's Perception Engineer ladder, ~129 postings in Germany. He is a perception
engineer by any functional definition and currently invisible to every search that uses
the word. "On-Device" is Apple's own phrasing (per `domain-demand.md`) and is the term
that signals production shipping rather than notebook research.

**5. Six matchable strings, eight words.**
*AI Research Engineer* · *Research Engineer* · *3D* · *Computer Vision* · *On-Device* ·
*Perception*. Every one is honest. Every one appears in real European postings.

### What it drops, and why that is right

**`Applied LLM Systems` comes out of the headline.** Three reasons, and none of them is
that the work isn't good:
- `domain-demand.md` §0 settled that the LLM work goes third, "as proof of breadth on
  top of depth, not as the headline." In the LLM market he is a median candidate; in the
  3D vision market he is top-decile.
- At 7.4 seconds, the third headline slot is the most expensive real estate on the
  document. Spending it on his least differentiating asset is a bad trade.
- Combined with an "AI"-prefixed title, an LLM term in the headline actively *confirms*
  the swyx misread. It is the one word that turns a survivable ambiguity into a
  conclusion.

It stays in the Skills block and in the Experience bullets, where the deterministic-
grounding design (69 rules, zero LLM-computed numbers) reads as engineering judgement
rather than as a bandwagon.

**`On-Device Inference` becomes `On-Device Perception`.** "Inference" is precise but
duplicative — the inference-optimisation evidence (Core ML, TensorRT, quantisation,
DeepStream) is already carried by the Skills line drafted in `domain-demand.md`.
"Perception" buys a title-keyword family that nothing else in the document covers.

### Why not the alternatives

| Candidate headline | Rejected because |
|---|---|
| `AI Research Engineer` (alone) | No domain anchor → maximum exposure to the "AI Engineer = LLM app builder" misread; near-zero keyword recall. |
| `3D Computer Vision · On-Device Inference · Applied LLM Systems` (current) | No title at all, so it cannot establish the identity he wants; spends a third of the line on his weakest differentiator; reads as a skills list rather than a person. |
| `3D Computer Vision Research Engineer` | Strong string, and it usefully makes *Vision Research Engineer* adjacent — but it is a title he has invented. It differs from what his employer calls him and from what his LinkedIn position field says. Fails the §6 test. |
| `Senior AI Research Engineer` | He is not titled Senior. Immediately checkable, immediately fatal. |
| `AI Research Engineer / Computer Vision Engineer` | Slash-listing two titles reads as uncertainty about what he is — the exact "neither one nor the other" failure of §5 below. |
| Anything containing *Scientist* | The one gate he cannot clear (§1.3), and trivially checkable. |

---

## 6. Does a self-described headline title help or hurt?

**It helps — on one condition, which he satisfies.**

The risk in a headline title has never been *naming a title*. It is **inflation**: a
headline that outranks or out-claims what the Experience section says. The failure
modes are specific and all involve a mismatch:

- headline says *Senior*, Experience does not → caught in seconds;
- headline says *Scientist*, Experience says *Engineer* → caught in seconds, and it is
  the claim most likely to be probed;
- headline invents a title the employer never used → the reader now distrusts
  everything else on the page, including the parts that are true.

**Pradeep's headline title is character-for-character identical to his employer-given
title, which is verifiable on LinkedIn and restated in his Experience entry.** There is
no gap to be caught in. This is the strongest possible position and it is why the title
belongs in the headline rather than being hedged out of it.

**The rule to encode:** *the headline title must be less than or equal to the employer
title in both seniority and scientific claim, and identical wherever possible.*

**On the gap between his title and the titles he applies to.** Do not paper over it in
the headline. There is a documented failure mode running the *other* way: practitioners
with research-flavoured titles report recruiter confusion about whether they should be
applying to engineering roles at all — one reports that a "Research Scientist" title
produced zero responses on engineering applications because recruiters could not place
them. (Anonymous practitioner forum reports; **weak evidence, low weight, but it is the
only evidence found on this specific mechanism and it points somewhere consistent.**)

The gap is closed by three moves, none of which involves changing the title:

1. The domain anchors in the headline mean the reader sees *what he does* before they
   have to decide *what he is*.
2. The profile line beneath proves shipping, so "research" cannot be read as "does not
   ship."
3. One sentence in the cover letter names the mapping explicitly — e.g. *"My title is
   AI Research Engineer; the work is 3D perception shipped to production, including a
   full pipeline running entirely on-device."* Naming a mismatch once, plainly, costs
   nothing and pre-empts the objection. Leaving the reader to notice it costs the
   application.

---

## 7. Conveying research-plus-production without reading as neither

This is the hardest part of the brief and the evidence is thinner than for §§1–3. What
follows is what the sourced material supports.

**What works.**

- **A named, non-obvious technical decision with the reason attached.** This is the
  clearest signal in the sourced material. Matsukawa's definition of the role centres
  on contributing research insight *through* implementation. Apple's formulation —
  research background demonstrable via "impactful software developments" — is the same
  idea from the employer side. `european-market.md` §3.2 item 3 already identified this
  as his most under-sold asset: the frozen-pathway architecture composing Progressive
  Neural Networks / Side-Tuning / ControlNet zero-conv ideas, verified bit-identical by
  weight diff. **A metric alone reads as engineering; a named architectural choice with
  a stated reason reads as research.** That is the whole mechanism, in one line.
- **A constraint that made the problem hard.** "On-device," "provably unbiased,"
  "national scale" are the load-bearing words. "Deployed" is not.
- **Third-party artefacts that carry his name.** The GTC 2025 poster is the strongest
  one he has. Per `european-market.md` §3.1, Siemens accepts "publications **or**
  presentations at top-tier conferences, journals, **or competitions**"; Qualcomm treats
  "publication, patent, or external technical contribution" as disjunctive; Apple adds
  patents and software developments. Every one of these disjunctions is a door.
- **A named European precedent for exactly his shape.** **Max Mynter** joined **Mistral
  AI** as a Research Engineer — self-taught, non-CS background, **no publications at the
  time of applying**, Germany-based. He positioned on portfolio projects, 15+ merged PRs
  to Ruff and uv (systems-programming depth in public), an AI Safety Institute
  affiliation, and referrals, and advocates a single-page CV that "highlights the
  aspects relevant to the roles that I am gunning for." Verifiable, named, European,
  recent. **This is the closest documented analogue to Pradeep's position that this
  research pass found**, and it says the route is open.

**What reads as hedging.**

- **Slash-titles** (`Research Engineer / ML Engineer`) and both-and constructions
  ("bridging research and engineering") stated *as a claim* rather than shown. The
  bridge metaphor is DeepMind's own framing of the role, so it is not wrong — it is
  simply worthless coming from the candidate, because everyone says it.
- **Adjectives instead of artefacts.** "Research-driven," "innovative,"
  "cutting-edge." `european-market.md` §1.4 covers this ground.
- **Claiming the Scientist register.** Describing his own work as "novel research" or
  "state of the art" without a paper invites the exact comparison he loses. Let the
  named architectural decision imply the novelty; do not assert it.
- **Publication-shaped padding.** Listing conference *attendance*. `european-market.md`
  §3.1 already resolves this: the GTC poster is an output and belongs under "Selected
  external output & recognition," never under "Conferences."

**The honest limit.** No source found writes specifically and credibly on "how to
present a research-engineering hybrid CV" as its own topic. Everything above is
assembled from role definitions, employer qualification language, and one strong named
analogue. It is a defensible synthesis rather than a directly-sourced conclusion, and
it should be read as such.

---

## 8. Title language to use throughout the document

**Rules, in priority order:**

1. **Headline:** `AI Research Engineer — 3D Computer Vision, On-Device Perception`
2. **Experience entries: employer-given titles, verbatim, every time.** Current role:
   `AI Research Engineer` at IdeasLab Formosa, Taipei. Earlier roles keep their real
   titles even where less impressive — including the four pre-MSc software developer
   years. Retro-fitting an earlier title to look more AI-ish is the highest-risk,
   lowest-return edit available and it contaminates the honest parts of the page.
3. **Profile line (beneath the headline): do not restate the title.** Its job is the
   shipped artefact and its constraint. Something in the shape already drafted at
   `domain-demand.md` line 477 — the pipeline running entirely on-device, the national-
   scale deployment, and the one differentiating idea about metrics that cannot see the
   fault they are meant to catch.
4. **Never write about himself, anywhere in the document:** *Research Scientist*,
   *AI Scientist*, *Machine Learning Scientist*, *Applied Scientist*, *Senior* (until
   an employer gives it), *AI Engineer* unqualified, *Prompt Engineer*, *Data
   Scientist*.
5. **Section headings use searchable domain nouns, not "AI."** `3D Computer Vision`,
   `On-Device / Edge Inference`, `Applied LLM Systems` — matching the skills line
   already drafted in `domain-demand.md` (`On-device / edge inference · Core ML ·
   TensorRT · quantisation · NVIDIA DeepStream`).
6. **LinkedIn is a separate surface with a separate rule.** Keep the *position title*
   field as the exact employer title — that is the field LinkedIn Recruiter's Job-title
   filter reads. Put the full recommended headline string in the *headline* field, which
   the Keywords filter scans.
7. **Tailoring:** flex the second half of the headline to mirror the target posting's
   own vocabulary where it is honestly applicable (`3D Perception` for robotics/AV,
   `Multi-View Geometry` where calibration and triangulation are the ask, `Edge AI` for
   embedded roles). Never flex the first half. Never flex Experience.
8. **Cover letter:** one sentence that names the title-to-role mapping explicitly, so
   the reader never has to reconcile it themselves.

---

## 9. Sources, with credibility notes

### Primary employer sources — high confidence, fetched directly

| Source | What it establishes | Why credible |
|---|---|---|
| Bosch, *AI Research Scientist — GenAI* (jobs.smartrecruiters.com/BoschGroup/744000119485987) | Publication record in ICML/ICLR/CVPR/etc. under **Basic Qualifications**; degree line "PhD ... or master's + 3+ years" | Employer's own posting text, fetched verbatim. The A/B against Bosch's Research Engineer postings is same-employer, same-period — the strongest form of this evidence. |
| Flanders Make, *Research Engineer Computer Vision & Machine Learning*, Heverlee BE, via **EURAXESS** | "A master's degree **or** PhD"; work includes camera calibration for stereo/3D imaging | EURAXESS is the European Commission's official researcher-mobility portal. Employer posting, fetched verbatim. |
| Amazon, *Applied Scientist Interview Prep* (amazon.jobs/content/en/how-we-hire) | Amazon's own definition of the role and the four-interview loop; "error-free scalable implementations" | Employer's own hiring-process page. Note: it does **not** define AS vs RS. |
| LinkedIn Talent Solutions blog — Glen Cathey sourcing tactics | ~600 vs 6,000+ result; OR-chained title variants; "hidden talent pool" | Published on LinkedIn's own platform; Cathey is SVP Strategic Talent Acquisition & Innovation at Kforce with a 16+ year documented sourcing career and a stated method. Caveat: 2017, US-centric, and LinkedIn has a commercial interest in demonstrating Recruiter's power. |
| LinkedIn Recruiter Help — Boolean search; filter documentation | Boolean applies to Job titles / Companies / Keywords; stop-word list; Job-title filter reads position titles, Keywords reads the whole profile | Vendor's own product documentation. The specific claim that the title filter excludes the headline is corroborated across secondary guides but is not stated in a single verbatim LinkedIn sentence I could fetch — **flagged**. |
| Légifrance *arrêtés* authorising Inria *concours externes* for *ingénieurs de recherche*; French public-service portal | IR is a public-service grade filled by competitive exam (dossier, coefficient 2, plus oral) | French government primary legal sources. |

### Named practitioners — high confidence, interests declared

| Source | What it establishes | Credibility |
|---|---|---|
| **Akihiro Matsukawa**, *Research Engineering FAQs* (mtskw.com) | Definition of the RE role; PhD/publications not required; RE vs SWE distinction | Writing under his own name with a verifiable career (ex-DeepMind, Citadel). No commercial interest in the claim. |
| **Chip Huyen**, *ML Interviews Book* §1.1.2.2 | RS "typically requires a Ph.D. and/or first author papers"; RE does not; the split is "mainly a product of bureaucracy" | Author of *Designing Machine Learning Systems*; ex-NVIDIA/Snorkel/Netflix. Free public book, no lead-gen motive. |
| **Aidan Lakshman** (ahl27.com) | At Meta, "Research Scientist" is the title given to PhD holders; responsibilities vary widely | PhD, accepted a Meta RS offer, writes under his own name about his own hiring process. Single-company, single-observer. |
| **Max Mynter** (maxmynter.com) | Landed a **Research Engineer role at Mistral AI** without publications, from Germany, self-taught | Named individual describing his own documented outcome. The single closest analogue to Pradeep found. Sample of one. |
| **Shawn "swyx" Wang**, *The Rise of the AI Engineer* | The 2023–2026 redefinition of "AI Engineer" as foundation-model application engineer, "not necessarily being a researcher or an ML engineer" | The essay that named the category; widely endorsed including by Karpathy. Author runs the AI Engineer conference — a commercial interest in the term's prominence, which **strengthens** rather than weakens the point being made here (the term's spread is the finding). |
| **Gergely Orosz**, *The Tech Resume Inside Out* | Tailor per application; CV exists to pass screening; most relevant at top | Ex-Uber EM; book developed with 17+ named tech hiring managers and recruiters. Sells the book — commercial interest noted; the specific claims used here are uncontroversial and convergent. |
| **Lindsay Worthington** (People in AI) | "Computer vision engineer" spans three non-interchangeable tracks; "most recruiters can't tell them apart" | Named author, Head of Operations at a recruiting firm — **commercially interested**, US salary framing. Used only for the ambiguity claim, which is corroborated by the posting evidence itself. |

### Medium confidence — substance sound, verbatim unverified

- **Apple** *Machine Learning Research Engineer (Computer Vision) — SIML, ISE* and
  *(Human Sensing)*: "Masters or Ph.D. ... or comparable professional experience";
  research background via "publications ..., patents, or impactful software
  developments." **Obtained from search-engine indexes of the live postings; the pages
  had expired before verbatim fetch.** Corroborated by a separate Apple *Applied
  Machine Learning Research Engineer* posting ("MS ... or PhD ... with 3+ years") and
  consistent with the previously-unverified Apple language recorded in
  `european-market.md` §3.1. Treat the wording as very likely accurate, not certain.
- **Meta** *AI Research Engineer* / *Research Engineer, FAIR* (London/Paris): minimum
  "Bachelor's degree ... or equivalent practical experience"; first-author CVPR/ECCV/
  ICCV/NeurIPS/ICLR/SIGGRAPH publications under **Preferred**; 1+ years deep learning.
  Same caveat — index-derived, postings churned before verbatim fetch. The Meta
  *AI Research Engineer* posting ID (metacareers 882415754757202) is real and current.
- **Amazon** *Senior Applied Scientist (Computer Vision), Camera and Sensors*,
  Cambridge UK: Basic Qualifications include "PhD or Master's degree." Index-derived.
- **Google DeepMind** Research Engineer postings, London: qualification ranges and the
  bridge framing. Index-derived across several postings; consistent with
  `european-market.md` §3.1, which fetched them directly in an earlier pass.
- **Bosch** *Research Engineer — End-to-End Planning* ("PhD ... or a Master's degree
  with 3+ years") and *Research Engineer for AI Validation* ("a completed PhD ...",
  no Master's alternative). Both expired before verbatim fetch; index-derived. The
  second is the useful counter-example.
- **MTS convention** at OpenAI/Anthropic, including Brockman's Xerox PARC/Alan Kay
  attribution and the "internal levels still exist" claim: tech press and practitioner
  blogs, no primary company policy page located.
- **Ladders 2018 eye-tracking study** (30 recruiters, 10 weeks): 7.4-second average and
  the layout findings are reported consistently by HR Dive (credible trade press) and
  the company's own PR release. The "current title and company first" ordering claim is
  secondary only — the primary PDF could not be text-extracted here. Commercial sponsor,
  small n. **Directional support only.**
- **Piskala, D.B., *The AI Roles Continuum*** (arXiv 2601.06087): a useful taxonomy of
  RS/RE/AS/MLE as a spectrum. **Position paper by an independent researcher, not
  peer-reviewed, no primary empirical work** — it synthesises public job descriptions,
  which is exactly what this document does directly. Cited for framing only, never as
  evidence. It explicitly disclaims regional coverage: "evidence base relies on public
  artifacts that can be aspirational and uneven across regions and firm sizes."
- **Glassdoor posting counts** (Germany: ~903 "computer vision", ~641 "machine learning
  engineer", ~531 "computer vision engineer", ~129 "perception engineer", ~1,394
  "research engineer"; Netherlands ~368; Switzerland ~201; LinkedIn 20,000+ EU
  "Computer Vision Engineer"). **These are fuzzy keyword matches, not title matches;
  the snapshots are dated inconsistently across 2026; and duplicate/aggregator postings
  inflate them.** The ~1,394 German "research engineer" figure in particular is
  dominated by non-AI *Forschungsingenieur* roles across mechanical, chemical and
  automotive engineering and must not be read as AI research-engineer demand. Used only
  for **relative order of magnitude between vision terms**, which is the one comparison
  they can bear.

### Rejected sources, and why

- **SEO listicles and "difference between X and Y" content farms** — the top organic
  results for nearly every title comparison query (aijobs.ai, resume-template mills,
  "150+ resume headline examples" pages, free "job title generator" tools). Uniformly
  unsourced, mutually plagiarised, and often internally contradictory.
- **Career-coaching lead magnets** — LinkedIn-headline "formula" pages, resume-optimiser
  vendor blogs. Every one located was gated on a product.
- **Anonymous forum threads (Blind, Quora, Reddit)** — used **once**, explicitly
  labelled as weak, for the single mechanism in §6 where nothing better exists (research
  titles causing recruiter confusion on engineering applications). Not used for any
  factual claim about requirements or role definitions; where forum consensus and
  employer postings both existed, the postings were used.
- **Job aggregators reposting other companies' listings** (Jobgether, ZipRecruiter
  title-aggregation pages). Noted in §1.2 as *evidence of weakness* in the "AI Research
  Engineer" string's first-party market presence, never cited as an employer source.

---

## 10. Honest gaps

1. **No dataset exists — or none was found — measuring which AI job titles European
   recruiters actually type.** This is the direct evidence question 3 asked for and it
   could not be answered head-on. The Cathey finding is the best available substitute:
   it is about search behaviour in general, is US-centric, and dates from 2017. **The
   recommendation therefore rests on the structural argument (skill terms out-recall
   title terms ~10×) rather than on any measurement of "AI Research Engineer"
   specifically.** If that argument is wrong, the recommendation is wrong.
2. **Whether "AI Research Engineer" is a high- or low-frequency recruiter search string
   in Europe is genuinely unknown.** The observation that European first-party postings
   prefer *Research Engineer* with a domain modifier is suggestive but is about
   *employer* vocabulary, not *recruiter search* vocabulary. These are related but not
   the same thing.
3. **Apple, Meta, Amazon and DeepMind qualification language is index-derived**, not
   fetched verbatim, because AI-role postings at these companies expire within weeks.
   Bosch and Flanders Make were fetched directly and are the load-bearing citations for
   §2. If any single quotation in this document needs to survive a challenge, use the
   Bosch A/B, not the Apple line.
4. **No credible, methodologically-stated source on CV headline construction was
   found.** Every result for that query was a content farm or a lead magnet. §§4–5 rest
   on Cathey (search behaviour), Orosz (tailoring), Ladders (scan behaviour, weak), and
   the ATS parsing mechanics already established — combined by argument, not by
   citation. This is the weakest-sourced part of the document and it happens to be the
   part that produces the deliverable. Stated so it can be weighed.
5. **The Inria *ingénieur de recherche* nationality and language conditions were not
   verified.** French public-service *concours* carry conditions that would need
   checking against Indian citizenship with Taiwan PR. Out of scope here; flagged
   because §1.9 could otherwise be read as a recommendation.
6. **No evidence was found either way on whether "3D" as a headline qualifier helps or
   hurts recall** — it plausibly narrows him out of general CV searches even as it
   differentiates him within them. The judgement that differentiation wins comes from
   `domain-demand.md`'s market-size analysis, not from search data.
