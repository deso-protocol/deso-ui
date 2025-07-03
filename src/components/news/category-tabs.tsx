'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { NewsFeed } from './news-feed';
import { SourcePreference } from '@/hooks/useFeedPreferences';

type NewsCategory = 'sports' | 'politics' | 'tech' | 'local' | 'world' | 'business' | 'general';

export interface CategoryTabsProps {
  activeCategory: NewsCategory | 'trending' | 'all';
  onCategoryChange: (category: NewsCategory | 'trending' | 'all') => void;
  categoryCounts?: Record<string, number>;
  onDiscuss?: (url: string, title: string) => void;
  className?: string;
  sourcePreferences?: SourcePreference[];
}

const categoryConfig = {
  trending: { label: '🔥 Trending', emoji: '🔥' },
  all: { label: '📰 All News', emoji: '📰' },
  general: { label: '📰 General', emoji: '📰' },
  tech: { label: '💻 Tech', emoji: '💻' },
  sports: { label: '⚽ Sports', emoji: '⚽' },
  politics: { label: '🏛️ Politics', emoji: '🏛️' },
  world: { label: '🌍 World', emoji: '🌍' },
  business: { label: '💼 Business', emoji: '💼' },
  local: { label: '📍 Local', emoji: '📍' },
};

export const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
  categoryCounts = {},
  onDiscuss,
  className,
  sourcePreferences,
}: CategoryTabsProps) => {
  return (
    <div className={className}>
      <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as NewsCategory | 'trending' | 'all')}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="flex items-center gap-1 text-xs"
            >
              <span className="hidden sm:inline">{config.emoji}</span>
              <span className="hidden md:inline">
                {config.label.replace(/^.+\s/, '')}
              </span>
              <span className="md:hidden">
                {config.emoji}
              </span>
              {categoryCounts[key] && (
                <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                  {categoryCounts[key]}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(categoryConfig).map((key) => (
          <TabsContent key={key} value={key} className="mt-6">
            <NewsFeed
              category={key === 'all' ? 'all' : key === 'trending' ? undefined : key as NewsCategory}
              trending={key === 'trending'}
              onDiscuss={onDiscuss}
              limit={20}
              sourcePreferences={sourcePreferences}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}; 