import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Trophy,
  Compass,
  FlaskConical,
  BookOpen,
  User,
  Download,
  Command,
} from 'lucide-react';
import { site } from '../data/site';

const items = [
  { label: 'Work', href: '/#work', id: 'work', icon: Layers },
  { label: 'Impact', href: '/#impact', id: 'impact', icon: Trophy },
  { label: 'Method', href: '/#method', id: 'method', icon: Compass },
  { label: 'Lab', href: '/#lab', id: 'lab', icon: FlaskConical },
  { label: 'Research', href: '/#research', id: 'research', icon: BookOpen },
  { label: 'About', href: '/about', id: 'about', icon: User },
];

export default function Nav() {
  const [active, setActive] = useState('work');
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const ids = ['work', 'impact', 'method', 'capabilities', 'lab', 'research', 'contact'];
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
        <Link to="/" className="flex items-baseline gap-2.5 text-cyan">
          <span className="font-display text-[1rem] font-bold track-mid">Pradeep Rajasekar</span>
          <span className="hidden font-mono text-[0.625rem] text-dim xl:inline">
            AI Research Engineer
          </span>
        </Link>

        {/* icon tiles */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {items.map((it) => {
            const Icon = it.icon;
            const on = isOn(it);
            return (
              <Link
                key={it.href}
                to={it.href}
                aria-current={on ? 'page' : undefined}
                className={`group relative flex w-[4.4rem] flex-col items-center gap-1 rounded-sm border px-1 py-2 transition-all duration-300 ${
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
                  className={`font-mono text-[0.625rem] tracking-[0.02em] transition-colors duration-300 ${
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
            className="group flex w-[4.4rem] flex-col items-center gap-1 rounded-sm border border-transparent px-1 py-2 transition-all duration-300 hover:border-cyan/25 hover:bg-panel/50"
          >
            <Download
              size={20}
              strokeWidth={1.7}
              className="text-cyan/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-amber"
            />
            <span className="font-mono text-[0.625rem] text-dim transition-colors group-hover:text-cyan">
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
            className="group flex w-[4.4rem] flex-col items-center gap-1 rounded-sm border border-cyan/25 px-1 py-2 transition-all duration-300 hover:border-amber hover:bg-amber/10"
          >
            <Command
              size={20}
              strokeWidth={1.7}
              className="text-cyan/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-amber"
            />
            <span className="font-mono text-[0.625rem] text-dim transition-colors group-hover:text-amber">
              ⌘K
            </span>
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-cyan lg:hidden"
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

      {/* mobile: icon grid */}
      <div
        className={`overflow-hidden border-t border-cyan/10 bg-void/95 transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[24rem] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav className="shell grid grid-cols-4 gap-2 py-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                to={it.href}
                className="flex flex-col items-center gap-1.5 rounded-sm border border-cyan/15 bg-deep/60 px-1 py-3"
              >
                <Icon size={20} strokeWidth={1.7} className="text-amber" />
                <span className="font-mono text-[0.625rem] text-cyan/80">{it.label}</span>
              </Link>
            );
          })}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-sm border border-cyan/15 bg-deep/60 px-1 py-3"
          >
            <Download size={20} strokeWidth={1.7} className="text-amber" />
            <span className="font-mono text-[0.625rem] text-cyan/80">CV</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
