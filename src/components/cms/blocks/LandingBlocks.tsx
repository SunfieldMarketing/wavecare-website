import { Fragment } from 'react';
import CMSLink from '../CMSLink';

/**
 * Renderers for the landing-page block set. Markup mirrors the hand-written
 * /commercial page so commercial.css applies unchanged.
 */

/** Renders _underscore-wrapped_ words as <em>, and newlines as <br />. */
function emphasise(text?: string | null) {
  if (!text) return null;
  return text.split('\n').map((line, li, lines) => (
    <Fragment key={li}>
      {line.split(/(_[^_]+_)/g).map((part, i) =>
        part.startsWith('_') && part.endsWith('_') && part.length > 2 ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
      {li < lines.length - 1 && <br />}
    </Fragment>
  ));
}

export function LandingHeroBlock({ block }: { block: any }) {
  const trust: any[] = block.trustItems ?? [];
  return (
    <div className="wc-hero">
      {block.eyebrow && <p className="wc-eyebrow">{block.eyebrow}</p>}
      <h1>{emphasise(block.title)}</h1>
      {trust.length > 0 && (
        <div className="wc-hero-trust">
          {trust.map((t, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="dot" />}
              <span>{t.text}</span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export function VideoFeatureBlock({ block }: { block: any }) {
  return (
    <>
      {block.contextLine && (
        <div className="wc-video-context">
          <span className="play-icon" />
          <span>{block.contextLine}</span>
        </div>
      )}

      <div className="wc-video-section">
        <div className="wc-video-wrap">
          <div className="wc-video-border" />
          <div className="wc-video-container">
            <iframe
              src={`https://player.vimeo.com/video/${block.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&quality=1080p`}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              title={block.videoTitle || 'Video'}
            />
          </div>
        </div>
      </div>

      {(block.subhead || block.cta?.label) && (
        <div className="wc-video-cta">
          {block.subhead && <p className="wc-subhead">{block.subhead}</p>}
          {block.cta?.label && <CMSLink link={block.cta} className="wc-btn-primary" />}
          {block.ctaNote && <span className="wc-btn-note">{block.ctaNote}</span>}
        </div>
      )}
    </>
  );
}

export function StatsBarBlock({ block }: { block: any }) {
  return (
    <div className="wc-stats-bar">
      <div className="wc-stats-inner">
        {(block.stats ?? []).map((s: any, i: number) => (
          <div className="wc-stat" key={i}>
            <div className="wc-stat-num">{s.value}</div>
            <div className="wc-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PillBandBlock({ block }: { block: any }) {
  return (
    <>
      <div className="wc-types-band">
        {block.label && <p className="wc-types-label">{block.label}</p>}
        <div className="wc-types-row">
          {(block.pills ?? []).map((p: any, i: number) => (
            <span className="wc-type-pill" key={i}>
              {p.text}
            </span>
          ))}
        </div>
      </div>
      {block.showTransition !== false && <div className="wc-transition" />}
    </>
  );
}

export function AuditCTABlock({ block }: { block: any }) {
  return (
    <div className="wc-body-section">
      <div className="wc-body-inner">
        {block.tag && <span className="wc-section-tag">{block.tag}</span>}
        <h2>{block.title}</h2>
        {block.subtitle && <p className="wc-sub">{block.subtitle}</p>}
        {block.items?.length > 0 && (
          <ul className="wc-audit-list">
            {block.items.map((it: any, i: number) => (
              <li key={i}>{it.text}</li>
            ))}
          </ul>
        )}
        {(block.cta?.label || block.ctaNote) && (
          <div className="wc-cta-wrap">
            {block.cta?.label && <CMSLink link={block.cta} className="wc-cta-btn" />}
            {block.ctaNote && <span className="wc-cta-note">{block.ctaNote}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
