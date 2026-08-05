import Image from 'next/image';
import { Section } from './ServerBlocks';
import { containerClassName, parseHighlight } from '../appearance';
import CMSLink from '../CMSLink';
import AccordionShowcaseInner from './AccordionShowcaseInner';

export function StoryBlockRenderer({ block }: { block: any }) {
  const { eyebrow, title, paragraphs, button, image, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="story">
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
          {image?.url && (
            <div className="story-img" data-reveal data-cursor>
              <Image src={image.url} alt={image.alt ?? ''} width={800} height={600} style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export function InsightQuoteBlock({ block }: { block: any }) {
  const { eyebrow, statement, footer, appearance } = block;
  return (
    <Section appearance={{ background: 'deep', ...appearance }} className="insight">
      <div className={containerClassName(appearance)}>
        {eyebrow && <span className="label">{eyebrow}</span>}
        {statement && (
          <p className="big" id="insightText">
            {statement}
          </p>
        )}
        {footer && (
          <p className="foot" data-reveal>
            {footer}
          </p>
        )}
      </div>
    </Section>
  );
}

export function ValuesGridBlock({ block }: { block: any }) {
  const { eyebrow, title, values, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
        </div>
        <div className="values stagger">
          {(values ?? []).map((v: any, i: number) => (
            <article className="value" data-cursor key={i}>
              <div className="vmark">{v.number || String(i + 1).padStart(2, '0')}</div>
              <h3>{v.title}</h3>
              {v.body && <p>{v.body}</p>}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function AccordionShowcaseBlock({ block }: { block: any }) {
  const { eyebrow, title, hint, panels, appearance } = block;
  const validPanels = (panels ?? []).filter((p: any) => p?.image?.url);
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="svc-head" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
        </div>
        <AccordionShowcaseInner panels={validPanels} />
        {hint && <div className="acc-hint">{hint}</div>}
      </div>
    </Section>
  );
}

export function VideoReelBlock({ block }: { block: any }) {
  const { eyebrow, title, vimeoId, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
        </div>
        <div className="reel-wrap" data-reveal data-cursor>
          <div className="reel-frame">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&quality=1080p`}
              allow="autoplay; fullscreen; picture-in-picture"
              title="Video"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function SimpleQuoteGridBlock({ block }: { block: any }) {
  const { eyebrow, title, lead, quotes, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        {/* Built manually rather than via SectionHead: the original uses .lead
            for this sub-paragraph, not the .sub that SectionHead always emits. */}
        <div className="sec-head" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="tcards stagger">
          {(quotes ?? []).map((q: any, i: number) => (
            <article className="tcard" data-cursor key={i}>
              <span className="q">&ldquo;</span>
              <blockquote>{q.quote}</blockquote>
              <div className="who">
                <strong>{q.role}</strong>
                {q.organisation}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
