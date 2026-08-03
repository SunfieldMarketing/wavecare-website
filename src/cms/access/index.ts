import type { Access, FieldAccess } from 'payload';

type Role = 'admin' | 'editor';

const hasRole = (user: any, ...roles: Role[]): boolean =>
  Boolean(user?.role && roles.includes(user.role));

/** Anyone signed in can read. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Published content is public; drafts require a login. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: 'published' } };
};

/** Admins only. */
export const adminOnly: Access = ({ req: { user } }) => hasRole(user, 'admin');

/** Admins and editors — the normal "can change content" rule. */
export const adminOrEditor: Access = ({ req: { user } }) => hasRole(user, 'admin', 'editor');

/** Field-level: only admins may change this field. */
export const adminFieldOnly: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin');

/** Admins manage anyone; everyone else may only read/update their own record. */
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin')) return true;
  if (!user) return false;
  return { id: { equals: user.id } };
};
