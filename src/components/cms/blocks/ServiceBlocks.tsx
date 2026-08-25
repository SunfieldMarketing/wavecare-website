import Image from 'next/image';
import { CMSLinkGroup } from '../CMSLink';
import { parseHighlight } from '../appearance';

/**
 * Renderers for /services.
 *
 * services.css owns its own class vocabulary — .split, .stats-row/.stat-num,
 * .final-cta — which is NOT interchangeable with globals.css (.stats/.num/.cap,
 * .final). Emitting the wrong set produces an unstyled section.
 */

const lines = (text?: string | null) =>
  (text ?? '').split('\n').map((l, i, a) => (
    <span key={i}>
      {l}
      {i < a.length - 1 && <br />}
    </span>
  ));

export function ServicesGridBlock({ block }: { block: any }) {
  const { tone, anchorId, eyebrow, title, lead, cards } = block;
  return (
    <section className={tone ?? 'dark'} id={anchorId || undefined}>
      <div className="container">
        <div className="services-head reveal">
          {eyebrow && <span className="label on-dark">{eyebrow}</span>}
          {title && <h2>{lines(title)}</h2>}
          {lead && <p className="lead">{lead}</p>}
        </div>

        <div className="services-grid">
          {(cards ?? []).map((c: any, i: number) => (
            <article className={`service-card reveal delay-${i + 1}`} key={i}>
              <span className="card-img" aria-hidden="true" />
              <span className="num">{c.number || String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              {c.body && <p>{c.body}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SplitRowBlock({ block }: { block: any }) {
  const { tone, wrapSection, flipped, textTone, eyebrow, title, body, bullets, buttons } = block;

  const inner = (
    <div
      className={`split ${flipped ? 'flipped ' : ''}${textTone ?? 'on-dark'} reveal`}
    >
      <div className="split-text">
        {eyebrow && <span className={`label ${textTone ?? 'on-dark'}`}>{eyebrow}</span>}
        <h2>{lines(title)}</h2>
        {body && <p className="split-body">{body}</p>}
        {bullets?.length > 0 && (
          <ul className="feature-list">
            {bullets.map((b: any, i: number) => (
              <li key={i}>{b.text}</li>
            ))}
          </ul>
        )}
        {buttons?.length > 0 && <CMSLinkGroup buttons={buttons} className="" />}
      </div>
      <div className="split-image">
        {block.mediaType === 'image' && block.image?.url ? (
          <Image
            src={block.image.url}
            alt={block.image.alt ?? ''}
            width={900}
            height={700}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : block.video?.url || block.videoUrl ? (
          // Autoplay is driven by the page's IntersectionObserver, matching the
          // hand-written markup — the element ships without an autoplay attribute.
          // Prefers the S3-backed `video` upload; `videoUrl` is only the
          // legacy raw-path fallback (see the block schema's own comment).
          <video
            src={block.video?.url || block.videoUrl}
            muted
            loop
            playsInline
            style={{ pointerEvents: 'none' }}
          />
        ) : null}
      </div>
    </div>
  );

  // Consecutive splits sharing a background live inside one <section>, so only
  // the first of a run opens a new one.
  return wrapSection ? (
    <section className={tone ?? 'deeper'}>
      <div className="container">{inner}</div>
    </section>
  ) : (
    <div className="container">{inner}</div>
  );
}

export function FeatureRowBlock({ block }: { block: any }) {
  const { tone, eyebrow, title, cards } = block;
  return (
    <section className={tone ?? 'dark'}>
      <div className="container">
        <div className="healthcare-head reveal">
          {eyebrow && <span className="label on-dark">{eyebrow}</span>}
          {title && <h2>{lines(title)}</h2>}
        </div>
        <div className="feature-row">
          {(cards ?? []).map((c: any, i: number) => (
            <div className={`feature-card reveal delay-${i + 1}`} key={i}>
              <h3>{c.title}</h3>
              {c.body && <p>{c.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// .stat-num/.stat-label are hardcoded for a light background in
// services.css (no dark-tone variant exists), and in the original this
// markup only ever appeared inside the same <section className="light">
// as the trusted-head/marquee that follows it. Wrapping in its own `light`
// section here reproduces that exactly — two adjacent same-background
// sections read as one seamless block, same as the original's single one.
export function StatsRowBlock({ block }: { block: any }) {
  return (
    <section className="light">
      <div className="container">
        <div className="stats-row reveal">
          {(block.stats ?? []).map((s: any, i: number) => (
            <div className="stat" key={i}>
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LogoStripBlock({ block }: { block: any }) {
  const { variant, tone, eyebrow, title, logos } = block;
  const hasHead = eyebrow || title;
  const isHome = variant === 'home';
  return (
    <section className={`${tone ?? 'dark'}${isHome ? ' sec-pad' : ''}`}>
      {hasHead && (
        <div className="container">
          {isHome ? (
            <div className="sec-head center" data-reveal>
              {eyebrow && <span className={`label${tone === 'light' ? ' dark' : ''}`}>{eyebrow}</span>}
              {title && <h2>{parseHighlight(title)}</h2>}
            </div>
          ) : (
            <div className="trusted-head reveal">
              {/* on-dark/on-light mirror the original's own class names for this
                  spot exactly (services.css has no rule for either — both are
                  dead/no-op there, same as in the original). Do NOT add
                  globals.css's real `.label.dark` here; that's the home-variant's
                  job above — this /services branch must stay visually identical
                  to the original regardless of tone. */}
              {eyebrow && (
                <span className={`label ${tone === 'light' ? 'on-light' : 'on-dark'}`}>{eyebrow}</span>
              )}
              {title && <h2>{lines(title)}</h2>}
            </div>
          )}
        </div>
      )}
      <div className="marquee">
        {/* Rendered 4x server-side and driven by a pure CSS animation
            (marquee-anim, see globals.css) rather than a client-side script
            duplicating + translating the row — the JS version depended on a
            'use client' effect that proved unreliable, some page loads never
            ran it, leaving a static, under-filled row that read as "logos on
            the left, empty space on the right". This has no such dependency:
            the loop is correct the instant the CSS parses, no JS required.
            4 copies (not 2): .marquee sits outside .container, i.e. full-
            bleed edge to edge, and a short logo list (~7) at only 2x isn't
            reliably wider than a large viewport - the loop would visibly
            run out of content and gap/stutter instead of scrolling
            continuously. 4x guarantees enough width regardless of screen
            size or how many logos are configured. */}
        <div className="marquee-row marquee-anim" id="marqueeRow">
          {[0, 1, 2, 3].map((copy) =>
            (logos ?? []).map((l: any, i: number) =>
              l.image?.url ? (
                <div className="m-logo" key={`${copy}-${i}`} aria-hidden={copy === 0 ? undefined : true}>
                  <Image
                    src={l.image.url}
                    alt={copy === 0 ? (l.name ?? l.image.alt ?? '') : ''}
                    width={200}
                    height={100}
                    className={l.scaleUp ? 'scale-up' : undefined}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
              ) : null,
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export function ServiceTestimonialsBlock({ block }: { block: any }) {
  const { eyebrow, title, quotes } = block;
  return (
    <section className="testimonial-section sec-pad">
      <div className="testimonial-bg" />
      <div className="container">
        <div className="testimonial-head reveal">
          {eyebrow && <span className="label on-dark">{eyebrow}</span>}
          {title && <h2>{lines(title)}</h2>}
        </div>
        <div className="testimonial-grid">
          {(quotes ?? []).map((q: any, i: number) => (
            <div className={`testimonial-card reveal delay-${i + 1}`} key={i}>
              <span className="quote-mark">&ldquo;</span>
              <blockquote>{q.quote}</blockquote>
              <div className="testimonial-attribution">
                <strong>{q.author}</strong>
                {q.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFinalCTABlock({ block }: { block: any }) {
  const { eyebrow, title, subtitle, buttons } = block;
  return (
    <section className="final-cta">
      <div className="final-cta-bg" />
      <div className="container">
        {eyebrow && <span className="label on-dark reveal">{eyebrow}</span>}
        <h2 className="reveal delay-1">{lines(title)}</h2>
        {subtitle && <p className="final-cta-sub reveal delay-2">{subtitle}</p>}
        {buttons?.length > 0 && (
          <div className="reveal delay-3">
            <CMSLinkGroup buttons={buttons} className="" center />
          </div>
        )}
      </div>
    </section>
  );
}
