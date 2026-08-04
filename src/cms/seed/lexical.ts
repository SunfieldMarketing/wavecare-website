/**
 * Minimal helpers for building Lexical rich-text values from plain strings.
 * Payload stores richText as a Lexical editor state, so seeded prose has to be
 * wrapped in that shape rather than passed as a bare string.
 */

type LexNode = Record<string, any>;

const textNode = (text: string): LexNode => ({
  type: 'text',
  version: 1,
  text,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
});

const paragraph = (text: string): LexNode => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  textFormat: 0,
  children: [textNode(text)],
});

const headingNode = (text: string, tag: 'h2' | 'h3' = 'h2'): LexNode => ({
  type: 'heading',
  tag,
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [textNode(text)],
});

const root = (children: LexNode[]) => ({
  root: {
    type: 'root',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    children,
  },
});

/** Plain paragraphs -> Lexical state. */
export const richText = (paragraphs: string[]) => root(paragraphs.map(paragraph));

/**
 * Sections of `{ heading, body[] }` -> Lexical state.
 * Used for the legal pages, which are heading + prose throughout.
 */
export const richTextSections = (
  sections: Array<{ heading?: string; body: string[] }>,
  tag: 'h2' | 'h3' = 'h2',
) =>
  root(
    sections.flatMap((s) => [
      ...(s.heading ? [headingNode(s.heading, tag)] : []),
      ...s.body.map(paragraph),
    ]),
  );
