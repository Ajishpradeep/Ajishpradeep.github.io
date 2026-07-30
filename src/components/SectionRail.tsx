import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'work', label: 'systems' },
  { id: 'impact', label: 'impact' },
  { id: 'method', label: 'method' },
  { id: 'capabilities', label: 'skills' },
  { id: 'lab', label: 'lab' },
  { id: 'research', label: 'research' },
  { id: 'contact', label: 'contact' },
];

/** Right-edge telemetry rail: scroll depth plus a tick per section. */
export default function SectionRail() {
  const [active, setActive] = useState('');
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);

      let cur = '';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const present = SECTIONS.filter(
    (s) => typeof document !== 'undefined' && document.getElementById(s.id),
  );
  if (!present.length) return null;

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex flex-col items-end gap-3">
        <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-amber">
          {String(pct).padStart(3, '0')}%
        </span>

        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="pointer-events-auto group flex items-center gap-2.5"
            >
              <span
                className={`font-mono text-[0.5625rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                  on
                    ? 'text-amber opacity-100'
                    : 'text-dim opacity-0 group-hover:opacity-100'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block transition-all duration-300 ${
                  on ? 'h-px w-6 bg-amber' : 'h-px w-3 bg-cyan/35 group-hover:w-5 group-hover:bg-cyan'
                }`}
              />
            </a>
          );
        })}
      </div>
    </aside>
  );
}
