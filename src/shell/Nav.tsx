import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Command } from 'lucide-react';
import { motion } from 'motion/react';
import { site, nav as items } from '@/data/site';
import SwitchMode from '@/motion/SwitchMode';
import { useSectionSpy } from '@/hooks/useSectionSpy';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDialog } from '@/hooks/useDialog';
import { springOr, SPRING } from '@/lib/motion';

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

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const still = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  /*
    Visually this drawer is indistinguishable from the overlays that already
    get the full treatment — fixed, layered, covers content — so it gets the
    same three things: focus moves in, Tab stays inside, the page behind
    stops scrolling. Confirmed live before this fix: scrolling with the
    drawer open scrolled the page underneath it.
  */
  useDialog(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  /*
    This used to run its own scroll listener with its own threshold — a section
    became active here once its top passed 140px, and in the rail once it
    passed 40% of the viewport. Two definitions of one fact, which was
    invisible while the two surfaces were gated to non-overlapping widths and
    is not any more: the dock spans 320–1600px, so between 1024 and 1600 the
    header and the dock are both on screen and used to highlight different
    sections at the same moment.
  */
  const { active } = useSectionSpy();

  useEffect(() => {
    const id = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

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

        {/* plain text links */}
        <nav aria-label="Sections" className="hidden items-center gap-6 lg:flex">
          {items.map((it) => {
            const on = isOn(it);
            return (
              <Link
                key={it.href}
                to={it.href}
                aria-current={on ? 'page' : undefined}
                className={`relative py-2 font-mono text-fine transition-colors duration-300 ${
                  on ? 'text-amber' : 'text-dim hover:text-cyan'
                }`}
              >
                {it.label}
                {/* The same travelling marker as the work console's tab rail. */}
                {on && (
                  <motion.span
                    layoutId="nav-marker"
                    transition={springOr(still, SPRING.marker)}
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-amber"
                  />
                )}
              </Link>
            );
          })}

          <span className="h-5 w-px bg-cyan/15" />

          {/* The switch that changes the world the rest of this bar is drawn in. */}
          <SwitchMode size={24} />

          <Link
            to="/resume"
            className="flex items-center gap-1.5 font-mono text-fine text-dim transition-colors duration-300 hover:text-amber"
          >
            <Download size={15} strokeWidth={1.8} />
            CV
          </Link>

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
            className="flex items-center gap-1.5 rounded-sm border border-cyan/25 px-2.5 py-1.5 font-mono text-fine text-dim transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            <Command size={14} strokeWidth={1.8} />
            {isMac ? '⌘K' : 'Ctrl K'}
          </button>
        </nav>

        {/*
          On a phone the switch sits beside the menu button rather than inside
          the drawer. Changing the theme is not a navigation, and putting it
          behind a menu means the visitor has to open something, change it, and
          close it again to see what they changed.
        */}
        <div className="flex items-center gap-2 lg:hidden">
        <SwitchMode size={24} />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-1 flex h-11 w-11 flex-col items-center justify-center gap-[5px] text-cyan"
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
        ref={panelRef}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Site navigation"
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
        <nav aria-label="Sections" className="shell grid grid-cols-2 gap-2 py-4">
          {items.map((it, idx) => {
            const on = isOn(it);
            return (
              <Link
                key={it.href}
                to={it.href}
                data-autofocus={idx === 0 ? '' : undefined}
                aria-current={on ? 'page' : undefined}
                className={`flex min-h-[2.75rem] items-center rounded-sm border px-3 font-mono text-fine ${
                  on ? 'border-amber/60 bg-amber/12 text-amber' : 'border-cyan/30 bg-deep/60 text-cyan/80'
                }`}
              >
                {it.label}
              </Link>
            );
          })}
          <Link
            to="/resume"
            className="flex min-h-[2.75rem] items-center gap-2 rounded-sm border border-cyan/30 bg-deep/60 px-3 font-mono text-fine text-cyan/80"
          >
            <Download size={16} strokeWidth={1.8} /> CV
          </Link>
        </nav>
        </div>
      </div>
    </header>
  );
}
