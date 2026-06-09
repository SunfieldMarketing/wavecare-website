'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './testimonials.css';

export default function Testimonials() {
  const [stars, setStars] = useState<{ id: number, style: any }[]>([]);

  useEffect(() => {
    // Generate glitter stars
    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        '--star-max-opacity': Math.random() * 0.4 + 0.1,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 6 + 4}s`,
        width: `${Math.random() * 12 + 6}px`,
        height: `${Math.random() * 12 + 6}px`,
        color: ['#1D9E75', '#5DCAA5', '#9FE1CB', '#ffffff'][Math.floor(Math.random() * 4)]
      }
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;

      // Animate headline chars
      const h1 = document.getElementById('wct-hero-headline');
      if (h1 && !h1.hasAttribute('data-split')) {
        h1.setAttribute('data-split', 'true');
        const text = h1.innerHTML;
        // Basic split - just for demo since we know the HTML content
        // We will just animate the whole words for simplicity if complex
      }

      function initReveals() {
        // Animate stats
        const statNums = document.querySelectorAll('.wct-stat-num');
        const ioStats = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const target = parseFloat(el.getAttribute('data-target') || '0');
              const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
              const suffix = el.getAttribute('data-suffix') || '';
              
              const start = performance.now();
              const duration = 2000;
              const step = (now: number) => {
                const p = Math.min(1, (now - start) / duration);
                const ease = 1 - Math.pow(1 - p, 3);
                const val = (target * ease).toFixed(decimals);
                el.textContent = val + suffix;
                if (p < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
              ioStats.unobserve(el);
            }
          });
        }, { threshold: 0.5 });
        statNums.forEach(el => ioStats.observe(el));
      }

      // Check and execute
      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
        }
      }, 50);
    };

    runScripts();
  }, []);

  return (
    <div className="wct-wrap" style={{ paddingTop: '74px' }}>
      
      <div className="wct-glitter-layer" id="wct-glitter" aria-hidden="true">
        {stars.map(star => (
          <div key={star.id} className="wct-star" style={star.style}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="wct-hero">
        <div className="wct-hero-inner">
          <p className="wct-eyebrow">Real Facilities · Real Results</p>
          <h1 id="wct-hero-headline">Hear what happens when <em>facilities like yours</em> work with Wavecare</h1>
          <p className="wct-hero-sub">Senior care administrators tell you — in their own words — what changed after partnering with us.</p>
          <div className="wct-hero-trust">
            <span>Healthcare-focused since 2019</span>
            <span className="dot"></span>
            <span>40+ senior care facilities served</span>
          </div>
        </div>
      </div>

      <div className="wct-stats-strip">
        <div className="wct-stats-inner">
          <div className="wct-stat">
            <div className="wct-stat-num" data-target="3.4" data-suffix="&times;" data-decimals="1">0.0&times;</div>
            <div className="wct-stat-label">Avg. lift in qualified family inquiries</div>
          </div>
          <div className="wct-stat">
            <div className="wct-stat-num" data-target="30" data-suffix=" days" data-decimals="0">0 days</div>
            <div className="wct-stat-label">Typical time to first measurable results</div>
          </div>
          <div className="wct-stat">
            <div className="wct-stat-num" data-target="100" data-suffix="%" data-decimals="0">0%</div>
            <div className="wct-stat-label">Healthcare &amp; senior care focus &mdash; no other verticals</div>
          </div>
        </div>
      </div>

      <div className="wct-hero-transition"></div>

      <div className="wct-video-section">
        <span className="wct-section-label">Watch the conversations</span>
        <h2 className="wct-section-title">Administrators on what <em>actually changed</em></h2>

        <div className="wct-video-row">
          <div className="wct-video-embed">
            <iframe src="https://player.vimeo.com/video/1187758900?badge=0&autopause=0&player_id=0&app_id=58479&quality=1080p" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="Wavecare Testimonial 1"></iframe>
          </div>
          <div className="wct-video-content">
            <div className="wct-stars">★★★★★</div>
            <p className="wct-pull-quote">Within six weeks our tour requests doubled — and the families coming through were the right fit, not tire-kickers.</p>
            <div className="wct-video-attr">
              <div className="wct-attr-line"></div>
              <div className="wct-attr-block">
                <span className="wct-attr-name">Sarah M.</span>
                <span className="wct-attr-role">Executive Director</span>
                <span className="wct-attr-facility">Assisted Living Community · 84 beds · Tampa, FL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="wct-row-divider"><hr /></div>

        <div className="wct-video-row wct-reverse">
          <div className="wct-video-embed">
            <iframe src="https://player.vimeo.com/video/1187761002?badge=0&autopause=0&player_id=0&app_id=58479&quality=1080p" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="Wavecare Testimonial 2"></iframe>
          </div>
          <div className="wct-video-content">
            <div className="wct-stars">★★★★★</div>
            <p className="wct-pull-quote">They understood memory care from day one. I didn't have to teach them what dignity looks like in our marketing.</p>
            <div className="wct-video-attr">
              <div className="wct-attr-line"></div>
              <div className="wct-attr-block">
                <span className="wct-attr-name">David R.</span>
                <span className="wct-attr-role">Facility Director</span>
                <span className="wct-attr-facility">Memory Care Community · 56 residents · Princeton, NJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wct-inline-cta">
        <div className="wct-inline-cta-text">
          <span>Curious where you stand?</span>
          We'll show you exactly what families see when they search for your facility — free.
        </div>
        <Link href="/contact" className="wct-inline-cta-btn">Book My Audit</Link>
      </div>

      <div className="wct-divider">
        <div className="wct-divider-line"></div>
        <span className="wct-divider-text">More from our clients</span>
        <div className="wct-divider-line"></div>
      </div>

      <div className="wct-text-section">
        <div className="wct-text-grid">
          <div className="wct-text-card">
            <div className="wct-card-top">
              <span className="wct-stars">★★★★★</span>
              <span className="wct-quote-mark">"</span>
            </div>
            <p className="wct-quote">From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.</p>
            <div className="wct-card-outcome">Better-fit inquiries in under 30 days</div>
            <div className="wct-attribution">
              <div className="wct-avatar">JF</div>
              <div className="wct-attr-card-block">
                <span className="wct-attr-card-name">Jennifer F.</span>
                <span className="wct-attr-card-role">Facility Administrator</span>
                <span className="wct-attr-card-loc">Independent Living · Charleston, SC</span>
              </div>
            </div>
          </div>

          <div className="wct-text-card">
            <div className="wct-card-top">
              <span className="wct-stars">★★★★★</span>
              <span className="wct-quote-mark">"</span>
            </div>
            <p className="wct-quote">What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.</p>
            <div className="wct-card-outcome">New site &amp; photography in 5 weeks</div>
            <div className="wct-attribution">
              <div className="wct-avatar">MT</div>
              <div className="wct-attr-card-block">
                <span className="wct-attr-card-name">Michael T.</span>
                <span className="wct-attr-card-role">Facility Director</span>
                <span className="wct-attr-card-loc">Skilled Nursing · Cherry Hill, NJ</span>
              </div>
            </div>
          </div>

          <div className="wct-text-card">
            <div className="wct-card-top">
              <span className="wct-stars">★★★★★</span>
              <span className="wct-quote-mark">"</span>
            </div>
            <p className="wct-quote">Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.</p>
            <div className="wct-card-outcome">Ongoing partnership, year two</div>
            <div className="wct-attribution">
              <div className="wct-avatar">AL</div>
              <div className="wct-attr-card-block">
                <span className="wct-attr-card-name">Angela L.</span>
                <span className="wct-attr-card-role">Marketing Administrator</span>
                <span className="wct-attr-card-loc">Continuing Care Retirement · Atlanta, GA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wct-cta-section">
        <div className="wct-cta-inner">
          <span className="wct-cta-tag">Free · No Obligation</span>
          <h2>Ready to see what <em>your facility</em> could look like?</h2>
          <p>In 15 minutes we'll walk through your entire marketing presence and show you exactly what families see, where you're losing inquiries, and what we'd fix first.</p>
          <div className="wct-cta-wrap">
            <Link href="/contact" className="wct-cta-btn">Get Your Free Marketing Audit</Link>
            <span className="wct-cta-note">15 minutes · No credit card · No sales pressure</span>
          </div>
        </div>
      </div>

    </div>
  );
}
