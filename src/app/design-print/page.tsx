"use client";

import './design-print.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DesignPrint() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* hero desk — viewport-tracked parallax + nearest-piece lift (no jitter) */
    const hero = document.getElementById('dhero');
    const desk = document.getElementById('desk');
    const stage = document.getElementById('deskStage');
    if (hero && desk && stage && !reduce && !hero.dataset.processed) {
      hero.dataset.processed = "true";
      const pieces = [...stage.querySelectorAll('.piece')];

      let tx = 0, ty = 0, cx = 0, cy = 0;
      let mouseX: number | null = null;
      let mouseY: number | null = null;

      hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - .5) * 2;
        ty = ((e.clientY - r.top) / r.height - .5) * 2;
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      hero.addEventListener('mouseleave', () => {
        tx = 0; ty = 0; mouseX = null; mouseY = null;
        clearLift();
      });

      function clearLift() {
        pieces.forEach(p => p.classList.remove('up'));
        desk!.classList.remove('has-hover');
      }

      function updateLift() {
        if (mouseX == null) { return; }
        let best: Element | null = null, bestD = Infinity;
        pieces.forEach(p => {
          const r = p.getBoundingClientRect();
          const ccx = r.left + r.width / 2, ccy = r.top + r.height / 2;
          const d = Math.hypot(mouseX! - ccx, mouseY! - ccy);
          const inside = mouseX! >= r.left - 10 && mouseX! <= r.right + 10 && mouseY! >= r.top - 10 && mouseY! <= r.bottom + 10;
          if (inside && d < bestD) { bestD = d; best = p; }
        });
        pieces.forEach(p => p.classList.toggle('up', p === best));
        desk!.classList.toggle('has-hover', !!best);
      }

      function loop() {
        cx += (tx - cx) * .12; cy += (ty - cy) * .12;
        stage!.style.transform = `rotateX(${46 - cy * 14}deg) rotateZ(${-20 + cx * 16}deg)`;
        pieces.forEach(p => {
          const d = parseFloat((p as HTMLElement).dataset.depth || '.5');
          (p as HTMLElement).style.transform = `translate3d(${cx * 70 * d}px, ${cy * 70 * d}px, 0)`;
        });
        updateLift();
        requestAnimationFrame(loop);
      }
      loop();
    }

    /* service cards: click to expand examples */
    document.querySelectorAll('.svc').forEach(card => {
      if (!(card as HTMLElement).dataset.processed) {
        (card as HTMLElement).dataset.processed = "true";
        const toggle = card.querySelector('.svc-toggle');
        const see = card.querySelector('.svc-see');
        const flip = (e: Event) => {
          if (e) e.stopPropagation();
          card.classList.toggle('expanded');
        };
        if (toggle) toggle.addEventListener('click', flip);
        if (see) see.addEventListener('click', flip);
      }
    });

    /* before/after slider (drag or hover-scrub) */
    const ba = document.getElementById('ba');
    if (ba && !ba.dataset.processed) {
      ba.dataset.processed = "true";
      const before = document.getElementById('baBefore');
      const handle = document.getElementById('baHandle');
      function set(x: number) {
        const r = ba!.getBoundingClientRect();
        let p = (x - r.left) / r.width;
        p = Math.max(0, Math.min(1, p));
        before!.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
        handle!.style.left = (p * 100) + '%';
      }
      let drag = false;
      ba.addEventListener('pointerdown', e => { drag = true; set(e.clientX); });
      window.addEventListener('pointerup', () => drag = false);
      window.addEventListener('pointermove', e => { if (drag) set(e.clientX); });
      ba.addEventListener('pointermove', e => { if (!drag) set(e.clientX); });
      requestAnimationFrame(() => set(ba.getBoundingClientRect().left + ba.getBoundingClientRect().width * 0.5));
    }

    /* process — press-proof stages */
    const tabs = document.querySelectorAll('.proc-tab');
    const steps = document.querySelectorAll('.proc-detail .step');
    const stages = document.querySelectorAll('.proof-stage');
    const tag = document.getElementById('proofTag');
    if (tabs.length && !(tabs[0] as HTMLElement).dataset.processed) {
      const TAGS = ['WIREFRAME', 'FLAT COMP', 'REVISION', 'PRESS-READY'];
      function go(i: number) {
        tabs.forEach(t => t.classList.toggle('on', +(t as HTMLElement).dataset.proc! === i));
        steps.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.step! === i));
        stages.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.stage! === i));
        if (tag) tag.textContent = TAGS[i] || TAGS[0];
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
        }, 2200);
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

      <header className="dhero" id="dhero">
        <div className="dhero-bg"></div>
        <div className="dhero-in">
          <div className="dhero-content">
            <svg className="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
            <span className="label">Design &amp; Print</span>
            <h1>Materials that <span className="accent">represent</span> your facility.</h1>
            <p className="sub">From brochures and admissions packets to signage and promotional materials, we create design assets that help healthcare organizations look polished, organized, and trustworthy.</p>
            <div className="dhero-ctas">
              <Link href="/contact" className="btn" data-cursor data-magnetic>Start a Design Project <span className="arr">&rarr;</span></Link>
              <Link href="#work" className="btn btn-ghost" data-cursor data-magnetic>View Our Work</Link>
            </div>
          </div>
          <div className="desk" id="desk">
            <div className="desk-shadow"></div>
            <div className="desk-stage" id="deskStage">
              <div className="piece folder" data-depth="0.3" data-cursor><div className="inner"><div className="paper" data-label="folder [REPLACE]"></div></div></div>
              <div className="piece brochure" data-depth="0.55" data-cursor><div className="inner"><div className="paper" data-label="brochure [REPLACE]"></div></div></div>
              <div className="piece postcard" data-depth="0.7" data-cursor><div className="inner"><div className="paper" data-label="postcard [REPLACE]"></div></div></div>
              <div className="piece signage" data-depth="0.45" data-cursor><div className="inner"><div className="paper dark" data-label="signage [REPLACE]"></div></div></div>
              <div className="piece card" data-depth="1" data-cursor><div className="inner"><div className="paper" data-label="card [REPLACE]"></div></div></div>
            </div>
          </div>
        </div>
      </header>

      <div className="trust">
        <div className="trust-in">
          <span>Healthcare-Focused Design</span><span className="dot"></span>
          <span>Print-Ready Files</span><span className="dot"></span>
          <span>Custom Branding</span><span className="dot"></span>
          <span>Premium Materials</span>
        </div>
      </div>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="twocol">
            <div data-reveal>
              <span className="label">Why Design &amp; Print Matters</span>
              <h2>First impressions are <span className="accent">physical.</span></h2>
              <p className="body-lg" style={{marginTop: '20px'}}>Families often form opinions about your facility before they ever speak with your team. Professional design creates confidence, improves communication, and makes sure every touchpoint reflects the quality of care you provide.</p>
            </div>
            <div data-reveal>
              <div className="ba" id="ba" data-cursor>
                <div className="layer after"><div className="paper" data-label="After &middot; Wavecare design [REPLACE]"></div></div>
                <div className="layer before" id="baBefore"><div className="paper" data-label="Before &middot; DIY / outdated [REPLACE]"></div></div>
                <span className="tagb">Before</span>
                <span className="taga">After</span>
                <div className="handle" id="baHandle"><div className="grip"></div></div>
              </div>
              <p className="ba-note">Drag &mdash; left is a typical DIY flyer, right is a professionally designed piece.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-secondary)', top: '-120px', right: '-120px'}}></div>
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Design &amp; Print Services</span>
            <h2>Everything your facility hands <span className="lite">over.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Hover any service to open it up.</p>
          </div>
          <div className="svc-grid stagger">
            <div className="svc" data-cursor data-cursor-open="true">
              <button className="svc-toggle" aria-label="Expand Brochures &amp; Marketing"></button>
              <div className="svc-obj"><div className="flapL"><div className="paper" data-label=""></div></div><div className="flapR"><div className="paper" data-label=""></div></div><div className="face" style={{zIndex: -1}}><div className="paper dark" data-label=""></div></div></div>
              <div className="svc-inner">
                <span className="svc-num">01</span>
                <h3>Brochures &amp; Marketing</h3>
                <p>Professionally designed brochures, flyers, postcards, and promotional pieces.</p>
                <div className="svc-more">
                  <div className="svc-thumbs">
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                  </div>
                </div>
                <span className="svc-see">See examples <span className="arr">&rarr;</span></span>
              </div>
            </div>
            <div className="svc" data-cursor data-cursor-open="true">
              <button className="svc-toggle" aria-label="Expand Admissions &amp; Welcome Packets"></button>
              <div className="svc-obj"><div className="face" style={{zIndex: 0}}><div className="paper" data-label=""></div></div><div className="lid"><div className="paper dark" data-label=""></div></div></div>
              <div className="svc-inner">
                <span className="svc-num">02</span>
                <h3>Admissions &amp; Welcome Packets</h3>
                <p>Organized materials that help families navigate the admissions process.</p>
                <div className="svc-more">
                  <div className="svc-thumbs">
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                  </div>
                </div>
                <span className="svc-see">See examples <span className="arr">&rarr;</span></span>
              </div>
            </div>
            <div className="svc" data-cursor data-cursor-open="true">
              <button className="svc-toggle" aria-label="Expand Signage &amp; Facility Graphics"></button>
              <div className="svc-obj lift"><div className="face"><div className="paper" data-label=""></div></div><div className="face"><div className="paper dark" data-label=""></div></div></div>
              <div className="svc-inner">
                <span className="svc-num">03</span>
                <h3>Signage &amp; Facility Graphics</h3>
                <p>Interior and exterior signage designed for clarity and consistency.</p>
                <div className="svc-more">
                  <div className="svc-thumbs">
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                  </div>
                </div>
                <span className="svc-see">See examples <span className="arr">&rarr;</span></span>
              </div>
            </div>
            <div className="svc" data-cursor data-cursor-open="true">
              <button className="svc-toggle" aria-label="Expand Presentation &amp; Sales"></button>
              <div className="svc-obj"><div className="face" style={{zIndex: 0}}><div className="paper" data-label=""></div></div><div className="lid"><div className="paper dark" data-label=""></div></div></div>
              <div className="svc-inner">
                <span className="svc-num">04</span>
                <h3>Presentation &amp; Sales</h3>
                <p>Referral packets, presentation folders, and leave-behinds for outreach teams.</p>
                <div className="svc-more">
                  <div className="svc-thumbs">
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                  </div>
                </div>
                <span className="svc-see">See examples <span className="arr">&rarr;</span></span>
              </div>
            </div>
            <div className="svc" data-cursor data-cursor-open="true">
              <button className="svc-toggle" aria-label="Expand Event &amp; Community"></button>
              <div className="svc-obj lift"><div className="face"><div className="paper" data-label=""></div></div><div className="face"><div className="paper dark" data-label=""></div></div></div>
              <div className="svc-inner">
                <span className="svc-num">05</span>
                <h3>Event &amp; Community</h3>
                <p>Banners, handouts, displays, and promotional assets for events and outreach.</p>
                <div className="svc-more">
                  <div className="svc-thumbs">
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                  </div>
                </div>
                <span className="svc-see">See examples <span className="arr">&rarr;</span></span>
              </div>
            </div>
            <div className="svc" data-cursor data-cursor-open="true">
              <button className="svc-toggle" aria-label="Expand Video Brochures"></button>
              <div className="svc-obj"><div className="flapL"><div className="paper" data-label=""></div></div><div className="flapR"><div className="paper" data-label=""></div></div><div className="face" style={{zIndex: -1}}><div className="paper dark" data-label=""></div></div></div>
              <div className="svc-inner">
                <span className="svc-num">06</span>
                <h3>Video Brochures</h3>
                <p>Premium print-meets-screen pieces &mdash; see the spotlight below.</p>
                <div className="svc-more">
                  <div className="svc-thumbs">
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                    <div className="t"><div className="paper" data-label="sample [REPLACE]"></div></div>
                  </div>
                </div>
                <span className="svc-see">See examples <span className="arr">&rarr;</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From blank page to <span className="accent">press-ready.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Hover a phase &mdash; watch a piece go from wireframe to a print-ready proof.</p>
          </div>
          <div className="proc-tabs" data-reveal>
            <button className="proc-tab on" data-proc="0" data-cursor><span className="pnum">01</span><span className="pname">Discovery</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="1" data-cursor><span className="pnum">02</span><span className="pname">Design</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="2" data-cursor><span className="pnum">03</span><span className="pname">Refine</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="3" data-cursor><span className="pnum">04</span><span className="pname">Print &amp; Deliver</span><span className="pbar"></span></button>
          </div>
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className="step on" data-step="0"><h3>Discovery</h3><p>We review your goals, audience, and existing materials &mdash; and define exactly what each piece needs to do.</p></div>
                <div className="step" data-step="1"><h3>Design</h3><p>We create concepts aligned with your brand and messaging, turning the brief into real layouts.</p></div>
                <div className="step" data-step="2"><h3>Refine</h3><p>We collaborate on revisions and finalize the design &mdash; every edit marked and resolved.</p></div>
                <div className="step" data-step="3"><h3>Print &amp; Deliver</h3><p>We prepare production-ready files or coordinate printing and delivery &mdash; press marks, bleeds, and CMYK all handled.</p></div>
              </div>
              <div className="proc-proof">
                <div className="proof-tag" id="proofTag">WIREFRAME</div>
                <div className="proof-sheet" id="proofSheet">
                  <div className="proof-stage proof-wire on" data-stage="0">
                    <div className="wbox" style={{top: '8%', height: '26%'}}></div>
                    <div className="wl" style={{top: '42%'}}></div>
                    <div className="wl" style={{top: '52%'}}></div>
                    <div className="wbox" style={{top: '62%', height: '20%'}}></div>
                    <div className="wl" style={{top: '88%', width: '40%', left: '12%'}}></div>
                  </div>
                  <div className="proof-stage proof-comp" data-stage="1">
                    <div className="band" style={{top: 0, height: '30%'}}></div>
                    <div className="img" style={{top: '36%', height: '24%'}}></div>
                    <div className="ln" style={{top: '66%'}}></div>
                    <div className="ln" style={{top: '73%'}}></div>
                    <div className="ln" style={{top: '80%', width: '50%'}}></div>
                  </div>
                  <div className="proof-stage proof-comp proof-rev" data-stage="2">
                    <div className="band" style={{top: 0, height: '30%'}}></div>
                    <div className="img" style={{top: '36%', height: '24%'}}></div>
                    <div className="ln" style={{top: '66%'}}></div>
                    <div className="ln" style={{top: '73%'}}></div>
                    <div className="ln" style={{top: '80%', width: '50%'}}></div>
                    <div className="circle" style={{top: '6%', left: '18%'}}></div>
                    <div className="note" style={{top: '4%', left: '42%'}}>tighten logo</div>
                    <div className="mark" style={{top: '36%', left: '14%', right: '14%', height: '24%'}}></div>
                    <div className="note" style={{top: '60%', left: '30%'}}>swap photo</div>
                  </div>
                  <div className="proof-stage proof-final" data-stage="3">
                    <div className="band"></div>
                    <div className="logo"></div>
                    <div className="img" style={{top: '36%', height: '24%'}}></div>
                    <div className="ln" style={{top: '66%'}}></div>
                    <div className="ln" style={{top: '73%'}}></div>
                    <div className="ln" style={{top: '80%', width: '50%'}}></div>
                    <div className="reg" style={{top: '-8px', left: '-8px'}}></div>
                    <div className="reg" style={{top: '-8px', right: '-8px'}}></div>
                    <div className="reg" style={{bottom: '-8px', left: '-8px'}}></div>
                    <div className="reg" style={{bottom: '-8px', right: '-8px'}}></div>
                    <div className="cmyk"><i className="c"></i><i className="m"></i><i className="y"></i><i className="k"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="deliv" data-reveal>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10M6 11l-4 4 4 4"/></svg></div>
              <h4>Production Ready</h4>
              <p>We supply final files built exactly to printer specs &mdash; correct bleeds, safe zones, color profiles, and crop marks.</p>
            </div>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
              <h4>Premium Finishes</h4>
              <p>We advise on paper weights, coatings, and specialized finishes (like foil or spot UV) to make your pieces stand out.</p>
            </div>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
              <h4>Integrated Media</h4>
              <p>If we handle your photo or video work, we seamlessly integrate those assets into your print design for a unified brand look.</p>
            </div>
            <div className="deliv-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 16 14"/></svg></div>
              <h4>Managed Printing</h4>
              <p>Don&rsquo;t want to deal with print vendors? We can manage the entire production process and ship the final boxes directly to your facility.</p>
            </div>
          </div>

          <div className="vbro" data-reveal style={{marginTop: '80px'}}>
            <div>
              <span className="label">Spotlight</span>
              <h3>The Video Brochure</h3>
              <p>A physical, hardcover folio that opens to reveal an embedded HD screen which automatically plays your facility film.</p>
              <p>It bridges the gap between physical collateral and digital storytelling. It is, without question, the most effective leave-behind a hospital liaison or admissions director can hand to a referring physician or prospective family.</p>
            </div>
            <div className="vbro-visual" data-cursor data-cursor-play="true">
              <div className="paper dark" data-label="video brochure in hands [REPLACE]"></div>
              <div className="play"><span>&#9654;</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad" id="work">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Featured Work</span>
            <h2>Materials that <span className="accent">work.</span></h2>
          </div>
          <div className="fw-grid stagger">
            <div className="fw wide" data-cursor><div className="paper" data-label="project gallery [REPLACE]"></div><div className="cap">Corporate Admissions Packet</div></div>
            <div className="fw" data-cursor><div className="paper" data-label="project gallery [REPLACE]"></div><div className="cap">Facility Brochure</div></div>
            <div className="fw tall" data-cursor><div className="paper dark" data-label="project gallery [REPLACE]"></div><div className="cap">Campus Map &amp; Signage</div></div>
            <div className="fw" data-cursor><div className="paper" data-label="project gallery [REPLACE]"></div><div className="cap">Referral Leave-Behind</div></div>
            <div className="fw wide" data-cursor><div className="paper dark" data-label="project gallery [REPLACE]"></div><div className="cap">Event Banner &amp; Display</div></div>
            <div className="fw" data-cursor><div className="paper" data-label="project gallery [REPLACE]"></div><div className="cap">Direct Mail Campaign</div></div>
            <div className="fw" data-cursor><div className="paper" data-label="project gallery [REPLACE]"></div><div className="cap">Custom Video Brochure</div></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <canvas id="waveCanvas"></canvas>
        <div className="final-in" data-reveal>
          <span className="label">Upgrade your materials</span>
          <h2>Give them something <span className="accent">better</span> to hold onto.</h2>
          <p className="sub">Stop handing out print-at-home flyers. Elevate your brand with design that builds trust before you even speak.</p>
          <Link href="/contact" className="btn btn-light" data-cursor data-magnetic>Start a Design Project <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}
