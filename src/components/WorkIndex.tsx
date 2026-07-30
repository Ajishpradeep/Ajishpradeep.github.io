import { Link } from 'react-router-dom';
import { work } from '../data/work';
import SectionHead from './SectionHead';

export default function WorkIndex() {
  return (
    <section id="work" className="scroll-mt-24 py-28 sm:py-36">
      <div className="shell">
        <SectionHead
          index="01"
          label="Selected work"
          title={<>Five systems, and what each one refused to do at first.</>}
          lede="Case studies written the way the work actually went — the failure that was invisible in the metrics, the fix that was architectural rather than statistical, and the number at the end."
        />
      </div>

      <ul className="mt-16 border-t sm:mt-20">
        {work.map((item) => (
          <li key={item.slug} data-reveal>
            <Link
              to={`/work/${item.slug}`}
              className="group block border-b transition-colors duration-500 hover:bg-surface"
            >
              <div className="shell grid gap-4 py-9 sm:py-11 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                <div className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="font-mono text-micro text-faint">{item.index}</span>
                  <span className="font-mono text-micro uppercase text-faint">{item.domain}</span>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="text-title font-medium tracking-tight text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted text-pretty">
                    {item.teaser}
                  </p>
                  <p className="mt-4 font-mono text-micro uppercase text-faint">
                    {item.org} · {item.period}
                  </p>
                </div>

                <div className="flex items-baseline justify-between gap-6 lg:col-span-3 lg:justify-end">
                  <p className="font-mono text-[1.05rem] tracking-tight text-ink">
                    {item.metrics[0].value}
                    <span className="ml-2 text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-faint">
                      {item.metrics[0].label}
                    </span>
                  </p>
                  <span
                    aria-hidden
                    className="shrink-0 text-lg text-faint transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-ink"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
