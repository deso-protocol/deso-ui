import { useQuery } from '@tanstack/react-query';

export interface ExchangeRateResponse {
  USDCentsPerDeSoExchangeRate: number;
  [key: string]: any;
}

export interface UseExchangeRateResult {
  exchangeRate: number | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch DeSo exchange rate from our API proxy.
 * Caches the result for 5 minutes.
 * @returns Exchange rate data, loading, and error states
 */
export function useExchangeRate(): UseExchangeRateResult {
  const { data, isLoading, error } = useQuery<ExchangeRateResponse, Error>({
    queryKey: ['exchangeRate'],
    queryFn: async () => {
      const response = await fetch('/api/exchange-rate');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch exchange rate');
      }
      return response.json();
    },
    // staleTime is 5 minutes, which is the same as the cache time on the serverless function
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });

  return {
    exchangeRate: data?.USDCentsPerDeSoExchangeRate || null,
    loading: isLoading,
    error: error || null,
  };
} 