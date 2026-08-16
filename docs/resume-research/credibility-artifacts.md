# Research credibility without first-author publications

**Question:** how do hiring teams judge "research capability" when a candidate has no
first-author peer-reviewed publications, and what artifacts actually substitute?

**Scope note.** This extends three existing documents and does not restate them.
`faang-expectations.md` covers Google hiring committees, the XYZ formula and Chip
Huyen's "hardest problem" framing. `european-market.md` establishes the Research
Engineer vs Research Scientist track split, the ALLEA attribution standard, and the
rule *claim the verb, not the noun*. `domain-demand.md` ranks his assets for the CV
domain. Two of those documents are **corrected** below on specific points, marked
**[CORRECTION]**.

**Bottom line up front.** The identity "AI Research Engineer" is defensible — it is
his actual job title, and the European industrial-research market has an explicit,
published, non-PhD, non-publication route into research-titled roles. What is *not*
currently defensible is the gap between that title and his **externally inspectable
evidence**, which is close to zero. The fix is not a paper. It is making the
architecture work he has already done visible to a stranger.

---

## 0. One finding that changes the attribution problem

`european-market.md` §4 flagged as its highest-value open question: *"Is he named in
the Scientific Reports acknowledgements?"*

**Answer: no. He does not appear anywhere in the paper.** Verified directly from the
published article (DOI `10.1038/s41598-025-27773-5`, published 2025-12-16):

- **Authors (4):** Tsung-Yin Ou (corresponding; National Kaohsiung University of
  Science and Technology *and* President Information Corporation), Andrés Ponce,
  Cody Lee, Areoll Wu — the latter three affiliated to President Information
  Corporation, Taipei.
- **Contributions statement, verbatim:** *"T.Y.O. is the corresponding author and
  responsible for ensuring that the descriptions are accurate and agreed by all
  authors. T.Y.O also devised the project, the main conceptual ideas and proof
  outline. A.P. & C.L. developed the theoretical formalism, performed the analytic
  calculations and performed the numerical simulations. A.W. supervised the project."*
- **Acknowledgements, verbatim and complete:** *"This paper was supported by the
  National Science and Technology Council (NSTC), ROC. Taiwan, under Grant No. NSTC
  114-2622-E-992 -009."* There is **no personal acknowledgement section at all** —
  only the funding grant.
- Full-text search for "Ajish", "Pradeep", "Rajasekar" and "IdeasLab": **zero hits.**

*Method: OpenAlex API for the authorship record; direct HTML fetch of the Nature
article page for the Contributions and Acknowledgements text.*

**Consequence, and it is a hard one.** The paper contains **no paper trail linking
him to the system**. It is therefore not evidence *about him* under any framing. It
can only ever be cited as third-party documentation that *the system exists and
performs as claimed* — which is exactly the "claim the verb, not the noun" rule, now
resting on verified fact rather than on caution. Anyone who checks will find his name
absent; the CV must never create an expectation that they will find it.

**Second consequence, and this is the useful one.** The **NVIDIA GTC 2025 poster is
now the only externally-verifiable artifact carrying his own name** on the
retail-vision work (assuming he is listed as author/presenter — see gaps §8). That
inverts `domain-demand.md`'s ranking, which placed the GTC poster 7th of 8 as a
low-confidence "ecosystem signal". **[CORRECTION]** It is not a decorative item. It
is currently his *only* named research-flavoured output, and §2 below shows the
selection process is more substantive than that document assumed.

---

## 1. How research capability is actually judged without publications

### 1.1 The structural answer: two ladders, two currencies

The market does not have one "research bar". It has two, and they use different
currencies. This is the single most load-bearing fact in the whole question.

**Chip Huyen**, *Introduction to Machine Learning Interviews* (§1.1.2.2), verbatim:

> "If the role of a research scientist is to come up with original ideas, the role of
> a research engineer is to use their engineering skills to set up and run
> experiments for these ideas."
>
> "The research scientist role typically requires a Ph.D. and/or first author papers
> at top-tier conferences. **The research engineer role doesn't**, though publishing
> papers always helps."
>
> "The different job titles are mainly a product of bureaucracy — research scientists
> are supposed to have bigger academic clout and are often better paid than research
> engineers."

*Credibility: Huyen writes under her own name; author of* Designing Machine Learning
Systems *and* AI Engineering*; ex-NVIDIA/Snorkel/Netflix; Stanford instructor. This
is the same source `domain-demand.md` relies on, but a different chapter — the
RS/RE split is not covered there.*

**Akihiro Matsukawa**, *Research Engineering FAQs* (mtskw.com), the practitioner
essay Huyen cites as her source on this distinction. He describes the RE role as
*"enabling, contributing to, and accelerating ML research by bringing engineering
expertise to the projects"*, recommends *"a CS background at a Bachelor's level, with
a focus in distributed systems or graphics"* plus maths/stats coursework, and — the
decisive line for Pradeep — argues that if what you want is *academic* research,
*"it's more efficient to just get a PhD"* rather than using an RE role as a stepping
stone. The RE role is not a degraded research scientist role; it is a different job
with an engineering-shaped bar.

*Credibility: named author, own domain; ex-Dropbox and DeepMind research engineer,
now Citadel. Writing from inside the role about the role. Highest-quality
practitioner source found on this specific question.*

### 1.2 The frontier-lab answer: credentials explicitly deprioritised

**Anthropic careers page** (primary employer source, verbatim):

> "About half our technical staff had no prior ML experience; about half have PhDs,
> but plenty of brilliant colleagues never went to college."
>
> "**If you've done interesting independent research, written a thoughtful blog post,
> or contributed to open source, put that at the top of your resume.**"
>
> "Engineers here do lots of research, and researchers do lots of engineering. If you
> have an engineering background, apply as an engineer — you'll perform better in the
> interviews... **All our papers have engineers as authors, often as first author.**"

This is the strongest single piece of evidence in the whole document for the
substitutes question, because it is an employer naming, in priority order, the three
things it wants at the *top* of a resume in place of credentials: **independent
research, a thoughtful blog post, open-source contributions.** Not one of the three
is peer-reviewed.

*Credibility: employer primary source, on the company's own careers page, currently
live. Caveat: Anthropic is a frontier lab with an unusually credential-agnostic
culture and its own postings still set per-role bars; do not generalise this to
European industrial labs without the §3 evidence.*

### 1.3 The real bar, stated plainly

Across the credible sources, what actually gets evaluated in place of a publication
record is consistent, and it is **not** a substitute *artifact* at all — it is a
substitute *demonstration*:

1. **Can you defend a non-obvious technical decision under questioning?** Every
   credible source converges here. Huyen (per `faang-expectations.md`) wants the
   hardest problem and the reasoning; OpenAI's process is reported to probe
   "research taste" — the ability to identify which problem is worth attacking;
   Matsukawa emphasises reasoning about tradeoffs across systems-vs-modelling
   solutions.
2. **Is there something a stranger can inspect without taking your word for it?**
   This is what publications *do* — they are not valued as prestige but as
   externally-verified, inspectable work. Any artifact that is externally verified
   and inspectable performs the same function.
3. **Did the work survive contact with something that could have falsified it?**
   Peer review is one such filter. Production deployment at scale is another. A
   disproved hypothesis is another.

