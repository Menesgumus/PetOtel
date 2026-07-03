import { publicFetch } from './client';
import { BlogPost, PageResponse, PetService, Room, SiteSettings, PageContent } from '@/types/api';

export async function getPublicBlogPosts(page = 0, size = 10): Promise<PageResponse<BlogPost>> {
  try {
    const res = await publicFetch(`/blog?page=${page}&size=${size}`, { cache: 'no-store' });
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) {
      return { content: [], pageNo: 0, pageSize: size, totalElements: 0, totalPages: 0, last: true };
    }
    console.error(`[public-api] Failed to fetch blog posts: ${error.message}`);
    throw error;
  }
}

export async function getPublicBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await publicFetch(`/blog/${slug}`, { cache: 'no-store' });
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) return null;
    console.error(`[public-api] Failed to fetch blog post ${slug}: ${error.message}`);
    throw error;
  }
}

export async function getPublicServices(): Promise<PetService[]> {
  try {
    const res = await publicFetch(`/services`, { cache: 'no-store' });
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) return [];
    console.error(`[public-api] Failed to fetch services: ${error.message}`);
    throw error;
  }
}

export async function getPublicService(slug: string): Promise<PetService | null> {
  try {
    const res = await publicFetch(`/services/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) return null;
    console.error(`[public-api] Failed to fetch service ${slug}: ${error.message}`);
    throw error;
  }
}

export async function getPublicRooms(): Promise<Room[]> {
  try {
    const res = await publicFetch(`/rooms`, { cache: 'no-store' });
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) return [];
    console.error(`[public-api] Failed to fetch rooms: ${error.message}`);
    throw error;
  }
}

export async function getPublicSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await publicFetch(`/site-settings`, { cache: 'no-store' });
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) return null;
    console.error(`[public-api] Failed to fetch site settings: ${error.message}`);
    throw error;
  }
}
export async function getPublicPage(slug: string): Promise<PageContent | null> {
  try {
    const res = await publicFetch(`/pages/${slug}`, { cache: 'no-store' });
    return await res.json();
  } catch (error: any) {
    if (error?.status === 404) return null;
    console.error(`[public-api] Failed to fetch public page ${slug}: ${error.message}`);
    throw error;
  }
}
