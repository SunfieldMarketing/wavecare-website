import { Hero, NoticeBar } from './hero';
import { RichTextBlock, CardGrid, SplitMedia, Stats, Accordion, LegalDocument } from './layout';
import { LogoMarquee, Gallery, BeforeAfter, VideoEmbed, VideoGrid, TabsShowcase } from './media';
import { Process, CaseStudyGrid, TestimonialGrid, FinalCTA, ContactFormBlock } from './conversion';
import { landingBlocks, LandingHero, VideoFeature, StatsBar, PillBand, AuditCTA } from './landing';
import {
  testimonialBlocks,
  VideoTestimonials,
  TestimonialCards,
  DividerLabel,
  InlineCTA,
} from './testimonials';

export {
  Hero,
  NoticeBar,
  RichTextBlock,
  LegalDocument,
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
  LandingHero,
  VideoFeature,
  StatsBar,
  PillBand,
  AuditCTA,
  VideoTestimonials,
  TestimonialCards,
  DividerLabel,
  InlineCTA,
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
  LegalDocument,
  ContactFormBlock,
  FinalCTA,
  // Landing-page kit — renders the wc-* / wct-* design systems
  ...landingBlocks,
  ...testimonialBlocks,
];
