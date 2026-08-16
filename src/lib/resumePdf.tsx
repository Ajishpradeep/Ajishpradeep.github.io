/**
 * The resume PDF — generated client-side from `src/data/resume.ts`, the same
 * content the `/resume` page renders.
 *
 * The brief for this document is that it has to satisfy two readers who want
 * different things, and an earlier version failed both. A recruiter wants
 * hierarchy, air and a place for their eye to land in ten seconds; an ATS
 * parser wants a single column of text in reading order with nothing clever in
 * it. Those are compatible — the tension people claim exists is mostly a myth
 * spread by resume-template vendors — but only if the visual structure is
 * carried by *typography* rather than by layout tricks. So: one column, real
 * headings, no tables, no text boxes, no icons carrying meaning, contact
 * details in the body where a parser will find them. Everything that makes it
 * look designed is type size, weight, colour and spacing, none of which a
 * parser sees or cares about.
 *
 * Three failures from the previous version are load-bearing history, because
 * each was invisible in the source and obvious the moment anything rendered it:
 *
 *   1. `flexDirection: row` + `justifyContent: space-between` with two
 *      unconstrained `Text` children. Yoga does not shrink text to fit, so a
 *      long role title simply ran through the date on its right. Every row in
 *      this file now gives the flexible side `flexGrow: 1, flexShrink: 1` and
 *      the fixed side `flexShrink: 0`.
 *   2. Text styles with no explicit `lineHeight`, which let the name's glyph
 *      box overlap the line beneath it. Every text style here sets one.
 *   3. Helvetica. The base-14 PDF fonts are WinAnsi-encoded, so `→` silently
 *      became `'` — corrupting the single best metric on the page — and the
 *      employer's Chinese name rendered as mojibake. The document now embeds
 *      IBM Plex (subset, vendored under `public/fonts/pdf/`), which covers the
 *      arrow and the typographic punctuation, and the Chinese name is carried
 *      only by the web view, where the system fonts can actually draw it.
 *
 * The rule this file is under: nothing ships from here without being rendered
 * and looked at. `./scripts/render-resume.sh out.pdf` exists for exactly that.
 */
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import type { StyleProp } from '@react-pdf/types';
import { resume } from '../data/resume';
import { parseEmphasis } from './emphasis';

/*
  Registered from a same-origin path in the browser and from disk under Node,
  so the render script and the shipped download draw the identical document.
  Vendored rather than fetched from a font CDN: the site is static and offline-
  tolerant, and a PDF that silently loses its typography when a third party is
  unreachable is the same class of bug as the ones above.
*/
const FONTS =
  typeof window === 'undefined' ? `${process.cwd()}/public/fonts/pdf` : '/fonts/pdf';

/*
  Three weights, not four. Every emphasis in this document is SemiBold (600) —
  Bold at 9.8pt shouts where the research asks for a quiet wayfinding mark — so
  the 700 face was registered, vendored and never once requested. Verified by
  watching which files the browser actually fetched during a real export.
*/
Font.register({
  family: 'IBMPlexSans',
  fonts: [
    { src: `${FONTS}/IBMPlexSans-Regular.ttf`, fontWeight: 400 },
    { src: `${FONTS}/IBMPlexSans-Italic.ttf`, fontWeight: 400, fontStyle: 'italic' },
    { src: `${FONTS}/IBMPlexSans-SemiBold.ttf`, fontWeight: 600 },
  ],
});

Font.register({
  family: 'IBMPlexSerif',
  fonts: [{ src: `${FONTS}/IBMPlexSerif-SemiBold.ttf`, fontWeight: 600 }],
});

/*
  Hyphenation off. react-pdf's default hyphenator breaks technical strings in
  places that read as typos — "Tensor-RT", "multi-view geo-metry" — and a
  resume is short enough that the ragged edge is the better trade.
*/
Font.registerHyphenationCallback((word) => [word]);

const C = {
  ink: '#14181A',
  inkSoft: '#39424A',
  inkFaint: '#697880',
  /* Deep teal. The light-mode reading ink from the site's own palette, lifted
     a little for toner and for the small uppercase headings it has to carry.
     Colour is invisible to a parser, so it is free hierarchy for the human. */
  accent: '#0B4F4A',
  rule: '#C7D2D0',
} as const;

