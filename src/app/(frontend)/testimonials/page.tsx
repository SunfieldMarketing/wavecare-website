import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';
import GlitterLayer from '@/components/cms/GlitterLayer';
import './testimonials.css';

const SLUG = 'testimonials';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function TestimonialsPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <div className="wct-wrap">
      <CMSPageEffects />
      <GlitterLayer />
      <RenderBlocks blocks={page.layout} />
    </div>
  );
}
