import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import SpotlightBorder from './motion/SpotlightBorder';

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
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-[5.5rem] overflow-hidden py-16 sm:py-20"
    >
      <div className="grid-veil absolute inset-0 opacity-60" />

      {/*
        The horizon stays and the particle canvas that sat on top of it does
        not. A ground plane in perspective is the one background on this page
        that belongs to a product about measuring things in three dimensions;
        a drifting node field was the same decoration as every other site's.
      */}
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
            id="contact-title"
            className="font-display text-headline font-extrabold uppercase text-cyan"
            data-reveal
          >
            Contact
          </h2>
          <p className="inline-flex items-center gap-1.5 tag-sm text-dim">
            <MapPin size={13} strokeWidth={2} />
            {site.location}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/*
              `text-mega` is documented as the h1, once per page. This is an
              h3 in the last section and it was set at the same size as the
              page's only h1, which made the type scale say the two were peers.

              It read "Let's build something true" — the one slogan on a site
              that otherwise only states things, and an imperative aimed at a
              reader who has not agreed to anything yet. The paragraph beneath
              it is already `about.open.body`; this is that block's own heading,
              so the two now come from one place and say the same thing.
            */}
            <h3
              className="max-w-[18ch] text-balance font-display text-headline font-extrabold uppercase text-amber glow-amber"
              data-reveal
            >
              {about.open.heading}
            </h3>
            <p
              className="mt-7 copy"
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
              <Link to="/resume" className="btn-ghost">
                <Download size={15} strokeWidth={2} /> Résumé
              </Link>
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? `${site.email} copied to the clipboard` : ''}
            </p>
          </div>

          <div className="lg:col-span-5" data-reveal>
            {/*
              `grid-cols-1`: without an explicit column, an unconstrained
              single implicit track auto-sizes to its widest child's
              max-content width rather than the container's — and `truncate`
              on the email handle below needs a *constrained* width to know
              when to clip. Without this the track just grows to fit the full
              un-ellipsised address and truncate never fires.
            */}
            <ul className="grid grid-cols-1 gap-3">
              {site.links.map((l) => {
                const Icon = linkIcon[l.label] ?? Globe;
                return (
                  <li key={l.label}>
                    {/*
                      The three ways to start the conversation the whole page
                      exists to start, and the only place besides the case-study
                      band where the border spotlight is spent.

                      `.card trace lift` came off them. The trace draws corner
                      brackets on hover and the lift raises the card 3px; with
                      the spotlight running the frame as well, that is three
                      devices reporting one hover, which is exactly the pile-up
                      DESIGN.md records having to strip off the capability
                      graph. The light is the strongest of the three and it is
                      the only one that says *where* you are pointing.
                    */}
                    <SpotlightBorder size={220} innerClassName="bg-deep">
                    <a
                      href={l.href}
                      target={l.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-[3px] p-4 transition-colors duration-500 hover:bg-panel/40"
                    >
                      <Icon size={24} strokeWidth={1.6} className="icon-mark" />
                      <span className="min-w-0 flex-1">
                        <span className="block tag-sm text-dim">{l.label}</span>
                        <span className="mt-0.5 block truncate font-display text-base font-medium text-cyan group-hover:text-amber">
                          {l.handle}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        strokeWidth={2}
                        className="shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                      />
                    </a>
                    </SpotlightBorder>
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
