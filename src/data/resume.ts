/**
 * The single source of truth for the resume — the `/resume` page and the PDF
 * export both render from this file and nothing else.
 *
 * Every claim traces to `docs/PROFILE.md`, which traces to the rest of
 * `src/data/*.ts`. What earned a place and what did not is argued in
 * `docs/resume-content-decisions.md`; treat that document as the changelog for
 * edits here. If you want to add a claim, it has to be true on the site first.
 *
 * Two conventions worth knowing before editing:
 *
 * `**double asterisks**` mark inline emphasis, parsed by `src/lib/emphasis.ts`
 * and rendered as real bold in both surfaces. Emphasis is spent on measured
 * results and externally verifiable facts — never on adjectives, never on a
 * self-assessment. If a bolded run is not a number or a checkable proper noun,
 * it is almost certainly wrong.
 *
 * `orgLocal` exists because the PDF and the web page have different glyph
 * budgets. The employer's registered Chinese name belongs on screen, where the
 * system fonts can draw it; the PDF embeds a subset Latin font, and an earlier
 * version rendered 統一資訊 as mojibake in the middle of a job title. The
 * English name is the legal one and carries the meaning for the reader this
 * document is for.
 */

export type ResumeRole = {
  title: string;
  org: string;
  /** Registered local-language name. Web only — see the note above. */
  orgLocal?: string;
  place: string;
  period: string;
  bullets: string[];
};

export type ResumeEducation = {
  degree: string;
  org: string;
  place: string;
  period: string;
  detail?: string;
};

export type ResumeRecognition = {
  title: string;
  venue: string;
  year: string;
  detail?: string;
};

export type ResumeProject = {
  name: string;
  year: string;
  description: string;
};

