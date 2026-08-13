import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div className="shell relative">
        <p className="tag text-signal flicker">
          <span className="bracket">signal lost · 404</span>
        </p>
        <h1 className="mt-7 max-w-[18ch] font-display text-mega font-extrabold uppercase leading-[1.02] text-cyan glow-cyan">
          No route
          <br />
          <span className="text-amber">to that page</span>
        </h1>
        <p className="mt-7 text-lede text-cyan/60">
          The link may be stale, or the case file may have been re-indexed.
        </p>
        <Link to="/" className="btn-amber mt-10">
          <span aria-hidden>←</span> return to base
        </Link>
      </div>
    </section>
  );
}
