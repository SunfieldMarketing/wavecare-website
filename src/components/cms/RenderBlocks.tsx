import {
  Section,
  SectionHead,
  HeroBlock,
  NoticeBarBlock,
  CardGridBlock,
  StatsBlock,
  ProcessBlock,
  FinalCTABlock,
} from './blocks/ServerBlocks';
import { BeforeAfterInner, TabsShowcaseInner, GalleryInner } from './blocks/ClientBlocks';
import { containerClassName } from './appearance';

/**
 * Renders the ordered list of blocks that make up a page.
 *
 * This is a server component: the page's HTML (and therefore its content) is
 * rendered on the server and is fully visible to search engines. Only the
 * genuinely interactive blocks opt into 'use client'.
 */
export default function RenderBlocks({ blocks }: { blocks?: any[] | null }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.blockType}-${block.id ?? i}`;

        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} />;

          case 'noticeBar':
            return <NoticeBarBlock key={key} block={block} />;

          case 'cardGrid':
            return <CardGridBlock key={key} block={block} />;

          case 'stats':
            return <StatsBlock key={key} block={block} />;

          case 'process':
            return <ProcessBlock key={key} block={block} />;

          case 'finalCta':
            return <FinalCTABlock key={key} block={block} />;

          case 'beforeAfter':
            return (
              <Section key={key} appearance={block.appearance}>
                <div className={containerClassName(block.appearance)}>
                  <SectionHead heading={block.heading} />
                  <BeforeAfterInner
                    before={block.beforeImage?.url ?? ''}
                    after={block.afterImage?.url ?? ''}
                    caption={block.caption}
                  />
                </div>
              </Section>
            );

          case 'tabsShowcase':
            return (
              <Section key={key} appearance={block.appearance}>
                <div className={containerClassName(block.appearance)}>
                  <SectionHead heading={block.heading} />
                  <TabsShowcaseInner tabs={block.tabs ?? []} frame={block.frame} buttons={block.buttons} />
                </div>
              </Section>
            );

          case 'gallery':
            return (
              <Section key={key} appearance={block.appearance}>
                <div className={containerClassName(block.appearance)}>
                  <SectionHead heading={block.heading} />
                  <GalleryInner
                    items={(block.items ?? []).filter((it: any) => it?.image?.url)}
                    layout={block.layout}
                    lightbox={block.lightbox !== false}
                    showFilters={block.showFilters === true}
                  />
                </div>
              </Section>
            );

          default:
            // Block type exists in the CMS but has no renderer yet.
            if (process.env.NODE_ENV === 'development') {
              return (
                <div
                  key={key}
                  style={{
                    padding: '24px',
                    margin: '16px',
                    border: '2px dashed #5FD0BF',
                    borderRadius: '12px',
                    color: '#5FD0BF',
                    fontFamily: 'monospace',
                  }}
                >
                  No renderer yet for block type: <strong>{block.blockType}</strong>
                </div>
              );
            }
            return null;
        }
      })}
    </>
  );
}
