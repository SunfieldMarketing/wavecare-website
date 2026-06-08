'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';

export default function PhotoServices() {
  const [ctxTab, setCtxTab] = useState(0);
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

      // Hero wall assembles on load
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

  const procLoupes = ['PROOFS', 'SHOOTING', 'DEVELOPING', 'SELECTS'];

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
              <h1>Healthcare <span className="accent">Photography</span></h1>
              <p className="phero-sub">Stock photos don't build trust. Real photography shows families exactly why they should choose your facility.</p>
              <div className="trust-list" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '34px' }}>
                <span className="label" style={{ marginBottom: 0 }}>✓ HIPAA Compliant</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Unintrusive</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Conversion-Focused</span>
              </div>
              <Link href="/contact" className="btn">Book a Photoshoot <span className="arr">&rarr;</span></Link>
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

      {/* ========== CONTEXT ========== */}
      <section className="panel deep sec-pad">
        <div className="container phero-in" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div data-reveal>
            <span className="label">Where Your Photos Are Used</span>
            <h2>One shoot. <span className="accent">Everywhere</span> it counts.</h2>
            <p className="sub" style={{ marginTop: '18px' }}>The same professional image earns its keep across every place families and referral partners find you.</p>
          </div>
          <div className="ctx" data-reveal>
            <div className="ctx-tabs">
              <div className={`ctx-tab ${ctxTab === 0 ? 'on' : ''}`} onMouseEnter={() => setCtxTab(0)} onClick={() => setCtxTab(0)}>
                <div className="ic">✓</div>
                <div>
                  <h3>Website</h3><p>Stronger first impression, instant trust.</p>
                </div>
              </div>
              <div className={`ctx-tab ${ctxTab === 1 ? 'on' : ''}`} onMouseEnter={() => setCtxTab(1)} onClick={() => setCtxTab(1)}>
                <div className="ic">✓</div>
                <div>
                  <h3>Brochures &amp; Packets</h3><p>Polished materials for tours and admissions.</p>
                </div>
              </div>
              <div className={`ctx-tab ${ctxTab === 2 ? 'on' : ''}`} onMouseEnter={() => setCtxTab(2)} onClick={() => setCtxTab(2)}>
                <div className="ic">✓</div>
                <div>
                  <h3>Google Business Profile</h3><p>Better local visibility with real imagery.</p>
                </div>
              </div>
            </div>
            
            <div className="ctx-stage" style={{ position: 'relative', height: '320px', marginTop: '40px' }}>
              <div className={`ctx-scene ${ctxTab === 0 ? 'on' : ''}`}>
                <div className="mock-web">
                  <div className="bar"><i></i><i></i><i></i></div>
                  <div className="shot">
                    <img src="/images/website.png" alt="Website" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <div className="lines"><span></span><span></span><span></span></div>
                </div>
              </div>
              <div className={`ctx-scene ${ctxTab === 1 ? 'on' : ''}`}>
                <div className="mock-bro" style={{ maxWidth: '700px', gap: '16px' }}>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden' }}>
                    <img src="/images/brochure_cover.jpg" alt="Brochure Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)' }} />
                  </div>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden' }}>
                    <img src="/images/brochure_inside.png" alt="Brochure Inside" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4)' }} />
                  </div>
                </div>
              </div>
              <div className={`ctx-scene ${ctxTab === 2 ? 'on' : ''}`}>
                <div className="mock-goo">
                  <div className="shot">
                    <img src="/images/gallery/Caregiver%20with%20elderly%20women.jpeg" alt="Google Business Profile Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="info"><div className="name">Park Gardens &middot; Senior Living</div><div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div className="meta"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From shot list to <span className="accent">final gallery.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>Hover a phase &mdash; watch the contact sheet develop from raw proofs to the final selects.</p>
          </div>
          
          <div className="proc-tabs" data-reveal>
            <div className={`proc-tab ${procTab === 0 ? 'on' : ''}`} onMouseEnter={() => setProcTab(0)} onClick={() => setProcTab(0)}>
              <span className="pnum">01</span><span className="pname">Planning</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 1 ? 'on' : ''}`} onMouseEnter={() => setProcTab(1)} onClick={() => setProcTab(1)}>
              <span className="pnum">02</span><span className="pname">Photoshoot Day</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 2 ? 'on' : ''}`} onMouseEnter={() => setProcTab(2)} onClick={() => setProcTab(2)}>
              <span className="pnum">03</span><span className="pname">Editing</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 3 ? 'on' : ''}`} onMouseEnter={() => setProcTab(3)} onClick={() => setProcTab(3)}>
              <span className="pnum">04</span><span className="pname">Delivery</span><span className="pbar"></span>
            </div>
          </div>
          
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className={`step ${procTab === 0 ? 'on' : ''}`}>
                  <h3>Planning</h3><p>We identify goals, locations, and the exact shot list &mdash; so nothing is missed and your staff knows what to expect.</p>
                </div>
                <div className={`step ${procTab === 1 ? 'on' : ''}`}>
                  <h3>Photoshoot Day</h3><p>Our team captures everything planned, efficiently and respectfully, working around residents and daily routines.</p>
                </div>
                <div className={`step ${procTab === 2 ? 'on' : ''}`}>
                  <h3>Editing</h3><p>Images are professionally edited, color-corrected, and optimized for every marketing use.</p>
                </div>
                <div className={`step ${procTab === 3 ? 'on' : ''}`}>
                  <h3>Delivery</h3><p>You receive organized, ready-to-use files for web, print, social, and advertising &mdash; named and sized correctly.</p>
                </div>
              </div>
              
              <div className={`proc-sheet dev${procTab}`}>
                <div className="loupe">{procLoupes[procTab] || procLoupes[0]}</div>
                {[
                  '/images/proc_1.png', 
                  '/images/proc_2.png', 
                  '/images/proc_3.png', 
                  '/images/proc_4.png', 
                  '/images/proc_5.png', 
                  '/images/proc_6.png'
                ].map((src, idx) => (
                  <div className="frame" key={idx}>
                    <img className="pho" src={src} alt="Process mockup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="pick"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GALLERY ========== */}
      <section className="panel deep sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">Selected Work</span>
            <h2>A closer <span className="lite">look.</span></h2>
          </div>
          <div className="mason stagger">
            <div className="m" style={{ aspectRatio: '0.75' }}><img src="/images/gallery/Caregiver%20with%20elderly%20man%20playing%20game.jpeg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '1.5' }}><img src="/images/gallery/Elders%20cooking.jpg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '1' }}><img src="/images/gallery/Employees%20laughing%20photo.jpeg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '1.3' }}><img src="/images/gallery/Two%20women%20with%20notepads%20smiling.jpg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '0.8' }}><img src="/images/gallery/Balloon%20activity%20photo.jpeg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '1.2' }}><img src="/images/gallery/Catherdral%20Health%20Center%20Front%20Photo.jpeg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '1' }}><img src="/images/gallery/Elderly%20doing%20puzzles%20photo.jpg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '1.4' }}><img src="/images/gallery/Yorktown%20landscape%20aerial%20photo%202.jpeg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="m" style={{ aspectRatio: '0.9' }}><img src="/images/gallery/Employees%20smiling.jpeg" alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }} data-reveal>
            <Link href="/case-studies" className="btn btn-ghost">View More Work <span className="arr">&rarr;</span></Link>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="final">
        <div className="final-fallback"></div>
        <div className="final-in" data-reveal>
          <span className="label">A clearer picture of your care</span>
          <h2>Give families a clearer <span className="accent">picture</span> of your care.</h2>
          <p className="sub">We capture the spaces, people, and moments that make your facility feel professional, welcoming, and trustworthy.</p>
          <Link href="/contact" className="btn">Book a Photoshoot <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}