const styles = StyleSheet.create({
  /*
    Body sits at 9.8pt. ETH Zurich's application guide sets an 11pt floor, which
    is written for a student CV with far less on it; the working compromise for
    a dense two-page industry CV is not to go below ~9.5pt, and the previous
    9.2pt was under that with no reason but fitting more in. Length is bought
    by cutting content, not by shrinking type past the point where a recruiter
    reading twenty of these has to work.
  */
  page: {
    fontFamily: 'IBMPlexSans',
    fontSize: 9.8,
    /*
      TIGHTENED 2026-08-16: lineHeight 1.45→1.42, page padding 38/34→32/28,
      plus matching cuts to section/role/entry/bullet spacing below. This
      round added a Research section, two more projects and a longer summary
      — content the reader asked for — which pushed the document to 3 pages.
      Font size did not move; the paragraph above is explicit about why 9.8pt
      is the floor, and that reasoning didn't change. This is the other lever:
      spacing, not type size, absorbs new content within the 2-page budget.
    */
    lineHeight: 1.38,
    color: C.ink,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 44,
  },

  /* ---------- header ---------- */
  name: {
    fontFamily: 'IBMPlexSerif',
    fontWeight: 600,
    fontSize: 23,
    lineHeight: 1.18,
    letterSpacing: -0.2,
    color: C.ink,
  },
  headline: {
    fontSize: 10.6,
    fontWeight: 600,
    lineHeight: 1.35,
    color: C.accent,
    marginTop: 3,
  },
  /*
    Two columns, not one wrapped block. The header used to be a single left-
    aligned stack, which on A4 (595pt wide, ~507pt of content width after
    margins) left roughly the right third of the page as dead space once the
    contact strings were short enough to fit one line — exactly the kind of
    thing that reads as "empty" or "unfinished" even though nothing is wrong.

    This is a genuine two-column *layout*, which is normally something this
    file argues against — the whole rest of the document is single-column on
    purpose, because ATS parsers can scramble text that's laid out in real
    side-by-side columns (Jobscan's documented "table slicing": a parser reads
    left-to-right across a Y-band and interleaves unrelated fields from
    adjacent columns). Two things make this specific instance safe rather than
    a contradiction. First, scale: it's one small header block, not a
    multi-row table spanning the page, so there's no repeating row structure
    for a Y-band heuristic to get confused by. Second, and decisively: this is
    react-pdf, not a native PDF table — every string is painted into the
    content stream in JSX/document order (headerLeft's two lines, fully, then
    headerRight's two lines), and pdfium's text extraction follows that paint
    order rather than re-deriving reading order from X/Y position. So the
    identity-critical content (email, links) is written first regardless of
    where it sits visually, and extraction reads it first too — verified
    directly by running the render and reading the extracted text, not
    assumed. See scripts/verify-resume-pdf.py for the check that keeps this
    true going forward.
  */
  headerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  headerLeft: { flexGrow: 1, flexShrink: 1, flexBasis: 0, paddingRight: 16 },
  headerRight: { flexShrink: 0 },
  contact: {
    fontSize: 9,
    lineHeight: 1.5,
    color: C.inkFaint,
  },
  /* Subsequent contact lines sit tighter — each column is one block, not two
     unrelated lines. */
  contactNext: {
    fontSize: 9,
    lineHeight: 1.5,
    color: C.inkFaint,
    marginTop: 1,
  },
  contactRight: {
    fontSize: 9,
    lineHeight: 1.5,
    color: C.inkFaint,
    textAlign: 'right',
  },
  /*
    Real clickable annotations, not just coloured text. GitHub/LinkedIn show
    the platform name rather than the raw URL — the destination is one click
    away and is exactly as functional, just shorter, which is what keeps the
    left column to two lines. The trade-off, on the record: an ATS running
    pure text-extraction (most do) will see the word "GitHub" but not the
    domain in the visible text layer, only in the underlying link annotation,
    which not every parser reads. Accepted on Pradeep's explicit direction.
  */
  link: { color: C.accent, textDecoration: 'underline' },
  /* Demoted: work authorisation gets its own quieter line under location,
     rather than sitting in the identity row itself — still in the body, so it
     stays ATS-findable, just visually secondary. See the comment on
     `workAuthorization` in resume.ts for why a true page footer was
     considered and rejected. */
  contactQuiet: {
    fontSize: 8.4,
    lineHeight: 1.4,
    color: C.inkFaint,
    marginTop: 3,
    textAlign: 'right',
  },
  headerRule: {
    borderBottomWidth: 1.2,
    borderBottomColor: C.accent,
    marginTop: 9,
  },

  /* ---------- sections ---------- */
  section: { marginTop: 6 },
  /*
    letterSpacing is capped low on purpose, and this is a correctness
    constraint rather than a taste one. Text extractors synthesise a space
    whenever the gap between two glyphs exceeds a fraction of the font size,
    so a tracked-out heading comes back from the parser as "E X P E R I E N C E"
    — and ATS section segmentation works by matching heading strings like
    "EXPERIENCE" and "EDUCATION" literally. At 8.6pt, 1.3 tripped it on every
    heading; 0.5 renders as deliberate uppercase without splitting. Verified by
    extracting the text, not by eye. Raise this and the document silently stops
    being segmentable.
  */
  sectionHeading: {
    fontSize: 8.6,
    fontWeight: 600,
    letterSpacing: 0.5,
    lineHeight: 1.3,
    color: C.accent,
    borderBottomWidth: 0.7,
    borderBottomColor: C.rule,
    paddingBottom: 3,
    marginBottom: 7,
  },

  summary: { fontSize: 10, lineHeight: 1.5, color: C.inkSoft },

  /* ----------------------------------------------------------------
     Shared row: one flexible column, one fixed column.

     `flexBasis: 0` on every flexible child is the whole trick, and it is not
     optional. With the default `flexBasis: 'auto'` Yoga takes the child's base
     size from its *content*, so a long line of text asks for its max-content
     width and `flexShrink` does not reliably pull it back — the text then
     renders past the right margin and gets clipped by the page edge. Basing it
     at 0 makes `flexGrow` hand the child exactly the space that is left, which
     is what the layout means. This is what was cutting "Triangulation · Tem…"
     off the page.
     ---------------------------------------------------------------- */
  row: { flexDirection: 'row', alignItems: 'baseline' },
  rowMain: { flexGrow: 1, flexShrink: 1, flexBasis: 0, paddingRight: 10 },
  rowAside: { flexShrink: 0, fontSize: 9, lineHeight: 1.4, color: C.inkFaint },

  /* ---------- experience ---------- */
  role: { marginBottom: 6 },
  roleTitle: { fontSize: 11, fontWeight: 600, lineHeight: 1.3, color: C.ink },
  roleOrg: { fontSize: 9.8, lineHeight: 1.4, color: C.accent, fontWeight: 600, marginTop: 1 },
  roleOrgPlace: { color: C.inkFaint, fontWeight: 400 },

  bulletRow: { flexDirection: 'row', marginTop: 2.2 },
  bulletGlyph: { width: 10, flexShrink: 0, fontSize: 9.8, lineHeight: 1.45, color: C.accent },
  bulletText: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontSize: 9.8,
    lineHeight: 1.45,
    color: C.inkSoft,
  },
  bold: { fontWeight: 600, color: C.ink },
  italic: { fontStyle: 'italic' },

  /* ---------- skills ---------- */
  skillRow: { flexDirection: 'row', marginBottom: 2.2 },
  skillLabel: {
    width: 118,
    flexShrink: 0,
    fontSize: 9.4,
    fontWeight: 600,
    lineHeight: 1.45,
    color: C.ink,
  },
  skillItems: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: C.inkSoft,
  },

  /* ---------- compact entries (recognition, education, projects) ---------- */
  entry: { marginBottom: 4 },
  entryTitle: { fontSize: 10, fontWeight: 600, lineHeight: 1.35, color: C.ink },
  entryMeta: { fontSize: 9.4, lineHeight: 1.4, color: C.accent, marginTop: 0.5 },
  entryDetail: { fontSize: 9.5, lineHeight: 1.45, color: C.inkSoft, marginTop: 1.5 },
  /* Quiet trailing line — where the Transformer walkthrough landed after the
     RESEARCH section was undone. Smaller and fainter than an entry, on
     purpose: a writing sample competing for exactly the attention it earns,
     not a fourth project. */
  note: { fontSize: 8.6, lineHeight: 1.4, color: C.inkFaint, marginTop: 5 },
});

