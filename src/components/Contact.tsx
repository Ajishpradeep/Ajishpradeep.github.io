import { useCallback, useEffect, useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  Download,
  ArrowUpRight,
  MapPin,
  Copy,
  Check,
} from 'lucide-react';
import { site } from '../data/site';
import { about } from '../data/about';
import HudCanvas from './HudCanvas';

const linkIcon: Record<string, typeof Mail> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // No clipboard permission — the mailto link and the visible address remain.
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <section id="contact" className="relative scroll-mt-[5.5rem] overflow-hidden py-24">
      <div className="grid-veil absolute inset-0 opacity-60" />
      <HudCanvas />

      {/* drawn horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 overflow-hidden opacity-40">
        <div
          className="absolute inset-x-[-50%] bottom-0 h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(var(--cyan) / 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--cyan) / 0.3) 1px, transparent 1px)',
            backgroundSize: '64px 34px',
            transform: 'perspective(280px) rotateX(62deg)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan/15 pb-5">
          <h2
            className="font-display text-headline font-extrabold uppercase track-mid text-cyan"
            data-reveal
          >
            <span className="text-amber">[</span>Contact<span className="text-amber">]</span>
          </h2>
          <p className="inline-flex items-center gap-1.5 tag-sm text-dim">
            <MapPin size={13} strokeWidth={2} />
            {site.location}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h3
              className="max-w-[16ch] text-balance font-display text-mega font-extrabold uppercase leading-[1.02] track-mid text-amber glow-amber"
              data-reveal
            >
              Let&rsquo;s build something true
            </h3>
            <p
              className="mt-7 max-w-[52ch] copy"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              {about.open.body}
            </p>

            <div
              className="mt-9 flex flex-wrap gap-3"
              data-reveal
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            >
              <a href={`mailto:${site.email}`} className="btn-amber">
                <Mail size={15} strokeWidth={2} /> Email me
              </a>
              {/* mailto is not a given — plenty of machines have nothing wired
                  to it. Copying the address is the reliable path. */}
              <button type="button" onClick={copy} className="btn-ghost">
                {copied ? (
                  <Check size={15} strokeWidth={2} />
                ) : (
                  <Copy size={15} strokeWidth={2} />
                )}
                {copied ? 'Address copied' : 'Copy address'}
              </button>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                <Download size={15} strokeWidth={2} /> Résumé
              </a>
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? `${site.email} copied to the clipboard` : ''}
            </p>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <ul className="grid gap-3">
              {site.links.map((l) => {
                const Icon = linkIcon[l.label] ?? Globe;
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="card trace lift group flex items-center gap-4 p-4"
                    >
                      <span className="plate transition-colors duration-500 group-hover:border-amber/60">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block tag-sm text-dim">{l.label}</span>
                        <span className="mt-0.5 block truncate font-display text-[0.9375rem] font-medium text-cyan group-hover:text-amber">
                          {l.handle}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        strokeWidth={2}
                        className="shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
