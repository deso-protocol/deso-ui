import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql/client';
import { SEARCH_USERS } from '@/lib/graphql/queries';
import { Profile } from '@/lib/schemas/deso';
import { useMemo } from 'react';

// A type for the raw profile data from the GraphQL query
type RawProfile = Omit<Profile, 'isVerified'>;

export const useSearchUsers = (searchTerm: string) => {
  const filter = useMemo(() => {
    if (!searchTerm) {
      return {};
    }

    const isPublicKey = searchTerm.startsWith('BC');

    return {
      or: [
        {
          username: {
            startsWithInsensitive: searchTerm,
          },
        },
        ...(isPublicKey
          ? [
              {
                publicKey: {
                  equalTo: searchTerm,
                },
              },
            ]
          : []),
      ],
    };
  }, [searchTerm]);

  const { data, isLoading, error } = useQuery<Profile[]>({
    queryKey: ['searchUsers', searchTerm],
    queryFn: async () => {
      if (!searchTerm) {
        return [];
      }
      const { data } = await apolloClient.query({
        query: SEARCH_USERS,
        variables: { filter },
      });

      // Process the raw data to add the isVerified flag
      return data.profiles.nodes.map((profile: RawProfile) => ({
        ...profile,
        isVerified: profile.extraData?.IsVerified === 'true',
      }));
    },
    enabled: !!searchTerm && searchTerm.length >= 3,
  });

  return {
    users: data || [],
    isLoading,
    error,
  };
}; 