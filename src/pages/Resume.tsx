import { useCallback, useState } from 'react';
import { Download, ArrowUpRight, Check } from 'lucide-react';
import { resume } from '../data/resume';
import { parseEmphasis } from '../lib/emphasis';

/**
 * The on-screen resume. Renders from `src/data/resume.ts` — the same content,
 * in the same order, as the PDF at `src/lib/resumePdf.tsx`.
 *
 * The two surfaces are deliberately *not* the same design, and that is the
 * point rather than an inconsistency. The PDF has to survive an ATS parser and
 * a monochrome laser printer, so it is a single Latin-subset column in IBM
 * Plex. This page has none of those constraints — the browser has the site's
 * own faces, the reader's theme, real links and system CJK fonts — so it is
 * set in the site's type system and shows things the PDF has to drop, such as
 * the employer's registered Chinese name. What must never drift is the
 * content, which is why neither file holds any of its own.
 */

/** Renders the shared `**bold**` / `*italic*` markers as real elements. */
function Rich({ children, className }: { children: string; className?: string }) {
  return (
    <span className={className}>
      {parseEmphasis(children).map((run, i) => {
        if (run.bold) {
          return (
            <strong key={i} className="font-semibold text-cyan">
              {run.text}
            </strong>
          );
        }
        if (run.italic) {
          return (
            <em key={i} className="italic">
              {run.text}
            </em>
          );
        }
        return <span key={i}>{run.text}</span>;
      })}
    </span>
  );
}

/** Section heading, matching the bracket device the rest of the site uses. */
function Heading({ children }: { children: string }) {
  return (
    <h2
      className="font-display text-headline font-extrabold uppercase text-cyan"
      data-reveal
    >
      <span className="text-amber">[</span>
      {children}
      <span className="text-amber">]</span>
    </h2>
  );
}

/**
 * The 3/9 split every list on this page shares: a label or date in the gutter,
 * the content beside it. Identical to the About page's trajectory list, so the
 * two read as the same document rather than as two templates.
 */
function Row({ aside, children }: { aside: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3">
        <p className="font-mono text-micro uppercase tracking-[0.14em] text-amber">{aside}</p>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </div>
  );
}

