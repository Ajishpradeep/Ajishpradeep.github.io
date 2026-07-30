import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { work } from '../data/work';
import { site } from '../data/site';

type Cmd = {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
};

/**
 * Terminal-style command palette. Opens on ⌘K / Ctrl+K or "/".
 * Typing filters; ↑↓ moves; ⏎ executes.
 */
export default function CommandDeck() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
    setQ('');
    setSel(0);
  }, []);

  const goSection = useCallback(
    (id: string) => {
      close();
      navigate('/');
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [close, navigate],
  );

  const commands: Cmd[] = useMemo(() => {
    const sections: Cmd[] = [
      ['work', 'selected systems'],
      ['impact', 'verified impact'],
      ['method', 'how I work'],
      ['capabilities', 'skills matrix'],
      ['lab', 'personal builds'],
      ['research', 'research log'],
      ['contact', 'get in touch'],
    ].map(([id, hint]) => ({
      id: `go-${id}`,
      label: `goto ${id}`,
      hint,
      group: 'navigate',
      run: () => goSection(id),
    }));

    const cases: Cmd[] = work.map((w) => ({
      id: `case-${w.slug}`,
      label: `open ${w.slug}`,
      hint: w.title,
      group: 'case files',
      run: () => {
        close();
        navigate(`/work/${w.slug}`);
      },
    }));

    const misc: Cmd[] = [
      {
        id: 'about',
        label: 'open about',
        hint: 'operator profile',
        group: 'navigate',
        run: () => {
          close();
          navigate('/about');
        },
      },
      {
        id: 'cv',
        label: 'download cv',
        hint: 'pdf',
        group: 'external',
        run: () => {
          close();
          window.open(site.resume, '_blank', 'noopener');
        },
      },
      {
        id: 'mail',
        label: 'send mail',
        hint: site.email,
        group: 'external',
        run: () => {
          close();
          window.location.href = `mailto:${site.email}`;
        },
      },
      ...site.links
        .filter((l) => !l.href.startsWith('mailto'))
        .map((l) => ({
          id: `link-${l.label}`,
          label: `open ${l.label.toLowerCase()}`,
          hint: l.handle,
          group: 'external',
          run: () => {
            close();
            window.open(l.href, '_blank', 'noopener');
          },
        })),
      {
        id: 'top',
        label: 'return to top',
        hint: 'scroll home',
        group: 'navigate',
        run: () => {
          close();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      },
    ];

    return [...sections, ...cases, ...misc];
  }, [close, goSection, navigate]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(term) ||
        c.hint.toLowerCase().includes(term) ||
        c.group.toLowerCase().includes(term),
    );
  }, [commands, q]);

  // global open/close shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === 'Escape' && open) close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setSel(0), [q]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => (s - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      results[sel]?.run();
    }
  };

  let lastGroup = '';

  return (
    <div
      className="fixed inset-0 z-[65] flex items-start justify-center bg-void/85 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command deck"
    >
      <div
        className="hud hud-amber w-full max-w-2xl bg-deep/95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-cyan/15 px-5 py-4">
          <span className="font-mono text-[0.75rem] text-amber">›</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command…"
            aria-label="Command input"
            className="w-full bg-transparent font-mono text-[0.8125rem] text-cyan outline-none placeholder:text-dim/70"
          />
          <kbd className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">esc</kbd>
        </div>

        <ul className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-5 py-6 font-mono text-[0.75rem] text-dim">
              no matching command · try “work”, “case”, “cv”
            </li>
          )}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            const on = i === sel;
            return (
              <li key={c.id}>
                {header && (
                  <p className="px-5 pb-1.5 pt-3 font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-dim/70">
                    ·{header}·
                  </p>
                )}
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={c.run}
                  className={`flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left transition-colors ${
                    on ? 'bg-amber text-void' : 'text-cyan/80 hover:bg-panel/50'
                  }`}
                >
                  <span className="font-mono text-[0.8125rem]">
                    <span className={on ? 'text-void/60' : 'text-amber/70'}>›&nbsp;</span>
                    {c.label}
                  </span>
                  <span
                    className={`truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] ${
                      on ? 'text-void/70' : 'text-dim'
                    }`}
                  >
                    {c.hint}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-cyan/15 px-5 py-3">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">
            ↑↓ move · ⏎ run · esc close
          </p>
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-amber">
            {results.length} cmd
          </p>
        </div>
      </div>
    </div>
  );
}
