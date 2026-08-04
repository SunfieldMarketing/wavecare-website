'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Pointer-drag before/after comparison — .ba-slider / .ba-after / .ba-before /
 * .ba-handle / .ba-tags. Distinct from components/BeforeAfterSlider.tsx (used
 * on /photoservices), which is a different implementation with different class
 * names (.ba-slider-wrap). Both are defined in subservices.css.
 *
 * The percentage-of-percentage width trick on the before image (100/pos*100)
 * keeps the image itself unscaled while only its clipping container shrinks —
 * carried over unchanged from the hand-written page.
 */
export default function DragBeforeAfter({
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
    const x = clientX - rect.left;
    const p = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(p);
  };

  return (
    <div
      className="ba-slider"
      ref={ref}
      style={{ maxWidth: '560px', margin: '0 auto' }}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        drag(e);
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0) drag(e);
      }}
      data-reveal
    >
      <div className="ba-after">
        <Image src={after.url} alt={after.alt ?? 'After'} width={1000} height={600} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="ba-before" style={{ width: `${pos}%` }}>
        <Image
          src={before.url}
          alt={before.alt ?? 'Before'}
          width={1000}
          height={600}
          style={{ width: `${10000 / pos}%`, height: 'auto' }}
        />
      </div>
      <div className="ba-handle" style={{ left: `${pos}%` }} />
      <div className="ba-tags">
        <span className="btag">BEFORE</span>
        <span className="atag">AFTER</span>
      </div>
    </div>
  );
}
