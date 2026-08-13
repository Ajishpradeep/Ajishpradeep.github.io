import type { ReactNode } from 'react';
import { AnimatePresence, motion, type Transition, type Variants } from 'motion/react';
import { cn } from '../../lib/cn';

type TransitionPanelProps = {
  children: ReactNode[];
  activeIndex: number;
  /** +1 forward, -1 back. Passed to the variants as `custom`. */
  direction: number;
  variants?: Variants;
  transition?: Transition;
  className?: string;
};

/**
 * One panel visible at a time; the next one slides in from the side you asked
 * for while the last slides out the other way.
 *
 * The height is animated from a measurement rather than left to `auto`,
 * because the exiting panel is `position: absolute` — it has to be, or the two
 * would stack and the container would jump to the sum of both heights mid
 * transition. Absolute removes it from flow, which leaves the container
 * sized by the incoming panel alone, which is a hard cut from one height to
 * another underneath a smooth horizontal slide. Measuring closes that gap.
 *
 * `mode="popLayout"` so the outgoing panel is taken out of layout the instant
 * the new one mounts, rather than after its exit finishes.
 */
export default function TransitionPanel({
  children,
  activeIndex,
  direction,
  variants,
  transition,
  className,
}: TransitionPanelProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={variants}
          transition={transition}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
