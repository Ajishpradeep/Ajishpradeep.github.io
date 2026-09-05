import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: Parameters<typeof useSpring>[1];
};

/**
 * The light itself. Positions against whichever element it is dropped into.
 *
 * Exported because the border wrapper below is only one way to use it, but it
 * is not meant to be used bare on this site — see the note there.
 */
export function Spotlight({ className, size = 220, springOptions }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [parent, setParent] = useState<HTMLElement | null>(null);
  const [lit, setLit] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = springOptions ?? { bounce: 0, duration: 0.35 };
  const left = useTransform(useSpring(x, spring), (v) => `${v - size / 2}px`);
  const top = useTransform(useSpring(y, spring), (v) => `${v - size / 2}px`);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (el) setParent(el);
  }, []);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (!parent) return;
      const box = parent.getBoundingClientRect();
      x.set(e.clientX - box.left);
      y.set(e.clientY - box.top);
    },
    [parent, x, y],
  );

  useEffect(() => {
    if (!parent) return;
    const on = () => setLit(true);
    const off = () => setLit(false);

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseenter', on);
    parent.addEventListener('mouseleave', off);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseenter', on);
      parent.removeEventListener('mouseleave', off);
    };
  }, [parent, onMove]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full blur-xl transition-opacity duration-300',
        lit ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{ width: size, height: size, left, top }}
    />
  );
}

/**
 * A card whose *frame* lights where you point at it.
 *
 * A generic glow following the cursor was rejected, and a bare
 * Spotlight laid over a card is exactly that — a soft blob drifting across the
 * text, which on a page of 17px serif prose is a legibility cost paid for
 * atmosphere. This is the other configuration of the same primitive and it
 * does not have that problem.
 *
 * The structure is what makes it work: a 1px-padded outer element holds the
 * light, and an opaque inner element covers everything except that 1px. The
 * spotlight is therefore only ever visible in the ring, so what the reader
 * sees is a border brightening under the cursor — the same family as the
 * `.trace` corner brackets kept elsewhere, described as "an
 * instrument framing its reading". It never crosses the content.
 *
 * `overflow-hidden` on the outer element is load-bearing: without it the blur
 * radius spills past the card and becomes the glow this is avoiding.
 *
 * Reduced motion drops to the static border. The spring is the effect; there
 * is nothing left to slow down.
 */
export default function SpotlightBorder({
  children,
  className,
  /**
   * The ring's resting colour, as a background.
   *
   * IT HAS TO BE THE ONLY BORDER. The first pass wrapped an element that
   * already had `border border-amber/50` of its own, which put an opaque
   * 1px line directly on top of the 1px ring the light travels in — the
   * spotlight was working perfectly and was invisible behind the border it
   * was supposed to be lighting. Whatever this wraps gives its border up and
   * this becomes it.
   */
  ringClassName = 'bg-cyan/28',
  /**
   * MUST BE OPAQUE. This is what confines the light to the ring; a
   * translucent inner surface lets the blur through onto the content and the
   * component becomes the cursor glow it exists to avoid.
   */
  innerClassName = 'bg-deep',
  size = 220,
}: {
  children: ReactNode;
  className?: string;
  ringClassName?: string;
  innerClassName?: string;
  size?: number;
}) {
  const still = useReducedMotion();

  if (still) {
    return (
      <div className={cn('rounded-sm p-px', ringClassName, className)}>
        <div className={cn('rounded-[3px]', innerClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm p-px transition-colors duration-500',
        ringClassName,
        className,
      )}
    >
      <Spotlight
        size={size}
        className="bg-[radial-gradient(circle_at_center,rgb(var(--amber-hot)),rgb(var(--amber)/0.55),transparent_70%)]"
      />
      <div className={cn('relative rounded-[3px]', innerClassName)}>{children}</div>
    </div>
  );
}
