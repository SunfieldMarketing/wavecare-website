import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';
import './commercial.css';

const SLUG = 'commercial';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function CommercialPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <div className="wc-wrap" style={{ paddingTop: '74px' }}>
      <CMSPageEffects />
      <RenderBlocks blocks={page.layout} />
    </div>
  );
}
