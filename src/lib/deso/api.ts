import { apolloClient } from '@/lib/graphql/client';
import { GET_USER_PROFILES_BY_PUBLIC_KEYS } from '@/lib/graphql/queries';
import { Profile } from '@/lib/schemas/deso';

/**
 * Fetches multiple user profiles by their public keys using GraphQL.
 *
 * @param {string[]} publicKeys - An array of public keys to fetch profiles for.
 * @returns {Promise<Record<string, Profile>>} A promise that resolves to a map of public keys to profile objects.
 */
export async function getUserProfilesByPublicKeys(publicKeys: string[]): Promise<Record<string, Profile>> {
  if (!publicKeys || publicKeys.length === 0) {
    return {};
  }

  try {
    const { data } = await apolloClient.query({
      query: GET_USER_PROFILES_BY_PUBLIC_KEYS,
      variables: { publicKeys },
    });

    if (!data || !data.accounts || !data.accounts.nodes) {
      return {};
    }

    const profilesMap: Record<string, Profile> = {};
    
    for (const account of data.accounts.nodes) {
      if (account && account.publicKey) {
        profilesMap[account.publicKey] = {
          publicKey: account.publicKey,
          username: account.username,
          profilePic: account.profilePic,
          description: account.description,
          isVerified: account.isVerified,
          coinPriceDesoNanos: account.coinPriceDesoNanos,
          extraData: account.extraData,
        };
      }
    }

    return profilesMap;
  } catch (error) {
    console.error('Failed to fetch user profiles by public keys:', error);
    return {};
  }
} 