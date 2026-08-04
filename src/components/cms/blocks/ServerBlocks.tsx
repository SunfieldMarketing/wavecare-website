import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import {
  sectionClassName,
  containerClassName,
  sectionStyle,
  overlayStyle,
  hasMediaBackground,
  parseHighlight,
  type Appearance,
} from '../appearance';
import { CMSLinkGroup } from '../CMSLink';
import ProcessShowcase from './ProcessShowcase';
import CameraCursor from './CameraCursor';

/** Shared eyebrow + heading + sub-paragraph, matching .sec-head. */
export function SectionHead({ heading }: { heading?: any }) {
  if (!heading || (!heading.eyebrow && !heading.title && !heading.subtitle)) return null;
  // globals.css:246 already defines `.sec-head.center` — use the class rather
  // than inline styles so the stylesheet stays in control.
  const cls = heading.align === 'center' ? 'sec-head center' : 'sec-head';
  return (
    <div className={cls} data-reveal>
      {heading.eyebrow && <span className="label">{heading.eyebrow}</span>}
      {heading.title && <h2>{parseHighlight(heading.title)}</h2>}
      {heading.subtitle && <p className="sub">{heading.subtitle}</p>}
    </div>
  );
}

/** Wraps a block in its <section> with CMS-driven appearance. */
export function Section({
  appearance,
  children,
  className,
}: {
  appearance: Appearance;
  children: React.ReactNode;
  className?: string;
}) {
  const ov = overlayStyle(appearance);
  const bgImage = appearance?.backgroundImage;
  const bgVideo = appearance?.backgroundVideo;

  return (
    <section
      id={appearance?.anchorId || undefined}
      className={sectionClassName(appearance, className)}
      style={sectionStyle(appearance)}
    >
      {appearance?.background === 'image' && bgImage?.url && (
        <Image
          src={bgImage.url}
          alt={bgImage.alt ?? ''}
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
      )}
      {appearance?.background === 'video' && bgVideo?.source === 'vimeo' && bgVideo.vimeoId && (
        <iframe
          src={`https://player.vimeo.com/video/${bgVideo.vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          title=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 0 }}
        />
      )}
      {appearance?.background === 'video' && bgVideo?.source === 'file' && bgVideo.url && (
        <video
          src={bgVideo.url}
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
      )}
      {ov && <div style={ov} />}
      {/* Only introduce a stacking wrapper when there is a media background to
          sit above. Adding it unconditionally put an extra div between
          <section> and .container, which breaks descendant rules like
          `.final .container` and `.phero .container`. */}
      {hasMediaBackground(appearance) ? (
        <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */

export function HeroBlock({ block }: { block: any }) {
  const { layout, eyebrow, title, subtitle, mosaicImages, buttons, minHeight, appearance, cameraCursor } =
    block;
  const isMosaic = layout === 'mosaic';
  const images: any[] = Array.isArray(mosaicImages) ? mosaicImages : [];

  const heightStyle =
    minHeight === 'tall' ? { minHeight: '60vh' } : minHeight === 'compact' ? { minHeight: '40vh' } : undefined;

  return (
    <section
      id={appearance?.anchorId || undefined}
      className={isMosaic ? 'phero' : 'hero'}
      style={{ ...sectionStyle(appearance), ...heightStyle, position: 'relative', overflow: 'hidden' }}
    >
      {cameraCursor?.enabled && <CameraCursor fStop={cameraCursor.fStop || 'F/1.8'} />}
      {isMosaic && images.length > 0 && (
        <div className="phero-bg">
          <div className="phero-grid-full">
            {Array.from({ length: 48 }).map((_, i) => {
              const img = images[i % images.length];
              if (!img?.url) return <div key={i} className="cell" />;
              return (
                <div key={i} className="cell" style={{ padding: 0, overflow: 'hidden' }}>
                  <Image
                    src={img.sizes?.card?.url || img.url}
                    alt={img.alt ?? ''}
                    width={800}
                    height={600}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(10%) opacity(0.65)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isMosaic && appearance?.background === 'video' && appearance.backgroundVideo?.vimeoId && (
        <div className="hero-video-wrap">
          <iframe
            src={`https://player.vimeo.com/video/${appearance.backgroundVideo.vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&quality=1080p`}
            allow="autoplay; fullscreen; picture-in-picture"
            title=""
          />
        </div>
      )}
      {!isMosaic && appearance?.background === 'video' && <div className="hero-overlay" />}

      <div className="container">
        <div className={isMosaic ? 'phero-center' : 'hero-inner'} data-reveal>
          {eyebrow && <span className="label reveal">{eyebrow}</span>}
          <h1 className="reveal delay-1">{parseHighlight(title)}</h1>
          {subtitle && <p className={isMosaic ? 'phero-sub' : 'hero-sub reveal delay-2'}>{subtitle}</p>}
          <CMSLinkGroup buttons={buttons} className="btn-group hero-actions reveal delay-3" />
        </div>
      </div>
    </section>
  );
}

/* ── Notice bar ───────────────────────────────────────────────────── */

export function NoticeBarBlock({ block }: { block: any }) {
  return (
    <div
      id={block.appearance?.anchorId || undefined}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        padding: '16px 20px',
        textAlign: 'center',
        ...(block.appearance?.background === 'custom' && block.appearance.customBackground
          ? { background: block.appearance.customBackground }
          : {}),
      }}
    >
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em', margin: 0 }}>
        {block.text}
      </p>
    </div>
  );
}

/* ── Card grid ────────────────────────────────────────────────────── */

