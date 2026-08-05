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

/*
  The shortcut hint was hardcoded to ⌘K, so every Windows and Linux visitor was
  shown a key their keyboard does not have, on a button whose whole purpose is
  to teach the shortcut. `userAgentData.platform` where it exists, `userAgent`
  where it does not; either way this is a label, so being wrong costs a wrong
  hint rather than a broken control.
*/
const isMac =
  typeof navigator !== 'undefined' &&
  /mac|iphone|ipad|ipod/i.test(
    (navigator as { userAgentData?: { platform?: string } }).userAgentData?.platform ??
      navigator.userAgent,
  );

/** Both the header button and the command deck itself listen for this. */
export const OPEN_DECK = 'commanddeck:open';

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
        <nav aria-label="Sections" className="hidden items-center gap-1.5 lg:flex">
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

          {/*
            This dispatched a synthetic KeyboardEvent with metaKey:true and let
            the deck's global shortcut handler catch it — a button pretending to
            be a keypress. It worked, and it broke the moment anything else
            reasoned about real key events. A named event says what is meant.
          */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_DECK))}
            aria-label="Open command deck"
            className="group flex w-[5rem] flex-col items-center gap-1 rounded-sm border border-cyan/25 px-1 py-2 transition-all duration-300 hover:border-amber hover:bg-amber/10"
          >
            <Command
              size={20}
              strokeWidth={1.7}
              className="text-cyan/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-amber"
            />
            <span className="font-mono text-micro text-dim transition-colors group-hover:text-amber">
              {isMac ? '⌘K' : 'Ctrl K'}
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
      {/*
        `transition-[max-height]` against a guessed 24rem ceiling: the drawer
        animated to a height it does not have, so the ease was wrong at the end
        and the guess would have broken the moment a nav item was added.
        `grid-template-rows: 0fr → 1fr` animates the real height, and the same
        idiom is already what Impact's accordion panels use.
      */}
      <div
        inert={!open ? '' : undefined}
        className={`grid border-t bg-void/95 transition-[grid-template-rows,opacity] duration-500 ease-out lg:hidden ${
          open
            ? 'grid-rows-[1fr] border-cyan/20 opacity-100'
            : 'grid-rows-[0fr] border-transparent opacity-0'
        }`}
      >
        {/*
          The clipping element carries no padding of its own. With
          `box-sizing: border-box` a 0fr track cannot squeeze padding below the
          border box, so `py-4` here would have left a 32px sliver of drawer
          visible while closed.
        */}
        <div className="overflow-hidden">
        <nav aria-label="Sections" className="shell grid grid-cols-4 gap-2 py-4">
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
      </div>
    </header>
  );
}
