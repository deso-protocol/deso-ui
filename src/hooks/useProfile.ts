import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql/client';
import { GET_PROFILE_DATA, GET_USERNAME_INFO } from '@/lib/graphql/queries';
import { useMemo } from 'react';

const useParsedProfileQuery = (publicKey: string, query: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile', publicKey, query],
    queryFn: async () => {
      const { data } = await apolloClient.query({
        query,
        variables: { publicKey },
      });
      return data;
    },
    enabled: !!publicKey,
  });

  const parsedData = useMemo(() => {
    const extraData = data?.accountByPublicKey?.extraData;

    if (!extraData) {
      return data;
    }

    let parsedExtraData;
    if (typeof extraData === 'string') {
      try {
        parsedExtraData = JSON.parse(extraData);
      } catch (e) {
        console.error('Failed to parse profile extraData JSON string:', e);
        return data;
      }
    } else {
      parsedExtraData = extraData;
    }

    return {
      ...data,
      accountByPublicKey: {
        ...data.accountByPublicKey,
        extraData: parsedExtraData,
      },
    };
  }, [data]);

  return { data: parsedData, loading: isLoading, error };
};

export const useProfile = (publicKey: string) => {
  const { data, loading, error } = useParsedProfileQuery(
    publicKey,
    GET_PROFILE_DATA
  );
  const profile = data?.accountByPublicKey;
  const isVerified = profile?.extraData?.IsVerified === 'true';

  return { profile: { ...profile, isVerified }, loading, error };
};

export const useUsername = (publicKey: string) => {
  return useParsedProfileQuery(publicKey, GET_USERNAME_INFO);
}; 