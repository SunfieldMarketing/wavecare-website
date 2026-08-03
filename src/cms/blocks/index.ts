import { Hero, NoticeBar } from './hero';
import { RichTextBlock, CardGrid, SplitMedia, Stats, Accordion } from './layout';
import { LogoMarquee, Gallery, BeforeAfter, VideoEmbed, VideoGrid, TabsShowcase } from './media';
import { Process, CaseStudyGrid, TestimonialGrid, FinalCTA, ContactFormBlock } from './conversion';

export {
  Hero,
  NoticeBar,
  RichTextBlock,
  CardGrid,
  SplitMedia,
  Stats,
  Accordion,
  LogoMarquee,
  Gallery,
  BeforeAfter,
  VideoEmbed,
  VideoGrid,
  TabsShowcase,
  Process,
  CaseStudyGrid,
  TestimonialGrid,
  FinalCTA,
  ContactFormBlock,
};

/**
 * Every block an editor can drop onto a page.
 * Order here is the order they appear in the "Add block" menu.
 */
export const allBlocks = [
  Hero,
  NoticeBar,
  SplitMedia,
  CardGrid,
  Stats,
  Process,
  TabsShowcase,
  Gallery,
  BeforeAfter,
  VideoEmbed,
  VideoGrid,
  LogoMarquee,
  CaseStudyGrid,
  TestimonialGrid,
  Accordion,
  RichTextBlock,
  ContactFormBlock,
  FinalCTA,
];
