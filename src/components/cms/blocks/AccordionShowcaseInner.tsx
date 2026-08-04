'use client';

import { useState } from 'react';
import Image from 'next/image';
import CMSLink from '../CMSLink';

/**
 * .accordion > .acc-panel(.active) — panels expand on hover (desktop, >=861px)
 * or tap (any width), exactly matching the hand-written page's initAccordion:
 * only one panel is ever "active" at a time, defaulting to the first.
 */
export default function AccordionShowcaseInner({
  panels,
}: {
  panels: Array<{
    image: { url: string; alt?: string | null };
    title: string;
    tag?: string | null;
    detail?: Array<{ text: string }>;
    link?: { link?: any };
  }>;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="accordion" id="accordion">
      {panels.map((p, i) => (
        <article
          key={i}
          className={`acc-panel ${active === i ? 'active' : ''}`}
          data-cursor
          onMouseEnter={() => {
            if (typeof window !== 'undefined' && window.matchMedia('(min-width:861px)').matches) {
              setActive(i);
            }
          }}
          onClick={() => setActive(i)}
        >
          <Image src={p.image.url} alt={p.image.alt ?? p.title} width={600} height={400} style={{ width: '100%', height: 'auto' }} />
          <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="acc-content">
            <div className="acc-title">{p.title}</div>
            <div className="acc-body-wrap">
              {p.tag && <p className="acc-tag">{p.tag}</p>}
              {p.detail?.length ? (
                <div className="acc-detail">
                  {p.detail.map((d, di) => (
                    <span key={di}>{d.text}</span>
                  ))}
                </div>
              ) : null}
              {p.link?.link?.label && (
                <div className="acc-cta">
                  <CMSLink link={p.link.link} />
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
