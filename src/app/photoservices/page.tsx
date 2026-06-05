"use client";

import './photoservices.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function PhotoServices() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* hero wall assembles on load */
    const cells = document.querySelectorAll('#pheroWall .cell');
    if (reduce) {
      cells.forEach(c => c.classList.add('in'));
    } else {
      const order = Array.from(cells.keys()).sort(() => Math.random() - .5);
      order.forEach((idx, i) => {
        if (!(cells[idx] as HTMLElement).dataset.processed) {
           (cells[idx] as HTMLElement).dataset.processed = "true";
           setTimeout(() => cells[idx].classList.add('in'), 250 + i * 70);
        }
      });
    }

    /* before/after slider */
    const ba = document.getElementById('ba');
    if (ba && !ba.dataset.processed) {
      ba.dataset.processed = "true";
      const before = document.getElementById('baBefore');
      const handle = document.getElementById('baHandle');
      function set(x: number) {
        if (!ba || !before || !handle) return;
        const r = ba.getBoundingClientRect();
        let p = (x - r.left) / r.width;
        p = Math.max(0, Math.min(1, p));
        before.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
        handle.style.left = (p * 100) + '%';
      }
      let drag = false;
      ba.addEventListener('pointerdown', e => { drag = true; set(e.clientX); });
      window.addEventListener('pointerup', () => drag = false);
      window.addEventListener('pointermove', e => { if (drag) set(e.clientX); });
      ba.addEventListener('pointermove', e => { if (!drag) set(e.clientX); });
      requestAnimationFrame(() => set(ba.getBoundingClientRect().left + ba.getBoundingClientRect().width * 0.5));
    }

    /* filterable gallery */
    const chips = document.querySelectorAll('.fchip');
    const cards = document.querySelectorAll('.gcard');
    if (chips.length && !(chips[0] as HTMLElement).dataset.processed) {
      chips.forEach(c => {
        (c as HTMLElement).dataset.processed = "true";
        c.addEventListener('click', () => {
          chips.forEach(x => x.classList.remove('on'));
          c.classList.add('on');
          const f = (c as HTMLElement).dataset.filter;
          cards.forEach(card => {
            const cat = (card as HTMLElement).dataset.cat;
            card.classList.toggle('hidden', !(f === 'all' || cat === f));
          });
        });
      });
    }

    /* where-used context tabs */
    const tabs = document.querySelectorAll('.ctx-tab');
    const scenes = document.querySelectorAll('.ctx-scene');
    if (tabs.length && !(tabs[0] as HTMLElement).dataset.processed) {
      function goCtx(i: number) {
        tabs.forEach(t => t.classList.toggle('on', +(t as HTMLElement).dataset.ctx! === i));
        scenes.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.scene! === i));
      }
      tabs.forEach(t => {
        (t as HTMLElement).dataset.processed = "true";
        const i = +(t as HTMLElement).dataset.ctx!;
        t.addEventListener('mouseenter', () => goCtx(i));
        t.addEventListener('click', () => goCtx(i));
        t.addEventListener('focus', () => goCtx(i));
      });
    }

    /* process contact sheet develops */
    const procTabs = document.querySelectorAll('.proc-tab');
    const steps = document.querySelectorAll('.proc-detail .step');
    const sheet = document.getElementById('procSheet');
    const loupe = document.getElementById('procLoupe');
    if (procTabs.length && !(procTabs[0] as HTMLElement).dataset.processed) {
      const LOUPE = ['PROOFS', 'SHOOTING', 'DEVELOPING', 'SELECTS'];
      function goProc(i: number) {
        procTabs.forEach(t => t.classList.toggle('on', +(t as HTMLElement).dataset.proc! === i));
        steps.forEach(s => s.classList.toggle('on', +(s as HTMLElement).dataset.step! === i));
        if (sheet) {
          sheet.classList.remove('dev1', 'dev2', 'dev3');
          if (i === 1) sheet.classList.add('dev1');
          else if (i === 2) sheet.classList.add('dev2');
          else if (i === 3) sheet.classList.add('dev3');
        }
        if (loupe) loupe.textContent = LOUPE[i] || LOUPE[0];
      }
      procTabs.forEach(t => {
        (t as HTMLElement).dataset.processed = "true";
        const i = +(t as HTMLElement).dataset.proc!;
        t.addEventListener('mouseenter', () => goProc(i));
        t.addEventListener('click', () => goProc(i));
        t.addEventListener('focus', () => goProc(i));
      });
      goProc(0);
    }
  }, []);

  return (
    <>
      <div className="cring"><span className="vf">f/1.8</span><span className="tick t1"></span><span className="tick t2"></span><span className="tick t3"></span><span className="tick t4"></span></div>

      <header className="phero" id="phero">
        <div className="phero-wall" id="pheroWall">
          {[...Array(18)].map((_, i) => (
            <div className="cell" key={i}><div className="pho" data-label={`img ${i + 1}`}></div></div>
          ))}
        </div>
        <div className="phero-tint"></div>
        <div className="phero-in">
          <div className="phero-content">
            <svg className="wave-line" viewBox="0 0 120 18" aria-hidden="true"><path d="M2 9 Q17 1 32 9 T62 9 T92 9 T118 9"/></svg>
            <span className="label">Brand &amp; Photoshoots</span>
            <h1>Professional photography that <span className="accent">builds trust.</span></h1>
            <p className="sub">Showcase your facility, staff, residents, and care environment with authentic imagery &mdash; built for websites, social media, admissions materials, and marketing campaigns.</p>
            <div className="phero-ctas">
              <Link href="/contact" className="btn" data-cursor data-magnetic>Book a Photoshoot <span className="arr">&rarr;</span></Link>
              <Link href="#gallery" className="btn btn-ghost" data-cursor data-magnetic>View Photo Work</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="trust">
        <div className="trust-in">Trusted by healthcare facilities improving their online presence, admissions marketing, and brand perception.</div>
      </div>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Why Professional Photography Matters</span>
            <h2>Families form their first impression <span className="accent">online.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Outdated, inconsistent, or stock photography can make even the best facility feel untrustworthy. Drag to see the difference real photography makes.</p>
          </div>
          <div data-reveal>
            <div className="ba" id="ba" data-cursor>
              <div className="layer after"><div className="pho" data-label="After &middot; professional [REPLACE]"></div></div>
              <div className="layer before" id="baBefore"><div className="pho" data-label="Before &middot; stock / outdated [REPLACE]"></div></div>
              <span className="tagb">Before</span>
              <span className="taga">After</span>
              <div className="handle" id="baHandle"><div className="grip"></div></div>
            </div>
            <p className="ba-note">Drag the handle &mdash; left is typical stock/DIY, right is professional Wavecare photography.</p>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="glow" style={{width: '520px', height: '520px', background: 'var(--teal-secondary)', top: '-120px', right: '-120px'}}></div>
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">What We Photograph</span>
            <h2>Everything that tells your <span className="lite">story.</span></h2>
          </div>
          <div className="cap-grid stagger">
            <div className="cap-card">
              <h3>Facility Photography</h3>
              <p>Common areas, resident rooms, amenities, dining spaces, and exterior views &mdash; the spaces families judge first.</p>
            </div>
            <div className="cap-card">
              <h3>Staff &amp; Team Photography</h3>
              <p>Professional portraits and candid team moments that put real faces to your culture and care.</p>
            </div>
            <div className="cap-card">
              <h3>Resident Lifestyle</h3>
              <p>Authentic moments of daily life, activities, and community &mdash; the proof that people are happy here.</p>
            </div>
            <div className="cap-card">
              <h3>Marketing Content</h3>
              <p>Images shaped for websites, social, brochures, ads, and recruitment &mdash; shot with the end use in mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad" id="gallery">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">The Work</span>
            <h2>Real facilities, <span className="accent">real moments.</span></h2>
            <p className="sub" style={{margin: '18px auto 0'}}>Filter by what you need to see. Every image is shot on location &mdash; no stock, ever.</p>
          </div>
          <div className="filter-bar" data-reveal>
            <button className="fchip on" data-filter="all" data-cursor>All</button>
            <button className="fchip" data-filter="facility" data-cursor>Facility</button>
            <button className="fchip" data-filter="staff" data-cursor>Staff &amp; Team</button>
            <button className="fchip" data-filter="resident" data-cursor>Resident Lifestyle</button>
            <button className="fchip" data-filter="marketing" data-cursor>Marketing</button>
          </div>
          <div className="gal" id="gal">
            <div className="gcard wide" data-cursor data-cursor-frame="true" data-cat="facility">
              <div className="pho" data-label="Facility &middot; lobby"></div>
              <div className="cap">Facility &middot; lobby</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="staff">
              <div className="pho" data-label="Staff &middot; portrait"></div>
              <div className="cap">Staff &middot; portrait</div>
            </div>
            <div className="gcard tall" data-cursor data-cursor-frame="true" data-cat="resident">
              <div className="pho" data-label="Resident &middot; lifestyle"></div>
              <div className="cap">Resident &middot; lifestyle</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="marketing">
              <div className="pho" data-label="Marketing &middot; web hero"></div>
              <div className="cap">Marketing &middot; web hero</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="facility">
              <div className="pho" data-label="Facility &middot; dining"></div>
              <div className="cap">Facility &middot; dining</div>
            </div>
            <div className="gcard wide" data-cursor data-cursor-frame="true" data-cat="resident">
              <div className="pho" data-label="Resident &middot; activity"></div>
              <div className="cap">Resident &middot; activity</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="staff">
              <div className="pho" data-label="Staff &middot; candid"></div>
              <div className="cap">Staff &middot; candid</div>
            </div>
            <div className="gcard tall" data-cursor data-cursor-frame="true" data-cat="marketing">
              <div className="pho" data-label="Marketing &middot; social"></div>
              <div className="cap">Marketing &middot; social</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="facility">
              <div className="pho" data-label="Facility &middot; exterior"></div>
              <div className="cap">Facility &middot; exterior</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="resident">
              <div className="pho" data-label="Resident &middot; garden"></div>
              <div className="cap">Resident &middot; garden</div>
            </div>
            <div className="gcard wide" data-cursor data-cursor-frame="true" data-cat="staff">
              <div className="pho" data-label="Staff &middot; team"></div>
              <div className="cap">Staff &middot; team</div>
            </div>
            <div className="gcard " data-cursor data-cursor-frame="true" data-cat="marketing">
              <div className="pho" data-label="Marketing &middot; brochure"></div>
              <div className="cap">Marketing &middot; brochure</div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Where Your Photos Are Used</span>
            <h2>One shoot. <span className="accent">Everywhere</span> it counts.</h2>
            <p className="sub" style={{marginTop: '18px'}}>The same professional image earns its keep across every place families and referral partners find you.</p>
          </div>
          <div className="ctx" data-reveal>
            <div className="ctx-tabs">
              <button className="ctx-tab on" data-ctx="0" data-cursor>
                <h4>Website</h4><p>Stronger first impression, instant trust.</p>
              </button>
              <button className="ctx-tab" data-ctx="1" data-cursor>
                <h4>Brochures &amp; Packets</h4><p>Polished materials for tours and admissions.</p>
              </button>
              <button className="ctx-tab" data-ctx="2" data-cursor>
                <h4>Google Business Profile</h4><p>Better local visibility with real imagery.</p>
              </button>
            </div>
            <div className="ctx-stage" id="ctxStage">
              <div className="ctx-scene on" data-scene="0">
                <div className="mock-web">
                  <div className="bar"><i></i><i></i><i></i></div>
                  <div className="shot"><div className="pho" data-label="hero image [REPLACE]"></div></div>
                  <div className="lines"><span></span><span></span><span></span></div>
                </div>
              </div>
              <div className="ctx-scene" data-scene="1">
                <div className="mock-bro">
                  <div className="pg"><div className="shot"><div className="pho" data-label="brochure [REPLACE]"></div></div><div className="lines"><span></span><span></span></div></div>
                  <div className="pg"><div className="shot"><div className="pho" data-label="packet [REPLACE]"></div></div><div className="lines"><span></span><span></span></div></div>
                </div>
              </div>
              <div className="ctx-scene" data-scene="2">
                <div className="mock-goo">
                  <div className="shot"><div className="pho" data-label="listing image [REPLACE]"></div></div>
                  <div className="info"><div className="name">Park Gardens &middot; Senior Living</div><div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div className="meta"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel ink sec-pad">
        <div className="container container-wide">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From shot list to <span className="accent">final gallery.</span></h2>
            <p className="sub" style={{marginTop: '18px'}}>Hover a phase &mdash; watch the contact sheet develop from raw proofs to the final selects.</p>
          </div>
          <div className="proc-tabs" data-reveal>
            <button className="proc-tab on" data-proc="0" data-cursor><span className="pnum">01</span><span className="pname">Planning</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="1" data-cursor><span className="pnum">02</span><span className="pname">Photoshoot Day</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="2" data-cursor><span className="pnum">03</span><span className="pname">Editing</span><span className="pbar"></span></button>
            <button className="proc-tab" data-proc="3" data-cursor><span className="pnum">04</span><span className="pname">Delivery</span><span className="pbar"></span></button>
          </div>
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className="step on" data-step="0"><h3>Planning</h3><p>We identify goals, locations, and the exact shot list &mdash; so nothing is missed and your staff knows what to expect.</p></div>
                <div className="step" data-step="1"><h3>Photoshoot Day</h3><p>Our team captures everything planned, efficiently and respectfully, working around residents and daily routines.</p></div>
                <div className="step" data-step="2"><h3>Editing</h3><p>Images are professionally edited, color-corrected, and optimized for every marketing use.</p></div>
                <div className="step" data-step="3"><h3>Delivery</h3><p>You receive organized, ready-to-use files for web, print, social, and advertising &mdash; named and sized correctly.</p></div>
              </div>
              <div className="proc-sheet" id="procSheet">
                <div className="loupe" id="procLoupe">PROOFS</div>
                <div className="frame"><div className="pho" data-label="proof 1"></div><div className="pick"></div></div>
                <div className="frame"><div className="pho" data-label="proof 2"></div><div className="pick"></div></div>
                <div className="frame"><div className="pho" data-label="proof 3"></div><div className="pick"></div></div>
                <div className="frame"><div className="pho" data-label="proof 4"></div><div className="pick"></div></div>
                <div className="frame"><div className="pho" data-label="select"></div><div className="pick"></div></div>
                <div className="frame"><div className="pho" data-label="proof 6"></div><div className="pick"></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Selected Work</span>
            <h2>A closer <span className="lite">look.</span></h2>
          </div>
          <div className="mason" data-reveal>
            <div className="m" style={{'--ar': '0.75'} as React.CSSProperties}><div className="pho" data-label="portrait [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '1.5'} as React.CSSProperties}><div className="pho" data-label="facility [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '1'} as React.CSSProperties}><div className="pho" data-label="resident [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '1.3'} as React.CSSProperties}><div className="pho" data-label="dining [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '0.8'} as React.CSSProperties}><div className="pho" data-label="staff [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '1.2'} as React.CSSProperties}><div className="pho" data-label="exterior [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '1'} as React.CSSProperties}><div className="pho" data-label="activity [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '1.4'} as React.CSSProperties}><div className="pho" data-label="amenity [REPLACE]"></div></div>
            <div className="m" style={{'--ar': '0.9'} as React.CSSProperties}><div className="pho" data-label="lifestyle [REPLACE]"></div></div>
          </div>
          <div style={{textAlign: 'center', marginTop: '50px'}} data-reveal>
            <Link href="/contact" className="btn btn-ghost" data-cursor data-magnetic>View More Work <span className="arr">&rarr;</span></Link>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <canvas id="waveCanvas"></canvas>
        <div className="final-in" data-reveal>
          <span className="label">A clearer picture of your care</span>
          <h2>Give families a clearer <span className="accent">picture</span> of your care.</h2>
          <p className="sub">We capture the spaces, people, and moments that make your facility feel professional, welcoming, and trustworthy.</p>
          <Link href="/contact" className="btn btn-light" data-cursor data-magnetic>Book a Photoshoot <span className="arr">&rarr;</span></Link>
        </div>
      </section>
    </>
  );
}
