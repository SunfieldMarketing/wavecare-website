'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';

export default function DesignPrint() {
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
              <h1>Healthcare <span className="accent">Design &amp; Print</span></h1>
              <p className="phero-sub">Professional design and print for senior care facilities and medical practices. Brochures, admissions packets, signage, and branded materials that build trust at every touchpoint.</p>
              <div className="trust-list" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '34px' }}>
                <span className="label" style={{ marginBottom: 0 }}>✓ Admissions Materials</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Facility Signage</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Video Brochures</span>
              </div>
              <Link href="/contact" className="btn">Start a Design Project <span className="arr">&rarr;</span></Link>
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
          <div className="stat"><div className="n">60%</div><div className="t">of families judge care quality by marketing materials</div></div>
          <div className="stat"><div className="n">2x</div><div className="t">higher conversion with professional admissions packets</div></div>
          <div className="stat"><div className="n">100%</div><div className="t">tailored to senior care and medical practices</div></div>
        </div>
      </section>

      {/* ========== TYPES OF DESIGN ========== */}
      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">What We Design</span>
            <h2>Materials that <span className="lite">convert.</span></h2>
          </div>
          
          <div className="types-grid stagger" id="typesGrid">
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="brochures"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Brochures &amp; Marketing</h3><p>Trifolds, bifold brochures, and rack cards designed to leave a lasting impression after a tour.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="admissions"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Admissions &amp; Welcome Packets</h3><p>Professional pocket folders and inserts that make the move-in process feel organized and premium.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="signage"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Signage &amp; Facility Graphics</h3><p>Wayfinding, monument signs, and interior graphics that elevate your physical space.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="presentation"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Presentation &amp; Sales</h3><p>Pitch decks and one-pagers for referral partners, discharge planners, and physicians.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="event"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>Event &amp; Community</h3><p>Flyers, mailers, and event invitations designed to pack your open houses and community events.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb" data-label="video brochure"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div></div>
              <div className="body"><h3>The Video Brochure</h3><p>A physical, printed brochure that opens to play a high-definition video. The ultimate follow-up tool.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From concept to <span className="accent">print.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>We don't just design &mdash; we handle the printing, formatting, and delivery so you get finished materials right to your door.</p>
          </div>
          
          <div className="proc-tabs" data-reveal>
            <div className={`proc-tab ${procTab === 0 ? 'on' : ''}`} onMouseEnter={() => setProcTab(0)} onClick={() => setProcTab(0)}>
              <span className="pnum">01</span><span className="pname">Discovery</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 1 ? 'on' : ''}`} onMouseEnter={() => setProcTab(1)} onClick={() => setProcTab(1)}>
              <span className="pnum">02</span><span className="pname">Design</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 2 ? 'on' : ''}`} onMouseEnter={() => setProcTab(2)} onClick={() => setProcTab(2)}>
              <span className="pnum">03</span><span className="pname">Refine</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 3 ? 'on' : ''}`} onMouseEnter={() => setProcTab(3)} onClick={() => setProcTab(3)}>
              <span className="pnum">04</span><span className="pname">Print &amp; Deliver</span><span className="pbar"></span>
            </div>
          </div>
          
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className={`step ${procTab === 0 ? 'on' : ''}`}>
                  <h3>Discovery</h3><p>We review your goals, audience, and existing materials &mdash; and define exactly what each piece needs to do.</p>
                </div>
                <div className={`step ${procTab === 1 ? 'on' : ''}`}>
                  <h3>Design</h3><p>We create concepts aligned with your brand and messaging, turning the brief into real layouts.</p>
                </div>
                <div className={`step ${procTab === 2 ? 'on' : ''}`}>
                  <h3>Refine</h3><p>We collaborate on revisions and finalize the design &mdash; every edit marked and resolved.</p>
                </div>
                <div className={`step ${procTab === 3 ? 'on' : ''}`}>
                  <h3>Print &amp; Deliver</h3><p>We prepare production-ready files or coordinate printing and delivery &mdash; press marks, bleeds, and CMYK all handled.</p>
                </div>
              </div>
              
              <div className={`proc-sheet dev${procTab}`}>
                <div className="loupe">DESIGN</div>
                {[1, 2, 3, 4, 'final', 6].map((label, idx) => (
                  <div className="frame" key={idx}>
                    <div className="pho" style={{ width: '100%', height: '100%', background: '#0d4a40' }}></div>
                    <div className="pick"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="final">
        <div className="final-fallback"></div>
        <div className="final-in" data-reveal>
          <span className="label">Print that speaks for you</span>
          <h2>Leave families with a <span className="accent">lasting</span> impression.</h2>
          <p className="sub">When a family finishes a tour, the materials they take home represent your facility. Make sure they say the right thing.</p>
          <Link href="/contact" className="btn btn-light">Start a Design Project <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}

