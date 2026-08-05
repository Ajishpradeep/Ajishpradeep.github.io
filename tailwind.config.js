/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--void) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        'panel-hi': 'rgb(var(--panel-hi) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        'cyan-hot': 'rgb(var(--cyan-hot) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
        'amber-hot': 'rgb(var(--amber-hot) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        dim: 'rgb(var(--dim) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Funnel Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        text: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      /*
       * Six steps and no more. The page previously carried these four tokens
       * plus fifteen arbitrary `text-[Nrem]` values across 106 usages —
       * including three sizes inside a 1.2px band (16.8 / 17 / 18px), which no
       * reader perceives as a distinction and every reader has to absorb.
       *
       * micro  12  mono labels, figure captions
       * fine   14  secondary prose, notes
       * body   17  running prose (see `.copy`)
       * lead   19→22  hero intro, section ledes, card titles
       * title  24→31  subheads, case titles, section markers
       * headline 34→54  the two loud section headings
       * mega   46→88  the h1, once per page
       *
       * The first pass set this floor at 11/13/16 and it read small on a
       * desktop browser — a label at 11px is a native-app convention, not a
       * web one. Every step moved up one notch; the ratios between them are
       * unchanged, so the hierarchy is identical and only the floor moved.
       *
       * `lead` exists because the hero previously jumped 96px → 16px with
       * nothing between it, and that gap collapsed to 2.0× on a phone.
       * Tracking is negative on display, where uppercase extrabold needs it,
       * and zero below — the old positive 0.02em was an unexamined default.
       */
      fontSize: {
        micro: ['0.875rem', { lineHeight: '1.45', letterSpacing: '0.06em' }],
        fine: ['1rem', { lineHeight: '1.55' }],
        // Overrides Tailwind's 16px default so `text-base` and running prose are
        // one step. Left apart they sat a pixel from each other — a distinction
        // nobody perceives and every reader still has to absorb.
        base: ['1.25rem', { lineHeight: '1.58' }],
        /*
         * Prose and labels are the sizes that were too small; the display tier
         * was not, and blowing it up with them turned the hero into five lines
         * of 96px type. Reading sizes stay raised, display goes back.
         */
        lead: ['clamp(1.1875rem, 0.5vw + 1.08rem, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.008em' }],
        title: ['clamp(1.5rem, 1.1vw + 1.22rem, 1.9375rem)', { lineHeight: '1.2', letterSpacing: '-0.016em' }],
        headline: ['clamp(2.125rem, 2.6vw + 1.45rem, 3.4rem)', { lineHeight: '1.06', letterSpacing: '-0.024em' }],
        /*
         * The ceiling was 5.5rem (88px). At 1440×900 that set the h1 in five
         * lines spanning 423px — 47% of the viewport — and pushed every
         * headline figure and the primary call to action below the fold, on a
         * page whose first named audience has sixty seconds. 4.25rem (68px)
         * holds the same words in three lines. Loudness was never the problem;
         * five lines of it was.
         *
         * The floor moved too, 2.75rem → 2.375rem. At 390px the headline was
         * still setting five lines and 430px of h1, which is the same defect
         * on the viewport that can least afford it.
         */
        mega: ['clamp(2.375rem, 5vw + 0.7rem, 4.25rem)', { lineHeight: '0.98', letterSpacing: '-0.028em' }],
      },
      /*
       * The two alpha steps the surface system is built on. `.card` sits at 28
       * (clears the 3:1 WCAG 1.4.11 floor for a boundary that is the only
       * thing defining a component) and `.well` at 14 (exempt — it always sits
       * inside a card that has already stated the extent). Registered here
       * rather than written as arbitrary values so the two levels stay a
       * decision the system owns.
       */
      opacity: {
        14: '0.14',
        28: '0.28',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
