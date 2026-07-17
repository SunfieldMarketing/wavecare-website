'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    posthog.capture('cookie_consent_accepted');
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    posthog.capture('cookie_consent_declined');
  };

  if (!showBanner) return null;

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
        We use cookies to improve your experience on our site, analyze site traffic, and for marketing purposes. 
        By clicking "Accept", you consent to our use of cookies. 
        Read our <Link href="/privacy-policy" style={{ color: '#00D1FF', textDecoration: 'underline' }}>Privacy Policy</Link> for more information.
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={acceptCookies} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px', minWidth: '120px' }}>
          Accept
        </button>
        <button onClick={declineCookies} className="btn" style={{ padding: '8px 20px', fontSize: '14px', minWidth: '120px', backgroundColor: 'transparent', border: '1px solid #555' }}>
          Decline
        </button>
      </div>
    </div>
  );
}
