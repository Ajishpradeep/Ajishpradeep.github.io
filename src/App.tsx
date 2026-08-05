import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CommandDeck from './components/CommandDeck';
import SectionRail from './components/SectionRail';
import { useReveal, useScrollReset } from './hooks/useReveal';
import './index.css';

export default function App() {
  const { pathname, hash } = useLocation();

  useScrollReset(pathname, hash);
  useReveal(pathname + hash);

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
      <SectionRail />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
