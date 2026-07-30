import { EyeOff, Lock, Waves, AlertTriangle, Calculator, FileWarning } from 'lucide-react';
import { principles } from '../data/research';

const icons = [EyeOff, Lock, Waves, AlertTriangle, Calculator, FileWarning];

export default function Approach() {
  return (
    <section
      id="method"
      className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 py-20"
    >
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Method<span className="text-amber">]</span>
          </h2>
          <p className="tag-sm text-dim">Six findings · from being wrong measurably</p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = icons[i] ?? EyeOff;
            return (
              <li
                key={p.n}
                className="card group p-6"
                data-reveal
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="plate transition-colors duration-500 group-hover:border-amber/60">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-[2rem] font-extrabold leading-none text-cyan/10 transition-colors duration-500 group-hover:text-amber/25">
                    {p.n}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[1.0625rem] font-bold leading-snug text-cyan text-balance">
                  {p.title}
                </h3>
                <p className="mt-2.5 copy-sm">{p.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
