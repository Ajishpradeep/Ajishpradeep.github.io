import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { useReveal, useScrollReset } from './hooks/useReveal';
import './index.css';

export default function App() {
  const { pathname, hash } = useLocation();

  useScrollReset(pathname, hash);
  useReveal(pathname + hash);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-micro focus:uppercase"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
