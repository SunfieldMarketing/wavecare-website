"use client";

import './webdesign.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function WebDesign() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* HERO self-building browser */
    const wrap = document.getElementById('buildWrap');
    const badge = document.getElementById('buildBadge');
    const url = document.getElementById('urlText');
    const blks = [...document.querySelectorAll('#site .blk')];
    const ghost = document.getElementById('ghost');
    const ghostBtn = document.getElementById('ghostBtn');
    const viewport = wrap ? wrap.querySelector('.viewport') : null;

    if (wrap && !wrap.dataset.processed) {
      wrap.dataset.processed = "true";
      const ADDR = 'wavecare.io';

      if (reduce) {
        blks.forEach(b => b.classList.add('in', 'filled'));
        if (url) url.textContent = ADDR;
        if (badge) badge.textContent = 'LIVE';
      } else {
        const timers: ReturnType<typeof setTimeout>[] = [];
        const after = (ms: number, fn: () => void) => {
          const t = setTimeout(fn, ms);
          timers.push(t);
          return t;
        };

        function typeUrl(done: () => void) {
          let i = 0; url!.textContent = '';
          const t = setInterval(() => {
            url!.textContent = ADDR.slice(0, ++i);
            if (i >= ADDR.length) {
              clearInterval(t);
              done && done();
            }
          }, 80);
          timers.push(t as unknown as ReturnType<typeof setTimeout>);
        }

        function moveGhost(xPct: number, yPct: number, ms: number) {
          if (!ghost || !viewport) return;
          const r = viewport.getBoundingClientRect();
          ghost.style.transition = `transform ${ms}ms cubic-bezier(.5,0,.2,1), opacity .4s`;
          ghost.style.transform = `translate(${r.width * xPct / 100}px, ${r.height * yPct / 100}px)`;
        }

        function reset() {
          blks.forEach(b => b.classList.remove('in', 'filled'));
          wrap!.classList.remove('mobile');
          if (ghost) {
            ghost.classList.remove('show', 'click');
            ghost.style.transform = 'translate(20px,20px)';
          }
          if (badge) badge.textContent = 'BUILDING…';
        }

        function cycle() {
          reset();
          typeUrl(() => {
            const steps = [0, 1, 2, 3];
            steps.forEach((s, k) => after(200 + k * 340, () => blks.filter(b => +(b as HTMLElement).dataset.step! === s).forEach(b => b.classList.add('in'))));
            const fillAt = 200 + steps.length * 340 + 200;
            after(fillAt, () => {
              blks.forEach(b => b.classList.add('filled'));
              if (badge) badge.textContent = 'LIVE';
            });
            after(fillAt + 500, () => { ghost!.classList.add('show'); moveGhost(16, 62, 900); });
            after(fillAt + 1500, () => { ghost!.classList.add('click'); if (ghostBtn) ghostBtn.classList.add('press'); });
            after(fillAt + 1800, () => { ghost!.classList.remove('click'); if (ghostBtn) ghostBtn.classList.remove('press'); });
            after(fillAt + 2300, () => moveGhost(86, 9, 800));
            after(fillAt + 3100, () => {
              wrap!.classList.add('mobile');
              if (badge) badge.textContent = 'RESPONSIVE';
              ghost!.classList.remove('show');
            });
            after(fillAt + 4600, () => {
              wrap!.classList.remove('mobile');
              if (badge) badge.textContent = 'LIVE';
            });
            after(fillAt + 6800, cycle);
          });
        }
        after(500, cycle);
      }
    }

    /* before/after slider */
    const ba = document.getElementById('ba');
    if (ba && !ba.dataset.processed) {
      ba.dataset.processed = "true";
      const before = document.getElementById('baBefore');
      const handle = document.getElementById('baHandle');
      
      function setP(p: number) {
        p = Math.max(0, Math.min(1, p));
        before!.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
        handle!.style.left = (p * 100) + '%';
      }
      setP(0.5);

      function set(x: number) {
        const r = ba!.getBoundingClientRect();
        let p = (x - r.left) / r.width;
        setP(p);
      }

      let drag = false;
      ba.addEventListener('pointerdown', e => { drag = true; set(e.clientX); });
      window.addEventListener('pointerup', () => drag = false);
      window.addEventListener('pointermove', e => { if (drag) set(e.clientX); });
      ba.addEventListener('pointermove', e => { if (!drag) set(e.clientX); });

      if (!reduce) {
        let swept = false;
        const ioBA = new IntersectionObserver(es => es.forEach(e => {
          if (e.isIntersecting && !swept) {
            swept = true;
            let t0: number | null = null;
            const dur = 1700;
            function ease(x: number) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
            function step(now: number) {
              if (!drag) {
                if (!t0) t0 = now;
                const k = Math.min(1, (now - t0) / dur);
                let p;
                if (k < .33) { p = .5 - ease(k / .33) * .38; }
                else if (k < .66) { p = .12 + ease((k - .33) / .33) * .73; }
                else { p = .85 - ease((k - .66) / .34) * .35; }
                setP(p);
                if (k < 1) requestAnimationFrame(step);
              }
            }
            requestAnimationFrame(step);
          }
        }), { threshold: .4 });
        ioBA.observe(ba);
      }
    }

    /* process — build monitor stages */
    const tabs = document.querySelectorAll('.proc-tab');
    const steps = document.querySelectorAll('.proc-detail .step');
    const stages = document.querySelectorAll('.bstage');
    const tag = document.getElementById('procTag');

    if (tabs.length && !(tabs[0] as HTMLElement).dataset.processed) {
      const TAGS = ['AUDIT', 'WIREFRAME', 'BUILD', 'LIVE & MANAGED'];
      function go(i: number) {
        tabs.forEach(t => t.classList.toggle('on', +(t as HTMLElement).dataset.proc! === i));
        steps.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.step! === i));
        stages.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.stage! === i));
        if (tag) tag.innerHTML = TAGS[i] || TAGS[0];
      }

      let auto: ReturnType<typeof setInterval> | null = null;
      let idx = 0;
      let paused = false;

      function start() {
        if (reduce) return;
        stop();
        auto = setInterval(() => {
          if (paused) return;
          idx = (idx + 1) % 4;
          go(idx);
        }, 2300);
      }
      function stop() { if (auto) clearInterval(auto); }

      tabs.forEach(t => {
        (t as HTMLElement).dataset.processed = "true";
        const i = +(t as HTMLElement).dataset.proc!;
        t.addEventListener('mouseenter', () => { paused = true; idx = i; go(i); });
        t.addEventListener('mouseleave', () => { paused = false; });
        t.addEventListener('click', () => { paused = true; idx = i; go(i); });
        t.addEventListener('focus', () => { paused = true; idx = i; go(i); });
      });

      go(0);
      const wrap = document.querySelector('.proc-panel-wrap');
      if (wrap) {
        const ioProc = new IntersectionObserver(es => es.forEach(e => { e.isIntersecting ? start() : stop(); }), { threshold: .2 });
        ioProc.observe(wrap);
      }
    }
  }, []);

  return (
    <>
      <div className="cring"><span className="lbl"></span></div>

      <header className="whero" id="whero">
        <div className="whero-bg"></div>
        <div className="whero-grid"></div>
        <div className="whero-in">
          <div className="whero-content">
            <svg className="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
            <span className="label">Web Design &amp; Management</span>
            <h1>Websites that earn trust and drive <span className="accent">admissions.</span></h1>
            <p className="sub">Modern healthcare websites designed specifically for nursing homes, assisted living communities, rehabilitation centers, and healthcare organizations.</p>
            <div className="whero-ctas">
              <Link href="/contact" className="btn" data-cursor data-magnetic>Get a Website Audit <span className="arr">&rarr;</span></Link>
              <Link href="#showcase" className="btn btn-ghost" data-cursor data-magnetic>View Website Examples</Link>
            </div>
          </div>
          <div className="build-wrap" id="buildWrap">
            <div className="build-badge" id="buildBadge">BUILDING&hellip;</div>
            <div className="browser build">
              <div className="chrome">
                <div className="dots"><i></i><i></i><i></i></div>
                <div className="urlbar"><span id="urlText"></span><span className="cursor"></span></div>
              </div>
              <div className="viewport">
                <div className="site" id="site">
                  <div className="blk nav" data-step="0"><span className="logo-dot"></span><span className="nlinks"><i></i><i></i><i></i></span></div>
                  <div className="blk hero" data-step="1">
                    <div className="htitle"></div><div className="hsub"></div>
                    <div className="hbtn" id="ghostBtn"><span>Book a Tour</span></div>
                    <div className="hphoto"></div>
                  </div>
                  <div className="blk row" data-step="2"><span className="cardlet"></span></div>
                  <div className="blk row2" data-step="2"><span className="cardlet"></span></div>
                  <div className="blk foot" data-step="3"></div>
                </div>
                <div className="ghost" id="ghost">
                  <svg viewBox="0 0 24 24" fill="#fff" stroke="#062A24" strokeWidth="1"><path d="M5 3l15 9-6 1.5L17 20l-3 1.3-3-6.4L7 19z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="trust">
        <div className="trust-in">Trusted by healthcare providers improving their online presence, increasing inquiries, and modernizing their brand experience.</div>
      </div>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="twocol">
            <div data-reveal>
              <span className="label">Why Your Website Matters</span>
              <h2>Families decide in <span className="accent">seconds.</span></h2>
              <p className="body-lg" style={{marginTop: '20px'}}>An outdated website creates uncertainty. A professional one builds confidence before the first phone call &mdash; it should build trust immediately, communicate services clearly, showcase your team, improve search visibility, and generate more inquiries.</p>
            </div>
            <div data-reveal>
              <div className="ba" id="ba" data-cursor>
                <div className="layer after">
                  <div className="site-new">
                    <div className="b nav"></div><div className="b h"></div><div className="b c1"></div><div className="b c2"></div><div className="b foot"></div>
                  </div>
                </div>
                <div className="layer before" id="baBefore">
                  <div className="site-old">
                    <div className="b nav"></div><div className="b h"></div><div className="b t1"></div><div className="b t2"></div><div className="b t3"></div>
                    <div className="stamp">&copy; 2011 &middot; Best viewed in IE</div>
                  </div>
                </div>
                <span className="tagb">Before</span>
                <span className="taga">After</span>
                <div className="handle" id="baHandle"><div className="grip"></div></div>
              </div>
              <p className="ba-note">Drag &mdash; left is a typical dated healthcare site, right is a modern Wavecare build.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-secondary)', top: '-120px', right: '-120px'}}></div>
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Web Design &amp; Management Services</span>
            <h2>Everything your site needs, <span className="lite">handled.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Hover any service to see it in action.</p>
          </div>
          <div className="svc-grid stagger">
            <div className="svc" data-cursor>
              <div className="svc-prev"><div className="mini-chrome"><i></i><i></i><i></i></div><div className="mini-stage"><div className="el a"></div><div className="el b"></div><div className="el c"></div></div></div>
              <div className="svc-body">
                <h3>Website Design</h3>
                <p>Custom healthcare-focused design built around your brand and goals.</p>
              </div>
            </div>
            <div className="svc" data-cursor>
              <div className="svc-prev"><div className="mini-chrome"><i></i><i></i><i></i></div><div className="mini-stage"><div className="el a"></div><div className="el b"></div><div className="el c"></div></div></div>
              <div className="svc-body">
                <h3>Website Development</h3>
                <p>Fast, responsive websites optimized for desktop, tablet, and mobile.</p>
              </div>
            </div>
            <div className="svc" data-cursor>
              <div className="svc-prev"><div className="mini-chrome"><i></i><i></i><i></i></div><div className="mini-stage"><div className="el a"></div><div className="el b"></div><div className="el c"></div></div></div>
              <div className="svc-body">
                <h3>Website Management</h3>
                <p>Ongoing updates, content changes, maintenance, and support.</p>
              </div>
            </div>
            <div className="svc" data-cursor>
              <div className="svc-prev seo"><div className="mini-chrome"><i></i><i></i><i></i></div><div className="mini-stage"><div className="el bar b1"></div><div className="el bar b2"></div><div className="el bar b3"></div><div className="el bar b4"></div><div className="el bar b5"></div></div></div>
              <div className="svc-body">
                <h3>SEO Foundations</h3>
                <p>Technical setup and optimization to help improve search visibility.</p>
              </div>
            </div>
            <div className="svc" data-cursor>
              <div className="svc-prev"><div className="mini-chrome"><i></i><i></i><i></i></div><div className="mini-stage"><div className="el a"></div><div className="el b"></div><div className="el c"></div></div></div>
              <div className="svc-body">
                <h3>Content Strategy</h3>
                <p>Clear messaging that helps families quickly find what they need.</p>
              </div>
            </div>
            <div className="svc" data-cursor>
              <div className="svc-prev host"><div className="mini-chrome"><i></i><i></i><i></i></div><div className="mini-stage"><div className="el dot"></div></div></div>
              <div className="svc-body">
                <h3>Hosting &amp; Performance</h3>
                <p>Reliable hosting and monitoring to keep your site running smoothly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Your Complete Web Team</span>
            <h2>From audit to <span className="accent">always-on.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Hover a phase &mdash; watch a site go from flagged audit to a live, managed website.</p>
          </div>
          <div className="proc-tabs" data-reveal>
            <button className="proc-tab on" data-proc="0" data-cursor><span className="pnum">01</span><span className="pname">Audit</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="1" data-cursor><span className="pnum">02</span><span className="pname">Design</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="2" data-cursor><span className="pnum">03</span><span className="pname">Build</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="3" data-cursor><span className="pnum">04</span><span className="pname">Manage</span><span className="pbar"></span></button>
          </div>
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className="step on" data-step="0"><h3>Audit</h3><p>We review your current website, identify opportunities and problems, and create a strategic plan.</p></div>
                <div className="step" data-step="1"><h3>Design</h3><p>We create a modern website experience tailored to your facility and audience.</p></div>
                <div className="step" data-step="2"><h3>Build</h3><p>Our team develops and launches your website with performance and usability in mind.</p></div>
                <div className="step" data-step="3"><h3>Manage</h3><p>We provide ongoing support, updates, and improvements after launch &mdash; so it keeps performing.</p></div>
              </div>
              <div className="proc-screen">
                <div className="proc-tag" id="procTag">AUDIT</div>
                <div className="browser bmon">
                  <div className="chrome"><div className="dots"><i></i><i></i><i></i></div><div className="urlbar">yourfacility.org</div></div>
                  <div className="viewport">
                    <div className="bstage audit on" data-stage="0">
                      <div className="old"><div className="l" style={{top: '6%'}}></div><div className="l" style={{top: '26%', height: '18%'}}></div><div className="l" style={{top: '52%'}}></div><div className="l" style={{top: '64%', width: '60%'}}></div></div>
                      <div className="flag" style={{top: '10%', left: '12%'}}>!</div>
                      <div className="flag" style={{top: '30%', right: '14%'}}>!</div>
                      <div className="flag" style={{top: '58%', left: '20%'}}>!</div>
                    </div>
                    <div className="bstage wire" data-stage="1">
                      <div className="w" style={{top: '8%', height: '9%'}}></div>
                      <div className="w" style={{top: '22%', height: '28%'}}></div>
                      <div className="w" style={{top: '54%', height: '14%', right: '54%'}}></div>
                      <div className="w" style={{top: '54%', height: '14%', left: '48%'}}></div>
                      <div className="w" style={{top: '72%', height: '16%'}}></div>
                    </div>
                    <div className="bstage build" data-stage="2">
                      <div className="b nav"></div><div className="b h"></div><div className="b c1"></div><div className="b c2"></div>
                    </div>
                    <div className="bstage manage" data-stage="3">
                      <div className="up">LIVE &middot; 99.9% UPTIME</div>
                      <div className="card" style={{left: '8%', top: '20%', width: '36%', height: '32%'}}><div className="n">+38%</div><div className="t">Inquiries</div></div>
                      <div className="card" style={{right: '8%', top: '20%', width: '36%', height: '32%'}}><div className="n">1.2s</div><div className="t">Load Time</div></div>
                      <div className="card" style={{left: '8%', top: '58%', width: '36%', height: '30%'}}><div className="n">A+</div><div className="t">SEO Health</div></div>
                      <div className="card" style={{right: '8%', top: '58%', width: '36%', height: '30%'}}><div className="n">24/7</div><div className="t">Monitoring</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad" id="showcase">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Featured Website Showcase</span>
            <h2>Recent <span className="accent">healthcare</span> sites.</h2>
          </div>
          <div className="show-grid stagger">
            <div className="show" data-cursor>
              <div className="browser"><div className="chrome"><div className="dots"><i></i><i></i><i></i></div><div className="urlbar">[REPLACE &middot; project URL]</div></div>
                <div className="viewport"><div className="ph" data-label="homepage screenshot [REPLACE]"></div></div></div>
              <div className="cap"><h3>[REPLACE &mdash; Facility name]</h3><p>Website Design &amp; Build &middot; [REPLACE summary]</p></div>
            </div>
            <div className="show" data-cursor>
              <div className="browser"><div className="chrome"><div className="dots"><i></i><i></i><i></i></div><div className="urlbar">[REPLACE &middot; project URL]</div></div>
                <div className="viewport"><div className="ph" data-label="homepage screenshot [REPLACE]"></div></div></div>
              <div className="cap"><h3>[REPLACE &mdash; Facility name]</h3><p>Website Design &amp; Build &middot; [REPLACE summary]</p></div>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '50px'}} data-reveal>
            <Link href="/contact" className="btn btn-ghost" data-cursor data-magnetic>View Website Examples <span className="arr">&rarr;</span></Link>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">What Makes a Great Healthcare Website</span>
            <h2>Five things we never <span className="lite">skip.</span></h2>
          </div>
          <div className="pts stagger">
            <div className="pt">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg></div>
              <h4>Mobile First</h4>
              <p>Over 60% of families will search for your facility on their phones. We design for the smallest screens first.</p>
            </div>
            <div className="pt">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
              <h4>Fast Loading</h4>
              <p>Slow sites lose visitors before they load. Our builds are optimized to load fast on any network.</p>
            </div>
            <div className="pt">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <h4>Clear Path</h4>
              <p>Admissions, careers, or contact &mdash; we make it effortless for users to find exactly what they need.</p>
            </div>
            <div className="pt">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <h4>Trust Signals</h4>
              <p>Reviews, real photos, and clear contact info are built directly into the site's architecture.</p>
            </div>
            <div className="pt">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg></div>
              <h4>Accessible</h4>
              <p>Built with web accessibility (ADA/WCAG) best practices so every user can navigate your site.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <canvas id="waveCanvas"></canvas>
        <div className="final-in" data-reveal>
          <span className="label">Start your project</span>
          <h2>Ready for a website that <span className="accent">works?</span></h2>
          <p className="sub">Stop letting an outdated site cost you admissions. Let&rsquo;s build a digital presence that reflects the quality of your care.</p>
          <div className="final-ctas">
            <Link href="/contact" className="btn btn-light" data-cursor data-magnetic>Get a Website Audit <span className="arr">&rarr;</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
