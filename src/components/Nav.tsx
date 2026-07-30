import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../data/site';

const items = [
  { label: 'work', href: '/#work' },
  { label: 'impact', href: '/#impact' },
  { label: 'method', href: '/#method' },
  { label: 'lab', href: '/#lab' },
  { label: 'research', href: '/#research' },
  { label: 'about', href: '/about' },
];

export default function Nav() {
  const [active, setActive] = useState('work');
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // The bar tints to match whichever section is under it.
  useEffect(() => {
    const ids = ['work', 'impact', 'method', 'capabilities', 'lab', 'research', 'contact'];
    const onScroll = () => {
      let current = 'work';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname, hash]);

  const tint =
    pathname === '/about'
      ? 'bg-panel-hi/90'
      : active === 'contact'
        ? 'bg-amber/90'
        : active === 'research'
          ? 'bg-panel-hi/85'
          : 'bg-panel/85';

  const onAmber = active === 'contact' && pathname === '/';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-cyan/15 backdrop-blur-md transition-colors duration-700 ${tint}`}
    >
      <div className="shell flex h-14 items-center justify-between gap-6 sm:h-16">
        <Link
          to="/"
          className={`flex items-baseline gap-2.5 transition-colors ${
            onAmber ? 'text-void' : 'text-cyan'
          }`}
        >
          <span className="font-display text-[1rem] font-bold track-mid">Pradeep Rajasekar</span>
          <span
            className={`hidden font-mono text-[0.625rem] sm:inline ${
              onAmber ? 'text-void/70' : 'text-dim'
            }`}
          >
            AI Research Engineer
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {items.map((item) => {
            const isActive =
              (item.href.startsWith('/#') && `/${''}` === pathname && active === item.href.slice(2)) ||
              (item.href === '/about' && pathname === '/about');
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`rounded-sm px-2 py-1 font-mono text-[0.75rem] font-medium capitalize tracking-[0.04em] transition-colors duration-300 ${
                  isActive
                    ? 'bg-signal text-void'
                    : onAmber
                      ? 'text-void/80 hover:text-void'
                      : 'text-cyan/85 hover:bg-panel/60 hover:text-amber'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className={`tag transition-colors duration-300 ${
              onAmber ? 'text-void/80 hover:text-void' : 'text-cyan/80 hover:text-amber'
            }`}
          >
            CV
          </a>

          {/* Command deck affordance — the palette itself listens globally. */}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
              )
            }
            aria-label="Open command deck"
            className={`flex items-center gap-2 border px-2.5 py-1 transition-colors duration-300 ${
              onAmber
                ? 'border-void/40 text-void hover:bg-void/10'
                : 'border-cyan/30 text-cyan/70 hover:border-amber hover:text-amber'
            }`}
          >
            <span className="font-mono text-[0.625rem] tracking-[0.14em]">⌘K</span>
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden ${
            onAmber ? 'text-void' : 'text-cyan'
          }`}
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

      <div
        className={`overflow-hidden bg-void/95 transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="shell flex flex-col py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="border-b border-cyan/10 py-4 font-display text-[1rem] font-medium capitalize text-cyan/90"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="py-4 font-display text-[1rem] font-medium text-cyan/90"
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
}
