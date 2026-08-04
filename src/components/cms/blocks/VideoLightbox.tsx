'use client';

import { useEffect, useState } from 'react';

/**
 * Shared full-screen video lightbox.
 *
 * Multiple independent blocks (videoGrid, featuredVideoWork, and any future
 * one) can open the same modal without prop-drilling or a context provider —
 * they just fire `openVideoLightbox(vimeoId)`. Mounted once per page, in
 * RenderBlocks, so it doesn't matter which blocks a given page uses.
 *
 * Matches the hand-written pages' behaviour: a single global "activeVideo"
 * state, click the backdrop or the × to close.
 */
const EVENT = 'wc:openVideoLightbox';

export function openVideoLightbox(vimeoId: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: vimeoId }));
}

export default function VideoLightboxHost() {
  const [vimeoId, setVimeoId] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => setVimeoId((e as CustomEvent<string>).detail);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  if (!vimeoId) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => setVimeoId(null)}
    >
      <button
        onClick={() => setVimeoId(null)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '40px',
          cursor: 'pointer',
          zIndex: 10000,
        }}
        aria-label="Close video"
      >
        &times;
      </button>
      <div
        style={{ width: '90%', maxWidth: '1200px', aspectRatio: '16/9', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&quality=1080p`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Video"
        />
      </div>
    </div>
  );
}
