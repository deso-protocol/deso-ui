import { useQuery } from '@apollo/client';
import { GET_USER_BALANCE, GetUserBalanceVariables, GetUserBalanceResponse } from '@/lib/graphql/queries';

export interface UseUserBalanceResult {
  balance: string | null; // Balance in nanos (string format from API)
  balanceNanos: string | null; // Alias for balance
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch user's DeSo balance
 * @param publicKey - User's public key
 * @returns Balance data with loading and error states
 */
export function useUserBalance(publicKey?: string): UseUserBalanceResult {
  const { data, loading, error, refetch } = useQuery<GetUserBalanceResponse, GetUserBalanceVariables>(
    GET_USER_BALANCE,
    {
      variables: { publicKey: publicKey || '' },
      skip: !publicKey,
      pollInterval: 30000, // Refresh balance every 30 seconds
      errorPolicy: 'all',
    }
  );

  const balance = data?.accounts?.nodes?.[0]?.desoBalance?.balanceNanos || null;

  return {
    balance,
    balanceNanos: balance, // Alias for convenience
    loading,
    error: error || null,
    refetch,
  };
} 