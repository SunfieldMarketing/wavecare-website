'use client';

import { useState } from 'react';

/**
 * "Audit -> Design -> Build -> Manage" browser-dashboard mockup.
 *
 * Four fixed, hand-styled panels (error-flagged audit, dashed wireframe,
 * filled build blocks, live metrics dashboard) behind a shared mock browser
 * chrome — decorative UI chrome, not content, so it stays fixed in code exactly
 * as in the original. Step titles/descriptions come from the process block's
 * shared `steps` field; only the panel index (0-3) is assumed to line up with
 * the step order.
 */
export default function WebDesignProcessMockup({
  steps,
  browserUrl,
}: {
  steps: Array<{ label?: string | null; title: string; body?: string | null }>;
  browserUrl?: string | null;
}) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="proc-tabs" data-reveal>
        {steps.map((step, i) => (
          <div key={i} className={`proc-tab ${tab === i ? 'on' : ''}`} onMouseEnter={() => setTab(i)} onClick={() => setTab(i)}>
            <span className="pnum">{step.label || String(i + 1).padStart(2, '0')}</span>
            <span className="pname">{step.title}</span>
            <span className="pbar" />
          </div>
        ))}
      </div>

      <div className="proc-panel-wrap" data-reveal>
        <div className="proc-monitor">
          <div className="proc-detail">
            {steps.map((step, i) => (
              <div className={`step ${tab === i ? 'on' : ''}`} key={i}>
                <h3>{step.title}</h3>
                {step.body && <p>{step.body}</p>}
              </div>
            ))}
          </div>

          <div className="proc-screen">
            <div
              className="frame"
              style={{
                opacity: 1,
                position: 'relative',
                overflow: 'hidden',
                background: '#062A24',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                height: '100%',
                minHeight: '360px',
              }}
            >
              <div className="mock-top" style={{ position: 'relative' }}>
                <span />
                <span />
                <span />
                <div
                  style={{
                    marginLeft: '12px',
                    background: 'rgba(95,208,191,0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: 'var(--teal-bright)',
                    fontFamily: 'monospace',
                  }}
                >
                  {browserUrl || 'yourfacility.org'}
                </div>
              </div>

              <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, bottom: 0, padding: '20px' }}>
                {/* Panel 0: Audit — flagged issues */}
                <Panel active={tab === 0} label="AUDIT">
                  <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', position: 'relative' }}>
                    <div className="err-pulse" style={{ position: 'absolute', top: '-10px', left: '20px' }}>!</div>
                  </div>
                  <div style={{ height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', position: 'relative' }}>
                    <div className="err-pulse" style={{ position: 'absolute', bottom: '-10px', right: '40px' }}>!</div>
                  </div>
                  <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '100%' }} />
                  <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '60%', position: 'relative' }}>
                    <div className="err-pulse" style={{ position: 'absolute', top: '0', left: '40px' }}>!</div>
                  </div>
                </Panel>

                {/* Panel 1: Design — dashed wireframe */}
                <Panel active={tab === 1} label="WIREFRAME" gap="8px">
                  <div style={{ height: '24px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }} />
                  <div style={{ height: '60px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ height: '24px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }} />
                    <div style={{ height: '24px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ height: '30px', border: '1px dashed rgba(95,208,191,0.4)', borderRadius: '4px' }} />
                </Panel>

                {/* Panel 2: Build — filled blocks */}
                <Panel active={tab === 2} label="BUILD" gap="8px">
                  <div style={{ height: '24px', background: 'rgba(95,208,191,0.2)', borderRadius: '4px' }} />
                  <div style={{ height: '60px', background: 'rgba(95,208,191,0.4)', borderRadius: '4px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ height: '24px', background: 'rgba(95,208,191,0.2)', borderRadius: '4px' }} />
                    <div style={{ height: '24px', background: 'rgba(95,208,191,0.2)', borderRadius: '4px' }} />
                  </div>
                </Panel>

                {/* Panel 3: Manage — live metrics */}
                <div
                  style={{
                    opacity: tab === 3 ? 1 : 0,
                    pointerEvents: tab === 3 ? 'auto' : 'none',
                    transition: 'opacity 0.4s',
                    position: 'absolute',
                    inset: '20px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '-36px',
                      fontSize: '9px',
                      background: 'rgba(95,208,191,0.1)',
                      color: 'var(--teal-bright)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(95,208,191,0.2)',
                      letterSpacing: '1px',
                    }}
                  >
                    LIVE &amp; MANAGED
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                    <span style={{ fontSize: '9px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-bright)' }}>
                      <span className="live-dot" /> LIVE - 99.9% UPTIME
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Metric value="+38%" label="INQUIRIES" accent />
                    <Metric value="1.2s" label="LOAD TIME" />
                    <Metric value="A+" label="SEO HEALTH" />
                    <Metric value="24/7" label="MONITORING" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Panel({
  active,
  label,
  gap = '12px',
  children,
}: {
  active: boolean;
  label: string;
  gap?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transition: 'opacity 0.4s',
        position: 'absolute',
        inset: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '-36px',
          fontSize: '9px',
          background: 'rgba(255,255,255,0.05)',
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)',
          letterSpacing: '1px',
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Metric({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '12px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: accent ? 'var(--teal-bright)' : '#fff' }}>{value}</div>
      <div style={{ fontSize: '8px', letterSpacing: '1px', opacity: 0.6 }}>{label}</div>
    </div>
  );
}
