import { getGlobal } from '@/lib/cms';
import { resolveHref, type CMSLinkData } from '@/components/cms/CMSLink';
import NavbarClient, { type NavData, type NavItem } from './NavbarClient';

/**
 * Header, driven by the "Navigation" global in the CMS.
 *
 * Falls back to the original menu if the global is empty, so an incomplete
 * edit can never leave the site without navigation.
 */
const FALLBACK: NavData = {
  logo: '/wavecare-marketing-logo-white.png',
  logoHeight: 110,
  items: [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: '/services',
      children: [
        { label: 'Brand & Photoshoots', href: '/photoservices' },
        { label: 'Video Production', href: '/videoservices' },
        { label: 'Design & Print', href: '/design-print' },
        { label: 'Web Design', href: '/webdesign' },
        { label: 'Ad Management', href: '/digital-marketing' },
      ],
    },
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Book a Demo', href: '/contact' },
};

export default async function Navbar() {
  const data: any = await getGlobal('navigation').catch(() => null);

  const items: NavItem[] = data?.items?.length
    ? data.items.map((item: any) => ({
        label: item.label,
        href: resolveHref(item.link as CMSLinkData),
        children: (item.children ?? []).map((c: any) => ({
          label: c.label,
          href: resolveHref(c.link as CMSLinkData),
        })),
      }))
    : FALLBACK.items;

  const nav: NavData = {
    logo: data?.logo?.url || FALLBACK.logo,
    logoHeight: data?.logoHeight || FALLBACK.logoHeight,
    items,
    cta:
      data?.cta?.enabled === false
        ? null
        : data?.cta?.link?.label
          ? { label: data.cta.link.label, href: resolveHref(data.cta.link as CMSLinkData) }
          : FALLBACK.cta,
  };

  return <NavbarClient nav={nav} />;
}
