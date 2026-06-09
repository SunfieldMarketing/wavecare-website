'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../subservices.css';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export default function PhotoServices() {
  const [ctxTab, setCtxTab] = useState(0);
  const [procTab, setProcTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const galleryItems = [
    { src: '/images/gallery/Caregiver%20with%20elderly%20man%20playing%20game.jpeg', aspect: '0.75', filters: ['RESIDENT LIFESTYLE', 'ALL'] },
    { src: '/images/gallery/Elders%20cooking.jpg', aspect: '1.5', filters: ['RESIDENT LIFESTYLE', 'ALL'] },
    { src: '/images/gallery/Employees%20laughing%20photo.jpeg', aspect: '1', filters: ['STAFF & TEAM', 'MARKETING', 'ALL'] },
    { src: '/images/gallery/Two%20women%20with%20notepads%20smiling.jpg', aspect: '1.3', filters: ['STAFF & TEAM', 'ALL'] },
    { src: '/images/gallery/Balloon%20activity%20photo.jpeg', aspect: '0.8', filters: ['RESIDENT LIFESTYLE', 'ALL'] },
    { src: '/images/gallery/Catherdral%20Health%20Center%20Front%20Photo.jpeg', aspect: '1.2', filters: ['FACILITY', 'MARKETING', 'ALL'] },
    { src: '/images/gallery/Elderly%20doing%20puzzles%20photo.jpg', aspect: '1', filters: ['RESIDENT LIFESTYLE', 'ALL'] },
    { src: '/images/gallery/Yorktown%20landscape%20aerial%20photo%202.jpeg', aspect: '1.4', filters: ['FACILITY', 'MARKETING', 'ALL'] },
    { src: '/images/gallery/Employees%20smiling.jpeg', aspect: '0.9', filters: ['STAFF & TEAM', 'ALL'] }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;

      // @ts-ignore
      const THREE = window.THREE;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      function initWaveAccent() {
        const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement;
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
            vec2 q=vec2(fbm(p*1.5+t),fbm(p*1.5+vec2(3.2,1.7)-t)); float f=fbm(p*1.5+2.0*q+t); f=f*0.5+0.5;
            float d=distance(uv,uMouse); f+=sin(d*22.0-uTime*2.0)*exp(-d*5.0)*0.12;
            vec3 cDeep=vec3(0.039,0.263,0.224),cPrim=vec3(0.055,0.353,0.314),cAcc=vec3(0.165,0.616,0.561),cBri=vec3(0.373,0.816,0.749);
            vec3 col=mix(cDeep,cPrim,smoothstep(0.2,0.6,f)); col=mix(col,cAcc,smoothstep(0.6,0.85,f)); col=mix(col,cBri,smoothstep(0.85,1.0,f));
            col+=cBri*exp(-d*6.0)*0.10; float al=0.9-0.5*pow(distance(uv,vec2(0.5)),1.3);
            gl_FragColor=vec4(col,clamp(al,0.0,1.0)); }`;
        const mat = new THREE.ShaderMaterial({ uniforms, fragmentShader: frag, vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`, transparent: true });
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
        let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
        sec.addEventListener('mousemove', e => { const r = sec.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width; tmy = 1 - (e.clientY - r.top) / r.height; });
        window.addEventListener('resize', () => { [w, h] = size(); renderer.setSize(w, h); uniforms.uRes.value.set(w, h); });
        let vis = true; if ('IntersectionObserver' in window) new IntersectionObserver(es => vis = es[0].isIntersecting, { rootMargin: '100px' }).observe(sec);
        const clock = new THREE.Clock();
        (function loop() { requestAnimationFrame(loop); if (!vis) return; mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06; uniforms.uMouse.value.set(mx, my); uniforms.uTime.value = clock.getElapsedTime() * (reduceMotion ? 0 : 1); renderer.render(scene, cam); })();
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
          initWaveAccent();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initCamCursor();
          initWaveAccent();
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

      {/* ========== SOCIAL PROOF BANNER ========== */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '16px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em', margin: 0 }}>
          Trusted by healthcare facilities improving their online presence, admissions marketing, and brand perception.
        </p>
      </div>

      {/* ========== WHY PROFESSIONAL PHOTOGRAPHY MATTERS ========== */}
      <section className="panel deep sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
            <span className="label">WHY PROFESSIONAL PHOTOGRAPHY MATTERS</span>
            <h2>Families form their first <span className="accent">impression online.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>Outdated, inconsistent, or stock photography can make even the best facility feel untrustworthy. Drag to see the difference real photography makes.</p>
          </div>
          
          <div data-reveal>
            <BeforeAfterSlider 
              beforeImage="/images/gallery/Yorktown_front_before.jpg" 
              afterImage="/images/gallery/Yorktown%20front.jpg"
            />
            <p className="ba-caption">Drag the handle &mdash; left is typical phone photo // right is professional photography</p>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE PHOTOGRAPH ========== */}
      <section className="panel ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal style={{ textAlign: 'center', margin: '0 auto 60px' }}>
            <span className="label">WHAT WE PHOTOGRAPH</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '1.1', marginTop: '16px' }}>
              Everything that tells your <span className="accent" style={{ fontStyle: 'italic' }}>story.</span>
            </h2>
          </div>
          
          <div className="shoot-grid" data-reveal>
            <div className="shoot-card">
              <h3 style={{ fontFamily: 'var(--font-head)' }}>Facility Photography</h3>
              <p>Common areas, resident rooms, amenities, dining spaces, and exterior views &mdash; the spaces families judge first.</p>
            </div>
            <div className="shoot-card">
              <h3 style={{ fontFamily: 'var(--font-head)' }}>Staff &amp; Team Photography</h3>
              <p>Professional portraits and candid team moments that put real faces to your culture and care.</p>
            </div>
            <div className="shoot-card">
              <h3 style={{ fontFamily: 'var(--font-head)' }}>Resident Lifestyle</h3>
              <p>Authentic moments of daily life, activities, and community &mdash; the proof that people are happy here.</p>
            </div>
            <div className="shoot-card">
              <h3 style={{ fontFamily: 'var(--font-head)' }}>Marketing Content</h3>
              <p>Images shaped for websites, social, brochures, ads, and recruitment &mdash; shot with the end user in mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTEXT ========== */}
      <section className="panel deep sec-pad">
        <div className="container phero-in" style={{ gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div data-reveal style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="label">WHERE YOUR PHOTOS ARE USED</span>
            <h2>One shoot. <span className="accent">Everywhere</span> it counts.</h2>
            <p className="sub" style={{ marginTop: '18px', marginBottom: '40px' }}>The same professional image earns its keep across every place families and referral partners find you.</p>
            
            <div className="ctx-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className={`ctx-tab ${ctxTab === 0 ? 'on' : ''}`} onMouseEnter={() => setCtxTab(0)} onClick={() => setCtxTab(0)} style={{ width: '100%', justifyContent: 'flex-start' }}>
                <div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg></div>
                <div style={{ textAlign: 'left' }}>
                  <h3>Website</h3><p>Stronger first impression, instant trust.</p>
                </div>
              </div>
              <div className={`ctx-tab ${ctxTab === 1 ? 'on' : ''}`} onMouseEnter={() => setCtxTab(1)} onClick={() => setCtxTab(1)} style={{ width: '100%', justifyContent: 'flex-start' }}>
                <div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>
                <div style={{ textAlign: 'left' }}>
                  <h3>Brochures &amp; Packets</h3><p>Polished materials for tours and admissions.</p>
                </div>
              </div>
              <div className={`ctx-tab ${ctxTab === 2 ? 'on' : ''}`} onMouseEnter={() => setCtxTab(2)} onClick={() => setCtxTab(2)} style={{ width: '100%', justifyContent: 'flex-start' }}>
                <div className="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
                <div style={{ textAlign: 'left' }}>
                  <h3>Google Business Profile</h3><p>Better local visibility with real imagery.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ctx" data-reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div className="ctx-stage" style={{ position: 'relative', height: '100%', minHeight: '520px', width: '115%', marginLeft: '-7.5%' }}>
              <div className={`ctx-scene ${ctxTab === 0 ? 'on' : ''}`} style={{ alignItems: 'flex-end' }}>
                <div className="mock-web" style={{ maxWidth: '800px', width: '100%' }}>
                  <div className="bar"><i></i><i></i><i></i></div>
                  <div className="shot">
                    <img src="/images/website.png" alt="Website" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <div className="lines"><span></span><span></span><span></span></div>
                </div>
              </div>
              <div className={`ctx-scene ${ctxTab === 1 ? 'on' : ''}`} style={{ alignItems: 'flex-end' }}>
                <div className="mock-bro" style={{ maxWidth: '800px', width: '100%', gap: '20px' }}>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden', aspectRatio: '4/5' }}>
                    <img src="/images/brochure_inside.png" alt="Brochure Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden', aspectRatio: '4/5' }}>
                    <img src="/images/brochure_cover.jpg" alt="Brochure Inside" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div className={`ctx-scene ${ctxTab === 2 ? 'on' : ''}`} style={{ alignItems: 'flex-end' }}>
                <div className="mock-goo" style={{ maxWidth: '800px', width: '100%' }}>
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
            {['ALL', 'FACILITY', 'STAFF & TEAM', 'RESIDENT LIFESTYLE', 'MARKETING'].map(f => (
              <button 
                key={f} 
                className={`fchip ${activeFilter === f ? 'on' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mason">
            {galleryItems.filter(item => item.filters.includes(activeFilter)).map((item, idx) => (
              <div 
                className="m" 
                style={{ 
                  aspectRatio: item.aspect, 
                  animation: `fadeUp 0.5s ease forwards`,
                  animationDelay: `${idx * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }} 
                key={activeFilter + item.src}
              >
                <img src={item.src} alt="Selected Work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }} data-reveal>
            <Link href="/case-studies" className="btn btn-ghost">View More Work</Link>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="final">
        <canvas id="waveCanvas"></canvas>
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