**Point 3 is where Pradeep is unusually strong and does not know it.** He has a
documented case of a hypothesis tested against real session data and *disproved*
before reaching users; a rule-engine audit that identified rules firing on 100% of
sessions as self-detecting bugs; and 204 bone measurements validated against
*external published anthropometric ratios* rather than internal consistency. Those
are three independent instances of building a falsification mechanism and then
honouring its output. That is the behavioural definition of research capability, and
it is rarer in industry engineers than any publication.

**One evaluation technique worth flagging** (weaker source, useful heuristic): give
the candidate a paper from the domain and ask them to critique it — find its
limitations, propose alternatives. Reported in recruiting-industry writing rather
than by a named hiring manager, so treat as plausible practice rather than
established fact. It matters here as *preparation advice*: he should expect to be
asked to critique a 3D-pose paper, and his frozen-pathway and validation work gives
him unusually good material to critique against.

---

## 2. The substitutes, ranked by weight

Weights are for **research-engineer-track roles in European industrial labs and
product-research teams** — the market he is actually in. They would be different for
a Research Scientist track, where nothing below fully substitutes for first-author
top-tier papers.

### Tier 1 — genuinely moves a research hiring bar

**1. A shipped system at scale, with the *constraint* named, not the metric.**
Already established in `european-market.md` §3.2 and `domain-demand.md`; not
repeated. The extension here: what makes it *research* evidence rather than
engineering evidence is the presence of a named architectural decision that could
have gone another way, with the reason it went this way. "Deployed to 7,000 stores"
is engineering. "Body pathway provably bit-identical to base model, verified by
weight diff, because a regression in the base pathway would be undetectable by the
adapter's own metrics" is research.

**2. Granted or filed patents.** First-class currency in European industry
specifically — see §3 and §5. The mechanism by which they substitute is exact: a
patent is an externally examined, publicly indexed, dated document with your name on
it as an originator of a technical idea. It performs precisely the verification
function that peer review performs. Two employer-primary confirmations already in
`european-market.md` (ASML Fellowship: *"publications and patents"*; Qualcomm:
*"publication, patent, or external technical contribution"*). Extended in §5.

**3. Peer-reviewed workshop papers at CVPR / ICCV / ECCV / WACV.** Underrated in the
existing docs, and the sourcing here is now hard rather than inferential. CVPR and
WACV workshop proceedings are published by the Computer Vision Foundation, mirrored
to **IEEE Xplore**, assigned ISBNs, and **indexed in DBLP**. That means a CVPR
workshop paper is a real, citable, archival, DBLP-indexed publication in the venue
family that CV job postings name by name. It is not a main-track paper and nobody
will mistake it for one — but it clears the "does this person have any peer-reviewed
output at all" filter permanently, and it does so in the *right* venue family.

*Credibility: verified against openaccess.thecvf.com (CVF's own repository, workshop
menus present for CVPR 2021–2025), dblp.org/db/conf/cvpr, and IEEE Xplore proceedings
listings. Primary sources.*

**4. Open-source contributions to significant projects.** Named at the top of the
resume by Anthropic (§1.2), and reported as a valued signal at OpenAI alongside
reproducible experiments. The word doing the work is **significant** — see the honest
assessment of his current repos in §6.

### Tier 2 — real, but supporting rather than load-bearing

**5. arXiv preprints without peer review.** Genuinely counts, but with two important
qualifications, one favourable and one not.

*Favourable:* at least one Google DeepMind Research Engineer posting lists, under
**minimum** qualifications, *"Experience conducting research and publishing results
in relevant fields (e.g., conference publications, journal articles, **preprints**)"*.
If that wording is accurate, an arXiv preprint literally satisfies a DeepMind RE
minimum qualification. **[Confidence: medium.]** Google Careers pages are a
JavaScript SPA and do not render to fetch — this was captured from a Glassdoor mirror
of the posting, not from Google's own page. `european-market.md` §7 already flags the
same rendering problem. Do not quote this to anyone as verbatim without re-verifying.

*Unfavourable:* arXiv tightened its endorsement policy — as of 21 January 2026,
**institutional email addresses are no longer accepted as the sole qualifier for
automatic endorsement**, following a rollout that began in the Mathematics section in
December 2025, in response to *"an unsustainable increase in the number of
non-scientific submissions"*. A first-time submitter with no arXiv history and a
company email should assume he needs an endorsement from an established author in
cs.CV. This is a real, current, practical barrier and it is under-appreciated.

*Credibility: arXiv's own blog (blog.arxiv.org), the operator's primary announcement.*

**6. Industry conference posters — GTC specifically.** **[CORRECTION to
`domain-demand.md`, which recorded "no credible source found" and rated this low
confidence.]** There is now evidence about the process. NVIDIA's own poster
call-for-submissions states that **"the GTC Content Committee will review, rate, and
select submissions based on technical details and performance results offered and
insights to be learned, as well as relevance and timeliness"**, that submissions
require an **Extended Abstract & Results**, and that posters **"must demonstrate a
significant innovation or improvement using GPU computing."** There is also a poster
*award* with nominees *"selected based on their research's technical rigor,
real-world impact, and contributions to advancing AI applications."*

So: a committee-reviewed, competitively selected technical submission requiring an
extended abstract with results. That is meaningfully more than "attended a vendor
conference". It is meaningfully less than peer review by domain researchers, and it
is not indexed in DBLP or IEEE Xplore.

*Credibility: NVIDIA's own GTC call-for-submissions and poster pages (primary,
though the 2026 call has since closed and the detailed criteria text was captured via
search-result extraction rather than direct fetch — **medium confidence on exact
wording, high confidence on substance**). Award criteria corroborated by Mindgard's
own announcement of its nomination.*

**Net position:** it is a genuine third-party-selected output, correctly placed
outside a "Publications" heading, and — given §0 — it is his most important named
artifact, not his least.

**7. Technical blog writing / public technical writeups.** Named explicitly by
Anthropic at top-of-resume priority. Its weight is entirely a function of *depth*: a
walkthrough of a well-known architecture demonstrates pedagogy, not research
capability. A writeup of a decision *you* made, with the alternatives you rejected
and the failure mode that drove the choice, demonstrates exactly what §1.3 says is
being evaluated. This is the highest leverage-per-hour item on the whole list for
him, and §6 makes it the primary recommendation.

**8. Reproductions of published results.** Higher-status than it used to be. **TMLR
awards a "reproducibility certification"** to papers whose primary purpose is
reproducing published work *where the paper contributes significant added value
through additional baselines, analysis, ablations or insights*; and as of 2026 the
**ML Reproducibility Challenge became an official NeurIPS track**, with the pathway
being TMLR acceptance + certification, then a light compatibility review by the MLRC
committee for NeurIPS presentation eligibility. So a reproduction can now carry
NeurIPS branding. The catch is that TMLR acceptance is a real peer-review bar with a
months-long cycle, and the "significant added value" clause means a bare reproduction
does not qualify.

*Credibility: NeurIPS official blog and Call for Reproducibility, reproml.org call
for papers, jmlr.org/tmlr — all venue-primary sources.*

### Tier 3 — decorative for his profile, or actively risky

