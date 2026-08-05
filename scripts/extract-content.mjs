/**
 * Pulls the human-readable content out of a hand-written page component so it
 * can be mapped onto CMS blocks without reading the whole file.
 *
 * Emits section markers, headings, paragraphs, list items, images, Vimeo ids
 * and link labels in document order.
 *
 *   node scripts/extract-content.mjs src/app/(frontend)/testimonials/page.tsx
 */
import fs from 'fs';

const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');

const strip = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←')
    .replace(/&ndash;/g, '–')
    .replace(/&#9733;/g, '★')
    .replace(/&#9654;/g, '▶')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const patterns = [
  [/\{\/\*\s*=*\s*([A-Z][^*]*?)\s*=*\s*\*\/\}/g, (m) => `\n── ${m[1].trim()} ──`],
  [/<section[^>]*className="([^"]*)"/g, (m) => `  [section .${m[1]}]`],
  [/<h1[^>]*>([\s\S]*?)<\/h1>/g, (m) => `  H1: ${strip(m[1])}`],
  [/<h2[^>]*>([\s\S]*?)<\/h2>/g, (m) => `  H2: ${strip(m[1])}`],
  [/<h3[^>]*>([\s\S]*?)<\/h3>/g, (m) => `  H3: ${strip(m[1])}`],
  [/<h4[^>]*>([\s\S]*?)<\/h4>/g, (m) => `  H4: ${strip(m[1])}`],
  [/className="label[^"]*"[^>]*>([^<]{2,90})</g, (m) => `  LABEL: ${strip(m[1])}`],
  [/<p[^>]*>([\s\S]*?)<\/p>/g, (m) => (strip(m[1]) ? `  P: ${strip(m[1])}` : '')],
  [/<li[^>]*>([\s\S]*?)<\/li>/g, (m) => (strip(m[1]) ? `  LI: ${strip(m[1])}` : '')],
  [/<span className="(?:num|stat-num|value)"[^>]*>([^<]+)</g, (m) => `  STAT: ${strip(m[1])}`],
  [/player\.vimeo\.com\/video\/(\d+)/g, (m) => `  VIMEO: ${m[1]}`],
  [/setActiveVideo\('(\d+)'\)/g, (m) => `  VIMEO(click): ${m[1]}`],
  [/(?:src|backgroundImage)[=:]\s*["'`{]*\s*(?:url\()?['"]?(\/images\/[^"'`)]+)/g, (m) => `  IMG: ${m[1]}`],
  [/src="(\/videos\/[^"]+)"/g, (m) => `  VIDEO: ${m[1]}`],
  [/<Link[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/Link>/g, (m) => `  LINK: "${strip(m[2])}" -> ${m[1]}`],
];

const hits = [];
for (const [re, fmt] of patterns) {
  for (const m of src.matchAll(re)) {
    const out = fmt(m);
    if (out) hits.push({ at: m.index, out });
  }
}

hits.sort((a, b) => a.at - b.at);

const seen = new Set();
for (const h of hits) {
  if (seen.has(h.out)) continue;
  seen.add(h.out);
  console.log(h.out);
}
