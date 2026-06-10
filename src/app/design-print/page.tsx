'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../subservices.css';

export default function DesignPrint() {
  const [procTab, setProcTab] = useState(0);
  const [baPos, setBaPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleBaDrag = (e: any) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    let p = (x / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setBaPos(p);
  };

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
        const els = document.querySelectorAll('[data-reveal],.stagger');
        if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
        const io = new IntersectionObserver(es => {
          es.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        els.forEach(e => io.observe(e));
        setTimeout(() => {
          els.forEach(e => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); });
        }, 400);
      }

      function initCount() {
        const els = document.querySelectorAll('[data-count]');
          if (!('IntersectionObserver' in window)) {
            els.forEach(el => {
              const c = (el as HTMLElement).dataset.comma === '1';
              const t = +(el as HTMLElement).dataset.count!;
              const suf = (el as HTMLElement).dataset.suffix || '';
              el.textContent = (c ? t.toLocaleString() : t.toString()) + suf;
            });
            return;
          }
        const io = new IntersectionObserver(es => {
          es.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            const target = +el.dataset.count!, comma = el.dataset.comma === '1', dur = reduceMotion ? 0 : 1700, t0 = performance.now();
            (function step(now) {
                const k = dur ? Math.min((now - t0) / dur, 1) : 1;
                const e = 1 - Math.pow(1 - k, 3);
                const v = Math.floor(target * e);
                const suf = el.dataset.suffix || '';
                el.textContent = (comma ? v.toLocaleString() : v.toString()) + suf;
                if (k < 1) requestAnimationFrame(step); else el.textContent = (comma ? target.toLocaleString() : target.toString()) + suf;
            })(performance.now());
          });
        }, { threshold: 0.25 });
        els.forEach(el => io.observe(el));
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
        (function loop() {
          requestAnimationFrame(loop); if (!vis) return; mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
          uniforms.uMouse.value.set(mx, my); uniforms.uTime.value = clock.getElapsedTime() * (reduceMotion ? 0 : 1); renderer.render(scene, cam);
        })();
      }

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        const gsapReady = window.gsap && window.ScrollTrigger;
        // @ts-ignore
        const threeReady = window.THREE;

        if ((gsapReady && threeReady) || retryCount > 80) {
          clearInterval(checkScripts);
          initReveals();
          initCount();
          initWaveAccent();
          // @ts-ignore
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }
      }, 50);
    };

    runScripts();
  }, []);

  const procData = [
    { name: "Discovery", title: "Discovery", desc: "We review your goals, audience, and existing materials — and define exactly what each piece needs to do." },
    { name: "Design", title: "Design", desc: "We create concepts aligned with your brand and messaging, turning the brief into real layouts." },
    { name: "Refine", title: "Refine", desc: "We collaborate on revisions and finalize the design — every edit marked and resolved." },
    { name: "Print & Deliver", title: "Print & Deliver", desc: "We prepare production-ready files or coordinate printing and delivery — press marks, bleeds, and CMYK all handled." }
  ];

  return (
    <>
      <section className="phero">
        <div className="container">
          <div className="phero-in">
            <div data-reveal>
              <div className="brcm">
                <Link href="/">Home</Link> <span>/</span> <Link href="/services">Services</Link> <span>/</span> <span>Design & Print</span>
              </div>
              <h1>Healthcare<br/><i style={{fontStyle: 'italic', color: 'var(--teal-primary)'}}>Design & Print</i></h1>
              <p className="sub">Professional design and print for senior care facilities and medical practices. Brochures, admissions packets, signage, and branded materials that build trust at every touchpoint.</p>
              
              <div className="trust-list" style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '16px 24px', opacity: 0.8, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--teal-bright)' }}>
                 <span>✓ ADMISSIONS MATERIALS</span>
                 <span>✓ FACILITY SIGNAGE</span>
                 <span>✓ VIDEO BROCHURES</span>
              </div>
              <div className="btn-group" style={{ marginTop: '40px' }}>
                <Link href="/contact" className="btn">Start a Design Project &rarr;</Link>
              </div>
            </div>
            
            <div className="phero-wall stagger" data-reveal>
               <div className="cell c1"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)', borderRadius: '8px' }}></div></div>
               <div className="cell c2"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)', borderRadius: '8px' }}></div></div>
               <div className="cell c3"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)', borderRadius: '8px' }}></div></div>
               <div className="cell c4"><div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)', borderRadius: '8px' }}></div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="dp-banner" data-reveal>
        <span>Healthcare-Focused Design</span>
        <div className="dot"></div>
        <span>Print-Ready Files</span>
        <div className="dot"></div>
        <span>Custom Branding</span>
        <div className="dot"></div>
        <span>Premium Materials</span>
      </div>

      <section className="panel sec-pad dp-why">
        <div className="container">
          <div className="sec-head center" data-reveal style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
            <span className="label">Why Design & Print Matters</span>
            <h2>First impressions are <span className="accent">physical.</span></h2>
            <p className="lead" style={{ marginTop: '24px' }}>Families often form opinions about your facility before they ever speak with your team. Professional design creates confidence, improves communication, and makes sure every touchpoint reflects the quality of care you provide.</p>
          </div>
          <div className="ba-slider" ref={sliderRef} 
               style={{ maxWidth: '1000px', margin: '0 auto' }}
               onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handleBaDrag(e); }}
               onPointerMove={(e) => { if (e.buttons > 0) handleBaDrag(e); }}
               data-reveal>
            <div className="ba-after"><img src="/images/brochure_inside.png" alt="After" /></div>
            <div className="ba-before" style={{ width: `${baPos}%` }}>
               <img src="/images/img_130.jpeg" alt="Before" style={{ width: `${10000/baPos}%` }} />
            </div>
            <div className="ba-handle" style={{ left: `${baPos}%` }}></div>
            <div className="ba-tags"><span className="btag">BEFORE</span><span className="atag">AFTER</span></div>
          </div>
          <p style={{textAlign: 'center', opacity: 0.6, marginTop: '24px', fontSize: '0.9rem', width: '100%'}} data-reveal>Drag — left is a typical flyer, right is a professionally designed piece.</p>

          <div style={{ position: 'relative', zIndex: 2, marginTop: '80px' }}>
            <div className="stats stagger" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="stat"><div className="num" data-count="60" data-suffix="%">0</div><div className="cap">of families judge care quality by marketing materials</div></div>
              <div className="stat"><div className="num" data-count="2" data-suffix="x">0</div><div className="cap">higher conversion with professional admissions packets</div></div>
              <div className="stat"><div className="num" data-count="100" data-suffix="%">0</div><div className="cap">tailored to senior care and medical practices</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel deep sec-pad dp-services">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Design & Print Services</span>
            <h2>Everything your facility hands over.</h2>
          </div>
          <div className="ds-grid stagger">
            <article className="ds-card">
              <div className="icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
              <span className="num">01</span>
              <h3>Brochures & Marketing</h3>
              <p>Professionally designed brochures, flyers, postcards, and promotional pieces.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginTop: '24px' }}>See examples &rarr;</Link>
            </article>
            <article className="ds-card">
              <div className="icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></div>
              <span className="num">02</span>
              <h3>Admissions Packets</h3>
              <p>Custom folders and insert sheets to cleanly organize intake forms, facility amenities, and rules.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginTop: '24px' }}>See examples &rarr;</Link>
            </article>
            <article className="ds-card">
              <div className="icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="14" rx="2" ry="2"></rect><line x1="12" y1="19" x2="12" y2="22"></line><line x1="8" y1="22" x2="16" y2="22"></line><line x1="8" y1="5" x2="8" y2="19"></line></svg></div>
              <h3>Banners & Signage</h3>
              <p>Pull-up banners, event signage, and facility posters that align perfectly with your brand identity.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginTop: '24px' }}>See examples &rarr;</Link>
            </article>
            <article className="ds-card">
              <div className="icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="18"></line><line x1="12" y1="14" x2="12" y2="14"></line><line x1="12" y1="10" x2="12" y2="10"></line></svg></div>
              <h3>Menus & Activities</h3>
              <p>Elevate your dining and recreation experience with beautifully formatted and easy-to-read daily or weekly layouts.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginTop: '24px' }}>See examples &rarr;</Link>
            </article>
            <article className="ds-card">
              <div className="icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div>
              <h3>Stationery & Cards</h3>
              <p>Business cards for your liaisons and leadership, letterheads, and custom envelopes.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginTop: '24px' }}>See examples &rarr;</Link>
            </article>
            <article className="ds-card">
              <div className="icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
              <h3>Event Collateral</h3>
              <p>Invitations, schedules, and custom promo items designed specifically for your community events or open houses.</p>
              <Link href="#" className="btn-text" style={{ color: 'var(--teal-bright)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start', marginTop: '24px' }}>See examples &rarr;</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="panel sec-pad dp-process">
          <div className="container">
            <div className="sec-head" data-reveal>
              <span className="label">Our Process</span>
              <h2>From blank page to <span className="accent">press-ready.</span></h2>
              <p className="sub" style={{ maxWidth: '400px', margin: '0' }}>Hover a phase — watch a piece go from wireframe to a print-ready proof.</p>
            </div>
            
            <div className="ip-tabs stagger">
              {procData.map((tab, i) => (
                <div key={i} className={`ip-tab ${procTab === i ? 'on' : ''}`} onMouseEnter={() => setProcTab(i)}>
                  <span className="num">0{i + 1}</span>
                  <span className="name">{tab.name}</span>
                  <div className="circ"></div>
                </div>
              ))}
            </div>
            
            <div className="ip-panel stagger">
              <div className="ip-text" key={procTab}>
                <h3>{procData[procTab].title}</h3>
                <p>{procData[procTab].desc}</p>
              </div>
              <div className="ip-viz">
                <div className="ip-badge">
                  {procTab === 0 ? 'Wireframe' : procTab === 1 ? 'Flat Comp' : procTab === 2 ? 'Revision' : 'Press-Ready'}
                </div>
                <div className={`viz-doc viz-mode-${procTab}`} key={`viz-${procTab}`}>
                   <div className="top-part">
                      {procTab === 3 && <div className="logo-circle"></div>}
                      {procTab === 2 && <div className="red-circle"><div className="rev-tag t1">tighten logo</div></div>}
                      <div className="hero-box"></div>
                   </div>
                   <div className="bot-part">
                      <div className="line"></div>
                      <div className="line short"></div>
                      <div className="box">
                        {procTab === 2 && <div className="rev-tag t2">swap photo</div>}
                      </div>
                      <div className="line"></div>
                      <div className="line short"></div>
                   </div>
                   {procTab === 3 && (
                     <div className="cmyk-bar">
                        <div className="cmyk-dot cmyk-c"></div>
                        <div className="cmyk-dot cmyk-m"></div>
                        <div className="cmyk-dot cmyk-y"></div>
                        <div className="cmyk-dot cmyk-k"></div>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel deep sec-pad dp-sig">
          <div className="container">
            <div className="sig-wrapper stagger">
               <div>
                  <span className="label">Signature Product</span>
                  <h2>The Video Brochure</h2>
                  <p className="lead">Combine the impact of our cinematic video production with the tangibility of a premium print piece. A physical brochure that opens to reveal an embedded HD screen automatically playing your facility&apos;s film.</p>
                  <Link href="/contact" className="btn" style={{ marginTop: '24px' }}>Get a Quote</Link>
               </div>
               <div className="sig-vid">
                  <div className="sig-play">▶</div>
               </div>
            </div>
          </div>
        </section>

        <section className="panel sec-pad">
          <div className="container">
            <div className="sec-head center" data-reveal style={{ maxWidth: '1000px', margin: '0 auto 40px' }}>
               <span className="label">Recent Print Projects</span>
               <h2 style={{ textWrap: 'unset' }}>A look at the collateral.</h2>
               <p className="sub" style={{ marginTop: '16px', maxWidth: '1000px', margin: '16px auto 0' }}>
                 A look at the collateral and materials we&apos;ve designed and printed.
               </p>
            </div>
            <div className="mason stagger">
               <div className="m" style={{ aspectRatio: '1.4', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Tri-Fold</div>
               </div>
               <div className="m" style={{ aspectRatio: '0.8', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Brochure</div>
               </div>
               <div className="m" style={{ aspectRatio: '1', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Folder</div>
               </div>
               <div className="m" style={{ aspectRatio: '1.2', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Banner</div>
               </div>
               <div className="m" style={{ aspectRatio: '0.9', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Postcard</div>
               </div>
               <div className="m" style={{ aspectRatio: '1.5', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Signage</div>
               </div>
               <div className="m" style={{ aspectRatio: '1.1', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Menu</div>
               </div>
               <div className="m" style={{ aspectRatio: '0.85', position: 'relative' }}>
                 <div className="placeholder" style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0d4a40, #13695d)' }}></div>
                 <div className="fwt" style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: '#fff' }}>Stationery</div>
               </div>
            </div>
          </div>
        </section>

        <section className="panel ink sec-pad">
          <div className="container">
            <div className="sec-head" data-reveal>
              <span className="label">What You&apos;ll Receive</span>
              <h2>Finished, formatted, <span className="lite">ready to print.</span></h2>
            </div>
            <div className="rx-grid stagger" style={{ marginTop: '40px' }}>
               <div className="rx-item">
                  <div className="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                  <h4>Print-Ready Files</h4>
                  <p>Delivered with proper bleeds, crop marks, and CMYK color profiles.</p>
               </div>
               <div className="rx-item">
                  <div className="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg></div>
                  <h4>Reliable Source</h4>
                  <p>We supply source files so you always have access to your assets.</p>
               </div>
               <div className="rx-item">
                  <div className="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div>
                  <h4>Stock & Finish Specs</h4>
                  <p>Recommendations for paper weight, coating, and bindings.</p>
               </div>
               <div className="rx-item">
                  <div className="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                  <h4>Production Coordination</h4>
                  <p>We can work directly with your print vendor to ensure flawless execution.</p>
               </div>
            </div>
          </div>
        </section>

      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{ justifyContent: 'center' }} data-reveal>Print that speaks for you</span>
          <h2 data-reveal>Leave families with a<br /><span className="accent">lasting</span> impression.</h2>
          <p className="sub" data-reveal>When a family finishes a tour, the materials they take home represent your facility. Make sure they say the right thing.</p>
          <div data-reveal><Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Start a Design Project</Link></div>
        </div>
      </section>
    </>
  );
}