/** Renders `**bold**` / `*italic*` runs as real nested style changes. */
function Rich({ children, style }: { children: string; style?: StyleProp }) {
  return (
    <Text style={style}>
      {parseEmphasis(children).map((run, i) => {
        if (!run.bold && !run.italic) return run.text;
        return (
          <Text key={i} style={run.bold ? styles.bold : styles.italic}>
            {run.text}
          </Text>
        );
      })}
    </Text>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {children}
    </View>
  );
}

export function ResumePDF() {
  return (
    <Document
      title={`${resume.name} — ${resume.role}`}
      author={resume.name}
      subject={resume.headline}
      keywords={resume.skills.flatMap((s) => s.items).join(', ')}
    >
      <Page size="A4" style={styles.page}>
        {/* Contact details sit in the page body, never a fixed header — ATS
            parsers routinely drop header/footer content, and losing the way to
            contact the candidate is the one parse failure with no recovery.

            Left column: how to reach him (email, links) and how to talk to
            him (languages) — the things another person acts on. Right column:
            where he is and his standing to work — status facts, right-aligned
            so they sit as a caption to the identity block rather than
            competing with it for the reader's first pass. */}
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.headline}>{resume.headline}</Text>

        <View style={styles.headerGrid}>
          <View style={styles.headerLeft}>
            <Text style={styles.contact}>
              <Link src={`mailto:${resume.email}`} style={styles.link}>
                {resume.email}
              </Link>
              {resume.links.flatMap((l) => [
                '  ·  ',
                <Link key={l.label} src={l.href} style={styles.link}>
                  {l.label}
                </Link>,
              ])}
            </Text>
            {resume.languages ? (
              <Text style={styles.contactNext}>{resume.languages}</Text>
            ) : null}
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.contactRight}>
              {resume.location}  ·  {resume.relocation}
            </Text>
            {resume.workAuthorization ? (
              <Text style={styles.contactQuiet}>{resume.workAuthorization}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.headerRule} />

        <View style={styles.section}>
          <Rich style={styles.summary}>{resume.summary}</Rich>
        </View>

        <Section title="CORE SKILLS">
          {resume.skills.map((s) => (
            <View key={s.group} style={styles.skillRow} wrap={false}>
              <Text style={styles.skillLabel}>{s.group}</Text>
              <Text style={styles.skillItems}>{s.items.join(' · ')}</Text>
            </View>
          ))}
        </Section>

        <Section title="EXPERIENCE">
          {resume.experience.map((role) => (
            <View key={role.title + role.org} style={styles.role}>
              {/* wrap={false} on the heading block only: a role with many
                  bullets must be allowed to break across pages, but its title
                  must never be orphaned at the foot of one. */}
              <View wrap={false}>
                <View style={styles.row}>
                  <Text style={[styles.roleTitle, styles.rowMain]}>{role.title}</Text>
                  <Text style={styles.rowAside}>{role.period}</Text>
                </View>
                <Text style={styles.roleOrg}>
                  {role.org}
                  <Text style={styles.roleOrgPlace}> · {role.place}</Text>
                </Text>
              </View>
              {role.bullets.map((b, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bulletGlyph}>•</Text>
                  <Rich style={styles.bulletText}>{b}</Rich>
                </View>
              ))}
            </View>
          ))}
        </Section>

        <Section title="RECOGNITION">
          {resume.recognition.map((r) => (
            <View key={r.title} style={styles.entry} wrap={false}>
              <View style={styles.row}>
                <Text style={[styles.entryTitle, styles.rowMain]}>{r.title}</Text>
                <Text style={styles.rowAside}>{r.year}</Text>
              </View>
              <Text style={styles.entryMeta}>{r.venue}</Text>
              {r.detail ? <Rich style={styles.entryDetail}>{r.detail}</Rich> : null}
            </View>
          ))}
        </Section>

        <Section title="EDUCATION">
          {resume.education.map((e) => (
            <View key={e.degree} style={styles.entry} wrap={false}>
              <View style={styles.row}>
                <Text style={[styles.entryTitle, styles.rowMain]}>{e.degree}</Text>
                <Text style={styles.rowAside}>{e.period}</Text>
              </View>
              <Text style={styles.entryMeta}>
                {e.org}
                <Text style={styles.roleOrgPlace}> · {e.place}</Text>
              </Text>
              {e.detail ? <Rich style={styles.entryDetail}>{e.detail}</Rich> : null}
            </View>
          ))}
        </Section>

        <Section title="SELECTED PROJECTS">
          {resume.projects.map((p) => (
            <View key={p.name} style={styles.entry} wrap={false}>
              <View style={styles.row}>
                <Text style={[styles.entryTitle, styles.rowMain]}>{p.name}</Text>
                <Text style={styles.rowAside}>{p.year}</Text>
              </View>
              <Rich style={styles.entryDetail}>{p.description}</Rich>
            </View>
          ))}
          {resume.technicalWriting ? (
            <Rich style={styles.note}>{resume.technicalWriting}</Rich>
          ) : null}
        </Section>
      </Page>
    </Document>
  );
}
