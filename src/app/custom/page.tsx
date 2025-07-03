'use client';

import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { FeedSelector } from '@/components/news/feed-selector';
import { useFeedPreferences } from '@/hooks/useFeedPreferences';
import { Providers } from '@/lib/providers';
import { CustomNewsFeed } from '@/components/news/custom-news-feed';
import { Separator } from '@/components/ui/separator';
import { CategoryNav } from '@/components/news/category-nav';

export default function CustomPage() {
  const { 
    preferences, 
    updatePreference, 
    setAllPreferences, 
    addCustomSource, 
    removeCustomSource 
  } = useFeedPreferences();

  const enabledCustomFeeds = preferences.filter(p => p.isCustom && p.isEnabled);

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
          {enabledCustomFeeds.length > 0 ? (
            <div>
              {enabledCustomFeeds.map(feed => (
                <CustomNewsFeed key={feed.url} sourceName={feed.name} sourceUrl={feed.url} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold">No Custom Feeds Enabled</h2>
              <p className="text-muted-foreground mt-2">
                You haven't added or enabled any custom RSS feeds yet.
                <br />
                Use the "Sources" button in the top right to add your first one.
              </p>
            </div>
          )}
        </main>
        <AppFooter />
      </div>
    </Providers>
  );
} 