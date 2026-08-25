'use client';

import { useEffect } from 'react';

/**
 * Click-to-jump: clicking a section in the Live Preview iframe scrolls the
 * admin's Blocks field to and expands that exact block, instead of an
 * editor having to scroll/hunt through a long block list by eye.
 *
 * The iframe side (src/components/cms/PreviewBlockBoundary.tsx, only active
 * in draft mode) posts { type: 'wc-select-block', fieldPath, blockIndex }
 * on click. This listens for it and finds the matching row by the same id
 * Payload's own BlockRow component already gives every row:
 * `${parentPath}-row-${rowIndex}` (node_modules/@payloadcms/ui/dist/fields/
 * Blocks/BlockRow.js) - for a top-level `layout` blocks field, parentPath
 * is just "layout", so row N's id is "layout-row-N". Expanding a collapsed
 * row reuses Payload's own toggle button
 * (node_modules/@payloadcms/ui/dist/elements/Collapsible/index.js) rather
 * than reimplementing collapse state - a real click on Payload's own
 * control, so it stays correct if that internal implementation changes.
 *
 * Wired in via payload.config.ts's admin.components.providers, which wraps
 * the whole admin dashboard - harmless no-op on any view that isn't a
 * document edit view with a live-preview iframe open, since no message
 * ever arrives there.
 */
export function ClickToEditListener({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.data || event.data.type !== 'wc-select-block') return;
      const { fieldPath, blockIndex } = event.data as { fieldPath: string; blockIndex: number };
      if (typeof fieldPath !== 'string' || typeof blockIndex !== 'number') return;

      const row = document.getElementById(`${fieldPath}-row-${blockIndex}`);
      if (!row) return;

      row.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const collapsedToggle = row.querySelector<HTMLButtonElement>('.collapsible__toggle--collapsed');
      collapsedToggle?.click();

      const prevOutline = row.style.outline;
      const prevOffset = row.style.outlineOffset;
      const prevTransition = row.style.transition;
      row.style.transition = 'outline-color 0.4s ease';
      row.style.outline = '3px solid #5FD0BF';
      row.style.outlineOffset = '2px';
      window.setTimeout(() => {
        row.style.outline = prevOutline;
        row.style.outlineOffset = prevOffset;
        row.style.transition = prevTransition;
      }, 1500);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <>{children}</>;
}
