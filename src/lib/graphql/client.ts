import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { DESO_CONFIG } from '../deso/config';

// Create HTTP link to DeSo GraphQL endpoint
const httpLink = createHttpLink({
  uri: DESO_CONFIG.graphqlURL,
  // Add any necessary headers
  headers: {
    'Content-Type': 'application/json',
  },
  // Handle CORS
  fetchOptions: {
    mode: 'cors',
  },
});

// Configure Apollo Client with caching
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    // Configure cache policies for DeSo entities
    typePolicies: {
      Account: {
        keyFields: ['publicKey'],
      },
      Post: {
        keyFields: ['postHash'],
      },
      Profile: {
        keyFields: ['publicKey'],
      },
      // Add pagination for feeds
      Query: {
        fields: {
          posts: {
            keyArgs: false,
            merge(existing = { edges: [] }, incoming) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            },
          },
        },
      },
    },
  }),
  // Disable SSR to prevent build-time queries
  ssrMode: false,
  // Enable dev tools in development
  connectToDevTools: process.env.NODE_ENV === 'development',
  // Default options for queries
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});

// Add global error logging
if (typeof window !== 'undefined') {
  apolloClient.onResetStore(() => {
    console.log('Apollo Client store reset');
    return Promise.resolve();
  });
}

export default apolloClient; 