import { useCallback, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Boot from './components/Boot';
import CommandDeck from './components/CommandDeck';
import SectionRail from './components/SectionRail';
import { useReveal, useScrollReset } from './hooks/useReveal';
import './index.css';

export default function App() {
  const { pathname, hash } = useLocation();
  // Boot plays once per tab, not on every internal navigation.
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem('booted') === '1';
    } catch {
      return false;
    }
  });

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem('booted', '1');
    } catch {
      /* session storage unavailable — boot simply replays next load */
    }
    setBooted(true);
  }, []);

  useScrollReset(pathname, hash);
  useReveal(pathname + hash + String(booted));

  return (
    <div className="scanlines min-h-screen bg-void">
      {!booted && <Boot onDone={finish} />}

      <a
        href="#main"
        className="tag sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:text-void"
      >
        skip to content
      </a>

      {/*
        While the boot overlay covers the page, everything behind it is inert —
        otherwise a keyboard user could tab into content they cannot see.
      */}
      <div inert={!booted ? '' : undefined}>
        <Nav />
        <CommandDeck />
        <SectionRail />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
