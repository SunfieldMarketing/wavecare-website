import type { CollectionConfig } from 'payload';
import { adminOnly, adminOrSelf, adminFieldOnly } from '../access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team member', plural: 'Team' },
  auth: {
    // Sign in with a username (e.g. WavecareAdmin) rather than an email.
    // Email stays available but optional, so password reset can be enabled later.
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
      requireUsername: true,
    },
    tokenExpiration: 60 * 60 * 8, // 8h session
    // Brute-force protection: lock the account for 15 minutes after 5 misses.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production', // HTTPS-only in prod
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Settings',
    description: 'People who can sign in and edit the website.',
  },
  access: {
    create: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      access: { update: adminFieldOnly },
      options: [
        { label: 'Administrator — full access including team & settings', value: 'admin' },
        { label: 'Editor — can edit all site content', value: 'editor' },
      ],
      admin: {
        description: 'Only administrators can change roles.',
      },
    },
  ],
};
