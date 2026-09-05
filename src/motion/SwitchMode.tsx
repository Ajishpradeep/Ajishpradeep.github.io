import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { springOr, SPRING } from '@/lib/motion';

type SwitchModeProps = {
  /** Track height. The knob is square at this size; width is 2×. */
  size?: number;
  className?: string;
};

/**
 * The theme switch.
 *
 * The upstream component is a 144×72 pill driven by `next-themes`, with the
 * knob shared across both states by `layoutId` so it slides rather than jumps.
 * That mechanism is the whole idea and it is kept exactly. Everything around it
 * is this site's:
 *
 * - **`next-themes` is gone.** It is a Next.js package with a provider, a
 *   script-injection strategy and SSR hydration handling; this is a static Vite
 *   SPA with one document. `useTheme` is thirty lines and the flash is handled
 *   by a blocking script in `index.html`, which is the only place it can
 *   actually be handled.
 * - **`react-icons/io5` is gone.** The site draws every icon from `lucide-react`
 *   at one stroke weight, and a second icon library for two glyphs would be
 *   visible — Ionicons are filled and rounded, Lucide is 1.8px stroked.
 * - **The colours are not props.** The upstream takes eight hex strings. This
 *   site has a token system and the switch is the control that *changes* it, so
 *   hardcoding either side of it would be the one element on the page that
 *   could not follow the theme it sets.
 * - **`rounded-sm`, not `rounded-full`.** A pill is a different object from
 *   everything else here; this is the same 2px radius as every other control.
 *
 * The knob's position carries the state without colour, and both glyphs are
 * present at all times with the inactive one dimmed — a switch that shows only
 * the current icon makes the visitor guess what pressing it does.
 */
export default function SwitchMode({ size = 26, className }: SwitchModeProps) {
  const { isDark, toggle } = useTheme();
  const still = useReducedMotion();

  const pad = 2;
  const knob = size - pad * 2;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label="Light mode"
      onClick={toggle}
      className={`group relative flex shrink-0 items-center rounded-sm border border-cyan/30 bg-void/60 transition-colors duration-300 hover:border-amber ${className ?? ''}`}
      style={{ width: size * 2, height: size, padding: pad }}
    >
      {/*
        THE SLIDING KNOB.

        `layoutId` rather than an animated `left`: the two states render the
        knob in different flex positions and motion measures the difference, so
        the travel is correct at any `size` without a magic number. It is also
        the site's own selection device — the same shared-element marker that
        moves down the work console's rail and across the header nav.
      */}
      <motion.span
        layoutId="theme-knob"
        transition={springOr(still, SPRING.press)}
        aria-hidden
        className="absolute rounded-[3px] bg-amber"
        style={{ width: knob, height: knob, left: isDark ? pad : size + pad - 1 }}
      />

      {/*
        Both glyphs, always. The active one sits on the knob and takes the
        ground colour; the other stays on the track at reading weight. A switch
        that shows only its current state asks the visitor to guess what
        pressing it does.
      */}
      <span
        className="relative z-10 flex items-center justify-center"
        style={{ width: size - pad, height: knob }}
      >
        <Moon
          size={Math.round(size * 0.52)}
          strokeWidth={1.9}
          className={`transition-colors duration-300 ${isDark ? 'text-void' : 'text-dim group-hover:text-cyan'}`}
        />
      </span>
      <span
        className="relative z-10 flex items-center justify-center"
        style={{ width: size - pad, height: knob }}
      >
        <Sun
          size={Math.round(size * 0.56)}
          strokeWidth={1.9}
          className={`transition-colors duration-300 ${isDark ? 'text-dim group-hover:text-cyan' : 'text-void'}`}
        />
      </span>
    </button>
  );
}
