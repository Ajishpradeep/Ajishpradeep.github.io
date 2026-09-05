import { motion, type TargetAndTransition, type Transition } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type TextRollVariants = {
  enter: { initial: TargetAndTransition; animate: TargetAndTransition };
  exit: { initial: TargetAndTransition; animate: TargetAndTransition };
};

type TextRollProps = {
  children: string;
  className?: string;
  duration?: number;
  transition?: Transition;
  variants?: TextRollVariants;
  /**
   * WORDS, NOT CHARACTERS — and this is the one change from the upstream
   * component that matters.
   *
   * Motion Primitives splits on characters and sets each one `inline-block`.
   * That is correct for the demo, which rolls the single word
   * "motion-primitives" on one line. The hero here is a three-line headline
   * under `text-balance` at a 18ch measure, and an inline-block per character
   * destroys both: the browser can no longer see words, so it breaks lines
   * mid-word, and `text-balance` has nothing left to balance.
   *
   * Splitting on words keeps every wrap decision the typography already made
   * and still rolls each unit independently, which is the effect.
   */
  by?: 'word' | 'char';
  /** Stagger step, seconds. */
  step?: number;
  /** Seconds before the first unit moves. */
  delay?: number;
};

const DEFAULT_VARIANTS: TextRollVariants = {
  enter: {
    initial: { rotateX: 0, filter: 'blur(0px)' },
    animate: { rotateX: 90, filter: 'blur(2px)' },
  },
  exit: {
    initial: { rotateX: 90, filter: 'blur(2px)' },
    animate: { rotateX: 0, filter: 'blur(0px)' },
  },
};

/**
 * Text that rolls in on a 3D hinge, one unit at a time.
 *
 * Two layers per unit: the outgoing face rotates away from the reader while
 * the incoming face rotates in behind it, both on the same hinge. That is why
 * this reads as a mechanical flip rather than as a fade — which is the right
 * register for a page whose whole visual argument is *instrument*.
 *
 * The animation is `aria-hidden` and the real string is rendered `sr-only`
 * alongside it. Mid-flip, the visible text is one word standing on its edge
 * and a stack of half-rotated glyphs; a screen reader reading the animated
 * nodes would announce every unit twice, once per face.
 *
 * `aria-hidden` only removes it from the accessibility tree — it does nothing
 * for a sighted visitor who selects or copies the headline, and each word is
 * genuinely present twice in the DOM (once per animated face). Without
 * `select-none` on that wrapper, copying the h1 yields "workwork onon
 * thethe..." followed by the clean `sr-only` copy: every word doubled, then
 * the real sentence, with no space marking where one run ends and the next
 * starts. `select-none` excludes the animated pair from selection entirely,
 * so the `sr-only` span is the only copy a Select All / Copy can ever reach.
 */
export default function TextRoll({
  children,
  className,
  duration = 0.5,
  transition,
  variants = DEFAULT_VARIANTS,
  by = 'word',
  step = 0.045,
  delay = 0,
}: TextRollProps) {
  const still = useReducedMotion();

  // A hinged flip is a large rotation of every word on the page's biggest type.
  // There is no reduced-motion version of that worth designing; the resting
  // state is the text.
  if (still) return <span className={className}>{children}</span>;

  const units =
    by === 'word'
      ? children.split(/(\s+)/).filter((u) => u.length > 0)
      : children.split('');

  const base: Transition = transition ?? { ease: [0.16, 1, 0.3, 1], duration };

  let index = -1;

  return (
    <span className={className}>
      <span aria-hidden className="select-none">
        {units.map((unit, k) => {
          // Whitespace is layout, not a unit: rolling it produces a gap that
          // opens and closes and makes the line breathe in and out.
          if (/^\s+$/.test(unit)) return <span key={k}>{unit}</span>;
          index += 1;
          const at = delay + index * step;

          return (
            <span
              key={k}
              className="relative inline-block [perspective:600px] [transform-style:preserve-3d]"
            >
              <motion.span
                className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
                initial={variants.enter.initial}
                animate={variants.enter.animate}
                transition={{ ...base, delay: at }}
              >
                {unit}
              </motion.span>
              <motion.span
                className="inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
                initial={variants.exit.initial}
                animate={variants.exit.animate}
                transition={{ ...base, delay: at }}
              >
                {unit}
              </motion.span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}
