import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Trophy,
  Compass,
  FlaskConical,
  BookOpen,
  User,
  Mail,
  Download,
  Command,
} from 'lucide-react';
import { site, nav as items, sections } from '../data/site';

const navIcon = {
  work: Layers,
  impact: Trophy,
  method: Compass,
  research: BookOpen,
  lab: FlaskConical,
  contact: Mail,
  about: User,
} as const;

export default function Nav() {
  const [active, setActive] = useState('work');
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const onScroll = () => {
      let current = 'work';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname, hash]);

  const isOn = (it: (typeof items)[number]) =>
    it.href === '/about' ? pathname === '/about' : pathname === '/' && active === it.id;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan/15 bg-void/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.75rem]">
        {/*
          Name and role, on every breakpoint. The role used to be gated behind
          `xl:inline`, so on a phone or tablet the homepage never said what this
          person does — the single field a recruiter needs first.
        */}
        <Link to="/" className="-my-2 flex flex-col justify-center py-2 text-cyan">
          <span className="font-display text-base font-bold leading-tight sm:text-base">
            {site.name}
          </span>
          <span className="font-mono text-micro leading-tight text-dim">
            {site.role}
          </span>
        </Link>

        {/* icon tiles */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {items.map((it) => {
            const Icon = navIcon[it.id];
            const on = isOn(it);
            return (
              <Link
                key={it.href}
                to={it.href}
                aria-current={on ? 'page' : undefined}
                className={`group relative flex w-[5rem] flex-col items-center gap-1 rounded-sm border px-1 py-2 transition-all duration-300 ${
                  on
                    ? 'border-amber/60 bg-amber/12'
                    : 'border-transparent hover:border-cyan/25 hover:bg-panel/50'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.7}
                  className={`transition-all duration-300 ${
                    on ? 'text-amber' : 'text-cyan/70 group-hover:-translate-y-0.5 group-hover:text-amber'
                  }`}
                />
                <span
                  className={`font-mono text-micro tracking-[0.02em] transition-colors duration-300 ${
                    on ? 'text-amber' : 'text-dim group-hover:text-cyan'
                  }`}
                >
                  {it.label}
                </span>
                {on && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-amber" />
                )}
              </Link>
            );
          })}

          <span className="mx-1.5 h-8 w-px bg-cyan/15" />

          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="group flex w-[5rem] flex-col items-center gap-1 rounded-sm border border-transparent px-1 py-2 transition-all duration-300 hover:border-cyan/25 hover:bg-panel/50"
          >
            <Download
              size={20}
              strokeWidth={1.7}
              className="text-cyan/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-amber"
            />
            <span className="font-mono text-micro text-dim transition-colors group-hover:text-cyan">
              CV
            </span>
          </a>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
              )
            }
            aria-label="Open command deck"
            className="group flex w-[5rem] flex-col items-center gap-1 rounded-sm border border-cyan/25 px-1 py-2 transition-all duration-300 hover:border-amber hover:bg-amber/10"
          >
            <Command
              size={20}
              strokeWidth={1.7}
              className="text-cyan/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-amber"
            />
            <span className="font-mono text-micro text-dim transition-colors group-hover:text-amber">
              ⌘K
            </span>
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-1 flex h-11 w-11 flex-col items-center justify-center gap-[5px] text-cyan lg:hidden"
        >
          <span
            className={`h-px w-5 bg-current transition-transform duration-300 ${
              open ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-current transition-transform duration-300 ${
              open ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/*
        mobile: icon grid.

        `inert` is what keeps this honest. The drawer collapses to max-height:0
        with opacity:0 rather than display:none, so without it all eight
        destinations stayed in the tab order while the menu was visually
        closed — a keyboard user below 1024px tabbed into eight invisible
        links. Impact's collapsed panels already solved this; the fix simply
        had not been carried across.
      */}
      <div
        inert={!open ? '' : undefined}
        className={`overflow-hidden border-t border-cyan/20 bg-void/95 transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[24rem] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav className="shell grid grid-cols-4 gap-2 py-4">
          {items.map((it) => {
            const Icon = navIcon[it.id];
            const on = isOn(it);
            return (
              <Link
                key={it.href}
                to={it.href}
                aria-current={on ? 'page' : undefined}
                className={`flex min-h-[2.75rem] flex-col items-center justify-center gap-1.5 rounded-sm border px-1 py-3 ${
                  on ? 'border-amber/60 bg-amber/12' : 'border-cyan/30 bg-deep/60'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.7}
                  className={on ? 'text-amber' : 'text-amber/80'}
                />
                <span className={`font-mono text-micro ${on ? 'text-amber' : 'text-cyan/80'}`}>
                  {it.label}
                </span>
              </Link>
            );
          })}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[2.75rem] flex-col items-center justify-center gap-1.5 rounded-sm border border-cyan/30 bg-deep/60 px-1 py-3"
          >
            <Download size={20} strokeWidth={1.7} className="text-amber/80" />
            <span className="font-mono text-micro text-cyan/80">CV</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
