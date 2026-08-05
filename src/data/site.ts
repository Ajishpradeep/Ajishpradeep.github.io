export const site = {
  name: 'Pradeep Rajasekar',
  /**
   * The handle people search. Both names are deliberate: the professional name
   * leads, and this is the one on GitHub, on the domain, and on any CV that was
   * forwarded before someone arrived here. Surfaces must keep both legible.
   */
  alias: 'Ajish Pradeep',
  role: 'AI Research Engineer',
  location: 'New Taipei City, Taiwan',
  email: 'ajishpradeep@gmail.com',
  resume: '/Resume.pdf',
  /** 767×873. The 858KB PNG it replaced was 8× the size for the same picture. */
  portrait: '/portrait.jpg',
  /** 211×240, for the hero byline avatar. */
  portraitSmall: '/portrait-sm.jpg',
  tagline:
    'AI research engineer working across 3D vision, LLM systems and on-device inference.',
  /**
   * The hero answers "what is this person expert in". It previously answered
   * "how does XView work" — multi-view geometry and anatomical priors compiled
   * into the network, which is the architecture of one employer's product, in
   * that product's own register. A reader scanning for thirty seconds learned
   * that some pose work exists and nothing about the person who did it.
   *
   * Its replacement answered that, and answered it by assertion: "four years
   * across 3D computer vision, LLM systems and edge deployment — grounded in
   * the mathematics rather than in any one domain". Three faults. It listed the
   * same four domains the capability graph lists 400px to its right. It opened
   * with a tenure, which hands a screener a level on a page whose argument is
   * that the depth is unusual for the years. And "grounded in the mathematics"
   * is a thing a person says about themselves; the About page makes the
   * identical claim by observation instead — geometry does not care whether the
   * input is an image, a sentence or a skeleton — which a reader can check
   * rather than take.
   *
   * This is Pradeep's own wording, chosen by him over three alternatives, and
   * it is the register he wants the page opened in. Two things to know before
   * changing it:
   *
   * THE FIRST SENTENCE IS NOW THE H1 AND IS NOT REPEATED HERE. "I work on the
   * part of AI that has to be true" opens the page in Hero.tsx; this paragraph
   * starts at what used to be its second sentence. It was the best line on the
   * page and it was the fourth thing read — under a badge, a headline and a
   * blank. Say a fact once.
   *
   * It remains `about.headline` verbatim, and that is still deliberate: the two
   * pages open on the same line, which reads as a refrain to anyone who visits
   * both. It is now a refrain between two headlines rather than between a
   * headline and a paragraph, which is the stronger version of the same idea.
   *
   * It stays in one block and in one voice. A draft split the third sentence
   * into the amber slot to save a line; it read as two tones arguing over one
   * thought, and the amber paragraph is for a separate claim, not for the tail
   * of this one. The line it costs is a real cost — six lines at the 54ch
   * measure puts the figure row past the 1440×900 fold — and it is the trade
   * taken deliberately.
   *
   * "Having the foundations correct let me move" was the draft before this and
   * is ungrammatical: "having X correct" wants a present-perfect continuation,
   * not a bare past "let". `about.ts` already had it right.
   */
  intro:
    'I engineer AI where the mathematics is explicit and the physics is enforced. Having those foundations right is what has let me move from generative models to retail vision to 3D biomechanics to agentic LLM systems without starting over each time — the domain changes, the mathematics does not.',
  /**
   * The differentiator, and the one claim a forwarded CV cannot carry. It read
   * "I care most about the failures a model's own metric cannot see" — which
   * states a preference about the author where the page's whole argument is a
   * diagnosis about models. The h1 above is a claim about models; this finishes
   * that thought in the same subject, then says what it is worth to him.
   *
   * A separate claim, which is what this slot is for. `intro` says what he
   * engineers and what the range proves; this says why any of it matters, and
   * the two do not overlap.
   *
   * It read "I care most about the failures a model's own metric cannot see",
   * which states a preference about the author where the page's whole argument
   * is a diagnosis about models. The h1 above is a claim about models; this
   * finishes that thought in the same subject. "Certify" is the load-bearing
   * word — the metric does not merely miss the fault, it signs off on it, which
   * is what "quietly wrong" means. Case file 01 demonstrates it eight hundred
   * pixels down.
   */
  introEmphasis:
    'A metric that cannot see a fault will certify it. Those are the failures I build against.',
  links: [
    { label: 'Email', href: 'mailto:ajishpradeep@gmail.com', handle: 'ajishpradeep@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Ajishpradeep', handle: '@Ajishpradeep' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ajishpradeep', handle: 'in/ajishpradeep' },
  ],
} as const;

/**
 * The one navigation inventory. The header, the mobile drawer, the section rail
 * and the command deck all read this, so they cannot disagree about what the
 * site contains — they previously listed six, seven and eighteen destinations.
 * `id` must match the section's DOM id for scroll-spy to resolve.
 */
export const nav = [
  { label: 'Work', href: '/#work', id: 'work' },
  { label: 'Impact', href: '/#impact', id: 'impact' },
  { label: 'Method', href: '/#method', id: 'method' },
  { label: 'Research', href: '/#research', id: 'research' },
  { label: 'Lab', href: '/#lab', id: 'lab' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
  { label: 'About', href: '/about', id: 'about' },
] as const;

/** Just the on-page anchors, in scroll order. */
export const sections = nav.filter((item) => item.href.startsWith('/#'));

/**
 * Headline numbers, in the hero column above the fold.
 *
 * There were six, in a full-width strip below the hero where a sixty-second
 * visitor never reached them. Cutting to three fixed the position and created a
 * worse problem: 3cm, 240fps and on-device tracking are all properties of one
 * product, so the row read as a spec sheet for XView rather than as a profile
 * of the person who built it.
 *
 * These three each answer a different question, from a different part of the
 * record: how good is the research (3cm, my own R&D), how far did it get
 * (7,000+ stores, a different employer, corroborated by their peer-reviewed
 * paper), and who else says so (1 of 3, judged externally). Attribution for
 * every one of them is stated exactly in the impact dossier below; these are
 * the headline, not the claim.
 *
 * The first figure states the delta rather than the endpoint. "3cm" alone
 * invites a benchmark comparison it cannot win on Human3.6M's terms and cannot
 * answer without a qualifying clause this row has no space for; the reduction
 * is the defensible claim, it is mine, and the case study carries the metric
 * definition in full.
 */
export const marquee = [
  { value: '8cm → 3cm', label: 'mean per-joint 3D error, my R&D' },
  { value: '7,000+', label: 'stores running the retail vision work' },
  { value: '1 of 3', label: 'global winners from 638 proposals' },
] as const;
