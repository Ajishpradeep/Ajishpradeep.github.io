import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Transition, type Variants } from 'motion/react';
import { RISE } from '@/lib/variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { STILL } from '@/lib/motion';

type InViewProps = {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: Parameters<typeof useInView>[1];
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'dl' | 'section';
};

/**
 * Runs its variants once, when it enters the viewport.
 *
 * `once: true` by default, which the upstream demo leaves off. A section that
 * re-animates every time it is scrolled past is not an entrance, it is a
 * loop — and on a 9,000px page a reader scrolling back to check a figure
 * would watch it dissolve and reassemble under them.
 *
 * Reduced motion renders the visible state directly. The variants are not
 * merely slowed: `blur(4px)` and `scale(0.98)` are not motion the stylesheet
 * can neutralise, so the resting state has to be chosen here.
 */
export default function InView({
  children,
  variants = RISE,
  transition,
  viewOptions = { once: true, margin: '0px 0px -120px 0px' },
  className,
  as = 'div',
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, viewOptions);
  const still = useReducedMotion();

  const M = motion[as] as typeof motion.div;

  return (
    <M
      ref={ref}
      initial={still ? 'visible' : 'hidden'}
      animate={still || seen ? 'visible' : 'hidden'}
      variants={variants}
      transition={still ? STILL : (transition ?? { duration: 0.5, ease: [0.16, 1, 0.3, 1] })}
      className={className}
    >
      {children}
    </M>
  );
}
