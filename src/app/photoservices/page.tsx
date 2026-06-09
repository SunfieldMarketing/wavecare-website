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
            <Link href="/case-studies" className="btn btn-ghost">View More Work</Link>
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
          <Link href="/contact" className="btn">Book a Photoshoot</Link>
        </div>
      </section>
    </>
  );
}


