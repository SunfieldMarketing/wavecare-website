import path from 'path';
import fs from 'fs';
import type { Payload } from 'payload';

const PUBLIC = path.resolve(process.cwd(), 'public');

/**
 * Registers a file from /public into the Media library, reusing the existing
 * record if one already has that filename.
 *
 * Returns the raw id — SQLite uses integer ids, so it must not be stringified
 * or Payload's upload-relationship validation rejects it. Returns null when the
 * file is missing so a seed can skip it rather than fail outright.
 */
export async function ensureMedia(
  payload: Payload,
  relPath: string,
  alt: string,
): Promise<number | string | null> {
  const filePath = path.join(PUBLIC, relPath);
  if (!fs.existsSync(filePath)) {
    payload.logger.warn(`  ! missing file, skipped: ${relPath}`);
    return null;
  }

  const filename = path.basename(relPath);
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs.length > 0) return existing.docs[0].id;

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath,
    overrideAccess: true,
  });
  return doc.id;
}
