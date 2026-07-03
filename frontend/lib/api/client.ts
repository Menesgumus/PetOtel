import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export async function publicFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}/public${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(`API Error: ${response.status} ${response.statusText}`);
    (error as any).status = response.status;
    throw error;
  }

  return response;
}

export async function authorizedFetch(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const url = `${API_BASE_URL}/admin${endpoint}`;
  
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  
  // Only set Content-Type to application/json if it's not a FormData upload
  if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
  } else {
      // If FormData, we don't set Content-Type; fetch will set it with the correct boundary
      headers.delete('Content-Type');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store', // Admin data should always be fresh
  });

  if (response.status === 401) {
    cookieStore.delete('auth_token');
    redirect('/admin/login');
  }
  
  if (response.status === 403) {
    throw new Error('Permission denied (403)');
  }

  if (!response.ok) {
     const errorBody = await response.text();
     throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  return response;
}
