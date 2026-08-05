import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';
import './case-studies.css';

const SLUG = 'case-studies';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function CaseStudiesPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <>
      <CMSPageEffects />
      <RenderBlocks blocks={page.layout} />
    </>
  );
}
