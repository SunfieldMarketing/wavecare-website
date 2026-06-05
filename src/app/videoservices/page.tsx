"use client";

import './videoservices.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function VideoServices() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* count-up */
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const nums = document.querySelectorAll('[data-count]');
    const run = (el: Element) => {
      const target = +(el as HTMLElement).dataset.count!;
      if (!target) return;
      const suf = (el as HTMLElement).dataset.suffix || '';
      const comma = (el as HTMLElement).dataset.comma;
      const dur = 1500;
      const t0 = performance.now();
      function step(now: number) {
        let p = Math.min(1, (now - t0) / dur);
        let v = Math.floor(ease(p) * target);
        el.textContent = (comma ? v.toLocaleString() : v) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      step(t0);
    };

    if (reduce) {
      nums.forEach(el => {
        const t = +(el as HTMLElement).dataset.count!;
        if (t) el.textContent = ((el as HTMLElement).dataset.comma ? t.toLocaleString() : t) + ((el as HTMLElement).dataset.suffix || '');
      });
    } else {
      const ioNums = new IntersectionObserver((es, o) => es.forEach(e => {
        if (e.isIntersecting && !(e.target as HTMLElement).dataset.processed) {
          (e.target as HTMLElement).dataset.processed = "true";
          run(e.target);
          o.unobserve(e.target);
        }
      }), { threshold: .25 });
      nums.forEach(n => ioNums.observe(n));
    }

    /* Process — horizontal tabs */
    const tabs = document.querySelectorAll('.proc-tab');
    const steps = document.querySelectorAll('.proc-detail .step');
    const scenes = document.querySelectorAll('.proc-screen .scene');
    if (tabs.length && !(tabs[0] as HTMLElement).dataset.processed) {
      const gradeTag = document.getElementById('gradeTag');
      const tc = document.getElementById('procTC');
      const GRADES = ['RAW · UNGRADED', 'ROUGH CUT', 'COLOR PASS', 'FINAL · GRADED'];
      let tcBase = [0, 18, 47, 92];
      let tcRAF: number | null = null;
      let cur = 0;
      let t0 = 0;

      function fmt(totSec: number) {
        const f = Math.floor((totSec * 24) % 24);
        const s = Math.floor(totSec) % 60;
        const m = Math.floor(totSec / 60) % 60;
        const h = Math.floor(totSec / 3600);
        const p = (n: number) => String(n).padStart(2, '0');
        return `${p(h)}:${p(m)}:${p(s)}:${p(f)}`;
      }

      function runTC() {
        if (reduce) { if (tc) tc.textContent = fmt(tcBase[cur]); return; }
        if (tcRAF !== null) cancelAnimationFrame(tcRAF);
        t0 = performance.now();
        function tick(now: number) {
          const el = (now - t0) / 1000;
          if (tc) tc.textContent = fmt(tcBase[cur] + el);
          tcRAF = requestAnimationFrame(tick);
        }
        tick(t0);
      }

      function goProc(i: number) {
        cur = i;
        tabs.forEach(t => t.classList.toggle('on', +(t as HTMLElement).dataset.proc! === i));
        steps.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.step! === i));
        scenes.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.scene! === i));
        if (gradeTag) gradeTag.textContent = GRADES[i] || GRADES[0];
        runTC();
      }

      tabs.forEach(t => {
        (t as HTMLElement).dataset.processed = "true";
        const i = +(t as HTMLElement).dataset.proc!;
        t.addEventListener('mouseenter', () => goProc(i));
        t.addEventListener('click', () => goProc(i));
        t.addEventListener('focus', () => goProc(i));
      });
      goProc(0);
    }

    /* Types filter */
    const chips = document.querySelectorAll('.fchip');
    const cards = document.querySelectorAll('.tcard');
    if (chips.length && !(chips[0] as HTMLElement).dataset.processed) {
      chips.forEach(c => {
        (c as HTMLElement).dataset.processed = "true";
        c.addEventListener('click', () => {
          chips.forEach(x => x.classList.remove('on'));
          c.classList.add('on');
          const f = (c as HTMLElement).dataset.filter;
          cards.forEach(card => {
            const cats = ((card as HTMLElement).dataset.cat || '').split(' ');
            if (f === 'all' || cats.includes(f!)) card.classList.remove('hidden');
            else card.classList.add('hidden');
          });
        });
      });
    }

    /* Hero */
    const hero = document.getElementById('hero');
    const vlayer = document.getElementById('heroVideo');
    const tint = document.querySelector('.hero-vtint') as HTMLElement;
    if (hero && vlayer && !hero.dataset.processed) {
      hero.dataset.processed = "true";
      function onScroll() {
        const y = window.scrollY || document.documentElement.scrollTop;
        const rv = Math.max(0, Math.min(1, y / (window.innerHeight * 0.85)));
        vlayer!.style.setProperty('--rv', rv.toFixed(3));
        if (tint) tint.style.setProperty('--rv', rv.toFixed(3));
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }, []);

  return (
    <>
      <div className="cring"><span className="cbadge"></span></div>

      <header className="hero" id="hero">
        <div className="hero-video" id="heroVideo">
          <video id="heroVid" autoPlay muted loop playsInline
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='16' height='9' fill='%230a3a32'/%3E%3C/svg%3E">
          </video>
          <div className="hero-vfallback" data-label="hero reel &middot; [REPLACE video src]"></div>
          <div className="hero-vtint"></div>
        </div>

        <div className="hero-in">
          <div className="hero-content">
            <svg className="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
            <span className="label">Video Production</span>
            <h1 className="hero-h1">
              <span className="line">Show families the <span className="accent">heart</span></span>
              <span className="line">behind your care.</span>
            </h1>
            <p className="sub">Strategic healthcare video that highlights your team, facility, services, and resident experience &mdash; built to earn trust before families ever walk through your doors.</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn" data-cursor data-magnetic>Book a Call <span className="arr">&rarr;</span></Link>
              <Link href="#reel" className="btn btn-ghost" data-cursor data-magnetic>Watch Our Reel</Link>
            </div>
          </div>
        </div>
        <div className="hero-scrollcue" aria-hidden="true"><span></span></div>
      </header>

      <div className="trust">
        <div className="trust-in">
          <span>Senior Care &amp; Skilled Nursing</span><span className="dot"></span>
          <span>Assisted Living</span><span className="dot"></span>
          <span>Rehabilitation Centers</span><span className="dot"></span>
          <span>Memory Care</span><span className="dot"></span>
          <span>Medical Practices</span>
        </div>
      </div>

      <section className="panel ink sec-pad" id="reel">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">Our Commercial</span>
            <h2>The work, in <span className="lite">motion.</span></h2>
          </div>
          <div className="reel-wrap" data-reveal>
            <div className="reel-frame" data-cursor data-cursor-play="true">
              <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
            </div>
            <p className="reel-cap">A two-minute look at what we mean by &ldquo;Built for Healthcare.&rdquo;</p>
          </div>
        </div>
      </section>

      <section className="panel light sec-pad">
        <div className="container">
          <div className="twocol">
            <div data-reveal>
              <span className="label dark">Why Video Matters</span>
              <h2>Families decide <span className="lite">before</span> they ever visit.</h2>
            </div>
            <div data-reveal>
              <p className="body-lg">Most families have already formed an opinion before they pick up the phone. Professional video lets them experience your environment, meet your team, and feel the level of care you provide &mdash; in the same seconds they&rsquo;d otherwise spend scrolling past you.</p>
              <p className="body-lg" style={{marginTop: '20px'}}>Done right, video doesn&rsquo;t just market the facility. It pre-qualifies the inquiry.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-secondary)', top: '-120px', right: '-120px'}}></div>
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">What We Produce</span>
            <h2>Four kinds of video, <span className="accent">one standard.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Every project is shot, edited, and delivered to the same standard &mdash; whether it&rsquo;s a 90-second hero film or a 15-second cut for Instagram.</p>
          </div>
          <div className="prod-grid stagger">
            <div className="prod-card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7"/></svg></div>
              <h3>Facility Films</h3>
              <p>Hero videos for homepages, virtual tours, and admissions packets &mdash; the kind families watch before booking a visit.</p>
              <Link href="#" className="sample" data-cursor>View Sample <span className="arr">&rarr;</span></Link>
            </div>
            <div className="prod-card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.2 1.8-4 4-4s2 1 2 1"/></svg></div>
              <h3>Family-Facing Stories</h3>
              <p>Welcome videos, resident testimonials, and care journeys that turn the abstract into the personal.</p>
              <Link href="#" className="sample" data-cursor>View Sample <span className="arr">&rarr;</span></Link>
            </div>
            <div className="prod-card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8M16 5l2 2 4-4"/></svg></div>
              <h3>Recruitment &amp; Culture</h3>
              <p>Films that attract caregivers and clinical staff by showing the team and culture, not the job description.</p>
              <Link href="#" className="sample" data-cursor>View Sample <span className="arr">&rarr;</span></Link>
            </div>
            <div className="prod-card">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></div>
              <h3>Social &amp; Service Cuts</h3>
              <p>Vertical edits, service-line spots, and short-form content sized for the platforms your audience actually scrolls.</p>
              <Link href="#" className="sample" data-cursor>View Sample <span className="arr">&rarr;</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From first call to <span className="accent">final cut.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Four phases, fully managed. Hover or tap a phase to see what happens inside it.</p>
          </div>
          <div className="proc-tabs" data-reveal>
            <button className="proc-tab on" data-proc="0" data-cursor>
              <span className="pnum">01</span>
              <span className="pname">Discovery &amp; Planning</span>
              <span className="pbar"></span>
            </button>
            <button className="proc-tab" data-proc="1" data-cursor>
              <span className="pnum">02</span>
              <span className="pname">Pre-Production</span>
              <span className="pbar"></span>
            </button>
            <button className="proc-tab" data-proc="2" data-cursor>
              <span className="pnum">03</span>
              <span className="pname">Production Day</span>
              <span className="pbar"></span>
            </button>
            <button className="proc-tab" data-proc="3" data-cursor>
              <span className="pnum">04</span>
              <span className="pname">Post &amp; Delivery</span>
              <span className="pbar"></span>
            </button>
          </div>
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
              <div className="step on" data-step="0">
                <h3>Discovery &amp; Planning</h3>
                <p>We start with a strategy session to understand your facility, your audience, and what success looks like &mdash; then build a project plan around it.</p>
                <div className="chips"><span className="chip">Strategy Session</span><span className="chip">Goals &amp; Messaging</span><span className="chip">Project Timeline</span></div>
              </div>
              <div className="step" data-step="1">
                <h3>Pre-Production</h3>
                <p>We handle scripts, shot lists, interview prep, and on-site logistics with your team. Your staff focuses on residents; we handle everything else.</p>
                <div className="chips"><span className="chip">Scripting &amp; Storyboarding</span><span className="chip">Interview Prep</span><span className="chip">On-Site Coordination</span></div>
              </div>
              <div className="step" data-step="2">
                <h3>Production Day</h3>
                <p>A small, calm crew captures interviews, facility footage, resident lifestyle moments, and aerial coverage &mdash; respectful of residents and routines at every step.</p>
                <div className="chips"><span className="chip">Leadership &amp; Staff Interviews</span><span className="chip">Facility &amp; Lifestyle Footage</span><span className="chip">Aerial / Drone</span></div>
              </div>
              <div className="step" data-step="3">
                <h3>Post &amp; Delivery</h3>
                <p>Editing, color, sound, motion graphics, and captioning &mdash; finished in formats sized for every place your video will live.</p>
                <div className="chips"><span className="chip">Editing &amp; Color</span><span className="chip">Motion Graphics</span><span className="chip">Multi-Platform Exports</span></div>
              </div>
              </div>
              <div className="proc-screen">
                <div className="rec"><span className="led"></span>REC</div>
                <div className="grade-tag" id="gradeTag">RAW &middot; UNGRADED</div>
              <div className="scene on" data-scene="0" data-label="discovery / planning"></div>
              <div className="scene" data-scene="1" data-label="pre-production / prep"></div>
              <div className="scene" data-scene="2" data-label="production / film day"></div>
              <div className="scene" data-scene="3" data-label="post / delivery"></div>
                <div className="scanline"></div>
                <div className="tc" id="procTC">00:00:00:00</div>
                <div className="bars"><i></i><i></i><i></i><i></i><i></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Types of Videos</span>
            <h2>Built for where it <span className="lite">lives.</span></h2>
            <p className="sub" style={{margin: '18px auto 0'}}>Every video is purpose-built for the place it will actually be seen &mdash; the website, the tour, the inbox, the feed.</p>
          </div>
          <div className="filter-bar" data-reveal>
            <button className="fchip on" data-filter="all" data-cursor data-cursor-count="15 videos">All</button>
            <button className="fchip" data-filter="facility" data-cursor data-cursor-count="3 videos">Facility Tour</button>
            <button className="fchip" data-filter="family" data-cursor data-cursor-count="3 videos">Family-Facing</button>
            <button className="fchip" data-filter="recruit" data-cursor data-cursor-count="3 videos">Recruitment</button>
            <button className="fchip" data-filter="testimonial" data-cursor data-cursor-count="3 videos">Testimonial</button>
            <button className="fchip" data-filter="social" data-cursor data-cursor-count="3 videos">Social</button>
          </div>
          <div className="types-grid stagger">
            <div className="tcard" data-cursor-play="true" data-cat="facility">
              <div className="thumb" data-label="facility overview"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Facility Overview</h3><p>The cornerstone film &mdash; spaces, team, and standard of care.</p><div className="where">Homepage hero &middot; YouTube</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="facility">
              <div className="thumb" data-label="website hero loop"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Website Hero Loop</h3><p>Short, silent loops that autoplay above the fold without distraction.</p><div className="where">Website hero &middot; Landing pages</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="facility">
              <div className="thumb" data-label="amenities walkthrough"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Amenities Walkthrough</h3><p>A guided look at dining, activities, therapy spaces, and grounds.</p><div className="where">Tours page &middot; Admissions packet</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="family">
              <div className="thumb" data-label="family welcome"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Family Welcome</h3><p>A warm introduction sent before the first tour. Calms the unknown.</p><div className="where">Email &middot; Admissions packet</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="family">
              <div className="thumb" data-label="care journey"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Care Journey</h3><p>Walks a family through what daily life and care really look like.</p><div className="where">Website &middot; Email nurture</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="family">
              <div className="thumb" data-label="service line video"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Service Line Spot</h3><p>Focused pieces for memory care, rehab, hospice, or key service lines.</p><div className="where">Service pages &middot; Ads</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="recruit">
              <div className="thumb" data-label="recruitment"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Recruitment Film</h3><p>Shows the team and culture &mdash; what the job feels like, not just what it pays.</p><div className="where">Careers page &middot; LinkedIn</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="recruit">
              <div className="thumb" data-label="day in the life"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Day in the Life</h3><p>Follows a caregiver through a shift to attract the right candidates.</p><div className="where">Careers page &middot; Indeed</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="recruit">
              <div className="thumb" data-label="staff spotlight"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Staff Spotlight</h3><p>Short profiles that put real faces to your employer brand.</p><div className="where">Social &middot; Careers page</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="testimonial">
              <div className="thumb" data-label="resident testimonial"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Resident &amp; Family Testimonial</h3><p>Real stories from real families &mdash; the most persuasive video you can publish.</p><div className="where">Website &middot; Sales materials</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="testimonial">
              <div className="thumb" data-label="staff testimonial"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Staff Testimonial</h3><p>Team members on why they stay &mdash; trust for families and recruits alike.</p><div className="where">Careers &middot; About page</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="testimonial">
              <div className="thumb" data-label="referral partner"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Referral Partner Story</h3><p>Physicians and discharge planners on why they refer to you.</p><div className="where">Sales deck &middot; Outreach</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="social">
              <div className="thumb" data-label="social vertical"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Social Vertical Cut</h3><p>9:16 edits of your hero footage, sized for Instagram, TikTok, and Reels.</p><div className="where">Instagram &middot; TikTok</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="social">
              <div className="thumb" data-label="b-roll package"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>B-Roll Package</h3><p>Uncut, graded footage to hand off to your internal social media team.</p><div className="where">Internal use &middot; PR</div></div>
            </div>
            <div className="tcard" data-cursor-play="true" data-cat="social">
              <div className="thumb" data-label="ad creative"><div className="play"><span>&#9654;</span></div></div>
              <div className="body"><h3>Paid Ad Creative</h3><p>15s and 30s variations specifically cut and hooked for paid social delivery.</p><div className="where">Meta Ads &middot; YouTube Ads</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="deliv" data-reveal>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h4>HIPAA Compliant</h4>
              <p>We manage releases, protect resident privacy, and ensure all footage meets healthcare compliance standards before it ever hits an editing bay.</p>
            </div>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
              <h4>Zero Disruption</h4>
              <p>Our crews are small, quiet, and experienced in senior care settings. We adapt to your schedules and respect resident routines above all else.</p>
            </div>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
              <h4>Ready to Use</h4>
              <p>You don&rsquo;t just get a Dropbox link. You get closed-captioned, color-graded files organized by aspect ratio and explicitly named for their intended platform.</p>
            </div>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <h4>You Own It All</h4>
              <p>No licensing fees or usage restrictions. Once the project is delivered, you own the master files to use wherever and however you want, forever.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <canvas id="waveCanvas"></canvas>
        <div className="final-in" data-reveal>
          <span className="label">The difference is clear</span>
          <h2>Show them why <span className="accent">you</span> are the right choice.</h2>
          <p className="sub">Build trust before the tour, increase the quality of your inquiries, and make your care environment felt through the screen.</p>
          <Link href="/contact" className="btn btn-light" data-cursor data-magnetic>Book a Strategy Call <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}
