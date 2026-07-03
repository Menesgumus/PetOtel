import { Metadata } from 'next';
import { siteConfig } from '../site/config';

export function constructMetadata({
  title,
  description,
  canonicalUrl,
  image,
}: {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
}): Metadata {
  const url = canonicalUrl ? `${siteConfig.siteUrl}${canonicalUrl}` : siteConfig.siteUrl;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.businessName,
      locale: 'tr_TR',
      type: 'website',
      ...(image && { images: [{ url: image }] }),
    },
  };
}
