'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { CategoryTabs } from '@/components/news/category-tabs';
import { NewsFeed } from '@/components/news/news-feed';
import { FeedSelector } from '@/components/news/feed-selector';
import { useFeedPreferences } from '@/hooks/useFeedPreferences';
import { Providers } from '@/lib/providers';
import { CustomNewsFeed } from '@/components/news/custom-news-feed';
import { Separator } from '@/components/ui/separator';

type NewsCategory = 'sports' | 'politics' | 'tech' | 'local' | 'world' | 'business' | 'general';
type ActiveTab = NewsCategory | 'all' | 'trending';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const { 
    preferences, 
    updatePreference, 
    setAllPreferences, 
    addCustomSource, 
    removeCustomSource 
  } = useFeedPreferences();

  const handleDiscuss = (url: string, title: string) => {
    // This could open a modal with the DeSo editor
    alert(`Discuss: ${title}\nURL: ${url}`);
  };

  const enabledCustomFeeds = preferences.filter(p => p.isCustom && p.isEnabled);

  return (
    <Providers>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-end items-center mb-4">
            <FeedSelector
              preferences={preferences}
              updatePreference={updatePreference}
              setAllPreferences={setAllPreferences}
              addCustomSource={addCustomSource}
              removeCustomSource={removeCustomSource}
            />
          </div>

          <CategoryTabs
            activeCategory={activeTab}
            onCategoryChange={setActiveTab}
            onDiscuss={handleDiscuss}
            sourcePreferences={preferences}
          />

          {enabledCustomFeeds.length > 0 && (
            <div className="mt-12">
              <Separator />
              {enabledCustomFeeds.map(feed => (
                <CustomNewsFeed key={feed.url} sourceName={feed.name} sourceUrl={feed.url} />
              ))}
            </div>
          )}
          
        </main>
        <AppFooter />
      </div>
    </Providers>
  );
} 