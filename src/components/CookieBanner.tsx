'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Found 2026-08-26 during the integrations audit: this component existed,
 * fully built, and Site Settings already had a matching `cookieBanner` group
 * (enabled/text/acceptLabel/declineLabel) — but nothing ever imported or
 * rendered <CookieBanner /> anywhere in the app (grepped the whole src tree:
 * zero references outside this file). The site runs GA4, Google Ads, Meta
 * Pixel, and PostHog on every page, plus a lead form that sends PII to
 * GoHighLevel, with no consent mechanism actually visible to a visitor.
 * Wired into layout.tsx now, fed by Site Settings so the CMS fields it
 * always had actually do something.
 */
type CookieBannerSettings = {
  enabled?: boolean | null;
  text?: string | null;
  acceptLabel?: string | null;
  declineLabel?: string | null;
};

const DEFAULT_TEXT =
  'We use cookies to improve your experience on our site, analyze site traffic, and for marketing purposes. By clicking "Accept", you consent to our use of cookies.';

export default function CookieBanner({ settings }: { settings?: CookieBannerSettings | null }) {
  const [showBanner, setShowBanner] = useState(false);

  // Default is true (matches the field's own defaultValue in SiteSettings.ts)
  // so an unset global still shows the banner rather than silently hiding it.
  const enabled = settings?.enabled !== false;
  const text = settings?.text?.trim() || DEFAULT_TEXT;
  const acceptLabel = settings?.acceptLabel?.trim() || 'Accept';
  const declineLabel = settings?.declineLabel?.trim() || 'Decline';

  useEffect(() => {
    if (!enabled) return;
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, [enabled]);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    (window as any).posthog?.capture('cookie_consent_accepted');
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    (window as any).posthog?.capture('cookie_consent_declined');
  };

  if (!enabled || !showBanner) return null;

  return (
    <div className="cookie-banner" style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      backgroundColor: '#111',
      color: '#fff',
      padding: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      borderTop: '1px solid #333',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.2)'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', fontSize: '14px', lineHeight: '1.5' }}>
        {text}{' '}
        Read our <Link href="/privacy-policy" style={{ color: '#00D1FF', textDecoration: 'underline' }}>Privacy Policy</Link> for more information.
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={acceptCookies} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px', minWidth: '120px' }}>
          {acceptLabel}
        </button>
        <button onClick={declineCookies} className="btn" style={{ padding: '8px 20px', fontSize: '14px', minWidth: '120px', backgroundColor: 'transparent', border: '1px solid #555' }}>
          {declineLabel}
        </button>
      </div>
    </div>
  );
}
