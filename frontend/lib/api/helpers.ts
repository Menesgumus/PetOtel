export function getPageContent<T>(response: any): T[] {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.content)) return response.content;
  return [];
}

export async function safeFetch<T>(fetcher: () => Promise<T>): Promise<T | null> {
  try {
    return await fetcher();
  } catch (error: any) {
    if (error?.message?.includes('NEXT_REDIRECT') || error?.message?.includes('Permission denied')) {
      throw error;
    }
    return null;
  }
}

export function resolveMediaUrl(url?: string | null): string | null {
  if (!url) return null;

  // Already frontend-relative upload path
  if (url.startsWith("/uploads/")) {
    return url;
  }

  // Backend returned Docker-internal absolute URL.
  // Browser cannot resolve "backend", so convert it to frontend-relative path.
  if (url.startsWith("http://backend:8080/uploads/")) {
    return url.replace("http://backend:8080", "");
  }

  // Backend returned localhost absolute URL.
  // In browser this is okay locally, but frontend-relative is cleaner.
  if (url.startsWith("http://localhost:8080/uploads/")) {
    return url.replace("http://localhost:8080", "");
  }

  return url;
}
