/**
 * Reconciles Payload's migration history with a schema that was applied by
 * `push` rather than by a migration.
 *
 * Running Payload in dev against a hosted database pushes schema directly and
 * writes a marker row named "dev" with batch -1. From then on `payload migrate`
 * sees a dev-pushed database, warns that data loss will occur and refuses to
 * run — so migrations never apply and the history drifts from the real schema.
 *
 * This drops that marker and records the named migrations as applied, which is
 * accurate: push already created their tables. Push is now restricted to local
 * SQLite files in payload.config.ts, so this should not be needed again.
 *
 *   node scripts/reconcile-migrations.mjs            # report only
 *   node scripts/reconcile-migrations.mjs --apply
 */
import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const apply = process.argv.includes('--apply');
const c = createClient({
  url: process.env.DATABASE_URI,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const onDisk = fs
  .readdirSync(path.resolve('src/migrations'))
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .map((f) => f.replace(/\.ts$/, ''))
  .sort();

const recorded = (await c.execute('select name, batch from payload_migrations')).rows;
const recordedNames = new Set(recorded.map((r) => String(r.name)));

const devMarkers = recorded.filter((r) => String(r.name) === 'dev');
const missing = onDisk.filter((n) => !recordedNames.has(n));

console.log('migrations on disk :', onDisk.length);
console.log('recorded           :', recorded.filter((r) => String(r.name) !== 'dev').length);
console.log('dev push markers   :', devMarkers.length);
console.log('unrecorded         :', missing.length, missing.join(', ') || '(none)');

if (!apply) {
  console.log('\nreport only — re-run with --apply to reconcile');
  process.exit(0);
}

if (devMarkers.length) {
  await c.execute("delete from payload_migrations where name = 'dev'");
  console.log('\nremoved dev push marker(s)');
}

if (missing.length) {
  const maxBatch =
    Math.max(0, ...recorded.map((r) => Number(r.batch)).filter((n) => Number.isFinite(n) && n > 0)) ||
    0;
  const now = new Date().toISOString();
  for (const [i, name] of missing.entries()) {
    await c.execute({
      sql: 'insert into payload_migrations (name, batch, updated_at, created_at) values (?, ?, ?, ?)',
      args: [name, maxBatch + 1 + i, now, now],
    });
    console.log(`recorded ${name} as applied (batch ${maxBatch + 1 + i})`);
  }
}

console.log('\ndone');
