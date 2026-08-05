'use client';

import { useState } from 'react';

/**
 * Interactive print-process mockup — .ip-tabs / .ip-panel / .viz-doc.
 *
 * The 4 phases (Wireframe / Flat Comp / Revision / Press-Ready) are driven
 * entirely by toggling `viz-mode-{index}` and a handful of conditional child
 * elements; subservices.css owns every visual change. Markup mirrors the
 * hand-written page exactly.
 */
const BADGES = ['Wireframe', 'Flat Comp', 'Revision', 'Press-Ready'];

export default function PrintProcess({
  phases,
}: {
  phases: Array<{ name: string; title: string; description: string; badge?: string }>;
}) {
  const [tab, setTab] = useState(3);
  const active = phases[tab] ?? phases[0];

  return (
    <>
      <div className="ip-tabs stagger">
        {phases.map((p, i) => (
          <div
            key={i}
            className={`ip-tab ${tab === i ? 'on' : ''}`}
            onMouseEnter={() => setTab(i)}
          >
            <span className="num">0{i + 1}</span>
            <span className="name">{p.name}</span>
            <div className="circ" />
          </div>
        ))}
      </div>

      <div className="ip-panel stagger">
        <div className="ip-text" key={tab}>
          <h3>{active?.title}</h3>
          <p>{active?.description}</p>
        </div>
        <div className="ip-viz">
          <div className="ip-badge">{active?.badge || BADGES[tab] || BADGES[0]}</div>
          <div className={`viz-doc viz-mode-${tab}`} key={`viz-${tab}`}>
            <div className="top-part">
              {tab === 3 && <div className="logo-circle" />}
              {tab === 2 && (
                <div className="red-circle">
                  <div className="rev-tag t1">tighten logo</div>
                </div>
              )}
              <div className="hero-box" />
            </div>
            <div className="bot-part">
              <div className="line" />
              <div className="line short" />
              <div className="box">{tab === 2 && <div className="rev-tag t2">swap photo</div>}</div>
              <div className="line" />
              <div className="line short" />
            </div>
            {tab === 3 && (
              <div className="cmyk-bar">
                <div className="cmyk-dot cmyk-c" />
                <div className="cmyk-dot cmyk-m" />
                <div className="cmyk-dot cmyk-y" />
                <div className="cmyk-dot cmyk-k" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
