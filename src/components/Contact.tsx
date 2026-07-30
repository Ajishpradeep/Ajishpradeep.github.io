import { site } from '../data/site';
import { about } from '../data/about';
import HudCanvas from './HudCanvas';

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden py-24">
      <div className="grid-veil absolute inset-0 opacity-60" />
      <HudCanvas />

      {/* horizon: a drawn synth grid, no image assets */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 overflow-hidden opacity-45">
        <div
          className="absolute inset-x-[-50%] bottom-0 h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(var(--cyan) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--cyan) / 0.35) 1px, transparent 1px)',
            backgroundSize: '64px 34px',
            transform: 'perspective(280px) rotateX(62deg)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      <div className="shell relative">
        <div className="flex items-end justify-between gap-6 border-b border-cyan/15 pb-5">
          <h2 className="font-display text-headline font-extrabold uppercase track-mid text-cyan" data-reveal>
            <span className="text-amber">[·</span>CONTACT<span className="text-amber">·]</span>
          </h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim sm:block">
            {site.location}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h3
              className="max-w-[18ch] font-display text-mega font-extrabold uppercase leading-[1.02] text-amber glow-amber"
              data-reveal
            >
              Let&rsquo;s build
              <br />
              something true
            </h3>
            <p
              className="mt-8 max-w-[60ch] text-lede text-cyan/70 text-pretty"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              {about.open.body}
            </p>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <div className="hud hud-amber bg-deep/70 p-7">
              <p className="tag text-amber">
                <span className="bracket">direct line</span>
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 block break-all font-display text-[1.35rem] font-bold text-cyan transition-colors hover:text-amber"
              >
                {site.email}
              </a>

              <ul className="mt-8 space-y-3">
                {site.links.map((l) => (
                  <li key={l.label} className="flex items-baseline justify-between gap-4 border-b border-cyan/10 pb-2.5">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
                      {l.label}
                    </span>
                    <a
                      href={l.href}
                      target={l.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="font-mono text-[0.75rem] text-cyan transition-colors hover:text-amber"
                    >
                      {l.handle}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-amber mt-8 w-full justify-center"
              >
                download cv <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
