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
} | null | undefined;

/**
 * Maps the CMS "Appearance" group onto the class names the existing
 * stylesheet already understands, so CMS-driven sections render pixel-identical
 * to the hand-written ones.
 */
const BG_CLASS: Record<string, string> = {
  deep: 'panel deep',
  ink: 'panel ink',
  primary: 'panel',
  light: 'panel light',
  white: 'panel white',
  transparent: '',
  custom: '',
  image: '',
  video: '',
};

const PAD: Record<string, string> = {
  none: '0',
  sm: 'clamp(40px,4vw,64px)',
  default: 'var(--pad)',
  lg: 'calc(var(--pad) * 1.4)',
};

const WIDTH_CLASS: Record<string, string> = {
  default: 'container',
  wide: 'container container-wide',
  narrow: 'container container-narrow',
  full: '',
};

export function sectionClassName(a: Appearance, extra?: string): string {
  const bg = a?.background ?? 'deep';
  return ['sec-pad', BG_CLASS[bg] ?? '', extra ?? ''].filter(Boolean).join(' ').trim();
}

export function containerClassName(a: Appearance): string {
  return WIDTH_CLASS[a?.width ?? 'default'] ?? 'container';
}

export function sectionStyle(a: Appearance): CSSProperties {
  const style: CSSProperties = {};

  if (a?.background === 'custom' && a.customBackground) {
    style.background = a.customBackground;
  }
  if (a?.textColor === 'custom' && a.customTextColor) {
    style.color = a.customTextColor;
  } else if (a?.textColor === 'light') {
    style.color = 'var(--on-dark)';
  } else if (a?.textColor === 'dark') {
    style.color = 'var(--ink)';
  }

  const pt = PAD[a?.paddingTop ?? 'default'];
  const pb = PAD[a?.paddingBottom ?? 'default'];
  if (pt !== undefined) style.paddingTop = pt;
  if (pb !== undefined) style.paddingBottom = pb;

  if (a?.background === 'image' || a?.background === 'video') {
    style.position = 'relative';
    style.overflow = 'hidden';
  }

  return style;
}

/** Overlay layer for image/video backgrounds. */
export function overlayStyle(a: Appearance): CSSProperties | null {
  if (a?.background !== 'image' && a?.background !== 'video') return null;
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
 * Renders *asterisk-wrapped* words in the accent colour, matching the
 * <span className="accent"> pattern used throughout the hand-written pages.
 * Also turns newlines into <br />.
 */
export function parseHighlight(text?: string | null): React.ReactNode[] {
  if (!text) return [];
  const nodes: React.ReactNode[] = [];
  text.split('\n').forEach((line, lineIdx, lines) => {
    line.split(/(\*[^*]+\*)/g).forEach((part, i) => {
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        nodes.push(
          <span className="accent" key={`${lineIdx}-${i}`}>
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
