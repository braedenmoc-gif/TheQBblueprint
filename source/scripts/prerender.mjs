// After the Vite build, copy index.html into one folder per route so GitHub Pages
// answers deep links with a normal 200 instead of the 404 fallback. Article pages
// also get their own title, description and readable text for search engines.
import { mkdirSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
const base = 'https://theqbblueprint.org';
const articles = JSON.parse(readFileSync('src/data/articles.json', 'utf8'));
const routes = ['about', 'resources', 'program', 'film-room', 'faq', 'contact', 'privacy', 'terms', 'articles', 'cheat-sheet',
  'products/quarterback-playbook', 'products/qb-film-room-guide', 'products/quarterback-journal', 'products/complete-qb-development-bundle'];
for (const r of routes) { mkdirSync(`dist/${r}`, { recursive: true }); copyFileSync('dist/index.html', `dist/${r}/index.html`); }


const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const shell = readFileSync('dist/index.html', 'utf8');
const seo = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const withMeta = (html, title, desc, url) => html
  .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(desc)}" />`)
  .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
  .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(desc)}" />`)
  .replace('</head>', `<link rel="canonical" href="${url}" />\n</head>`);
for (const [path, m] of Object.entries(seo)) {
  const file = path === '/' ? 'dist/index.html' : `dist${path}/index.html`;
  writeFileSync(file, withMeta(shell, m.title, m.description, base + (path === '/' ? '/' : path)));
}
for (const a of articles) {
  const url = `${base}/articles/${a.slug}`;
  const body = [`<article><h1>${esc(a.title)}</h1><p>${esc(a.intro)}</p>`,
    ...a.sections.map((s) => `<h2>${esc(s.h)}</h2>${(s.p || []).map((p) => `<p>${esc(p)}</p>`).join('')}${s.list ? `<ul>${s.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}`),
    '</article>'].join('');
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description, url, author: { '@type': 'Organization', name: 'QB Blueprint' }, publisher: { '@type': 'Organization', name: 'QB Blueprint' } });
  let html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(a.title)} | QB Blueprint</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(a.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(a.title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(a.description)}" />`)
    .replace('</head>', `<link rel="canonical" href="${url}" />\n<script type="application/ld+json">${ld}</script>\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  mkdirSync(`dist/articles/${a.slug}`, { recursive: true });
  writeFileSync(`dist/articles/${a.slug}/index.html`, html);
}

const all = ['', ...routes, ...articles.map((a) => `articles/${a.slug}`)];
const urls = all.map((r) => `  <url><loc>${base}/${r}</loc></url>`).join('\n');
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
