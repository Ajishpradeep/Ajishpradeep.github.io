#!/usr/bin/env python3
"""Dev-only: rasterise every page of a PDF to PNG so the result can be looked at.

Exists because the resume PDF shipped once with overlapping text and a
corrupted metric, all of which were invisible in the source and obvious in a
render. Pair with scripts/render-resume.sh.

    pdf-to-png.py <input.pdf> <output-dir> [scale]
"""
import sys
import pathlib
import pypdfium2 as pdfium


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1

    src = pathlib.Path(sys.argv[1])
    out = pathlib.Path(sys.argv[2])
    scale = float(sys.argv[3]) if len(sys.argv) > 3 else 2.4

    out.mkdir(parents=True, exist_ok=True)
    doc = pdfium.PdfDocument(src)

    for i, page in enumerate(doc):
        image = page.render(scale=scale).to_pil()
        target = out / f"{src.stem}-p{i + 1}.png"
        image.save(target)
        print(f"{target}  {image.width}x{image.height}")

    print(f"{len(doc)} page(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
