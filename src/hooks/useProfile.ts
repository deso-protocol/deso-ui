import { useQuery } from '@apollo/client';
import { useEffect, useState, useMemo } from 'react';
import { GET_PROFILE_DATA, GET_PROFILE_PICTURE, GET_USERNAME_INFO } from '@/lib/graphql/queries';
import { gql } from '@apollo/client';

// Hook to detect if we're on the client side
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

/**
 * A centralized hook to handle the common logic of fetching a DeSo profile
 * and parsing its extraData field.
 * @param query The GraphQL query to execute.
 * @param publicKey The public key of the user to fetch.
 * @returns The result of the useQuery hook with extraData parsed.
 */
export function useParsedProfileQuery(query: any, publicKey: string) {
  const isClient = useIsClient();
  const { data, loading, error } = useQuery(query, {
    variables: { publicKey },
    skip: !publicKey || !isClient,
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  // Use useMemo to parse extraData only when data changes.
  const parsedData = useMemo(() => {
    const extraData = data?.accountByPublicKey?.extraData;

    // Debug: log the type and value of extraData before parsing
    console.log('[useParsedProfileQuery] typeof extraData:', typeof extraData, extraData);

    if (!extraData) {
      return data;
    }

    // The real API returns extraData as a JSON string, but our mocks may
    // provide it as an object. This logic handles both cases.
    let parsedExtraData;
    if (typeof extraData === 'string') {
      try {
        parsedExtraData = JSON.parse(extraData);
      } catch (e) {
        console.error("Failed to parse profile extraData JSON string:", e);
        // If parsing fails, return the original data to avoid crashing.
        return data;
      }
    } else {
      // If it's not a string, assume it's already a valid object (from MSW).
      parsedExtraData = extraData;
    }

    // Debug: log the parsed extraData
    console.log('[useParsedProfileQuery] parsedExtraData:', parsedExtraData);

    return {
      ...data,
      accountByPublicKey: {
        ...data.accountByPublicKey,
        extraData: parsedExtraData,
      },
    };
  }, [data]);

  return { data: parsedData, loading, error };
}

// Updated query that matches the actual DeSo GraphQL schema
const GET_PROFILE = gql`
  query GetProfile($publicKey: String!) {
    accountByPublicKey(publicKey: $publicKey) {
      username
      profilePic
      extraData {
        DisplayName
        IsVerified
        NFTProfilePictureUrl
        FeaturedImageURL
      }
    }
  }
`;

// Hook for fetching complete profile data
export function useProfile(publicKey: string) {
  const { data, loading, error } = useParsedProfileQuery(GET_PROFILE_DATA, publicKey);
  return { profile: data?.accountByPublicKey, loading, error };
}

// Hook for fetching just profile picture data
export function useProfilePicture(publicKey: string) {
  return useParsedProfileQuery(GET_PROFILE_PICTURE, publicKey);
}

// Hook for fetching just username data
export function useUsername(publicKey: string) {
  return useParsedProfileQuery(GET_USERNAME_INFO, publicKey);
} 