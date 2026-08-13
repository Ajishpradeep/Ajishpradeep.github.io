import type { Variants } from 'motion/react';

/*
  The entrance variants, in `lib` rather than beside `InView`.

  Not a style preference: the lint gate is `--max-warnings 0` and
  `react-refresh/only-export-components` fails any module that exports both a
  component and a constant. Shared values live apart from the components that
  consume them, which is the rule the plugin is enforcing and a reasonable one.
*/

/**
 * The blur is the part worth keeping from Motion Primitives' default.
 *
 * A plain fade-and-rise is the most-shipped scroll reveal on the web and this
 * site already carries one — `[data-reveal]`, in CSS, on most of the page.
 * These variants exist for the places that need to stagger *children*, which a
 * CSS transition cannot coordinate, and the short defocus is what stops the
 * two reading as the same effect fired twice.
 */
export const RISE: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

/**
 * Stagger container. Children opt in with `RISE_ITEM`.
 *
 * 0.06s a step: DESIGN.md's rule is one authored moment per surface, and a
 * stagger that takes a second to clear stops being an entrance and becomes a
 * queue the reader waits in.
 */
export const RISE_GROUP: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export const RISE_ITEM: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
};
