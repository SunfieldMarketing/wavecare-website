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

      let retryCount = 0;
      const checkScripts = setInterval(() => {
        retryCount++;
        // @ts-ignore
        if (window.gsap && window.ScrollTrigger) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
        } else if (retryCount > 100) {
          clearInterval(checkScripts);
          initReveals();
          initHeroWall();
        }
      }, 50);
    };

    runScripts();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .mock-window { width: 100%; height: 100%; background: #08211c; border-radius: 8px 8px 0 0; padding: 20px 16px; position: relative; border: 1px solid rgba(255,255,255,0.05); }
        .mock-top { position: absolute; top: 0; left: 0; right: 0; height: 16px; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; padding-left: 8px; gap: 4px; }
        .mock-top span { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.2); }
        
        .anim-design { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 100%; padding-top: 12px; }
        .anim-design div { background: rgba(95,208,191,0.1); border-radius: 4px; animation: pulseOp 2s infinite alternate; }
        .anim-design div:first-child { grid-column: span 2; height: 30px; }
        @keyframes pulseOp { 0% { opacity: 0.5; } 100% { opacity: 1; } }
        
        .anim-dev { padding-top: 12px; }
        .anim-dev .line { height: 6px; background: rgba(255,255,255,0.1); margin-bottom: 8px; border-radius: 3px; width: 0%; animation: typeOut 3s infinite; }
        .anim-dev .line:nth-child(2) { width: 60%; animation-delay: 0.2s; background: rgba(95,208,191,0.2); }
        .anim-dev .line:nth-child(3) { width: 80%; animation-delay: 0.4s; }
        @keyframes typeOut { 0% { width: 0%; } 50%, 100% { width: 100%; } }
        
        .anim-seo { display: flex; align-items: flex-end; justify-content: center; gap: 8px; height: 100%; padding-top: 20px; }
        .anim-seo .bar { width: 16px; background: var(--teal-bright); border-radius: 4px 4px 0 0; transform-origin: bottom; animation: growBar 2s infinite alternate; }
        .anim-seo .bar:nth-child(1) { height: 30%; animation-delay: 0s; }
        .anim-seo .bar:nth-child(2) { height: 50%; animation-delay: 0.2s; }
        .anim-seo .bar:nth-child(3) { height: 40%; animation-delay: 0.4s; }
        .anim-seo .bar:nth-child(4) { height: 80%; animation-delay: 0.6s; }
        @keyframes growBar { 0% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }
        
        .anim-hosting { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; }
        .anim-hosting .url { font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.5); }
        .anim-hosting .status { width: 24px; height: 24px; border-radius: 50%; background: var(--teal-bright); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(95,208,191,0.4); animation: pulseGreen 2s infinite; }
        @keyframes pulseGreen { 0% { box-shadow: 0 0 0 0 rgba(95,208,191,0.4); } 70% { box-shadow: 0 0 0 10px rgba(95,208,191,0); } 100% { box-shadow: 0 0 0 0 rgba(95,208,191,0); } }
        
        .anim-content { padding-top: 12px; }
        .anim-content .par { margin-bottom: 12px; }
        .anim-content .par .l { height: 4px; background: rgba(255,255,255,0.1); margin-bottom: 4px; border-radius: 2px; }
        
        .anim-manage { display: flex; align-items: center; justify-content: center; height: 100%; padding-top: 12px; }
        .anim-manage .circle { width: 40px; height: 40px; border: 4px dashed rgba(95,208,191,0.4); border-radius: 50%; animation: spinSlow 6s linear infinite; }
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
      
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
                <Link href="#portfolio" className="btn btn-ghost" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>View Website Examples</Link>
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
      <div className="social-proof-banner" style={{ textAlign: 'center', padding: '24px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
        <p style={{ fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>Trusted by healthcare providers improving their online presence, increasing inquiries, and modernizing their brand experience.</p>
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
                <div className="wire-bg ugly">
                   <div className="w-head"></div>
                   <div className="w-hero"></div>
                   <div className="w-body"><div className="w-line"></div><div className="w-line"></div><div className="w-line short"></div></div>
                </div>
              </div>
              <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${baPos}%)` }}>
                <div className="wire-bg modern">
                   <div className="w-head"></div>
                   <div className="w-hero"></div>
                   <div className="w-cards"><div className="w-card"></div><div className="w-card"></div></div>
                </div>
              </div>
              <div className="ba-handle" style={{ left: `${baPos}%` }}></div>
              <div className="ba-tags"><span className="btag">BEFORE</span><span className="atag">AFTER</span></div>
            </div>
          </div>
          <p className="ba-caption center" data-reveal style={{ marginTop: '24px', fontSize: '11px', textAlign: 'center' }}>Drag — left is a typical dated healthcare site, right is a modern Wavecare build.</p>

          <div className="dp-stats-bar" style={{ marginTop: '80px' }}>
            <div className="dp-stats-inner" data-reveal>
              <div className="stat"><div className="num"><span data-count="3">0</span><span data-suffix=".5x"></span></div><div className="lbl">more organic traffic after a professional rebuild</div></div>
              <div className="stat"><div className="num"><span data-count="72">0</span><span data-suffix="%"></span></div><div className="lbl">of tours start from a mobile device</div></div>
              <div className="stat"><div className="num"><span data-prefix="&lt;" data-count="2">0</span><span data-suffix="s"></span></div><div className="lbl">load time optimization across the board</div></div>
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
                 <div className="anim-design"><div></div><div></div><div></div></div>
              </div>
              <div className="body"><h3>Website Design</h3><p>Beautiful, modern interfaces that reflect the quality of your care.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="dev">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-dev"><div className="line"></div><div className="line"></div><div className="line"></div></div>
              </div>
              <div className="body"><h3>Website Development</h3><p>Robust, clean code built on modern frameworks for speed and reliability.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="management">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-manage"><div className="circle"></div></div>
              </div>
              <div className="body"><h3>Website Management</h3><p>We keep your site secure, up-to-date, and performing smoothly.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="seo">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-seo"><div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div></div>
              </div>
              <div className="body"><h3>SEO Foundations</h3><p>Built from the ground up to rank in local searches for senior care.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="content">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-content"><div className="par"><div className="l"></div><div className="l" style={{ width: '80%' }}></div></div><div className="par"><div className="l"></div><div className="l" style={{ width: '60%' }}></div></div></div>
              </div>
              <div className="body"><h3>Content Strategy</h3><p>Copywriting that speaks to families' concerns and drives them to book a tour.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" style={{ background: '#08211c' }} data-label="hosting">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-hosting">
                    <div className="url">www.website.com</div>
                    <div className="status"><svg viewBox="0 0 24 24" width="12" height="12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                 </div>
              </div>
              <div className="body"><h3>Hosting &amp; Performance</h3><p>Enterprise-grade hosting with global CDNs for lightning-fast load times.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="panel ink sec-pad">
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
                <div className="frame" style={{ opacity: 1, position: 'relative', overflow: 'hidden', background: '#062A24', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
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

      {/* ========== FINAL CTA ========== */}
      <section className="final">
        <canvas id="waveCanvas"></canvas>
        <div className="final-in" data-reveal>
          <span className="label">Are you losing tours online?</span>
          <h2>See how your website really <span className="accent">performs.</span></h2>
          <p className="sub">Let's look at your current site. We'll show you where you're losing traffic, how families perceive your brand online, and exactly how we'd fix it.</p>
          <Link href="/contact" className="btn btn-light">Get Your Free Website Audit</Link>
        </div>
      </section>
    </>
  );
}



