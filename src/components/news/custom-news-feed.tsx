'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { NewsCard } from './news-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { BaseNewsItem } from '@/types/news';

async function fetchCustomFeed(feedUrl: string): Promise<BaseNewsItem[]> {
  const response = await fetch(`/api/proxy/rss?url=${encodeURIComponent(feedUrl)}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch custom feed');
  }
  const data = await response.json();
  return data.items;
}

interface CustomNewsFeedProps {
  sourceName: string;
  sourceUrl: string;
}

export const CustomNewsFeed = ({ sourceName, sourceUrl }: CustomNewsFeedProps) => {
  const { data, isLoading, error } = useQuery<BaseNewsItem[], Error>({
    queryKey: ['custom-news', sourceUrl],
    queryFn: () => fetchCustomFeed(sourceUrl),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4">{sourceName}</h2>
      
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Could not load feed: {error.message}
          </AlertDescription>
        </Alert>
      )}

      {data && data.length === 0 && (
        <p className="text-muted-foreground">No articles found for this feed.</p>
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <NewsCard key={item.id} newsItem={item} showDiscussButton={true} />
          ))}
        </div>
      )}
    </div>
  );
}; 