export function CardGridBlock({ block }: { block: any }) {
  const { heading, cards, columns, style, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <SectionHead heading={heading} />
        {/* .shoot-grid and .deliv already define their own responsive grids.
            The column override is opt-in via a namespaced class so it never
            clobbers the stylesheet's breakpoints. */}
        <div
          className={[
            style === 'plain' ? 'deliv stagger' : 'shoot-grid',
            columns && columns !== '4' ? `cms-cols-${columns}` : '',
          ]
            .filter(Boolean)
            .join(' ')}
          data-reveal
        >
          {(cards ?? []).map((card: any, i: number) => (
            <div key={i} className={style === 'plain' ? 'deliv-item' : 'shoot-card'}>
              {card.icon && <div className="ic">{card.icon}</div>}
              {style === 'numbered' && <span className="label">{String(i + 1).padStart(2, '0')}</span>}
              {card.image?.url && (
                <Image
                  src={card.image.sizes?.card?.url || card.image.url}
                  alt={card.image.alt ?? ''}
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '16px' }}
                />
              )}
              <h3 style={{ fontFamily: 'var(--font-head)' }}>{card.title}</h3>
              {card.body && <p>{card.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Stats ────────────────────────────────────────────────────────── */

export function StatsBlock({ block }: { block: any }) {
  return (
    <Section appearance={block.appearance}>
      <div className={containerClassName(block.appearance)}>
        <SectionHead heading={block.heading} />
        {/* globals.css:261 ships .stats (3 across) with a .four modifier for
            4 across — use those instead of inline grid styles. */}
        <div className={`stats stagger${(block.stats ?? []).length === 4 ? ' four' : ''}`}>
          {(block.stats ?? []).map((s: any, i: number) => (
            <div className="stat" key={i}>
              {/* data-count drives the shared count-up script; the suffix stays
                  outside the counted span so it is not overwritten. */}
              {s.countTo != null ? (
                <div className="num">
                  <span data-count={s.countTo} {...(s.comma ? { 'data-comma': '1' } : {})}>
                    0
                  </span>
                  {s.suffix}
                </div>
              ) : (
                <div className="num">{s.value}</div>
              )}
              <div className="cap">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Process ──────────────────────────────────────────────────────── */

export function ProcessBlock({ block }: { block: any }) {
  const { heading, steps, buttons, appearance, layout, contactSheet } = block;
  const sheet = (Array.isArray(contactSheet) ? contactSheet : [])
    .filter((m: any) => m?.url)
    .map((m: any) => ({ url: m.sizes?.card?.url || m.url, alt: m.alt }));

  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <SectionHead heading={heading} />

        {layout === 'cards' ? (
          // Plain numbered cards reuse .deliv, which the stylesheet defines.
          <div className="deliv stagger">
            {(steps ?? []).map((step: any, i: number) => (
              <div className="deliv-item" key={i}>
                <div className="ic">{step.label || String(i + 1).padStart(2, '0')}</div>
                <h4>{step.title}</h4>
                {step.body && <p>{step.body}</p>}
              </div>
            ))}
          </div>
        ) : (
          <ProcessShowcase steps={steps ?? []} sheetImages={sheet} />
        )}

        <CMSLinkGroup buttons={buttons} />
      </div>
    </Section>
  );
}

/* ── Case study showcase cards ────────────────────────────────────── */

export function CaseStudyCardsBlock({ block }: { block: any }) {
  const { heading, cards, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <SectionHead heading={heading} />
        <div className="cs-grid stagger">
          {(cards ?? []).map((card: any, i: number) => (
            <div className="cs-card" key={i}>
              <div className="cs-media">
                {card.image?.url && (
                  <Image
                    src={card.image.url}
                    alt={card.image.alt ?? card.title ?? ''}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                  />
                )}
                {card.tags?.length > 0 && (
                  <div className="cs-tag">
                    {card.tags.map((t: any, ti: number) => (
                      <span key={ti}>{t.text}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="cs-body">
                <span className="cs-client">{card.client}</span>
                <h3>{card.title}</h3>
                {card.description && <p className="cs-desc">{card.description}</p>}
                {card.result?.value && (
                  <div className="cs-result">
                    <span className="num">{card.result.value}</span>
                    {card.result.label && <span className="lbl">{card.result.label}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Legal document ───────────────────────────────────────────────── */

export function LegalDocumentBlock({ block }: { block: any }) {
  const { title, effectiveDate, sections, backLink, appearance } = block;
  return (
    <section
      id={appearance?.anchorId || undefined}
      className={sectionClassName(appearance ?? { background: 'ink' })}
      style={{ ...sectionStyle(appearance), paddingTop: '160px', minHeight: '100vh' }}
    >
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>{title}</h1>
        {effectiveDate && (
          <p>
            <strong>{effectiveDate}</strong>
          </p>
        )}

        {(sections ?? []).map((s: any, i: number) => (
          <section key={i}>
            <h2>{s.heading}</h2>
            {s.content && <RichText data={s.content} />}
          </section>
        ))}

        {backLink?.enabled !== false && (
          <div className="back-link">
            <Link href={backLink?.url || '/'}>{backLink?.label || '← Back to Home'}</Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Final CTA ────────────────────────────────────────────────────── */

export function FinalCTABlock({ block }: { block: any }) {
  const { eyebrow, title, subtitle, buttons, waveAnimation, appearance } = block;
  return (
    <section id={appearance?.anchorId || undefined} className="final">
      {waveAnimation !== false && <canvas id="waveCanvas" />}
      <div className="final-in">
        {eyebrow && <span className="label">{eyebrow}</span>}
        <h2>{parseHighlight(title)}</h2>
        {subtitle && <p className="sub">{subtitle}</p>}
        <CMSLinkGroup buttons={buttons} />
      </div>
    </section>
  );
}
