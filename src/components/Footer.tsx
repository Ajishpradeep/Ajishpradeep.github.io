import { site } from '../data/site';

/**
 * The page used to sign off with "system nominal" in 10px — a joke, in the last
 * position on the page, where the thing a visitor might actually want is a way
 * to reach the person and confirmation of who they are.
 */
export default function Footer() {
  return (
    <footer className="border-t border-cyan/15 bg-void py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="font-display text-[0.9375rem] font-bold text-cyan">
            {site.name}
            <span className="ml-2 font-mono text-[0.6875rem] font-normal text-dim">
              also {site.alias}
            </span>
          </p>
          <p className="mt-1.5 font-mono text-[0.6875rem] text-dim">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-[0.8125rem] text-cyan underline decoration-cyan/40 underline-offset-4 transition-colors hover:text-amber hover:decoration-amber"
          >
            {site.email}
          </a>
          <p className="font-mono text-[0.6875rem] text-dim">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
