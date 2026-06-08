'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import './case-studies.css';

export default function CaseStudies() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;

      
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // @ts-ignore
      const THREE = window.THREE;

      
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
            const target = +el.dataset.count!, comma = el.dataset.comma === '1', suf = el.dataset.suffix || '', dur = reduceMotion ? 0 : 1700, t0 = performance.now();
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
        const canvas = document.getElementById('waveCanvas');
        if (!canvas || !THREE) { if (canvas) canvas.style.background = 'radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)'; return; }
        let renderer; try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { canvas.style.display = 'none'; return; }
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

      initCount();

      // Check and execute
      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger && window.THREE) {
          clearInterval(checkScripts);
          initReveals();
          initWaveAccent();
          // @ts-ignore
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        } else if (retryCount > 100) {
          clearInterval(checkScripts); // Give up after ~5 seconds
          initReveals();
          initWaveAccent();
        }
      }, 50);
    };

    runScripts();
  }, []);

  return (
    <>
      <section className="sec-pad panel ink" style={{ paddingTop: '180px' }}>
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">Our Work</span>
            <h2>Real results for real healthcare brands.</h2>
            <p className="sub" style={{ margin: '20px auto 0' }}>
              We don't just make things look pretty. We build marketing engines that drive tours, patient inquiries, and trust.
            </p>
          </div>

          <div className="cs-grid stagger">
            <Link href="/case-studies/oakwood" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>OAKWOOD HERO IMAGE</span></div>
                <div className="cs-tag">
                  <span>Web Design</span>
                  <span>Video</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">Oakwood Senior Living</span>
                <h3>How a modern website and facility tour video increased bookings by 42%</h3>
                <p className="cs-desc">Oakwood was losing out to newer competitors despite offering better care. We completely overhauled their digital presence.</p>
                <div className="cs-result">
                  <span className="num">42%</span>
                  <span className="lbl">Increase in qualified tours</span>
                </div>
                <div className="cs-go">
                  Read Case Study
                </div>
              </div>
            </Link>

            <Link href="/case-studies/pinnacle" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>THE PINNACLE HERO</span></div>
                <div className="cs-tag">
                  <span>Photography</span>
                  <span>Print</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">The Pinnacle</span>
                <h3>Elevating a luxury memory care brand through premium visuals</h3>
                <p className="cs-desc">We replaced outdated stock imagery with authentic, sensitive photography that captures the true quality of their care.</p>
                <div className="cs-result">
                  <span className="num">3X</span>
                  <span className="lbl">Higher engagement on ads</span>
                </div>
                <div className="cs-go">
                  Read Case Study
                </div>
              </div>
            </Link>
            
            <Link href="/case-studies/harmony" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>HARMONY CARE HERO</span></div>
                <div className="cs-tag">
                  <span>Full Service</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">Harmony Care</span>
                <h3>A ground-up rebrand for a growing regional provider</h3>
                <p className="cs-desc">From the logo and messaging to the website and print collateral, we built a cohesive brand system ready to scale.</p>
                <div className="cs-result">
                  <span className="num">15</span>
                  <span className="lbl">Facilities launched</span>
                </div>
                <div className="cs-go">
                  Read Case Study
                </div>
              </div>
            </Link>

            <Link href="/case-studies/mercy" className="cs-card">
              <div className="cs-media">
                <div className="ph"><span>MERCY HEALTH HERO</span></div>
                <div className="cs-tag">
                  <span>Web Design</span>
                  <span>SEO</span>
                </div>
              </div>
              <div className="cs-body">
                <span className="cs-client">Mercy Health Partners</span>
                <h3>Dominating local search with a conversion-first medical site</h3>
                <p className="cs-desc">We structured their multi-location practice website to rank locally, resulting in a massive influx of organic patient leads.</p>
                <div className="cs-result">
                  <span className="num">+210%</span>
                  <span className="lbl">Organic search traffic</span>
                </div>
                <div className="cs-go">
                  Read Case Study
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec-pad panel deep">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">BY THE NUMBERS</span>
            <h2>A decade of <em style={{ color: 'var(--teal-bright)', fontStyle: 'italic' }}>getting it right.</em></h2>
          </div>
          <div className="stats four stagger">
            <div className="stat">
              <div className="num" data-count="10">0</div>
              <div className="cap">Years in Healthcare</div>
            </div>
            <div className="stat">
              <div className="num"><span data-count="500">0</span>+</div>
              <div className="cap">Facilities Served</div>
            </div>
            <div className="stat">
              <div className="num" data-count="700">0</div>
              <div className="cap">Assisted Placements</div>
            </div>
            <div className="stat">
              <div className="num" data-count="2400" data-comma="1">0</div>
              <div className="cap">Smiles Captured</div>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-fallback"></div>
        <canvas id="waveCanvas"></canvas>
        <div className="container" data-reveal style={{ textAlign: 'center' }}>
          <div className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', display: 'inline-flex', justifyContent: 'center' }}>YOUR FACILITY, SEEN THE RIGHT WAY</div>
          <h2>Ready to be the next <em style={{ color: 'var(--teal-bright)', fontStyle: 'italic' }}>case study?</em></h2>
          <p className="sub" style={{ margin: '0 auto 40px', maxWidth: '600px' }}>Tell us about your facility. We'll show you exactly what a Wavecare rebuild could look like — and what it could do for your inquiries.</p>
          <Link href="/contact" className="btn btn-light">Book a Call &rarr;</Link>
        </div>
      </section>
    </>
  );
}

