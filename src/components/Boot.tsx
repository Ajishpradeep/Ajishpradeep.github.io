import { useEffect, useRef, useState } from 'react';

/** Lines are written to look like a model-serving cold start, because that is the subject. */
const LINES = [
  'init  · runtime/edge · arm64 · coreml',
  'load  · pose.backbone   [ 24 kpt ]  ok',
  'load  · pose.club_head  [  5 kpt ]  ok',
  'calib · multi-view geometry · 2 cam  ok',
  'anchor· scale → anthropometric ref   ok',
  'gate  · physics · rom · continuity   ok',
  'bind  · llm.narrator  · tools=verdicts',
  'ready · 240 fps · mpjpe 3.0cm',
];

export default function Boot({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }

    const start = performance.now();
    // 2100ms was 4-9% of a 30-60 second visit spent on a splash screen.
    const DUR = 1400;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      // ease-out so it decelerates into 100
      const eased = 1 - Math.pow(1 - t, 2.4);
      setPct(Math.round(eased * 100));
      setShown(Math.floor(eased * LINES.length));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        setLeaving(true);
        window.setTimeout(onDone, 420);
      }
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      if (done.current) return;
      done.current = true;
      cancelAnimationFrame(raf);
      setPct(100);
      setLeaving(true);
      window.setTimeout(onDone, 380);
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-void transition-opacity duration-500 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading"
    >
      <div className="grid-veil absolute inset-0 opacity-60" />

      <div className="relative w-full max-w-2xl px-6">
        <p className="tag text-center text-dim">
          <span className="bracket">pradeep rajasekar · ai research engineer</span>
        </p>

        <p className="mt-8 text-center font-mono text-[2.75rem] leading-none text-amber glow-amber sm:text-[4rem]">
          {String(pct).padStart(3, '0')}
          <span className="ml-1 text-[1.25rem] align-top opacity-70">%</span>
        </p>

        {/* progress rail */}
        <div className="relative mt-6 h-px w-full bg-cyan/20">
          <div
            className="absolute inset-y-0 left-0 bg-amber transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="mt-10 space-y-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-cyan/70">
          {LINES.slice(0, shown).map((l) => (
            <li key={l} className="flex gap-3">
              <span className="text-amber/80">›</span>
              <span>{l}</span>
            </li>
          ))}
          {shown < LINES.length && (
            <li className="flex gap-3">
              <span className="text-amber/80">›</span>
              <span className="blink">_</span>
            </li>
          )}
        </ul>

        <p className="mt-12 text-center tag text-dim">
          <span className="bracket">tap or press any key to skip</span>
        </p>
      </div>
    </div>
  );
}
