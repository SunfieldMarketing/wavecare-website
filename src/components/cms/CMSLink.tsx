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

/** Renders a CMS `buttons` array as a button group. */
export function CMSLinkGroup({
  buttons,
  className,
}: {
  buttons?: Array<{ link?: CMSLinkData }> | null;
  className?: string;
}) {
  if (!buttons?.length) return null;
  return (
    <div className={className ?? 'btn-group'} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {buttons.map((b, i) => (
        <CMSLink key={i} link={b.link} />
      ))}
    </div>
  );
}
