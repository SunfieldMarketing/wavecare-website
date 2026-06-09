'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';

export default function VideoServices() {
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

      function initFilter() {
        const chips = document.querySelectorAll('.fchip');
        const cards = document.querySelectorAll('.tcard');
        chips.forEach(c => c.addEventListener('click', () => {
          chips.forEach(x => x.classList.remove('on'));
          c.classList.add('on');
          const f = c.getAttribute('data-filter');
          cards.forEach(card => {
            const cat = card.getAttribute('data-cat');
            card.classList.toggle('hidden', !(f === 'all' || cat === f));
          });
        }));
      }

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initFilter();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initFilter();
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
              <h1>Healthcare <span className="accent">Video Production</span></h1>
              <p className="phero-sub">Strategic healthcare video that highlights your team, facility, services, and resident experience — built to earn trust before families ever walk through your doors.</p>
              <div className="trust-list" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '34px' }}>
                <span className="label" style={{ marginBottom: 0 }}>✓ Full Production</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Scripting &amp; Creative</span>
                <span className="label" style={{ marginBottom: 0 }}>✓ Multi-Format Delivery</span>
              </div>
              <Link href="/contact" className="btn">Book a Call</Link>
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

      {/* ========== SOCIAL PROOF BANNER ========== */}
      <div className="social-proof-banner" style={{ background: '#062A24', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '24px 0', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.15em', color: 'var(--teal-bright)', textTransform: 'uppercase' }}>
          Senior Care &amp; Skilled Nursing &nbsp;&bull;&nbsp; Assisted Living &nbsp;&bull;&nbsp; Rehabilitation Centers &nbsp;&bull;&nbsp; Memory Care &nbsp;&bull;&nbsp; Medical Practices
        </p>
      </div>

      {/* ========== OUR COMMERCIAL ========== */}
      <section className="panel sec-pad" style={{ background: '#062A24' }}>
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">OUR COMMERCIAL</span>
            <h2 style={{ textWrap: 'unset' }}>The work, <span className="lite">in motion.</span></h2>
          </div>
          <div className="commercial-player stagger" style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative', aspectRatio: '16/9', background: '#000' }}>
            {/* Vimeo Placeholder - update src with actual video later */}
            <iframe src="https://player.vimeo.com/video/824804225?h=8f2b2c4889&title=0&byline=0&portrait=0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="panel sec-pad" style={{ background: '#062A24', paddingTop: '20px', paddingBottom: '80px' }}>
        <div className="container stats stagger" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="stat"><div className="num" style={{ fontSize: '38px', background: 'none', WebkitTextFillColor: '#fff', color: '#fff', marginBottom: '12px' }}>80%</div><div className="cap" style={{ fontSize: '14px', textTransform: 'none', letterSpacing: '0', color: '#fff', fontWeight: '400' }}>of families watch a video before<br/>touring</div></div>
          <div className="stat"><div className="num" style={{ fontSize: '38px', background: 'none', WebkitTextFillColor: '#fff', color: '#fff', marginBottom: '12px' }}>3x</div><div className="cap" style={{ fontSize: '14px', textTransform: 'none', letterSpacing: '0', color: '#fff', fontWeight: '400' }}>higher conversion on pages with<br/>video</div></div>
          <div className="stat"><div className="num" style={{ fontSize: '38px', background: 'none', WebkitTextFillColor: '#fff', color: '#fff', marginBottom: '12px' }}>2.5x</div><div className="cap" style={{ fontSize: '14px', textTransform: 'none', letterSpacing: '0', color: '#fff', fontWeight: '400' }}>more engagement on social<br/>media</div></div>
        </div>
      </section>

      {/* ========== WHY VIDEO MATTERS ========== */}
      <section className="panel sec-pad" style={{ background: '#EAF4F2', color: '#062A24' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="sec-head" data-reveal style={{ margin: 0 }}>
            <span className="label" style={{ color: 'var(--teal-accent)' }}>WHY VIDEO MATTERS</span>
            <h2 style={{ color: '#062A24', textWrap: 'unset' }}>Families decide<br/><em>before</em> they ever<br/>visit.</h2>
          </div>
          <div className="why-text stagger" style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '20px' }}>Most families have already formed an opinion before they pick up the phone. Professional video lets them experience your environment, meet your team, and feel the level of care you provide — in the same seconds they'd otherwise spend scrolling past you.</p>
            <p>Done right, video doesn't just market the facility. It pre-qualifies the inquiry.</p>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Production Process</span>
            <h2>We manage the <span className="accent">entire production.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>From the first script to the final delivery, we handle every detail so your team can stay focused on care.</p>
          </div>
          
          <div className="proc-tabs" data-reveal>
            <div className={`proc-tab ${procTab === 0 ? 'on' : ''}`} onMouseEnter={() => setProcTab(0)} onClick={() => setProcTab(0)}>
              <span className="pnum">01</span><span className="pname">Strategy &amp; Scripting</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 1 ? 'on' : ''}`} onMouseEnter={() => setProcTab(1)} onClick={() => setProcTab(1)}>
              <span className="pnum">02</span><span className="pname">Pre-Production</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 2 ? 'on' : ''}`} onMouseEnter={() => setProcTab(2)} onClick={() => setProcTab(2)}>
              <span className="pnum">03</span><span className="pname">Production Day</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 3 ? 'on' : ''}`} onMouseEnter={() => setProcTab(3)} onClick={() => setProcTab(3)}>
              <span className="pnum">04</span><span className="pname">Post &amp; Delivery</span><span className="pbar"></span>
            </div>
          </div>
          
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className={`step ${procTab === 0 ? 'on' : ''}`}>
                  <h3>Strategy &amp; Scripting</h3><p>We align on goals, identify key messaging, and develop scripts and storyboards that speak directly to families.</p>
                </div>
                <div className={`step ${procTab === 1 ? 'on' : ''}`}>
                  <h3>Pre-Production</h3><p>Location scouting, scheduling, talent coordination, and detailed call sheets. Everything is planned.</p>
                </div>
                <div className={`step ${procTab === 2 ? 'on' : ''}`}>
                  <h3>Production Day</h3><p>Our experienced crew arrives ready. We direct the talent, manage the schedule, and capture cinematic footage.</p>
                </div>
                <div className={`step ${procTab === 3 ? 'on' : ''}`}>
                  <h3>Post &amp; Delivery</h3><p>Editing, color grading, sound design, and delivery of final assets formatted for every platform.</p>
                </div>
              </div>
              
              <div className={`proc-screen dev${procTab + 1}`}>
                <div className="frame"><img src="/images/vid_proc_1.png" alt="Strategy and Scripting" /><div className="ui"><div className="rec"><div className="led"></div>REC</div></div></div>
                <div className="frame"><img src="/images/vid_proc_2.png" alt="Pre-Production" /><div className="ui"><div className="rec"><div className="led"></div>REC</div></div></div>
                <div className="frame"><img src="/images/vid_proc_3.png" alt="Production Day" /><div className="ui"><div className="rec"><div className="led"></div>REC</div></div></div>
                <div className="frame"><img src="/images/vid_proc_4.png" alt="Post and Delivery" /><div className="ui"><div className="rec"><div className="led"></div>REC</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE PRODUCE (4 KINDS) ========== */}
      <section className="panel deep sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">WHAT WE PRODUCE</span>
            <h2>Four kinds of video, <span className="lite">one standard.</span></h2>
            <p className="sub" style={{ margin: '20px auto 0', maxWidth: '600px' }}>Every project is shot, edited, and delivered to the same standard &mdash; whether it's a 90-second hero film or a 15-second cut for Instagram.</p>
          </div>
          
          <div className="four-kinds-grid stagger" style={{ marginTop: '60px' }}>
            {/* Card 1 */}
            <div className="fk-card">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '16px' }}>Facility Films</h3>
              <p style={{ color: 'var(--on-dark)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>Hero videos for homepages, virtual tours, and admissions packets &mdash; the front families watch before booking a visit.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>View Sample &rarr;</Link>
            </div>

            {/* Card 2 */}
            <div className="fk-card">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '16px' }}>Family-Facing Stories</h3>
              <p style={{ color: 'var(--on-dark)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>Resident videos, resident testimonials, and care journeys that turn the abstract into the personal.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>View Sample &rarr;</Link>
            </div>

            {/* Card 3 */}
            <div className="fk-card">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '16px' }}>Recruitment &amp; Culture</h3>
              <p style={{ color: 'var(--on-dark)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>Films that attract caregivers and clinical staff by showing the team and culture, not the job description.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>View Sample &rarr;</Link>
            </div>

            {/* Card 4 */}
            <div className="fk-card">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
              </div>
              <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '16px' }}>Social &amp; Service Cuts</h3>
              <p style={{ color: 'var(--on-dark)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>Vertical cuts, service-line spots, and short-form content sized for the platforms your audience actually scrolls.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>View Sample &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED WORK ========== */}
      <section className="panel deep sec-pad" style={{ paddingTop: 0 }}>
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Featured Work</span>
            <h2>Recent <span className="accent">healthcare</span> films.</h2>
          </div>
          <div className="fw-grid stagger">
            <Link href="/case-studies" className="fw-card hero">
              <div className="ph-bg" data-label="Commercial"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div><div className="play"><span>&#9654;</span></div></div>
              <div className="fw-meta"><span className="tag">Commercial</span><span className="title">Senior Living Campaign</span></div>
            </Link>
            <div className="fw-side">
              <Link href="/case-studies" className="fw-card small">
                <div className="ph-bg" data-label="Virtual tour"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div><div className="play"><span>&#9654;</span></div></div>
                <div className="fw-meta"><span className="tag">Virtual Tour</span><span className="title">Park Gardens Tour</span></div>
              </Link>
              <Link href="/case-studies" className="fw-card small">
                <div className="ph-bg" data-label="Testimonial"><div className="placeholder" style={{ width: '100%', height: '100%', background: '#0a3a32' }}></div><div className="play"><span>&#9654;</span></div></div>
                <div className="fw-meta"><span className="tag">Testimonial</span><span className="title">The Smith Family Story</span></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DELIVERABLES ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">What You'll Receive</span>
            <h2>Finished, formatted, <span className="lite">ready to use.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>Every project ships with the cuts and formats you actually need &mdash; nothing left for you to figure out in post.</p>
          </div>
          <div className="deliv stagger">
            <div className="deliv-item"><div className="ic">&#9646;</div><h4>Master 16:9 Cuts</h4><p>Web, YouTube, presentations.</p></div>
            <div className="deliv-item"><div className="ic">&#9647;</div><h4>Vertical Social Cuts</h4><p>9:16 for Reels, TikTok, Stories.</p></div>
            <div className="deliv-item"><div className="ic">cc</div><h4>Captioned Versions</h4><p>Burned-in and SRT for accessibility.</p></div>
            <div className="deliv-item"><div className="ic">&#8635;</div><h4>Raw Footage Archive</h4><p>Organized and delivered for future use.</p></div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="final">
        <div className="final-fallback"></div>
        <div className="final-in" data-reveal>
          <span className="label">Your facility, seen the right way</span>
          <h2>Let families see the <span className="accent">care</span> behind your facility.</h2>
          <p className="sub">From planning and scripting to filming and final delivery, we manage the entire production process to create polished videos that build trust and support admissions growth.</p>
          <Link href="/contact" className="btn btn-light">Book a Call</Link>
        </div>
      </section>
    </>
  );
}


