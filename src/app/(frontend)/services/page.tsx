import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import ServicesPageEffects from '@/components/cms/ServicesPageEffects';
import './services.css';

const SLUG = 'services';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function ServicesPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <>
      <ServicesPageEffects />
      <RenderBlocks blocks={page.layout} />
    </>
  );
}
