import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql/client';
import { GET_USER_PROFILE_BY_PUBLIC_KEY } from '@/lib/graphql/queries';
import { useMemo } from 'react';
import { Profile } from '@/lib/schemas/deso';

// Hook for fetching profile by public key
export const useProfile = (publicKey: string) => {
  const { data, isLoading, error } = useQuery<{ accounts: { nodes: any[] } } | null, Error>({
    queryKey: ['profile', publicKey],
    queryFn: async () => {
      if (!publicKey) return null;
      try {
        const { data } = await apolloClient.query({
          query: GET_USER_PROFILE_BY_PUBLIC_KEY,
          variables: { publicKey },
        });
        return data;
      } catch (error) {
        console.warn('Profile query failed:', error);
        return null;
      }
    },
    enabled: !!publicKey,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const profile: Profile | null = useMemo(() => {
    if (!data || !data.accounts || !data.accounts.nodes || data.accounts.nodes.length === 0) {
      return null;
    }
    
    const account = data.accounts.nodes[0];
    
    return {
      publicKey: account.publicKey,
      username: account.username,
      profilePic: account.profilePic,
      description: account.description,
      isVerified: account.isVerified,
      coinPriceDesoNanos: account.coinPriceDesoNanos,
      extraData: account.extraData,
    };
  }, [data]);

  return { profile, loading: isLoading, error };
}; 