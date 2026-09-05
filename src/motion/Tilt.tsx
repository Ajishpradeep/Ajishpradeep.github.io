import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

type TiltProps = {
  children: ReactNode;
  /** Degrees at the far edge. See the note on 8 versus 15. */
  rotationFactor?: number;
  /**
   * `isRevese` in the upstream source, spelling and all.
   *
   * Reversed, the surface tips *toward* the pointer — the corner you are
   * nearest comes to meet you, like a card being lifted at the edge you have a
   * finger under. Un-reversed it tips away, which reads as pushing it down.
   * The lab cards are things you are about to open, so they come up.
   */
  reverse?: boolean;
  className?: string;
  /** Applied to the moving element, for perspective-aware scaling. */
  scale?: number;
};

/**
 * A surface that tilts toward the pointer.
 *
 * Two things made this the Motion Primitives effect worth taking. A generic
 * glow following the cursor was rejected by name; a tilt is not a light
 * painted onto a card, it is the card itself responding to where it is being
 * pointed at. On a page whose visual argument is *instrument panel*, that is
 * the difference between a decoration and a material.
 *
 * `rotationFactor` is 8 here, matching TiltCard1, and the ceiling is real: at
 * the library's other default of 15 the card's text shears far enough to be
 * visibly distorted while you are trying to read it. That is affordable on a
 * demo card carrying a film still and a two-word caption; it is not affordable
 * on six cards whose entire content is a paragraph.
 *
 * Pointer only, deliberately:
 *
 * - No touch path. A tilt driven by a finger moves the card under the thumb
 *   that is about to tap it, and `pointermove` fires during a scroll.
 * - No keyboard path either, and that is not an omission. The card is a link,
 *   `:focus-within` already draws its border and its trace, and a perspective
 *   transform says nothing to a keyboard user that the focus ring does not
 *   already say better.
 *
 * The children are never wrapped in anything that changes layout, so removing
 * this component removes an effect and nothing else.
 */
export default function Tilt({
  children,
  rotationFactor = 8,
  reverse = true,
  className,
  scale = 1,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  // -0.5 … 0.5, the pointer's position within the element.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 320, damping: 26, mass: 0.7 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const sign = reverse ? -1 : 1;
  const rotateY = useTransform(sx, [-0.5, 0.5], [-rotationFactor * sign, rotationFactor * sign]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [rotationFactor * sign, -rotationFactor * sign]);

  if (still) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective: 800 }}>
      <motion.div
        onPointerMove={(e) => {
          // A finger is not a pointer here — see the note above.
          if (e.pointerType !== 'mouse') return;
          const box = ref.current?.getBoundingClientRect();
          if (!box) return;
          px.set((e.clientX - box.left) / box.width - 0.5);
          py.set((e.clientY - box.top) / box.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        className={cn('h-full')}
      >
        {children}
      </motion.div>
    </div>
  );
}
