import { Section } from './ServerBlocks';
import { containerClassName, parseHighlight } from '../appearance';
import CMSLink from '../CMSLink';
import ServiceCarouselInner from './ServiceCarouselInner';

export function ShowreelBlock({ block }: { block: any }) {
  const { eyebrow, title, paragraphs, button, vimeoId, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="showreel">
          <div data-reveal>
            {eyebrow && <span className="label">{eyebrow}</span>}
            {title && <h2>{parseHighlight(title)}</h2>}
            {(paragraphs ?? []).map((p: any, i: number) => (
              <p key={i}>{p.text}</p>
            ))}
            {button?.link?.label && (
              <div style={{ marginTop: '14px' }}>
                <CMSLink link={button.link} />
              </div>
            )}
          </div>
          {vimeoId && (
            <div className="reel-frame" data-reveal data-cursor>
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&quality=1080p`}
                allow="autoplay; fullscreen; picture-in-picture"
                title="Video"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export function ServiceCarouselBlock({ block }: { block: any }) {
  const { eyebrow, title, hint, cards, appearance } = block;
  const validCards = (cards ?? []).filter((c: any) => c?.image?.url);
  return (
    <Section appearance={appearance ?? { background: 'deep' }} className="">
      <ServiceCarouselInner eyebrow={eyebrow} title={title} hint={hint} cards={validCards} />
    </Section>
  );
}

export function NumberedFeatureGridBlock({ block }: { block: any }) {
  const { eyebrow, title, leads, features, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="sec-head" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
          {(leads ?? []).map((l: any, i: number) => (
            <p className="lead" key={i} style={i === 1 ? { marginTop: '1rem', fontWeight: 500 } : undefined}>
              {l.text}
            </p>
          ))}
        </div>
        <div className="features stagger">
          {(features ?? []).map((f: any, i: number) => (
            <article className="feature" data-cursor key={i}>
              <div className="fn">{f.number || String(i + 1).padStart(2, '0')}</div>
              <h3>{f.title}</h3>
              {f.body && <p>{f.body}</p>}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
