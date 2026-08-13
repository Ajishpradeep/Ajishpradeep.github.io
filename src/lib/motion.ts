import type { Transition } from 'motion/react';

/**
 * The motion vocabulary.
 *
 * The site already had one easing curve — `cubic-bezier(0.16, 1, 0.3, 1)`, an
 * exponential ease-out — used for every CSS transition on the page. Springs
 * introduced by `motion` have to sound like that curve or the site acquires two
 * motion accents, which is the same defect as the two h2 registers DESIGN.md
 * records fixing.
 *
 * So: confident arrival, no bounce, exit faster than entrance. `bounce` is
 * zero or near it everywhere except `press`, where a control being struck is
 * exactly the case an overshoot describes correctly.
 *
 * Three springs and no more, for the same reason there are six type steps.
 */
export const SPRING = {
  /**
   * The travelling amber marker — the rail selection in the work console and
   * the row marker in the capabilities matrix. Fast and dead-stop: a selector
   * on an instrument arrives at its detent, it does not wobble past it.
   */
  marker: { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 },

  /**
   * Layout and overlay. 300–500ms per the timing table, expressed as a spring
   * so an interruption — a second card opened before the first finished — is
   * continuous rather than a restart from a fresh keyframe.
   */
  panel: { type: 'spring', bounce: 0.06, duration: 0.42 },

  /**
   * Immediate feedback on a struck control. This is the one place overshoot is
   * honest: the dock item is being pressed, and a thing that is pressed
   * rebounds.
   */
  press: { type: 'spring', stiffness: 520, damping: 17, mass: 0.9 },
} satisfies Record<string, Transition>;

/**
 * The transition to use when the visitor has asked for reduced motion.
 *
 * Not `duration: 0` and not "no transition at all". `AnimatePresence` and
 * `layout` need a transition object to resolve against; a 1ms tween is the
 * honest reduced-motion path — the state change still happens, it just does
 * not travel. This mirrors what the stylesheet already does to every CSS
 * animation on the page, so the two agree.
 */
export const STILL: Transition = { duration: 0.001 };

/** `SPRING.x` normally; a snap when the visitor asked for one. */
export const springOr = (still: boolean, spring: Transition): Transition =>
  still ? STILL : spring;
