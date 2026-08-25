import { Hero, NoticeBar } from './hero';
import { RichTextBlock, CardGrid, SplitMedia, Stats, Accordion, LegalDocument, SocialProofBanner } from './layout';
import { LogoMarquee, Gallery, BeforeAfter, VideoEmbed, VideoGrid, FeaturedVideoWork, TabsShowcase } from './media';
import {
  Process,
  CaseStudyGrid,
  CaseStudyCards,
  TestimonialGrid,
  FinalCTA,
  ContactFormBlock,
} from './conversion';
import { landingBlocks, LandingHero, VideoFeature, StatsBar, PillBand, AuditCTA } from './landing';
import {
  testimonialBlocks,
  VideoTestimonials,
  TestimonialCards,
  DividerLabel,
  InlineCTA,
} from './testimonials';
import { contactBlocks, ContactHero, StepsBlock, CalendarEmbed } from './contact';
import {
  serviceBlocks,
  ServicesGrid,
  SplitRow,
  FeatureRow,
  StatsRow,
  LogoStrip,
  ServiceTestimonials,
  ServiceFinalCTA,
} from './services';
import {
  designPrintBlocks,
  PrintHero,
  PrintIntro,
  IconCardGrid,
  PrintProcess,
  ReceiveGrid,
  SignatureProduct,
} from './designPrint';
import { videoServiceBlocks, CommercialPlayer, TwoColumnText, IconFeatureGrid } from './videoservices';
import {
  aboutBlocks,
  StoryBlock,
  InsightQuote,
  ValuesGrid,
  AccordionShowcase,
  VideoReel,
  SimpleQuoteGrid,
} from './about';
import { webDesignBlocks, WebDesignHero, RevealBeforeAfter, CapabilitiesGrid, SimpleIconGrid } from './webdesign';
import { homeBlocks, ShowreelBlock as ShowreelBlockDef, ServiceCarousel, NumberedFeatureGrid } from './home';
import {
  digitalMarketingBlocks,
  DMHero,
  DMAccordion,
  DMSplitMockup,
  DMFeatureRow,
  DMStatsRow,
  DMFinalCTA,
} from './digitalMarketing';

export {
  Hero,
  NoticeBar,
  RichTextBlock,
  LegalDocument,
  SocialProofBanner,
  CardGrid,
  SplitMedia,
  Stats,
  Accordion,
  LogoMarquee,
  Gallery,
  BeforeAfter,
  VideoEmbed,
  VideoGrid,
  FeaturedVideoWork,
  TabsShowcase,
  Process,
  CaseStudyGrid,
  CaseStudyCards,
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
  ContactHero,
  StepsBlock,
  CalendarEmbed,
  ServicesGrid,
  SplitRow,
  FeatureRow,
  StatsRow,
  LogoStrip,
  ServiceTestimonials,
  ServiceFinalCTA,
  PrintHero,
  PrintIntro,
  IconCardGrid,
  PrintProcess,
  ReceiveGrid,
  SignatureProduct,
  CommercialPlayer,
  TwoColumnText,
  IconFeatureGrid,
  StoryBlock,
  InsightQuote,
  ValuesGrid,
  AccordionShowcase,
  VideoReel,
  SimpleQuoteGrid,
  WebDesignHero,
  RevealBeforeAfter,
  CapabilitiesGrid,
  SimpleIconGrid,
  ShowreelBlockDef as ShowreelBlock,
  ServiceCarousel,
  NumberedFeatureGrid,
  DMHero,
  DMAccordion,
  DMSplitMockup,
  DMFeatureRow,
  DMStatsRow,
  DMFinalCTA,
};

/**
 * Every block an editor can drop onto a page.
 * Order here is the order they appear in the "Add block" menu.
 *
 * Six early/generic blocks (SplitMedia, LogoMarquee, VideoEmbed,
 * CaseStudyGrid, TestimonialGrid, ContactFormBlock — all from this file's
 * original conversion.ts/media.ts/layout.ts scaffolding) were superseded by
 * page-specific ones as the block library grew (SplitRow, LogoStrip,
 * CaseStudyCards, TestimonialCards/VideoTestimonials, the contact page's own
 * flow) but never removed from this list, so RenderBlocks.tsx has no case
 * for any of them — confirmed by reading its switch statement and by
 * checking every live Pages doc in production, none use any of the six.
 * Left selectable, they were a trap: an editor picking one from "Add block"
 * would save it, see nothing wrong in admin, and it would silently render as
 * nothing on the live page. Excluded here (2026-08-25) rather than deleted
 * outright — their schemas/exports still exist above if ever needed again,
 * this only removes them from what an editor can currently add.
 */
export const allBlocks = [
  Hero,
  NoticeBar,
  SocialProofBanner,
  CardGrid,
  Stats,
  Process,
  TabsShowcase,
  Gallery,
  BeforeAfter,
  VideoGrid,
  FeaturedVideoWork,
  CaseStudyCards,
  Accordion,
  RichTextBlock,
  LegalDocument,
  FinalCTA,
  // Landing-page kit — renders the wc-* / wct-* design systems
  ...landingBlocks,
  ...testimonialBlocks,
  ...contactBlocks,
  ...serviceBlocks,
  ...designPrintBlocks,
  ...videoServiceBlocks,
  ...aboutBlocks,
  ...webDesignBlocks,
  ...homeBlocks,
  ...digitalMarketingBlocks,
];
