import { NextRequest, NextResponse } from 'next/server';
import { GET as getNews } from '../route';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    
    // Create a new URL with the category parameter
    const url = new URL(request.url);
    url.searchParams.set('category', category);
    
    // Create a new request with the modified URL
    const modifiedRequest = new NextRequest(url, {
      method: request.method,
      headers: request.headers,
    });

    // Call the main news route with the category parameter
    return getNews(modifiedRequest);

  } catch (error) {
    console.error('Error fetching category news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category news' },
      { status: 500 }
    );
  }
} 