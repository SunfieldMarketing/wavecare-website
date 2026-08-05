'use client';

import { SplineScene } from './SplineScene';

/**
 * Decorative 3D robot behind the login form (admin.components.beforeLogin).
 *
 * Rendered fixed + full-viewport with pointer-events disabled, so it never
 * competes with the actual form for clicks and reads purely as background
 * ambience — the login card sits on top of it via custom.css's z-index on
 * .template-minimal__wrap.
 */
export default function LoginRobotBackground() {
  return (
    <div className="admin-login-robot" aria-hidden="true">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="admin-login-robot__canvas"
      />
    </div>
  );
}
