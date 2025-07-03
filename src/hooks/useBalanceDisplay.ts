import { useUserBalance } from './useUserBalance';
import { useExchangeRate } from './useExchangeRate';
import { formatBalanceDisplay } from '@/lib/utils/deso';

export interface UseBalanceDisplayResult {
  desoFormatted: string | null;
  usdFormatted: string | null;
  desoAmount: number | null;
  usdAmount: number | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Composite hook to display user balance in both DeSo and USD.
 * @param publicKey - User's public key
 * @returns Formatted balance strings, loading, and error states
 */
export function useBalanceDisplay(publicKey?: string): UseBalanceDisplayResult {
  const { balanceNanos, loading: balanceLoading, error: balanceError } = useUserBalance(publicKey);
  const { exchangeRate, loading: rateLoading, error: rateError } = useExchangeRate();

  const loading = balanceLoading || rateLoading;
  const error = balanceError || rateError;

  if (loading || error || !balanceNanos) {
    return {
      desoFormatted: null,
      usdFormatted: null,
      desoAmount: null,
      usdAmount: null,
      loading,
      error,
    };
  }

  const { deso, usd, desoAmount, usdAmount } = formatBalanceDisplay(balanceNanos, exchangeRate ?? undefined);

  return {
    desoFormatted: deso,
    usdFormatted: usd,
    desoAmount,
    usdAmount,
    loading: false,
    error: null,
  };
} 