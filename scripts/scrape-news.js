import RSSParser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import * as cheerio from 'cheerio';

// Create RSS parser instance
const parser = new RSSParser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['content:encoded', 'contentEncoded'],
    ]
  }
});

// List of all news sources, designed for scalability
// Each source has a name, category, URL, and a flag for whether we should fetch og:data
const NEWS_SOURCES = [
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

// Helper function to generate UUID (simple version)
function generateId() {
  return Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
}

// Helper function to extract Open Graph metadata from HTML content
async function extractOgData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract og:image
    let ogImage = $('meta[property="og:image"]').attr('content');
    if (!ogImage) {
      // Try twitter:image as fallback
      ogImage = $('meta[name="twitter:image"]').attr('content');
    }
    if (!ogImage) {
      // Try twitter:image:src as fallback
      ogImage = $('meta[name="twitter:image:src"]').attr('content');
    }
    
    // Extract og:description
    let ogDescription = $('meta[property="og:description"]').attr('content');
    if (!ogDescription) {
      // Try twitter:description as fallback
      ogDescription = $('meta[name="twitter:description"]').attr('content');
    }
    if (!ogDescription) {
      // Try meta description as fallback
      ogDescription = $('meta[name="description"]').attr('content');
    }
    
    // Extract og:title for better titles
    let ogTitle = $('meta[property="og:title"]').attr('content');
    if (!ogTitle) {
      // Try twitter:title as fallback
      ogTitle = $('meta[name="twitter:title"]').attr('content');
    }
    
    return {
      image: ogImage,
      description: ogDescription,
      title: ogTitle
    };
  } catch (error) {
    console.log(`Failed to extract og:data from ${url}:`, error.message);
    return { image: null, description: null, title: null };
  }
}

// Helper function to extract Open Graph data and return enhanced item data
async function extractEnhancedData(item, sourceName, category, fetchOgData) {
  let ogData = { image: null, description: null, title: null };
  
  // For sources flagged to fetch og:data, try to extract it from the article
  if (fetchOgData && item.link) {
    ogData = await extractOgData(item.link);
  }
  
  // Determine best image URL
  let imageUrl = null;
  if (ogData.image) {
    // Ensure we get high quality images (example for CNN, can be adapted for others)
    if (sourceName === 'CNN' && ogData.image.includes('media.cnn.com')) {
      imageUrl = ogData.image.replace(/\?.*$/, '?c=16x9&q=w_800,c_fill');
    } else {
      imageUrl = ogData.image;
    }
  }
  
  // Fallback to RSS image sources if no og:image
  if (!imageUrl) {
    imageUrl = await getImageFromRss(item, category);
  }
  
  // Determine best description
  let description = '';
  if (ogData.description && ogData.description.trim()) {
    description = ogData.description.trim();
  } else {
    description = cleanDescription(item.summary || item.content || item.contentSnippet || '');
  }
  
  // Determine best title
  let title = '';
  if (ogData.title && ogData.title.trim()) {
    title = ogData.title.trim();
    // Remove site name suffixes like " | CNN Politics" or " - BBC News"
    const siteNamePattern = new RegExp(`\\s+\\|\\s+${sourceName}.*$|\\s+-\\s+${sourceName}.*$`, 'i');
    title = title.replace(siteNamePattern, '');
  } else {
    title = item.title || '';
  }
  
  return {
    imageUrl,
    description,
    title: title.substring(0, 200) // Ensure title length limit
  };
}

