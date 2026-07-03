import DynamicServicePage, { generateMetadata as dynamicGenerateMetadata } from '../[slug]/page';

export async function generateMetadata() {
  return dynamicGenerateMetadata({ params: Promise.resolve({ slug: 'ankara-kopek-oteli' }) });
}

export default function ServicePage() {
  return <DynamicServicePage params={Promise.resolve({ slug: 'ankara-kopek-oteli' })} />;
}