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
    'Computer vision built on explicit mathematics, with physical law enforced inside the model.',
  /**
   * Positioned around the expertise, not around any employer's product.
   *
   * Split into two sentences deliberately. The single 42-word version put its
   * payoff — "physically possible by construction" — at word 34, behind a
   * technology list, so a thirty-second reader stopped before reaching it. The
   * second sentence is the differentiator a CV structurally cannot carry, and
   * it is now the last thing read rather than an unread subordinate clause.
   */
  intro:
    'The mathematics is explicit and the physics is enforced — multi-view geometry, constrained optimisation and anatomical priors compiled into the network itself, so the output is physically possible by construction rather than merely plausible.',
  introEmphasis: "I care most about the failures a model's own metric cannot see.",
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
 * Headline numbers. The last two are externally corroborated — see the impact
 * dossier for their sources.
 */
export const marquee = [
  { value: '3cm', label: 'mean per-joint 3D error, down from 8cm' },
  { value: '240fps', label: 'on-device markerless tracking, no cloud' },
  { value: '29', label: 'keypoint pose model, body provably unbiased' },
  { value: '7,000+', label: 'stores running the retail vision system' },
  { value: '1 of 3', label: 'winners from 638 proposals, 55 countries' },
  { value: 'Warsaw', label: 'Taiwan Expo Europe 2026, listed exhibitor' },
] as const;
