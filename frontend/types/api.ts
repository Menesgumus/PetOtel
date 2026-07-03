export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageId?: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  originalFilename: string;
  storedFilename: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  usages?: string[];
  createdAt: string;
}

export interface PetService {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  content: string;
  coverImageId?: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageId?: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageId?: string;
  coverImageUrl?: string;
  secondaryImageId?: string;
  secondaryImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: string;
  businessName: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  siteUrl?: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ApiError {
  status: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string>;
}
