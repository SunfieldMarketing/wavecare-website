'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import '../subservices.css';

export default function WebDesign() {
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

      function initCount() {
        const els = document.querySelectorAll('[data-count]');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!('IntersectionObserver' in window)) {
          els.forEach(el => {
            const c = el.getAttribute('data-comma') === '1', t = +el.getAttribute('data-count')!;
            const p = el.getAttribute('data-prefix') || '', s = el.getAttribute('data-suffix') || '';
            el.textContent = p + (c ? t.toLocaleString() : t) + s;
          });
          return;
        }
        const io = new IntersectionObserver(es => {
          es.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            const target = +(el.getAttribute('data-count') || 0), comma = el.getAttribute('data-comma') === '1', dur = reduceMotion ? 0 : 1700, t0 = performance.now();
            const p = el.getAttribute('data-prefix') || '', s = el.getAttribute('data-suffix') || '';
            (function step(now) {
              const k = dur ? Math.min((now - t0) / dur, 1) : 1;
              const e = 1 - Math.pow(1 - k, 3);
              const v = Math.floor(target * e);
              el.textContent = p + (comma ? v.toLocaleString() : v) + s;
              if (k < 1) requestAnimationFrame(step);
              else el.textContent = p + (comma ? target.toLocaleString() : target) + s;
            })(performance.now());
          });
        }, { threshold: 0.25 });
        els.forEach(el => io.observe(el));
      }

      function initWaveAccent(){
        const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement;
        // @ts-ignore
        if (!canvas || !window.THREE) { if(canvas) canvas.style.background='radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)'; return; }
        let renderer: any; 
        try { 
          // @ts-ignore
          renderer = new window.THREE.WebGLRenderer({canvas, antialias:true, alpha:true}); 
        } catch(e) { canvas.style.display='none'; return; }
        const sec = canvas.parentElement!;
        function size() { return [sec.clientWidth, sec.clientHeight]; }
        renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
        let [w,h] = size(); renderer.setSize(w,h);
        // @ts-ignore
        const scene = new window.THREE.Scene(), cam = new window.THREE.OrthographicCamera(-1,1,1,-1,0,1);
        // @ts-ignore
        const uniforms = {uTime:{value:0},uRes:{value:new window.THREE.Vector2(w,h)},uMouse:{value:new window.THREE.Vector2(0.5,0.5)}};
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
        // @ts-ignore
        const mat = new window.THREE.ShaderMaterial({uniforms,fragmentShader:frag, vertexShader:`varying vec2 vUv; void main(){vUv=uv; gl_Position=vec4(position,1.0);}`});
        // @ts-ignore
        scene.add(new window.THREE.Mesh(new window.THREE.PlaneGeometry(2,2),mat));
        let t0 = performance.now(), req: number;
        function render(){ const t=(performance.now()-t0)*0.001; uniforms.uTime.value=t; renderer.render(scene,cam); req=requestAnimationFrame(render); }
        const io = new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) render(); else cancelAnimationFrame(req); }); },{threshold:0});
        io.observe(sec);
        addEventListener('resize',()=>{ [w,h]=size(); renderer.setSize(w,h); uniforms.uRes.value.set(w,h); },{passive:true});
        sec.addEventListener('mousemove',e=>{ const r=sec.getBoundingClientRect(); uniforms.uMouse.value.set((e.clientX-r.left)/w, 1.0-(e.clientY-r.top)/h); },{passive:true});
      }

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger && window.THREE) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initCount();
          initWaveAccent();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
          initCount();
          initWaveAccent();
        }
      }, 50);
    };

    runScripts();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .mock-window { width: 100%; height: 100%; background: transparent; padding: 20px 16px; position: relative; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .tcard .mock-window { height: 180px; }
        .mock-top { position: absolute; top: 0; left: 0; right: 0; height: 16px; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; padding-left: 8px; gap: 4px; }
        .mock-top span { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.2); }
        
        .anim-design { display: flex; gap: 8px; height: 100%; padding: 12px; }
        .anim-design .sidebar { width: 30%; background: rgba(255,255,255,0.05); border-radius: 4px; height: 100%; transition: all 0.4s; }
        .anim-design .main { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .anim-design .header { height: 24px; background: rgba(255,255,255,0.05); border-radius: 4px; transition: all 0.4s 0.1s; }
        .anim-design .grid-boxes { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; flex: 1; }
        .anim-design .grid-boxes div { background: rgba(255,255,255,0.02); border-radius: 4px; transition: all 0.4s 0.2s; }

        .anim-dev { display: flex; flex-direction: column; gap: 6px; height: 100%; padding: 16px; position: relative; overflow: hidden; }
        .anim-dev .code-line { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; transition: all 0.3s; }
        .anim-dev .w-full { width: 100%; } .anim-dev .w-2-3 { width: 66%; } .anim-dev .w-1-2 { width: 50%; } .anim-dev .w-1-3 { width: 33%; } .anim-dev .w-3-4 { width: 75%; }
        .anim-dev .ml-4 { margin-left: 12px; } .anim-dev .ml-8 { margin-left: 24px; }
        .anim-dev .code-brackets { position: absolute; right: 16px; bottom: 16px; font-family: monospace; font-size: 24px; color: rgba(255,255,255,0.1); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }

        .anim-manage { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; }
        .anim-manage .gear-icon { color: rgba(255,255,255,0.2); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .anim-manage .status-badge { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; transition: all 0.4s; }

        .anim-seo { display: flex; align-items: center; justify-content: center; height: 100%; position: relative; }
        .anim-seo .bars { display: flex; align-items: flex-end; gap: 6px; height: 44px; margin-bottom: 12px; }
        .anim-seo .bar { width: 14px; background: rgba(255,255,255,0.1); border-radius: 3px 3px 0 0; }
        .anim-seo .bar:nth-child(1) { height: 30%; }
        .anim-seo .bar:nth-child(2) { height: 45%; }
        .anim-seo .bar:nth-child(3) { height: 60%; }
        .anim-seo .bar:nth-child(4) { height: 80%; }
        .anim-seo .bar:nth-child(5) { height: 100%; }
        .anim-seo .cursor-arrow { position: absolute; bottom: 15px; right: 30px; transform: rotate(-15deg); }

        .anim-content { display: flex; align-items: center; justify-content: center; height: 100%; gap: 16px; padding: 0 16px; }
        .anim-content .content-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .anim-content .cline { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; transition: all 0.4s; }
        .anim-content .w-3-4 { width: 75%; } .anim-content .w-full { width: 100%; } .anim-content .w-5-6 { width: 83%; }
        .anim-content .content-img { width: 36px; height: 36px; background: rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }

        .anim-hosting { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; position: relative; }
        .anim-hosting .url-bar { background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 20px; font-size: 11px; color: rgba(255,255,255,0.6); font-family: monospace; border: 1px solid rgba(255,255,255,0.08); transition: all 0.3s; z-index: 2; }
        .anim-hosting .server-icon { color: rgba(255,255,255,0.4); position: absolute; bottom: 20px; transition: all 0.3s; z-index: 1; }
        .anim-hosting .check-mark { position: absolute; bottom: 16px; color: var(--teal-bright); display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(95,208,191,0.1); border-radius: 50%; border: 1px solid rgba(95,208,191,0.2); transform: scale(0); opacity: 0; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s; z-index: 1; }

        /* Hover animations */
        .tcard:hover .anim-design .sidebar { background: rgba(95,208,191,0.2); width: 35%; }
        .tcard:hover .anim-design .header { background: rgba(95,208,191,0.15); }
        .tcard:hover .anim-design .grid-boxes div { background: rgba(95,208,191,0.1); }
        .tcard:hover .anim-design .grid-boxes div:nth-child(odd) { transform: translateY(-4px); }
        .tcard:hover .anim-design .grid-boxes div:nth-child(even) { transform: translateY(4px); }

        .tcard:hover .anim-dev .code-line { background: rgba(95,208,191,0.3); transform: translateX(8px); }
        .tcard:hover .anim-dev .code-line:nth-child(2) { transition-delay: 0.05s; }
        .tcard:hover .anim-dev .code-line:nth-child(3) { transition-delay: 0.1s; }
        .tcard:hover .anim-dev .code-line:nth-child(4) { transition-delay: 0.15s; }
        .tcard:hover .anim-dev .code-line:nth-child(5) { transition-delay: 0.2s; }
        .tcard:hover .anim-dev .code-brackets { color: var(--teal-bright); transform: scale(1.4) rotate(-10deg); }

        .tcard:hover .anim-manage .gear-icon { color: var(--teal-bright); transform: rotate(180deg) scale(1.2); }
        .tcard:hover .anim-manage .status-badge { background: rgba(95,208,191,0.15); color: var(--teal-bright); box-shadow: 0 0 10px rgba(95,208,191,0.3); }

        .tcard:hover .anim-seo .bar { background: var(--teal-bright); }
        .tcard:hover .anim-seo .bar:nth-child(1) { transition-delay: 0s; }
        .tcard:hover .anim-seo .bar:nth-child(2) { transition-delay: 0.05s; }
        .tcard:hover .anim-seo .bar:nth-child(3) { transition-delay: 0.1s; }
        .tcard:hover .anim-seo .bar:nth-child(4) { transition-delay: 0.15s; }
        .tcard:hover .anim-seo .bar:nth-child(5) { transition-delay: 0.2s; }
        .tcard:hover .anim-seo .cursor-arrow { transform: translate(-8px, -8px) scale(0.9); }

        .tcard:hover .anim-content .cline { background: rgba(95,208,191,0.4); }
        .tcard:hover .anim-content .cline:nth-child(1) { width: 100%; transition-delay: 0s; }
        .tcard:hover .anim-content .cline:nth-child(2) { width: 85%; transition-delay: 0.1s; }
        .tcard:hover .anim-content .cline:nth-child(3) { width: 90%; transition-delay: 0.2s; }
        .tcard:hover .anim-content .content-img { background: rgba(95,208,191,0.15); color: var(--teal-bright); transform: scale(1.15) rotate(5deg); }

        .tcard:hover .anim-hosting .server-icon { transform: scale(0); opacity: 0; }
        .tcard:hover .anim-hosting .check-mark { transform: scale(1); opacity: 1; }
        .tcard:hover .anim-hosting .url-bar { background: rgba(95,208,191,0.1); border-color: rgba(95,208,191,0.3); color: #fff; transform: translateY(-8px); }
      
        /* Wireframes for Before/After */
        .wire-bg { width: 100%; height: 100%; background: #fff; padding: 20px; border-radius: 8px; }
        .wire-bg.ugly { background: #e0e0e0; }
        .wire-bg.ugly .w-head { height: 20px; background: #999; margin-bottom: 20px; }
        .wire-bg.ugly .w-hero { height: 80px; background: #ccc; margin-bottom: 20px; }
        .wire-bg.ugly .w-line { height: 12px; background: #bbb; margin-bottom: 8px; width: 100%; }
        .wire-bg.ugly .w-line.short { width: 60%; }
        
        .wire-bg.modern { background: #08211c; border: 1px solid rgba(255,255,255,0.1); }
        .wire-bg.modern .w-head { height: 20px; background: rgba(95,208,191,0.1); border-radius: 4px; margin-bottom: 20px; width: 40%; }
        .wire-bg.modern .w-hero { height: 80px; background: rgba(95,208,191,0.3); border-radius: 8px; margin-bottom: 20px; }
        .wire-bg.modern .w-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .wire-bg.modern .w-card { height: 40px; background: rgba(255,255,255,0.05); border-radius: 6px; }

        .err-pulse { width: 16px; height: 16px; border-radius: 50%; border: 1px solid #ff5252; color: #ff5252; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; background: #062A24; animation: pulseRed 2s infinite; }
        @keyframes pulseRed { 0% { box-shadow: 0 0 0 0 rgba(255,82,82,0.4); } 70% { box-shadow: 0 0 0 6px rgba(255,82,82,0); } 100% { box-shadow: 0 0 0 0 rgba(255,82,82,0); } }
        .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal-bright); animation: pulseGreen 2s infinite; }
        
        .five-things { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        @media (max-width: 1024px) { .five-things { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); } }
      `}} />

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
              <h1>Websites that earn trust and drive <span className="accent">admissions.</span></h1>
              <p className="phero-sub">Modern healthcare websites designed specifically for nursing homes, assisted living communities, rehabilitation centers, and healthcare organizations.</p>
              <div className="btn-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn">Get a Website Audit &rarr;</Link>
                <div style={{ textAlign: 'center' }}>
                  <Link href="/case-studies" className="btn" data-magnetic>View Website Examples &rarr;</Link>
                </div>
              </div>
            </div>
            <div className="hero-device-wrap" data-reveal>
              <div className="hero-device laptop">
                <div className="resp-tag">Responsive</div>
                <div className="dev-header">
                  <div className="logo"></div>
                  <div className="menu"><span></span><span></span><span></span></div>
                </div>
                <div className="dev-hero">
                  <div className="text">
                    <div className="line"></div>
                    <div className="line short"></div>
                    <div className="line dim"></div>
                  </div>
                  <div className="img"></div>
                </div>
                <div className="dev-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="card"></div>
                  <div className="card"></div>
                  <div className="card"></div>
                </div>
                <div className="dev-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF ========== */}
      <div className="social-proof-banner" style={{ textAlign: 'center', padding: '14px 20px', background: '#051A16', borderTop: '1px solid #0a2e26', borderBottom: '1px solid #0a2e26' }}>
        <p style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)', maxWidth: '800px', margin: '0 auto', textTransform: 'none', fontWeight: '500' }}>Trusted by healthcare providers improving their online presence, increasing inquiries, and modernizing their brand experience.</p>
      </div>



      {/* ========== WHY YOUR WEBSITE MATTERS ========== */}
      <section className="panel dp-why" style={{ padding: '120px 0' }}>
        <div className="container">
          <div className="phero-in" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div data-reveal>
              <span className="label">Why Your Website Matters</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}>Families decide in <br/><span className="accent" style={{ fontStyle: 'italic' }}>seconds.</span></h2>
              <p className="lead" style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '480px' }}>
                An outdated website creates uncertainty. A professional one builds confidence before the first phone call &mdash; it should build trust immediately, communicate services clearly, showcase your team, improve search visibility, and generate more inquiries.
              </p>
            </div>
            <div className="ba-slider" ref={sliderRef} style={{ maxWidth: '560px', margin: '0 auto', aspectRatio: '16/10' }} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handleBaDrag(e); }} onPointerMove={(e) => { if (e.buttons > 0) handleBaDrag(e); }} data-reveal>
              <div className="ba-before">
                <img src="/images/evolve-before.png" alt="Evolve Therapy Services Before Website" style={{ width: '100%' }} />
              </div>
              <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${baPos}%)` }}>
                <img src="/images/evolve-after.png" alt="Evolve Therapy Services After Website" style={{ width: '100%' }} />
              </div>
              <div className="ba-handle" style={{ left: `${baPos}%` }}>
                <div className="ba-handle-line"></div>
                <div className="ba-handle-button">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5l7 7-7 7M5 12h14"/></svg>
                </div>
              </div>
              <div className="ba-tags"><span className="btag">BEFORE</span><span className="atag">AFTER</span></div>
              <p className="ba-caption center" data-reveal style={{ marginTop: '24px', fontSize: '11px', textAlign: 'center', opacity: 0.6 }}>Drag &mdash; left is a typical dated healthcare site, right is a modern Wavecare build.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EVERYTHING YOUR SITE NEEDS ========== */}
      <section className="panel deep sec-pad">
        <div className="container container-wide">
          <div className="sec-head center" data-reveal>
            <span className="label">Capabilities</span>
            <h2>Everything your site needs, <span className="lite">handled.</span></h2>
          </div>
          
          <div className="types-grid stagger">
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="design">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-design">
                   <div className="sidebar"></div>
                   <div className="main">
                     <div className="header"></div>
                     <div className="grid-boxes">
                       <div></div><div></div><div></div><div></div>
                     </div>
                   </div>
                 </div>
              </div>
              <div className="body"><h3>Website Design</h3><p>Custom healthcare-focused design built around your brand and goals.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="dev">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-dev">
                   <div className="code-line w-full"></div>
                   <div className="code-line w-2-3 ml-4"></div>
                   <div className="code-line w-1-2 ml-8"></div>
                   <div className="code-line w-1-3 ml-8"></div>
                   <div className="code-line w-3-4 ml-4"></div>
                   <div className="code-brackets">{'</>'}</div>
                 </div>
              </div>
              <div className="body"><h3>Website Development</h3><p>Fast, responsive websites optimized for desktop, tablet, and mobile.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="management">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-manage">
                   <div className="gear-icon">
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                   </div>
                   <div className="status-badge">Healthy</div>
                 </div>
              </div>
              <div className="body"><h3>Website Management</h3><p>Ongoing updates, content changes, maintenance, and support.</p></div>
            </div>
            <div className="tcard" data-cat="all">
                <div className="thumb mock-window" data-label="seo">
                   <div className="mock-top"><span></span><span></span><span></span></div>
                   <div className="anim-seo">
                     <div className="bars">
                       <div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div>
                     </div>
                     <div className="cursor-arrow">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--teal-bright)" stroke="#062a24" strokeWidth="1.5"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                     </div>
                   </div>
                </div>
                <div className="body"><h3>SEO Foundations</h3><p>Technical setup and optimization to help improve search visibility.</p></div>
              </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="content">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-content">
                   <div className="content-lines">
                     <div className="cline w-3-4"></div>
                     <div className="cline w-full"></div>
                     <div className="cline w-5-6"></div>
                   </div>
                   <div className="content-img">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                   </div>
                 </div>
              </div>
              <div className="body"><h3>Content Strategy</h3><p>Clear messaging that helps families quickly find what they need.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="hosting">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-hosting">
                   <div className="url-bar">https://yourfacility.com</div>
                   <div className="server-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                   </div>
                   <div className="check-mark">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                   </div>
                 </div>
              </div>
              <div className="body"><h3>Hosting &amp; Performance</h3><p>Reliable hosting and monitoring to keep your site running smoothly.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT MAKES A GREAT HEALTHCARE WEBSITE ========== */}
      <section className="panel sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">WHAT MAKES A GREAT HEALTHCARE WEBSITE</span>
            <h2>Five things we never <span className="accent" style={{ fontStyle: 'italic' }}>skip.</span></h2>
          </div>
          
          <div className="five-things stagger" style={{ marginBottom: '80px' }}>
            <div className="ft-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(95,208,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-bright)' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
               </div>
               <div>
                 <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Easy Navigation</h4>
                 <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>Families can quickly find important information.</p>
               </div>
            </div>
            <div className="ft-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(95,208,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-bright)' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
               </div>
               <div>
                 <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Thoughtful Design</h4>
                 <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>Creates confidence and credibility.</p>
               </div>
            </div>
            <div className="ft-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(95,208,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-bright)' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" rx="2" ry="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
               </div>
               <div>
                 <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Mobile Friendly</h4>
                 <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>Works seamlessly across all devices.</p>
               </div>
            </div>
            <div className="ft-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(95,208,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-bright)' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
               <div>
                 <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Clear Calls-to-Action</h4>
                 <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>Encourages visitors to contact your team.</p>
               </div>
            </div>
            <div className="ft-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(95,208,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-bright)' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </div>
               <div>
                 <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Search Optimized</h4>
                 <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>Helps residents and families find you online.</p>
               </div>
            </div>
          </div>

          <div className="stats stagger" style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', textAlign: 'center' }}>
            <div className="stat"><div className="num" data-count="3" data-suffix=".5x" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--teal-bright)', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '16px' }}>0</div><div className="lbl" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>more organic traffic after a professional rebuild</div></div>
            <div className="stat"><div className="num" data-count="72" data-suffix="%" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--teal-bright)', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '16px' }}>0</div><div className="lbl" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>of tours start from a mobile device</div></div>
            <div className="stat"><div className="num" data-prefix="&lt;" data-count="2" data-suffix="s" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--teal-bright)', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '16px' }}>0</div><div className="lbl" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>load time optimization across the board</div></div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="panel ink sec-pad" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center' }}>
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="label">Our Process</span>
            <h2>From audit to <span className="accent">always-on.</span></h2>
            <p className="sub" style={{ marginTop: '18px' }}>We don't just hand you a website and disappear. We manage the entire lifecycle.</p>
          </div>
          
          <div className="proc-tabs" data-reveal>
            <div className={`proc-tab ${procTab === 0 ? 'on' : ''}`} onMouseEnter={() => setProcTab(0)} onClick={() => setProcTab(0)}>
              <span className="pnum">01</span><span className="pname">Audit</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 1 ? 'on' : ''}`} onMouseEnter={() => setProcTab(1)} onClick={() => setProcTab(1)}>
              <span className="pnum">02</span><span className="pname">Design</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 2 ? 'on' : ''}`} onMouseEnter={() => setProcTab(2)} onClick={() => setProcTab(2)}>
              <span className="pnum">03</span><span className="pname">Build</span><span className="pbar"></span>
            </div>
            <div className={`proc-tab ${procTab === 3 ? 'on' : ''}`} onMouseEnter={() => setProcTab(3)} onClick={() => setProcTab(3)}>
              <span className="pnum">04</span><span className="pname">Manage</span><span className="pbar"></span>
            </div>
          </div>
          
          <div className="proc-panel-wrap" data-reveal>
            <div className="proc-monitor">
              <div className="proc-detail">
                <div className={`step ${procTab === 0 ? 'on' : ''}`}>
                  <h3>Audit</h3><p>We review your current website, identify opportunities and problems, and create a strategic plan.</p>
                </div>
                <div className={`step ${procTab === 1 ? 'on' : ''}`}>
                  <h3>Design</h3><p>We create a modern website experience tailored to your facility and audience.</p>
                </div>
                <div className={`step ${procTab === 2 ? 'on' : ''}`}>
                  <h3>Build</h3><p>Our team develops and launches your website with performance and usability in mind.</p>
                </div>
                <div className={`step ${procTab === 3 ? 'on' : ''}`}>
                  <h3>Manage</h3><p>We provide ongoing support, updates, and improvements after launch &mdash; so it keeps performing.</p>
                </div>
              </div>
              
              <div className="proc-screen">
                <div className="frame" style={{ opacity: 1, position: 'relative', overflow: 'hidden', background: '#062A24', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', height: '100%', minHeight: '360px' }}>
                   {/* Shared Browser Top */}
                   <div className="mock-top" style={{ position: 'relative' }}>
                      <span></span><span></span><span></span>
                      <div style={{ marginLeft: '12px', background: 'rgba(95,208,191,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', color: 'var(--teal-bright)', fontFamily: 'monospace' }}>yourfacility.org</div>
                   </div>
                   
                   <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, bottom: 0, padding: '20px' }}>
                     {/* TAB 0: Audit */}
                     <div style={{ opacity: procTab === 0 ? 1 : 0, pointerEvents: procTab === 0 ? 'auto' : 'none', transition: 'opacity 0.4s', position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ position: 'absolute', right: 0, top: '-36px', fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '1px' }}>AUDIT</div>
                        <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', position: 'relative' }}><div className="err-pulse" style={{ position: 'absolute', top: '-10px', left: '20px' }}>!</div></div>
                        <div style={{ height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', position: 'relative' }}><div className="err-pulse" style={{ position: 'absolute', bottom: '-10px', right: '40px' }}>!</div></div>
                        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '100%' }}></div>
                        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '60%', position: 'relative' }}><div className="err-pulse" style={{ position: 'absolute', top: '0', left: '40px' }}>!</div></div>
                     </div>

                     {/* TAB 1: Design */}
                     <div style={{ opacity: procTab === 1 ? 1 : 0, pointerEvents: procTab === 1 ? 'auto' : 'none', transition: 'opacity 0.4s', position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ position: 'absolute', right: 0, top: '-36px', fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '1px' }}>WIREFRAME</div>
                        <div style={{ height: '24px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }}></div>
                        <div style={{ height: '60px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }}></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                           <div style={{ height: '24px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }}></div>
                           <div style={{ height: '24px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }}></div>
                        </div>
                        <div style={{ height: '30px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }}></div>
                     </div>

                     {/* TAB 2: Build */}
                     <div style={{ opacity: procTab === 2 ? 1 : 0, pointerEvents: procTab === 2 ? 'auto' : 'none', transition: 'opacity 0.4s', position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ position: 'absolute', right: 0, top: '-36px', fontSize: '9px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '1px' }}>BUILD</div>
                        <div style={{ height: '24px', background: 'rgba(95,208,191,0.2)', borderRadius: '4px' }}></div>
                        <div style={{ height: '60px', background: 'rgba(95,208,191,0.4)', borderRadius: '4px' }}></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                           <div style={{ height: '24px', background: 'rgba(95,208,191,0.2)', borderRadius: '4px' }}></div>
                           <div style={{ height: '24px', background: 'rgba(95,208,191,0.2)', borderRadius: '4px' }}></div>
                        </div>
                     </div>

                     {/* TAB 3: Manage */}
                     <div style={{ opacity: procTab === 3 ? 1 : 0, pointerEvents: procTab === 3 ? 'auto' : 'none', transition: 'opacity 0.4s', position: 'absolute', inset: '20px' }}>
                        <div style={{ position: 'absolute', right: 0, top: '-36px', fontSize: '9px', background: 'rgba(95,208,191,0.1)', color: 'var(--teal-bright)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(95,208,191,0.2)', letterSpacing: '1px' }}>LIVE & MANAGED</div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                           <span style={{ fontSize: '9px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-bright)' }}><span className="live-dot"></span> LIVE - 99.9% UPTIME</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '12px' }}>
                              <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--teal-bright)' }}>+38%</div>
                              <div style={{ fontSize: '8px', letterSpacing: '1px', opacity: 0.6 }}>INQUIRIES</div>
                           </div>
                           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '12px' }}>
                              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>1.2s</div>
                              <div style={{ fontSize: '8px', letterSpacing: '1px', opacity: 0.6 }}>LOAD TIME</div>
                           </div>
                           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '12px' }}>
                              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>A+</div>
                              <div style={{ fontSize: '8px', letterSpacing: '1px', opacity: 0.6 }}>SEO HEALTH</div>
                           </div>
                           <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '12px' }}>
                              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>24/7</div>
                              <div style={{ fontSize: '8px', letterSpacing: '1px', opacity: 0.6 }}>MONITORING</div>
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED WEBSITE SHOWCASE ========== */}
      <section className="panel sec-pad">
        <div className="container">
          <div className="sec-head center" data-reveal>
            <span className="label">FEATURED WEBSITE SHOWCASE</span>
            <h2>Recent <span className="accent" style={{ fontStyle: 'italic' }}>healthcare</span> sites.</h2>
          </div>
          <div className="feat-grid stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            <div className="feat-card" style={{ background: 'transparent' }}>
              <div className="mock-window" style={{ position: 'relative', aspectRatio: '16/10', background: 'radial-gradient(circle at center, rgba(95,208,191,0.15) 0%, #062a24 70%)', overflow: 'hidden' }}>
                <div className="mock-top">
                  <span></span><span></span><span></span>
                  <div style={{ marginLeft: '12px', fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>[REPLACE - project URL]</div>
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '12px', letterSpacing: '1px' }}>HOMEPAGE SCREENSHOT [REPLACE]</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 24px', background: 'linear-gradient(to top, rgba(6,42,36,0.95) 0%, transparent 100%)' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff' }}>[REPLACE &mdash; Facility name]</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Website Design &amp; Build &middot; [REPLACE summary]</p>
                </div>
              </div>
            </div>
            <div className="feat-card" style={{ background: 'transparent' }}>
              <div className="mock-window" style={{ position: 'relative', aspectRatio: '16/10', background: 'radial-gradient(circle at center, rgba(95,208,191,0.15) 0%, #062a24 70%)', overflow: 'hidden' }}>
                <div className="mock-top">
                  <span></span><span></span><span></span>
                  <div style={{ marginLeft: '12px', fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>[REPLACE - project URL]</div>
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '12px', letterSpacing: '1px' }}>HOMEPAGE SCREENSHOT [REPLACE]</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 24px', background: 'linear-gradient(to top, rgba(6,42,36,0.95) 0%, transparent 100%)' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff' }}>[REPLACE &mdash; Facility name]</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Website Design &amp; Build &middot; [REPLACE summary]</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }} data-reveal>
            <Link href="#portfolio" className="btn btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>View Website Examples &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="container" data-reveal style={{ textAlign: 'center' }}>
          <span className="label" style={{ display: 'inline-block', marginBottom: '24px' }}>Are you losing tours online?</span>
          <h2>See how your website really <span className="accent">performs.</span></h2>
          <p className="sub">Let's look at your current site. We'll show you where you're losing traffic, how families perceive your brand online, and exactly how we'd fix it.</p>
          <Link href="/contact" className="btn btn-light">Get Your Free Website Audit</Link>
        </div>
      </section>
    </>
  );
}



