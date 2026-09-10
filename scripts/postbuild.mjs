/*
 * Post-build step for a static host.
 *
 * The usual SPA workaround — serve index.html for every path — renders each
 * client route correctly but either answers unknown paths with 200 (soft 404s)
 * or, on hosts without a rewrite rule, answers real routes with 404. Both make
 * crawlers drop the URLs the sitemap advertises.
 *
 * This script instead emits a real static file for every route the site claims
 * exists, each carrying its own title, description and canonical URL, so those
 * URLs return 200 with correct metadata before React has run. 404.html ships as
 * the catch-all for genuinely unknown paths; Cloudflare serves it with a real
 * 404 status (`not_found_handling: "404-page"` in wrangler.jsonc).
 *
 * Route metadata is read from src/data/seo.json and src/data/work.ts — the same
 * sources the runtime head hook uses — so the slugs, the sitemap, the emitted
 * pages and what React writes on navigation cannot drift apart.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const seo = JSON.parse(readFileSync(join(root, 'src/data/seo.json'), 'utf8'));
const ORIGIN = seo.origin;

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

function noIndex(page) {
  if (/<meta\s+name="robots"/.test(page)) {
    return page.replace(/(<meta\s+name="robots"\s+content=)"[^"]*"/, '$1"noindex"');
  }

  return page.replace(
    /(<link\s+rel="canonical"\s+href="[^"]*"\s*\/>)/,
    '$1\n    <meta name="robots" content="noindex" />',
  );
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

/*
 * Google only uses <lastmod> when it is consistently accurate, and stamping
 * every URL with the build date on every deploy is the opposite of that. Each
 * route is dated by the last commit that touched the files its content comes
 * from. Falls back to today when git history isn't available (shallow CI
 * checkout, tarball) — the deploy workflow fetches full history to avoid that.
 */
function lastCommitDate(files) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) return out.slice(0, 10);
  } catch {
    // not a git checkout, or shallow clone without the relevant commit
  }
  return new Date().toISOString().slice(0, 10);
}

const shell = readFileSync(join(dist, 'index.html'), 'utf8');
const studies = readCaseStudies();

// Route → the source files whose edits genuinely change that page's content.
const shellSources = ['index.html', 'src/data/site.ts', 'src/data/seo.json'];
const routes = [
  {
    path: '/',
    lastmod: lastCommitDate([
      ...shellSources,
      'src/data/impact.ts',
      'src/data/research.ts',
      'src/data/lab.ts',
      'src/data/work.ts',
      'src/sections',
    ]),
  },
  {
    path: '/about/',
    ...seo.pages['/about/'],
    lastmod: lastCommitDate([...shellSources, 'src/data/about.ts', 'src/pages/About.tsx']),
  },
  {
    path: '/resume/',
    ...seo.pages['/resume/'],
    lastmod: lastCommitDate([
      ...shellSources,
      'src/data/resume.ts',
      'src/pages/Resume.tsx',
      'public/Resume.pdf',
    ]),
  },
  ...studies.map((study) => ({
    path: `/work/${study.slug}/`,
    title: `${study.title} — Pradeep Rajasekar`,
    description: study.teaser,
    lastmod: lastCommitDate([...shellSources, 'src/data/work.ts', 'src/pages/CaseStudy.tsx']),
  })),
];

// Every advertised route gets a real file, so the host answers 200 rather than 404.
for (const route of routes) {
  if (route.path === '/') continue;
  write(`${route.path}index.html`, pageFor(shell, route));
}

// Catch-all for paths that genuinely do not exist.
write(
  '404.html',
  noIndex(
    pageFor(shell, {
      path: '/404/',
      title: 'Not found — Pradeep Rajasekar',
      description: 'This page does not exist.',
    }),
  ),
);

/*
 * Sitemaps follow Google Search Central + sitemaps.org:
 * - UTF-8 XML with absolute https URLs
 * - Only required <loc>; <lastmod> optional (Google uses it when accurate)
 * - Google ignores <changefreq> and <priority>, so they are omitted
 * - Text sitemap (.txt) is an officially supported alternate format
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 * @see https://www.sitemaps.org/protocol.html
 */
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${ORIGIN}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const sitemapTxt = `${routes.map((route) => `${ORIGIN}${route.path}`).join('\n')}\n`;

write('sitemap.xml', sitemapXml);
write('sitemap.txt', sitemapTxt);

console.log(
  `postbuild: ${routes.length - 1} route pages + 404.html + sitemap.xml/txt (${studies.length} case studies)`,
);