// Helper function to extract image from RSS feed data
async function getImageFromRss(item, category) {
  // Try media:content first
  if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
    return item.mediaContent.$.url;
  }
  
  // Try media:thumbnail
  if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
    return item.mediaThumbnail.$.url;
  }
  
  // Try enclosure
  if (item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.url;
  }
  
  // Try to extract from content
  if (item.content || item.contentEncoded) {
    const content = item.content || item.contentEncoded;
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) {
      return imgMatch[1];
    }
  }
  
  // Better fallback images by category
  const categoryImages = {
    tech: 'https://picsum.photos/600/400?random=tech',
    sports: 'https://picsum.photos/600/400?random=sports', 
    business: 'https://picsum.photos/600/400?random=business',
    world: 'https://picsum.photos/600/400?random=world',
    general: 'https://picsum.photos/600/400?random=news'
  };
  
  return categoryImages[category] || `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
}

// Helper function to clean HTML from description
function cleanDescription(description) {
  if (!description) return '';
  
  // Remove HTML tags
  let cleaned = description.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Truncate if too long
  if (cleaned.length > 500) {
    cleaned = cleaned.substring(0, 497) + '...';
  }
  
  return cleaned.trim();
}

// Helper function to calculate string similarity
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

// Simple Levenshtein distance implementation
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Function to deduplicate news items
function deduplicateNewsItems(items) {
  const seenUrls = new Set();
  const seenTitles = new Map(); // title -> item
  const deduplicatedItems = [];
  
  // Define category priority (more specific categories win)
  const categoryPriority = {
    'tech': 5,
    'business': 4,
    'sports': 4,
    'world': 3,
    'local': 2,
    'general': 1
  };
  
  for (const item of items) {
    // Check for exact URL duplicates
    if (seenUrls.has(item.url)) {
      console.log(`🔄 Skipping duplicate URL: ${item.title.substring(0, 50)}...`);
      continue;
    }
    
    // Check for similar titles (85% similarity threshold)
    let isDuplicate = false;
    const normalizedTitle = item.title.toLowerCase().trim();
    
    for (const [existingTitle, existingItem] of seenTitles) {
      const similarity = calculateSimilarity(normalizedTitle, existingTitle);
      
      if (similarity > 0.85) {
        // Found a potential duplicate based on title similarity
        const existingPriority = categoryPriority[existingItem.category] || 0;
        const newPriority = categoryPriority[item.category] || 0;
        
        // Prefer item with higher category priority, or newer item if same priority
        if (newPriority > existingPriority || 
            (newPriority === existingPriority && new Date(item.publishedAt) > new Date(existingItem.publishedAt))) {
          
          // Replace the existing item with the new one
          const existingIndex = deduplicatedItems.findIndex(i => i.id === existingItem.id);
          if (existingIndex !== -1) {
            deduplicatedItems[existingIndex] = item;
            seenTitles.set(normalizedTitle, item);
            seenUrls.delete(existingItem.url);
            seenUrls.add(item.url);
            console.log(`🔄 Replacing duplicate: "${existingItem.title.substring(0, 40)}..." (${existingItem.category}) with "${item.title.substring(0, 40)}..." (${item.category})`);
          }
        } else {
          console.log(`🔄 Skipping similar title: ${item.title.substring(0, 50)}... (${item.category}) - keeping existing ${existingItem.category} version`);
        }
        
        isDuplicate = true;
        break;
      }
    }
    
    if (!isDuplicate) {
      seenUrls.add(item.url);
      seenTitles.set(normalizedTitle, item);
      deduplicatedItems.push(item);
    }
  }
  
  console.log(`📊 Deduplication summary: ${items.length} → ${deduplicatedItems.length} items (removed ${items.length - deduplicatedItems.length} duplicates)`);
  return deduplicatedItems;
}

// Function to scrape a single RSS feed
async function scrapeFeed(url, category, sourceName, fetchOgData) {
  try {
    console.log(`Fetching ${sourceName} - ${category}: ${url}`);
    
    const feed = await parser.parseURL(url);
    const items = [];
    
    // Process up to 15 items from each feed
    const feedItems = feed.items.slice(0, 15);
    
    for (const item of feedItems) {
      try {
        const enhancedData = await extractEnhancedData(item, sourceName, category, fetchOgData);
        
        const newsItem = {
          id: generateId(),
          title: enhancedData.title || (item.title || '').substring(0, 200),
          description: enhancedData.description,
          url: item.link || '',
          imageUrl: enhancedData.imageUrl,
          category: category,
          source: sourceName,
          publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
          scrapedAt: new Date().toISOString(),
          trending: false,
          viewCount: Math.floor(Math.random() * 5000) + 100,
          discussionCount: 0,
        };
        
        // Skip items without title or URL
        if (newsItem.title && newsItem.url) {
          items.push(newsItem);
          const hasOgData = fetchOgData ? '[OG-DATA]' : '[RSS-ONLY]';
          console.log(`  ✓ ${newsItem.title.substring(0, 50)}... ${hasOgData} [${enhancedData.imageUrl ? 'IMG' : 'NO-IMG'}]`);
        }
        
        // Rate limiting for HTML fetching (be respectful to their servers)
        if (fetchOgData) {
          await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between requests
        }
      } catch (itemError) {
        console.error(`Error processing item from ${sourceName}:`, itemError.message);
      }
    }
    
    console.log(`✓ ${sourceName} - ${category}: ${items.length} items`);
    return items;
    
  } catch (error) {
    console.error(`Error scraping ${sourceName} - ${category}:`, error.message);
    return [];
  }
}

// Main scraping function
async function scrapeAllNews() {
  console.log('Starting news scraping...');
  
  const allNews = {};
  const startTime = Date.now();
  
  // Scrape all sources
  for (const source of NEWS_SOURCES) {
    try {
      const { url, category, name, fetchOgData } = source;
      const items = await scrapeFeed(url, category, name, fetchOgData);
      
      if (!allNews[category]) {
        allNews[category] = [];
      }
      
      allNews[category].push(...items);
      
      // Rate limiting - wait 1 second between different source requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error processing source:`, error.message);
    }
  }
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  // Save news by category
  let totalItems = 0;
  for (const [category, items] of Object.entries(allNews)) {
    const filePath = path.join(dataDir, `${category}.json`);
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
    console.log(`Saved ${items.length} items to ${category}.json`);
    totalItems += items.length;
  }
  
  // Deduplicate news items before saving
  const allItems = Object.values(allNews).flat();
  const deduplicatedItems = deduplicateNewsItems(allItems);
  
  const allNewsPath = path.join(dataDir, 'all_news.json');
  await fs.writeFile(allNewsPath, JSON.stringify(deduplicatedItems, null, 2));
  
  // Mark some items as trending (most recent ones from deduplicated set)
  const trendingItems = deduplicatedItems
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 20)
    .map(item => ({ ...item, trending: true }));
  
  // Update trending status in the deduplicated items
  deduplicatedItems.forEach(item => {
    item.trending = trendingItems.some(trending => trending.id === item.id);
  });
  
  // Recalculate category counts from deduplicated items
  const deduplicatedCategories = {};
  deduplicatedItems.forEach(item => {
    deduplicatedCategories[item.category] = (deduplicatedCategories[item.category] || 0) + 1;
  });
  
  // Save metadata
  const metadata = {
    lastUpdated: new Date().toISOString(),
    totalItems: deduplicatedItems.length,
    originalItems: allItems.length,
    duplicatesRemoved: allItems.length - deduplicatedItems.length,
    categories: deduplicatedCategories,
    nextUpdate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    sources: NEWS_SOURCES.map(source => source.name),
    scrapingDuration: `${((Date.now() - startTime) / 1000).toFixed(2)}s`
  };
  
  const metadataPath = path.join(dataDir, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  
  console.log(`\n✅ Scraping completed!`);
  console.log(`📊 Total articles: ${metadata.totalItems} (${metadata.duplicatesRemoved} duplicates removed)`);
  console.log(`⏱️  Duration: ${metadata.scrapingDuration}`);
  console.log(`📂 Data saved to: ${dataDir}`);
  console.log(`🔥 Trending items: ${trendingItems.length}`);
  
  return {
    totalItems: metadata.totalItems,
    originalItems: metadata.originalItems,
    duplicatesRemoved: metadata.duplicatesRemoved,
    categories: metadata.categories,
    duration: metadata.scrapingDuration
  };
}

// Run the scraper if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeAllNews()
    .then((result) => {
      console.log('\nScraping summary:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}

export { scrapeAllNews }; 