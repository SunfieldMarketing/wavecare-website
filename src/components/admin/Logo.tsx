/**
 * Admin panel branding — replaces Payload's default wordmark/icon graphics
 * with the real Wavecare mark, matching the site's own logo assets exactly
 * (same files the frontend nav uses) rather than a redrawn approximation.
 *
 * Server components: Payload's admin.components.graphics slots render on
 * the server, so plain <img> tags are fine here — no client interactivity
 * needed.
 */

/** Full lockup (wave mark + wordmark) — shown on the login screen. */
export function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/wavecare-marketing-logo.png"
      alt="Wavecare Marketing"
      className="graphic-logo"
      style={{ height: '150px', width: 'auto', display: 'block', margin: '0 auto' }}
    />
  );
}

/** Compact mark only — shown in the collapsed nav rail and other tight spots. */
export function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/favicon.png"
      alt="Wavecare"
      className="graphic-icon"
      style={{ height: '100%', width: '100%', objectFit: 'contain', display: 'block' }}
    />
  );
}
