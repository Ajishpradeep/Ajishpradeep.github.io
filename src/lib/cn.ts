/**
 * The Motion Primitives sources use `cn` from `@/lib/utils`, which is
 * `clsx` + `tailwind-merge`. Neither is installed here and neither is needed:
 * this project writes its own class strings rather than composing conflicting
 * ones from props, so there is nothing for `tailwind-merge` to resolve.
 *
 * Two dependencies avoided for a six-line function.
 */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
