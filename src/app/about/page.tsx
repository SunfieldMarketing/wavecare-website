'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function About() {
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

      

      function initReveals() {
        const els = document.querySelectorAll('[data-reveal],.stagger');
        if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
        const io = new IntersectionObserver(es => { es.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); }); }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        els.forEach(e => io.observe(e));
        setTimeout(() => { els.forEach(e => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); }); }, 400);
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

      function initInsight() {
        const host = document.getElementById('insightText'); if (!host) return;
        const words = host.textContent!.trim().split(/\s+/);
        host.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');
        if (gsap && ScrollTrigger && !reduceMotion) {
          gsap.to(host.querySelectorAll('.w'), { opacity: 1, stagger: 0.4, ease: 'none', scrollTrigger: { trigger: '.insight', start: 'top 72%', end: 'bottom 78%', scrub: true } });
        } else {
          host.querySelectorAll('.w').forEach(w => (w as HTMLElement).style.opacity = '1');
        }
      }

      function initAccordion() {
        const panels = document.querySelectorAll('#accordion .acc-panel'); if (!panels.length) return;
        function activate(p: Element) { panels.forEach(x => x.classList.toggle('active', x === p)); }
        panels.forEach(p => {
          p.addEventListener('mouseenter', () => { if (window.matchMedia('(min-width:861px)').matches) activate(p); });
          p.addEventListener('click', () => activate(p));
        });
      }

      function initMarquee() {} // (no marquee on this page)

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

      // Run immediate inits (no libraries needed)
      initChrome();
      initReveals();
        initCount();
        initAccordion();
        initCursor();

        // Wait for animation libraries (up to 4s), then init hero/insight/wave
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
            initInsight();
            initWaveAccent();
            // @ts-ignore
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          }
        }, 50);
    };

    runScripts();
  }, []);

  return (
    <>
      <header className="hero">
        <div className="hero-bg">
          <img src="/images/img_3.jpeg" alt="Caregiver with resident at a senior care facility" />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 42, 36, 0.65)' }}></div>
        </div>
        <div className="container hero-inner" style={{ maxWidth: '1000px' }}>
          <svg className="wave-accent" viewBox="0 0 78 26"><path d="M2 13 Q 12 2, 21 13 T 40 13 T 59 13 T 76 11"/></svg>
          <span className="label" data-hero>About Wavecare</span>
          <h1 style={{ fontSize: 'clamp(42px, 6.5vw, 84px)', lineHeight: '1.1' }} data-hero>
            Your facility gets judged in seconds.<br />
            <span className="accent">We make them count.</span>
          </h1>
          <p className="hero-sub" data-hero>
            For over a decade we've helped hundreds of nursing homes and healthcare operators get
            seen the way they deserve to be seen. This is why we built Wavecare.
          </p>
          <div className="hero-actions" data-hero>
            <Link href="/contact" className="btn" data-magnetic data-cursor>Book a Call</Link>
            <Link href="#story" className="btn btn-ghost" data-magnetic data-cursor>Our Story</Link>
          </div>
        </div>
        <div className="scroll-cue"><div className="m"></div><span>Scroll</span></div>
      </header>

      <section className="ink sec-pad" id="story">
        <div className="glow" style={{ width: '520px', height: '520px', background: 'var(--teal-primary)', top: '-120px', left: '-140px' }}></div>
        <div className="container">
          <div className="story">
            <div data-reveal>
              <span className="label">Why We Exist</span>
              <h2>Ten years. Hundreds of facilities. One problem.</h2>
              <p>Over the past ten years, we've worked with hundreds of nursing homes and healthcare operators across the country. And honestly, most of them had the same problem — they weren't being seen the way they deserved to be seen.</p>
              <p>From a broken website to a video from the 90s, we've seen it all. Nothing says <em>"we'll take great care of your loved one"</em> like an online experience that feels clear, trustworthy, and easy from start to finish.</p>
              <p>So we built Wavecare — to showcase quality of care in the light it deserves.</p>
              <Link href="#services" className="btn" data-magnetic data-cursor style={{ marginTop: '14px' }}>What We Do</Link>
            </div>
            <div className="story-img" data-reveal data-cursor>
              <img src="/images/img_3.jpeg" alt="Caregiver supporting a resident" />
            </div>
          </div>
        </div>
      </section>

      <section className="insight deep sec-pad">
        <div className="glow" style={{ width: '560px', height: '560px', background: 'var(--teal-accent)', bottom: '-160px', right: '-120px', opacity: 0.3 }}></div>
        <div className="container">
          <span className="label">The Stakes</span>
          <p className="big" id="insightText">Families are making one of the biggest decisions of their lives — and your facility gets judged in seconds. We make those seconds count.</p>
          <p className="foot" data-reveal>When families come across your community, it's about trust. It's about confidence. It's about that moment where they say: yeah, this feels right.</p>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">What We Optimize For</span>
            <h2>Trust. Confidence.<br />That "this feels right" moment.</h2>
          </div>
          <div className="values stagger">
            <article className="value" data-cursor>
              <div className="vmark">01</div><h3>Trust</h3>
              <p>Every visual, page, and frame is built to make a family feel safe handing you one of the biggest decisions of their lives.</p>
            </article>
            <article className="value" data-cursor>
              <div className="vmark">02</div><h3>Confidence</h3>
              <p>We showcase your quality of care in the light it deserves — branding, video, and high-converting websites that hold up to scrutiny.</p>
            </article>
            <article className="value" data-cursor>
              <div className="vmark">03</div><h3>The Right Fit</h3>
              <p>We optimize the entire journey to get more suitable residents through your doors — not just clicks, but the right families saying yes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="glow" style={{ width: '600px', height: '600px', background: 'var(--teal-primary)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head center" data-reveal><span className="label">A Decade of Results</span><h2>The numbers behind the work.</h2></div>
          <div className="stats four stagger">
            <div className="stat"><div className="num" data-count="10">0</div><div className="cap">Years Experience</div></div>
            <div className="stat"><div className="num" data-count="500" data-suffix="+">0</div><div className="cap">Facilities Served</div></div>
            <div className="stat"><div className="num" data-count="700">0</div><div className="cap">Assisted Placements</div></div>
            <div className="stat"><div className="num" data-count="2400" data-comma="1">0</div><div className="cap">Smiles Captured</div></div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad" id="services">
        <div className="container">
          <div className="svc-head" data-reveal>
            <span className="label">What We Do</span>
            <h2>Everything your brand needs.</h2>
          </div>
          <div className="accordion" id="accordion">
            <article className="acc-panel active" data-cursor>
              <img src="/images/brand_photoshoots.jpg" alt="Brand & photoshoots" /><span className="acc-num">01</span>
              <div className="acc-content">
                <div className="acc-title">Brand &amp; Photoshoots</div>
                <div className="acc-body-wrap">
                  <p className="acc-tag">Build instant trust with a clean, modern healthcare look.</p>
                  <div className="acc-detail"><span>Facility &amp; lifestyle</span><span>Staff portraits</span><span>HIPAA-conscious</span></div>
                  <div className="acc-cta"><Link href="/photoservices" className="btn" data-cursor>Learn More</Link></div>
                </div>
              </div>
            </article>
            <article className="acc-panel" data-cursor>
              <img src="/images/video_production.jpg" alt="Video production" /><span className="acc-num">02</span>
              <div className="acc-content">
                <div className="acc-title">Video Production</div>
                <div className="acc-body-wrap">
                  <p className="acc-tag">Short-form &amp; explainer videos that turn views into booked calls.</p>
                  <div className="acc-detail"><span>Commercials</span><span>Facility tours</span><span>Social cuts</span></div>
                  <div className="acc-cta"><Link href="/videoservices" className="btn" data-cursor>Learn More</Link></div>
                </div>
              </div>
            </article>
            <article className="acc-panel" data-cursor>
              <img src="/images/design_print_2.jpg" alt="Design & print" /><span className="acc-num">03</span>
              <div className="acc-content">
                <div className="acc-title">Design &amp; Print</div>
                <div className="acc-body-wrap">
                  <p className="acc-tag">Patient-ready brochures, banners, menus, and signage.</p>
                  <div className="acc-detail"><span>Brochures</span><span>Signage</span><span>Stationery</span></div>
                  <div className="acc-cta"><Link href="/design-print" className="btn" data-cursor>Learn More</Link></div>
                </div>
              </div>
            </article>
            <article className="acc-panel" data-cursor>
              <img src="/images/img_6.jpeg" alt="Web design & management" /><span className="acc-num">04</span>
              <div className="acc-content">
                <div className="acc-title">Web Design &amp; Management</div>
                <div className="acc-body-wrap">
                  <p className="acc-tag">Fast, conversion-first websites that generate inquiries daily.</p>
                  <div className="acc-detail"><span>Mobile-first</span><span>SEO + GBP</span><span>~2-week launch</span></div>
                  <div className="acc-cta"><Link href="/webdesign" className="btn" data-cursor>Learn More</Link></div>
                </div>
              </div>
            </article>
          </div>
          <div className="acc-hint">Hover or tap a panel to explore</div>
        </div>
      </section>

      <section className="deep sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">See For Yourself</span>
            <h2>Our story, in our own words.</h2>
          </div>
          <div className="reel-wrap" data-reveal data-cursor>
            <div className="reel-frame">
              <iframe src="https://player.vimeo.com/video/1187767005?title=0&byline=0&portrait=0&quality=1080p" allow="autoplay; fullscreen; picture-in-picture" title="Wavecare Commercial"></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="ink sec-pad">
        <div className="glow" style={{ width: '500px', height: '500px', background: 'var(--teal-accent)', top: '-100px', right: '-80px', opacity: 0.22 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sec-head" data-reveal>
            <span className="label">What Our Clients Say</span>
            <h2>Don't just take<br />our word for it.</h2>
            <p className="lead">See how we've helped healthcare providers grow — in their own words.</p>
          </div>
          <div className="tcards stagger">
            <article className="tcard" data-cursor><span className="q">"</span><blockquote>From the first call, their team understood our facility, our audience, and the sensitivity required in healthcare. The visuals, website updates, and overall branding helped us look more professional and trustworthy. We started receiving better-quality inquiries within weeks.</blockquote><div className="who"><strong>Director</strong>Senior Care Facility</div></article>
            <article className="tcard" data-cursor><span className="q">"</span><blockquote>What stood out most was their attention to detail and communication. They handled everything from creative direction to execution smoothly. The final results exceeded our expectations, especially the photos and website presentation.</blockquote><div className="who"><strong>Marketing Manager</strong>Healthcare Practice</div></article>
            <article className="tcard" data-cursor><span className="q">"</span><blockquote>Wavecare feels more like a partner than a vendor. They took time to understand our goals and delivered solutions that actually made an impact. Their experience in healthcare marketing really shows.</blockquote><div className="who"><strong>Operations Lead</strong>Medical Services Provider</div></article>
          </div>
        </div>
      </section>

      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container">
          <span className="label" style={{ justifyContent: 'center' }} data-reveal>Get Started</span>
          <h2 data-reveal>Let's make your<br />seconds <span className="accent">count.</span></h2>
          <p className="sub" data-reveal>Tell us about your facility and we'll show you exactly what we'd build, capture, or design to start bringing the right families through your doors.</p>
          <div data-reveal><Link href="/contact" className="btn btn-light" data-magnetic data-cursor>Book a Call</Link></div>
        </div>
      </section>
    </>
  );
}

