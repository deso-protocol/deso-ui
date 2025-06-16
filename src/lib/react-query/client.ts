import { QueryClient } from '@tanstack/react-query';

// Create React Query client with optimized settings for DeSo data
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus for real-time data
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect by default (can be overridden per query)
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Profile-related queries
  profile: {
    all: ['profile'] as const,
    byPublicKey: (publicKey: string) => [...queryKeys.profile.all, publicKey] as const,
    picture: (publicKey: string) => [...queryKeys.profile.byPublicKey(publicKey), 'picture'] as const,
    username: (publicKey: string) => [...queryKeys.profile.byPublicKey(publicKey), 'username'] as const,
    stats: (publicKey: string) => [...queryKeys.profile.byPublicKey(publicKey), 'stats'] as const,
  },
  // Post-related queries
  posts: {
    all: ['posts'] as const,
    feed: (filters?: Record<string, any>) => [...queryKeys.posts.all, 'feed', filters] as const,
    byUser: (publicKey: string) => [...queryKeys.posts.all, 'user', publicKey] as const,
    byHash: (postHash: string) => [...queryKeys.posts.all, 'hash', postHash] as const,
  },
  // Social interaction queries
  social: {
    all: ['social'] as const,
    followers: (publicKey: string) => [...queryKeys.social.all, 'followers', publicKey] as const,
    following: (publicKey: string) => [...queryKeys.social.all, 'following', publicKey] as const,
    likes: (postHash: string) => [...queryKeys.social.all, 'likes', postHash] as const,
    diamonds: (postHash: string) => [...queryKeys.social.all, 'diamonds', postHash] as const,
  },
} as const;

export default queryClient; 