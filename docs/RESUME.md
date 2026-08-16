# The resume feature — what it is and how to maintain it

## Where the content lives

**`src/data/resume.ts` is the only place resume content exists.** The `/resume`
page (`src/pages/Resume.tsx`) and the PDF (`src/lib/resumePdf.tsx`) both render
from it and hold none of their own, so the two cannot drift.

Supporting documents, in the order they were produced:

| File | What it is |
|---|---|
| `docs/positioning.md` | Who this profile is — written before anything was built |
| `docs/PROFILE.md` | The record: every verifiable fact, consolidated from the site |
| `docs/resume-research/*.md` | Five research files, sourced and caveated |
| `docs/resume-content-decisions.md` | What made the cut, why, and the open questions |

## Editing the resume

1. **Change the site first.** If a fact is new, it belongs in `src/data/*.ts`
   before it belongs on the resume.
2. Update `docs/PROFILE.md` to match — it is a hand-maintained snapshot, not a
   live view.
3. Check the decision against `docs/resume-content-decisions.md`. If it isn't a
   straightforward application of an existing rule, add the rule there.
4. Edit `src/data/resume.ts`.
5. **Render it and look at it** (below). This is not optional — see why.

### Emphasis syntax

`**bold**` and `*italic*`, parsed by `src/lib/emphasis.ts`, rendered as real
weight/style in both surfaces. Bold is spent on measured results and checkable
proper nouns only. If a bolded run is not a number or a verifiable name, it is
probably wrong.

## Rendering and verifying

```bash
npm run resume:pdf          # regenerate public/Resume.pdf from src/data/resume.ts
./scripts/render-resume.sh /tmp/out.pdf   # render anywhere, for inspection
```

The Python tooling is dev-only and not a project dependency:

```bash
python3 -m venv /tmp/resume-venv
/tmp/resume-venv/bin/pip install pypdfium2 pillow fonttools

# rasterise every page so you can actually look at it
/tmp/resume-venv/bin/python scripts/pdf-to-png.py public/Resume.pdf /tmp/png

# assert the failures that are invisible in source
/tmp/resume-venv/bin/python scripts/verify-resume-pdf.py public/Resume.pdf
```

`verify-resume-pdf.py` checks that no inked glyph sits outside the text column,
that every section heading extracts as a literal string, that the contact
details and key metrics are present, and that no replacement glyphs appear.
**Every one of those assertions exists because that exact bug shipped once.**

### Why "it compiles" is not verification

The first version of this feature passed typecheck, lint and build, generated a
valid PDF, and was broken in three ways that only rendering could reveal:

- the name overlapped the line beneath it (no explicit `lineHeight`);
- `統一資訊` rendered as `(¡ Ç` (base-14 fonts are WinAnsi-encoded);
- `8 cm → 3 cm` rendered as `8 cm ' 3 cm` — the single best metric on the page,
  silently corrupted, because `→` is not in WinAnsi either.

A later pass then clipped the entire skills block off the right edge, because a
flex child sized itself from max-content. None of this is visible in source.
Render, rasterise, look.

## Fonts

`public/fonts/pdf/` holds three IBM Plex Sans weights and one IBM Plex Serif,
subset to Latin plus the typographic and arrow ranges — 168KB total, down from
~830KB unsubset. They are vendored rather than fetched from a CDN so the export
cannot lose its typography when a third party is unreachable, and they are
loaded from disk under Node and same-origin in the browser.

To change or add a weight, subset it the same way (`pyftsubset`, see the
unicode range in the git history for this file) and register it in
`resumePdf.tsx`. Only register weights the document actually uses — a
registered-but-unused face is a wasted fetch, which is how the Bold weight was
caught and removed.

## Deliberate differences between the two surfaces

They are not meant to look identical. The PDF must survive an ATS parser and a
monochrome printer, so it is a single Latin-subset column in IBM Plex with
literal section headings. The web view has the site's own faces, the reader's
theme, real links and system CJK fonts, so it uses the site's type system and
shows things the PDF must drop — the employer's registered Chinese name being
the clearest case. **Only the content is shared, and that is the point.**

## Known constraints

- `@react-pdf/renderer` adds ~465KB gzipped, in a chunk loaded only when a
  visitor clicks Download on `/resume`. It never touches any other page's load.
- react-pdf injects a hyphen at forced line breaks even with hyphenation
  disabled, so the header contact block is set as deliberate, non-wrapping
  lines rather than one string left to wrap.
- Section-heading `letterSpacing` must stay at or below ~0.5 at these sizes.
  Raising it silently breaks ATS section segmentation.
