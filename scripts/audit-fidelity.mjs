/**
 * Fidelity audit.
 *
 * Compares the CMS-rendered page's server HTML against the class vocabulary the
 * hand-written page used, and flags any class we emit that no stylesheet
 * defines. Runs against SSR HTML so it is unaffected by browser rendering.
 */
import fs from 'fs';
import { execSync } from 'child_process';

const url = process.argv[2] || 'http://localhost:3000/photoservices';
const originalRef = process.argv[3] || 'eab4b20~1:src/app/photoservices/page.tsx';

const html = await (await fetch(url)).text();

// Every class defined anywhere in our CSS.
const cssFiles = execSync('git ls-files "src/**/*.css"').toString().trim().split('\n');
const defined = new Set();
for (const f of cssFiles) {
  const css = fs.readFileSync(f, 'utf8');
  for (const m of css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) defined.add(m[1]);
}

// Classes present in the rendered page.
const used = new Set();
for (const m of html.matchAll(/class="([^"]+)"/g)) {
  m[1].split(/\s+/).forEach((c) => c && used.add(c));
}

// Classes the ORIGINAL hand-written page used.
let originalUsed = new Set();
try {
  const orig = execSync(`git show ${originalRef}`).toString();
  for (const m of orig.matchAll(/className="([^"]+)"/g)) {
    m[1].split(/\s+/).forEach((c) => c && originalUsed.add(c));
  }
} catch (e) {
  console.log('(could not read original for comparison:', e.message.split('\n')[0], ')');
}

const undefinedClasses = [...used].filter((c) => !defined.has(c) && !c.startsWith('__'));
const missingVsOriginal = [...originalUsed].filter((c) => !used.has(c));

console.log(`URL: ${url}`);
console.log(`HTML bytes: ${html.length}`);
console.log(`Sections rendered: ${(html.match(/<section/g) || []).length}`);
console.log('');
console.log(`Classes emitted: ${used.size}`);
console.log(`Undefined in any CSS (${undefinedClasses.length}):`);
undefinedClasses.sort().forEach((c) => console.log('   ', c));
console.log('');
console.log(`In original page but NOT in CMS render (${missingVsOriginal.length}):`);
missingVsOriginal.sort().forEach((c) => console.log('   ', c));
