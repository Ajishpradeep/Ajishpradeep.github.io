/*
 * Dev-only: renders the resume PDF to a file so it can be visually inspected.
 *
 * Not part of the site build. The PDF ships generated client-side from the
 * browser (see src/lib/downloadResumePdf.ts); this exists purely so changes to
 * the document can be *looked at* rather than assumed correct — an earlier
 * pass shipped a PDF with overlapping text because nothing ever rendered it.
 *
 * Run via scripts/render-resume.sh, which bundles the TSX with esbuild first.
 */
import { renderToFile } from '@react-pdf/renderer';
import { ResumePDF } from '../src/lib/resumePdf';

const out = process.argv[2];
if (!out) {
  console.error('usage: render-resume <output.pdf>');
  process.exit(1);
}

await renderToFile(<ResumePDF />, out);
console.log(`rendered → ${out}`);
