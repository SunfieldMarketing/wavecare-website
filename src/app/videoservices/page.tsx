'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';

export default function VideoServices() {
  const [procTab, setProcTab] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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

      function initCount() {
        const els = document.querySelectorAll('[data-count]');
        if (!('IntersectionObserver' in window)) {
          els.forEach(el => {
            const c = (el as HTMLElement).dataset.comma === '1';
            const t = +(el as HTMLElement).dataset.count!;
            el.textContent = c ? t.toLocaleString() : t.toString();
          });
          return;
        }
        const io = new IntersectionObserver(es => {
          es.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            const target = +el.dataset.count!, comma = el.dataset.comma === '1', suf = el.dataset.suffix || '', dur = 1700, t0 = performance.now();
            (function step(now) {
              const k = dur ? Math.min((now - t0) / dur, 1) : 1;
              const e = 1 - Math.pow(1 - k, 3);
              const v = Math.floor(target * e);
              el.textContent = (comma ? v.toLocaleString() : v.toString()) + suf;
              if (k < 1) requestAnimationFrame(step); else el.textContent = (comma ? target.toLocaleString() : target.toString()) + suf;
            })(performance.now());
          });
        }, { threshold: 0.25 });
        els.forEach(el => io.observe(el));
      }

      function initWaveAccent() {
        const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement;
        // @ts-ignore
        const THREE = window.THREE;
        if (!canvas || !THREE) { if (canvas) canvas.style.background = 'radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)'; return; }
        let renderer: any; try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { canvas.style.display = 'none'; return; }
        const sec = canvas.parentElement!;
        function size() { return [sec.clientWidth, sec.clientHeight]; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        let [w, h] = size(); renderer.setSize(w, h);
        const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const uniforms = { uTime: { value: 0 }, uRes: { value: new THREE.Vector2(w, h) }, uMouse: { value: new THREE.Vector2(0.5, 0.5) } };
        const frag = `precision highp float; uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; varying vec2 vUv;
          vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;} vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
          float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
            vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
            vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
            vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
            vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;
            vec3 x=2.0*fract(p*C.www)-1.0;vec3 hh=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;
            m*=1.79284291400159-0.85373472095314*(a0*a0+hh*hh);
            vec3 g;g.x=a0.x*x0.x+hh.x*x0.y;g.yz=a0.yz*x12.xz+hh.yz*x12.yw;return 130.0*dot(m,g);}
          float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*snoise(p);p*=2.0;a*=0.5;}return v;}
          void main(){ vec2 uv=vUv; vec2 p=(gl_FragCoord.xy-0.5*uRes.xy)/uRes.y; float t=uTime*0.05;
            vec2 q=vec2(fbm(p*1.5+t),fbm(p*1.5+vec2(3.2,1.7)-t));
            float f=fbm(p*1.5+2.0*q+t); f=f*0.5+0.5;
            float d=distance(uv,uMouse); f+=sin(d*22.0-uTime*2.0)*exp(-d*5.0)*0.12;
            vec3 cDeep=vec3(0.039,0.263,0.224),cPrim=vec3(0.055,0.353,0.314),cAcc=vec3(0.165,0.616,0.561),cBri=vec3(0.373,0.816,0.749);
            vec3 col=mix(cDeep,cPrim,smoothstep(0.2,0.6,f)); col=mix(col,cAcc,smoothstep(0.6,0.85,f)); col=mix(col,cBri,smoothstep(0.85,1.0,f));
            col+=cBri*exp(-d*6.0)*0.10; float al=0.9-0.5*pow(distance(uv,vec2(0.5)),1.3);
            gl_FragColor=vec4(col,clamp(al,0.0,1.0)); }`;
        const mat = new THREE.ShaderMaterial({
          uniforms, fragmentShader: frag,
          vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`, transparent: true
        });
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
        let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
        sec.addEventListener('mousemove', e => { const r = sec.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; tmy = 1 - (e.clientY - r.top) / r.height; });
        window.addEventListener('resize', () => { [w, h] = size(); renderer.setSize(w, h); uniforms.uRes.value.set(w, h); });
        let vis = true; if ('IntersectionObserver' in window) new IntersectionObserver(es => vis = es[0].isIntersecting, { rootMargin: '100px' }).observe(sec);
        const clock = new THREE.Clock();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        (function loop() {
          requestAnimationFrame(loop); if (!vis) return; mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
          uniforms.uMouse.value.set(mx, my); uniforms.uTime.value = clock.getElapsedTime() * (reduceMotion ? 0 : 1); renderer.render(scene, cam);
        })();
      }

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if ((window.gsap && window.ScrollTrigger && window.THREE) || retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initFilter();
          initCount();
          initWaveAccent();
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
            <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0&quality=1080p" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Wavecare Commercial"></iframe>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="panel sec-pad" style={{ background: '#062A24', paddingTop: '20px', paddingBottom: '80px' }}>
        <div className="container stats stagger" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="stat"><div className="num" data-count="80" data-suffix="%">0</div><div className="cap">of families watch a video before touring</div></div>
          <div className="stat"><div className="num" data-count="3" data-suffix="x">0</div><div className="cap">higher conversion on pages with video</div></div>
          <div className="stat"><div className="num" data-count="2" data-suffix=".5x">0</div><div className="cap">more engagement on social media</div></div>
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

      {/* ========== TYPES OF VIDEOS ========== */}
      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Types of Videos</span>
            <h2>What we <span className="lite">produce.</span></h2>
            <p className="sub" style={{ margin: '20px auto 0', maxWidth: '600px' }}>Every video is purpose-built for the place it will actually be seen — the website, the tour, the inbox, the feed.</p>
          </div>
          
          <div className="filter-bar" data-reveal>
            <button className="fchip on" data-filter="all">All Projects</button>
            <button className="fchip" data-filter="family">Family &amp; Facility</button>
            <button className="fchip" data-filter="recruit">Recruitment</button>
            <button className="fchip" data-filter="testimonial">Testimonials</button>
            <button className="fchip" data-filter="social">Social Media</button>
          </div>
          
          <div className="types-grid stagger" id="typesGrid">
            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('1183669641')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/2146609771-407fb9135b97c639b345fa94bd14f38ebaaf81564e6fed050878482b77d99ab0-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>Waterview Nursing &amp; Rehab</h3><p>Discover our newly redesigned Flushing facility featuring panoramic Manhattan skyline views and state-of-the-art care.</p><div className="where">Virtual Tour</div></div>
            </div>

            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('1183056612')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/2145807255-3028a1cb240082c2500af287b5f93ca2c503d1d0c131602574bc88e4976ed1f5-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>Park Gardens</h3><p>Explore our beautifully renovated Bronx facility offering private, semi-private, and suite accommodations in Riverdale.</p><div className="where">Virtual Tour</div></div>
            </div>

            <div className="tcard" data-cat="Commercial" onClick={() => setActiveVideo('906115435')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Commercial" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/1787724682-99c5f028f168e64a7c91d011cf8d19a16d4453e95b0911be06e755c443218d36-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>Link Homecare</h3><p>A personal story of family-provided in-home care, highlighting the comfort of having a loved one as a certified home attendant.</p><div className="where">Commercial</div></div>
            </div>

            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('930394765')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/1827081869-f1d75fd0450accdafec4e7b7c8368040ea48a3450daf1cd9b6f636ef56ec7e39-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>River Ridge Living Center</h3><p>Take a tranquil virtual tour of our Amsterdam facility, nestled on beautifully manicured private grounds with cozy room options.</p><div className="where">Virtual Tour</div></div>
            </div>

            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('856155374')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/1712816615-6ba0388b0b58583f381a4b3356eb9052615911745c39ee6dee971f9a310672ff-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>The Pines at Bristol</h3><p>Experience our commitment to compassion and excellence with 24/7 professional care and comfortable private recovery rooms.</p><div className="where">Virtual Tour</div></div>
            </div>

            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('856155997')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/1712817557-3969c28915abb77b8412e3a23078fa6d1b4bad48748312374eeff78913c6f666-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>New York Congregational</h3><p>A guided walkthrough of our Brooklyn center, highlighting cozy amenities, private rooms, and a welcoming environment in Flatbush.</p><div className="where">Virtual Tour</div></div>
            </div>

            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('856154806')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/1712815705-18dc757f93e75914b5eacf8f699412cbe74ee92615493cdf40b7e91c73f859d6-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>Cascades Assisted Living</h3><p>Tour our quaint, country-style assisted living community in Bethel, featuring 42 comfortable studio and apartment residences.</p><div className="where">Virtual Tour</div></div>
            </div>

            <div className="tcard" data-cat="Virtual Tour" onClick={() => setActiveVideo('856153642')} style={{ cursor: 'pointer' }}>
              <div className="thumb" data-label="Virtual Tour" style={{ backgroundImage: 'linear-gradient(rgba(10, 58, 50, 0.2), rgba(10, 58, 50, 0.6)), url(https://i.vimeocdn.com/video/1712813534-a3d2acf7cbd65f54e9171b98bf7b6c543db0cbfd52633894a64d329d0c191bf6-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="play"><span>&#9654;</span></div>
              </div>
              <div className="body"><h3>Complete Care Green Acres</h3><p>An inside look at our 5-star rated skilled nursing facility in Toms River, NJ, featuring 162 beds and 33 private suites.</p><div className="where">Virtual Tour</div></div>
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
          <div className="fw-grid stagger" style={{ alignItems: 'center' }}>
            <div className="fw-card hero" onClick={() => setActiveVideo('906115435')} style={{ cursor: 'pointer', border: 'none', aspectRatio: '16/9', minHeight: 'auto', height: 'auto' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://i.vimeocdn.com/video/1787724682-99c5f028f168e64a7c91d011cf8d19a16d4453e95b0911be06e755c443218d36-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
              <iframe src="https://player.vimeo.com/video/906115435?background=1&autoplay=1&loop=1&muted=1&transparent=1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to top, rgba(10, 58, 50, 0.9) 0%, rgba(10, 58, 50, 0) 40%)', pointerEvents: 'none', zIndex: 1 }} />
              <div className="fw-meta"><span className="tag">Commercial</span><span className="title">Link Homecare - Zsanet &amp; Terry</span></div>
            </div>
            <div className="fw-side" style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 'auto' }}>
              <div className="fw-card small" onClick={() => setActiveVideo('1183056612')} style={{ cursor: 'pointer', border: 'none', aspectRatio: '16/9', minHeight: 'auto', height: 'auto' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://i.vimeocdn.com/video/2145807255-3028a1cb240082c2500af287b5f93ca2c503d1d0c131602574bc88e4976ed1f5-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
                <iframe src="https://player.vimeo.com/video/1183056612?background=1&autoplay=1&loop=1&muted=1&transparent=1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to top, rgba(10, 58, 50, 0.9) 0%, rgba(10, 58, 50, 0) 40%)', pointerEvents: 'none', zIndex: 1 }} />
                <div className="fw-meta"><span className="tag">Virtual Tour</span><span className="title">Park Gardens Tour</span></div>
              </div>
              <div className="fw-card small" onClick={() => setActiveVideo('930394765')} style={{ cursor: 'pointer', border: 'none', aspectRatio: '16/9', minHeight: 'auto', height: 'auto' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://i.vimeocdn.com/video/1827081869-f1d75fd0450accdafec4e7b7c8368040ea48a3450daf1cd9b6f636ef56ec7e39-d_1280)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
                <iframe src="https://player.vimeo.com/video/930394765?background=1&autoplay=1&loop=1&muted=1&transparent=1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to top, rgba(10, 58, 50, 0.9) 0%, rgba(10, 58, 50, 0) 40%)', pointerEvents: 'none', zIndex: 1 }} />
                <div className="fw-meta"><span className="tag">Virtual Tour</span><span className="title">River Ridge Tour</span></div>
              </div>
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
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{ justifyContent: 'center' }} data-reveal>Your facility, seen the right way</span>
          <h2 data-reveal>Let families see the <br/><span className="accent">care</span> behind your facility.</h2>
          <p className="sub" data-reveal>From planning and scripting to filming and final delivery, we manage the entire production process to create polished videos that build trust and support admissions growth.</p>
          <div data-reveal><Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Book a Call</Link></div>
        </div>
      </section>

      {/* Video Lightbox */}
      {activeVideo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setActiveVideo(null)}>
          <button onClick={() => setActiveVideo(null)} style={{ position: 'absolute', top: '20px', right: '30px', background: 'transparent', border: 'none', color: '#fff', fontSize: '40px', cursor: 'pointer', zIndex: 10000 }}>&times;</button>
          <div style={{ width: '90%', maxWidth: '1200px', aspectRatio: '16/9', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://player.vimeo.com/video/${activeVideo}?autoplay=1&quality=1080p`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}


