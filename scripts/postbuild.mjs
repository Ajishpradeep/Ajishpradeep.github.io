/*
 * Post-build step for GitHub Pages.
 *
 * Pages has no SPA rewrite rule. The usual workaround — copy index.html to
 * 404.html — renders every client route correctly but answers with an HTTP 404
 * status, so crawlers drop the URLs the sitemap advertises.
 *
 * This script instead emits a real static file for every route the site claims
 * exists, each carrying its own title, description and canonical URL, so those
 * URLs return 200 with correct metadata before React has run. 404.html still
 * ships as the catch-all for genuinely unknown paths.
 *
 * Route metadata is read from src/data/work.ts so the slugs, the sitemap and
 * the emitted pages cannot drift apart.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const ORIGIN = 'https://ajishpradeep.github.io';

/** Reads a single-quoted TS string literal starting at `from`, honouring escapes. */
function readStringLiteral(source, from) {
  const start = source.indexOf("'", from);
  if (start === -1) return null;
  let out = '';
  for (let i = start + 1; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '\\') {
      out += source[i + 1];
      i += 1;
      continue;
    }
    if (ch === "'") return { value: out, end: i };
    out += ch;
  }
  return null;
}

/** Pulls slug / title / teaser out of each case-study object literal. */
function readCaseStudies() {
  const source = readFileSync(join(root, 'src/data/work.ts'), 'utf8');
  const studies = [];
  const slugPattern = /\n\s{4}slug:\s/g;
  let match;

  while ((match = slugPattern.exec(source)) !== null) {
    const slug = readStringLiteral(source, match.index + match[0].length - 1);
    if (!slug) continue;

    const titleAt = source.indexOf('title:', slug.end);
    const teaserAt = source.indexOf('teaser:', slug.end);
    const title = titleAt === -1 ? null : readStringLiteral(source, titleAt + 6);
    const teaser = teaserAt === -1 ? null : readStringLiteral(source, teaserAt + 7);

    studies.push({
      slug: slug.value,
      title: title ? title.value : slug.value,
      teaser: teaser ? teaser.value : '',
    });
  }

  return studies;
}

/** Swaps the head metadata of the built shell for this route's own. */
function pageFor(shell, { path, title, description }) {
  const url = `${ORIGIN}${path}`;
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=)"[\s\S]*?"/,
      `$1"${escapeHtml(description)}"`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=)"[^"]*"/, `$1"${url}"`)
    .replace(/(<meta\s+property="og:title"\s+content=)"[\s\S]*?"/, `$1"${escapeHtml(title)}"`)
    .replace(
      /(<meta\s+property="og:description"\s+content=)"[\s\S]*?"/,
      `$1"${escapeHtml(description)}"`,
    )
    .replace(/(<meta\s+property="og:url"\s+content=)"[^"]*"/, `$1"${url}"`);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function write(relativePath, contents) {
  const target = join(dist, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
}

const shell = readFileSync(join(dist, 'index.html'), 'utf8');
const studies = readCaseStudies();
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/' },
  {
    path: '/about/',
    title: 'About — Pradeep Rajasekar (Ajish Pradeep), AI Research Engineer',
    description:
      'AI Research Engineer in Taiwan working on 3D computer vision, on-device inference and agentic LLM systems. Background, timeline and what I am looking for.',
  },
  {
    path: '/resume/',
    title: 'Resume — Pradeep Rajasekar (Ajish Pradeep), AI Research Engineer',
    description:
      'Experience, education and skills for Pradeep Rajasekar, AI Research Engineer — on-screen resume with an ATS-friendly PDF download.',
  },
  ...studies.map((study) => ({
    path: `/work/${study.slug}/`,
    title: `${study.title} — Pradeep Rajasekar`,
    description: study.teaser,
  })),
];

// Every advertised route gets a real file, so Pages answers 200 rather than 404.
for (const route of routes) {
  if (route.path === '/') continue;
  write(`${route.path}index.html`, pageFor(shell, route));
}

// Catch-all for paths that genuinely do not exist.
write('404.html', shell);

/*
 * Sitemaps follow Google Search Central + sitemaps.org:
 * - UTF-8 XML with absolute https URLs
 * - Only required <loc>; <lastmod> optional (Google uses it when accurate)
 * - Google ignores <changefreq> and <priority>, so they are omitted
 * - Text sitemap (.txt) is an officially supported alternate format
 *   (one absolute URL per line) — useful when GSC cannot fetch XML on
 *   github.io hosts
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 * @see https://www.sitemaps.org/protocol.html
 */
const absoluteUrls = routes.map((route) => `${ORIGIN}${route.path}`);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${absoluteUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemapXml);

const sitemapTxt = `${absoluteUrls.join('\n')}\n`;
write('sitemap.txt', sitemapTxt);

console.log(
  `postbuild: ${routes.length - 1} route pages + 404.html + sitemap.xml + sitemap.txt (${studies.length} case studies)`,
);
