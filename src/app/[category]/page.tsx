'use client';

import { use } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { NewsFeed } from '@/components/news/news-feed';
import { FeedSelector } from '@/components/news/feed-selector';
import { useFeedPreferences } from '@/hooks/useFeedPreferences';
import { Providers } from '@/lib/providers';
import { CategoryNav } from '@/components/news/category-nav';
import { CATEGORIES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const { 
    preferences, 
    updatePreference, 
    setAllPreferences, 
    addCustomSource, 
    removeCustomSource 
  } = useFeedPreferences();

  const categoryInfo = CATEGORIES.find(c => c.path === `/${resolvedParams.category}`);

  if (!categoryInfo) {
    notFound();
  }

  return (
    <Providers>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <div className="flex justify-between items-center border-b border-border p-4">
            <CategoryNav activeCategoryName={categoryInfo.name} preferences={preferences} />
            <FeedSelector
              preferences={preferences}
              updatePreference={updatePreference}
              setAllPreferences={setAllPreferences}
              addCustomSource={addCustomSource}
              removeCustomSource={removeCustomSource}
            />
          </div>
        <main className="flex flex-col gap-4 container mx-auto flex-grow p-4">          
          <NewsFeed
            category={resolvedParams.category === 'trending' ? undefined : resolvedParams.category as any}
            trending={resolvedParams.category === 'trending'}
            sourcePreferences={preferences}
          />
        </main>
        <AppFooter />
      </div>
    </Providers>
  );
} 