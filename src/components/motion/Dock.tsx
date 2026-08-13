import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

type DockCtx = {
  /** Pointer x in viewport coordinates, or Infinity when the pointer is away. */
  mouseX: MotionValue<number>;
  base: number;
  magnified: number;
  /** How far from an item's centre the magnification reaches, px. */
  reach: number;
  still: boolean;
};

const Ctx = createContext<DockCtx | null>(null);

function useDock() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('DockItem must be used inside a Dock');
  return ctx;
}

/**
 * The magnifying dock.
 *
 * The mechanism is one shared motion value — the pointer's x — and each item
 * deriving its own size from its distance to it. That is the whole of it, and
 * it is why the effect feels continuous rather than like six independent hover
 * states: the items next to the one you are on grow too, by less, so the bar
 * deforms as a surface instead of one tile popping.
 *
 * TUNED DOWN FROM THE UPSTREAM DEFAULTS. Motion Primitives magnifies 48px to
 * 80px over a 150px reach, which is macOS's own curve and is built for a dock
 * that is the only thing on the screen. Here it is a navigation bar sitting
 * over running prose on a research page, and at 80px it heaved. 44 → 60 over
 * 130px is the same gesture at the volume this page speaks at.
 *
 * The 44px floor is not a style choice: it is the touch-target minimum
 * DESIGN.md requires, and it is the *resting* size, so the target is legal
 * before any magnification happens and on every device that has no pointer to
 * magnify with.
 */
export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);
  const still = useReducedMotion();

  return (
    <Ctx.Provider value={{ mouseX, base: 44, magnified: 60, reach: 130, still }}>
      <div
        onPointerMove={(e) => {
          // Mouse only. On a touch screen `pointermove` fires during a scroll,
          // and a bar that swells under a finger that is on its way past is
          // reporting an intention the visitor does not have.
          if (e.pointerType !== 'mouse') return;
          mouseX.set(e.clientX);
        }}
        onPointerLeave={() => mouseX.set(Infinity)}
        className={cn('flex items-end', className)}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

/**
 * One dock cell. Sizes itself from its distance to the pointer.
 *
 * `width` is animated rather than `scale`, deliberately: scaling would grow
 * the tile over its neighbours and leave the bar the same length, so the
 * magnified icon would sit on top of the two beside it. Width makes the
 * neighbours move aside, which is the behaviour that reads as a physical
 * surface — and it is the reason this is worth a layout animation at all.
 */
export function DockItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, base, magnified, reach, still } = useDock();

  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect() ?? { x: 0, width: base };
    return x - box.x - box.width / 2;
  });

  const target = useTransform(distance, [-reach, 0, reach], [base, magnified, base], {
    clamp: true,
  });

  const width = useSpring(target, { stiffness: 320, damping: 26, mass: 0.6 });

  return (
    <motion.div
      ref={ref}
      style={still ? { width: base } : { width }}
      className={cn('group/dock relative flex aspect-square items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

/** The name, above the bar. Shown on hover and on keyboard focus. */
export function DockLabel({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-[calc(100%+0.7rem)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-cyan/28 bg-void/95 px-2 py-1 font-mono text-micro uppercase text-cyan opacity-0 transition-opacity duration-200 group-hover/dock:opacity-100 group-focus-visible/dock:opacity-100 peer-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

/**
 * The glyph. Scales with its cell rather than sitting at a fixed size in a
 * growing box, which would read as the tile inflating around a static icon.
 */
export function DockIcon({ children }: { children: ReactNode }) {
  return <span className="flex h-1/2 w-1/2 items-center justify-center">{children}</span>;
}
