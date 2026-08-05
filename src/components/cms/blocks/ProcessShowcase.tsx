'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * The interactive process panel.
 *
 * Reproduces the exact markup the stylesheet expects:
 *   .proc-tabs > .proc-tab > .pnum / .pname / .pbar
 *   .proc-panel-wrap > .proc-monitor > .proc-detail (.step.on) + .proc-sheet.devN
 * subservices.css:59-89 drives the tab bar, the sliding detail pane and the
 * contact sheet that sharpens as you advance through the phases.
 */
export default function ProcessShowcase({
  steps,
  sheetImages,
}: {
  steps: Array<{ label?: string | null; title: string; body?: string | null }>;
  sheetImages: Array<{ url: string; alt?: string | null }>;
}) {
  // Start on the final phase so the contact sheet reads as fully developed,
  // matching the hand-written page's initial state.
  const [active, setActive] = useState(Math.max(steps.length - 1, 0));

  const loupes = ['SHOT LIST', 'CAPTURE', 'DEVELOP', 'SELECTS'];

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

          {sheetImages.length > 0 && (
            <div className={`proc-sheet dev${Math.min(active, 3)}`}>
              <div className="loupe">{loupes[Math.min(active, loupes.length - 1)]}</div>
              {sheetImages.map((img, i) => (
                <div className="frame" key={i}>
                  <Image
                    className="pho"
                    src={img.url}
                    alt={img.alt ?? ''}
                    width={800}
                    height={600}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="pick" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
