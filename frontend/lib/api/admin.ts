'use server';

import { authorizedFetch } from './client';
import { BlogPost, PageResponse, PetService, Room, SiteSettings, PageContent, MediaAsset } from '@/types/api';

export async function getAdminBlogPosts(page = 0, size = 10): Promise<PageResponse<BlogPost>> {
  const res = await authorizedFetch(`/blog?page=${page}&size=${size}`);
  return await res.json();
}

export async function getAdminBlogPost(id: string): Promise<BlogPost> {
  const res = await authorizedFetch(`/blog/${id}`);
  return await res.json();
}

export async function createAdminBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const res = await authorizedFetch(`/blog`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateAdminBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  const res = await authorizedFetch(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteAdminBlogPost(id: string): Promise<void> {
  await authorizedFetch(`/blog/${id}`, { method: 'DELETE' });
}

export async function updateAdminBlogStatus(id: string, status: 'DRAFT' | 'PUBLISHED'): Promise<void> {
  await authorizedFetch(`/blog/${id}/status`, { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
}

// SERVICES
export async function getAdminServices(page = 0, size = 100): Promise<PageResponse<PetService>> {
  const res = await authorizedFetch(`/services?page=${page}&size=${size}`);
  return await res.json();
}

export async function getAdminService(id: string): Promise<PetService> {
  const res = await authorizedFetch(`/services/${id}`);
  return await res.json();
}

export async function createAdminService(data: Partial<PetService>): Promise<PetService> {
  const res = await authorizedFetch(`/services`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateAdminService(id: string, data: Partial<PetService>): Promise<PetService> {
  const res = await authorizedFetch(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteAdminService(id: string): Promise<void> {
  await authorizedFetch(`/services/${id}`, { method: 'DELETE' });
}

export async function updateAdminServiceActive(id: string, isActive: boolean): Promise<void> {
  await authorizedFetch(`/services/${id}/active`, { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive })
  });
}

// ROOMS
export async function getAdminRooms(page = 0, size = 100): Promise<PageResponse<Room>> {
  const res = await authorizedFetch(`/rooms?page=${page}&size=${size}`);
  return await res.json();
}

export async function getAdminRoom(id: string): Promise<Room> {
  const res = await authorizedFetch(`/rooms/${id}`);
  return await res.json();
}

export async function createAdminRoom(data: Partial<Room>): Promise<Room> {
  const res = await authorizedFetch(`/rooms`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateAdminRoom(id: string, data: Partial<Room>): Promise<Room> {
  const res = await authorizedFetch(`/rooms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteAdminRoom(id: string): Promise<void> {
  await authorizedFetch(`/rooms/${id}`, { method: 'DELETE' });
}

export async function updateAdminRoomActive(id: string, isActive: boolean): Promise<void> {
  await authorizedFetch(`/rooms/${id}/active`, { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive })
  });
}

// PAGES
export async function getAdminPages(): Promise<PageContent[]> {
  const res = await authorizedFetch(`/pages`);
  return await res.json();
}

export async function getAdminPage(slug: string): Promise<PageContent> {
  const res = await authorizedFetch(`/pages/${slug}`);
  return await res.json();
}

export async function updateAdminPage(slug: string, data: Partial<PageContent>): Promise<PageContent> {
  const res = await authorizedFetch(`/pages/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return await res.json();
}

// SETTINGS
export async function getAdminSettings(): Promise<SiteSettings> {
  const res = await authorizedFetch(`/settings`);
  return await res.json();
}

export async function updateAdminSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const res = await authorizedFetch(`/settings`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return await res.json();
}

// MEDIA
export async function getAdminMediaAssets(page = 0, size = 100): Promise<PageResponse<MediaAsset>> {
  const res = await authorizedFetch(`/media?page=${page}&size=${size}`);
  return await res.json();
}

export async function deleteAdminMediaAsset(id: string): Promise<void> {
  await authorizedFetch(`/media/${id}`, { method: 'DELETE' });
}

export async function updateAdminMediaAltText(id: string, altText: string): Promise<void> {
  await authorizedFetch(`/media/${id}/alt-text`, { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ altText }), // Based on typical Spring Boot requests, but if it's RequestParam we might need URL params
  });
}
