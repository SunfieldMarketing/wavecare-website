'use client';

import { openVideoLightbox } from './VideoLightbox';

type Card = { vimeoId: string; posterUrl?: string | null; tag?: string | null; title: string };

/** .fw-grid > .fw-card(.hero) + .fw-side > .fw-card(.small) — background-video preview cards. */
export default function FeaturedVideoWorkInner({ hero, side }: { hero: Card; side: Card[] }) {
  const card = (c: Card, extraClass: string, key?: number) => (
    <div
      key={key}
      className={`fw-card ${extraClass}`}
      onClick={() => openVideoLightbox(c.vimeoId)}
      style={{ cursor: 'pointer', border: 'none', aspectRatio: '16/9', minHeight: 'auto', height: 'auto' }}
    >
      {c.posterUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${c.posterUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      )}
      <iframe
        src={`https://player.vimeo.com/video/${c.vimeoId}?background=1&autoplay=1&loop=1&muted=1&transparent=1`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={c.title}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to top, rgba(10, 58, 50, 0.9) 0%, rgba(10, 58, 50, 0) 40%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div className="fw-meta">
        {c.tag && <span className="tag">{c.tag}</span>}
        <span className="title">{c.title}</span>
      </div>
    </div>
  );

  return (
    <div className="fw-grid stagger" style={{ alignItems: 'center' }}>
      {card(hero, 'hero')}
      <div className="fw-side" style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 'auto' }}>
        {side.map((c, i) => card(c, 'small', i))}
      </div>
    </div>
  );
}
