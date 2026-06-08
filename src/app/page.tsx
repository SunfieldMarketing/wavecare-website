'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScripts = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;
      // @ts-ignore
      const Lenis = window.Lenis;
      // @ts-ignore
      const THREE = window.THREE;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function runPreloader(done: () => void) {
        const pre = document.getElementById('preloader');
        const bar = document.getElementById('plbar');
        const num = document.getElementById('plnum');
        if (!pre || !bar || !num) { done(); return; }
        
        let p = 0, fin = false;
        function finish() {
          if (fin) return;
          fin = true;
          pre!.style.transition = 'opacity .6s';
          pre!.style.opacity = '0';
          setTimeout(() => { pre!.style.display = 'none'; done(); }, 620);
        }
        
        const iv = setInterval(() => {
          p = Math.min(100, p + Math.random() * 22 + 10);
          bar!.style.width = p + '%';
          num!.textContent = Math.floor(p).toString();
          if (p >= 100) {
            clearInterval(iv);
            setTimeout(finish, 200);
          }
        }, 90);
        
        setTimeout(finish, 3000);
      }

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
            el.textContent = c ? t.toLocaleString() : t.toString();
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
              el.textContent = comma ? v.toLocaleString() : v.toString();
              if (k < 1) requestAnimationFrame(step); else el.textContent = comma ? target.toLocaleString() : target.toString();
            })(performance.now());
          });
        }, { threshold: 0.25 });
        els.forEach(el => io.observe(el));
      }

      function initChrome() {
        const prog = document.getElementById('progress');
        const nav = document.getElementById('nav');
        if (!prog || !nav) return;
        function on() {
          const h = document.documentElement, sc = h.scrollTop || document.body.scrollTop, max = h.scrollHeight - h.clientHeight;
          prog!.style.width = (max > 0 ? sc / max * 100 : 0) + '%';
          nav!.classList.toggle('scrolled', sc > 40);
        }
        window.addEventListener('scroll', on, { passive: true });
        on();
      }

      function initLenis() {
        if (!Lenis || reduceMotion) return;
        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        if (gsap && ScrollTrigger) {
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((t: any) => lenis.raf(t * 1000));
          gsap.ticker.lagSmoothing(0);
        } else {
          (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
        }
        document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
          const el = document.querySelector(a.getAttribute('href')!);
          if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -20 }); }
        }));
      }

      function initHero() {
        const wp = document.querySelector('.wave-accent path') as SVGPathElement;
        if (gsap) {
          gsap.set('[data-hero]', { opacity: 0, y: 38 });
          gsap.to('[data-hero]', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
          if (wp) gsap.to(wp, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', delay: 0.4 });
          gsap.to('.hero-bg img', { scale: 1, duration: 2.4, ease: 'power2.out' });
          if (ScrollTrigger) {
            gsap.to('.hero-inner', { yPercent: -16, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to('.hero-bg img', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to('.scroll-cue', { opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '14% top', scrub: true } });
          }
        } else {
          document.querySelectorAll('[data-hero]').forEach(e => { (e as HTMLElement).style.opacity = '1'; (e as HTMLElement).style.transform = 'none'; });
          if (wp) wp.style.strokeDashoffset = '0';
        }
      }

      function initServices() {
        const vp = document.getElementById('svcViewport'), track = document.getElementById('svcTrack');
        const prev = document.getElementById('svcPrev') as HTMLButtonElement, next = document.getElementById('svcNext') as HTMLButtonElement;
        if (!vp || !track) return;
        let x = 0;
        function maxScroll() { return Math.min(0, vp!.clientWidth - track!.scrollWidth); }
        function clamp(v: number) { return Math.max(maxScroll(), Math.min(0, v)); }
        function apply() { track!.style.transform = `translate3d(${x}px,0,0)`; if (prev) prev.disabled = x >= -1; if (next) next.disabled = x <= maxScroll() + 1; }
        function to(v: number) { x = clamp(v); if (gsap) { gsap.to(track, { x, duration: 0.6, ease: 'power3.out', onUpdate: apply }); } else { apply(); } }
        function step() { return Math.min(440, vp!.clientWidth * 0.8); }
        next && next.addEventListener('click', () => to(x - step()));
        prev && prev.addEventListener('click', () => to(x + step()));
        
        vp.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); x = clamp(x - e.deltaX); apply(); } }, { passive: false });
        let down = false, sx = 0, sox = 0, moved = false, horizontal: boolean | null = null, sy = 0;
        vp.addEventListener('pointerdown', e => { down = true; moved = false; horizontal = null; sx = e.clientX; sy = e.clientY; sox = x; vp.classList.add('dragging'); });
        window.addEventListener('pointermove', e => {
          if (!down) return;
          const dx = e.clientX - sx, dy = e.clientY - sy;
          if (horizontal === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) horizontal = Math.abs(dx) > Math.abs(dy);
          if (horizontal) { e.preventDefault?.(); x = clamp(sox + dx); apply(); if (Math.abs(dx) > 4) moved = true; }
        });
        window.addEventListener('pointerup', () => { down = false; vp.classList.remove('dragging'); });
        track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
        
        document.querySelectorAll('.svc-card').forEach(card => {
          card.addEventListener('click', (e: Event) => {
            if ((e.target as HTMLElement).closest('a')) return;
            card.classList.toggle('open');
            // @ts-ignore
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          });
        });
        window.addEventListener('resize', () => { x = clamp(x); apply(); });
        apply();
      }

      function initMarquee() {
        const row = document.getElementById('marqueeRow'); if (!row) return;
        row.innerHTML += row.innerHTML; let x = 0, half = row.scrollWidth / 2;
        function tick() { x -= 0.6; if (-x >= half) x += half; row!.style.transform = `translateX(${x}px)`; requestAnimationFrame(tick); }
        if (!reduceMotion) tick();
      }

      function initCursor() {
        const dot = document.getElementById('cdot'), ring = document.getElementById('cring');
        if (!dot || window.matchMedia('(hover:none),(pointer:coarse)').matches) { if (dot) dot.style.display = 'none'; if (ring) ring!.style.display = 'none'; return; }
        let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
        window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
        (function r() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring!.style.left = rx + 'px'; ring!.style.top = ry + 'px'; requestAnimationFrame(r); })();
        document.querySelectorAll('[data-cursor]').forEach(el => { el.addEventListener('mouseenter', () => ring!.classList.add('hot')); el.addEventListener('mouseleave', () => ring!.classList.remove('hot')); });
        if (gsap) document.querySelectorAll('[data-magnetic]').forEach(el => {
          el.addEventListener('mousemove', (e: any) => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.4, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.4, ease: 'power3.out' }); });
          el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
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

      // Run preloader immediately — don't block on CDN libraries loading
      runPreloader(() => {
        initChrome();
        initReveals();
        initCount();
        initServices();
        initMarquee();
        initCursor();

        // Wait for animation libraries (up to 4s), then init hero/wave
        let retryCount = 0;
        const checkScripts = setInterval(() => {
          retryCount++;
          // @ts-ignore
          const gsapReady = window.gsap && window.ScrollTrigger;
          // @ts-ignore
          const lenisReady = window.Lenis;
          // @ts-ignore
          const threeReady = window.THREE;

          if ((gsapReady && lenisReady && threeReady) || retryCount > 80) {
            clearInterval(checkScripts);
            if (lenisReady) initLenis();
            initHero();
            initWaveAccent();
            // @ts-ignore
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          }
        }, 50);
      });
    };

    runScripts();
  }, []);

  return (
    <>
      <div className="preloader" id="preloader">
        <img src="data:image/png;base64,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" alt="Wavecare" />
        <div className="pl-bar"><span id="plbar"></span></div>
        <div className="pl-num" id="plnum">0</div>
      </div>

      <header className="hero">
        <div className="hero-bg">
          <Image src="/images/img_3.jpeg" alt="Caregiver with resident at a senior care facility" layout="fill" objectFit="cover" priority />
        </div>
        <div className="container hero-inner">
          <svg className="wave-accent" viewBox="0 0 78 26">
            <path d="M2 13 Q 12 2, 21 13 T 40 13 T 59 13 T 76 11" />
          </svg>
          <span className="label" data-hero>Healthcare Marketing Agency</span>
          <h1>
            <span className="line" data-hero><span>Built for</span></span>
            <span className="line" data-hero><span className="accent">Healthcare.</span></span>
          </h1>
          <p className="hero-sub" data-hero>
            We help senior care facilities and medical practices look as good as the care they
            provide — branding, video, print, and websites that turn attention into booked tours.
          </p>
          <div className="hero-actions" data-hero>
            <Link href="/contact" className="btn" data-magnetic data-cursor>Book a Call</Link>
            <Link href="#services" className="btn btn-ghost" data-magnetic data-cursor>See What We Do</Link>
          </div>
        </div>
        <div className="scroll-cue">
          <div className="m"></div>
          <span>Scroll</span>
        </div>
      </header>

      <section className="ink sec-pad">
        <div className="glow" style={{ width: '520px', height: '520px', background: 'var(--teal-primary)', top: '-120px', left: '-140px' }}></div>
        <div className="container">
          <div className="showreel">
            <div data-reveal>
              <span className="label">Who We Are</span>
              <h2>Marketing that earns trust before the first tour.</h2>
              <p>A youthful, yet experienced healthcare marketing agency with bespoke solutions and tailored strategies — built around the sensitivity, compliance, and speed that senior care actually requires.</p>
              <p>See the work for yourself.</p>
              <Link href="/contact" className="btn" data-magnetic data-cursor style={{ marginTop: '14px' }}>Book a Call</Link>
            </div>
            <div className="reel-frame" data-reveal data-cursor>
              <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" title="Wavecare Commercial"></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="deep sec-pad" id="services">
        <div className="container">
          <div className="svc-head">
            <div data-reveal>
              <span className="label">What We Do</span>
              <h2>Everything your brand needs.</h2>
            </div>
            <div className="svc-arrows">
              <button id="svcPrev" aria-label="Previous" data-cursor>←</button>
              <button id="svcNext" aria-label="Next" data-cursor>→</button>
            </div>
          </div>
        </div>

        <div className="svc-viewport" id="svcViewport">
          <div className="svc-track" id="svcTrack">
            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">01</span>
                <Image src="/images/brand_photoshoots.jpg" alt="Brand & photoshoots" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Brand &amp; Photoshoots</h3>
                <p className="svc-tag">Build instant trust with a clean, modern healthcare look.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Facility interiors, exteriors &amp; amenities</li>
                    <li>Staff portraits &amp; resident lifestyle</li>
                    <li>HIPAA-conscious shoot workflows</li>
                    <li>Edited library for every channel</li>
                  </ul>
                  <Link href="/photoservices" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>

            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">02</span>
                <Image src="/images/video_production.jpg" alt="Video production" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Video Production</h3>
                <p className="svc-tag">Short-form &amp; explainer videos that turn views into booked calls.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Commercials &amp; facility tour films</li>
                    <li>Testimonial &amp; brand videos</li>
                    <li>Social-ready cuts, every ratio</li>
                    <li>Vimeo-hosted, ad-free playback</li>
                  </ul>
                  <Link href="/videoservices" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>

            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">03</span>
                <Image src="/images/design_print_2.jpg" alt="Design & print" layout="fill" objectFit="contain" />
              </div>
              <div className="svc-body">
                <h3>Design &amp; Print</h3>
                <p className="svc-tag">Patient-ready brochures, banners, menus, and signage.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Brochures, flyers &amp; welcome packets</li>
                    <li>Interior signage &amp; banners</li>
                    <li>Menus &amp; event collateral</li>
                    <li>Business cards &amp; stationery</li>
                  </ul>
                  <Link href="/design-print" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>

            <article className="svc-card" data-cursor>
              <div className="svc-media">
                <span className="svc-num">04</span>
                <Image src="/images/img_6.jpeg" alt="Web design & management" layout="fill" objectFit="cover" />
              </div>
              <div className="svc-body">
                <h3>Web Design &amp; Management</h3>
                <p className="svc-tag">Fast, conversion-first websites that generate inquiries daily.</p>
                <div className="svc-detail">
                  <ul>
                    <li>Mobile-first, accessible builds</li>
                    <li>SEO + Google Business optimization</li>
                    <li>Most projects launch in ~2 weeks</li>
                    <li>Ongoing management &amp; updates</li>
                  </ul>
                  <Link href="/webdesign" className="btn" data-cursor>Learn More</Link>
                </div>
                <button className="svc-toggle">More info <span className="chev">▾</span></button>
              </div>
            </article>
          </div>
        </div>
        <div className="svc-hint">Drag, scroll, or use the arrows — tap a card for details</div>
      </section>

      <section className="light sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label dark">Trusted by Clients Across the Country</span>
            <h2>Join the leaders working with us.</h2>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-row" id="marqueeRow">
            <div className="m-logo"><img src="/images/logos/logo1.png" alt="Client Logo 1" /></div>
            <div className="m-logo"><img src="/images/logos/logo2.png" alt="Client Logo 2" /></div>
            <div className="m-logo"><img src="/images/logos/logo3.png" alt="Client Logo 3" className="invert" /></div>
            <div className="m-logo"><img src="/images/logos/logo4.png" alt="Client Logo 4" /></div>
            <div className="m-logo"><img src="/images/logos/logo5.png" alt="Client Logo 5" className="scale-up" /></div>
            <div className="m-logo"><img src="/images/logos/logo6.png" alt="Client Logo 6" /></div>
            <div className="m-logo"><img src="/images/logos/logo7.png" alt="Client Logo 7" /></div>
          </div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="glow" style={{ width: '600px', height: '600px', background: 'var(--teal-primary)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head center" data-reveal>
            <span className="label">Wavecare in Numbers</span>
            <h2>Results that speak for themselves.</h2>
          </div>
          <div className="stats stagger">
            <div className="stat"><div className="num" data-count="95">0</div><div className="cap">Happy Clients</div></div>
            <div className="stat"><div className="num" data-count="700">0</div><div className="cap">Assisted Placements</div></div>
            <div className="stat"><div className="num" data-count="2400" data-comma="1">0</div><div className="cap">Smiles Captured</div></div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Why Wavecare</span>
            <h2>Built for the way<br />healthcare actually works.</h2>
            <p className="lead">Sensitivity, compliance, and decision-makers who don&apos;t have time for back-and-forth — we built our workflows around the realities of senior care.</p>
          </div>
          <div className="features stagger">
            <article className="feature" data-cursor>
              <div className="fn">01</div>
              <h3>HIPAA-Conscious by Default</h3>
              <p>Every photoshoot, video, and webpage is planned with privacy and resident dignity at the front. No second-guessing what you can publish.</p>
            </article>
            <article className="feature" data-cursor>
              <div className="fn">02</div>
              <h3>Fast Response, Real Humans</h3>
              <p>Customer service from 8 AM to 8 PM daily. Most projects launch in about two weeks. No drawn-out timelines.</p>
            </article>
            <article className="feature" data-cursor>
              <div className="fn">03</div>
              <h3>Built for Decision-Makers</h3>
              <p>Executive director, marketing manager, or owner — we communicate the way healthcare leaders work. Clear scopes, zero filler.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="glow" style={{ width: '500px', height: '500px', background: 'var(--teal-accent)', top: '-100px', right: '-80px', opacity: 0.28 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head" data-reveal>
            <span className="label">What Our Clients Say</span>
            <h2>Don&apos;t just take<br />our word for it.</h2>
            <p className="lead">See how we&apos;ve helped healthcare providers grow — in their own words.</p>
          </div>
          <div className="tcards stagger">
            <article className="tcard" data-cursor>
              <span className="q">&quot;</span>
              <blockquote>From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.</blockquote>
              <div className="who"><strong>Director</strong>Senior Care Facility</div>
            </article>
            <article className="tcard" data-cursor>
              <span className="q">&quot;</span>
              <blockquote>What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.</blockquote>
              <div className="who"><strong>Marketing Manager</strong>Healthcare Practice</div>
            </article>
            <article className="tcard" data-cursor>
              <span className="q">&quot;</span>
              <blockquote>Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.</blockquote>
              <div className="who"><strong>Operations Lead</strong>Medical Services Provider</div>
            </article>
          </div>
        </div>
      </section>

      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{ justifyContent: 'center' }} data-reveal>Get Started</span>
          <h2 data-reveal>Ready to look as good as<br />the <span className="accent">care</span> you provide?</h2>
          <p className="sub" data-reveal>Tell us about your facility and we&apos;ll show you exactly what we&apos;d build, capture, or design to start bringing in more qualified inquiries.</p>
          <div data-reveal><Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Book a Call</Link></div>
        </div>
      </section>
    </>
  );
}
