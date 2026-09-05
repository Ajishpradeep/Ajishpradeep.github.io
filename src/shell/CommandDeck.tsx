import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { work } from '@/data/work';
import { site, sections as siteSections } from '@/data/site';
import { OPEN_DECK } from './Nav';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** One line of context per destination, keyed to the shared nav inventory. */
const sectionHint: Record<string, string> = {
  work: 'selected systems',
  impact: 'verified impact',
  method: 'how I work',
  research: 'research log',
  lab: 'personal builds',
  contact: 'get in touch',
};

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
  const panelRef = useRef<HTMLDivElement>(null);
  const activeOptRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  /*
    The list is `max-h-[52vh] overflow-y-auto` and the selection moved without
    scrolling it, so on the unfiltered list fourteen presses of ArrowDown put
    the highlighted row 444px below the visible area — a palette that silently
    loses its own cursor. `block: 'nearest'` scrolls only when it has to, so
    short lists never jump.
  */
  useEffect(() => {
    activeOptRef.current?.scrollIntoView({ block: 'nearest' });
  }, [sel, q]);

  const close = useCallback(() => {
    setOpen(false);
    setQ('');
    setSel(0);
  }, []);

  /*
    `useReducedMotion` already existed and already tracked changes to the
    setting. This file sampled `matchMedia` inline in two places instead, and
    `useReveal` in a third — three implementations of one decision, two of
    which never updated if the visitor changed the setting mid-session.
  */
  const still = useReducedMotion();

  const goSection = useCallback(
    (id: string) => {
      close();
      navigate('/');
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
      });
    },
    [close, navigate, still],
  );

  const commands: Cmd[] = useMemo(() => {
    const sections: Cmd[] = siteSections.map((s) => ({
      id: `go-${s.id}`,
      label: `goto ${s.id}`,
      hint: sectionHint[s.id] ?? s.label,
      group: 'navigate',
      run: () => goSection(s.id),
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
        label: 'open résumé',
        hint: 'view + pdf',
        group: 'navigate',
        run: () => {
          close();
          navigate('/resume');
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
          window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
        },
      },
    ];

    return [...sections, ...cases, ...misc];
  }, [close, goSection, navigate, still]);

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
    const onOpen = () => setOpen(true);

    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_DECK, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_DECK, onOpen);
    };
  }, [open, close]);

  /*
   * aria-modal="true" tells assistive tech the rest of the page is gone. Without
   * a trap, Tab walked straight into it anyway — focus and the screen reader's
   * model of the page diverged silently. Trap on open, restore on close.
   */
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }

    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30);

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onTab, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onTab, true);
      document.body.style.overflow = '';
      previous?.focus?.();
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
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command deck"
        className="hud hud-amber w-full max-w-2xl bg-deep/95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-cyan/15 px-5 py-4">
          <span aria-hidden className="font-mono text-fine text-amber">
            ›
          </span>
          {/*
            A real combobox. Without these the palette was silent: a screen
            reader announced a bare text field, never named the highlighted
            command, and never said how many results a query had left.
          */}
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command…"
            aria-label="Command input"
            role="combobox"
            aria-expanded
            aria-controls="cmd-list"
            aria-autocomplete="list"
            aria-activedescendant={results[sel] ? `cmd-opt-${results[sel].id}` : undefined}
            className="w-full bg-transparent font-mono text-fine text-cyan outline-none placeholder:text-dim"
          />
          <kbd className="font-mono text-micro uppercase tracking-[0.14em] text-dim">esc</kbd>
        </div>

        <p aria-live="polite" className="sr-only">
          {results.length === 0
            ? 'No matching command'
            : `${results.length} command${results.length === 1 ? '' : 's'}`}
        </p>

        <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-5 py-6 font-mono text-fine text-dim">
              no matching command · try “work”, “case”, “cv”
            </li>
          )}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            const on = i === sel;
            return (
              <li key={c.id} role="presentation">
                {header && (
                  <p
                    aria-hidden
                    className="px-5 pb-1.5 pt-3 font-mono text-micro uppercase tracking-[0.16em] text-dim"
                  >
                    ·{header}·
                  </p>
                )}
                <button
                  type="button"
                  id={`cmd-opt-${c.id}`}
                  role="option"
                  aria-selected={on}
                  ref={on ? activeOptRef : undefined}
                  tabIndex={-1}
                  onMouseEnter={() => setSel(i)}
                  onClick={c.run}
                  className={`flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left transition-colors ${
                    on ? 'bg-amber text-void' : 'text-cyan/80 hover:bg-panel/50'
                  }`}
                >
                  <span className="font-mono text-fine">
                    <span className={on ? 'text-void/75' : 'text-amber/70'}>›&nbsp;</span>
                    {c.label}
                  </span>
                  <span
                    className={`truncate font-mono text-micro uppercase tracking-[0.14em] ${
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
          <p className="font-mono text-micro uppercase tracking-[0.14em] text-dim">
            ↑↓ move · ⏎ run · esc close
          </p>
          <p className="font-mono text-micro uppercase tracking-[0.14em] text-amber">
            {results.length} cmd
          </p>
        </div>
      </div>
    </div>
  );
}
