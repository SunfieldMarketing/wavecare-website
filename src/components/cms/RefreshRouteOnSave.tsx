'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Makes the Live Preview iframe update itself when an editor saves.
 *
 * Payload's admin panel (node_modules/@payloadcms/ui/dist/elements/LivePreview/
 * Window/index.js) posts `{ type: 'payload-document-event' }` into the
 * preview iframe on every save/autosave/publish, specifically so an SSR page
 * (this one — every route here is a server component reading Payload's local
 * API, not the client-merge `useLivePreview` pattern) knows to do a
 * server-side round trip. Nothing was listening for that message before this
 * component existed, so the iframe never refreshed on its own — an editor
 * had to manually reload to see a saved change, defeating the point of Live
 * Preview. Mounted once in the root layout so it covers every route,
 * including layout-level content (Nav, Footer, Site Settings).
 *
 * No origin check: the admin only ever posts this into an iframe it created
 * pointed at this app's own /api/preview redirect (see that route), and the
 * message carries no data to leak — it's a plain refresh signal.
 */
export default function RefreshRouteOnSave() {
  const router = useRouter();

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'payload-document-event') {
        router.refresh();
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return null;
}
