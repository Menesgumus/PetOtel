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
