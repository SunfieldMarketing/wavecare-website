'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

export type NavData = {
  logo: string;
  logoHeight: number;
  items: NavItem[];
  cta?: { label: string; href: string } | null;
};

/**
 * Header markup. Structure is unchanged from the hand-written version; only the
 * links now come from the CMS "Navigation" global.
 */
export default function NavbarClient({ nav }: { nav: NavData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const close = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="logo" data-cursor onClick={close}>
          <Image
            src={nav.logo}
            alt="Wavecare Marketing"
            width={300}
            height={400}
            style={{ height: `${nav.logoHeight}px`, width: 'auto' }}
            priority
          />
        </Link>

        <button
          className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => {
            const next = !mobileMenuOpen;
            setMobileMenuOpen(next);
            // window.posthog (not the posthog-js import) — that's the instance
            // the root layout's snippet actually initializes with a real
            // token; see ContactForm.tsx for the same pattern.
            if (next) (window as any).posthog?.capture('mobile_menu_opened');
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {nav.items.map((item) =>
            item.children?.length ? (
              <div className={`nav-dropdown ${openDropdown === item.label ? 'open' : ''}`} key={item.label}>
                <span className="nav-dropdown-row">
                  <Link href={item.href} data-cursor onClick={close}>
                    {item.label}
                  </Link>
                  {/* Desktop reveals the submenu on :hover (CSS), which doesn't
                      exist on touch - without this, tapping the label above
                      just navigated straight to /services and every child
                      link (including the only nav path to Ad Management)
                      was completely unreachable on mobile. This toggles a
                      state-driven .open class that works via tap/click on
                      any device, alongside the existing hover behavior. */}
                  <button
                    type="button"
                    className="nav-dropdown-caret"
                    aria-label={`${item.label} submenu`}
                    aria-expanded={openDropdown === item.label}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    ▾
                  </button>
                </span>
                <div className="dropdown-content">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} data-cursor onClick={close}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} data-cursor onClick={close}>
                {item.label}
              </Link>
            ),
          )}

          {nav.cta && (
            <Link href={nav.cta.href} className="btn" data-magnetic data-cursor onClick={close}>
              {nav.cta.label}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
