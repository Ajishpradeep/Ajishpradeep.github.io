import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/shell/Nav';
import Footer from '@/shell/Footer';
import CommandDeck from '@/shell/CommandDeck';
import { useReveal, useScrollReset } from '@/hooks/useReveal';
import { remeasureSections } from '@/hooks/useSectionSpy';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import '@/styles/index.css';

export default function App() {
  const { pathname, hash } = useLocation();

  useScrollReset(pathname, hash);
  useReveal(pathname + hash);
  useDocumentHead(pathname);

  /*
    The section store recomputes on scroll and resize, and a client-side route
    change is neither — arriving at `/` from `/about` with the window already
    at the top fires no event, so the nav would be looking at a document that
    no longer exists.
  */
  useEffect(() => {
    remeasureSections();
  }, [pathname, hash]);

  return (
    <div className="site-frame min-h-screen bg-void">
      <a
        href="#main"
        className="tag sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:text-void"
      >
        skip to content
      </a>

      <Nav />
      <CommandDeck />
      <main id="main" className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
