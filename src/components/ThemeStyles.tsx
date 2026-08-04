import { getGlobal } from '@/lib/cms';

/**
 * Emits the CMS "Design & Colours" global as CSS custom properties.
 *
 * globals.css already defines every one of these on :root, so this only needs
 * to override the ones an editor has actually set. Values are filtered to a
 * conservative character set before being inlined — a style block is a script
 * injection surface, and editors are not expected to be writing CSS.
 */

const SAFE = /^[#a-zA-Z0-9\s(),.%'"\-_/]+$/;

const clean = (v: unknown): string | null => {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  if (!s || s.length > 200) return null;
  if (!SAFE.test(s)) return null;
  if (/[<>;{}]|@import|expression|url\s*\(\s*['"]?\s*javascript:/i.test(s)) return null;
  return s;
};

const MAP: Array<[string, string]> = [
  ['tealDeep', '--teal-deep'],
  ['tealPrimary', '--teal-primary'],
  ['tealSecondary', '--teal-secondary'],
  ['tealAccent', '--teal-accent'],
  ['tealBright', '--teal-bright'],
  ['tealLight', '--teal-light'],
  ['ink', '--ink'],
  ['navy', '--navy'],
  ['white', '--white'],
  ['onDark', '--on-dark'],
  ['muted', '--muted'],
  ['labelColor', '--label'],
  ['soft', '--soft'],
  ['borderTeal', '--border-teal'],
  ['fontDisplay', '--font-display'],
  ['fontBody', '--font-body'],
  ['sectionPadding', '--pad'],
  ['containerWidth', '--container'],
];

export default async function ThemeStyles() {
  const theme: any = await getGlobal('theme').catch(() => null);
  if (!theme) return null;

  const decls = MAP.map(([key, cssVar]) => {
    const value = clean(theme[key]);
    return value ? `${cssVar}:${value};` : '';
  })
    .filter(Boolean)
    .join('');

  const toggles: string[] = [];
  if (theme.enableGrain === false) toggles.push('.grain{display:none!important}');
  if (theme.enableCustomCursor === false) toggles.push('.cdot,.cring{display:none!important}');
  if (theme.enableAnimations === false) {
    toggles.push('[data-reveal],.reveal,.stagger{opacity:1!important;transform:none!important}');
  }

  if (!decls && toggles.length === 0) return null;

  return (
    <style
      id="cms-theme"
      dangerouslySetInnerHTML={{ __html: `${decls ? `:root{${decls}}` : ''}${toggles.join('')}` }}
    />
  );
}
