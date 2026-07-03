import DynamicServicePage, { generateMetadata as dynamicGenerateMetadata } from '../[slug]/page';

export async function generateMetadata() {
  return dynamicGenerateMetadata({ params: Promise.resolve({ slug: 'pet-kres-ankara' }) });
}

export default function ServicePage() {
  return <DynamicServicePage params={Promise.resolve({ slug: 'pet-kres-ankara' })} />;
}