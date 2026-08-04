import Image from 'next/image';
import { CMSLinkGroup } from '../CMSLink';

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
        ) : block.videoUrl ? (
          // Autoplay is driven by the page's IntersectionObserver, matching the
          // hand-written markup — the element ships without an autoplay attribute.
          <video src={block.videoUrl} muted loop playsInline style={{ pointerEvents: 'none' }} />
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

export function StatsRowBlock({ block }: { block: any }) {
  return (
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
  );
}

export function LogoStripBlock({ block }: { block: any }) {
  const { tone, eyebrow, title, logos } = block;
  const hasHead = eyebrow || title;
  return (
    <section className={tone ?? 'dark'}>
      {hasHead && (
        <div className="container">
          <div className="trusted-head reveal">
            {eyebrow && (
              <span className={`label on-dark${tone === 'light' ? ' dark' : ''}`}>{eyebrow}</span>
            )}
            {title && <h2>{lines(title)}</h2>}
          </div>
        </div>
      )}
      <div className="marquee">
        {/* id is required: the page script duplicates this row to loop it. */}
        <div className="marquee-row" id="marqueeRow">
          {(logos ?? []).map((l: any, i: number) =>
            l.image?.url ? (
              <div className="m-logo" key={i}>
                <Image
                  src={l.image.url}
                  alt={l.name ?? l.image.alt ?? ''}
                  width={200}
                  height={100}
                  className={l.scaleUp ? 'scale-up' : undefined}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            ) : null,
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
            <CMSLinkGroup buttons={buttons} className="" />
          </div>
        )}
      </div>
    </section>
  );
}