**9. Competition wins (Kaggle, benchmark leaderboards).** Largely decorative for a
mid-career research-engineer application. The sourcing on Kaggle's hiring value is
uniformly poor — the search space is dominated by course-selling content farms
(geeksforgeeks, refontelearning, goperfect) and none of it constitutes evidence about
research hiring. Kaggle's own community threads argue it is most useful for
*entry-level* candidates who lack a work record. Pradeep has a work record; a Kaggle
placement would displace stronger material. **His existing competition win (TAITRA,
1-of-3 from 638 across 55 countries) is a different animal** — it is a technical
*proposal* he sole-authored, judged by a national trade body, and its value is in the
ratio and the sole authorship, as `domain-demand.md` already establishes.

**10. Journals such as *Sensors* (MDPI) or *Scientific Reports*.** Use with caution
and, on current evidence, do not prioritise. Finland's **Publication Forum (JUFO)**
announced on 16 December 2024 that from January 2025 it was downgrading **271
open-access journals to level 0 — 187 MDPI titles and 82 Frontiers titles** — on the
stated grounds that such journals *"make use of the APC operating model and aim to
increase the number of publications with the minimum time spent for editorial work
and quality assessment."* Those classifications feed the Finnish university funding
model 2025–2028.

*Credibility: Retraction Watch and Times Higher Education, both reporting on JUFO's
own published decision — credible reporting plus a traceable institutional primary.
Whether* Sensors *specifically retained level 1 was claimed by a low-quality source
and is **not verified** — treat as unknown.*

This does not make such venues worthless; it makes them a poor *signalling* choice
for someone whose entire purpose in publishing is to signal research credibility to
CV specialists. A CVPR/WACV workshop paper is strictly better for that purpose at
comparable or lower effort.

### The ranking in one line

> Filed patent ≈ CV-venue workshop paper > substantive public technical writeup ≈
> significant OSS > arXiv preprint > GTC poster > TMLR reproduction > MDPI journal >
> Kaggle.

...with the standing caveat that **all of these are outranked by the shipped system**,
which he already has, and none of them substitutes for being able to defend the
architecture in a room.

---

## 3. European industrial research labs — do they hire non-PhDs into research titles?

**Yes, explicitly and in writing, and this is better documented than expected.**

### 3.1 Hard employer-primary evidence

