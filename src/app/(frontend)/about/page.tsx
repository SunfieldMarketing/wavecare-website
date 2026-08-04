import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';

const SLUG = 'about';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function AboutPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <>
      <CMSPageEffects />
      <RenderBlocks blocks={page.layout} />
    </>
  );
}
