import { motion, type Transition } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

type BorderTrailProps = {
  className?: string;
  /** Diameter of the travelling light, px. */
  size?: number;
  transition?: Transition;
  /** Corner radius the path follows. Must match the element's own. */
  radius?: number;
};

/**
 * A light that runs around the inside of a border.
 *
 * The two-mask trick is the whole component: a box is drawn with a transparent
 * border, then masked to the intersection of its border-box and the inverse of
 * its padding-box. What survives is the border ring alone, so a bright disc
 * moving inside it is visible only where it crosses the frame. The light never
 * touches the content, which is the difference between this and the spotlight
 * DESIGN.md rejected — a glow *over* a card versus a frame that is lit.
 *
 * `offset-path: rect(...)` does the travelling. Where it is unsupported the
 * disc simply sits at the top-left corner and does not move, which is why the
 * whole thing is `aria-hidden` and never carries information on its own: it
 * accompanies a state, and something else always states it in text.
 *
 * Off entirely under reduced motion. This is a continuous loop, and a
 * continuous loop is the first thing that setting exists to stop.
 */
export default function BorderTrail({
  className,
  size = 60,
  transition,
  radius = 2,
}: BorderTrailProps) {
  const still = useReducedMotion();
  if (still) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={cn('absolute aspect-square rounded-full', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${radius}px)`,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={transition ?? { repeat: Infinity, duration: 6, ease: 'linear' }}
      />
    </div>
  );
}
