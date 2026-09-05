import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/shell/Nav';
import Footer from '@/shell/Footer';
import CommandDeck from '@/shell/CommandDeck';
import SectionRail from '@/shell/SectionRail';
import Dock from '@/shell/Dock';
import { useReveal, useScrollReset } from '@/hooks/useReveal';
import { remeasureSections } from '@/hooks/useSectionSpy';
import '@/styles/index.css';

export default function App() {
  const { pathname, hash } = useLocation();

  useScrollReset(pathname, hash);
  useReveal(pathname + hash);

  /*
    The section store recomputes on scroll and resize, and a client-side route
    change is neither — arriving at `/` from `/about` with the window already
    at the top fires no event, so the nav, the rail and the dock would all be
    looking at a document that no longer exists.
  */
  useEffect(() => {
    remeasureSections();
  }, [pathname, hash]);

  return (
    <div className="scanlines min-h-screen bg-void">
      <a
        href="#main"
        className="tag sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:text-void"
      >
        skip to content
      </a>

      <Nav />
      <CommandDeck />
      {/*
        Two navigations, one answer. The rail owns ≥1400px where there is a
        side margin to stand in; the dock owns everything below it. They are
        never both on screen, and they cannot disagree — `useSectionSpy` is the
        single definition of which section is being read.
      */}
      <SectionRail />
      <Dock />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
