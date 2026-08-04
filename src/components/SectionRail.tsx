import { useEffect, useState } from 'react';
import { sections } from '../data/site';

/**
 * Right-edge rail: scroll depth plus a tick per section.
 *
 * It used to sit inside `aria-hidden` while still holding seven focusable
 * links — a keyboard user tabbed through seven destinations a screen reader
 * announced as nothing. The links are genuinely useful, so the fix was to stop
 * hiding them and label the landmark properly. Only the percentage readout,
 * which is decoration, stays hidden.
 */
export default function SectionRail() {
  const [active, setActive] = useState('');
  const [pct, setPct] = useState(0);
  const [present, setPresent] = useState<typeof sections>([]);

  useEffect(() => {
    setPresent(sections.filter((s) => document.getElementById(s.id)));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);

      let cur = '';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [present]);

  if (!present.length) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
    >
      <div className="flex flex-col items-end gap-2">
        <span className="mb-1 font-mono text-micro tracking-[0.16em] text-amber" aria-hidden>
          {String(pct).padStart(3, '0')}%
        </span>

        {present.map((s) => {
          const on = s.id === active;
          return (
            <a
              key={s.id}
              href={s.href}
              aria-current={on ? 'true' : undefined}
              /* py-1.5 gives each link a ≥24px target; the mark itself stays a hairline. */
              className="group flex items-center gap-2.5 py-1.5"
            >
              <span
                className={`font-mono text-micro uppercase tracking-[0.14em] transition-all duration-300 ${
                  on
                    ? 'text-amber opacity-100'
                    : 'text-dim opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block transition-all duration-300 ${
                  on
                    ? 'h-px w-6 bg-amber'
                    : 'h-px w-3 bg-cyan/50 group-hover:w-5 group-hover:bg-cyan'
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
