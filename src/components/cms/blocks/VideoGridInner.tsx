'use client';

import { useState } from 'react';
import { openVideoLightbox } from './VideoLightbox';

/** .filter-bar/.fchip + .types-grid/.tcard — filterable clickable video cards. */
export default function VideoGridInner({
  videos,
  filters,
  enableFilters,
}: {
  videos: Array<{
    title: string;
    description?: string | null;
    vimeoId: string;
    poster?: { url: string } | null;
    category?: string | null;
    filterKey?: string | null;
  }>;
  filters?: Array<{ label: string; key: string }>;
  enableFilters?: boolean;
}) {
  const [active, setActive] = useState('all');

  const visible = active === 'all' ? videos : videos.filter((v) => v.filterKey === active);

  // Falls back to Vimeo's own CDN thumbnail (no API key needed) when an editor
  // hasn't uploaded a custom poster, matching the original's hardcoded
  // i.vimeocdn.com URLs without requiring them to be re-entered by hand.
  const thumbUrl = (v: (typeof videos)[number]) => {
    const img = v.poster?.url || `https://vumbnail.com/${v.vimeoId}.jpg`;
    return `linear-gradient(rgba(10,58,50,0.2), rgba(10,58,50,0.6)), url(${img})`;
  };

  return (
    <>
      {enableFilters && filters?.length ? (
        <div className="filter-bar" data-reveal>
          <button className={`fchip ${active === 'all' ? 'on' : ''}`} onClick={() => setActive('all')}>
            All Projects
          </button>
          {filters.map((f) => (
            <button key={f.key} className={`fchip ${active === f.key ? 'on' : ''}`} onClick={() => setActive(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="types-grid stagger">
        {visible.map((v, i) => (
          <div
            key={i}
            className="tcard"
            onClick={() => openVideoLightbox(v.vimeoId)}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="thumb"
              data-label={v.category || ''}
              style={{ backgroundImage: thumbUrl(v), backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="play">
                <span>&#9654;</span>
              </div>
            </div>
            <div className="body">
              <h3>{v.title}</h3>
              {v.description && <p>{v.description}</p>}
              {v.category && <div className="where">{v.category}</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
