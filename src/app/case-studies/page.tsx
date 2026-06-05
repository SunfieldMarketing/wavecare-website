'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import './case-studies.css';

export default function CaseStudies() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;

      function initReveals() {
        const els = document.querySelectorAll('[data-reveal], .stagger');
        if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
        const io = new IntersectionObserver(es => {
          es.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        els.forEach(e => io.observe(e));
        setTimeout(() => {
          els.forEach(e => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); });
        }, 400);
      }

      // Check and execute
      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
          // @ts-ignore
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        } else if (retryCount > 100) {
          clearInterval(checkScripts); // Give up after ~5 seconds
          initReveals();
        }
      }, 50);
    };

    runScripts();
  }, []);

  return (
    <>
      <section className="sec-pad panel ink" style={{ paddingTop: '180px' }}>
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">Our Work</span>
            <h2>Real results for real healthcare brands.</h2>
            <p className="sub" style={{ margin: '20px auto 0' }}>
              We don't just make things look pretty. We build marketing engines that drive tours, patient inquiries, and trust.
            </p>
          </div>

          <div className="cs-grid stagger">
            <Link href="/case-studies/oakwood" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>OAKWOOD HERO IMAGE</span></div>
                <div className="cs-tag">
                  <span>Web Design</span>
                  <span>Video</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">Oakwood Senior Living</span>
                <h3>How a modern website and facility tour video increased bookings by 42%</h3>
                <p className="cs-desc">Oakwood was losing out to newer competitors despite offering better care. We completely overhauled their digital presence.</p>
                <div className="cs-result">
                  <span className="num">42%</span>
                  <span className="lbl">Increase in qualified tours</span>
                </div>
                <div className="cs-go">
                  Read Case Study <span className="arr">&rarr;</span>
                </div>
              </div>
            </Link>

            <Link href="/case-studies/pinnacle" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>THE PINNACLE HERO</span></div>
                <div className="cs-tag">
                  <span>Photography</span>
                  <span>Print</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">The Pinnacle</span>
                <h3>Elevating a luxury memory care brand through premium visuals</h3>
                <p className="cs-desc">We replaced outdated stock imagery with authentic, sensitive photography that captures the true quality of their care.</p>
                <div className="cs-result">
                  <span className="num">3X</span>
                  <span className="lbl">Higher engagement on ads</span>
                </div>
                <div className="cs-go">
                  Read Case Study <span className="arr">&rarr;</span>
                </div>
              </div>
            </Link>
            
            <Link href="/case-studies/harmony" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>HARMONY CARE HERO</span></div>
                <div className="cs-tag">
                  <span>Full Service</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">Harmony Care</span>
                <h3>A ground-up rebrand for a growing regional provider</h3>
                <p className="cs-desc">From the logo and messaging to the website and print collateral, we built a cohesive brand system ready to scale.</p>
                <div className="cs-result">
                  <span className="num">15</span>
                  <span className="lbl">Facilities launched</span>
                </div>
                <div className="cs-go">
                  Read Case Study <span className="arr">&rarr;</span>
                </div>
              </div>
            </Link>

            <Link href="/case-studies/mercy" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>MERCY HEALTH HERO</span></div>
                <div className="cs-tag">
                  <span>Web Design</span>
                  <span>SEO</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">Mercy Health Partners</span>
                <h3>Dominating local search with a conversion-first medical site</h3>
                <p className="cs-desc">We structured their multi-location practice website to rank locally, resulting in a massive influx of organic patient leads.</p>
                <div className="cs-result">
                  <span className="num">+210%</span>
                  <span className="lbl">Organic search traffic</span>
                </div>
                <div className="cs-go">
                  Read Case Study <span className="arr">&rarr;</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec-pad panel deep">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <h2>By the numbers</h2>
            <p className="sub" style={{ margin: '20px auto 0' }}>The impact we've had on our clients across the country.</p>
          </div>
          <div className="stats stagger">
            <div className="stat">
              <div className="n">50+</div>
              <div className="t">Facilities Served</div>
            </div>
            <div className="stat">
              <div className="n">1M+</div>
              <div className="t">Video Views</div>
            </div>
            <div className="stat">
              <div className="n">100%</div>
              <div className="t">HIPAA Compliant</div>
            </div>
            <div className="stat">
              <div className="n">35%</div>
              <div className="t">Avg. Lead Increase</div>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <div className="final-in" data-reveal>
          <h2>Ready for your own success story?</h2>
          <p className="sub">Let's build a brand that books tours and earns trust.</p>
          <Link href="/contact" className="btn">Book a Discovery Call <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}
