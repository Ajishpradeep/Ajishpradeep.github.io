import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const KEY = 'ajishpradeep:theme';
const listeners = new Set<() => void>();

let theme: Theme = 'dark';

/*
  `next-themes` is what the upstream SwitchMode imports. It is a Next.js package
  carrying a provider, a script-injection strategy and SSR hydration handling,
  and this is a static Vite SPA with one document and no server. Thirty lines
  replace it.

  The flash is dealt with in `index.html` rather than here: a blocking inline
  script sets `data-theme` before the first paint, so the page never renders in
  the wrong world and then corrects itself. React reads the attribute the script
  already set rather than deciding again.
*/
function read(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(next: Theme) {
  theme = next;
  document.documentElement.dataset.theme = next;
  // `color-scheme` drives the form controls, the scrollbar and the caret. It
  // is the one thing that cannot be done with custom properties.
  document.documentElement.style.colorScheme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Private browsing. The choice lasts the session; nothing else breaks.
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  if (listeners.size === 0) theme = read();
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * The site's two worlds.
 *
 * Dark is the instrument panel it was designed as. Light is not that panel
 * inverted — see the `[data-theme='light']` block in `index.css` for what it
 * actually is. Both are complete; neither is a fallback for the other.
 */
export function useTheme() {
  const current = useSyncExternalStore(subscribe, () => theme, () => 'dark' as Theme);

  const setTheme = useCallback((next: Theme) => apply(next), []);
  const toggle = useCallback(() => apply(read() === 'dark' ? 'light' : 'dark'), []);

  /*
    Follow the system only while the visitor has never chosen. Once they press
    the switch their choice outranks the OS, which is the behaviour every
    theme toggle should have and most do not.
  */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      stored = null;
    }
    if (stored) return;

    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => apply(mq.matches ? 'light' : 'dark');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return { theme: current, setTheme, toggle, isDark: current === 'dark' };
}
