import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function current(): Theme {
  if (typeof document === 'undefined') return 'light';
  return (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light';
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(current);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* private mode — the in-memory value still applies for this session */
    }
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className={`group inline-flex h-8 items-center gap-2 font-mono text-micro uppercase text-muted transition-colors duration-300 hover:text-ink ${className}`}
    >
      <span
        aria-hidden
        className="relative inline-flex h-[14px] w-[26px] items-center rounded-full border transition-colors duration-500"
      >
        <span
          className="absolute h-[8px] w-[8px] rounded-full bg-ink transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${theme === 'dark' ? '13px' : '3px'})` }}
        />
      </span>
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}
