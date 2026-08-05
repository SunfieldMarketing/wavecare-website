'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import posthog from 'posthog-js';

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
  const close = () => setMobileMenuOpen(false);

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
            if (next) posthog.capture('mobile_menu_opened');
          }}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {nav.items.map((item) =>
            item.children?.length ? (
              <div className="nav-dropdown" key={item.label}>
                <Link href={item.href} data-cursor onClick={close}>
                  {item.label} ▾
                </Link>
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
