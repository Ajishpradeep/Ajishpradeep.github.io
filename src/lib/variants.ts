import type { Variants } from 'motion/react';

/*
  The entrance variants, in `lib` rather than beside `InView`.

  Not a style preference: the lint gate is `--max-warnings 0` and
  `react-refresh/only-export-components` fails any module that exports both a
  component and a constant. Shared values live apart from the components that
  consume them, which is the rule the plugin is enforcing and a reasonable one.
*/

/**
 * A plain fade-and-rise, matching `[data-reveal]`'s CSS entrance elsewhere on
 * the page — these variants exist only for the places that need to stagger
 * *children* on remount (e.g. Selected work's metrics, keyed on case), which
 * a CSS transition cannot coordinate. No blur: two visually different
 * "reveal" effects on one page reads as two unrelated systems rather than one
 * considered one, so this uses the same fade+rise `[data-reveal]` already
 * carries.
 */
export const RISE: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Stagger container. Children opt in with `RISE_ITEM`.
 *
 * 0.06s a step: the rule is one authored moment per surface, and a
 * stagger that takes a second to clear stops being an entrance and becomes a
 * queue the reader waits in.
 */
export const RISE_GROUP: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export const RISE_ITEM: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