export const resume = {
  name: 'Pradeep Rajasekar',
  alias: 'Ajish Pradeep',
  role: 'AI Research Engineer',

  /*
    Carries the title, which the previous version did not — and that omission
    was its real defect. A headline with no title cannot establish an identity,
    it can only list topics.

    "AI Research Engineer" is his employer-given title, so claiming it costs
    nothing and is verifiable two inches below. The market supports it: the
    publication gate attaches to the noun *Scientist*, not to *Research*. Bosch
    posts Research Engineer as "PhD or Master's + 3 years" with publications
    unmentioned, and AI Research Scientist with a top-venue publication record
    under Basic Qualifications. Meta's AI Research Engineer minimum is a
    Bachelor's. He must never claim a *Scientist* title.

    "Applied LLM Systems" was cut. Since swyx's 2023 essay, "AI Engineer" has
    come to mean someone building on foundation-model APIs, so the AI prefix
    already risks reading as LLM app builder; leaving an LLM term beside it
    turns a survivable ambiguity into a conclusion. The LLM work stays in the
    skills and in the experience, where it reads as range rather than as
    identity.

    "On-Device Perception" rather than "On-Device Inference" buys the
    "perception" keyword family, which he had zero coverage on and which is
    what the postings that want him actually say.

    No level word. He is borderline senior — over the bar on published
    behavioural criteria, under it on tenure — so he applies to Senior
    requisitions and lets the evidence carry it, rather than self-assigning a
    rank. See title-positioning.md and seniority-trajectory.md §6.
  */
  headline: 'AI Research Engineer — 3D Computer Vision, On-Device Perception',

  location: 'New Taipei City, Taiwan',
  /*
    REVERTED 2026-08-16, on Pradeep's explicit instruction. This read
    "Relocating to Europe" — a deliberate call to state intent rather than
    tolerance, argued for in framing-decisions.md §"what I decided against".
    He overruled it directly: no explicit target market in the header. "Open
    to relocation" back to a plain, generic tolerance statement.
  */
  relocation: 'Open to relocation',
  email: 'ajishpradeep@gmail.com',

  /*
    RESOLVED 2026-08-16, after aprc-scope.md and relocation-routes.md.

    Three decisions are baked into this one short line.

    *Blue Card eligibility is stated, because it is true and it is the answer
    to the only question a European recruiter silently asks.* His MSc is a
    two-year second-cycle degree from a state university, which is what
    Directive (EU) 2021/1883 contemplates, and § 18g AufenthG puts ISCO 21 and
    25 on the German shortage list — so the reduced 2026 threshold of
    €45,934.20 applies, which sits far below any realistic offer for this work.
    The research is emphatic that authorisation is stated as a fact with a
    named mechanism, never as a request: "eligible for", never "seeking
    sponsorship". Recruiters reject uncertainty, not cost.

    *Nationality is omitted.* European CV convention omits it, and naming it
    invites exactly the filtering the convention exists to prevent. "Blue Card
    eligible" already implies non-EU, so the useful signal survives without
    the protected characteristic.

    *The APRC is omitted, and this is the counter-intuitive one.* It is his
    strongest legal status and it is worth nothing here. Spelled out,
    "Permanent Resident of Taiwan" reads as *settled elsewhere* and hands a
    screener a relocation-probability objection; left as an acronym it reads as
    noise. It reverses entirely for Taiwan and APAC applications, where
    "Taiwan permanent resident (APRC) — no work permit or sponsorship
    required" is a real asset and should be swapped in.

    Deliberately NOT claimed here: a degree-comparability statement. The ZAB
    Statement of Comparability (€208, ~2 weeks on the Blue Card fast-track) is
    the highest-leverage thing he can start this week, but he has not started
    it, so it is not on the CV. Add "MSc (ZAB comparability statement
    available)" once it is in hand.

    PLACEMENT, decided 2026-08-16 on Pradeep's explicit direction: demoted —
    kept in the header block but as its own quieter secondary line, not mixed
    in with name/email/links. He was offered a true PDF footer as an option
    and specifically didn't choose it: this project's own ATS research found
    that parsers frequently drop header/footer content, and some ATS
    platforms let recruiters filter on work-authorisation terms specifically —
    a footer risks the line existing on the page but never being found by
    exactly the search it exists to answer. See both renderers for how
    "demoted" is expressed: smaller, muted, its own line.

    ROUND TRIP, 2026-08-16. A `residency: 'Taiwan APRC holder'` field briefly
    existed here, added on Pradeep's explicit instruction overriding the
    omission above (he was told the reasoning and chose to include it anyway,
    which is a call the profile owner is entitled to make). He then read the
    reasoning again, agreed with it, and asked for it back out — so it is
    gone from both renderers, not just hidden. No live field for it; if it
    comes back, it comes back as a genuinely new decision, not a revert of
    this one. Nothing to correct in framing-decisions.md or
    resume-content-decisions.md: neither was ever edited to claim APRC
    appears on the resume, so both were already accurate through the whole
    round trip.
  */
  workAuthorization: 'EU Blue Card eligible',

  /*
    REVISED 2026-08-16, on Pradeep's explicit instruction, twice. First pass
    dropped Tamil and Malayalam entirely — both are Indian regional languages
    carrying no signal for a European hiring audience, and their presence was
    cluttering the one contact line that's supposed to be scannable in under
    ten seconds. Still true on the site's About page ("EN · TA · ML"), which
    documents the whole person; the resume is the subset that earns its place
    for this audience.

    Second pass added Chinese (Basic) — a fact he supplied directly (years
    living and working in Taipei), not previously stated anywhere on the site,
    and not something I would have inferred or asserted on his behalf.

    English is qualified because it's evidenced, not assumed — an
    English-taught MSc, an international proposal written solo, and being sent
    to present in Warsaw. Pradeep should add a CEFR level for English before
    sending, and confirm "Basic" is the right band for Chinese.
  */
  languages: 'English (professional) · Chinese (Basic)',
  links: [
    { label: 'GitHub', value: 'github.com/Ajishpradeep', href: 'https://github.com/Ajishpradeep' },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/ajishpradeep',
      href: 'https://linkedin.com/in/ajishpradeep',
    },
  ],

  /*
    Capability is the subject; the sport is a prepositional phrase. That is the
    whole rule, and it comes from evidence rather than taste. A sweep of 3,782
    live postings — over a company list deliberately stacked toward
    motion-adjacent employers — found human-motion terms in 25 of them and "3D
    human pose" in exactly one, against 69 mentioning on-device or edge
    inference. His deployment substrate is roughly 3× more in demand than his
    domain. The vertical's own employers agree: Catapult *requires* multi-view
    geometry, camera calibration and TensorRT quantisation, then files "a
    genuine interest in sports analytics" under nice-to-have.

    So the paragraph opens on the durable layer and the sport appears only as
    proof that it shipped. "PGA Tour professionals" rather than "golf swing
    analysis" — the first is credibility, the second is narrowness, and they
    describe the same product.

    The retail work stays in, and stays visible: retail → sport is the
    counterexample that disproves the pigeonhole a reader might otherwise
    infer.

    No year count. "4+ years" hands a screener a seniority band before they
    have seen any evidence. It is also a question Europe mostly is not asking —
    71% of European postings state no years requirement at all, including 70%
    of Senior-titled ones, and Acas advises employers that year counts risk
    indirect age discrimination.

    "Motion capture" stays cut: in posting language it reads as VFX and
    hardware rather than perception, and leading with "biomechanics" reads as
    sports science and narrows a substrate that is domain-agnostic.
  */
  summary:
    'AI research engineer building 3D human-motion perception that runs entirely **on device**. Led the 3D pose estimation and lifting stack behind an iOS app used by **PGA Tour professionals** — full analysis pipeline on Apple ARM silicon, no cloud round-trip, no footage leaving the handset. Previously led the vision architecture for an open-set retail recognition system running across **7,000+ stores**. Methodology selected for a technical poster at **NVIDIA GTC 2025**.',

  /*
    Wording here is matched to the terms real postings use — "3D human pose
    estimation", "multi-view geometry", "camera calibration", "3D perception",
    "Core ML" (Apple's own two-word spelling), "edge deployment" — because this
    block is doing double duty as the keyword surface and as the thirty-second
    triage a human performs. Group order is a claim about market position: the
    3D vision depth is the scarce thing, the on-device work is the other scarce
    thing, and the LLM systems work is real and current but is third on purpose.
    Presenting this profile as a generalist LLM engineer would put it in the
    modal pile; presented as a 3D specialist it is top-decile.
    See docs/resume-research/domain-demand.md.
  */
  skills: [
    {
      group: '3D vision',
      items: [
        '3D human pose estimation',
        '2D-to-3D lifting',
        'Multi-view geometry',
        'Camera calibration',
        '3D reconstruction',
        'Triangulation',
        'Body tracking',
        '3D perception',
      ],
    },
    /*
      On-device sits second, directly under 3D vision, because those are the
      two halves the headline claims and because this is the scarcer of them.
      It is also the durable one: foundation-model geometry (VGGT, MASt3R,
      DUSt3R) runs at 8–15 FPS on desktop GPUs and OOMs on an 8GB laptop card,
      against a phone's <4GB and a 30–50× memory-bandwidth gap. That work is
      data-centre technology; this profile ships inside a power budget.
    */
    {
      group: 'On-device & edge',
      items: [
        'Apple Core ML',
        'ARM / edge deployment',
        'NVIDIA TensorRT',
        'DeepStream',
        'TAO Toolkit',
        'Quantization & compression',
      ],
    },
    {
      group: 'Perception',
      items: [
        'Object detection (YOLO, DETR)',
        'Open-set recognition',
        'Metric learning / triplet loss',
        'Embedding retrieval',
        'Temporal consistency',
        'Occlusion robustness',
      ],
    },
    {
      group: 'LLM systems',
      items: [
        'Agentic workflows & tool use',
        'RAG',
        'Structured grounding',
        'Fine-tuning',
        'Evaluation design',
      ],
    },
    {
      group: 'Engineering',
      items: [
        'Python',
        'PyTorch',
        'TensorFlow',
        'JAX',
        'HuggingFace',
        'NumPy',
        'GCP Vertex AI',
        'JavaScript',
      ],
    },
  ],

  experience: [
    {
      title: 'AI Research Engineer',
      org: 'IdeasLab Formosa',
      place: 'Taipei, Taiwan',
      /*
        DATES UNVERIFIED — Pradeep to confirm.

        European convention expects month precision, and a year-only range
        reads as evasive there. The site gives years only; these months come
        from his own earlier resume draft, which is his own claim rather than
        my inference — but it is a weaker source than the site and has not been
        checked. Confirm all three roles before sending.
      */
      period: 'May 2025 — Present',
      bullets: [
        'Led R&D on the 2D-to-3D human pose lifting system behind **XView AI**, a markerless golf-swing analysis app: reduced mean per-joint 3D error **8 cm → 3 cm** (pelvis-relative) through temporal consistency modelling, motion-aligned lifting and spatial refinement, with **+30%** reconstruction fidelity under occlusion and fast motion.',
        'Shipped the full analysis pipeline **on-device** on Apple ARM silicon via Core ML — no cloud round-trip, no footage leaving the handset — in an iOS app used by **PGA Tour professionals**.',
        'Extended the pose model to club tracking without regressing the general body model: froze the backbone and every body keypoint channel and trained through a parallel adapter, leaving the deployed body pathway **bit-identical** to the base model (verified by weight diff) while club accuracy reached production quality.',
        'Diagnosed and corrected calibration and reconstruction faults across the multi-camera stack — **4.8×** lower reconstruction noise and **−73%** event-detection timing error — validated against published anthropometric ratios over **204** bone measurements.',
        'Architected a domain-grounded agentic LLM coaching system in which a deterministic rule engine computes every number and the model is constrained to narration, making fabricated biomechanics structurally impossible rather than merely unlikely; **69** weighted rules, **8** languages. Validated the rulebook against real sessions — rules firing on 100% of sessions were self-detecting bugs, and one intuitive explanation for a misfire was tested and disproved before it reached a user.',
        'Authored the technical proposal that won TAITRA’s **“Go Healthy with Taiwan” 2025** award — **1 of 3 winners from 638 proposals across 55 countries**.',
      ],
    },
    {
      title: 'AI Engineer',
      org: 'President Information Corp',
      orgLocal: '統一資訊',
      place: 'Taipei, Taiwan',
      period: 'Nov 2023 — Feb 2025',
      bullets: [
        'Led the vision architecture for a real-time planogram compliance system — dense detection for localisation, a fine-tuned triplet-loss embedding space for identity — so adding a product costs vectors instead of a retraining run. Deployed across **7,000+ 7-ELEVEN stores** in Taiwan; the system’s results (**99.23% / 98.93%** precision / recall on shelf detection) are documented in Ou et al., *Scientific Reports* (2025).',
        'Presented the methodology as a **technical poster at NVIDIA GTC 2025**.',
        'Deployed occlusion-robust handheld product recognition into Taiwan’s **8th unmanned 7-Eleven store**, a **+30%** recognition gain under motion blur and arbitrary orientation.',
        'Built production inference on NVIDIA Metropolis microservices, TAO Toolkit, DeepStream and TensorRT across cloud and edge, in collaboration with NVIDIA.',
        'Built an LLM-assisted named-entity-recognition pipeline on GCP Document AI, and a predictive model over **5M+** data points at 95% confidence informing marketing and inventory decisions.',
      ],
    },
    {
      title: 'Software Developer',
      org: 'AIBS Software Solutions',
      place: 'Coimbatore, India',
      period: 'May 2017 — Aug 2021',
      bullets: [
        'Built full-stack ERP systems for manufacturing workflows; engineered inventory and tax tracking that resolved **95%** of reported discrepancies.',
      ],
    },
  ] satisfies ResumeRole[],

  /*
    Its own section rather than folded into the role bullets, because every
    entry is corroborated by a source outside his own account — the property
    that makes a claim survive a cold reading by someone with no context and no
    reason to extend trust.

    The Scientific Reports paper is deliberately NOT listed here, and the case
    is now settled rather than cautious. Verified against OpenAlex and the
    article itself: four authors — Ou, Ponce, Lee, Wu, all President
    Information Corporation — and an Acknowledgements section that thanks only
    an NSTC grant. He appears nowhere in it. So the paper is not evidence about
    him under any framing; it is evidence that the *system* is real and
    performs as stated. A paper title under a research heading reads as a
    publication claim however the line beneath is worded, so it stays in the
    role bullet, cited as "Ou et al." — naming the actual authors is what makes
    non-authorship self-evident, and it does that without the trailing
    disclaimer an earlier draft used, which read as apologising for being on
    the page.

    That verification has a second consequence: the GTC poster is the only
    externally verifiable artifact carrying his own name, which is a stronger
    reason to give it weight than the first research pass assumed. Its entry
    says "selected" because NVIDIA's poster call is committee-reviewed against
    technical criteria with an extended abstract required — it is not
    attendance.
  */
  recognition: [
    {
      title: '“Go Healthy with Taiwan” — Winner',
      venue: 'TAITRA · Taiwan Excellence',
      year: '2025',
      detail:
        'Sole author of the winning technical proposal; award to IdeasLab Formosa. **1 of 3 winners from 638 proposals across 55 countries**, USD 30,000.',
    },
    {
      title: 'Scalable Vision AI for Planogram Compliance',
      venue: 'NVIDIA GTC 2025 — Technical Poster',
      year: '2025',
      detail:
        'Selected by technical review from an extended abstract. Research-to-production methodology for open-set retail product recognition.',
    },
    {
      title: 'Taiwan Expo Europe — engineering representative',
      venue: 'TAITRA · EXPO XXI Warsaw',
      year: '2026',
      detail:
        'Selected to present the 3D motion-analysis work under the Taiwan Excellence banner.',
    },
    {
      title: 'The Transformer Architecture — a mathematical walkthrough',
      venue: 'Public technical writing · github.com/Ajishpradeep/Case_Study',
      year: '2024',
      detail:
        'One worked example carried from tokenisation and positional encoding through multi-head self-attention to the decoder’s masked attention.',
    },
  ] satisfies ResumeRecognition[],

  education: [
    {
      degree: 'MSc, Electrical Engineering & Computer Science',
      org: 'National Taipei University of Technology',
      place: 'Taipei, Taiwan',
      period: '2021 — 2023',
      detail:
        'GPA 3.8/4.0. Thesis: *Content and Spatial Aware Generative Model for Inpainting* — a GAN architecture combining contextual and spatial attention for low-data regimes.',
    },
    {
      degree: 'BSc, Information Technology',
      org: 'Sri Ramakrishna Mission Vidyalaya College',
      place: 'Coimbatore, India',
      period: '2011 — 2014',
      detail: 'GPA 7.9/10.',
    },
  ] satisfies ResumeEducation[],

  projects: [
    {
      name: 'CarbonPass',
      year: '2026',
      description:
        'Local-first vision-language model turning a factory’s photographed paperwork into EU **CBAM** carbon accounting, with MILP production scheduling. Runs on-premise so documents never leave the building. *github.com/Ajishpradeep/CarbonPass*',
    },
    /*
      pi_generator was cut here, and the reason is worth keeping. A review of
      the public GitHub found 20 repositories, four of them forks, every one at
      zero stars, and mostly dated exercises — so the account a hiring manager
      opens after reading this CV currently reads as a learner's portfolio
      rather than as evidence. Against that backdrop, listing a
      distribution-comparison exercise beside a substantial 2026 build makes
      the strong one look like the exception. One project that earns the space
      is worth more than two that average out.

      The real fix is not a CV edit: the highest-value action available to him
      is publishing a deep technical writeup of the frozen-pathway adapter —
      roughly 20 hours, no employer permission needed at technique level, and
      it converts his single strongest claim from assertion into something a
      reader can check. Raise an invention disclosure first; publishing can
      destroy patent novelty and that door does not reopen.
    */
  ] satisfies ResumeProject[],
} as const;
