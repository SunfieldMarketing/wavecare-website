"use client";

import './commercial.css';
import Link from 'next/link';

export default function Commercial() {
  return (
    <div className="wc-wrap">

      {/* HEADER */}
      <div className="wc-header">
        <Link href="/" className="wc-logo-wrap">
          <img
            src="/images/img_137.png" // using wavecare logo
            alt="Wavecare"
            width="160"
            height="40"
          />
        </Link>
        <div className="nav-links" style={{display: 'flex', alignItems: 'center', gap: '38px'}}>
          <Link href="/" style={{color: 'var(--on-dark)', fontSize: '14px', fontWeight: 500, textDecoration: 'none'}}>Home</Link>
          <div className="nav-dropdown">
            <Link href="/services" style={{color: 'var(--on-dark)', fontSize: '14px', fontWeight: 500, textDecoration: 'none'}}>Services ▾</Link>
            <div className="dropdown-content">
              <Link href="/photoservices" style={{color: '#000', padding: '12px 16px', textDecoration: 'none', display: 'block'}}>Brand & Photoshoots</Link>
              <Link href="/videoservices" style={{color: '#000', padding: '12px 16px', textDecoration: 'none', display: 'block'}}>Video Production</Link>
              <Link href="/design-print" style={{color: '#000', padding: '12px 16px', textDecoration: 'none', display: 'block'}}>Design & Print</Link>
              <Link href="/webdesign" style={{color: '#000', padding: '12px 16px', textDecoration: 'none', display: 'block'}}>Web Design</Link>
            </div>
          </div>
          <Link href="/about" style={{color: 'var(--on-dark)', fontSize: '14px', fontWeight: 500, textDecoration: 'none'}}>About</Link>
          <Link href="/contact" style={{color: 'var(--on-dark)', fontSize: '14px', fontWeight: 500, textDecoration: 'none'}}>Contact</Link>
        </div>
        <Link href="/contact" className="wc-header-cta">
          Get Your Free Marketing Audit
        </Link>
      </div>

      {/* HERO */}
      <div className="wc-hero">
        <p className="wc-eyebrow">For Senior Care Facilities</p>
        <h1>Families Decide in Seconds &mdash;<br/>Here's How <em>500+ Facilities</em> Become the Obvious Choice</h1>
        <div className="wc-hero-trust">
          <span>Healthcare-focused since 2019</span>
          <span className="dot"></span>
          <span>Trusted by senior care communities nationwide</span>
        </div>
      </div>

      {/* VIDEO CONTEXT LINE */}
      <div className="wc-video-context">
        <span className="play-icon"></span>
        <span>Watch the overview &mdash; Jake explains the family-first approach</span>
      </div>

      {/* VIDEO */}
      <div className="wc-video-section">
        <div className="wc-video-wrap">
          <div className="wc-video-border"></div>
          <div className="wc-video-container">
            <iframe
              src="https://player.vimeo.com/video/1187767005?badge=0&autopause=0&player_id=0&app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none'}}
              title="Wavecare Commercial">
            </iframe>
          </div>
        </div>
      </div>

      {/* SUBHEADLINE + DIFFERENTIATED MID-CTA */}
      <div className="wc-video-cta">
        <p className="wc-subhead">See the exact approach helping senior care facilities turn more website visitors into calls, tours, and move-ins.</p>
        <Link href="/contact" className="wc-btn-primary">
          Show Me What's Costing Me Inquiries
        </Link>
        <span className="wc-btn-note">15 minutes &middot; No obligation &middot; No credit card</span>
      </div>

      {/* STATS */}
      <div className="wc-stats-bar">
        <div className="wc-stats-inner">
          <div className="wc-stat">
            <div className="wc-stat-num">500+</div>
            <div className="wc-stat-label">Facilities Served</div>
          </div>
          <div className="wc-stat">
            <div className="wc-stat-num">4,000+</div>
            <div className="wc-stat-label">Resident Placements Supported</div>
          </div>
          <div className="wc-stat">
            <div className="wc-stat-num">Since 2019</div>
            <div className="wc-stat-label">Healthcare-Only Focus</div>
          </div>
        </div>
      </div>

      {/* FACILITY TYPES */}
      <div className="wc-types-band">
        <p className="wc-types-label">We work with</p>
        <div className="wc-types-row">
          <span className="wc-type-pill">Assisted Living</span>
          <span className="wc-type-pill">Memory Care</span>
          <span className="wc-type-pill">Independent Living</span>
          <span className="wc-type-pill">Skilled Nursing</span>
          <span className="wc-type-pill">Home Health</span>
        </div>
      </div>

      {/* TRANSITION */}
      <div className="wc-transition"></div>

      {/* BODY CTA */}
      <div className="wc-body-section">
        <div className="wc-body-inner">
          <span className="wc-section-tag">Free &mdash; No Obligation</span>
          <h2>See exactly what families see when they land on your website</h2>
          <p className="wc-sub">In 15 minutes we'll walk through your entire marketing presence and deliver:</p>
          <ul className="wc-audit-list">
            <li>A page-by-page walkthrough of what families see on Google and your site</li>
            <li>The 3&ndash;5 specific drop-off points where inquiries are slipping away</li>
            <li>A 90-day priority fix list with effort vs. impact estimates</li>
          </ul>
          <div className="wc-cta-wrap">
            <Link href="/contact" className="wc-cta-btn">
              Get Your Free Marketing Audit
            </Link>
            <span className="wc-cta-note">15 minutes &middot; No credit card &middot; No sales pressure</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="wc-footer">
        <p>&copy; 2026 Wavecare &nbsp;&middot;&nbsp; <a href="mailto:joey@wavescares.com">joey@wavescares.com</a> &nbsp;&middot;&nbsp; <a href="tel:+17329301934">+1 732 930 1934</a></p>
      </div>

      {/* STICKY MOBILE CTA */}
      <Link href="/contact" className="wc-mobile-cta">Get My Free Audit &rarr;</Link>

    </div>
  );
}
