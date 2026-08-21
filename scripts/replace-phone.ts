// `dotenv/config`'s bare import only loads a file literally named `.env` -
// this project keeps everything in `.env.local`, so that pattern silently
// loaded nothing (DATABASE_URI etc. only ever worked here if the shell
// already had it exported some other way). Must run before importing
// payload.config, which reads process.env at module-evaluation time.
import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

import { getPayload } from 'payload';
import config from '../src/payload.config';

async function replacePhones() {
  const payload = await getPayload({ config });
  const oldPhone = '732-930-1934';
  const newPhone = '+1 305-902-6682';
  const oldTel = '7329301934';
  const newTel = '+13059026682';

  const replaceStrings = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj
        .replace(new RegExp(oldPhone, 'g'), newPhone)
        .replace(new RegExp(oldTel, 'g'), newTel);
    }
    if (Array.isArray(obj)) {
      return obj.map(replaceStrings);
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = replaceStrings(obj[key]);
      }
      return newObj;
    }
    return obj;
  };

  payload.logger.info('Replacing phone numbers in Pages...');
  const pages = await payload.find({ collection: 'pages', limit: 100, overrideAccess: true });
  for (const page of pages.docs) {
    const updated = replaceStrings(page);
    if (JSON.stringify(page) !== JSON.stringify(updated)) {
      payload.logger.info(`Updating page: ${page.slug}`);
      await payload.update({
        collection: 'pages',
        id: page.id,
        data: updated,
        overrideAccess: true,
      });
    }
  }

  payload.logger.info('Replacing phone numbers in Globals...');
  const globals = ['navigation', 'footer', 'site-settings'];
  for (const global of globals) {
    const data = await payload.findGlobal({ slug: global as any, overrideAccess: true });
    const updated = replaceStrings(data);
    if (JSON.stringify(data) !== JSON.stringify(updated)) {
      payload.logger.info(`Updating global: ${global}`);
      await payload.updateGlobal({
        slug: global as any,
        data: updated,
        overrideAccess: true,
      });
    }
  }

  payload.logger.info('Done.');
  process.exit(0);
}

replacePhones().catch(console.error);
