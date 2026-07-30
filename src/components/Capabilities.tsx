import { capabilities } from '../data/research';

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-16 overflow-hidden border-b border-cyan/15 bg-deep/40 py-20"
    >
      <div className="grid-veil absolute inset-0 opacity-50" />

      <div className="shell relative">
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>CAPABILITIES<span className="text-amber">·]</span>
          </h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim sm:block">
            maths constant · domain variable
          </p>
        </div>

        <dl className="mt-8">
          {capabilities.map((c, i) => (
            <div
              key={c.area}
              className="grid gap-4 border-b border-cyan/10 py-7 lg:grid-cols-12 lg:gap-8"
              data-reveal
            >
              <dt className="flex items-baseline gap-3 lg:col-span-3">
                <span className="font-mono text-[0.625rem] text-amber">
                  ·{String(i + 1).padStart(2, '0')}·
                </span>
                <span className="font-display text-[1.0625rem] font-bold track-mid text-cyan">
                  {c.area}
                </span>
              </dt>
              <dd className="text-[0.875rem] leading-relaxed text-cyan/60 text-pretty lg:col-span-6">
                {c.detail}
              </dd>
              <dd className="flex flex-wrap gap-2 lg:col-span-3 lg:justify-end">
                {c.items.map((item) => (
                  <span
                    key={item}
                    className="border border-cyan/20 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-dim"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
