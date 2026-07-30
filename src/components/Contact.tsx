import { site } from '../data/site';
import { about } from '../data/about';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t py-28 sm:py-36">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex items-baseline gap-4 lg:col-span-3" data-reveal>
            <span className="font-mono text-micro text-faint">05</span>
            <span className="eyebrow">Contact</span>
          </div>

          <div className="lg:col-span-9">
            <h2 className="max-w-[16ch] text-headline font-medium text-balance" data-reveal>
              Building something where the maths has to be{' '}
              <span className="font-serif font-normal italic tracking-[-0.02em]">right</span>?
            </h2>

            <p
              className="mt-7 max-w-prose text-lede text-muted text-pretty"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              {about.open.body}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="group mt-12 inline-flex items-baseline gap-5 border-b pb-3 transition-colors duration-500 hover:border-b-2"
              data-reveal
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            >
              <span className="text-title font-medium tracking-tight">{site.email}</span>
              <span
                aria-hidden
                className="text-lg text-faint transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-ink"
              >
                →
              </span>
            </a>

            <ul
              className="mt-14 flex flex-wrap gap-x-10 gap-y-4"
              data-reveal
              style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
            >
              {site.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="link-underline font-mono text-micro uppercase text-muted transition-colors hover:text-ink"
                  >
                    {l.label} — {l.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
