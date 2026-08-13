import { useEffect, type RefObject } from 'react';

/**
 * The three things every overlay on this site owes its visitor, in one place.
 *
 * `aria-modal="true"` tells assistive technology the rest of the page is gone.
 * It does not make it so — without a trap, Tab walks straight out into the
 * document behind, and focus and the screen reader's model of the page diverge
 * silently. The command deck learned this the hard way and carries its own
 * copy of the fix; this is that fix, extracted, so the next overlay does not
 * have to rediscover it.
 *
 *   1. Focus moves in on open and returns to whatever opened it on close.
 *   2. Tab cycles inside the panel.
 *   3. The document behind does not scroll.
 *
 * Escape is handled by the caller, because what Escape means is a decision the
 * overlay owns — this one steps back to the list, the command deck clears its
 * query first.
 */
export function useDialog(open: boolean, panelRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    /*
      One frame, not zero: the panel is mid-layout-animation on the tick it
      mounts, and focusing it then makes the browser scroll to where it is
      standing at that instant rather than where it is going.
    */
    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      panel.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }, 40);

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onTab, true);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onTab, true);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [open, panelRef]);
}
