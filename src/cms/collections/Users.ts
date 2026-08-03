import type { CollectionConfig } from 'payload';
import { adminOnly, adminOrSelf, adminFieldOnly } from '../access';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team member', plural: 'Team' },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // stay signed in for a week
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
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
