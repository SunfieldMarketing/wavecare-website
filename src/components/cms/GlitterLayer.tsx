'use client';

import { useEffect, useState } from 'react';

/**
 * Decorative drifting stars behind the testimonials hero.
 *
 * Generated on the client because the positions are random — doing it during
 * render would produce different markup on the server and the client and
 * trigger a hydration mismatch.
 */
const COLORS = ['#1D9E75', '#5DCAA5', '#9FE1CB', '#ffffff'];

export default function GlitterLayer({ count = 40 }: { count?: number }) {
  const [stars, setStars] = useState<Array<{ id: number; style: any }>>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setStars(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          '--star-max-opacity': Math.random() * 0.4 + 0.1,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 6 + 4}s`,
          width: `${Math.random() * 12 + 6}px`,
          height: `${Math.random() * 12 + 6}px`,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
      })),
    );
  }, [count]);

  return (
    <div className="wct-glitter-layer">
      {stars.map((s) => (
        <span className="wct-star" key={s.id} style={s.style} />
      ))}
    </div>
  );
}
