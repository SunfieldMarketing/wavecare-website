'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

/**
 * .ba-slider (webdesign variant) — before is the full-size background image,
 * after is clip-path-revealed from the right as the handle moves, with a
 * visible circular drag handle (.ba-handle-line/.ba-handle-button). A third
 * distinct before/after system: components/BeforeAfterSlider.tsx clips via
 * inset(), DragBeforeAfter.tsx (/design-print) shrinks a container width, this
 * one uses clip-path on the AFTER layer specifically.
 */
export default function RevealBeforeAfterInner({
  before,
  after,
}: {
  before: { url: string; alt?: string };
  after: { url: string; alt?: string };
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const drag = (e: { clientX?: number; touches?: { clientX: number }[] }) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  return (
    <div
      className="ba-slider"
      ref={ref}
      style={{ maxWidth: '560px', width: '100%', margin: '0 auto', aspectRatio: '16/10' }}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        drag(e);
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0) drag(e);
      }}
      data-reveal
    >
      <div className="ba-before">
        <Image src={before.url} alt={before.alt ?? 'Before'} width={1200} height={800} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image src={after.url} alt={after.alt ?? 'After'} width={1200} height={800} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-handle-line" />
        <div className="ba-handle-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5l7 7-7 7M5 12h14" />
          </svg>
        </div>
      </div>
      <div className="ba-tags">
        <span className="btag">BEFORE</span>
        <span className="atag">AFTER</span>
      </div>
    </div>
  );
}
