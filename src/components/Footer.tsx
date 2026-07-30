import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-micro uppercase text-faint">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <p className="font-mono text-micro uppercase text-faint">
          Built with React, Vite and Tailwind
        </p>
      </div>
    </footer>
  );
}
