import Link from 'next/link';
import type { ReactNode } from 'react';

export type CMSLinkData = {
  label?: string | null;
  type?: string | null;
  page?: any;
  url?: string | null;
  anchor?: string | null;
  style?: string | null;
  newTab?: boolean | null;
} | null | undefined;

const STYLE_CLASS: Record<string, string> = {
  primary: 'btn',
  light: 'btn btn-light',
  ghost: 'btn btn-ghost',
  text: '',
};

export function resolveHref(link: CMSLinkData): string {
  if (!link) return '#';
  switch (link.type) {
    case 'external':
      return link.url || '#';
    case 'anchor':
      return `#${(link.anchor || '').replace(/^#/, '')}`;
    case 'internal':
    default: {
      const page = link.page;
      const slug = typeof page === 'object' && page !== null ? page.slug : undefined;
      if (!slug) return link.url || '/';
      return slug === 'home' ? '/' : `/${slug}`;
    }
  }
}

export default function CMSLink({
  link,
  children,
  className,
}: {
  link: CMSLinkData;
  children?: ReactNode;
  className?: string;
}) {
  if (!link) return null;

  const href = resolveHref(link);
  const cls = [STYLE_CLASS[link.style ?? 'primary'] ?? 'btn', className].filter(Boolean).join(' ');
  const label = children ?? link.label;

  if (!label) return null;

  if (link.newTab) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-cursor>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} data-cursor>
      {label}
    </Link>
  );
}

/**
 * Renders a CMS `buttons` array as a button group.
 *
 * `center: true` adds a real CSS class (.btn-group-center, defined in
 * globals.css) that sets justify-content on this flex row. Without it,
 * the row's own inline display:flex overrides the surrounding section's
 * text-align:center — a single centered-section button (final CTAs,
 * mainly) would otherwise always render pinned to the left regardless of
 * how the section around it is aligned, since flex children don't
 * inherit text-align the way inline/inline-block content does.
 */
export function CMSLinkGroup({
  buttons,
  className,
  center,
}: {
  buttons?: Array<{ link?: CMSLinkData }> | null;
  className?: string;
  center?: boolean;
}) {
  if (!buttons?.length) return null;
  const cls = [className || 'btn-group', center ? 'btn-group-center' : ''].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {buttons.map((b, i) => (
        <CMSLink key={i} link={b.link} />
      ))}
    </div>
  );
}
