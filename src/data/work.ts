import type { VisualKind } from '../components/CaseVisual';

export type Metric = { value: string; label: string };

export type Section = { heading: string; body: string[] };

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  org: string;
  period: string;
  domain: string;
  role: string;
  stack: string[];
  /** One-line hook used on the index. */
  teaser: string;
  metrics: Metric[];
  /** The constraint that made the problem hard. */
  problem: string;
  sections: Section[];
  outcome: string[];
  /** Which animated diagram accompanies this study. */
  visual: VisualKind;
  featured: boolean;
};

export const work: CaseStudy[] = [
  {
    slug: 'markerless-3d-motion',
    index: '01',
    title: 'Markerless 3D motion capture, on a phone',
    subtitle:
      'A 29-keypoint pose model and 2D-to-3D lifting stack that put full golf-swing biomechanics on a phone — body and club, from two consumer cameras, with nothing leaving the device.',
    org: 'IdeasLab Formosa',
    period: '2025 — present',
    domain: 'Computer Vision · 3D Geometry · Edge AI',
    role: 'R&D lead — architecture, training, deployment',
    stack: [
      'PyTorch',
      'YOLO-pose',
      'CoreML',
      'Temporal lifting (TCPFormer-family)',
      'Multi-view geometry',
      'Apple Vision',
    ],
    teaser:
      'Getting 3cm 3D joint accuracy out of a phone camera, without letting a sport-specific model quietly corrupt the general body model underneath it.',
    metrics: [
      { value: '8cm → 3cm', label: 'mean per-joint error, pelvis-relative' },
      { value: '0.000px', label: 'body drift, verified by weight diff' },
      { value: '+30%', label: 'fidelity under occlusion' },
      { value: 'On-device', label: 'no cloud, no footage leaves the phone' },
    ],
    problem:
      'Markerless motion capture that PGA professionals will actually trust needs mocap-grade 3D from two consumer cameras, on an ARM device — while tracking a golf club that moves faster than the shutter and disappears behind the body twice per swing.',
    sections: [
      {
        heading: 'The failure nobody catches in the metrics',
        body: [
          'The obvious approach — fine-tune a general body-pose model on golf footage — produced excellent golf numbers and a broken model. Validation mAP went up. The field showed a body that had learned the golf address posture as a prior: hands drifting together on people who were not holding a club.',
          'The metric was blind to it by construction. Golf validation data contains only golf poses, where the hands genuinely are together, so a model that always predicts hands-together scores well on exactly the data used to judge it. The bias was invisible until it met non-golf motion.',
          'That reframed the requirement. Club accuracy was not the constraint — preserving the general body model while adding club tracking was.',
        ],
      },
      {
        heading: 'Making the regression architecturally impossible',
        body: [
          'Rather than regularise the drift and hope, I made it unrepresentable: freeze the backbone, neck and every body keypoint output channel, and train only the club channels. The deployed body pathway is then bit-identical to the base model on every image — not "close", identical, verifiable by weight diff.',
          'That bought correctness and immediately exposed the real problem. A linear club readout over body-only frozen features plateaued badly: the frozen trunk had no representation of a thin metal shaft, because nothing in its training had ever asked for one.',
          'The resolution was a parallel trainable adapter — a small feature pyramid over early frozen backbone taps, fused into the club branch only. Club accuracy went from a hard plateau to production quality with the body still provably untouched.',
          'Every mechanism in that stack has a literature behind it. Frozen columns with adapter-mediated lateral connections are Progressive Neural Networks (2016), which states the goal in the same terms — forgetting made impossible by design rather than penalised. A trainable side network fused into an unchanged pretrained one is Side-Tuning (ECCV 2020). Zero-initialised blocks that start as the identity and can only improve from there are ControlNet\'s zero-convolutions (ICCV 2023). The composition is the contribution, and so is the acceptance criterion underneath it: "the body model must never regress for any customer" is an architectural constraint rather than a validation threshold, and bit-identity turns an ML risk into a CI check.',
          'The trade is real and worth stating. A fully frozen body pathway can never learn from club data, and club position is genuinely informative about the hands — the shaft is anchored to them. That transfer is architecturally forbidden in the direction where it would help most. I took the guarantee over the potential gain because a silent regression on a general user is a worse failure than a marginally better wrist keypoint on a golfer, but it is a choice with a cost, not a free win.',
        ],
      },
      {
        heading: 'Diagnosing by error structure, not by loss curve',
        body: [
          'The remaining club error was not uniform — it was U-shaped in the clubhead\'s distance from the body. That shape is diagnostic: it says the failure is receptive field, not capacity or data. The anchor cell responsible for the clubhead simply could not see far enough at full extension, precisely where a golf swing puts it.',
          'Adding zero-initialised global-context blocks to the adapter — zero-init so the model starts exactly where it was and can only improve from there — collapsed far-clubhead error by roughly an order of magnitude and fixed the worst-case frames, which are the ones a coach actually looks at.',
        ],
      },
      {
        heading: 'Supervision as a first-class design problem',
        body: [
          'Training data spanned sources with genuinely different epistemic status: frames where the club is labelled, frames where a club is present but unmeasured, and frames with no club at all. Collapsing those into a binary present/absent flag teaches the model to hallucinate on one and suppress on the other.',
          'A four-state visibility scheme keeps them distinct — absent trains true negatives, unannotated contributes zero gradient in every term, occluded and visible train normally. Per-keypoint, so club supervision is fully independent of body supervision. Keeping the non-golf sources in the mix acts as a rehearsal buffer; trimming to golf data is what causes the collapse in the first place.',
        ],
      },
      {
        heading: 'Where training was the wrong tool',
        body: [
          'One field failure — the club visibly telescoping on out-of-distribution clips — resisted every training-side fix, including a geometry loss at two different weights. Both runs were stopped. The reason it resisted is that the failure is absent from train and validation by definition: it is an OOD artefact, so no in-distribution loss can see it.',
          'It was solved at inference with an explicit temporal tracker enforcing shaft-length consistency, which cut field club-length variance sharply with no collapse cases. Knowing which failures belong to training and which belong to inference is most of what makes a research plan converge on schedule.',
        ],
      },
      {
        heading: 'What the number is measured against',
        body: [
          'The 3cm is mean per-joint error, pelvis-relative, on our own golf corpus — the same metric family as Human3.6M rather than absolute position in the room. Stating which metric matters more than the digit: a reader who knows the field will ask inside three minutes, and an unqualified number reads as either naive or evasive.',
          'The comparison that gives it meaning is not the Human3.6M leaderboard, where the top lifting models sit around 38mm on studio motion. It is what happens when those models meet athletic speed. AthletePose3D (2025) evaluated TCPFormer — state of the art at 37.9mm on Human3.6M — zero-shot on high-speed sport: 213mm. Fine-tuned on athletic data it recovers to roughly 66mm.',
          'That is the honest frame for this work. Golf is the motion class that breaks general pose models, and the interesting result is not beating a studio benchmark but holding accuracy where studio-trained models lose an order of magnitude. It is also why the general-body regression described above was the binding constraint: the fix for athletic motion is domain fine-tuning, and domain fine-tuning is exactly what corrupts the base model.',
        ],
      },
      {
        heading: 'Deployment as a constraint, not a phase',
        body: [
          'The target was Apple ARM silicon via CoreML with no cloud dependency — chosen as much for privacy as for latency, since swing footage of identifiable clients should not leave the device. Quantisation and compression were part of the architecture conversation from the start, not a compression pass bolted on at the end.',
          'Worth being exact about what "on-device" means here, because the phrase gets stretched. The phone captures the swing and the full analysis pipeline then runs locally on that recording — it is edge inference over stored video, not live streaming inference on the camera feed. The guarantee that matters is that the footage and every model in the stack stay on the handset. Real-time frame-rate figures describe capture, not the inference budget.',
        ],
      },
    ],
    outcome: [
      'Mean per-joint 3D error reduced 8cm → 3cm, pelvis-relative, through temporal consistency modelling, motion-aligned lifting and spatial refinement.',
      'The full analysis stack running locally on Apple ARM silicon, with no cloud round-trip and no footage leaving the device — shipped in an iOS app used by PGA professionals.',
      'A club-tracking model that beats prior generations on club accuracy while being the only one with a provably unbiased body model.',
      'An internal benchmarking suite for evaluating robustness across long-tailed action distributions — every claim above is a measured number, not an impression.',
    ],
    visual: 'solver',
    featured: true,
  },
  {
    slug: 'agentic-coaching-llm',
    index: '02',
    title: 'An LLM that is never allowed to do the maths',
    subtitle:
      'A domain-grounded agentic coaching system where every number is computed deterministically in Python and the model is constrained to narration — with a second pipeline that inverts the arrangement.',
    org: 'IdeasLab Formosa',
    period: '2025 — present',
    domain: 'LLMs · Agentic Systems · Domain Grounding',
    role: 'Architect — rule engine, scoring, prompt design, evaluation',
    stack: ['Claude', 'Gemini', 'Tool use', 'RAG', 'Python', 'Structured prompting'],
    teaser:
      'Domain-expert coaching from an LLM, with hallucinated biomechanics made structurally impossible rather than discouraged.',
    metrics: [
      { value: '0', label: 'numbers the LLM may compute' },
      { value: '69', label: 'deterministic rules, weighted 0–100' },
      { value: '8', label: 'languages, prompts included' },
      { value: '2', label: 'pipelines, opposite LLM roles' },
    ],
    problem:
      'Biomechanical coaching is a domain where a confidently wrong number is worse than no number — it changes how someone moves their body. The system had to produce expert-level, personalised prose while making fabricated measurements impossible, not merely unlikely.',
    sections: [
      {
        heading: 'The architectural commitment',
        body: [
          'Numbers come from Python. Prose comes from the LLM. The system prompt forbids the model from computing or inventing any quantity, and the deterministic half of the pipeline is fully reproducible and covered by a test suite that needs no API key — so the part that can be verified is verified, on every commit, without network flakiness.',
          'This is the inverse of the common pattern of handing an LLM raw data and asking for analysis. The model receives verdicts that a rule engine has already reached, and its job is to render them as coaching that cites the specific rule it came from. Every claim in the output is traceable to a deterministic evaluation. It is the same separation PAL (ICML 2023) identified — decomposition is the model\'s job, solving belongs to the interpreter — and the same one that regulated lending has been forced into by adverse-action reason requirements: an interpretable scorer decides, a language layer explains.',
          'Forbidding the model from computing a number does not forbid it from describing one wrongly, and that gap is where this architecture is usually oversold. A narrator can still invert a comparison, attribute a verdict to the wrong rule, or add a causal claim the engine never made — Turpin et al. (NeurIPS 2023) showed how fluently models rationalise rather than report. So the narration is checked against the verdicts it cites, not just the arithmetic behind it. A guarantee that stops at the arithmetic is a guarantee about the easy half.',
        ],
      },
      {
        heading: 'Two pipelines, deliberately opposite',
        body: [
          'The same input feeds two paths. In the first, the LLM is a narrator: a rule engine and weighted scorer produce citable verdicts, the model writes prose around them, and the output is reproducible and auditable. In the second, the LLM is the brain: it receives cleaned measurements and reasons holistically from first principles, streamed, with no determinism guarantee.',
          'Shipping both was a decision about honesty in interface design. The auditable path answers "what does our rulebook say, with scores and citations". The reasoning path answers "what should this player actually work on". Those are different questions and pretending one system answers both well would degrade both.',
          'Both share a physics-validation gate, so no output — however it was generated — escapes without passing range-of-motion, consistency and continuity checks.',
        ],
      },
      {
        heading: 'Treating the rulebook as data under test',
        body: [
          'The rule engine is generated from a domain-expert spreadsheet rather than hand-coded, so the biomechanists who own the rules can change them without an engineering cycle. Thresholds, category weights and severity multipliers live in configuration — edit and restart, no rebuild.',
          'The more valuable discipline was validating the rules empirically. Any rule that fires on 100% of sessions is not detecting a fault; it is detecting a bug in itself, and several were caught exactly that way and excluded from scoring. One hypothesis about why a rule misfired was tested directly against real session data and disproved — the intuitive explanation was wrong, and the data said so before it reached a user.',
          'A comparison operator that tested a signed difference where the rule\'s own definition called for magnitude was silently passing every misalignment in one direction. Found by noticing that a session with a larger error scored better than one with a smaller error — an ordering violation, not a threshold question.',
        ],
      },
      {
        heading: 'Grounding, retrieval and cost',
        body: [
          'Domain grounding here means a curated, versioned knowledge base of encoded rules with explicit resolver contracts, not embedding-similarity retrieval over unstructured documents. For a domain with a real rulebook, structured grounding beats semantic search — retrieval quality stops being a variable.',
          'Ongoing work covers fine-tuning foundation models on this domain corpus, multi-turn coaching interactions through API-level integrations, and context-aware response filtering. Related independent research on Kolmogorov–Arnold substitutions for dense MLP blocks targets the same underlying pressure: making capable inference cheap enough to run where it needs to run.',
        ],
      },
    ],
    outcome: [
      'A coaching system whose every quantitative claim is deterministic, reproducible and cited back to a specific rule.',
      'Rulebook ownership handed to domain experts through configuration, with rule validity itself measured against real sessions.',
      'Full localisation across 8 languages, including prompt-level translation rather than post-hoc output translation.',
      'Consumed in production as a library by the wider product platform through a deliberately narrow public API.',
    ],
    visual: 'llm',
    featured: true,
  },
  {
    slug: 'reconstruction-infrastructure',
    index: '03',
    title: 'Fixing the geometry underneath everything',
    subtitle:
      'Multi-camera calibration, 3D reconstruction and event detection — the shared infrastructure whose silent errors propagate into every downstream number.',
    org: 'IdeasLab Formosa',
    period: '2025 — present',
    domain: 'Multi-View Geometry · Calibration · Validation',
    role: 'Research engineer — diagnosis, correction, validation at scale',
    stack: ['Multi-view geometry', 'Camera calibration', 'Triangulation', 'NumPy', 'Anthropometrics'],
    teaser:
      'A reconstruction is worthless in absolute units without scale, and wrong in a way that looks plausible — which is why it survives review.',
    metrics: [
      { value: '4.8×', label: 'lower reconstruction noise' },
      { value: '10–46×', label: 'bone-length consistency gain' },
      { value: '204', label: 'bone measurements validated' },
      { value: '−73%', label: 'event-detection timing error' },
    ],
    problem:
      'Every biomechanical number the product reports is a function of camera calibration, 3D reconstruction and swing-phase timing. Errors there do not announce themselves — they produce confident, plausible, wrong outputs downstream.',
    sections: [
      {
        heading: 'Bugs that hide inside plausible output',
        body: [
          'A grid search over camera intrinsics had an early-stop counter scoped across the whole search grid instead of per row, so the coarse pass could terminate having covered only a fraction of the space — permanently missing the true optimum on rows it never reached. It never errored. It returned a calibration that looked fine. Scoping the counter correctly produced a materially better fit and roughly five times lower reconstruction noise on real sessions.',
          'Separately, the noisiest tracked keypoints were bypassing the quality gate every other calibration joint had to pass, letting poor tracking on a few frames bias a whole session\'s camera calibration.',
          'A bilateral-symmetry correction pass had two compounding faults: correcting a joint without moving its descendants, which re-broke a constraint that had just been satisfied, and merging left and right candidates during parent resolution, which measured some limbs against the wrong side of the body. Verified against a synthetic skeleton with known ground truth, then re-validated across the full real corpus.',
        ],
      },
      {
        heading: 'Scale is not a detail',
        body: [
          'Without a calibration rig, multi-view reconstruction recovers geometry only up to an unknown scale — every distance is proportionally right and absolutely meaningless. That was the single largest source of wrong absolute-unit numbers in the system.',
          'Anchoring the reconstruction to a known real-world length resolves it, but the prototype version had a gap worth understanding: it rescaled the point cloud and left camera translation vectors on the original arbitrary scale, so camera-to-player distance kept reading wrong even where everything else looked anchored. Half-applied transforms are harder to catch than missing ones, because most of the output becomes correct.',
        ],
      },
      {
        heading: 'Validating against physical reality',
        body: [
          'The strong test of a scale anchor is not internal consistency — it is anatomy. Measuring every bone in the skeleton across every reconstructed session and comparing to published anthropometric ratios put the mean at 0.977× expectation across 204 measurements.',
          'The residual deviation is itself informative. It clusters by body region consistently across four different people, which is the signature of a keypoint-placement convention difference, not a scale error — a real per-session scale bug would appear as random noise per session, not a stable regional pattern. The shape of the error told us which hypothesis was true.',
          'The decisive evidence came from the same player across sessions: bone lengths agreed to within a few percent across independent reconstructions, even though each session\'s raw unanchored scale needed a wildly different correction factor. The anchor recovers the same real body every time. An independent cross-check — deriving club length from the height anchor alone and landing in the correct physical range — confirmed it from a second direction.',
        ],
      },
      {
        heading: 'One threshold, two cameras, an invalid assumption',
        body: [
          'Swing-phase event detection used a single angular threshold for both camera views. It had only ever been validated against one of them. Measured against manually annotated ground truth across 18 real two-camera sessions, the second view fired early on every single session — because a face-on camera watches the club rotate across its image plane and its 2D angle rises near-linearly, while the down-the-line view stays flat then swings sharply late. Same threshold, entirely different signal geometry.',
          'View-specific bounds derived from the annotated events cut mean timing error by 60% and 73% on the two affected phases, with the other view byte-for-byte unchanged.',
          'The same measurement pass cleared two other phases that had been suspected. Reporting "investigated, no change warranted" with the evidence is as much of a result as a fix — it stops the next person re-opening a closed question.',
        ],
      },
    ],
    outcome: [
      'Calibration, reconstruction and event-detection errors corrected at the source, with every claim measured on a real annotated corpus rather than synthetic proxies.',
      'Reconstruction anchored to real-world scale and validated against published anthropometric data across all sessions and all bones.',
      'Remaining limitations documented explicitly — open calibration variance, triangulation conditioning, synchronisation edge cases — because undocumented known-unknowns are how they get rediscovered expensively.',
    ],
    visual: 'geometry',
    featured: true,
  },
  {
    slug: 'planogram-vision-ai',
    index: '04',
    title: 'Retail vision AI that scales without retraining',
    subtitle:
      'Dense detection combined with fine-tuned embeddings, so a product catalogue can grow without touching the model. Presented at NVIDIA GTC 2025.',
    org: 'President Information Corp',
    period: '2023 — 2025',
    domain: 'Computer Vision · Embeddings · Edge Deployment',
    role: 'Lead engineer — architecture, training, production deployment',
    stack: ['YOLO', 'Triplet loss', 'TensorRT', 'DeepStream', 'TAO Toolkit', 'GCP', 'Metropolis'],
    teaser:
      'The scaling constraint in retail vision is not accuracy — it is that every new product would otherwise mean another training run.',
    metrics: [
      { value: 'GTC 2025', label: 'NVIDIA technical poster' },
      { value: '+30%', label: 'recognition performance gain' },
      { value: 'Store #8', label: 'unmanned 7-Eleven, deployed' },
      { value: '5M+', label: 'data points modelled' },
    ],
    problem:
      'A retail catalogue changes constantly. Any system that requires retraining to recognise a new SKU has an operational cost that grows with the business — the accuracy problem is solvable, the scaling problem is architectural.',
    sections: [
      {
        heading: 'Separating detection from identity',
        body: [
          'Dense object detection locates products on a shelf; a separately fine-tuned embedding model, trained with triplet loss, decides what each one is by nearest-neighbour lookup against a catalogue of reference vectors. Adding a product means adding vectors, not retraining a classifier.',
          'Treating SKU identity as instance-level retrieval rather than closed-set classification is the reference architecture for open-set product recognition — established since Tonioni and Di Stefano in 2018, and the property it buys is what the literature calls one-shot or few-shot generalisation to unseen products. Choosing it here was a call about which constraint would decide the system\'s fate: the operational one, not the accuracy one. A catalogue that changes weekly kills a classifier long before accuracy becomes the argument.',
          'The choice worth defending is the fine-tuned domain embedding. Foundation-model embeddings are the default starting point now, and they cluster categories well while failing precisely where retail hurts — ranking near-identical flavour and size variants apart. A domain-specialised metric space is where triplet loss still earns its place.',
          'On top of that, comparing detected shelf state against the intended planogram surfaces discrepancies automatically — the actual business question, rather than raw detections.',
        ],
      },
      {
        heading: 'Occlusion as the default case',
        body: [
          'For autonomous retail, products are recognised in a customer\'s hand — partially occluded, at arbitrary orientation, under motion blur. Occlusion is not an edge case in that setting; it is the normal case, and any evaluation treating it as an outlier will overstate performance.',
          'This is the part of the problem the industry mostly declines to solve in vision. Amazon\'s Just Walk Out fuses camera streams with shelf weight sensors, and the sensors exist precisely to cover the small-and-occluded case; the ITRI/7-Eleven X-STORE build in Taiwan went further in the same direction, arguing explicitly that weight sensors and light curtains cost less computation than solving it visually. Doing it from cameras is a harder problem than the planogram work and a less crowded one.',
          'Combining custom detection with vector-embedding search under those conditions produced a 30% performance gain, and the system was deployed to Taiwan\'s 8th unmanned 7-Eleven store.',
        ],
      },
      {
        heading: 'Hardware-aware inference',
        body: [
          'Production ran through NVIDIA\'s stack end to end — TAO Toolkit for training, DeepStream for streaming inference, TensorRT for hardware-accelerated execution, Metropolis microservices for cloud-native and edge deployment, built in collaboration with NVIDIA.',
          'Adjacent work: an LLM-assisted named-entity-recognition pipeline on GCP Document AI for content-aware extraction from product imagery, which cut manual labelling overhead substantially, and a predictive analytics model over 5M+ data points with 95% confidence intervals feeding marketing and inventory decisions.',
        ],
      },
    ],
    outcome: [
      'Selected as an NVIDIA GTC 2025 technical poster — research methodology accepted at the field\'s primary industry venue.',
      'Production deployment in an unmanned retail store, running on edge hardware under real customer traffic.',
      'A catalogue-scaling architecture that removed retraining from the operational loop entirely.',
    ],
    visual: 'retail',
    featured: false,
  },
  {
    slug: 'inpainting-thesis',
    index: '05',
    title: 'Generative inpainting in the low-data regime',
    subtitle:
      'A GAN architecture combining contextual and spatial attention, targeting the failure modes that appear specifically when training data is scarce.',
    org: 'National Taipei University of Technology',
    period: '2022 — 2023',
    domain: 'Generative Models · Attention · Thesis',
    role: 'Author',
    stack: ['PyTorch', 'GANs', 'Attention mechanisms', 'Receptive field design'],
    teaser:
      'Mode collapse, memorisation and underfitting are three different diseases with one symptom — bad samples.',
    metrics: [
      { value: '3', label: 'failure modes addressed' },
      { value: '3.8/4.0', label: 'MSc GPA' },
    ],
    problem:
      'Generative inpainting degrades in characteristic ways when data is limited: the generator collapses to a few modes, memorises training examples, or never fits at all. These have different causes and different fixes, and treating them as one problem is why low-data generative work stalls.',
    sections: [
      {
        heading: 'Attention on two axes',
        body: [
          'The architecture integrates contextual attention — borrowing texture from semantically similar regions elsewhere in the image — with spatial attention that preserves geometric coherence across the inpainted boundary. Content and structure are separate problems and the model addresses them separately.',
          'Extending effective receptive-field capacity improved spatial consistency over larger masked regions, where purely local models produce plausible texture with structurally wrong geometry.',
        ],
      },
      {
        heading: 'Why this still informs current work',
        body: [
          'The attention mechanisms studied here are the same machinery underlying transformers, and that grounding is what makes fine-tuning decisions on language models something other than trial and error. Understanding why a mechanism works is what lets you predict when it will not.',
          'The same instinct runs through the pose work — diagnose the specific failure mode, then choose the intervention that targets it, rather than applying a generic remedy and measuring whether the aggregate moved.',
        ],
      },
    ],
    outcome: [
      'Published as an MSc thesis at National Taipei University of Technology.',
      'The foundation for a working understanding of attention that transfers directly to transformer-based systems.',
    ],
    visual: 'generative',
    featured: false,
  },
];

export const featuredWork = work.filter((w) => w.featured);
export const byslug = (slug: string) => work.find((w) => w.slug === slug);
