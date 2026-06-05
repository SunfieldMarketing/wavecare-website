"use client";

import './testimonials.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Testimonials() {
  useEffect(() => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- 1. Headline character split & reveal ----------
    const heading = document.getElementById('wct-hero-headline');
    let headlineEndDelay = 0;

    if (heading) {
      const STAGGER = 38;
      const BASE_DELAY = 250;
      let charIndex = 0;

      function processNode(node: ChildNode, parent: Node) {
        if (node.nodeType === 3) {
          const text = node.textContent || '';
          const frag = document.createDocumentFragment();
          const parts = text.split(/(\s+)/);
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else if (part.length > 0) {
              const word = document.createElement('span');
              word.className = 'wct-word';
              for (let j = 0; j < part.length; j++) {
                const c = document.createElement('span');
                c.className = 'wct-char';
                c.textContent = part.charAt(j);
                c.style.animationDelay = (BASE_DELAY + charIndex * STAGGER) + 'ms';
                word.appendChild(c);
                charIndex++;
              }
              frag.appendChild(word);
            }
          }
          parent.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          const children = Array.from(node.childNodes);
          for (let m = 0; m < children.length; m++) processNode(children[m], node);
        }
      }

      if (!reduceMotion && !heading.dataset.processed) {
        heading.dataset.processed = "true";
        const topChildren = Array.from(heading.childNodes);
        for (let p = 0; p < topChildren.length; p++) processNode(topChildren[p], heading);
        headlineEndDelay = BASE_DELAY + charIndex * STAGGER;
      }

      const sub = document.querySelector('.wct-hero-sub') as HTMLElement;
      const trust = document.querySelector('.wct-hero-trust') as HTMLElement;
      if (sub)   sub.style.animationDelay   = Math.max(reduceMotion ? 0 : (headlineEndDelay - 700), 0) + 'ms';
      if (trust) trust.style.animationDelay = Math.max(reduceMotion ? 0 : (headlineEndDelay - 200), 0) + 'ms';
    }

    // ---------- 2. Glitter / starburst layer ----------
    const glitter = document.getElementById('wct-glitter');
    if (glitter && !reduceMotion && !glitter.dataset.processed) {
      glitter.dataset.processed = "true";
      const NUM_STARS = 28;
      const STAR_PATH = 'M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z';

      for (let s = 0; s < NUM_STARS; s++) {
        const star = document.createElement('div');
        star.className = 'wct-star';

        const size      = 4 + Math.random() * 6;
        const left      = Math.random() * 100;
        const duration  = 18 + Math.random() * 18;
        const delay     = -(Math.random() * 32);
        const maxOp     = 0.3 + Math.random() * 0.4;
        const tinted    = Math.random() > 0.6;

        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = left + '%';
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = delay + 's';
        star.style.setProperty('--star-max-opacity', maxOp.toString());
        star.style.color = tinted ? '#9FE1CB' : '#ffffff';

        star.innerHTML =
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">' +
          '<path d="' + STAR_PATH + '"/></svg>';

        glitter.appendChild(star);
      }
    }

    // ---------- 3. Stat counters ----------
    const stats = document.querySelectorAll('.wct-stat-num');

    function decodeEntity(str: string) {
      const ta = document.createElement('textarea');
      ta.innerHTML = str;
      return ta.value;
    }

    function format(value: number, decimals: number) {
      return value.toFixed(decimals);
    }

    function animateCounter(el: Element) {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = decodeEntity(el.getAttribute('data-suffix') || '');
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

      if (reduceMotion) {
        el.textContent = format(target, decimals) + suffix;
        return;
      }

      const duration = 1800;
      const start = performance.now();

      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(target * eased, decimals) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!reduceMotion) {
      for (let q = 0; q < stats.length; q++) {
        const el0 = stats[q];
        if (!el0.hasAttribute('data-init')) {
            el0.setAttribute('data-init', 'true');
            const dec = parseInt(el0.getAttribute('data-decimals') || '0', 10);
            el0.textContent = format(0, dec) + decodeEntity(el0.getAttribute('data-suffix') || '');
        }
      }
    }

    if (stats.length) {
      if ('IntersectionObserver' in window && !reduceMotion) {
        const obs = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting) {
              animateCounter(e.target);
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.4 });
        for (let r = 0; r < stats.length; r++) {
            if (!stats[r].hasAttribute('data-observed')) {
                stats[r].setAttribute('data-observed', 'true');
                obs.observe(stats[r]);
            }
        }
      } else {
        for (let u = 0; u < stats.length; u++) animateCounter(stats[u]);
      }
    }

  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <div className="wct-wrap">

        <div className="wct-glitter-layer" id="wct-glitter" aria-hidden="true"></div>

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
              <div className="wct-stat-num" data-target="3.4" data-suffix="&times;" data-decimals="1">3.4&times;</div>
              <div className="wct-stat-label">Avg. lift in qualified family inquiries</div>
            </div>
            <div className="wct-stat">
              <div className="wct-stat-num" data-target="30" data-suffix=" days" data-decimals="0">30 days</div>
              <div className="wct-stat-label">Typical time to first measurable results</div>
            </div>
            <div className="wct-stat">
              <div className="wct-stat-num" data-target="100" data-suffix="%" data-decimals="0">100%</div>
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
              <iframe src="https://player.vimeo.com/video/1187758900?badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="Wavecare Testimonial 1"></iframe>
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
              <iframe src="https://player.vimeo.com/video/1187761002?badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="Wavecare Testimonial 2"></iframe>
            </div>
            <div className="wct-video-content">
              <div className="wct-stars">★★★★★</div>
              <p className="wct-pull-quote">They understood memory care from day one. I didn&apos;t have to teach them what dignity looks like in our marketing.</p>
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
            We&apos;ll show you exactly what families see when they search for your facility — free.
          </div>
          <Link href="https://api.leadconnectorhq.com/widget/bookings/wavecare-website-audit" className="wct-inline-cta-btn">Book My Audit</Link>
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
                <span className="wct-quote-mark">&quot;</span>
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
                <span className="wct-quote-mark">&quot;</span>
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
                <span className="wct-quote-mark">&quot;</span>
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
            <p>In 15 minutes we&apos;ll walk through your entire marketing presence and show you exactly what families see, where you&apos;re losing inquiries, and what we&apos;d fix first.</p>
            <div className="wct-cta-wrap">
              <Link href="https://api.leadconnectorhq.com/widget/bookings/wavecare-website-audit" className="wct-cta-btn">Get Your Free Marketing Audit</Link>
              <span className="wct-cta-note">15 minutes · No credit card · No sales pressure</span>
            </div>
          </div>
        </div>

        <div className="wct-footer">
          <p>&copy; 2026 Wavecare &nbsp;·&nbsp; <a href="mailto:joey@wavescares.com">joey@wavescares.com</a> &nbsp;·&nbsp; <a href="tel:+17329301934">+1 732 930 1934</a></p>
        </div>

        <Link href="https://api.leadconnectorhq.com/widget/bookings/wavecare-website-audit" className="wct-mobile-cta">Get My Free Audit &rarr;</Link>
      </div>
    </>
  );
}
