'use client';

import { useEffect } from 'react';

/**
 * Effects for CMS-rendered pages: scroll reveals and the [data-count] counter
 * animation used by every stats block.
 *
 * Deliberately narrow in scope otherwise. It does NOT start Lenis,
 * ScrollTrigger or the custom cursor, because the layout and the remaining
 * hand-written pages each create their own Lenis instance with an anonymous
 * gsap.ticker callback that is never removed. Adding another owner made those
 * stack on every navigation (2 ticker callbacks -> 4, 3 ScrollTriggers -> 6
 * after one round trip), and competing Lenis instances stop the page
 * scrolling altogether.
 *
 * Everything here is idempotent and fully torn down on unmount.
 */
export default function CMSPageEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll reveals */
    const els = Array.from(document.querySelectorAll('[data-reveal], .reveal, .stagger'));
    if (els.length) {
      if (!('IntersectionObserver' in window)) {
        els.forEach((e) => e.classList.add('in'));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add('in');
                io.unobserve(en.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        );
        els.forEach((e) => io.observe(e));
        cleanups.push(() => io.disconnect());

        // Safety net: anything already within the viewport is revealed even if
        // the observer has not fired yet (e.g. above-the-fold on a fast load).
        const t = window.setTimeout(() => {
          els.forEach((e) => {
            if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('in');
          });
        }, 400);
        cleanups.push(() => window.clearTimeout(t));
      }
    }

    /* [data-count] counter animation — ported from GlobalScripts' initCount.
       Drives every stats block across the site (case-studies index, services,
       testimonials, design-print, ...). Missing this left every animated
       number frozen at its initial "0". */
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    if (counters.length) {
      const format = (el: HTMLElement, value: number) => {
        const comma = el.getAttribute('data-comma') === '1';
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        return `${prefix}${comma ? value.toLocaleString() : value}${suffix}`;
      };

      if (!('IntersectionObserver' in window)) {
        counters.forEach((el) => {
          const target = +(el.getAttribute('data-count') || 0);
          el.textContent = format(el, target);
        });
      } else {
        const cio = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              const el = en.target as HTMLElement;
              cio.unobserve(el);
              const target = +(el.getAttribute('data-count') || 0);
              const dur = reduceMotion ? 0 : 1700;
              const t0 = performance.now();
              const step = (now: number) => {
                const k = dur ? Math.min((now - t0) / dur, 1) : 1;
                const eased = 1 - Math.pow(1 - k, 3);
                el.textContent = format(el, Math.floor(target * eased));
                if (k < 1) requestAnimationFrame(step);
                else el.textContent = format(el, target);
              };
              requestAnimationFrame(step);
            });
          },
          { threshold: 0.25 },
        );
        counters.forEach((el) => cio.observe(el));
        cleanups.push(() => cio.disconnect());
      }
    }

    /* [data-target] counter animation — the wc-/wct- landing kit
       (StatsBarBlock, /commercial and /testimonials) shipped its own
       separate counter script in the original, independent of initCount's
       [data-count] convention above (different attribute names, duration,
       threshold, and decimal-place support). Ported verbatim from the
       original's initReveals(); without this every wct-stat-num/wc-stat-num
       with a countTo value was frozen at its placeholder ("0.0x", "0 days"). */
    const targetCounters = Array.from(document.querySelectorAll<HTMLElement>('[data-target]'));
    if (targetCounters.length) {
      const run = (el: HTMLElement) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        if (reduceMotion) {
          el.textContent = target.toFixed(decimals) + suffix;
          return;
        }
        const start = performance.now();
        const duration = 2000;
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * ease).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      if (!('IntersectionObserver' in window)) {
        targetCounters.forEach(run);
      } else {
        const tio = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              tio.unobserve(en.target);
              run(en.target as HTMLElement);
            });
          },
          { threshold: 0.5 },
        );
        targetCounters.forEach((el) => tio.observe(el));
        cleanups.push(() => tio.disconnect());
      }
    }

    // The final CTA's animated WebGL wave — ported verbatim from the
    // original's initWaveAccent(). THREE.js loads from a CDN <script
    // strategy="afterInteractive"> in layout.tsx (same as the original), so
    // it's frequently not ready yet on mount; the original polled for up to
    // ~4s before giving up. Without this retry, every finalCta canvas across
    // the site silently fell back to a flat gradient forever, even once
    // THREE finished loading moments later.
    const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement | null;
    if (canvas) {
      let cancelled = false;
      let retries = 0;
      const tryInit = () => {
        if (cancelled) return;
        const THREE = (window as any).THREE;
        if (!THREE) {
          if (++retries > 80) {
            canvas.style.background =
              'radial-gradient(ellipse at center,rgba(42,157,143,0.25),transparent 70%)';
            return;
          }
          const t = window.setTimeout(tryInit, 50);
          cleanups.push(() => window.clearTimeout(t));
          return;
        }

        let renderer: any;
        try {
          renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        } catch {
          canvas.style.display = 'none';
          return;
        }
        const sec = canvas.parentElement!;
        const size = () => [sec.clientWidth, sec.clientHeight];
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        let [w, h] = size();
        renderer.setSize(w, h);
        const scene = new THREE.Scene();
        const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const uniforms = {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(w, h) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        };
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
          uniforms,
          fragmentShader: frag,
          vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
          transparent: true,
        });
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

        let mx = 0.5,
          my = 0.5,
          tmx = 0.5,
          tmy = 0.5;
        const onMove = (e: MouseEvent) => {
          const r = sec.getBoundingClientRect();
          tmx = (e.clientX - r.left) / r.width;
          tmy = 1 - (e.clientY - r.top) / r.height;
        };
        const onResize = () => {
          [w, h] = size();
          renderer.setSize(w, h);
          uniforms.uRes.value.set(w, h);
        };
        sec.addEventListener('mousemove', onMove);
        window.addEventListener('resize', onResize);

        let vis = true;
        let io: IntersectionObserver | undefined;
        if ('IntersectionObserver' in window) {
          io = new IntersectionObserver((es) => (vis = es[0].isIntersecting), { rootMargin: '100px' });
          io.observe(sec);
        }

        const clock = new THREE.Clock();
        let raf = 0;
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!vis) return;
          mx += (tmx - mx) * 0.06;
          my += (tmy - my) * 0.06;
          uniforms.uMouse.value.set(mx, my);
          uniforms.uTime.value = clock.getElapsedTime() * (reduceMotion ? 0 : 1);
          renderer.render(scene, cam);
        };
        loop();

        cleanups.push(() => {
          cancelAnimationFrame(raf);
          sec.removeEventListener('mousemove', onMove);
          window.removeEventListener('resize', onResize);
          io?.disconnect();
          renderer.dispose?.();
        });
      };
      tryInit();
      cleanups.push(() => {
        cancelled = true;
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
