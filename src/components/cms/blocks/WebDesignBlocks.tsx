import { Section } from './ServerBlocks';
import { containerClassName, parseHighlight } from '../appearance';
import { CMSLinkGroup } from '../CMSLink';
import RevealBeforeAfterInner from './RevealBeforeAfterInner';
import CapabilityMockup from './CapabilityMockup';

export function WebDesignHeroBlock({ block }: { block: any }) {
  const { title, subtitle, buttons, respTag } = block;
  return (
    <section className="phero">
      <div className="phero-bg">
        <div className="placeholder" style={{ width: '100%', height: '100%', background: '#062A24' }} />
      </div>
      <div className="container">
        <div className="phero-in">
          <div data-reveal>
            <h1>{parseHighlight(title)}</h1>
            {subtitle && <p className="phero-sub">{subtitle}</p>}
            {buttons?.length > 0 && (
              <div className="btn-group" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <CMSLinkGroup buttons={buttons} className="" />
              </div>
            )}
          </div>
          <div className="hero-device-wrap" data-reveal>
            <div className="hero-device laptop">
              {respTag && <div className="resp-tag">{respTag}</div>}
              <div className="dev-header">
                <div className="logo" />
                <div className="menu">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="dev-hero">
                <div className="text">
                  <div className="line" />
                  <div className="line short" />
                  <div className="line dim" />
                </div>
                <div className="img" />
              </div>
              <div className="dev-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="card" />
                <div className="card" />
                <div className="card" />
              </div>
              <div className="dev-footer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RevealBeforeAfterBlock({ block }: { block: any }) {
  const { eyebrow, title, lead, beforeImage, afterImage, caption, appearance } = block;
  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="phero-in" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div data-reveal>
            {eyebrow && <span className="label">{eyebrow}</span>}
            {title && <h2>{parseHighlight(title)}</h2>}
            {lead && <p className="lead">{lead}</p>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {beforeImage?.url && afterImage?.url && (
              <RevealBeforeAfterInner before={beforeImage} after={afterImage} />
            )}
            {caption && (
              <p className="ba-caption" data-reveal style={{ marginTop: '24px', fontSize: '11px', textAlign: 'center', opacity: 0.6 }}>
                {caption}
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

const LABELS: Record<string, string> = {
  design: 'design',
  dev: 'dev',
  manage: 'management',
  seo: 'seo',
  content: 'content',
  hosting: 'hosting',
};

export function CapabilitiesGridBlock({ block }: { block: any }) {
  const { eyebrow, title, cards, appearance } = block;
  return (
    <Section appearance={appearance ?? { background: 'deep' }}>
      <div className={containerClassName(appearance)}>
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
        </div>
        <div className="types-grid stagger">
          {(cards ?? []).map((c: any, i: number) => (
            <div className="tcard" data-cat="all" key={i}>
              <CapabilityMockup visual={c.visual} label={LABELS[c.visual] ?? c.visual} />
              <div className="body">
                <h3>{c.title}</h3>
                {c.body && <p>{c.body}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function SimpleIconGridBlock({ block }: { block: any }) {
  const { eyebrow, title, cards, appearance } = block;
  return (
    <Section appearance={appearance ?? { background: 'transparent' }}>
      <div className={containerClassName(appearance)}>
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
        </div>
        <div className="five-things stagger" style={{ marginBottom: '80px' }}>
          {(cards ?? []).map((c: any, i: number) => (
            <div
              className="ft-card"
              key={i}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(95,208,191,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--teal-bright)',
                }}
              >
                {c.icon && <span dangerouslySetInnerHTML={{ __html: c.icon }} />}
              </div>
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>{c.title}</h4>
                {c.body && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>{c.body}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
