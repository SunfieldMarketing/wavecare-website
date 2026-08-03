'use client';

import { useState } from 'react';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { CMSLinkGroup } from '../CMSLink';

/* ── Before / after ───────────────────────────────────────────────── */

export function BeforeAfterInner({ before, after, caption }: { before: string; after: string; caption?: string }) {
  return (
    <div data-reveal>
      <BeforeAfterSlider beforeImage={before} afterImage={after} />
      {caption && <p className="ba-caption">{caption}</p>}
    </div>
  );
}

/* ── Tabbed showcase ──────────────────────────────────────────────── */

export function TabsShowcaseInner({
  tabs,
  frame,
  buttons,
}: {
  tabs: any[];
  frame?: string;
  buttons?: any[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="phero-in" style={{ gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
      <div className="ctx-tabs" data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`ctx-tab ${active === i ? 'on' : ''}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            style={{ width: '100%', justifyContent: 'flex-start', cursor: 'pointer' }}
          >
            {tab.icon && <div className="ic" dangerouslySetInnerHTML={{ __html: tab.icon }} />}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ textWrap: 'unset' }}>{tab.title}</h3>
              {tab.body && <p>{tab.body}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="ctx" data-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ctx-stage" style={{ position: 'relative', height: '100%', minHeight: '400px', width: '100%' }}>
          {tabs.map((tab, i) => (
            <div key={i} className={`ctx-scene ${active === i ? 'on' : ''}`}>
              {frame === 'browser' ? (
                <div className="mock-web" style={{ maxWidth: '600px', width: '100%' }}>
                  <div className="bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="shot" style={{ aspectRatio: '16/10' }}>
                    {tab.image?.url && (
                      <Image
                        src={tab.image.url}
                        alt={tab.image.alt ?? tab.title ?? ''}
                        width={800}
                        height={600}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    )}
                  </div>
                  <div className="lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : frame === 'brochure' ? (
                <div className="mock-bro" style={{ maxWidth: '600px', width: '100%', gap: '16px', transform: 'none' }}>
                  <div className="pg" style={{ padding: 0, overflow: 'hidden', aspectRatio: '4/5' }}>
                    {tab.image?.url && (
                      <Image
                        src={tab.image.url}
                        alt={tab.image.alt ?? tab.title ?? ''}
                        width={800}
                        height={600}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                tab.image?.url && (
                  <Image
                    src={tab.image.url}
                    alt={tab.image.alt ?? tab.title ?? ''}
                    width={900}
                    height={700}
                    style={{ width: '100%', height: 'auto', borderRadius: '14px' }}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {buttons?.length ? <CMSLinkGroup buttons={buttons} /> : null}
    </div>
  );
}

/* ── Gallery with lightbox ────────────────────────────────────────── */

export function GalleryInner({
  items,
  layout,
  lightbox,
  showFilters,
}: {
  items: any[];
  layout?: string;
  lightbox?: boolean;
  showFilters?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState('ALL');

  // Build the filter bar from the categories editors assigned to each photo.
  const categories = ['ALL'];
  items.forEach((it) => {
    (it.categories ?? []).forEach((c: string) => {
      const up = c.toUpperCase();
      if (c && !categories.includes(up)) categories.push(up);
    });
  });

  const visible =
    filter === 'ALL'
      ? items
      : items.filter((it) => (it.categories ?? []).some((c: string) => c.toUpperCase() === filter));

  return (
    <>
      {showFilters && categories.length > 1 && (
        <div className="filter-bar" data-reveal>
          {categories.map((f) => (
            <button key={f} className={`fchip ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      )}

      <div
        className={layout === 'masonry' ? 'mason' : 'gal-grid'}
        data-reveal
        style={
          layout === 'masonry'
            ? undefined
            : { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '16px' }
        }
      >
        {visible.map((it, i) => {
          const img = it.image;
          if (!img?.url) return null;
          return (
            <div
              key={`${filter}-${img.url}`}
              className={layout === 'masonry' ? 'm' : undefined}
              style={{
                aspectRatio: it.aspect || undefined,
                breakInside: 'avoid',
                cursor: lightbox ? 'zoom-in' : 'default',
                overflow: 'hidden',
                borderRadius: '12px',
                animation: 'fadeUp 0.5s ease forwards',
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
                transform: 'translateY(20px)',
              }}
              onClick={() => lightbox && setOpen(i)}
            >
              <Image
                src={img.sizes?.card?.url || img.url}
                alt={img.alt ?? ''}
                width={800}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {lightbox && open !== null && (
        <div
          onClick={() => setOpen(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6,42,36,0.94)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            cursor: 'zoom-out',
          }}
        >
          <Image
            src={visible[open]?.image?.sizes?.wide?.url || visible[open]?.image?.url}
            alt={visible[open]?.image?.alt ?? ''}
            width={1600}
            height={1200}
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
        </div>
      )}
    </>
  );
}
