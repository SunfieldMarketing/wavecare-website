import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import CMSLink from '../CMSLink';
import DragBeforeAfter from './DragBeforeAfter';
import PrintProcess from './PrintProcess';
import { parseHighlight } from '../appearance';

/** Renderers for /design-print. Confirmed against subservices.css before writing. */

export function PrintHeroBlock({ block }: { block: any }) {
  const { breadcrumb, title, subtitle, checklist, buttons, images } = block;
  const imgs = (images ?? []).map((x: any) => x.image).filter((i: any) => i?.url);

  return (
    <section className="phero">
      <div className="container">
        <div className="phero-in">
          <div data-reveal>
            {breadcrumb?.length > 0 && (
              <div className="brcm">
                {breadcrumb.map((b: any, i: number) => (
                  <Fragment key={i}>
                    {i > 0 && <span>/</span>}
                    {b.href ? <Link href={b.href}>{b.label}</Link> : <span>{b.label}</span>}
                  </Fragment>
                ))}
              </div>
            )}
            <h1>{parseHighlight(title)}</h1>
            {subtitle && <p className="sub">{subtitle}</p>}

            {checklist?.length > 0 && (
              <div
                className="trust-list"
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px 24px',
                  opacity: 0.8,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--teal-bright)',
                }}
              >
                {checklist.map((c: any, i: number) => (
                  <span key={i}>✓ {c.text}</span>
                ))}
              </div>
            )}

            {buttons?.length > 0 && (
              <div className="btn-group" style={{ marginTop: '40px' }}>
                <CMSLinkGroupPlain buttons={buttons} />
              </div>
            )}
          </div>

          {imgs.length === 4 && (
            <div className="phero-wall stagger" data-reveal>
              {imgs.map((img: any, i: number) => (
                <div className={`cell c${i + 1}`} key={i}>
                  <Image src={img.url} alt={img.alt ?? ''} width={400} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// A local, class-free link group — the hero's buttons live in a plain .btn-group,
// so no extra CMSLinkGroup wrapper div/class is wanted here.
function CMSLinkGroupPlain({ buttons }: { buttons: any[] }) {
  return (
    <>
      {buttons.map((b, i) => (
        <CMSLink key={i} link={b.link} />
      ))}
    </>
  );
}

export function PrintIntroBlock({ block }: { block: any }) {
  const { eyebrow, title, lead, beforeImage, afterImage, caption, stats } = block;
  return (
    <section className="panel dp-why" style={{ padding: '120px 0' }}>
      <div className="container">
        <div className="sec-head center" data-reveal style={{ maxWidth: '880px', margin: '0 auto 60px' }}>
          {eyebrow && <span className="label">{eyebrow}</span>}
          <h2>{parseHighlight(title)}</h2>
          {lead && <p className="lead">{lead}</p>}
        </div>

        {beforeImage?.url && afterImage?.url && (
          <DragBeforeAfter before={beforeImage} after={afterImage} />
        )}
        {caption && (
          <p className="ba-caption" data-reveal style={{ marginTop: '32px', fontSize: '11px' }}>
            {caption}
          </p>
        )}

        {stats?.length > 0 && (
          <div className="stats stagger" style={{ maxWidth: '900px', margin: '80px auto 0' }}>
            {stats.map((s: any, i: number) => (
              <div className="stat" key={i}>
                <div className="num" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }} data-count={s.value} data-suffix={s.suffix || ''}>
                  0
                </div>
                <div className="cap" style={{ fontSize: '12px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function IconCardGridBlock({ block }: { block: any }) {
  const { tone, eyebrow, title, subtitle, cards } = block;
  return (
    <section className={`panel deep sec-pad${tone === 'ink' ? ' ink' : ''} dp-services`}>
      <div className="container">
        <div className="sec-head" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          <h2>{parseHighlight(title)}</h2>
          {subtitle && (
            <p className="sub" style={{ marginTop: '16px', maxWidth: '640px' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="ds-grid stagger">
          {(cards ?? []).map((c: any, i: number) => (
            <article className="ds-card" key={i}>
              {c.icon && <div className="icon" dangerouslySetInnerHTML={{ __html: c.icon }} />}
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

export function PrintProcessBlock({ block }: { block: any }) {
  const { eyebrow, title, subtitle, phases } = block;
  return (
    <section className="panel deep sec-pad dp-rx">
      <div className="container">
        <div className="sec-head center" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
          {subtitle && (
            <p className="sub" style={{ maxWidth: '400px', margin: '16px auto 0' }}>
              {subtitle}
            </p>
          )}
        </div>
        <PrintProcess phases={phases ?? []} />
      </div>
    </section>
  );
}

export function ReceiveGridBlock({ block }: { block: any }) {
  const { eyebrow, title, items } = block;
  return (
    <section className="panel ink sec-pad">
      <div className="container">
        <div className="sec-head" data-reveal>
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title && <h2>{parseHighlight(title)}</h2>}
        </div>
        <div className="rx-grid stagger" style={{ marginTop: '40px' }}>
          {(items ?? []).map((it: any, i: number) => (
            <div className="rx-item" key={i}>
              {it.icon && <div className="icon" dangerouslySetInnerHTML={{ __html: it.icon }} />}
              <h4>{it.title}</h4>
              {it.body && <p>{it.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SignatureProductBlock({ block }: { block: any }) {
  const { eyebrow, title, body, button, videoUrl } = block;
  return (
    <section className="panel deep sec-pad dp-sig">
      <div className="container">
        <div className="sig-wrapper stagger">
          <div>
            {eyebrow && <span className="label">{eyebrow}</span>}
            <h2>{parseHighlight(title)}</h2>
            {body && <p className="lead">{body}</p>}
            {button?.link?.label && (
              <div style={{ marginTop: '24px' }}>
                <CMSLink link={button.link} />
              </div>
            )}
          </div>
          <div className="sig-vid">
            {videoUrl && (
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
