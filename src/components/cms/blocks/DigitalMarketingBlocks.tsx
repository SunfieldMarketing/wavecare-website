import { parseHighlight } from '../appearance';
import { CMSLinkGroup } from '../CMSLink';

/**
 * Renderers for /digital-marketing (dm.css).
 *
 * The four accordion "covers" (shuffling ad windows, search typewriter,
 * content calendar, proof bars) and the two split mockups (ad/search-result
 * preview, performance bars) are fixed decorative markup — same treatment as
 * CameraCursor/ProcessShowcase/WebDesignProcessMockup elsewhere in this repo.
 * Only real copy is CMS-editable; the interactivity itself (shuffle timer,
 * typewriter loop, calendar fill, WebGL wave) lives in ClientEffects.tsx and
 * targets these elements by id/class, unaffected by CMS content.
 */

const lines = (text?: string | null) =>
  (text ?? '').split('\n').map((l, i, a) => (
    <span key={i}>
      {l}
      {i < a.length - 1 && <br />}
    </span>
  ));

/* ── Hero ─────────────────────────────────────────────────────────── */

export function DMHeroBlock({ block }: { block: any }) {
  const { eyebrow, title, subtitle, buttons } = block;
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-inner">
          {eyebrow && <span className="label reveal">{eyebrow}</span>}
          <h1 className="reveal delay-1">{parseHighlight(title)}</h1>
          {subtitle && <p className="hero-sub reveal delay-2">{subtitle}</p>}
          <CMSLinkGroup buttons={buttons} className="hero-actions reveal delay-3" />
        </div>
      </div>
    </section>
  );
}

/* ── Accordion covers (fixed decorative chrome) ──────────────────── */

function ShuffleCover() {
  return (
    <div className="shuffle-board" id="shuffleBoard">
      <div className="mini-win">
        <div className="mw-dots"><span></span><span></span><span></span></div>
        <div className="mw-line"></div>
        <div className="mw-line short"></div>
        <div className="mw-accent"></div>
      </div>
      <div className="mini-win">
        <div className="mw-dots"><span></span><span></span><span></span></div>
        <div className="mw-accent" style={{ width: '52%' }}></div>
        <div className="mw-line"></div>
        <div className="mw-line short"></div>
      </div>
      <div className="mini-win">
        <div className="mw-dots"><span></span><span></span><span></span></div>
        <div className="mw-line short"></div>
        <div className="mw-line"></div>
        <div className="mw-line short"></div>
      </div>
      <div className="mini-win">
        <div className="mw-dots"><span></span><span></span><span></span></div>
        <div className="mw-line"></div>
        <div className="mw-accent" style={{ width: '60%' }}></div>
        <div className="mw-line short"></div>
      </div>
    </div>
  );
}

function TypewriterCover() {
  return (
    <div className="type-wrap">
      <div className="type-bar">
        <span className="type-lens"></span>
        <span className="type-text" id="typeText"></span>
        <span className="type-caret"></span>
      </div>
      <div className="type-results">
        <div className="tr-line hot"><span className="tr-tag">Sponsored</span><span className="tr-skel"></span></div>
        <div className="tr-line"><span className="tr-rank">1</span><span className="tr-skel"></span></div>
        <div className="tr-line"><span className="tr-rank">2</span><span className="tr-skel short"></span></div>
      </div>
    </div>
  );
}

function CalendarCover() {
  return (
    <div className="cal-wrap">
      <div className="cal-top"><span className="cal-chip">Shoot Day</span><span>30 Days of Content</span></div>
      <div className="cal-grid">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="cal-cell"></span>
        ))}
      </div>
    </div>
  );
}

function ProofCover() {
  return (
    <div className="proof-wrap">
      <div className="proof-row"><span className="proof-label">Calls</span><span className="proof-track"><i className="proof-fill f1"></i></span></div>
      <div className="proof-row"><span className="proof-label">Form fills</span><span className="proof-track"><i className="proof-fill f2"></i></span></div>
      <div className="proof-row"><span className="proof-label">Tours</span><span className="proof-track"><i className="proof-fill f3"></i></span></div>
    </div>
  );
}

const COVERS: Record<string, () => React.ReactNode> = {
  shuffle: ShuffleCover,
  typewriter: TypewriterCover,
  calendar: CalendarCover,
  proof: ProofCover,
};

/* ── Services accordion ───────────────────────────────────────────── */

