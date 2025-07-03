'use client';

import * as React from 'react';
import { NewsCard } from './news-card';
import { useNews } from '@/hooks/useNews';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { SourcePreference } from '@/hooks/useFeedPreferences';

type NewsCategory = 'sports' | 'politics' | 'tech' | 'local' | 'world' | 'business' | 'general';

export interface NewsFeedProps {
  category?: NewsCategory | 'all';
  trending?: boolean;
  limit?: number;
  onDiscuss?: (url: string, title: string) => void;
  className?: string;
  sourcePreferences?: SourcePreference[];
}

export const NewsFeed = ({
  category,
  trending,
  limit = 20,
  onDiscuss,
  className,
  sourcePreferences = [],
}: NewsFeedProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch, isFetching } = useNews({
    category,
    trending,
    limit,
  });

  const handleRefresh = async () => {
    await refetch();
  };

  const handleDiscuss = (url: string, title: string) => {
    if (onDiscuss) {
      onDiscuss(url, title);
    } else {
      // Default behavior - could open a modal or navigate
      console.log('Discuss:', { url, title });
    }
  };

  const filteredNews = React.useMemo(() => {
    if (!data?.items) return [];
    
    const enabledSources = new Set(
      sourcePreferences.filter(p => p.isEnabled).map(p => p.name)
    );

    if (enabledSources.size === 0 || enabledSources.size === sourcePreferences.length) {
      return data.items;
    }

    return data.items.filter(item => enabledSources.has(item.source));
  }, [data?.items, sourcePreferences]);

  if (isLoading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load news. Please try again.
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="ml-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data || filteredNews.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No news articles found for this category or your selected sources.
          </p>
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {trending ? 'Trending News' : 
             category && category !== 'all' ? `${category.charAt(0).toUpperCase() + category.slice(1)} News` : 
             'Latest News'}
          </h2>
          <span className="text-sm text-muted-foreground">
            ({filteredNews.length} articles)
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isFetching}
          className="gap-1"
        >
          <RefreshCw className={`h-3 w-3 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((newsItem) => (
          <NewsCard
            key={newsItem.id}
            newsItem={newsItem}
            onDiscuss={handleDiscuss}
            showDiscussButton={true}
          />
        ))}
      </div>

      {/* Metadata */}
      {data.lastUpdated && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
}; 