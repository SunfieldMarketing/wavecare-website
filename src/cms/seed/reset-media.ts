import './load-env';
import { getPayload } from 'payload';
import config from '../../payload.config';

/**
 * Deletes every Media document so the next seed re-uploads through whichever
 * storage adapter is currently active.
 *
 * Needed when switching storage backends: ensureMedia matches on filename and
 * returns the existing record, so without clearing them first the files would
 * stay on the old backend and their URLs would keep pointing at local paths
 * that do not exist in production.
 *
 * Pages are re-linked by the seed, which upserts each page and writes the new
 * media ids, so run `npm run seed` immediately after this.
 */
async function run() {
  const payload = await getPayload({ config });

  const { totalDocs } = await payload.find({
    collection: 'media',
    limit: 0,
    depth: 0,
    overrideAccess: true,
  });

  payload.logger.info(`→ Deleting ${totalDocs} media document(s)…`);

  await payload.delete({
    collection: 'media',
    where: { id: { exists: true } },
    overrideAccess: true,
  });

  payload.logger.info('→ Media cleared. Run `npm run seed` now to re-upload.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
