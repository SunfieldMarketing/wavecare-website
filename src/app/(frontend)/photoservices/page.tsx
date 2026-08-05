import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';
import CMSPageEffects from '@/components/cms/CMSPageEffects';
import '../subservices.css';

const SLUG = 'photoservices';

/**
 * Server component.
 *
 * Because this is no longer `'use client'`, the page can export
 * generateMetadata — which is what gives it a real <title> and description
 * instead of inheriting the generic site-wide one.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function PhotoServicesPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();

  return (
    <>
      <CMSPageEffects />
      <RenderBlocks blocks={page.layout} />
    </>
  );
}
