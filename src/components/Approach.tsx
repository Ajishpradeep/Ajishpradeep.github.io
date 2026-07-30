import { principles } from '../data/research';
import SectionHead from './SectionHead';

export default function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 border-t py-28 sm:py-36">
      <div className="shell">
        <SectionHead
          index="02"
          label="How I work"
          title={<>Six things I learned by being wrong in a measurable way.</>}
          lede="Each of these came from a specific system doing something specific and unexpected. They are the reason my second attempt at a problem is usually much faster than my first."
        />

        <ol className="mt-16 grid gap-px border sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="relative bg-bg p-7 outline outline-1 outline-offset-0 sm:p-9"
              style={{ outlineColor: 'rgb(var(--rule) / var(--rule-alpha))' }}
              data-reveal
            >
              <span
                className="font-mono text-micro text-faint"
                style={{ '--reveal-delay': `${i * 40}ms` } as React.CSSProperties}
              >
                {p.n}
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-medium leading-snug tracking-tight text-balance">
                {p.title}
              </h3>
              <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-muted text-pretty">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