export function DMAccordionBlock({ block }: { block: any }) {
  const { anchorId, eyebrow, title, lead, items } = block;
  const rows: any[] = items ?? [];
  return (
    <section className="dark" id={anchorId || undefined}>
      <div className="container">
        <div className="services-head reveal">
          {eyebrow && <span className="label on-dark">{eyebrow}</span>}
          {title && <h2>{lines(title)}</h2>}
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="acc reveal">
          {rows.map((item, i) => {
            const Cover = COVERS[item.coverType] ?? ShuffleCover;
            return (
              <div className={`acc-item${item.openByDefault ? ' open' : ''}`} key={i}>
                <button className="acc-head" type="button" aria-expanded={item.openByDefault ? 'true' : 'false'}>
                  <span className="acc-num">{item.number || String(i + 1).padStart(2, '0')}</span>
                  <span className="acc-title">{item.title}</span>
                  <span className="acc-status">
                    <span className="acc-status-text">{item.openByDefault ? 'Now Viewing' : 'Expand'}</span>
                    <span className="acc-chev"></span>
                  </span>
                </button>
                <div className="acc-body">
                  <div className="acc-inner">
                    <div className="acc-cover">
                      <Cover />
                      {item.coverTag && <span className="cover-tag">{item.coverTag}</span>}
                    </div>
                    <div className="acc-detail">
                      <h3>{item.heading}</h3>
                      {item.body && <p>{item.body}</p>}
                      {item.pills?.length > 0 && (
                        <div className="acc-pills">
                          {item.pills.map((p: any, pi: number) => (
                            <span className="acc-pill" key={pi}>{p.text}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Split row mockups (fixed decorative chrome) ─────────────────── */

function AdPreviewMockup() {
  return (
    <div className="panel-stack">
      <div className="mock-card hot">
        <span className="mock-tag">Sponsored</span>
        <div className="mock-title">Assisted Living Community Near You | Book a Private Tour</div>
        <div className="mock-url">yourcommunity.com</div>
        <div className="mock-desc">Compassionate care, beautiful residences, and a team families trust. Schedule a visit today.</div>
      </div>
      <div className="mock-card">
        <div className="mock-row">
          <span className="mock-dot">1</span>
          <div>
            <div className="mock-title" style={{ marginBottom: '2px' }}>Your community, ranked first locally</div>
            <div className="mock-url" style={{ marginBottom: '0' }}>Map pack &middot; Organic results</div>
          </div>
        </div>
      </div>
      <div className="mock-note">Paid and organic, working together</div>
    </div>
  );
}

function PerformanceBarsMockup() {
  return (
    <div className="panel-stack">
      <div className="mock-card">
        <div className="mock-title" style={{ marginBottom: '14px' }}>What your spend produced</div>
        <div className="mock-row" style={{ marginBottom: '12px' }}>
          <span className="mock-label">Qualified calls</span>
          <span className="mock-bar"><i style={{ width: '84%' }}></i></span>
        </div>
        <div className="mock-row" style={{ marginBottom: '12px' }}>
          <span className="mock-label">Form fills</span>
          <span className="mock-bar"><i style={{ width: '68%' }}></i></span>
        </div>
        <div className="mock-row">
          <span className="mock-label">Tour requests</span>
          <span className="mock-bar"><i style={{ width: '92%' }}></i></span>
        </div>
      </div>
      <div className="mock-card hot">
        <div className="mock-row">
          <span className="mock-dot">&#10003;</span>
          <div className="mock-desc" style={{ margin: '0' }}>Every inquiry tied back to the ad, keyword, or search that produced it.</div>
        </div>
      </div>
      <div className="mock-note">Reporting you can read in five minutes</div>
    </div>
  );
}

const MOCKUPS: Record<string, () => React.ReactNode> = {
  adPreview: AdPreviewMockup,
  performanceBars: PerformanceBarsMockup,
};

export function DMSplitMockupBlock({ block }: { block: any }) {
  const { tone, wrapSection, flipped, textTone, eyebrow, title, body, bullets, buttons, mockup } = block;
  const Mockup = MOCKUPS[mockup] ?? AdPreviewMockup;

  const inner = (
    <div className={`split ${flipped ? 'flipped ' : ''}${textTone ?? 'on-dark'} reveal`}>
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
        <Mockup />
      </div>
    </div>
  );

  return wrapSection !== false ? (
    <section className={tone ?? 'deeper'}>
      <div className="container">{inner}</div>
    </section>
  ) : (
    <div className="container">{inner}</div>
  );
}

/* ── Feature row (4-up) ───────────────────────────────────────────── */

export function DMFeatureRowBlock({ block }: { block: any }) {
  const { tone, eyebrow, title, lead, cards } = block;
  return (
    <section className={tone ?? 'deeper'}>
      <div className="container">
        <div className="healthcare-head reveal">
          {eyebrow && <span className="label on-dark">{eyebrow}</span>}
          {title && <h2>{lines(title)}</h2>}
          {lead && <p className="lead">{lead}</p>}
        </div>
        <div className="feature-row four">
          {(cards ?? []).map((c: any, i: number) => (
            <article className={`feature-card reveal delay-${i + 1}`} key={i}>
              <h3>{c.title}</h3>
              {c.body && <p>{c.body}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Steps row (light) ────────────────────────────────────────────── */

export function DMStatsRowBlock({ block }: { block: any }) {
  const { eyebrow, title, lead, steps } = block;
  return (
    <section className="light">
      <div className="container">
        <div className="trusted-head reveal">
          {eyebrow && <span className="label on-light">{eyebrow}</span>}
          {title && <h2>{lines(title)}</h2>}
          {lead && <p className="split-body" style={{ maxWidth: '720px', color: 'rgba(26, 35, 50, 0.78)' }}>{lead}</p>}
        </div>
        <div className="stats-row">
          {(steps ?? []).map((s: any, i: number) => (
            <div className={`stat reveal delay-${i + 1}`} key={i}>
              <div className="stat-num">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA (WebGL wave) ───────────────────────────────────────── */

export function DMFinalCTABlock({ block }: { block: any }) {
  const { eyebrow, title, subtitle, buttons } = block;
  return (
    <section className="final-cta wavecare-final-wave-section">
      <canvas id="wavecareFinalWaveCanvas" className="wavecare-final-wave-canvas" aria-hidden="true"></canvas>
      <div className="wavecare-final-water-vignette" aria-hidden="true"></div>
      <div className="wavecare-final-grid" aria-hidden="true"></div>
      <div className="wavecare-final-grain" aria-hidden="true"></div>
      <div className="container wavecare-final-wave-content">
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
