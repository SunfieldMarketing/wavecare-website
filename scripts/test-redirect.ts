/**
 * One-off: creates a temporary redirect record to verify src/proxy.ts
 * actually applies it, then deletes it. Pass `cleanup` as the only arg to
 * just delete any leftover test redirect without creating a new one.
 */
import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  if (!process.env.DATABASE_URI?.startsWith('libsql://')) {
    throw new Error(`DATABASE_URI is not the production libsql:// URL. Refusing to run.`);
  }

  const { getPayload } = await import('payload');
  const { default: config } = await import('../src/payload.config');
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'redirects',
    where: { from: { equals: '/e2e-test-redirect-source' } },
    limit: 1,
    overrideAccess: true,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'redirects', id: doc.id, overrideAccess: true });
    console.log('Deleted leftover test redirect', doc.id);
  }

  if (process.argv[2] === 'cleanup') {
    console.log('Cleanup only, done.');
    process.exit(0);
  }

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
    overrideAccess: true,
  });
  const aboutId = pages.docs[0]?.id;
  if (!aboutId) throw new Error('about page not found');

  const doc = await payload.create({
    collection: 'redirects',
    data: {
      from: '/e2e-test-redirect-source',
      to: { type: 'reference', reference: { relationTo: 'pages', value: aboutId } },
    },
    overrideAccess: true,
  });
  console.log('Created test redirect', doc.id, '-> pages/', aboutId, '(about)');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
