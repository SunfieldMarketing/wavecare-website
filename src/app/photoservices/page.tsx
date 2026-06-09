'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

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
        const cells = document.querySelectorAll('.phero-grid-full .cell');
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          cells.forEach(c => c.classList.add('in')); return;
        }
        const order = Array.from(cells.keys()).sort(() => Math.random() - 0.5);
        order.forEach((idx, i) => setTimeout(() => cells[idx].classList.add('in'), 250 + i * 20));
      }

      function initCamCursor() {
        const cursor = document.getElementById('camCursor');
        // @ts-ignore
        if (!cursor || !window.gsap || ('ontouchstart' in window)) return;
        
        // @ts-ignore
        const gsap = window.gsap;
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        
        const moveCursor = (e: MouseEvent) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
        };
        const showCursor = () => cursor.classList.add('active');
        const hideCursor = () => cursor.classList.remove('active');

        document.querySelectorAll('.mason .m').forEach(el => {
          el.addEventListener('mouseenter', showCursor);
          el.addEventListener('mouseleave', hideCursor);
          el.addEventListener('mousemove', moveCursor as EventListener);
        });
      }

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initCamCursor();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initCamCursor();
        }
      }, 50);
    };

    runScripts();
  }, []);

  const procLoupes = ['PROOFS', 'SHOOTING', 'DEVELOPING', 'SELECTS'];

  return (
    <>
      <div className="cam-cursor" id="camCursor">
        <div className="cam-box">
          <div className="bracket tl"></div>
          <div className="bracket tr"></div>
          <div className="bracket bl"></div>
          <div className="bracket br"></div>
        </div>
        <div className="cam-fstop">F/1.8</div>
      </div>

      {/* ========== HERO ========== */}
      <section className="phero">
        <div className="phero-bg">
          <div className="phero-grid-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="cell">IMG {i + 1}</div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="phero-center" data-reveal>
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '40px' }}>
              Trusted by healthcare facilities improving their online presence, admissions marketing, and brand perception.
            </p>
            <svg className="wave-accent" viewBox="0 0 74 24" style={{ marginBottom: '24px' }}>
              <path d="M2,12 Q12,2 20,12 T38,12 T56,12 T72,12"></path>
            </svg>
            <h1>Professional photography that <span className="accent">builds trust.</span></h1>
            <p className="phero-sub">Showcase your facility, staff, residents, and care environment with authentic imagery &mdash; built for websites, social media, admissions materials, and marketing campaigns.</p>
            <div className="btn-group">
              <Link href="/contact" className="btn">Book a Photoshoot</Link>
              <Link href="#gallery" className="btn btn-light">View Photo Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY PROFESSIONAL PHOTOGRAPHY MATTERS ========== */}
      <section className="panel deep sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
            <span className="label">WHY PROFESSIONAL PHOTOGRAPHY MATTERS</span>
            <h2>Families form their first <br/><span className="accent">impression online.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>Outdated, inconsistent, or stock photography can make even the best facility feel untrustworthy. Drag to see the difference real photography makes.</p>
          </div>
          
          <div data-reveal>
            <BeforeAfterSlider 
              beforeImage="/images/gallery/Caregiver%20with%20elderly%20women%202.jpeg" 
              afterImage="/images/gallery/Employees%20laughing%20photo.jpeg"
            />
            <p className="ba-caption">Drag the handle &mdash; left is typical stock // right is professional photography</p>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE PHOTOGRAPH ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal style={{ textAlign: 'center' }}>
            <span className="label">WHAT WE PHOTOGRAPH</span>
            <h2>Everything that tells your <span className="accent">story.</span></h2>
          </div>
          
          <div className="shoot-grid" data-reveal>
            <div className="shoot-card">
              <h3>Facility Photography</h3>
              <p>Common areas, resident rooms, amenities, dining spaces, and exterior views &mdash; the spaces families judge first.</p>
            </div>
            <div className="shoot-card">
              <h3>Staff &amp; Team Photography</h3>
              <p>Professional portraits and candid team moments that put real faces to your culture and care.</p>
            </div>
            <div className="shoot-card">
              <h3>Resident Lifestyle</h3>
              <p>Authentic moments of daily life, activities, and community &mdash; the proof that people are happy here.</p>
            </div>
            <div className="shoot-card">
              <h3>Marketing Content</h3>
              <p>Images shaped for websites, social, brochures, ads, and recruitment &mdash; shot with the end user in mind.</p>
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
            
            <div className="ctx-stage" style={{ position: 'relative', height: '440px', marginTop: '40px' }}>
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
                <div className="mock-bro" style={{ maxWidth: '800px', width: '100%', gap: '20px' }}>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden', aspectRatio: '4/5' }}>
                    <img src="/images/brochure_inside.png" alt="Brochure Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden', aspectRatio: '4/5' }}>
                    <img src="/images/brochure_cover.jpg" alt="Brochure Inside" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      <section className="panel deep sec-pad" id="gallery">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">THE WORK</span>
            <h2>Real facilities, <span className="accent">real moments.</span></h2>
            <p className="sub" style={{ marginTop: '16px', maxWidth: '600px', margin: '16px auto 0' }}>
              Filter by what you need to see. Every image is shot on location &mdash; no stock, ever.
            </p>
          </div>
          <div className="filter-bar" data-reveal>
            <button className="fchip on">ALL</button>
            <button className="fchip">FACILITY</button>
            <button className="fchip">STAFF &amp; TEAM</button>
            <button className="fchip">RESIDENT LIFESTYLE</button>
            <button className="fchip">MARKETING</button>
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
            <Link href="/case-studies" className="btn btn-ghost">View More Work</Link>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="final" style={{ position: 'relative', overflow: 'hidden' }}>
        <svg className="cta-waves" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'auto', zIndex: 0, opacity: 0.1 }}>
          <path fill="var(--teal-bright)" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,160C672,181,768,203,864,213.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="final-fallback"></div>
        <div className="final-in" data-reveal style={{ position: 'relative', zIndex: 1 }}>
          <span className="label">A clearer picture of your care</span>
          <h2>Give families a clearer <span className="accent">picture</span> of your care.</h2>
          <p className="sub">We capture the spaces, people, and moments that make your facility feel professional, welcoming, and trustworthy.</p>
          <Link href="/contact" className="btn">Book a Photoshoot</Link>
        </div>
      </section>
    </>
  );
}


