import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';

const SLUG = 'home';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, '/');
}

export default async function HomePage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <>
      <CMSPageEffects />
      <RenderBlocks blocks={page.layout} />
    </>
  );
}
