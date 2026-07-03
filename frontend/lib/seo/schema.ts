import { siteConfig } from '../site/config';

import { SiteSettings } from '@/types/api';

export function generateLocalBusinessSchema(settings?: SiteSettings | null) {
  const phone = settings?.phone || siteConfig.phone;
  const email = settings?.email || siteConfig.email;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.businessName,
    image: `${siteConfig.siteUrl}/brand/ankara-pet-house-logo.jpeg`,
    url: siteConfig.siteUrl,
    telephone: phone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ankara',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.9768675,
      longitude: 32.690292,
    },
  };

  if (settings?.instagramUrl) {
    schema.sameAs = [settings.instagramUrl];
  }

  return schema;
}

export function generateServiceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.businessName,
    },
    url: `${siteConfig.siteUrl}${url}`,
  };
}

export function generateBlogPostingSchema({ title, description, url, datePublished }: { title: string; description: string; url: string; datePublished: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: siteConfig.businessName,
    },
    datePublished,
    url: `${siteConfig.siteUrl}${url}`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}
