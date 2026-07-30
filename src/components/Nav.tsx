import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nav, site } from '../data/site';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled || open
          ? 'border-b bg-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link
          to="/"
          className="group flex items-baseline gap-2.5 font-medium tracking-tight"
          aria-label="Home"
        >
          <span className="text-[0.95rem]">Pradeep Rajasekar</span>
          <span className="hidden font-mono text-micro uppercase text-faint sm:inline">
            AI Research Engineer
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="link-underline font-mono text-micro uppercase text-muted transition-colors duration-300 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="link-underline font-mono text-micro uppercase text-muted transition-colors duration-300 hover:text-ink"
          >
            Résumé
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ease-out ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ease-out ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="shell flex flex-col gap-1 pb-8 pt-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="border-b py-4 text-title font-medium tracking-tight"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="border-b py-4 text-title font-medium tracking-tight"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