export default function Resume() {
  const [state, setState] = useState<'idle' | 'working' | 'done'>('idle');

  const download = useCallback(async () => {
    setState('working');
    try {
      const { buildResumePdfUrl } = await import('../lib/downloadResumePdf');
      const url = await buildResumePdfUrl();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Pradeep_Rajasekar_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revoked on a delay rather than immediately after click(): Safari has
      // been known to abandon the download if the object URL is freed before
      // the navigation it starts has actually begun.
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      setState('done');
      window.setTimeout(() => setState('idle'), 2600);
    } catch {
      // The page itself carries every fact the PDF does, so a failed export is
      // a degraded path rather than a dead end.
      setState('idle');
    }
  }, []);

  return (
    <>
      <header className="relative overflow-hidden border-b border-cyan/15 pt-[5.5rem]">
        <div className="grid-veil absolute inset-0" />
        <div className="shell relative py-14">
          <p className="tag text-amber" data-reveal>
            <span className="bracket">Resume</span>
          </p>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
            <div className="min-w-0">
              <h1
                className="font-display text-mega font-extrabold uppercase leading-[1.02] text-cyan glow-cyan text-balance"
                data-reveal
                style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
              >
                {resume.name}
              </h1>
              <p
                className="mt-3 font-display text-lead font-semibold text-amber"
                data-reveal
                style={{ '--reveal-delay': '100ms' } as React.CSSProperties}
              >
                {resume.headline}
              </p>
            </div>

            <button
              type="button"
              onClick={download}
              disabled={state === 'working'}
              className="btn-amber shrink-0 disabled:opacity-60"
              data-reveal
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            >
              {state === 'done' ? (
                <Check size={15} strokeWidth={2} />
              ) : (
                <Download size={15} strokeWidth={2} />
              )}
              {state === 'working'
                ? 'Preparing PDF…'
                : state === 'done'
                  ? 'Downloaded'
                  : 'Download PDF'}
            </button>
          </div>

          {/*
            Two columns. Left: how to reach him and talk to him (email, links,
            languages). Right: where he is and his standing to work — status
            facts, right-aligned on wider viewports so they sit as a caption
            to the identity block, left-aligned when stacked on mobile.

            Taiwan residency status (APRC) was tried here and taken back out
            on Pradeep's direction — he'd asked for it, was shown the reasoning
            against it, and agreed with the original recommendation. Nothing
            left rendering it; see the comment on `workAuthorization` in
            resume.ts for the full round trip.

            Link text is the platform name ("GitHub", "LinkedIn"), not the raw
            URL — the URL still lives in `href`, so the link is exactly as
            functional, just shorter to scan. This is the reverse of the PDF's
            design principle (spell the URL out, since a "click here" link
            with no visible destination is bad for ATS and for a reader
            skimming a printed page) — but this is a live page with a pointer,
            the destination is one hover away.
          */}
          <div
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            data-reveal
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            <dl className="flex flex-col gap-1.5 font-mono text-micro uppercase tracking-[0.1em] text-dim">
              <div>
                <dt className="sr-only">Email and links</dt>
                <dd className="flex flex-wrap items-center gap-x-2">
                  <a
                    href={`mailto:${resume.email}`}
                    className="underline decoration-dim/40 underline-offset-4 transition-colors hover:text-amber"
                  >
                    {resume.email}
                  </a>
                  {resume.links.flatMap((l) => [
                    <span key={`${l.label}-sep`} aria-hidden>
                      ·
                    </span>,
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-dim/40 underline-offset-4 transition-colors hover:text-amber"
                    >
                      {l.label}
                    </a>,
                  ])}
                </dd>
              </div>
              {resume.languages && (
                <div>
                  <dt className="sr-only">Languages</dt>
                  <dd>{resume.languages}</dd>
                </div>
              )}
            </dl>

            <dl className="flex flex-col gap-1.5 font-mono text-micro uppercase tracking-[0.1em] text-dim sm:text-right">
              <div>
                <dt className="sr-only">Location</dt>
                <dd>
                  {resume.location} · {resume.relocation}
                </dd>
              </div>
              {/* Demoted: work authorisation reads as a quieter caption under
                  location, in the body (so it stays ATS-findable) rather than
                  a true footer — see the comment on `workAuthorization` in
                  resume.ts for why a footer was considered and rejected. */}
              {resume.workAuthorization && (
                <div>
                  <dt className="sr-only">Work authorisation</dt>
                  <dd className="text-dim/60">{resume.workAuthorization}</dd>
                </div>
              )}
            </dl>
          </div>

          {/*
            No max-width — full row. This went through two narrower states
            first (72ch matching `.copy-lead` elsewhere on the site, then
            86ch as a compromise) and Pradeep rejected both: a capped measure
            here just leaves the rest of the row empty beside it, and he wants
            the paragraph itself to fill that space rather than something else
            being added beside it. Dropping the cap is the actual fix, not a
            wider cap.
          */}
          <p
            className="mt-9 copy-lead text-cyan/80 text-pretty"
            data-reveal
            style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
          >
            <Rich>{resume.summary}</Rich>
          </p>
        </div>
      </header>

      <section className="border-b border-cyan/15 py-14">
        <div className="shell">
          <Heading>Core skills</Heading>
          <dl className="mt-8 space-y-5">
            {resume.skills.map((s) => (
              <div key={s.group} className="border-b border-cyan/15 pb-5 last:border-b-0" data-reveal>
                <Row aside={<dt>{s.group}</dt>}>
                  <dd className="flex flex-wrap gap-x-2 gap-y-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-cyan/20 bg-deep/50 px-2.5 py-1 font-mono text-micro text-cyan/75"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </Row>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-cyan/15 py-14">
        <div className="shell">
          <Heading>Experience</Heading>
          <ol className="mt-8">
            {resume.experience.map((role) => (
              <li
                key={role.title + role.org}
                className="border-b border-cyan/20 py-8 first:pt-0 last:border-b-0 last:pb-0"
                data-reveal
              >
                <Row aside={role.period}>
                  <h3 className="font-display text-title font-bold text-cyan">{role.title}</h3>
                  <p className="mt-2 font-mono text-micro uppercase tracking-[0.18em] text-dim">
                    <span className="text-cyan/80">{role.org}</span>
                    {/* The registered Chinese name renders here and nowhere in
                        the PDF, whose embedded font is a Latin subset. */}
                    {role.orgLocal && <span className="ml-2 normal-case">{role.orgLocal}</span>}
                    <span> · {role.place}</span>
                  </p>
                  <ul className="mt-5 space-y-3">
                    {role.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3.5">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-amber/70" />
                        <Rich className="text-fine leading-relaxed text-cyan/65 text-pretty">
                          {b}
                        </Rich>
                      </li>
                    ))}
                  </ul>
                </Row>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-cyan/15 py-14">
        <div className="shell">
          <Heading>Recognition &amp; research</Heading>
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {resume.recognition.map((r) => (
              <li key={r.title} className="card p-5" data-reveal>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-base font-bold text-cyan">{r.title}</h3>
                  <span className="shrink-0 font-mono text-micro text-dim">{r.year}</span>
                </div>
                {/* `break-words`: this line carries bare URLs, which offer no
                    break opportunity and measured 343px min-content against a
                    ~320px content box on a 360px phone — i.e. it would have
                    pushed the card sideways. */}
                <p className="mt-1.5 break-words font-mono text-micro uppercase tracking-[0.12em] text-amber">
                  {r.venue}
                </p>
                {r.detail && (
                  <Rich className="mt-3 block text-fine leading-relaxed text-cyan/65 text-pretty">
                    {r.detail}
                  </Rich>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-cyan/15 py-14">
        <div className="shell">
          <Heading>Education</Heading>
          <ol className="mt-8">
            {resume.education.map((e) => (
              <li
                key={e.degree}
                className="border-b border-cyan/20 py-7 first:pt-0 last:border-b-0 last:pb-0"
                data-reveal
              >
                <Row aside={e.period}>
                  <h3 className="font-display text-title font-bold text-cyan">{e.degree}</h3>
                  <p className="mt-2 font-mono text-micro uppercase tracking-[0.18em] text-dim">
                    {e.org} · {e.place}
                  </p>
                  {e.detail && (
                    <Rich className="mt-3 block text-fine leading-relaxed text-cyan/65 text-pretty">
                      {e.detail}
                    </Rich>
                  )}
                </Row>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14">
        <div className="shell">
          <Heading>Selected projects</Heading>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {resume.projects.map((p) => (
              <li key={p.name} className="well p-5" data-reveal>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-base font-bold text-cyan">{p.name}</h3>
                  <span className="shrink-0 font-mono text-micro text-dim">{p.year}</span>
                </div>
                <Rich className="mt-2.5 block break-words text-fine leading-relaxed text-cyan/65 text-pretty">
                  {p.description}
                </Rich>
              </li>
            ))}
          </ul>

          <a
            href="https://github.com/Ajishpradeep"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.12em] text-dim transition-colors hover:text-amber"
            data-reveal
          >
            More on GitHub
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        </div>
      </section>
    </>
  );
}
