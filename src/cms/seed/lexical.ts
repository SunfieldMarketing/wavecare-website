/**
 * Helpers for building Lexical rich-text values when seeding.
 *
 * Payload stores richText as a Lexical editor state, so prose has to be built
 * in that shape rather than passed as a plain string.
 *
 * Inline markup supported inside any string:
 *   **bold**              -> bold text
 *   [label](https://...)  -> link
 *
 * Block markup, via `body()`:
 *   'plain text'          -> paragraph
 *   ['item', 'item']      -> bullet list
 *   { item, children }    -> bullet list item with a nested list
 */

type LexNode = Record<string, any>;

const IS_BOLD = 1; // Lexical's format bitmask for bold

const textNode = (text: string, format = 0): LexNode => ({
  type: 'text',
  version: 1,
  text,
  format,
  style: '',
  mode: 'normal',
  detail: 0,
});

const linkNode = (label: string, url: string): LexNode => ({
  type: 'link',
  version: 3,
  format: '',
  indent: 0,
  direction: 'ltr',
  fields: {
    linkType: 'custom',
    url,
    newTab: !url.startsWith('/') && !url.startsWith('mailto:') && !url.startsWith('tel:'),
  },
  children: [textNode(label)],
});

/** Splits a string into text / bold / link nodes. */
function inline(text: string): LexNode[] {
  const nodes: LexNode[] = [];
  // Split on links first, then bold within each remaining chunk.
  text.split(/(\[[^\]]+\]\([^)]+\))/g).forEach((chunk) => {
    if (!chunk) return;
    const link = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      nodes.push(linkNode(link[1], link[2]));
      return;
    }
    chunk.split(/(\*\*[^*]+\*\*)/g).forEach((part) => {
      if (!part) return;
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        nodes.push(textNode(part.slice(2, -2), IS_BOLD));
      } else {
        nodes.push(textNode(part));
      }
    });
  });
  return nodes.length ? nodes : [textNode(text)];
}

const paragraph = (text: string): LexNode => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  textFormat: 0,
  children: inline(text),
});

const heading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): LexNode => ({
  type: 'heading',
  tag,
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: inline(text),
});

export type ListEntry = string | { item: string; children: string[] };

const listItem = (entry: ListEntry, index: number, indent = 0): LexNode => {
  if (typeof entry === 'string') {
    return {
      type: 'listitem',
      version: 1,
      value: index + 1,
      format: '',
      indent,
      direction: 'ltr',
      children: inline(entry),
    };
  }
  return {
    type: 'listitem',
    version: 1,
    value: index + 1,
    format: '',
    indent,
    direction: 'ltr',
    children: [...inline(entry.item), bulletList(entry.children, indent + 1)],
  };
};

const bulletList = (entries: ListEntry[], indent = 0): LexNode => ({
  type: 'list',
  version: 1,
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  format: '',
  indent,
  direction: 'ltr',
  children: entries.map((e, i) => listItem(e, i, indent)),
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

export type BodyEntry = string | ListEntry[];

/** Mixed paragraphs and bullet lists -> Lexical state. */
export const body = (entries: BodyEntry[]) =>
  root(entries.map((e) => (Array.isArray(e) ? bulletList(e) : paragraph(e))));

/** Plain paragraphs -> Lexical state. */
export const richText = (paragraphs: string[]) => root(paragraphs.map(paragraph));

/** Sections of `{ heading, body[] }` -> Lexical state. */
export const richTextSections = (
  sections: Array<{ heading?: string; body: BodyEntry[] }>,
  tag: 'h2' | 'h3' = 'h2',
) =>
  root(
    sections.flatMap((s) => [
      ...(s.heading ? [heading(s.heading, tag)] : []),
      ...s.body.map((e) => (Array.isArray(e) ? bulletList(e) : paragraph(e))),
    ]),
  );
