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
    // NB: `__next_error__` appears in ordinary Next dev output (the error
    // overlay boundary), so it is NOT a failure signal on its own.
    if (/This page could not be found|Application error/i.test(html)) notes.push('ERROR PAGE');
    if (/Internal Server Error/i.test(html)) notes.push('500');
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
