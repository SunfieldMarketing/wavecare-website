import Image from 'next/image';
import Script from 'next/script';
import { Section, SectionHead } from './ServerBlocks';
import { containerClassName, parseHighlight } from '../appearance';
import ContactForm from './ContactForm';

/** Split hero with trust points on the left and the enquiry form on the right. */
export function ContactHeroBlock({ block }: { block: any }) {
  const { backgroundImage, eyebrow, title, subtitle, trustItems, directLinks, form } = block;

  return (
    <section className="chero">
      {backgroundImage?.url && (
        <div className="chero-bg">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ''}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            priority
          />
        </div>
      )}

      <div className="container">
        <div className="chero-grid">
          <div
            className="chero-content reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div className="chero-content-top">
              {eyebrow && (
                <span
                  className="label"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--teal-bright)',
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                  }}
                >
                  {eyebrow}
                </span>
              )}
              <h1>{parseHighlight(title)}</h1>
              {subtitle && <p className="chero-sub">{subtitle}</p>}

              {trustItems?.length > 0 && (
                <div className="trust-list stagger">
                  {trustItems.map((t: any, i: number) => (
                    <div className="trust-item" key={i}>
                      {t.icon && <div className="ic" dangerouslySetInnerHTML={{ __html: t.icon }} />}
                      <div>
                        <h4>{t.title}</h4>
                        {t.body && <p>{t.body}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {directLinks?.length > 0 && (
              <div className="direct reveal">
                {directLinks.map((l: any, i: number) => (
                  <a href={l.href} key={i}>
                    {l.icon && <span className="ic">{l.icon}</span>} {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="reveal" style={{ transitionDelay: '0.2s', height: '100%' }}>
            <ContactForm copy={form} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Numbered steps — .steps > .step > .sn + h3 + p */
export function StepsBlockRenderer({ block }: { block: any }) {
  const { heading, headingIcon, steps, appearance } = block;
  const centered = heading?.align === 'center';

  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        {heading && (heading.eyebrow || heading.title) ? (
          <div className={centered ? 'sec-head center reveal' : 'sec-head reveal'}>
            {heading.eyebrow && (
              <span
                className="label"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--teal-bright)',
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                  justifyContent: centered ? 'center' : undefined,
                }}
              >
                {headingIcon && <span dangerouslySetInnerHTML={{ __html: headingIcon }} />}
                {heading.eyebrow}
              </span>
            )}
            {heading.title && <h2>{parseHighlight(heading.title)}</h2>}
            {heading.subtitle && <p className="sub">{heading.subtitle}</p>}
          </div>
        ) : (
          <SectionHead heading={heading} />
        )}

        <div className="steps stagger">
          {(steps ?? []).map((s: any, i: number) => (
            <div className="step" key={i}>
              <div className="sn">{s.number || String(i + 1).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              {s.body && <p>{s.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** GoHighLevel booking widget. */
export function CalendarEmbedBlock({ block }: { block: any }) {
  const { heading, widgetId, minHeight, appearance } = block;
  // Capped to a share of the viewport height (not just a flat pixel value)
  // so the whole widget - calendar grid plus time slots - fits within a
  // normal browser window instead of running past the fold on shorter
  // screens (laptops, anything landscape). Still caps at the configured/
  // default height on tall screens rather than growing indefinitely.
  const h = `min(${minHeight || 600}px, 68vh)`;

  return (
    <Section appearance={appearance}>
      <div className={containerClassName(appearance)}>
        <div className="sec-head center reveal" id={appearance?.anchorId || 'calendar'}>
          {heading?.title && <h2>{parseHighlight(heading.title)}</h2>}
          {heading?.subtitle && (
            <p
              className="lead"
              style={{
                margin: '20px auto 0',
                maxWidth: '600px',
                textAlign: 'center',
                color: 'var(--on-dark)',
              }}
            >
              {heading.subtitle}
            </p>
          )}
        </div>

        <div
          className="cal-wrap reveal"
          style={{ height: h, maxWidth: '900px', margin: '0 auto', width: '100%', position: 'relative' }}
        >
          <iframe
            src={`https://api.leadconnectorhq.com/widget/booking/${widgetId}`}
            style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }}
            scrolling="yes"
            id={widgetId}
            title="Book a Demo"
          />
          <Script src="https://api.leadconnectorhq.com/js/form_embed.js" strategy="lazyOnload" />
        </div>
      </div>
    </Section>
  );
}
