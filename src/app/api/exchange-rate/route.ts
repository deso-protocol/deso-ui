import { NextResponse } from 'next/server';
import { DESO_CONFIG } from '@/lib/constants';

// DeSo Node API endpoint for exchange rate
const EXCHANGE_RATE_URL = `${DESO_CONFIG.api.nodeUrl}/api/v0/get-exchange-rate`;

/**
 * API route to proxy requests to the DeSo exchange rate API.
 * This avoids CORS issues when fetching the rate from the client-side.
 * The response is cached for 5 minutes.
 */
export async function GET() {
  try {
    const response = await fetch(EXCHANGE_RATE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate every 5 minutes (300 seconds)
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch exchange rate from DeSo node: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Exchange rate proxy error:', error);
    return NextResponse.json(
      { message: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 