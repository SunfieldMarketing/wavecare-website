import dotenv from 'dotenv';

/**
 * Loads .env.local before anything else.
 *
 * This has to be its own module. ES module imports are hoisted and evaluated
 * before the importing file's body runs, so calling dotenv.config() in the
 * seed script's body happens AFTER payload.config.ts has already been evaluated
 * — and that file reads DATABASE_URI at module scope to choose its adapter.
 *
 * The symptom was silent and expensive: the seed appeared to succeed while
 * writing to the local SQLite fallback instead of the configured remote
 * database, leaving the real database empty.
 *
 * Importing this module before payload.config guarantees the ordering, because
 * ESM evaluates imports depth-first in source order.
 */
dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.DATABASE_URI) {
  console.warn('[seed] DATABASE_URI is not set — falling back to a local SQLite file.');
}
