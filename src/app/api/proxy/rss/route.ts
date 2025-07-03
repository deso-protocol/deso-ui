import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

// Caching configuration
const CACHE_CONTROL_HEADER = 's-maxage=600, stale-while-revalidate=30'; // 10 minute cache

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get('url');

  if (!feedUrl) {
    return NextResponse.json(
      { error: 'URL query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    
    // Sanitize and format the feed items
    const items = feed.items.map(item => ({
      id: item.guid || item.link,
      title: item.title,
      description: item.contentSnippet || item.content,
      url: item.link,
      imageUrl: item.enclosure?.url,
      publishedAt: item.isoDate,
      source: feed.title || 'Custom Feed', // Use feed title as source name
    }));

    return NextResponse.json(
      { items },
      { headers: { 'Cache-Control': CACHE_CONTROL_HEADER } }
    );
  } catch (error) {
    console.error(`Failed to fetch or parse RSS feed: ${feedUrl}`, error);
    
    // Determine the error type and return an appropriate response
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    let status = 500;

    if (errorMessage.includes('404')) {
      status = 404;
    } else if (errorMessage.includes('Invalid')) {
      status = 400;
    }

    return NextResponse.json(
      { error: `Failed to fetch or parse RSS feed: ${errorMessage}` },
      { status }
    );
  }
} 