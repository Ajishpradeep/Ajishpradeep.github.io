/**
 * A deliberately tiny inline-emphasis parser, shared by the two resume
 * renderers so an emphasised metric reads identically on screen and in the PDF
 * from one string in `src/data/resume.ts`.
 *
 * The syntax is two markers and nothing else: `**bold**` and `*italic*`.
 * It exists because the research is specific about what earns emphasis on a
 * resume — measured results and checkable proper nouns, never adjectives —
 * and that judgement belongs next to the sentence it applies to rather than
 * being reconstructed by each renderer from a regex over "things that look
 * like numbers". Italic carries the one typographic convention the document
 * genuinely needs: titles of works (a thesis, a repository).
 *
 * Not a Markdown implementation, and it must not grow into one. Anything more
 * expressive than "this run is emphasised" is a content-structure problem
 * rather than a formatting one.
 */
export type EmphasisRun = { text: string; bold: boolean; italic: boolean };

/* Bold is matched first so `**x**` is never mistaken for an empty italic pair.
   `[^*]+` keeps both runs non-greedy and unable to span a neighbouring marker. */
const PATTERN = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function parseEmphasis(source: string): EmphasisRun[] {
  const runs: EmphasisRun[] = [];
  let cursor = 0;

  for (const match of source.matchAll(PATTERN)) {
    const at = match.index ?? 0;
    if (at > cursor) {
      runs.push({ text: source.slice(cursor, at), bold: false, italic: false });
    }
    const [, boldText, italicText] = match;
    runs.push(
      boldText !== undefined
        ? { text: boldText, bold: true, italic: false }
        : { text: italicText, bold: false, italic: true },
    );
    cursor = at + match[0].length;
  }

  if (cursor < source.length) {
    runs.push({ text: source.slice(cursor), bold: false, italic: false });
  }
  // A string with no markers still comes back as one plain run, so no caller
  // needs its own empty-array branch.
  return runs.length > 0 ? runs : [{ text: source, bold: false, italic: false }];
}

/** The same string with its markers removed — for `title`/`aria-label` text. */
export function stripEmphasis(source: string): string {
  return source.replace(PATTERN, (_, bold, italic) => bold ?? italic);
}
