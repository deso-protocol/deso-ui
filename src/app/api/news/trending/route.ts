import { NextRequest, NextResponse } from 'next/server';
import { GET as getNews } from '../route';

export async function GET(request: NextRequest) {
  try {
    // Create a new URL with the trending parameter
    const url = new URL(request.url);
    url.searchParams.set('trending', 'true');
    
    // Create a new request with the modified URL
    const modifiedRequest = new NextRequest(url, {
      method: request.method,
      headers: request.headers,
    });

    // Call the main news route with the trending parameter
    return getNews(modifiedRequest);

  } catch (error) {
    console.error('Error fetching trending news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending news' },
      { status: 500 }
    );
  }
} 