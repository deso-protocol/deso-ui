import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  category: string;
  source: string;
  publishedAt: string;
  scrapedAt: string;
  trending: boolean;
  viewCount: number;
  discussionCount: number;
}

export interface NewsApiResponse {
  items: NewsItem[];
  totalCount: number;
  categories: Record<string, number>;
  lastUpdated: string;
  nextUpdate: string;
}

// Mock data for development
const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Breaking: Major Tech Company Announces Revolutionary AI Platform',
    description: 'A leading technology company has unveiled a groundbreaking artificial intelligence platform that promises to transform how we interact with digital systems.',
    url: 'https://example.com/tech-news-1',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    category: 'tech',
    source: 'TechNews',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    scrapedAt: new Date().toISOString(),
    trending: true,
    viewCount: 1234,
    discussionCount: 23,
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    description: 'World leaders have reached a unprecedented consensus on climate action, with new commitments to reduce carbon emissions by 50% within the next decade.',
    url: 'https://example.com/world-news-1',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    category: 'world',
    source: 'WorldNews',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    scrapedAt: new Date().toISOString(),
    trending: true,
    viewCount: 2156,
    discussionCount: 45,
  },
  {
    id: '3',
    title: 'Sports: Championship Final Set for This Weekend',
    description: 'After an intense playoff season, the championship final is scheduled for this weekend with record-breaking ticket sales and viewership expected.',
    url: 'https://example.com/sports-news-1',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    category: 'sports',
    source: 'SportsTimes',
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    scrapedAt: new Date().toISOString(),
    trending: false,
    viewCount: 987,
    discussionCount: 12,
  },
  {
    id: '4',
    title: 'Economic Markets Show Strong Recovery Signals',
    description: 'Financial analysts report positive indicators across major market indices, suggesting a robust economic recovery is underway.',
    url: 'https://example.com/business-news-1',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    category: 'business',
    source: 'BusinessDaily',
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    scrapedAt: new Date().toISOString(),
    trending: false,
    viewCount: 743,
    discussionCount: 8,
  },
  {
    id: '5',
    title: 'Local Community Celebrates New Public Library Opening',
    description: 'The much-anticipated new public library opened its doors to the community today, featuring state-of-the-art facilities and extensive digital resources.',
    url: 'https://example.com/local-news-1',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    category: 'local',
    source: 'LocalNews',
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    scrapedAt: new Date().toISOString(),
    trending: false,
    viewCount: 234,
    discussionCount: 3,
  },
];

async function loadNewsData(): Promise<NewsItem[]> {
  try {
    // Try to load from scraped data first
    const dataPath = path.join(process.cwd(), 'data', 'all_news.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Fallback to mock data if scraped data is not available
    console.log('Using mock data for development');
    return mockNewsItems;
  }
}

async function loadMetadata() {
  try {
    const metadataPath = path.join(process.cwd(), 'data', 'metadata.json');
    const data = await fs.readFile(metadataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Fallback metadata
    return {
      lastUpdated: new Date().toISOString(),
      totalItems: mockNewsItems.length,
      categories: {
        tech: 1,
        world: 1,
        sports: 1,
        business: 1,
        local: 1,
      },
      nextUpdate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const trending = searchParams.get('trending') === 'true';

    // Load news data
    const allNews = await loadNewsData();
    const metadata = await loadMetadata();

    // Filter by category if specified
    let filteredNews = allNews;
    if (category && category !== 'all') {
      filteredNews = allNews.filter(item => item.category === category);
    }

    // Filter by trending if specified
    if (trending) {
      filteredNews = filteredNews.filter(item => item.trending);
    }

    // Sort by published date (most recent first)
    filteredNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Apply limit
    const limitedNews = filteredNews.slice(0, limit);

    // Calculate category counts
    const categories: Record<string, number> = {};
    allNews.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });

    const response: NewsApiResponse = {
      items: limitedNews,
      totalCount: filteredNews.length,
      categories,
      lastUpdated: metadata.lastUpdated,
      nextUpdate: metadata.nextUpdate,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Trigger refresh of news data
    // In a real implementation, this would trigger the Python scraper
    // For now, we'll just return a success response
    
    return NextResponse.json({ 
      message: 'News refresh triggered',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error triggering news refresh:', error);
    return NextResponse.json(
      { error: 'Failed to trigger news refresh' },
      { status: 500 }
    );
  }
} 