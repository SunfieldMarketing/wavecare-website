'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ClientEffects() {
  useEffect(() => {
    /* Services accordion, one row open at a time */
    function initAccordion() {
      const items = Array.from(document.querySelectorAll('.acc-item'));
      if (!items.length) return;
      items.forEach((item) => {
        const head = item.querySelector('.acc-head');
        if (!head) return;
        head.addEventListener('click', () => {
          const wasOpen = item.classList.contains('open');
          items.forEach((it) => {
            it.classList.remove('open');
            const h = it.querySelector('.acc-head');
            const t = it.querySelector('.acc-status-text');
            if (h) h.setAttribute('aria-expanded', 'false');
            if (t) t.textContent = 'Expand';
          });
          if (!wasOpen) {
            item.classList.add('open');
            head.setAttribute('aria-expanded', 'true');
            const t = item.querySelector('.acc-status-text');
            if (t) t.textContent = 'Now Viewing';
          }
        });
      });
    }

    /* Ad Management cover, windows rearrange every few seconds */
    function initShuffle() {
      const board = document.getElementById('shuffleBoard');
      if (!board) return;
      const wins = Array.from(board.querySelectorAll('.mini-win')) as HTMLElement[];
      if (wins.length < 2) return;
      const slots = [[4.5, 8], [51.5, 8], [4.5, 52], [51.5, 52]];
      const assign = wins.map((w, i) => i);
      function place() {
        wins.forEach((w, i) => {
          const s = slots[assign[i]];
          w.style.left = s[0] + '%';
          w.style.top = s[1] + '%';
        });
      }
      place();
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const interval = setInterval(() => {
        let a = Math.floor(Math.random() * wins.length);
        let b = Math.floor(Math.random() * wins.length);
        if (a === b) b = (b + 1) % wins.length;
        const tmp = assign[a];
        assign[a] = assign[b];
        assign[b] = tmp;
        wins[a].classList.add('lift');
        place();
        setTimeout(() => { wins[a].classList.remove('lift'); }, 950);
      }, 2600);
      
      return () => clearInterval(interval);
    }

    /* Paid Search & SEO cover, typing loop */
    function initTypewriter() {
      const el = document.getElementById('typeText');
      if (!el) return;
      const words = ['SNF', 'Senior Care', 'AL', 'IL'];
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = words[1];
        return;
      }
      let wi = 0, ci = 0, del = false;
      let timeoutId: any;
      function tick() {
        if (!el) return;
        const w = words[wi];
        if (!del) {
          ci++;
          el.textContent = w.slice(0, ci);
          if (ci === w.length) {
            del = true;
            timeoutId = setTimeout(tick, 1500);
            return;
          }
        } else {
          ci--;
          el.textContent = w.slice(0, ci);
          if (ci === 0) {
            del = false;
            wi = (wi + 1) % words.length;
            timeoutId = setTimeout(tick, 380);
            return;
          }
        }
        timeoutId = setTimeout(tick, del ? 65 : 115);
      }
      tick();
      return () => clearTimeout(timeoutId);
    }

    /* Social cover, calendar fills then resets */
    function initCalendar() {
      const cells = Array.from(document.querySelectorAll('.cal-cell'));
      if (!cells.length) return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cells.forEach((c) => c.classList.add('on'));
        return;
      }
      let i = 0, hold = 0;
      const interval = setInterval(() => {
        if (hold > 0) {
          hold--;
          if (hold === 0) {
            cells.forEach((c) => c.classList.remove('on'));
            i = 0;
          }
          return;
        }
        if (i < cells.length) {
          cells[i].classList.add('on');
          i++;
        }
        if (i >= cells.length) hold = 14;
      }, 130);
      return () => clearInterval(interval);
    }

    initAccordion();
    const cleanupShuffle = initShuffle();
    const cleanupTypewriter = initTypewriter();
    const cleanupCalendar = initCalendar();
    
    return () => {
      if (cleanupShuffle) cleanupShuffle();
      if (cleanupTypewriter) cleanupTypewriter();
      if (cleanupCalendar) cleanupCalendar();
    }
  }, []);

  return (
    <Script id="wavecare-webgl-script" strategy="lazyOnload">
      {`
      function initFinalWave(){
        var canvas=document.getElementById('wavecareFinalWaveCanvas');if(!canvas||!window.THREE)return;
        var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var renderer;try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});}catch(e){return;}
        var sec=canvas.closest('.wavecare-final-wave-section')||canvas.parentElement;
        function sz(){return[Math.max(sec.clientWidth,1),Math.max(sec.clientHeight,1)];}
        renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));var wh=sz(),w=wh[0],h=wh[1];renderer.setSize(w,h,false);
        var scene=new THREE.Scene(),cam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
        var u={uTime:{value:0},uRes:{value:new THREE.Vector2(w,h)},uMouse:{value:new THREE.Vector2(0.5,0.5)}};
        var frag="precision highp float;uniform float uTime;uniform vec2 uRes;uniform vec2 uMouse;varying vec2 vUv;vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 hh=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+hh*hh);vec3 g;g.x=a0.x*x0.x+hh.x*x0.y;g.yz=a0.yz*x12.xz+hh.yz*x12.yw;return 130.0*dot(m,g);}float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*snoise(p);p*=2.0;a*=0.5;}return v;}void main(){vec2 uv=vUv;vec2 p=(gl_FragCoord.xy-0.5*uRes.xy)/uRes.y;float t=uTime*0.05;vec2 q=vec2(fbm(p*1.5+t),fbm(p*1.5+vec2(3.2,1.7)-t));float f=fbm(p*1.5+2.0*q+t);f=f*0.5+0.5;float d=distance(uv,uMouse);f+=sin(d*22.0-uTime*2.0)*exp(-d*5.0)*0.12;vec3 cDeep=vec3(0.039,0.263,0.224),cPrim=vec3(0.055,0.353,0.314),cAcc=vec3(0.165,0.616,0.561),cBri=vec3(0.373,0.816,0.749);vec3 col=mix(cDeep,cPrim,smoothstep(0.2,0.6,f));col=mix(col,cAcc,smoothstep(0.6,0.85,f));col=mix(col,cBri,smoothstep(0.85,1.0,f));col+=cBri*exp(-d*6.0)*0.10;float al=0.85-0.5*pow(distance(uv,vec2(0.5)),1.3);gl_FragColor=vec4(col,clamp(al,0.0,1.0));}";
        var mat=new THREE.ShaderMaterial({uniforms:u,fragmentShader:frag,vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}",transparent:true});
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat));
        var mx=0.5,my=0.5,tmx=0.5,tmy=0.5;
        sec.addEventListener('mousemove',function(e){var r=sec.getBoundingClientRect();if(!r.width||!r.height)return;tmx=(e.clientX-r.left)/r.width;tmy=1-(e.clientY-r.top)/r.height;},{passive:true});
        addEventListener('resize',function(){var n=sz();w=n[0];h=n[1];renderer.setSize(w,h,false);u.uRes.value.set(w,h);},{passive:true});
        var vis=true;if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=!!(es[0]&&es[0].isIntersecting);},{rootMargin:'100px'}).observe(sec);
        var clock=new THREE.Clock();
        (function loop(){requestAnimationFrame(loop);if(!vis)return;mx+=(tmx-mx)*0.06;my+=(tmy-my)*0.06;u.uMouse.value.set(mx,my);u.uTime.value=clock.getElapsedTime()*(rm?0:1);renderer.render(scene,cam);})();
      }
      
      // Wait for Three.js to be available on window, since it loads via the Script tag in layout.tsx
      if (window.THREE) {
         initFinalWave();
      } else {
         var iv = setInterval(function() {
            if (window.THREE) {
               clearInterval(iv);
               initFinalWave();
            }
         }, 100);
      }
      `}
    </Script>
  );
}
