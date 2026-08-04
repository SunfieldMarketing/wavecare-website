import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RichText } from '@payloadcms/richtext-lexical/react';

import { getCaseStudyBySlug, getAllCaseStudySlugs, buildMetadata } from '@/lib/cms';
import { parseHighlight } from '@/components/cms/appearance';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';
import CaseStudyTracker from './CaseStudyTracker';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllCaseStudySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  return buildMetadata(study, `/case-studies/${slug}`);
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study: any = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const services: string[] = (study.services ?? []).map((s: any) => s.name).filter(Boolean);

  return (
    <>
      <CMSPageEffects />
      <CaseStudyTracker slug={slug} client={study.client} services={services} />

      {/* Hero */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-bg">
          <div style={{ width: '100%', height: '100%', background: 'var(--teal-deep)' }} />
        </div>
        <div className="container hero-inner" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
          <span className="label">{study.client}</span>
          <h1 style={{ color: '#fff', maxWidth: '820px', margin: '16px 0 28px' }}>
            {parseHighlight(study.title)}
          </h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {services.map((s) => (
              <span key={s} className="label" style={{ marginBottom: 0 }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Result stat */}
      <section className="sec-pad ink">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: 'clamp(40px,6vw,100px)',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--soft)',
                borderRadius: '18px',
                padding: '48px 32px',
              }}
            >
              <div className="stat">
                <div
                  className="num"
                  style={{
                    fontSize: 'clamp(64px,9vw,110px)',
                    WebkitTextFillColor: 'transparent',
                    background: 'linear-gradient(180deg,#fff,var(--teal-bright))',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {study.result}
                </div>
                <div className="cap" style={{ marginTop: '14px' }}>
                  {study.resultLabel}
                </div>
              </div>
            </div>
            <div className="cs-body">
              {study.body && <RichText data={study.body} />}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '36px' }}>
                <Link href="/contact" className="btn">
                  Start Your Project
                </Link>
                <Link href="/case-studies" className="btn btn-ghost">
                  ← All Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Any extra sections an editor added in the CMS */}
      <RenderBlocks blocks={study.layout} />

      {/* CTA */}
      <section className="final">
        <canvas id="waveCanvas" />
        <div className="final-in">
          <span className="label">Ready for results like this?</span>
          <h2>Let&apos;s build your success story.</h2>
          <p className="sub">
            Book a free discovery call and we&apos;ll map out exactly what we&apos;d build for your facility.
          </p>
          <Link href="/contact" className="btn">
            Book a Demo
          </Link>
        </div>
      </section>
    </>
  );
}
