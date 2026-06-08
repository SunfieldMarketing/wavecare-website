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
              <p className="phero-sub">Build trust with families before they ever walk through your doors. Strategic video for senior care facilities and medical practices.</p>
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

      {/* ========== STATS ========== */}
      <section className="panel sec-pad">
        <div className="container stats stats-3 stagger" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'center' }}>
          <div className="stat"><div className="n">80%</div><div className="t">of families watch a video before touring</div></div>
          <div className="stat"><div className="n">3x</div><div className="t">higher conversion on pages with video</div></div>
          <div className="stat"><div className="n">2.5x</div><div className="t">more engagement on social media</div></div>
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

      {/* ========== TYPES OF VIDEOS ========== */}
      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Types of Videos</span>
            <h2>What we <span className="lite">produce.</span></h2>
          </div>
          
          <div className="filter-bar" data-reveal>
            <button className="fchip on" data-filter="all">All Projects</button>
            <button className="fchip" data-filter="family">Family &amp; Facility</button>
            <button className="fchip" data-filter="recruit">Recruitment</button>
            <button className="fchip" data-filter="testimonial">Testimonials</button>
            <button className="fchip" data-filter="social">Social Media</button>
          </div>
          
          <div className="types-grid stagger" id="typesGrid">
            <div className="tcard" data-cat="family">
              <div className="thumb" data-label="brand film"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Hero Brand Film</h3><p>The centerpiece of your website. Tells your full story, showcases the facility, and builds deep trust.</p><div className="where">Homepage &middot; Ads</div></div>
            </div>
            <div className="tcard" data-cat="family">
              <div className="thumb" data-label="virtual tour"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Guided Virtual Tour</h3><p>Walk families through your community when they can't be there in person.</p><div className="where">Website &middot; Email follow-ups</div></div>
            </div>
            <div className="tcard" data-cat="family">
              <div className="thumb" data-label="service line video"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Service Line Spot</h3><p>Focused pieces for memory care, rehab, hospice, or key service lines.</p><div className="where">Service pages &middot; Ads</div></div>
            </div>
            <div className="tcard" data-cat="recruit">
              <div className="thumb" data-label="recruitment"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Recruitment Film</h3><p>Shows the team and culture &mdash; what the job feels like, not just what it pays.</p><div className="where">Careers page &middot; LinkedIn</div></div>
            </div>
            <div className="tcard" data-cat="recruit">
              <div className="thumb" data-label="day in the life"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Day in the Life</h3><p>Follows a caregiver through a shift to attract the right candidates.</p><div className="where">Careers page &middot; Indeed</div></div>
            </div>
            <div className="tcard" data-cat="recruit">
              <div className="thumb" data-label="staff spotlight"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Staff Spotlight</h3><p>Short profiles that put real faces to your employer brand.</p><div className="where">Social &middot; Careers page</div></div>
            </div>
            <div className="tcard" data-cat="testimonial">
              <div className="thumb" data-label="resident testimonial"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Resident &amp; Family Testimonial</h3><p>Real stories from real families &mdash; the most persuasive video you can publish.</p><div className="where">Website &middot; Sales materials</div></div>
            </div>
            <div className="tcard" data-cat="testimonial">
              <div className="thumb" data-label="staff testimonial"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Staff Testimonial</h3><p>Team members on why they stay &mdash; trust for families and recruits alike.</p><div className="where">Careers &middot; About page</div></div>
            </div>
            <div className="tcard" data-cat="testimonial">
              <div className="thumb" data-label="referral partner"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Referral Partner Story</h3><p>Physicians and discharge planners on why they refer to you.</p><div className="where">Sales deck &middot; Outreach</div></div>
            </div>
            <div className="tcard" data-cat="social">
              <div className="thumb" data-label="social vertical"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Social Vertical Cut</h3><p>9:16 edits of your hero footage, sized for Instagram, TikTok, and Reels.</p><div className="where">Instagram &middot; TikTok</div></div>
            </div>
            <div className="tcard" data-cat="social">
              <div className="thumb" data-label="event recap"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Event Recap</h3><p>Quick highlight reels from community events and open houses.</p><div className="where">Facebook &middot; Instagram</div></div>
            </div>
            <div className="tcard" data-cat="social">
              <div className="thumb" data-label="seasonal short"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Seasonal Short</h3><p>Holiday and milestone moments that keep your feed warm and active.</p><div className="where">Social feeds</div></div>
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