| Institution | Role | Verbatim requirement | Publications mentioned? |
|---|---|---|---|
| **imec** (Belgium/NL) | **Senior AI Research Engineer**, Underwater Perception | *"PhD in Computer Science, Machine Learning or related field **or 5+ years of relevant industrial experience**"* | **No** — not mentioned anywhere in the posting |
| **imec** | AILabs Research Engineer | *"5 years experience in DevOps, MLOps, Platform Engineering or similar roles"* — **no degree requirement stated at all** | **No** |
| **Bosch Research** (Renningen) | Research Engineer, Deep Learning Perception | *"an excellent degree (**PhD or Master**) in Computer Science or a related field"* | Not in the Research Engineer role; Bosch's *PhD* postings do list peer-reviewed publication experience as beneficial |
| **Inria** (France) | *Ingénieur de recherche* — a permanent research-engineer civil-service grade | Qualification at **level 7 of the French RNCP** (i.e. Master's / Bac+5); foreign diplomas admissible via equivalence certificate; contractual posts also Bac+5 | **No** |
| **Fraunhofer** (Germany) | Computer Vision / Data Science Research Scientist | *"a university degree (**diploma, master, or doctorate**)"* in CS/DS/SWE/EE/Physics or related | Publications listed under *expected activities* (*"participate in grant proposals, research reports, conference and journal publications as well as presentations and posters"*), **not** under entry requirements |
| **Siemens** | Senior R&D, medical imaging AI | *"a track record of publications **or presentations** at top-tier conferences, journals, **or competitions**"* | Disjunctive — already in `european-market.md` §3.1 |

*Credibility: imec and Inria rows fetched directly from the institutions' own
careers/recruitment pages — primary, verbatim, high confidence. Bosch and Fraunhofer
rows captured via search extraction because the source pages returned expired-posting
or HTTP 403 responses — **medium confidence on exact wording, high confidence on
substance** (both are standard German-industrial formulations). Siemens row carried
forward from prior research.*

### 3.2 What this actually establishes

**The imec line is the single most useful sentence found in this entire
investigation.** A European industrial research institute, in a **Senior** role, with
"Research Engineer" in the title, in his exact technical area (perception, applied
CV/ML), states in writing that **five years of relevant industrial experience is
accepted in place of a PhD**, and does not mention publications at all. He has ~3
years AI industry plus ~2 years MSc research plus 4 prior years of software
engineering; on a generous but defensible reading he meets it now, and on a strict
"relevant industrial AI experience" reading he meets it within two years.

**The Inria line establishes something structurally different and worth understanding
properly.** French public research has a *permanent, unionised, salaried career grade*
called *ingénieur de recherche* whose entry qualification is a Master's. It is not a
consolation track — IRs run software and experimental infrastructure inside research
teams and are co-authors on the resulting papers. That is a formal institutional
answer to "can a non-PhD hold a research title in a European public lab": in France,
yes, by statute. Caveat: the *concours* route for civil-service posts restricts
certain categories to EU/EEA nationals; the fixed-term contractual route (up to 3
years, Bac+5) does not carry that restriction in the same way. **He should verify
nationality eligibility per-posting** — as an Indian citizen with Taiwanese APRC
(which confers no EU rights; see `aprc-scope.md`), this is a live constraint on the
*concours* path specifically, not on Inria contractual posts.

**The Fraunhofer line matters for a subtler reason.** Publications appear as a *job
duty*, not an entry gate. That is the exact shape of role he should be targeting: an
employer that will *give* him the publication record he lacks, rather than demand it
at the door. Fraunhofer, DFKI and CSEM are all structurally applied-research
organisations with industrial partners, meaning the work is publishable by design and
the IP problem in §4 is handled by the institution rather than by him.

### 3.3 Do industrial *research* labs weight this differently from product teams?

Yes, but not in the direction usually assumed. The difference is not "labs want
papers, product teams want shipping". It is:

- **Industrial research labs (Fraunhofer, DFKI, imec, CSEM, TNO, Bosch Research,
  Siemens CT, Philips Research)** operate a **dual currency of patents and
  publications**, and treat them as substitutable. This is genuinely different from
  US frontier labs, which weight publications far more heavily than patents. §5
  quantifies this.
- **Product research teams** weight shipped systems and deployment constraints, and
  read publications as a nice-to-have. His profile is *strongest* here, and this is
  where the on-device Core ML / TensorRT work is scarcest.

**The practical implication:** he should not treat "industrial research lab" and
"product team" as one target with one CV. The lab CV should lead with the
architectural-decision material and the validation methodology; the product CV should
lead with the on-device constraint and the scale.

### 3.4 On ASML and Qualcomm specifically

Prior research suggested both weight patents comparably to publications. **Partially
verified, partially not.**

- The **ASML Fellowship Program** wording (*"as proven by a track record of
  publications and patents"*) and the **Qualcomm** wording (*"publication, patent, or
  external technical contribution experience is a plus"*) stand from prior research
  and were not contradicted.
- **Attempted re-verification of ASML's current research postings failed.** Search
  returned only aggregator mirrors (Glassdoor, ZipRecruiter, Indeed) reporting
  generic *"Ph.D. or M.S. in STEM"* requirements with **no mention of patents or
  publications** in the postings actually surfaced. So: the *Fellowship Program*
  language is about a senior technical-recognition track, and should **not** be
  generalised to ASML's ordinary research-engineer hiring. `european-market.md`'s
  framing is slightly too strong on this and should be read as "at the top of the
  European industrial technical ladder" — which is what it says — rather than "in
  ASML hiring generally". **[CLARIFICATION rather than correction.]**

### 3.5 The Max Planck / academic-lab question

**Max Planck institutes are largely not his target and he should stop considering
them.** MPI recruitment is overwhelmingly structured around doctoral and postdoctoral
positions; the CS@Max Planck and MPI-SWS career pages surface PhD/postdoc tracks
almost exclusively. MPI-IS Perceiving Systems (Tübingen) is a near-perfect *technical*
fit — it is the home of SMPL, VPoser and much of the 3D-human-pose-and-shape
literature he works downstream of — but **no research-engineer posting or stated
non-PhD route was found**, and this is an honest gap rather than a negative finding
(MPI does employ research engineers and software engineers; their postings were not
locatable in this research pass). Treat MPI as a speculative-application target where
a personal approach with a strong artifact would matter far more than a CV, not as a
market to apply into.

---

## 4. Is a workshop paper or arXiv preprint a realistic gap-closer?

**Yes for a workshop paper, with a specific venue and a specific angle. Qualified yes
for arXiv, with a specific procedural obstacle.**

### 4.1 The IP problem, and the way around it

He cannot publish the proprietary architecture. That is not negotiable and he should
not try. But **the IP problem is smaller than it looks, because the publishable
contribution is not the architecture — it is the validation methodology.**

Consider what he actually has that is publishable without disclosing employer IP:

- **Validation of markerless 3D pose against external anthropometric ground truth**
  (204 bone measurements checked against published anthropometric ratios rather than
  internal consistency). This is a *methodology* contribution. It does not require
  disclosing the model.
- **Temporal consistency and error characterisation under occlusion and fast motion**
  for a phone-mounted single/multi-view capture setup — a *measurement* contribution
  about a hardware regime the literature under-covers.
- **An honest negative result**: the hypothesis tested against real session data and
  disproved. Negative results are publishable and disproportionately valued in
  validation-focused venues.

There is a live literature here that he would be entering as a peer, not a supplicant.
*Scientific Reports* has published *"Comparison of markerless and marker-based motion
capture systems using 95% functional limits of agreement in a linear mixed-effects
modelling framework"*; *Scientific Data* has published a *"Synchronised video, motion
capture and force plate dataset for validating markerless human movement analysis"*;
ISBS proceedings carry multiple markerless-validation papers (OpenCap field jump
testing; baseball pitching kinematics; simulated snowboarding). **The validation-of-
markerless-mocap niche is an active, publishing, non-saturated community and his work
is directly on its frontier.**

### 4.2 Sequencing: patent first, then publish

The one ordering mistake that would be expensive: publishing before filing. A journal
article, conference presentation or detailed public post counts as **prior disclosure**
and can destroy novelty for a patent application worldwide. Standard industrial
practice — and standard contractual language in research agreements — is a **review
period before submission** (commonly 30–90 days) during which the employer's IP
counsel checks for patentable subject matter and may delay publication to permit
filing. The "file first, publish later" pattern (a provisional filing secures the
priority date; publication is then unblocked) is the standard resolution.

*Credibility: patent-practice sources and standard scientific-publication contract
clause language. This is settled practice rather than contested opinion, but he should
confirm the specifics of **his own employment agreement and his employer's internal
publication-approval process** — that is the only source that binds him.*

**Practical consequence:** recommendations §5 (patent) and §4 (paper) are not
competing. They are **sequential**, and the patent must come first. Raising the
invention disclosure is also the natural conversation in which to ask for publication
permission.

### 4.3 Concrete venues, with real dates

Today is **August 2026**. The calendar as it stands:

| Venue | Type | Timing | Assessment |
|---|---|---|---|
| **ISBS** (Int'l Society of Biomechanics in Sports) | Peer-reviewed abstract, published in a supplementary issue of ***Sports Biomechanics*** (Taylor & Francis) | ISBS 2026 cycle ran: submission 23 Jan → notification 13 Apr → conference 27–31 Jul. **ISBS 2027 is Rimini, July 2027**; expect submission ~Jan 2027 | **Best effort-to-output ratio available to him.** Short-format, indexed, genuinely peer reviewed, exactly his domain, and validation-methodology work is the venue's core business. ~5 months out. |
| **CVsports @ CVPR** (12th ed. was CVPR 2026) | Full workshop paper, CVF/IEEE proceedings, DBLP-indexed | CVPR 2026 cycle: submission **5 March 2026** ("no extensions possible"), notification **25 March**. Expect the CVPR 2027 edition to follow the same pattern, ~March 2027 | **Highest-prestige realistic target.** Topic list explicitly includes *"estimation of position and motion of cameras and participants in sports"*, *"performance assessment in sports"*, *"datasets in sports"*, *"analysis of injuries in sports"*. Three-week review turnaround. |
| **WACV 2027 workshops** (4–5 Jan 2027, Lake Buena Vista) | Workshop paper, CVF/IEEE proceedings | Workshop proposals closed 8 Aug 2026; **individual workshop paper deadlines are typically ~Oct 2026**, camera-ready 2 Nov 2026 | Nearest-term CV-venue option — roughly two months of runway. Tight but not impossible if the paper is a validation study rather than a novel-method paper. |
| **SportRxiv** | Preprint server for sport and exercise science | Rolling | **No endorsement gate**, unlike arXiv. Already hosts markerless-mocap validation work (e.g. the PITCHAI validation study). A zero-friction way to get a timestamped, citable, public artifact while a conference decision is pending. |
| **arXiv cs.CV** | Preprint | Rolling | Real value (§2 item 5) but **needs an endorsement** under the Jan-2026 policy. Solve by co-authoring with an academic, or post to SportRxiv first. |
| **MDPI *Sensors*** | Journal | Rolling, fast | Available but **deprioritise** — see §2 item 10. |

*Credibility: CVsports call-for-papers page (vap.aau.dk, organisers' own site);
WACV 2027 official dates page (wacv.thecvf.com); ISBS 2026 CFP as posted to Biomch-L
(the biomechanics community's own mailing list) confirming publication in* Sports
Biomechanics*; SportRxiv and ISBS proceedings archive (commons.nmu.edu). All venue-
primary.*

### 4.4 Realistic time cost

Honest estimate for a validation-study workshop paper, working full-time, assuming the
data already exists (it does — he has session data and 204 bone measurements) and
employer permission is granted:

- **Employer permission + IP review:** 4–10 weeks, and **largely outside his control**.
  Start here; everything else is blocked on it.
- **Framing, related-work reading, deciding the actual claim:** 20–30 hours. This is
  the part people underestimate and the part that determines acceptance.
- **Re-running analysis in a form that can be shown publicly, with stats:** 30–50
  hours. Note that "compare against published anthropometric ratios" is already an
  analysis he has run; the work is making it defensible and reproducible, not
  inventing it.
- **Writing, figures, formatting, submission:** 30–40 hours.
- **Total: roughly 80–120 focused hours over 3–4 months**, plus a review cycle.

**This is achievable. It is not achievable while also doing four other things.** If he
attempts a paper he should attempt exactly one, and it should be the validation study.

---

## 5. Patents — attainability, timeline, and European weight

### 5.1 How attainable is being named an inventor?

**Far more attainable than a top-tier paper, and it is a normal workplace process
rather than an achievement.** Siemens's own numbers, fiscal 2024:

> *"Siemens recorded a total of 5,250 inventions in fiscal 2024, amounting to around
> 24 inventions per workday"*; *"Siemens registered 2,900 patents"*; *"approximately
> 45,000 issued patents"* in total; *"about 53,000 people currently work in research
> and development at Siemens."*

*Credibility: Siemens press office, the company's own published figures.*

That is roughly **one invention disclosure per ten R&D staff per year**, with about
55% of disclosures converting to a registered patent. Filing is a routine act inside a
functioning European industrial R&D organisation, not a rare distinction. **This cuts
two ways and both matter:**

1. **In his favour:** the bar for *becoming* a named inventor is an invention
   disclosure his employer chooses to file. The frozen-pathway regression-free adapter
   composition, the deterministic-grounding LLM architecture, and the on-device 3D
   pipeline are all plausibly disclosable. **He should raise this with his employer,
   and the ask is small.**
2. **Against over-weighting it:** at Siemens or Bosch, one patent is not
   differentiating — everyone senior has several. Its value on his CV is as a
   **category credential** ("this person operates inside an invention-disclosure
   system and has produced protectable novelty"), not as scarcity.

### 5.2 Timeline — filed vs granted

The EPO timeline, from patent-firm practice guides (Mewburn Ellis, HLK, Withers &
Rogers — all UK/EP patent attorney firms publishing their own practice notes):

- **Month 0:** application filed. An application number is issued immediately.
- **Months 6–9:** EPO search report, first indication of novelty and inventive step.
- **Month 18:** **application published** in the European Patent Register — the first
  moment it becomes *publicly verifiable by a third party*.
- **Months 24–60+:** examination and, if successful, grant. Five years or more is
  common.

**The CV consequence is precise and is the practically important part:**

- He can list a filing **immediately** as *"Patent application filed, [title],
  [application no.], [date] — pending"*. Honest and standard.
- But **it is not independently verifiable by a recruiter until the 18-month
  publication date.** Before that, a diligent hiring manager who searches Espacenet
  finds nothing. This is not a problem — "pending" says so — but it means a filing is
  a *weaker* verification artifact in its first 18 months than a published workshop
  paper is on day one.
- **Grant is too slow to be part of any 12-month plan.** Plan for "filed", never for
  "granted".

### 5.3 How much do European employers weight patents vs publications?

**Comparably, in industrial settings — with a caveat the prior research missed.** The
substitutability is real (ASML Fellowship, Qualcomm, Siemens' Inventor-of-the-Year
criteria requiring *"a track record in the form of granted or submitted patents"*
alongside *"contribution to revenue, measurable business success"*). But note what
Siemens pairs patents with: **revenue and business success**, not scientific novelty.
That tells you what a patent signals in European industry — commercially-relevant
invention, not scientific contribution.

**So the two currencies are not interchangeable in *meaning*, only in *weight*.** A
patent tells an industrial lab "this person invents things worth protecting". A paper
tells them "this person's reasoning survived scrutiny by people who could have
rejected it". Pradeep's positioning problem is specifically the *second* one — his
whole differentiator is rigour about undetectable failure modes. **A patent does not
demonstrate that; a validation paper does.**

This is a genuine refinement of `european-market.md` §3.2, which ranked a patent
filing first by return-per-effort. That ranking is right on *effort* and right on
*market weight*, but it is wrong on *fit to the specific thing he is trying to prove*.
**[CORRECTION.]** See §6.

### 5.4 The honest limit

Being named an inventor is **partly outside his control** — it requires the employer
to decide to file, to fund the filing, and to name him. He can raise a disclosure; he
cannot guarantee an outcome. Any plan that depends on a patent is a plan with a
single point of failure someone else owns. Treat it as a high-value opportunistic
action, not as a milestone.

---

## 6. What would actually move him — ranked, time-bounded

### The diagnosis first

His problem is **not** an absence of research work. He has done research-grade work:
a novel architectural composition with a provable correctness property, validation
against external physical ground truth, and a disproved hypothesis. His problem is
that **all of it is currently unfalsifiable assertion.** Everything a stranger can
verify — the GitHub account, the public artifacts — is *weaker* than his actual
capability, in some cases much weaker.

**This is worth stating bluntly because it is checkable and it will be checked.** His
public GitHub (`github.com/Ajishpradeep`) currently holds 20 repositories: 4 forks of
well-known projects (AOT-GAN-for-Inpainting, generative-inpainting-pytorch,
Speech-Emotion-Analyzer, stable-diffusion-webui) and 16 original repos, **every single
one with zero stars**. The original repos are mostly small, dated exercises —
`GestureControl`, `Touchless_Motor_Control`, `pi_generator`, `Object_Detection_YoloV8`,
`ViT_Eperiments` (note the misspelling, visible to anyone who looks). Nothing in that
account signals a person who architects 3D vision pipelines for professional athletes.
A hiring manager who clicks through — and research-engineer hiring managers do click
through — sees a learner's portfolio.

*Method: GitHub public API, `/users/Ajishpradeep/repos`, August 2026.*

**That is the gap. Not the missing publication. The missing artifact.**

### Next 3 months (by ~November 2026) — highest value, all under his own control

**1. Publish one deep technical writeup on the frozen-pathway adapter. [Do this first
and do it properly.]**

This is the single highest-value gap-closing action available to him, and the reasoning
is: it is the only item that (a) is entirely within his control, (b) requires no
employer permission if written at the level of *technique* rather than *product*, (c)
directly demonstrates the thing §1.3 says is actually evaluated, and (d) is named by
Anthropic as top-of-resume material.

The piece writes itself from material he already has:

> Problem: adding a capability to a deployed model without any possibility of
> regressing the existing pathway. Why the obvious approaches (fine-tuning, LoRA,
> multi-task retraining) fail the *provability* requirement — they make regression
> unlikely, not impossible, and a metric that cannot see a regression will certify it.
> The composition: Progressive Neural Networks' frozen-column idea, Side-Tuning's
> additive side network, ControlNet's zero-initialised convolutions. Why each was
> chosen. The verification: bit-identical weight diff on the deployed body pathway,
> shown. What this cost in parameters and latency.

Note that **none of this requires disclosing his employer's product, dataset or
business logic** — it is a statement about a technique and a correctness property.
Cite the three source papers properly. Show the weight-diff verification. It is a
2,000–3,000-word post plus one clean diagram.

*Effort: 15–25 hours. Verifiability: total. Permission needed: probably none, but
check.*

**2. Clean up the GitHub account.** Archive or delete the dated exercise repos. Fix
`ViT_Eperiments`. Pin three things: the writeup's accompanying repo, the transformer
mathematical walkthrough (currently not discoverable in his public repos — if it lives
elsewhere, move or mirror it), and `CarbonPass`. This is four hours of work that
changes what a stranger concludes in the first thirty seconds.

**3. Raise an invention disclosure with his employer** for the frozen-pathway adapter
and/or the deterministic-grounding rule-engine design. Ask two questions in the same
conversation: *can we file this*, and *what is the process for me to publish
methodology work externally*. **Do this before publishing anything that could
constitute prior disclosure of a patentable idea** (§4.2) — if the adapter composition
is a filing candidate, the writeup in item 1 must wait for the filing or be scoped to
exclude the novel claim. Resolve that ordering explicitly with them; do not guess.

**4. Ask whether he was named on the GTC 2025 poster** as author or presenter, and get
the citation exactly right (title, session/poster ID, venue, date, co-authors). Given
§0, this is his only named artifact from the retail work and it must be citable
precisely.

### Next 6 months (by ~February 2027)

**5. Submit one peer-reviewed validation paper.** Target **ISBS 2027** (submission
~January 2027, published in *Sports Biomechanics*) as the primary, with a **CVsports
@ CVPR 2027** submission (~March 2027) as the stretch. The paper is the anthropometric
validation of markerless 3D pose — 204 bone measurements against published ratios,
error characterisation under occlusion and fast motion, and the disproved hypothesis
as a negative-result section. Post the preprint to **SportRxiv** on submission so
there is a public, citable artifact immediately regardless of outcome.

Sequencing note: if item 3 produces a filing, this is unblocked. If the employer
refuses publication entirely, fall back to a version using only public benchmark data
(Human3.6M, 3DPW, or the published synchronised markerless-validation datasets) —
weaker, but entirely his own IP and still a real peer-reviewed paper.

**6. Make one substantive contribution to a significant open-source project in his
domain.** "Significant" means a project other people depend on — candidates in his
exact stack: `mmpose`, `ultralytics`, `coremltools`, `onnx`, `open3d`, or the
SMPL/SMPL-X ecosystem. One merged non-trivial PR to `coremltools` or `mmpose`
(e.g. a Core ML conversion path or an export fix for a pose model) is worth more than
ten personal repos, because it is *someone else's* maintainers reviewing and accepting
his code. That is external verification, which is the whole point.

### Next 12 months (by ~August 2027)

**7. Convert the writeup into a talk.** A conference or meetup talk on regression-free
adaptation or on-device 3D pose. Once one exists in writing, the talk is cheap and it
converts a written artifact into a spoken one he can point at.

**8. Second paper, or the reproduction route.** If item 5 landed, a second submission
compounds — two peer-reviewed outputs reads as a practice, one reads as an incident.
If item 5 was blocked by his employer, the **TMLR reproducibility** route (§2 item 8)
is the fallback: reproduce a published 2D-to-3D lifting result, add the on-device
quantisation ablation nobody in the literature runs, and target the certification.
Slower and harder, but entirely IP-clean.

**9. Follow the patent to its 18-month publication** and add the published application
number to the CV when it becomes third-party verifiable.

### What to explicitly *not* do

- **Do not chase a Kaggle placement.** Wrong signal for his level, and it consumes the
  time item 1 needs.
- **Do not submit to a fast-turnaround MDPI journal to "have a publication".** It
  costs money, it signals to CV specialists that he did not know the venue hierarchy,
  and JUFO's 2025 reclassification means European academics increasingly read it as a
  negative. A CVPR/WACV workshop paper is strictly better.
- **Do not pursue a part-time PhD** as a solution to this. Matsukawa's point applies:
  if the goal is *industry* research engineering, a PhD is a five-year answer to a
  six-month problem. The evidence in §3 is that the European industrial-research
  market has an explicit non-PhD door.
- **Do not attempt more than two of items 1, 5, 6 simultaneously.** Half-finished
  artifacts are worse than none.

---

## 7. How the CV should present the research evidence he already has

### 7.1 The three-heading structure

The core problem is that his research-flavoured evidence is heterogeneous — an
unlisted-authorship paper, a vendor-conference poster, a competition proposal, a
thesis — and dumping it under one heading forces the reader to compare unlike things
and to compare all of them against "Publications", which he will lose. Split it:

**Heading A — "Selected external output & recognition"** (as `european-market.md` §3.2
establishes; retained). This holds the GTC poster and the TAITRA win. It is a heading
whose name makes no authorship claim and no publication claim.

**Heading B — no heading at all.** The *Scientific Reports* paper is not a CV entry.
It is a **parenthetical citation inside the President Information Corp role bullet**,
supporting a metric. See §7.3.

**Heading C — Education.** The MSc thesis is a one-line item under the degree, per ETH
industry convention: state the title, add detail only where relevant. His is relevant
— "GAN combining contextual and spatial attention for inpainting in low-data regimes"
signals both generative modelling depth and the low-data constraint that recurs
throughout his work.

**There must be no "Publications" heading on this CV.** Not empty, not with a
disclaimer. Its presence invites the comparison he loses; its absence is unremarkable
on a research-*engineer* CV.

### 7.2 The GTC poster — promote it

Given §0, this is his only named research output, and §2 item 6 shows the selection
process is committee-reviewed against technical criteria. Present it with the process
implied rather than asserted:

> **NVIDIA GTC 2025** — technical poster, *Scalable Vision AI for Planogram
> Compliance* (San Jose, March 2025). Selected by the GTC content committee from
> open submission; presented the multi-store vision architecture behind [system].

The words "selected... from open submission" do real work: they distinguish this from
attendance without over-claiming peer review. **Only include the selection clause if
he can confirm the poster went through the open call** (as opposed to being placed via
a partner/sponsor slot) — see gaps §8.

### 7.3 The *Scientific Reports* paper — the exact wording

The constraint is absolute and now evidentially grounded: he is not an author, he is
not acknowledged, and his name appears nowhere in the document. The paper's function
is to make his own claims *checkable*, and the citation must be constructed so that a
reader who follows it finds what they expect — a description of the system, with
someone else's name on it.

Recommended form, as a sub-line under the President Information Corp role:

> Led the vision architecture for the shelf-monitoring system deployed across 7,000+
> 7-ELEVEN stores in Taiwan (99.23% precision / 98.93% recall). The system is
> described in Ou et al., *"Real-time retail planogram compliance application using
> computer vision and virtual shelves"*, **Scientific Reports** 15 (2025) —
> *published by the company; I am not an author.*

Four things this does, all deliberate:

1. **"Led the vision architecture"** — the verb, his. The noun (the paper) is
   attributed to Ou et al. explicitly.
2. **Names the actual first author.** This is the single strongest possible signal of
   scrupulousness. A reader who checks finds exactly what the CV said they would.
3. **"I am not an author"** stated *before* the reader can wonder. This converts a
   potential integrity question into an integrity *demonstration*. Under ALLEA's Code
   (`european-market.md` §4), misrepresenting *involvement* is the named violation;
   pre-empting it is the strongest available compliance.
4. **Places it as evidence for the metrics**, which is its real function — the 99.23%
   figure is no longer self-reported.

Do not soften "I am not an author" to "co-developed" or "contributed to". The absence
of any acknowledgement means there is no document supporting a softer claim, and a
softer claim is the only version that could go wrong.

**One caveat worth internalising:** because he is nowhere in the paper, the citation
proves the *system's* performance but not *his role in it*. His role rests on his
employment record and on the GTC poster. Anyone senior will notice this. He should be
ready to say, in one unembarrassed sentence, why he is not on the paper — the honest
version ("the paper was written by the research group at the corporate parent; I led
the vision architecture on the engineering side and the authorship followed the
academic collaboration, not the build") is entirely creditable and far better than
appearing to have avoided the question.

### 7.4 Making the architecture work read as research

`domain-demand.md` correctly identifies this as the under-sold material. The
formulation that makes it read as *research* rather than *engineering* is: **decision
→ rejected alternative → correctness property → verification method.**

> Designed a regression-free adapter for a deployed 3D body model — composing frozen
> pathways (Progressive Neural Networks), an additive side network (Side-Tuning) and
> zero-initialised convolutions (ControlNet) — because fine-tuning and LoRA make
> regression *unlikely* but not *impossible*, and a metric that cannot see a
> regression will certify it. Deployed body pathway verified **bit-identical** to the
> base model by weight diff.

Every clause is falsifiable. That is what separates it from a claim.

The same template applied to the two other rigour artifacts:

> Validated 204 derived bone measurements against **published anthropometric ratios**
> rather than internal consistency, on the principle that a system checked against
> itself cannot detect a systematic bias.

> Audited a 69-rule engine by flagging rules firing on **100% of sessions** as
> self-detecting bugs; constrained the LLM to narration with **zero LLM-computed
> numbers**, so that no user-facing figure can be hallucinated by construction.

And — this one is undervalued and should be on the CV, not saved for interview:

> Tested and **disproved** a product hypothesis against real session data before it
> reached users.

A hiring manager reading a CV that volunteers a disproved hypothesis learns something
about the candidate that no metric conveys. It is also the only bullet on the CV that
a padding-detector cannot construct a cynical reading of.

### 7.5 The title question

**He should use "AI Research Engineer" without hedging.** It is his actual job title
at his current employer, which removes the self-assignment risk entirely; and §1 and
§3 establish that it is a real, well-defined track with a published non-PhD entry
route. `european-market.md` §3.2 already concludes he should stop benchmarking against
a Research Scientist bar; §0 and §6 add the reason it matters: the thing standing
between him and that title being credible is **inspectable evidence**, not a
publication record — and inspectable evidence is something he can produce in three
months by himself.

---

## 8. Sources, with credibility notes

### Employer and venue primary sources — high confidence

| Source | Type | Why credible | Used for |
|---|---|---|---|
| [Anthropic Careers](https://www.anthropic.com/careers) | Employer primary, live | The company's own published hiring philosophy | "half our technical staff had no prior ML experience"; blog/OSS/independent research at top of resume; engineers as first authors |
| [imec — Senior AI Research Engineer, Underwater Perception](https://www.imec-int.com/en/work-at-imec/job-opportunities/senior-ai-research-engineer-underwater-perception) | Employer primary, live posting | European industrial research institute, research-titled senior role | *"PhD ... **or 5+ years of relevant industrial experience**"*, no publications mentioned |
| [imec — AILabs Research Engineer](https://www.imec-int.com/en/work-at-imec/job-opportunities/ailabs-research-engineer) | Employer primary | Same | No degree requirement stated at all |
| [Inria — External competitive recruitment](https://www.inria.fr/en/external-competitive-recruitment-procedure) | Institution primary | France's national CS research institute, own recruitment rules | *Ingénieur de recherche* grade at RNCP level 7 (Master's); foreign-diploma equivalence; nationality restrictions |
| [Siemens — Inventors of the Year 2024](https://press.siemens.com/global/en/pressrelease/siemens-honors-2024s-leading-inventors) | Company press office | Siemens' own audited innovation figures | 5,250 inventions FY2024; 2,900 patents registered; ~53,000 R&D staff; nomination criteria |
| [Ou et al., *Sci Rep* 15 (2025)](https://www.nature.com/articles/s41598-025-27773-5), DOI 10.1038/s41598-025-27773-5 | Peer-reviewed primary | The paper itself | Full author list, Contributions and Acknowledgements verbatim; confirms his absence |
| [OpenAlex API](https://api.openalex.org/works/doi:10.1038/s41598-025-27773-5) | Open bibliographic database | Independent authorship record | Corroborates author list and affiliations |
| [CVsports @ CVPR 2026 — Call for Papers](https://vap.aau.dk/cvsports/12th-international-workshop-on-computer-vision-in-sports-cvsports-at-cvpr-2026/call-for-papers/) | Workshop organisers' own site (Aalborg Univ.) | The venue's own CFP | Full topic list; 5 Mar deadline, 25 Mar notification, "no extensions possible" |
| [WACV 2027 Dates](https://wacv.thecvf.com/Conferences/2027/Dates) | Conference primary (CVF) | Official conference site | Conference 4–8 Jan 2027; workshops 4–5 Jan; camera-ready 2 Nov 2026 |
| [CVF Open Access — CVPR Workshops](https://openaccess.thecvf.com/CVPR2025_workshops/menu) + [DBLP CVPR](https://dblp.org/db/conf/cvpr/index.html) | Repository and bibliographic primary | CVF's own repository; DBLP is *the* CS bibliography | Workshop papers are archival, IEEE Xplore-mirrored, DBLP-indexed |
| [ISBS 2026 Call for Papers (Biomch-L)](https://biomch-l.isbweb.org/forum/biomch-l-forums/events-and-conferences/49218-isbs-2026-call-for-papers-loughborough-university-uk) | Society CFP on the biomechanics community's own list | ISBS is the field's professional society | Submission 23 Jan → notification 13 Apr → conference late Jul; accepted abstracts published in *Sports Biomechanics* |
| [ISBS Proceedings Archive](https://commons.nmu.edu/isbs/) | Society proceedings repository | Hosted by Northern Michigan University | Existing markerless-mocap validation literature at the venue |
| [arXiv — updated endorsement policy](https://blog.arxiv.org/2026/01/21/attention-authors-updated-endorsement-policy/) | Operator primary | arXiv's own blog | Institutional email no longer sufficient for endorsement, from 21 Jan 2026 |
| [NeurIPS blog — MLRC 2026 official track](https://blog.neurips.cc/2026/05/04/mlrc-2026-reproducibility-as-an-official-track-at-neurips/) + [MLRC 2026 CFP](https://reproml.org/call_for_papers/) | Conference primary | NeurIPS' and MLRC's own announcements | Reproduction route via TMLR certification |
| [GitHub API — /users/Ajishpradeep/repos](https://github.com/Ajishpradeep) | Direct observation | His own public account | 20 repos, 4 forks, all zero stars |

### Named practitioners — high confidence, with declared interests

| Source | Why credible | Interest to declare |
|---|---|---|
| [Chip Huyen, *ML Interviews Book* §1.1.2.2](https://huyenchip.com/ml-interviews-book/contents/1.1.2.2-research-scientist-vs.-research-engineer.html) | Writes under her own name; ex-NVIDIA/Snorkel/Netflix; author of two O'Reilly books; Stanford instructor | Sells books; the free online book is not itself a commercial product |
| [Akihiro Matsukawa, *Research Engineering FAQs*](https://mtskw.com/posts/re/) | Named; ex-Dropbox, ex-DeepMind research engineer, now Citadel; writing about the role he held | None apparent — personal blog, nothing sold |

### Credible reporting and institutional decisions — high confidence

| Source | Why credible | Used for |
|---|---|---|
| [Retraction Watch — Finland downgrades Frontiers and MDPI](https://retractionwatch.com/2024/12/24/finland-publication-forum-will-downgrade-hundreds-of-frontiers-and-mdpi-journals) | Specialist research-integrity outlet with a strong correction record | JUFO's Dec 2024 decision: 271 journals to level 0 (187 MDPI, 82 Frontiers) |
| [Times Higher Education — Finland downgrades MDPI and Frontiers](https://www.timeshighereducation.com/news/finland-downgrades-mdpi-and-frontiers-will-others-follow-suit) | Established higher-education trade press | Same, plus the funding-model consequence 2025–2028 |
| [Publication Forum (JUFO) — Grey area journals to level 0](https://julkaisufoorumi.fi/en/news/grey-area-journals-level-0) | The deciding body's own announcement | The stated rationale, verbatim |
| EPO timelines: [Mewburn Ellis](https://www.mewburn.com/law-practice-library/european-patents-the-basics), [HLK](https://www.hlk-ip.com/knowledge-hub/european-patent-prosecution-2/), [Withers & Rogers timeline PDF](https://www.withersrogers.com/wp-content/uploads/2025/02/WR-Timelines-European-Patent-Application-timeline.pdf) | Three independent European patent attorney firms publishing practice notes; mutually corroborating | Filing → search 6–9m → publication 18m → grant 24–60m+ |

### Medium confidence — substance sound, exact wording unverified

- **Bosch Research, Research Engineer Deep Learning Perception** — *"an excellent
  degree (PhD or Master)"*. The SmartRecruiters posting had **expired** by the time of
  fetching; wording captured via search extraction. Substance is a standard German
  industrial formulation and is very likely accurate.
- **Fraunhofer Computer Vision / Data Science Research Scientist** — *"a university
  degree (diploma, master, or doctorate)"*. Source aggregator returned **HTTP 403**;
  `fraunhofer.de` and `dfki.de` **also returned 403** to direct fetches. Corroborated
  indirectly by Fraunhofer's German-language *wissenschaftliche Mitarbeiter* postings,
  which routinely require a Master's with an optional concurrent doctorate.
- **Google DeepMind Research Engineer — "preprints" in minimum qualifications.**
  Captured from a Glassdoor mirror; Google Careers is an SPA and does not render to
  fetch (the same failure `european-market.md` §7 records). **Re-verify before
  quoting.** If accurate it is a significant finding for the arXiv route.
- **NVIDIA GTC poster review criteria** — the 2026 call has closed and the 2024
  submission portal did not render. Criteria text captured via search extraction from
  NVIDIA's own pages. High confidence on substance (a content committee reviews,
  rates and selects against technical criteria; extended abstract with results
  required); medium confidence on exact wording.

### Rejected sources, and why

Named here so the absence of certain "findings" is understood as deliberate:

- **recruitingfromscratch.com, kore1.com, jobsbyculture.com, recruitslab.com,
  ophyai.com, interviewquery.com, norahq.com, getbridged.co, underdog.io, eujobs.co**
  — recruiting-agency and interview-prep content marketing. Several produced
  plausible-sounding claims about hiring bars with no named author and no sourcing.
  Not used.
- **enhancv, resumeworded, visualcv, createresume, resumeoptimizerpro, Indeed Career
  Advice** — resume-template mills. The entire first page of results for "listing
  patents on a resume" was this material. **Nothing in §5 rests on it**; the patent
  timeline comes from patent attorneys and the weighting from employer postings.
- **geeksforgeeks, refontelearning, goperfect** on Kaggle's hiring value — course and
  service marketing. The absence of credible evidence *is* the finding (§2 item 9).
- **manusights.com, predatoryjournals.org** on MDPI — SEO-driven journal-assessment
  sites. The MDPI finding rests on JUFO, Retraction Watch and THE instead.
- **dev.to post on workshop papers for PhD admissions** — anonymous handle, wrong
  audience (admissions, not industry hiring). Its "DBLP-indexed / identifiable PC"
  heuristic was independently verified against DBLP and CVF rather than relied on.
- **arXiv:2601.06087, "The AI Roles Continuum"** — a December 2025 cs.CY preprint by a
  single author with **no listed institutional affiliation**, analysing public job
  descriptions. Topically on-point but it is an unreviewed preprint restating what the
  primary sources say directly. Not used as evidence.
- **Sifted (Hugging Face hiring), OpenAI interview guide** — both returned **HTTP 403**.
  Would have been good sources. The OpenAI "research taste" material is therefore
  reported at low confidence via secondary channels and nothing rests on it.

---

## 9. Honest gaps

1. **Is he named on the GTC 2025 poster, and how?** Author, co-author, presenter, or
   listed under the company? And did it come through the **open call** or a
   partner/sponsor slot? §7.2's wording depends on the answer. He knows; nobody else
   can find out. **Highest-value unknown in this document.** (`european-market.md` §7
   flagged this too; still open, and now more important given §0.)
2. **Does his employment contract permit external publication, and what is the
   approval process?** Everything in §4 and §6 item 5 is blocked on this and it is
   unknowable from outside. Ask.
3. **Do IdeasLab Formosa or President Information Corp already have filings naming
   him?** Carried forward from `european-market.md` §7 and still open. A five-minute
   Espacenet / Google Patents search on his name would resolve it and was not
   performed here (name variants unknown; inventor names on Taiwanese corporate
   filings are frequently romanised inconsistently).
4. **MPI-IS and DFKI research-engineer routes could not be verified.** Both sites
   returned HTTP 403. The §3.5 conclusion about Max Planck is inferred from the
   visible PhD/postdoc-dominated recruitment structure, not from a stated policy.
   Treat as unconfirmed.
5. **CVPR 2027 and ISBS 2027 exact deadlines are not yet published.** Dates in §4.3
   for those are **projected from the 2026 cycle**, not announced. He must check the
   actual CFPs — CVsports states "no extensions possible", so a projection error is
   fatal to that route.
6. **Whether *Sensors* specifically retained JUFO level 1** is unverified. The claim
   came from a rejected source. If he ever seriously considers that venue, check
   julkaisufoorumi.fi directly.
7. **No source was found that quantifies the *marginal* hiring effect of any single
   substitute.** Nobody publishes "a workshop paper raises interview probability by
   X%". Every weighting in §2 is a synthesis of qualification language and
   practitioner statements, not a measurement. The ranking is defensible; it is not
   empirical.
8. **The evidence base is thin on European labs' treatment of *non-EU* candidates
   without EU work authorisation.** §3 establishes the qualification bar; it says
   nothing about whether these labs sponsor. `aprc-scope.md` covers the residency
   position; the intersection — "will imec/Fraunhofer sponsor an Indian citizen
   holding Taiwanese APRC into a research-engineer role" — was out of scope here and
   is a real unknown that could dominate everything above.
9. **The transformer mathematical walkthrough was not found** in his public GitHub
   repositories. If it exists elsewhere (a gist, his site, Medium), it is currently
   invisible to anyone who looks at the account the CV will link to. Locate and pin
   it, or accept that it does not count as evidence.
