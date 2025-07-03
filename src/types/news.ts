/**
 * Represents the basic structure of a news article.
 * This is the common interface that both pre-scraped articles and
 * live-fetched RSS feed items should conform to for display.
 */
export interface BaseNewsItem {
  id: string;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  publishedAt?: string | Date;
  source?: string;
  
  // Fields from the static scrape
  category?: string;
  scrapedAt?: string | Date;
  trending?: boolean;
  viewCount?: number;
  discussionCount?: number;
} 