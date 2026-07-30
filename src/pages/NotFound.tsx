import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-32">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 max-w-[16ch] text-headline font-medium text-balance">
          That page does not exist.
        </h1>
        <p className="mt-6 max-w-prose text-lede text-muted">
          The link may be out of date, or the case study may have moved.
        </p>
        <Link
          to="/"
          className="link-underline mt-10 inline-block font-mono text-micro uppercase text-ink"
        >
          ← Back to the start
        </Link>
      </div>
    </section>
  );
}
