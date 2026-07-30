/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 8vw, 7.5rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        headline: ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.028em' }],
        title: ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.0625rem, 1.55vw, 1.375rem)', { lineHeight: '1.55', letterSpacing: '-0.011em' }],
        micro: ['0.6875rem', { lineHeight: '1.1', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        shell: '82rem',
        prose: '38rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
