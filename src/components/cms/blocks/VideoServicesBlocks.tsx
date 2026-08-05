import { parseHighlight } from '../appearance';
import VideoGridInner from './VideoGridInner';
import FeaturedVideoWorkInner from './FeaturedVideoWorkInner';

export function CommercialPlayerBlock({ block }: { block: any }) {
  const { eyebrow, title, vimeoId } = block;
  return (
    <section className="panel sec-pad" style={{ background: '#062A24' }}>
      <div className="container">
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2 style={{ textWrap: 'unset' }}>{parseHighlight(title)}</h2>}
        </div>
        <div
          className="commercial-player stagger"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            position: 'relative',
            aspectRatio: '16/9',
            background: '#000',
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&quality=1080p`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Commercial"
          />
        </div>
      </div>
    </section>
  );
}

export function TwoColumnTextBlock({ block }: { block: any }) {
  const { tone, eyebrow, title, body } = block;
  const dark = tone !== 'light';
  return (
    <section
      className="panel sec-pad"
      style={dark ? { background: '#062A24' } : { background: '#EAF4F2', color: '#062A24' }}
    >
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div className="sec-head" data-reveal style={{ margin: 0 }}>
          {eyebrow && (
            <span className="label" style={dark ? undefined : { color: 'var(--teal-accent)' }}>
              {eyebrow}
            </span>
          )}
          {title && <h2 style={dark ? { textWrap: 'unset' } : { color: '#062A24', textWrap: 'unset' }}>{parseHighlight(title)}</h2>}
        </div>
        <div className="why-text stagger" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          {(body ?? []).map((p: any, i: number) => (
            <p key={i} style={{ marginBottom: i < body.length - 1 ? '20px' : 0 }}>
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IconFeatureGridBlock({ block }: { block: any }) {
  const { eyebrow, title, subtitle, cards } = block;
  return (
    <section className="panel deep sec-pad">
      <div className="container">
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
          {subtitle && (
            <p className="sub" style={{ margin: '20px auto 0', maxWidth: '600px' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="four-kinds-grid stagger" style={{ marginTop: '60px' }}>
          {(cards ?? []).map((c: any, i: number) => (
            <div className="fk-card" key={i}>
              {c.icon && <div className="ic" dangerouslySetInnerHTML={{ __html: c.icon }} />}
              <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '16px' }}>{c.title}</h3>
              {c.body && (
                <p style={{ color: 'var(--on-dark)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>
                  {c.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoGridBlock({ block }: { block: any }) {
  const { heading, enableFilters, filters, videos } = block;
  const centered = heading?.align === 'center';
  return (
    <section className="panel deep sec-pad">
      <div className="container container-wide">
        {heading && (heading.eyebrow || heading.title) && (
          <div className={centered ? 'sec-head center' : 'sec-head'} data-reveal>
            {heading.eyebrow && <span className="label">{heading.eyebrow}</span>}
            {heading.title && <h2>{parseHighlight(heading.title)}</h2>}
            {heading.subtitle && (
              <p className="sub" style={{ margin: '20px auto 0', maxWidth: '600px' }}>
                {heading.subtitle}
              </p>
            )}
          </div>
        )}
        <VideoGridInner videos={videos ?? []} filters={filters} enableFilters={enableFilters} />
      </div>
    </section>
  );
}

export function FeaturedVideoWorkBlock({ block }: { block: any }) {
  const { heading, hero, side } = block;
  if (!hero) return null;
  return (
    <section className="panel deep sec-pad" style={{ paddingTop: 0 }}>
      <div className="container container-wide">
        {heading && (heading.eyebrow || heading.title) && (
          <div className="sec-head" data-reveal>
            {heading.eyebrow && <span className="label">{heading.eyebrow}</span>}
            {heading.title && <h2>{parseHighlight(heading.title)}</h2>}
          </div>
        )}
        <FeaturedVideoWorkInner hero={hero} side={side ?? []} />
      </div>
    </section>
  );
}
