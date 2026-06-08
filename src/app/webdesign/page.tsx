'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';

export default function WebDesign() {
  const [procTab, setProcTab] = useState(0);

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

      function initHeroWall() {
        const cells = document.querySelectorAll('.phero-wall .cell');
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          cells.forEach(c => c.classList.add('in')); return;
        }
        const order = Array.from(cells.keys()).sort(() => Math.random() - 0.5);
        order.forEach((idx, i) => setTimeout(() => cells[idx].classList.add('in'), 250 + i * 70));
      }

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
        }
      }, 50);
    };

    runScripts();
  }, []);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="phero">
        <div className="phero-bg">
          <div className="placeholder" style={{ width: '100%', height: '100%', background: '#062A24' }}></div>
        </div>
        <div className="container">
          <div className="phero-in">
            <div data-reveal>
              <svg className="wave-accent" viewBox="0 0 74 24">
                <path d="M2,12 Q12,2 20,12 T38,12 T56,12 T72,12"></path>
              </svg>
              <h1>Websites that earn trust and drive <span className="accent">admissions.</span></h1>
              <p className="phero-sub">Your website is your digital front door. Make sure families see a facility they can trust.</p>
              <div className="trust-list" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '34px' }}>
                <span className="label" style={{ marginBottom: 0 }}>✓ Conversion Focused</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Mobile Optimized</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Fast &amp; Secure</span>
              </div>
              <Link href="/contact" className="btn">Get a Free Website Audit</Link>
            </div>
            <div className="phero-wall">
              <div className="cell c1"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div></div>
              <div className="cell c2"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div></div>
              <div className="cell c3"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div></div>
              <div className="cell c4"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="panel sec-pad">
        <div className="container stats stats-3 stagger" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'center' }}>
          <div className="stat"><div className="n">3.5x</div><div className="t">more organic traffic after a professional rebuild</div></div>
          <div className="stat"><div className="n">72%</div><div className="t">of tours start from a mobile device</div></div>
          <div className="stat"><div className="n">&lt;2s</div><div className="t">load time optimization across the board</div></div>
        </div>
      </section>

      {/* ========== EVERYTHING YOUR SITE NEEDS ========== */}
      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Capabilities</span>
            <h2>Everything your site needs, <span className="lite">handled.</span></h2>
          </div>
          
          <div className="types-grid stagger">
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="design"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Website Design</h3><p>Beautiful, modern interfaces that reflect the quality of your care.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="dev"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Website Development</h3><p>Robust, clean code built on modern frameworks for speed and reliability.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="management"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Website Management</h3><p>We keep your site secure, up-to-date, and performing smoothly.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="seo"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>SEO Foundations</h3><p>Built from the ground up to rank in local searches for senior care.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="content"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Content Strategy</h3><p>Copywriting that speaks to families' concerns and drives them to book a tour.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="hosting"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Hosting &amp; Performance</h3><p>Enterprise-grade hosting with global CDNs for lightning-fast load times.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From audit to <span className="accent">always-on.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>We don't just hand you a website and disappear. We manage the entire lifecycle.</p>
          </div>
          
          <div className="proc-tabs" data-reveal>
            <div className={`proc-tab ${procTab === 0 ? 'on' : ''}`} onMouseEnter={() => setProcTab(0)} onClick={() => setProcTab(0)}>
              <span className="pnum">01</span><span className="pname">Audit</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 1 ? 'on' : ''}`} onMouseEnter={() => setProcTab(1)} onClick={() => setProcTab(1)}>
              <span className="pnum">02</span><span className="pname">Design</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 2 ? 'on' : ''}`} onMouseEnter={() => setProcTab(2)} onClick={() => setProcTab(2)}>
              <span className="pnum">03</span><span className="pname">Build</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 3 ? 'on' : ''}`} onMouseEnter={() => setProcTab(3)} onClick={() => setProcTab(3)}>
              <span className="pnum">04</span><span className="pname">Manage</span><span className="pbar"></span>
            </div>
          </div>
          
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className={`step ${procTab === 0 ? 'on' : ''}`}>
                  <h3>Audit</h3><p>We review your current website, identify opportunities and problems, and create a strategic plan.</p>
                </div>
                <div className={`step ${procTab === 1 ? 'on' : ''}`}>
                  <h3>Design</h3><p>We create a modern website experience tailored to your facility and audience.</p>
                </div>
                <div className={`step ${procTab === 2 ? 'on' : ''}`}>
                  <h3>Build</h3><p>Our team develops and launches your website with performance and usability in mind.</p>
                </div>
                <div className={`step ${procTab === 3 ? 'on' : ''}`}>
                  <h3>Manage</h3><p>We provide ongoing support, updates, and improvements after launch &mdash; so it keeps performing.</p>
                </div>
              </div>
              
              <div className="proc-screen">
                <div className="frame" style={{ opacity: 1 }}>
                   <div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="final">
        <div className="final-fallback"></div>
        <div className="final-in" data-reveal>
          <span className="label">Are you losing tours online?</span>
          <h2>See how your website really <span className="accent">performs.</span></h2>
          <p className="sub">Let's look at your current site. We'll show you where you're losing traffic, how families perceive your brand online, and exactly how we'd fix it.</p>
          <Link href="/contact" className="btn btn-light">Get Your Free Website Audit</Link>
        </div>
      </section>
    </>
  );
}


