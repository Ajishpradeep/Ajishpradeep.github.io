import { useEffect, useRef, useState } from 'react';

/** Fires once when the element first enters the viewport. */
export function useInView<T extends HTMLElement>(rootMargin = '-10% 0px') {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return { ref, seen };
}

/**
 * Counts a numeric value up when it scrolls into view, preserving whatever
 * prefix/suffix the source string carries ("8cm → 3cm", "+30%", "7,000+").
 */
export function useCountUp(display: string, seen: boolean, duration = 1100) {
  const [out, setOut] = useState(display);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(display);
      return;
    }

    const matches = [...display.matchAll(/[\d.,]+/g)];
    const last = matches[matches.length - 1];
    if (!last) {
      setOut(display);
      return;
    }

    /*
     * Only count when the last number is the figure being claimed: either it is
     * the only number ("240fps"), or the string is a stated progression whose
     * result is the last number ("8cm → 3cm"). Anything else is a compound
     * figure where animating one part misreads it — "1 of 3" counted its
     * denominator and rendered a competition win as "1 of 0".
     */
    if (matches.length > 1 && !display.includes('→')) {
      setOut(display);
      return;
    }

    const raw = last[0];
    const target = parseFloat(raw.replace(/,/g, ''));
    if (!Number.isFinite(target)) {
      setOut(display);
      return;
    }

    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const grouped = raw.includes(',');
    const start = performance.now();
    let raf = 0;

    const fmt = (n: number) => {
      const fixed = n.toFixed(decimals);
      return grouped ? Number(fixed).toLocaleString('en-US') : fixed;
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = fmt(target * eased);
      setOut(
        display.slice(0, last.index) + value + display.slice(last.index! + raw.length),
      );
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [display, seen, duration]);

  return out;
}
