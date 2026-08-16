#!/usr/bin/env python3
"""Check the rendered resume PDF for the failures that are invisible in source.

Every assertion here exists because the corresponding bug actually shipped:

  margins   text ran past the right edge and was clipped by the page, because a
            flex child sized itself from max-content (see resumePdf.tsx).
  headings  section headings extracted as "E X P E R I E N C E" under letter
            spacing, which defeats ATS section segmentation.
  glyphs    the base-14 fonts are WinAnsi-encoded, so "→" silently became "'"
            and corrupted the strongest metric on the page.
  contact   ATS parsers drop header/footer content; the address has to extract
            from the body or the document is unreachable.
  links     GitHub/LinkedIn/email show short label text, not the raw URL —
            clickability lives entirely in the link annotation, so if
            react-pdf ever silently dropped it there would be nothing else on
            the page to notice. Checked directly against the PDF's own
            "/Subtype /Link" + "/URI" objects, not the visible text layer.

    verify-resume-pdf.py <resume.pdf>

Exits non-zero on any failure so it can gate a commit.
"""
import sys
import pathlib
import pypdfium2 as pdfium

# A4 at 72dpi, matching the Page size in resumePdf.tsx.
PAGE_W, PAGE_H = 595.28, 841.89
# paddingHorizontal is 44; allow a little slack for glyph side bearings.
MARGIN_X, TOLERANCE = 44.0, 2.0

REQUIRED_HEADINGS = [
    "CORE SKILLS",
    "EXPERIENCE",
    "RECOGNITION",
    "EDUCATION",
    "SELECTED PROJECTS",
]
REQUIRED_STRINGS = [
    "ajishpradeep@gmail.com",  # visible text: full email, not a "click here"
    "Portfolio",  # visible text is the platform name; the URL lives in the link
    "GitHub",
    "LinkedIn",  # annotation only — see REQUIRED_LINK_URIS below
    "8 cm → 3 cm",  # the arrow the old base-14 font destroyed
    "7,000+",
    "99.23%",
]
# The actual clickable destinations, checked against the PDF's link
# annotations rather than the visible text layer (see REQUIRED_STRINGS above
# for why they can't both be checked the same way).
REQUIRED_LINK_URIS = [
    "mailto:ajishpradeep@gmail.com",
    "https://ajishpradeep.github.io",
    "https://github.com/Ajishpradeep",
    "https://linkedin.com/in/ajishpradeep",
]
# Replacement char / null / tofu — each means a glyph was missing from the subset.
FORBIDDEN_SUBSTRINGS = ["\ufffd", "\x00"]


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2

    path = pathlib.Path(sys.argv[1])
    doc = pdfium.PdfDocument(path)
    failures: list[str] = []

    text = "\n".join(p.get_textpage().get_text_range() for p in doc)

    for heading in REQUIRED_HEADINGS:
        if heading not in text:
            failures.append(
                f"heading {heading!r} does not extract literally "
                f"(letter spacing too wide? ATS cannot segment sections)"
            )

    for needle in REQUIRED_STRINGS:
        if needle not in text:
            failures.append(f"missing expected string {needle!r}")

    # Link annotations aren't in the text layer at all, so they need their own
    # check: read the raw PDF bytes for "/Subtype /Link" + "/URI (...)"
    # objects. pypdfium2 has no annotation-inspection API in the version this
    # project pins, and these objects are emitted uncompressed by react-pdf,
    # so a direct byte search is reliable rather than a workaround.
    raw = path.read_bytes()
    for uri in REQUIRED_LINK_URIS:
        needle = f"/URI ({uri})".encode()
        if needle not in raw:
            failures.append(f"no clickable /Link annotation found for {uri!r}")

    for bad in FORBIDDEN_SUBSTRINGS:
        if bad in text:
            failures.append(f"replacement/null glyph {bad!r} present — font subset is missing a character")

    # Every inked glyph must sit inside the horizontal text column. Whitespace
    # is skipped: a wrapped line legitimately carries a trailing space whose box
    # sits a fraction past the margin, and it puts no ink on the page.
    for page_index, page in enumerate(doc, start=1):
        textpage = page.get_textpage()
        for char_index in range(textpage.count_chars()):
            ch = textpage.get_text_range(char_index, 1)
            if not ch.strip():
                continue
            left, _bottom, right, _top = textpage.get_charbox(char_index, loose=False)
            if right > PAGE_W - MARGIN_X + TOLERANCE or left < MARGIN_X - TOLERANCE:
                failures.append(
                    f"page {page_index}: character {ch!r} at x=[{left:.1f},{right:.1f}] "
                    f"outside the [{MARGIN_X}, {PAGE_W - MARGIN_X}] column"
                )
                break  # one report per page is enough to signal the defect

    pages = len(doc)
    if pages > 2:
        failures.append(f"{pages} pages — target is at most 2")

    print(f"{path.name}: {pages} page(s), {len(text)} chars extracted")
    if failures:
        print(f"\n{len(failures)} FAILURE(S):")
        for f in failures:
            print(f"  ✗ {f}")
        return 1

    print("all checks passed (margins, headings, glyphs, contact details)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
