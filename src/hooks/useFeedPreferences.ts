import { useState, useEffect, useCallback } from 'react';

// Define the structure of a news source
export interface NewsSource {
  name: string;
  category: string;
  url: string;
  fetchOgData: boolean;
  isCustom?: boolean; // Flag for user-added sources
}

// Define the structure for user's preference for a source
export interface SourcePreference extends NewsSource {
  isEnabled: boolean;
}

// The list of all available news sources in the app
export const ALL_NEWS_SOURCES: NewsSource[] = [
  // --- General News & World ---
  { name: 'Google News', category: 'general', url: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en', fetchOgData: false },
  { name: 'NY Times', category: 'world', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', fetchOgData: true },
  { name: 'Washington Post', category: 'world', url: 'https://feeds.washingtonpost.com/rss/world', fetchOgData: true },
  { name: 'Yahoo News', category: 'general', url: 'https://www.yahoo.com/news/rss', fetchOgData: true },
  { name: 'CNBC', category: 'business', url: 'https://www.cnbc.com/id/100727362/device/rss/rss.html', fetchOgData: true },
  
  // --- BBC (Known good source) ---
  { name: 'BBC', category: 'general', url: 'http://feeds.bbci.co.uk/news/rss.xml', fetchOgData: true },
  { name: 'BBC', category: 'world', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', fetchOgData: true },
  { name: 'BBC', category: 'business', url: 'http://feeds.bbci.co.uk/news/business/rss.xml', fetchOgData: true },
  
  // --- Technology ---
  { name: 'BBC', category: 'tech', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml', fetchOgData: true },

  // --- Sports ---
  { name: 'BBC', category: 'sports', url: 'https://feeds.bbci.co.uk/sport/rss.xml', fetchOgData: true },
  { name: 'ESPN', category: 'sports', url: 'https://www.espn.com/espn/rss/news', fetchOgData: true },
  { name: 'Yahoo Sports', category: 'sports', url: 'https://sports.yahoo.com/rss/', fetchOgData: true },
  { name: 'Sky News', category: 'sports', url: 'https://feeds.skynews.com/feeds/rss/sports.xml', fetchOgData: true },
  { name: 'Reddit Sports', category: 'sports', url: 'https://www.reddit.com/r/sports.rss', fetchOgData: false },
];

const LOCAL_STORAGE_KEY = 'deso-news-feed-preferences';

/**
 * Custom hook to manage user's news feed preferences.
 * - Initializes preferences from local storage or defaults to all enabled.
 * - Provides a function to update and persist preferences.
 * - Returns the list of sources with their enabled/disabled state.
 */
export const useFeedPreferences = () => {
  const [preferences, setPreferences] = useState<SourcePreference[]>([]);

  // Load preferences from local storage on initial mount
  useEffect(() => {
    try {
      const storedPrefs = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPrefs) {
        const parsedPrefs: SourcePreference[] = JSON.parse(storedPrefs);
        // Combine stored custom feeds with the hardcoded default list
        const defaultUrls = new Set(ALL_NEWS_SOURCES.map(s => s.url));
        const customPrefs = parsedPrefs.filter(p => p.isCustom);
        const allStoredPrefs = [...customPrefs];

        // Ensure default sources from code are present
        ALL_NEWS_SOURCES.forEach(source => {
          const stored = parsedPrefs.find(p => p.url === source.url);
          allStoredPrefs.push(stored || { ...source, isEnabled: true });
        });
        
        // Deduplicate in case a stored default was also marked custom somehow
        const finalPrefs = Array.from(new Map(allStoredPrefs.map(p => [p.url, p])).values());

        setPreferences(finalPrefs);
      } else {
        // If no preferences are stored, default all sources to enabled
        const defaultPrefs = ALL_NEWS_SOURCES.map(source => ({ ...source, isEnabled: true }));
        setPreferences(defaultPrefs);
      }
    } catch (error) {
      console.error('Failed to load feed preferences from local storage:', error);
      const defaultPrefs = ALL_NEWS_SOURCES.map(source => ({ ...source, isEnabled: true }));
      setPreferences(defaultPrefs);
    }
  }, []);

  const updatePreferences = (newPrefs: SourcePreference[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPrefs));
      setPreferences(newPrefs);
    } catch (error) {
      console.error('Failed to save feed preferences to local storage:', error);
    }
  };

  // Callback to update a single source's preference
  const updatePreference = useCallback((url: string, isEnabled: boolean) => {
    const newPrefs = preferences.map(pref =>
      pref.url === url ? { ...pref, isEnabled } : pref
    );
    updatePreferences(newPrefs);
  }, [preferences]);
  
  // Callback to update multiple sources at once
  const setAllPreferences = useCallback((isEnabled: boolean) => {
    const newPrefs = preferences.map(pref => ({ ...pref, isEnabled }));
    updatePreferences(newPrefs);
  }, [preferences]);

  // Callback to add a new custom source
  const addCustomSource = useCallback((name: string, url: string) => {
    // Basic validation
    if (!name.trim() || !url.trim() || preferences.some(p => p.url === url)) {
      console.warn("Invalid or duplicate custom source provided.");
      return;
    }
    const newSource: SourcePreference = {
      name,
      url,
      category: 'custom',
      fetchOgData: false,
      isCustom: true,
      isEnabled: true,
    };
    const newPrefs = [...preferences, newSource];
    updatePreferences(newPrefs);
  }, [preferences]);

  // Callback to remove a custom source
  const removeCustomSource = useCallback((url: string) => {
    const newPrefs = preferences.filter(p => p.url !== url || !p.isCustom);
    updatePreferences(newPrefs);
  }, [preferences]);

  return { preferences, updatePreference, setAllPreferences, addCustomSource, removeCustomSource };
}; 