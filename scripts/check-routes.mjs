/**
 * Quick health check across every public route: status, byte size, whether the
 * page rendered real sections, and whether a Next error page came back.
 * Reads server HTML, so it is unaffected by browser rendering.
 */
const base = process.argv[2] || 'http://localhost:3000';

const routes = [
  '/',
  '/about',
  '/services',
  '/photoservices',
  '/videoservices',
  '/design-print',
  '/webdesign',
  '/commercial',
  '/case-studies',
  '/case-studies/oakwood',
  '/contact',
  '/testimonials',
  '/privacy-policy',
  '/terms-of-service',
];

console.log('route                    status  bytes    <section>  notes');
console.log('-----------------------------------------------------------------');

for (const r of routes) {
  try {
    const res = await fetch(base + r, { redirect: 'follow' });
    const html = await res.text();
    const sections = (html.match(/<section/g) || []).length;
    const notes = [];
    // NB: strings like `__next_error__`, "Application error" and "This page
    // could not be found" all ship inside Next's dev overlay bundle on EVERY
    // page, so matching them flags healthy routes. Judge on real signals only:
    // the status code, and whether the page actually rendered anything.
    if (res.status >= 400) notes.push(`HTTP ${res.status}`);
    if (html.length < 5000) notes.push('SUSPICIOUSLY SMALL');
    if (sections === 0) notes.push('no sections');
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    if (title) notes.push(`title="${title.slice(0, 46)}"`);
    console.log(
      `${r.padEnd(24)} ${String(res.status).padEnd(7)} ${String(html.length).padEnd(8)} ${String(sections).padEnd(10)} ${notes.join(' | ')}`,
    );
  } catch (e) {
    console.log(`${r.padEnd(24)} FETCH FAILED  ${e.message}`);
  }
}
