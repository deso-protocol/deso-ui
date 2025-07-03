import { useQuery } from '@tanstack/react-query';
import { NewsApiResponse, NewsItem } from '@/app/api/news/route';

type NewsCategory = 'sports' | 'politics' | 'tech' | 'local' | 'world' | 'business' | 'general';

export interface UseNewsOptions {
  category?: NewsCategory | 'all';
  trending?: boolean;
  limit?: number;
}

async function fetchNews(options: UseNewsOptions = {}): Promise<NewsApiResponse> {
  const { category, trending, limit = 20 } = options;
  
  // Build query parameters
  const params = new URLSearchParams();
  if (category && category !== 'all') {
    params.append('category', category);
  }
  if (trending) {
    params.append('trending', 'true');
  }
  params.append('limit', limit.toString());

  const response = await fetch(`/api/news?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  return response.json();
}

export function useNews(options: UseNewsOptions = {}) {
  const { category, trending, limit = 20 } = options;
  
  return useQuery({
    queryKey: ['news', { category, trending, limit }],
    queryFn: () => fetchNews(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useTrendingNews(limit: number = 20) {
  return useNews({ trending: true, limit });
}

export function useNewsByCategory(category: NewsCategory, limit: number = 20) {
  return useNews({ category, limit });
}

// Hook for refreshing news data
export function useRefreshNews() {
  return async () => {
    try {
      const response = await fetch('/api/news', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to refresh news');
      }
      return response.json();
    } catch (error) {
      console.error('Error refreshing news:', error);
      throw error;
    }
  };
}

export interface NewsItem {
  id: string;
  title: string;
  // ... existing code ...
} 