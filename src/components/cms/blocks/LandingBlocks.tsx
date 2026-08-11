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

/** `wc` (commercial.css) and `wct` (testimonials.css) share this content shape. */
const p = (block: any) => (block.variant === 'wct' ? 'wct' : 'wc');

export function LandingHeroBlock({ block }: { block: any }) {
  const trust: any[] = block.trustItems ?? [];
  const x = p(block);
  const isWct = x === 'wct';

  const inner = (
    <>
      {block.eyebrow && <p className={`${x}-eyebrow`}>{block.eyebrow}</p>}
      <h1>{emphasise(block.title)}</h1>
      {block.subtitle && <p className={`${x}-hero-sub`}>{block.subtitle}</p>}
      {trust.length > 0 && (
        <div className={`${x}-hero-trust`}>
          {trust.map((t, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="dot" />}
              <span>{t.text}</span>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={`${x}-hero`}>{isWct ? <div className="wct-hero-inner">{inner}</div> : inner}</div>
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
              loading="eager"
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
  const x = p(block);
  return (
    <>
    <div className={x === 'wct' ? 'wct-stats-strip' : 'wc-stats-bar'}>
      <div className={`${x}-stats-inner`}>
        {(block.stats ?? []).map((s: any, i: number) => (
          <div className={`${x}-stat`} key={i}>
            {/* data-target drives the shared count-up script; without it the
                value simply renders as typed. */}
            <div
              className={`${x}-stat-num`}
              {...(s.countTo
                ? {
                    'data-target': s.countTo,
                    'data-suffix': s.suffix ?? '',
                    'data-decimals': String(s.decimals ?? 0),
                  }
                : {})}
            >
              {s.value}
            </div>
            <div className={`${x}-stat-label`}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    {block.showTransition && <div className={x === 'wct' ? 'wct-hero-transition' : 'wc-transition'} />}
    </>
  );
}

export function DividerLabelBlock({ block }: { block: any }) {
  return (
    <div className="wct-divider">
      <div className="wct-divider-line" />
      <span className="wct-divider-text">{block.text}</span>
      <div className="wct-divider-line" />
    </div>
  );
}

export function InlineCTABlock({ block }: { block: any }) {
  return (
    <div className="wct-inline-cta">
      <div className="wct-inline-cta-text">
        {block.lead && <span>{block.lead}</span>}
        {block.text}
      </div>
      {block.cta?.label && <CMSLink link={block.cta} className="wct-inline-cta-btn" />}
    </div>
  );
}

const stars = (n = 5) => '★'.repeat(Math.max(1, Math.min(n, 5)));

export function VideoTestimonialsBlock({ block }: { block: any }) {
  const items: any[] = (block.testimonials ?? []).filter((t: any) => typeof t === 'object');
  return (
    <div className="wct-video-section">
      {block.label && <span className="wct-section-label">{block.label}</span>}
      {block.title && <h2 className="wct-section-title">{emphasise(block.title)}</h2>}

      {items.map((t, i) => (
        <Fragment key={t.id ?? i}>
          {i > 0 && (
            <div className="wct-row-divider">
              <hr />
            </div>
          )}
          {/* Rows alternate side automatically. */}
          <div className={`wct-video-row${i % 2 === 1 ? ' wct-reverse' : ''}`}>
            <div className="wct-video-embed">
              <iframe
                src={`https://player.vimeo.com/video/${t.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&quality=1080p`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title={`${t.author} testimonial`}
              />
            </div>
            <div className="wct-video-content">
              <div className="wct-stars">{stars(t.rating)}</div>
              <p className="wct-pull-quote">{t.quote}</p>
              <div className="wct-video-attr">
                <div className="wct-attr-line" />
                <div className="wct-attr-block">
                  <span className="wct-attr-name">{t.author}</span>
                  {t.role && <span className="wct-attr-role">{t.role}</span>}
                  {t.organisation && <span className="wct-attr-facility">{t.organisation}</span>}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export function TestimonialCardsBlock({ block }: { block: any }) {
  const items: any[] = (block.testimonials ?? []).filter((t: any) => typeof t === 'object');
  return (
    <div className="wct-text-section">
      <div className="wct-text-grid">
        {items.map((t, i) => (
          <div className="wct-text-card" key={t.id ?? i}>
            <div className="wct-card-top">
              <span className="wct-stars">{stars(t.rating)}</span>
              <span className="wct-quote-mark">&ldquo;</span>
            </div>
            <p className="wct-quote">{t.quote}</p>
            {t.outcome && <div className="wct-card-outcome">{t.outcome}</div>}
            <div className="wct-attribution">
              <div className="wct-avatar">
                {t.initials ||
                  (t.author ?? '')
                    .split(' ')
                    .map((w: string) => w[0])
                    .join('')
                    .slice(0, 2)}
              </div>
              <div className="wct-attr-card-block">
                <span className="wct-attr-card-name">{t.author}</span>
                {t.role && <span className="wct-attr-card-role">{t.role}</span>}
                {t.organisation && <span className="wct-attr-card-loc">{t.organisation}</span>}
              </div>
            </div>
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
  const x = p(block);
  const isWct = x === 'wct';
  return (
    <div className={isWct ? 'wct-cta-section' : 'wc-body-section'}>
      <div className={isWct ? 'wct-cta-inner' : 'wc-body-inner'}>
        {block.tag && <span className={isWct ? 'wct-cta-tag' : 'wc-section-tag'}>{block.tag}</span>}
        <h2>{emphasise(block.title)}</h2>
        {block.subtitle && <p className={isWct ? undefined : 'wc-sub'}>{block.subtitle}</p>}
        {block.items?.length > 0 && (
          <ul className="wc-audit-list">
            {block.items.map((it: any, i: number) => (
              <li key={i}>{it.text}</li>
            ))}
          </ul>
        )}
        {(block.cta?.label || block.ctaNote) && (
          <div className={`${x}-cta-wrap`}>
            {block.cta?.label && <CMSLink link={block.cta} className={`${x}-cta-btn`} />}
            {block.ctaNote && <span className={`${x}-cta-note`}>{block.ctaNote}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
