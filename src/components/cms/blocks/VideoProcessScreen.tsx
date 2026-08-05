'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * "Recording screen" process variant — .proc-screen / .frame / .ui / .rec /
 * .led. A stack of 4 full-bleed frames that cross-fade via `.proc-screen.devN`
 * showing/hiding `.frame:nth-child(N)`; each visible frame carries a blinking
 * REC indicator. Used by the process block's `layout: 'screen'` option
 * (/videoservices), alongside the shared .proc-tabs/.proc-panel-wrap markup
 * also used by the 'tabs' contact-sheet variant.
 */
export default function VideoProcessScreen({
  steps,
}: {
  steps: Array<{ label?: string | null; title: string; body?: string | null; image?: { url: string; alt?: string | null } | null }>;
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="proc-tabs" data-reveal>
        {steps.map((step, i) => (
          <div
            key={i}
            className={`proc-tab ${active === i ? 'on' : ''}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
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
              <div className={`step ${active === i ? 'on' : ''}`} key={i}>
                <h3>{step.title}</h3>
                {step.body && <p>{step.body}</p>}
              </div>
            ))}
          </div>

          <div className={`proc-screen dev${active + 1}`}>
            {steps.map((step, i) =>
              step.image?.url ? (
                <div className="frame" key={i}>
                  <Image src={step.image.url} alt={step.image.alt ?? step.title} width={400} height={300} style={{ width: '100%', height: 'auto' }} />
                  <div className="ui">
                    <div className="rec">
                      <div className="led" />
                      REC
                    </div>
                  </div>
                </div>
              ) : (
                <div className="frame" key={i} />
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
