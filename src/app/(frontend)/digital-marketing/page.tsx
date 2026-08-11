import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';
import ClientEffects from '@/components/cms/blocks/DigitalMarketingClientEffects';
import './dm.css';

const SLUG = 'digital-marketing';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function DigitalMarketingPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <main className="dm-page">
      <CMSPageEffects />
      <ClientEffects />
      <div className="grain"></div>
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}
