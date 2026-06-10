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
        .anim-design div { background: rgba(255,255,255,0.05); border-radius: 4px; }
        .anim-design div.top { grid-column: span 2; height: 24px; }
        
        .anim-dev { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 100%; padding-top: 12px; }
        .anim-dev div { background: rgba(255,255,255,0.05); border-radius: 4px; }
        .anim-dev div.top { grid-column: span 2; height: 24px; }

        .anim-manage { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 100%; padding-top: 12px; }
        .anim-manage div { background: rgba(255,255,255,0.05); border-radius: 4px; position: relative; }
        .anim-manage div.top { grid-column: span 2; height: 24px; background: linear-gradient(90deg, rgba(95,208,191,0.2) 0%, rgba(95,208,191,0.6) 100%); }
        .anim-manage .cir { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; border-radius: 50%; border: 1px dashed rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; background: transparent !important; }
        .anim-manage .cir::after { content: ''; width: 4px; height: 4px; background: #fff; border-radius: 50%; }

        .anim-seo { display: flex; align-items: center; justify-content: center; gap: 8px; height: 100%; padding-top: 12px; }
        .anim-seo .bar { width: 24px; height: 8px; background: var(--teal-bright); border-radius: 4px; }

        .anim-content { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 100%; padding-top: 12px; }
        .anim-content div { background: rgba(255,255,255,0.05); border-radius: 4px; }
        .anim-content div.top { grid-column: span 2; height: 24px; }

        .anim-hosting { display: flex; align-items: center; justify-content: center; height: 100%; padding-top: 12px; }
        .anim-hosting .circle { width: 40px; height: 40px; background: var(--teal-bright); border-radius: 50%; }
      
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
                 <div className="anim-design"><div className="top"></div><div></div><div></div></div>
              </div>
              <div className="body"><h3>Website Design</h3><p>Custom healthcare-focused design built around your brand and goals.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="dev">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-dev"><div className="top"></div><div></div><div></div></div>
              </div>
              <div className="body"><h3>Website Development</h3><p>Fast, responsive websites optimized for desktop, tablet, and mobile.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="management">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-manage"><div className="top"></div><div></div><div><div className="cir"></div></div></div>
              </div>
              <div className="body"><h3>Website Management</h3><p>Ongoing updates, content changes, maintenance, and support.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="seo">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-seo"><div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div></div>
              </div>
              <div className="body"><h3>SEO Foundations</h3><p>Technical setup and optimization to help improve search visibility.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="content">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-content"><div className="top"></div><div></div><div></div></div>
              </div>
              <div className="body"><h3>Content Strategy</h3><p>Clear messaging that helps families quickly find what they need.</p></div>
            </div>
            <div className="tcard" data-cat="all">
              <div className="thumb mock-window" data-label="hosting">
                 <div className="mock-top"><span></span><span></span><span></span></div>
                 <div className="anim-hosting"><div className="circle"></div></div>
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
            <div className="stat"><div className="num" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--teal-bright)', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '16px' }}><span data-count="3" data-suffix=".5x">0</span></div><div className="lbl" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>more organic traffic after a professional rebuild</div></div>
            <div className="stat"><div className="num" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--teal-bright)', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '16px' }}><span data-count="72" data-suffix="%">0</span></div><div className="lbl" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>of tours start from a mobile device</div></div>
            <div className="stat"><div className="num" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--teal-bright)', fontFamily: 'var(--font-display)', lineHeight: '1', marginBottom: '16px' }}><span data-prefix="&lt;" data-count="2" data-suffix="s">0</span></div><div className="lbl" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>load time optimization across the board</div></div>
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
          <div className="center" data-reveal>
            <Link href="#portfolio" className="btn btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>View Website Examples &rarr;</Link>
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



