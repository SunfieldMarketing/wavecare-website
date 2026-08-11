import type { Payload } from 'payload';

/**
 * Seeds the initial administrator.
 *
 * SECURITY NOTES
 * - The password is never written into source. It is read from the
 *   ADMIN_INITIAL_PASSWORD environment variable, which lives in .env.local
 *   (gitignored) and is therefore not committed.
 * - The variable has no NEXT_PUBLIC_ prefix, so Next.js will not inline it
 *   into any client bundle. It exists only in the Node process.
 * - Payload never stores the plaintext: it derives a salted scrypt hash and
 *   persists only the hash and salt.
 * - Seeding this user is also what removes /admin/create-first-user, which
 *   Payload only serves while the users table is empty.
 */
export async function seedAdminUser(payload: Payload): Promise<void> {
  const username = process.env.ADMIN_USERNAME?.trim() || 'WavecareAdmin';
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs.length > 0) {
    payload.logger.info(`→ Admin user already exists — leaving users untouched.`);
    return;
  }

  if (!password) {
    payload.logger.warn(
      'ADMIN_INITIAL_PASSWORD is not set. Skipping initial admin user creation.',
    );
    return;
  }

  if (password.length < 16) {
    payload.logger.error('ADMIN_INITIAL_PASSWORD must be at least 16 characters.');
    throw new Error('Weak ADMIN_INITIAL_PASSWORD');
  }

  await payload.create({
    collection: 'users',
    data: {
      username,
      name: 'Wavecare Admin',
      role: 'admin',
      password,
    } as any,
    overrideAccess: true,
  });

  payload.logger.info(`→ Created administrator "${username}".`);
}
