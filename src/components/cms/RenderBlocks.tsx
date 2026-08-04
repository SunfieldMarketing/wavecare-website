import { RichText } from '@payloadcms/richtext-lexical/react';
import {
  Section,
  SectionHead,
  HeroBlock,
  NoticeBarBlock,
  SocialProofBannerBlock,
  CardGridBlock,
  StatsBlock,
  ProcessBlock,
  FinalCTABlock,
  LegalDocumentBlock,
  CaseStudyCardsBlock,
} from './blocks/ServerBlocks';
import { BeforeAfterInner, TabsShowcaseInner, GalleryInner } from './blocks/ClientBlocks';
import {
  LandingHeroBlock,
  VideoFeatureBlock,
  StatsBarBlock,
  PillBandBlock,
  AuditCTABlock,
  DividerLabelBlock,
  InlineCTABlock,
  VideoTestimonialsBlock,
  TestimonialCardsBlock,
} from './blocks/LandingBlocks';
import {
  ContactHeroBlock,
  StepsBlockRenderer,
  CalendarEmbedBlock,
} from './blocks/ContactBlocks';
import {
  ServicesGridBlock,
  SplitRowBlock,
  FeatureRowBlock,
  StatsRowBlock,
  LogoStripBlock,
  ServiceTestimonialsBlock,
  ServiceFinalCTABlock,
} from './blocks/ServiceBlocks';
import {
  PrintHeroBlock,
  PrintIntroBlock,
  IconCardGridBlock,
  PrintProcessBlock,
  ReceiveGridBlock,
  SignatureProductBlock,
} from './blocks/DesignPrintBlocks';
import {
  CommercialPlayerBlock,
  TwoColumnTextBlock,
  IconFeatureGridBlock,
  VideoGridBlock,
  FeaturedVideoWorkBlock,
} from './blocks/VideoServicesBlocks';
import VideoLightboxHost from './blocks/VideoLightbox';
import {
  StoryBlockRenderer,
  InsightQuoteBlock,
  ValuesGridBlock,
  AccordionShowcaseBlock,
  VideoReelBlock,
  SimpleQuoteGridBlock,
} from './blocks/AboutBlocks';
import {
  WebDesignHeroBlock,
  RevealBeforeAfterBlock,
  CapabilitiesGridBlock,
  SimpleIconGridBlock,
} from './blocks/WebDesignBlocks';
import { ShowreelBlock, ServiceCarouselBlock, NumberedFeatureGridBlock } from './blocks/HomeBlocks';
import { containerClassName } from './appearance';
import CMSLink from './CMSLink';
import './cms-blocks.css';

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
      <VideoLightboxHost />
      {blocks.map((block, i) => {
        const key = `${block.blockType}-${block.id ?? i}`;

        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} />;

          case 'noticeBar':
            return <NoticeBarBlock key={key} block={block} />;

          case 'socialProofBanner':
            return <SocialProofBannerBlock key={key} block={block} />;

          case 'cardGrid':
            return <CardGridBlock key={key} block={block} />;

          case 'stats':
            return <StatsBlock key={key} block={block} />;

          case 'process':
            return <ProcessBlock key={key} block={block} />;

          case 'finalCta':
            return <FinalCTABlock key={key} block={block} />;

          case 'legalDocument':
            return <LegalDocumentBlock key={key} block={block} />;

          case 'caseStudyCards':
            return <CaseStudyCardsBlock key={key} block={block} />;

          // ── Contact page ──
          case 'contactHero':
            return <ContactHeroBlock key={key} block={block} />;
          case 'steps':
            return <StepsBlockRenderer key={key} block={block} />;
          case 'calendarEmbed':
            return <CalendarEmbedBlock key={key} block={block} />;

          // ── /services (services.css class system) ──
          case 'servicesGrid':
            return <ServicesGridBlock key={key} block={block} />;
          case 'splitRow':
            return <SplitRowBlock key={key} block={block} />;
          case 'featureRow':
            return <FeatureRowBlock key={key} block={block} />;
          case 'statsRow':
            return <StatsRowBlock key={key} block={block} />;
          case 'logoStrip':
            return <LogoStripBlock key={key} block={block} />;
          case 'serviceTestimonials':
            return <ServiceTestimonialsBlock key={key} block={block} />;
          case 'serviceFinalCta':
            return <ServiceFinalCTABlock key={key} block={block} />;

          // ── /design-print (subservices.css) ──
          case 'printHero':
            return <PrintHeroBlock key={key} block={block} />;
          case 'printIntro':
            return <PrintIntroBlock key={key} block={block} />;
          case 'iconCardGrid':
            return <IconCardGridBlock key={key} block={block} />;
          case 'printProcess':
            return <PrintProcessBlock key={key} block={block} />;
          case 'receiveGrid':
            return <ReceiveGridBlock key={key} block={block} />;
          case 'signatureProduct':
            return <SignatureProductBlock key={key} block={block} />;

          // ── /videoservices (subservices.css) ──
          case 'commercialPlayer':
            return <CommercialPlayerBlock key={key} block={block} />;
          case 'twoColumnText':
            return <TwoColumnTextBlock key={key} block={block} />;
          case 'iconFeatureGrid':
            return <IconFeatureGridBlock key={key} block={block} />;
          case 'videoGrid':
            return <VideoGridBlock key={key} block={block} />;
          case 'featuredVideoWork':
            return <FeaturedVideoWorkBlock key={key} block={block} />;

          // ── /about (globals.css only) ──
          case 'storyBlock':
            return <StoryBlockRenderer key={key} block={block} />;
          case 'insightQuote':
            return <InsightQuoteBlock key={key} block={block} />;
          case 'valuesGrid':
            return <ValuesGridBlock key={key} block={block} />;
          case 'accordionShowcase':
            return <AccordionShowcaseBlock key={key} block={block} />;
          case 'videoReel':
            return <VideoReelBlock key={key} block={block} />;
          case 'simpleQuoteGrid':
            return <SimpleQuoteGridBlock key={key} block={block} />;

          // ── /webdesign (subservices.css) ──
          case 'webDesignHero':
            return <WebDesignHeroBlock key={key} block={block} />;
          case 'revealBeforeAfter':
            return <RevealBeforeAfterBlock key={key} block={block} />;
          case 'capabilitiesGrid':
            return <CapabilitiesGridBlock key={key} block={block} />;
          case 'simpleIconGrid':
            return <SimpleIconGridBlock key={key} block={block} />;

          // ── / (homepage, globals.css) ──
          case 'showreelBlock':
            return <ShowreelBlock key={key} block={block} />;
          case 'serviceCarousel':
            return <ServiceCarouselBlock key={key} block={block} />;
          case 'numberedFeatureGrid':
            return <NumberedFeatureGridBlock key={key} block={block} />;

          case 'richText':
            return (
              <Section key={key} appearance={block.appearance}>
                <div className={containerClassName(block.appearance)}>
                  <SectionHead heading={block.heading} />
                  {block.content && <RichText data={block.content} />}
                </div>
              </Section>
            );

          // ── Landing-page kit (wc-* design system) ──
          case 'landingHero':
            return <LandingHeroBlock key={key} block={block} />;
          case 'videoFeature':
            return <VideoFeatureBlock key={key} block={block} />;
          case 'statsBar':
            return <StatsBarBlock key={key} block={block} />;
          case 'pillBand':
            return <PillBandBlock key={key} block={block} />;
          case 'auditCta':
            return <AuditCTABlock key={key} block={block} />;
          case 'dividerLabel':
            return <DividerLabelBlock key={key} block={block} />;
          case 'inlineCta':
            return <InlineCTABlock key={key} block={block} />;
          case 'videoTestimonials':
            return <VideoTestimonialsBlock key={key} block={block} />;
          case 'testimonialCards':
            return <TestimonialCardsBlock key={key} block={block} />;

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
                  {block.buttons?.length ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }} data-reveal>
                      {block.buttons.map((b: any, bi: number) => (
                        <CMSLink key={bi} link={b.link} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </Section>
            );

          default:
            // Block type exists in the CMS but has no renderer yet.
            if (process.env.NODE_ENV === 'development') {
              return (
                <div key={key} className="cms-missing-block">
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
