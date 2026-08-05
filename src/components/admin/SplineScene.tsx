'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * Thin wrapper around @splinetool/react-spline with a lazy import + Suspense
 * fallback, so the (sizeable) 3D runtime only loads on the client and never
 * blocks the initial page render.
 */
export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="admin-spline-loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
