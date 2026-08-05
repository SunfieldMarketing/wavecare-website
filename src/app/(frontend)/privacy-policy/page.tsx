import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, buildMetadata } from '@/lib/cms';
import RenderBlocks from '@/components/cms/RenderBlocks';

const SLUG = 'privacy-policy';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG);
  return buildMetadata(page, `/${SLUG}`);
}

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug(SLUG);
  if (!page) notFound();
  return <RenderBlocks blocks={page.layout} />;
}
