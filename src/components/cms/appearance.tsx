import type { CSSProperties } from 'react';

export type Appearance = {
  background?: string | null;
  textColor?: string | null;
  customBackground?: string | null;
  customTextColor?: string | null;
  backgroundImage?: any;
  backgroundVideo?: { source?: string | null; vimeoId?: string | null; url?: string | null } | null;
  overlay?: { enabled?: boolean | null; opacity?: number | null } | null;
  paddingTop?: string | null;
  paddingBottom?: string | null;
  width?: string | null;
  anchorId?: string | null;
  glow?: {
    enabled?: boolean | null;
    color?: string | null;
    size?: number | null;
    opacity?: number | null;
    position?: string | null;
  } | null;
} | null | undefined;

/**
 * Maps the CMS "Appearance" group onto class names that ACTUALLY EXIST in
 * globals.css / subservices.css.
 *
 * globals.css:201 defines the background modifiers: .deep .primary .ink .light
 * `panel` is kept only because the hand-written pages used it; it has no rules
 * of its own and is purely a hook.
 */
const BG_CLASS: Record<string, string> = {
  deep: 'panel deep',
  ink: 'panel ink',
  primary: 'panel primary',
  light: 'panel light',
  white: 'panel',
  transparent: '',
  custom: '',
  image: '',
  video: '',
};

const PAD: Record<string, string> = {
  none: '0',
  sm: 'clamp(40px,4vw,64px)',
  lg: 'calc(var(--pad) * 1.4)',
  // 'default' is intentionally absent — fall through to the .sec-pad class so
  // the stylesheet, not an inline style, controls normal spacing.
};

// `cms-` prefixed so these options cannot restyle the hand-written pages, which
// already use a bare `container-wide` that the stylesheet never defined.
const WIDTH_CLASS: Record<string, string> = {
  default: 'container',
  wide: 'cms-container-wide',
  narrow: 'cms-container-narrow',
  full: 'cms-container-full',
};

/**
 * @param withPad adds .sec-pad. Heroes and the notice bar manage their own
 *   spacing, exactly as the hand-written markup did.
 */
export function sectionClassName(a: Appearance, extra?: string, withPad = true): string {
  const bg = a?.background ?? 'deep';
  const usesDefaultPad =
    (a?.paddingTop ?? 'default') === 'default' && (a?.paddingBottom ?? 'default') === 'default';
  return [withPad && usesDefaultPad ? 'sec-pad' : '', BG_CLASS[bg] ?? '', extra ?? '']
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function containerClassName(a: Appearance): string {
  return WIDTH_CLASS[a?.width ?? 'default'] ?? 'container';
}

export function sectionStyle(a: Appearance): CSSProperties {
  const style: CSSProperties = {};

  if (a?.background === 'custom' && a.customBackground) style.background = a.customBackground;

  if (a?.textColor === 'custom' && a.customTextColor) style.color = a.customTextColor;
  else if (a?.textColor === 'light') style.color = 'var(--on-dark)';
  else if (a?.textColor === 'dark') style.color = 'var(--ink)';

  // Only emit padding when the editor picked a non-default value; otherwise
  // .sec-pad owns it and we must not override the stylesheet.
  const pt = PAD[a?.paddingTop ?? 'default'];
  const pb = PAD[a?.paddingBottom ?? 'default'];
  if (pt !== undefined) style.paddingTop = pt;
  if (pb !== undefined) style.paddingBottom = pb;

  if (hasMediaBackground(a)) {
    style.position = 'relative';
    style.overflow = 'hidden';
  }

  return style;
}

export function hasMediaBackground(a: Appearance): boolean {
  return a?.background === 'image' || a?.background === 'video';
}

export function overlayStyle(a: Appearance): CSSProperties | null {
  if (!hasMediaBackground(a)) return null;
  if (a?.overlay?.enabled === false) return null;
  const opacity = (a?.overlay?.opacity ?? 60) / 100;
  return {
    position: 'absolute',
    inset: 0,
    background: `rgba(6,42,36,${opacity})`,
    pointerEvents: 'none',
    zIndex: 1,
  };
}

/**
 * Renders *asterisk-wrapped* words in the accent colour (<span
 * className="accent">) and _underscore-wrapped_ words in the light-italic
 * treatment (<span className="lite">), matching the two inline-emphasis
 * patterns used throughout the hand-written pages. Newlines become <br />.
 */
export function parseHighlight(text?: string | null): React.ReactNode[] {
  if (!text) return [];
  const nodes: React.ReactNode[] = [];
  text.split('\n').forEach((line, lineIdx, lines) => {
    line.split(/(\*[^*]+\*|_[^_]+_)/g).forEach((part, i) => {
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        nodes.push(
          <span className="accent" key={`${lineIdx}-${i}`}>
            {part.slice(1, -1)}
          </span>,
        );
      } else if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
        nodes.push(
          <span className="lite" key={`${lineIdx}-${i}`}>
            {part.slice(1, -1)}
          </span>,
        );
      } else if (part) {
        nodes.push(<span key={`${lineIdx}-${i}`}>{part}</span>);
      }
    });
    if (lineIdx < lines.length - 1) nodes.push(<br key={`br-${lineIdx}`} />);
  });
  return nodes;
}
