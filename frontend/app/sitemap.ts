import { MetadataRoute } from 'next';
import { getPublicBlogPosts, getPublicServices, getPublicRooms } from '@/lib/api/public';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const staticRoutes = [
    '',
    '/hakkimizda',
    '/hizmetlerimiz',
    '/odalar',
    '/blog',
    '/iletisim',
    '/ankara-kedi-oteli',
    '/ankara-kopek-oteli',
    '/ankara-pet-pansiyonu',
    '/pet-taksi-ankara',
    '/pet-kres-ankara',
    '/pet-bakim-gezdirme-ankara',
    '/pet-egitimi-ankara'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : (route.includes('ankara') || route === '/hizmetlerimiz' ? 0.9 : 0.8),
  }));

  try {
    // Attempt to fetch dynamic content safely
    const [blogPosts, services, rooms] = await Promise.all([
      getPublicBlogPosts(0, 100).catch(() => null),
      getPublicServices().catch(() => null),
      getPublicRooms().catch(() => null),
    ]);

    if (blogPosts && blogPosts.content) {
      blogPosts.content.forEach((post) => {
        sitemapEntries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }

    if (services) {
      services.forEach((svc) => {
        // If it's not already in staticRoutes, add it
        if (!staticRoutes.includes(`/${svc.slug}`)) {
          sitemapEntries.push({
            url: `${baseUrl}/${svc.slug}`,
            lastModified: new Date(svc.updatedAt || svc.createdAt),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      });
    }

    // Rooms logic can be added similarly if rooms get dedicated dynamic pages

  } catch (error) {
    console.error('Failed to generate dynamic sitemap entries:', error);
    // Graceful fallback: do nothing, just return static entries
  }

  return sitemapEntries;
}
