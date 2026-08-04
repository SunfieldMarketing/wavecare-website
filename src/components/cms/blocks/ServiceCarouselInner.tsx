'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CMSLink from '../CMSLink';
import { parseHighlight } from '../appearance';

type Card = {
  number?: string | null;
  image: { url: string; alt?: string | null };
  imageFit?: string | null;
  title: string;
  tag?: string | null;
  detail?: Array<{ text: string }>;
  link?: { link?: any };
};

/**
 * .svc-head(+ .svc-arrows) / .svc-viewport / .svc-track / .svc-hint — the
 * whole interactive services section in one component, since the prev/next
 * arrows in the heading need to control the same drag state as the track
 * below them. Matches the original's initServices exactly: same clamp/step
 * math, same pointer + wheel handling, same "tap a card to open, unless the
 * drag moved it" behaviour.
 *
 * Uses a CSS transition instead of a hard runtime dependency on GSAP (which
 * loads from a CDN script and may not be ready yet) — same drag/scroll/arrow
 * behaviour, a slightly different easing curve if GSAP hasn't loaded.
 */
export default function ServiceCarouselInner({
  eyebrow,
  title,
  hint,
  cards,
}: {
  eyebrow?: string | null;
  title?: string | null;
  hint?: string | null;
  cards: Card[];
}) {
  const vpRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const [open, setOpen] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const goRef = useRef<(dir: 1 | -1) => void>(() => {});

  useEffect(() => {
    const vp = vpRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    const maxScroll = () => Math.min(0, vp.clientWidth - track.scrollWidth);
    const clamp = (v: number) => Math.max(maxScroll(), Math.min(0, v));

    const apply = () => {
      track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      setCanPrev(xRef.current < -1);
      setCanNext(xRef.current > maxScroll() + 1);
    };

    const to = (v: number) => {
      xRef.current = clamp(v);
      track.style.transition = 'transform 0.5s cubic-bezier(0.2,0.8,0.2,1)';
      apply();
    };

    const step = () => Math.min(440, vp.clientWidth * 0.8);

    goRef.current = (dir: 1 | -1) => to(xRef.current + dir * step());

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        track.style.transition = 'none';
        xRef.current = clamp(xRef.current - e.deltaX);
        apply();
      }
    };

    let down = false;
    let moved = false;
    let horizontal: boolean | null = null;
    let sx = 0;
    let sy = 0;
    let sox = 0;

    const onDown = (e: PointerEvent) => {
      down = true;
      moved = false;
      horizontal = null;
      sx = e.clientX;
      sy = e.clientY;
      sox = xRef.current;
      track.style.transition = 'none';
      vp.classList.add('dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (horizontal === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) horizontal = Math.abs(dx) > Math.abs(dy);
      if (horizontal) {
        e.preventDefault();
        xRef.current = clamp(sox + dx);
        apply();
        if (Math.abs(dx) > 4) moved = true;
      }
    };
    const onUp = () => {
      down = false;
      vp.classList.remove('dragging');
    };
    const onTrackClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onResize = () => {
      xRef.current = clamp(xRef.current);
      apply();
    };

    vp.addEventListener('wheel', onWheel, { passive: false });
    vp.addEventListener('pointerdown', onDown as any);
    window.addEventListener('pointermove', onMove as any);
    window.addEventListener('pointerup', onUp);
    track.addEventListener('click', onTrackClickCapture, true);
    window.addEventListener('resize', onResize);

    apply();

    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('pointerdown', onDown as any);
      window.removeEventListener('pointermove', onMove as any);
      window.removeEventListener('pointerup', onUp);
      track.removeEventListener('click', onTrackClickCapture, true);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="svc-head">
          <div data-reveal>
            {eyebrow && <span className="label">{eyebrow}</span>}
            {title && <h2>{parseHighlight(title)}</h2>}
          </div>
          <div className="svc-arrows">
            <button aria-label="Previous" data-cursor onClick={() => goRef.current(-1)} disabled={!canPrev}>
              ←
            </button>
            <button aria-label="Next" data-cursor onClick={() => goRef.current(1)} disabled={!canNext}>
              →
            </button>
          </div>
        </div>
      </div>

      <div className="svc-viewport" ref={vpRef}>
        <div className="svc-track" ref={trackRef}>
          {cards.map((c, i) => (
            <article
              className={`svc-card ${open === i ? 'open' : ''}`}
              data-cursor
              key={i}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('a')) return;
                setOpen(open === i ? null : i);
              }}
            >
              <div className="svc-media">
                <span className="svc-num">{c.number || String(i + 1).padStart(2, '0')}</span>
                {c.image?.url && (
                  <Image
                    src={c.image.url}
                    alt={c.image.alt ?? c.title}
                    fill
                    style={{ objectFit: c.imageFit === 'contain' ? 'contain' : 'cover' }}
                  />
                )}
              </div>
              <div className="svc-body">
                <h3>{c.title}</h3>
                {c.tag && <p className="svc-tag">{c.tag}</p>}
                <div className="svc-detail">
                  {c.detail?.length ? (
                    <ul>
                      {c.detail.map((d, di) => (
                        <li key={di}>{d.text}</li>
                      ))}
                    </ul>
                  ) : null}
                  {c.link?.link?.label && <CMSLink link={c.link.link} />}
                </div>
                <button
                  className="svc-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(open === i ? null : i);
                  }}
                >
                  More info <span className="chev">▾</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {hint && <div className="svc-hint">{hint}</div>}
    </>
  );
}
