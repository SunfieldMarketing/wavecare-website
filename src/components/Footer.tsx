import Link from 'next/link';
import Image from 'next/image';
import { getGlobal } from '@/lib/cms';
import { resolveHref, type CMSLinkData } from '@/components/cms/CMSLink';

/**
 * Footer, driven by the "Footer" global in the CMS.
 *
 * Falls back to the original hardcoded content when the global has not been
 * filled in, so the footer can never render empty — an editor clearing a field
 * should degrade gracefully rather than blank the bottom of every page.
 */

const FALLBACK = {
  logo: '/wavecare-marketing-logo-white.png',
  logoHeight: 140,
  blurb:
    'Healthcare marketing that helps facilities look as good as the care they provide. Built for Healthcare.',
  columns: [
    {
      heading: 'Explore',
      links: [
        { label: 'Services', href: '/services' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'Get In Touch',
      links: [
        { label: 'info@wavecare.io', href: 'mailto:info@wavecare.io' },
        { label: '+1 305-902-6682', href: 'tel:+13059026682' },
        { label: 'Book a Demo →', href: '/contact', highlight: true },
      ],
    },
  ],
  copyright: '© {year} Wavecare Marketing · Miami, FL',
  legalLinks: [
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
  bottomNote: 'wavecare.io',
};

type SimpleLink = { label: string; href: string; highlight?: boolean };

export default async function Footer() {
  const data: any = await getGlobal('footer').catch(() => null);

  const logo = data?.logo?.url || FALLBACK.logo;
  const logoHeight = data?.logoHeight || FALLBACK.logoHeight;
  const blurb = data?.blurb || FALLBACK.blurb;

  const columns: Array<{ heading: string; links: SimpleLink[] }> = data?.columns?.length
    ? data.columns.map((c: any) => ({
        heading: c.heading,
        links: (c.links ?? []).map((l: any) => ({
          label: l.label,
          href: resolveHref(l.link as CMSLinkData),
          highlight: l.highlight,
        })),
      }))
    : FALLBACK.columns;

  const legalLinks: SimpleLink[] = data?.legalLinks?.length
    ? data.legalLinks.map((l: any) => ({ label: l.label, href: resolveHref(l.link as CMSLinkData) }))
    : FALLBACK.legalLinks;

  const copyright = (data?.copyright || FALLBACK.copyright).replace(
    '{year}',
    String(new Date().getFullYear()),
  );
  const bottomNote = data?.bottomNote ?? FALLBACK.bottomNote;

  const renderHref = (l: SimpleLink) =>
    /^(mailto:|tel:|https?:)/.test(l.href) ? (
      <a href={l.href} className={l.highlight ? 'f-book' : undefined}>
        {l.label}
      </a>
    ) : (
      <Link href={l.href} className={l.highlight ? 'f-book' : undefined}>
        {l.label}
      </Link>
    );

  return (
    <footer>
      <div className="container">
        <div className="f-grid">
          <div className="f-col f-brand">
            <div className="f-logo-row">
              <Image
                src={logo}
                alt="Wavecare Marketing"
                width={300}
                height={400}
                style={{ height: `${logoHeight}px`, width: 'auto' }}
              />
            </div>
            <p>{blurb}</p>
          </div>

          {columns.map((col, i) => {
            const plainLinks = col.links.filter((l) => !l.highlight);
            const ctaLinks = col.links.filter((l) => l.highlight);
            return (
              <div className="f-col" key={i}>
                <h4>{col.heading}</h4>
                {plainLinks.length > 0 && (
                  <ul>
                    {plainLinks.map((l, j) => (
                      <li key={j}>{renderHref(l)}</li>
                    ))}
                  </ul>
                )}
                {/* Highlighted (CTA) links get their own centered row, separate
                    from the plain left-aligned list above — centering one line
                    inside the same list as left-aligned ones read as a mistake,
                    not a deliberate button. */}
                {ctaLinks.length > 0 && (
                  <div className="f-cta-row">
                    {ctaLinks.map((l, j) => (
                      <span key={j}>{renderHref(l)}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="f-bottom">
          <div>{copyright}</div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {legalLinks.map((l, i) => (
              <Link key={i} href={l.href} style={{ color: 'inherit' }}>
                {l.label}
              </Link>
            ))}
            {bottomNote && <span>{bottomNote}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
