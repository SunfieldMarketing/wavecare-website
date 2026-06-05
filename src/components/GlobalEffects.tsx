// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
    _lenisInstance: any;
    SplitText: any;
    initInsight: any;
    initThreeBackground: any;
  }
}

export default function GlobalEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // We need to wait for scripts to load, so we use a small timeout or check if window.gsap exists
    const checkLibs = setInterval(() => {
      if (window.gsap && window.ScrollTrigger && window.Lenis) {
        clearInterval(checkLibs);
        initAll();
      }
    }, 100);

    return () => clearInterval(checkLibs);
  }, [pathname]);

  function initAll() {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // We skip preloader for route changes in nextjs, maybe just run it once or fade it out instantly
    const pre = document.getElementById('preloader');
    if (pre) {
      pre.style.opacity = '0';
      pre.style.pointerEvents = 'none';
      setTimeout(() => { pre.style.display = 'none'; }, 620);
    }

    initChrome();
    initLenis();
    initReveals();
    initCount();
    initHero();
    initServices();
    initMarquee();
    initCursor();
    initWaveAccent();
    initInsight();
    initAccordion();
    initForm();
    initCal();

    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }

    /* ---- reveals: IntersectionObserver, fires both directions, fails visible ---- */
    function initReveals(){
      const els=document.querySelectorAll('[data-reveal],.stagger,.reveal');
      if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
      const io=new IntersectionObserver(es=>{ es.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('in'); }); },{threshold:0.15, rootMargin:'0px 0px -8% 0px'});
      els.forEach(e=>io.observe(e));
      // safety: if anything is still hidden after load (e.g. above-fold), reveal it
      setTimeout(()=>{ els.forEach(e=>{ const r=e.getBoundingClientRect(); if(r.top<window.innerHeight) e.classList.add('in'); }); },400);
    }

    /* ---- count-up (IntersectionObserver, library-independent) ---- */
    function initCount(){
      const els=document.querySelectorAll('[data-count]');
      if(!('IntersectionObserver' in window)){ els.forEach(el=>{const c=el.getAttribute('data-comma')==='1'; const t=+(el.getAttribute('data-count')||0); el.textContent=c?t.toLocaleString():t.toString();}); return; }
      const io=new IntersectionObserver(es=>{ es.forEach(en=>{ if(!en.isIntersecting)return; const el=en.target; io.unobserve(el);
        const target=+(el.getAttribute('data-count')||0),comma=el.getAttribute('data-comma')==='1',dur=reduceMotion?0:1700,t0=performance.now();
        (function step(now){ const k=dur?Math.min((now-t0)/dur,1):1; const e=1-Math.pow(1-k,3); const v=Math.floor(target*e);
          el.textContent=comma?v.toLocaleString():v.toString(); if(k<1)requestAnimationFrame(step); else el.textContent=comma?target.toLocaleString():target.toString(); })(performance.now());
      }); },{threshold:0.25});
      els.forEach(el=>io.observe(el));
    }

    /* ---- nav + progress ---- */
    function initChrome(){
      const prog=document.getElementById('progress'),nav=document.getElementById('nav');
      if (!prog || !nav) return;
      function on(){ if (!prog || !nav) return; const h=document.documentElement,sc=h.scrollTop||document.body.scrollTop,max=h.scrollHeight-h.clientHeight;
        prog.style.width=(max>0?sc/max*100:0)+'%'; nav.classList.toggle('scrolled',sc>40); }
      window.addEventListener('scroll',on,{passive:true}); on();
    }

    /* ---- Lenis smooth scroll ---- */
    function initLenis(){
      if(!window.Lenis||reduceMotion) return;
      // kill old instance if exists
      if (window._lenisInstance) window._lenisInstance.destroy();
      const lenis=new window.Lenis({lerp:0.09,smoothWheel:true});
      window._lenisInstance = lenis;
      if(window.gsap&&window.ScrollTrigger){ lenis.on('scroll',window.ScrollTrigger.update); window.gsap.ticker.add(t=>lenis.raf(t*1000)); window.gsap.ticker.lagSmoothing(0); }
      else { (function raf(t){lenis.raf(t); requestAnimationFrame(raf);})(0); }
      document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const href = a.getAttribute('href'); if(href && href.length>1) { const el=document.querySelector(href); if(el){e.preventDefault(); lenis.scrollTo(el,{offset:-20});}}}));
    }

    /* ---- hero entrance + wave-accent draw ---- */
    function initHero(){
      const wp=document.querySelector('.wave-accent path');
      if(window.gsap){
        window.gsap.set('[data-hero]',{opacity:0,y:38});
        window.gsap.to('[data-hero]',{opacity:1,y:0,duration:1,stagger:0.12,ease:'power3.out',delay:0.15});
        if(wp) window.gsap.to(wp,{strokeDashoffset:0,duration:1.4,ease:'power2.out',delay:0.4});
        window.gsap.to('.hero-bg img',{scale:1,duration:2.4,ease:'power2.out'});
        if(window.ScrollTrigger){
          window.gsap.to('.hero-inner',{yPercent:-16,opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
          window.gsap.to('.hero-bg img',{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
          window.gsap.to('.scroll-cue',{opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'14% top',scrub:true}});
        }
      } else { document.querySelectorAll('[data-hero]').forEach(e=>{e.style.opacity='1';e.style.transform='none';}); if(wp) wp.style.strokeDashoffset='0'; }
    }

    /* ---- SERVICES draggable carousel (no scroll-jacking) ---- */
    function initServices(){
      const vp=document.getElementById('svcViewport'), track=document.getElementById('svcTrack');
      const prev=document.getElementById('svcPrev'), next=document.getElementById('svcNext');
      if(!vp||!track) return;
      let x=0, min=0;
      function maxScroll(){ return Math.min(0, vp.clientWidth - track.scrollWidth); }
      function clamp(v){ return Math.max(maxScroll(), Math.min(0, v)); }
      function apply(){ track.style.transform=`translate3d(${x}px,0,0)`; if(prev)prev.disabled=x>=-1; if(next)next.disabled=x<=maxScroll()+1; }
      function to(v){ x=clamp(v); if(window.gsap){ window.gsap.to(track,{x,duration:0.6,ease:'power3.out',onUpdate:apply}); } else { apply(); } }
      // arrows step by ~one card
      function step(){ return Math.min(440, vp.clientWidth*0.8); }
      // remove old listeners if re-running
      const newNext = next?.cloneNode(true);
      if (newNext && next) next.parentNode.replaceChild(newNext, next);
      const newPrev = prev?.cloneNode(true);
      if (newPrev && prev) prev.parentNode.replaceChild(newPrev, prev);
      
      newNext&&newNext.addEventListener('click',()=>to(x-step()));
      newPrev&&newPrev.addEventListener('click',()=>to(x+step()));
      // wheel: horizontal intent pans the carousel, vertical passes through to page
      vp.addEventListener('wheel',e=>{ if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){ e.preventDefault(); x=clamp(x-e.deltaX); apply(); } },{passive:false});
      // drag (pointer) — never blocks vertical page scroll
      let down=false,sx=0,sox=0,moved=false,horizontal=null,sy=0;
      vp.addEventListener('pointerdown',e=>{ down=true;moved=false;horizontal=null;sx=e.clientX;sy=e.clientY;sox=x;vp.classList.add('dragging'); });
      window.addEventListener('pointermove',e=>{ if(!down)return; const dx=e.clientX-sx,dy=e.clientY-sy;
        if(horizontal===null && (Math.abs(dx)>6||Math.abs(dy)>6)) horizontal=Math.abs(dx)>Math.abs(dy);
        if(horizontal){ e.preventDefault?.(); x=clamp(sox+dx); apply(); if(Math.abs(dx)>4)moved=true; } });
      window.addEventListener('pointerup',()=>{ down=false; vp.classList.remove('dragging'); });
      // prevent click-through after a drag
      track.addEventListener('click',e=>{ if(moved){ e.preventDefault(); e.stopPropagation(); } },true);
      // card expand toggles
      document.querySelectorAll('.svc-card .svc-toggle').forEach(btn=>{
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click',e=>{ e.stopPropagation(); newBtn.closest('.svc-card').classList.toggle('open'); window.ScrollTrigger&&window.ScrollTrigger.refresh&&window.ScrollTrigger.refresh(); });
      });
      window.addEventListener('resize',()=>{x=clamp(x); apply();});
      apply();
    }

    /* scrollytelling word reveal */
    function initInsight(){
      const host=document.getElementById('insightText'); if(!host) return;
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Revert if already split
      if (host.querySelector('.w')) return;
      const words=host.textContent.trim().split(/\s+/);
      host.innerHTML=words.map(w=>`<span class="w">${w}</span>`).join(' ');
      if(window.gsap&&window.ScrollTrigger&&!reduceMotion){
        window.gsap.to(host.querySelectorAll('.w'),{opacity:1,stagger:0.4,ease:'none',scrollTrigger:{trigger:'.insight',start:'top 72%',end:'bottom 78%',scrub:true}});
      } else { host.querySelectorAll('.w').forEach(w=>w.style.opacity='1'); }
    }

    /* interactive expanding accordion */
    function initAccordion(){
      const panels=document.querySelectorAll('#accordion .acc-panel'); if(!panels.length) return;
      function activate(p){ panels.forEach(x=>x.classList.toggle('active', x===p)); }
      panels.forEach(p=>{
        const newP = p.cloneNode(true);
        p.parentNode.replaceChild(newP, p);
        newP.addEventListener('mouseenter',()=>{ if(matchMedia('(min-width:861px)').matches) activate(newP); });
        newP.addEventListener('click',()=>activate(newP));
      });
    }

    /* ---- logo marquee ---- */
    function initMarquee(){
      const row=document.getElementById('marqueeRow'); if(!row)return;
      // if already cloned don't clone again
      if (row.children.length < 14) {
        row.innerHTML+=row.innerHTML; 
      }
      let x=0,half=row.scrollWidth/2;
      function tick(){ x-=0.6; if(-x>=half)x+=half; row.style.transform=`translateX(${x}px)`; requestAnimationFrame(tick); }
      if(!reduceMotion) tick();
    }

    /* ---- cursor + magnetic ---- */
    function initCursor(){
      const dot=document.getElementById('cdot'),ring=document.getElementById('cring');
      if(!dot||matchMedia('(hover:none),(pointer:coarse)').matches){ if(dot)dot.style.display='none'; if(ring)ring.style.display='none'; return; }
      let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
      window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
      (function r(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(r);})();
      document.querySelectorAll('[data-cursor]').forEach(el=>{
        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);
        newEl.addEventListener('mouseenter',()=>ring.classList.add('hot'));
        newEl.addEventListener('mouseleave',()=>ring.classList.remove('hot'));
      });
      if(window.gsap) document.querySelectorAll('[data-magnetic]').forEach(el=>{
        el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();window.gsap.to(el,{x:(e.clientX-(r.left+r.width/2))*0.4,y:(e.clientY-(r.top+r.height/2))*0.4,duration:0.4,ease:'power3.out'});});
        el.addEventListener('mouseleave',()=>window.gsap.to(el,{x:0,y:0,duration:0.5,ease:'elastic.out(1,0.4)'}));
      });
    }

    /* ---- scoped WebGL wave accent (final CTA only) ---- */
    function initWaveAccent(){
      const canvas=document.getElementById('waveCanvas');
      if(!canvas||!window.THREE) { if(canvas) canvas.style.background='radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)'; return; }
      let renderer; try{ renderer=new window.THREE.WebGLRenderer({canvas,antialias:true,alpha:true}); }catch(e){ canvas.style.display='none'; return; }
      const sec=canvas.parentElement;
      function size(){ return [sec.clientWidth, sec.clientHeight]; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
      let [w,h]=size(); renderer.setSize(w,h);
      const scene=new window.THREE.Scene(), cam=new window.THREE.OrthographicCamera(-1,1,1,-1,0,1);
      const uniforms={uTime:{value:0},uRes:{value:new window.THREE.Vector2(w,h)},uMouse:{value:new window.THREE.Vector2(0.5,0.5)}};
      const frag=`precision highp float; uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; varying vec2 vUv;
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
      const mat=new window.THREE.ShaderMaterial({uniforms,fragmentShader:frag,
        vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,transparent:true});
      scene.add(new window.THREE.Mesh(new window.THREE.PlaneGeometry(2,2),mat));
      let mx=0.5,my=0.5,tmx=0.5,tmy=0.5;
      sec.addEventListener('mousemove',e=>{const r=sec.getBoundingClientRect();tmx=(e.clientX-r.left)/r.width;tmy=1-(e.clientY-r.top)/r.height;});
      window.addEventListener('resize',()=>{[w,h]=size();renderer.setSize(w,h);uniforms.uRes.value.set(w,h);});
      let vis=true; if('IntersectionObserver' in window) new IntersectionObserver(es=>vis=es[0].isIntersecting,{rootMargin:'100px'}).observe(sec);
      const clock=new window.THREE.Clock();
      (function loop(){ requestAnimationFrame(loop); if(!vis)return; mx+=(tmx-mx)*0.06;my+=(tmy-my)*0.06;
        uniforms.uMouse.value.set(mx,my); uniforms.uTime.value=clock.getElapsedTime()*(reduceMotion?0:1); renderer.render(scene,cam); })();
    }
    /* ===== FORM: real-time validation + chips + submit states ===== */
    function initForm(){
      const form=document.getElementById('contactForm') as HTMLFormElement; if(!form) return;
      const card=document.getElementById('formCard');
      
      const chips=Array.from(document.querySelectorAll('#chips .chip'));
      const hidden=document.getElementById('interests') as HTMLInputElement;
      if (!hidden) return;
      
      function syncChips(){ hidden.value=chips.filter(c=>c.classList.contains('on')).map(c=>c.textContent?.trim()).join(', '); }
      chips.forEach(c=>{
        const newC = c.cloneNode(true) as HTMLElement;
        c.parentNode?.replaceChild(newC, c);
        newC.addEventListener('click',()=>{ newC.classList.toggle('on'); syncChips(); });
      });

      function validateField(f: HTMLElement){
        const input=f.querySelector('input,textarea') as HTMLInputElement | HTMLTextAreaElement; if(!input) return true;
        const type=f.dataset.validate; const v=input.value.trim();
        let ok=true;
        if(type==='required') ok=v.length>0;
        else if(type==='email') ok=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);
        f.classList.toggle('valid', ok && v.length>0);
        f.classList.toggle('invalid', !ok && v.length>0);
        return ok;
      }
      
      const vFields=Array.from(form.querySelectorAll('.field[data-validate]')) as HTMLElement[];
      vFields.forEach(f=>{
        const input=f.querySelector('input,textarea') as HTMLInputElement | HTMLTextAreaElement;
        const newInput = input.cloneNode(true) as HTMLInputElement | HTMLTextAreaElement;
        input.parentNode?.replaceChild(newInput, input);
        newInput.addEventListener('input',()=>{ if(f.classList.contains('invalid')) validateField(f); else if(newInput.value.trim()) validateField(f); });
        newInput.addEventListener('blur',()=>validateField(f));
      });
      
      const newForm = form.cloneNode(true) as HTMLFormElement;
      form.parentNode?.replaceChild(newForm, form);
      const newVFields=Array.from(newForm.querySelectorAll('.field[data-validate]')) as HTMLElement[];
      
      newForm.addEventListener('submit',e=>{
        e.preventDefault();
        let allOk=true;
        newVFields.forEach(f=>{ if(!validateField(f)){ allOk=false; f.classList.add('invalid'); } });
        if(!allOk){ const firstBad=newForm.querySelector('.field.invalid'); firstBad&&firstBad.scrollIntoView({behavior:'smooth',block:'center'}); return; }
        
        newForm.classList.add('sending');
        const btn=newForm.querySelector('.submit-btn') as HTMLButtonElement; if(btn) btn.disabled=true;
        setTimeout(()=>{ if(card) { card.classList.add('done'); card.scrollIntoView({behavior:'smooth',block:'center'}); } }, 1100);
      });
    }

    /* calendar load fallback */
    function initCal(){
      const ifr=document.querySelector('.cal-wrap iframe'); const fb=document.getElementById('calFallback');
      if(!ifr) return;
      let loaded=false; 
      const newIfr = ifr.cloneNode(true);
      ifr.parentNode?.replaceChild(newIfr, ifr);
      newIfr.addEventListener('load',()=>loaded=true);
      setTimeout(()=>{ if(!loaded && fb){ fb.style.display='block'; } }, 4000);
    }
  }

  return null;
}
