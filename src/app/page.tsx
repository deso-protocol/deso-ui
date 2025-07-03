'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { NewsFeed } from '@/components/news/news-feed';
import { FeedSelector } from '@/components/news/feed-selector';
import { useFeedPreferences } from '@/hooks/useFeedPreferences';
import { Providers } from '@/lib/providers';
import { CategoryNav } from '@/components/news/category-nav';

export default function HomePage() {
  const { 
    preferences, 
    updatePreference, 
    setAllPreferences, 
    addCustomSource, 
    removeCustomSource 
  } = useFeedPreferences();

  return (
    <Providers>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <div className="flex justify-between items-center border-b border-border p-4">
            <CategoryNav />
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
            category="all"
            sourcePreferences={preferences}
          />
        </main>
        <AppFooter />
      </div>
    </Providers>
  );
} 