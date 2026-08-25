'use client';

/**
 * Makes a rendered block clickable-to-edit inside the admin's Live Preview
 * iframe. Only active in draft/preview mode (RenderBlocks.tsx passes
 * isPreview from draftMode() — a normal visitor's page never mounts this
 * listener at all, so there is zero behavior change or overhead outside
 * the admin's own preview).
 *
 * Clicking anywhere in the block posts { type: 'wc-select-block',
 * fieldPath: 'layout', blockIndex } to the parent window. The admin side
 * (src/components/admin/ClickToEditListener.tsx, wired in via
 * payload.config.ts's admin.components.providers) listens for that and
 * scrolls/expands the matching row in the Blocks field — see that file's
 * own comment for how the row is found (Payload's own BlockRow component
 * gives every row a deterministic `${fieldPath}-row-${index}` DOM id).
 *
 * Does not preventDefault/stopPropagation - a real link or button inside
 * the block still does whatever it normally does. Both happening together
 * is harmless in a preview context and means this never has to special-case
 * interactive children.
 */
export default function PreviewBlockBoundary({
  index,
  fieldPath,
  isPreview,
  children,
}: {
  index: number;
  fieldPath: string;
  isPreview: boolean;
  children: React.ReactNode;
}) {
  if (!isPreview) return <>{children}</>;

  return (
    <div
      data-wc-block-index={index}
      onClick={() => {
        if (window.parent === window) return; // not inside an iframe, nothing to talk to
        window.parent.postMessage({ type: 'wc-select-block', fieldPath, blockIndex: index }, '*');
      }}
      // display:contents keeps this wrapper out of the box/layout tree entirely
      // (children render as if they were direct children of RenderBlocks' own
      // parent, exactly like before this wrapper existed) - many of these
      // blocks are full-bleed sections or rely on adjacent-sibling CSS
      // selectors, and a normal block-level wrapper div would break both.
      // Click events still bubble through it either way; only the box
      // generation is suppressed, not the DOM node itself.
      style={{ display: 'contents', cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}
