import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-cyan/15 bg-void py-8">
      <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
          <span className="mr-2 inline-block h-1.5 w-1.5 bg-amber align-middle" />
          system nominal
        </p>
      </div>
    </footer>
  );
}
