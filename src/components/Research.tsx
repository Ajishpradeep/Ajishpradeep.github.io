import { recognition, research } from '../data/research';
import SectionHead from './SectionHead';

const statusLabel: Record<string, string> = {
  published: 'Published',
  presented: 'Presented',
  'in-progress': 'In progress',
};

export default function Research() {
  return (
    <section id="research" className="scroll-mt-24 border-t py-28 sm:py-36">
      <div className="shell">
        <SectionHead
          index="04"
          label="Research & recognition"
          title={<>Work that left the building.</>}
          lede="Conference submissions, a thesis, independent research still in progress, and the public technical writing that keeps the foundations sharp."
        />

        <div className="mt-16 grid gap-16 sm:mt-20 lg:grid-cols-12 lg:gap-8">
          <ul className="border-t lg:col-span-8">
            {research.map((r) => {
              const Row = (
                <>
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="text-[1.0625rem] font-medium leading-snug tracking-tight text-balance">
                      {r.title}
                    </h3>
                    <span className="shrink-0 font-mono text-micro uppercase text-faint">
                      {r.year}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-micro uppercase text-faint">
                    {r.venue} · {statusLabel[r.status]}
                  </p>
                  <p className="mt-3.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted text-pretty">
                    {r.summary}
                  </p>
                </>
              );

              return (
                <li key={r.title} className="border-b" data-reveal>
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group block py-7 transition-opacity duration-300 hover:opacity-70"
                    >
                      {Row}
                      <span className="mt-4 inline-block font-mono text-micro uppercase text-accent">
                        View repository ↗
                      </span>
                    </a>
                  ) : (
                    <div className="py-7">{Row}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Recognition</p>
            <ul className="mt-6 border-t">
              {recognition.map((r) => (
                <li key={r.title} className="border-b py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[0.9375rem] font-medium tracking-tight">{r.title}</h3>
                    <span className="shrink-0 font-mono text-micro text-faint">{r.year}</span>
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted text-pretty">
                    {r.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
