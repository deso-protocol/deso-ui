import { configure } from 'deso-protocol';

// DeSo Configuration
export const DESO_CONFIG = {
  // Use production node for GraphQL and API calls
  nodeURL: 'https://node.deso.org',
  // GraphQL endpoint for data fetching
  graphqlURL: 'https://graphql-prod.deso.com/graphql',
  // Identity service for authentication
  identityURL: 'https://identity.deso.org',
  // App name for identity service
  appName: 'DeSo UI Library',
} as const;

// Define UNLIMITED constant to match DeSo types
const UNLIMITED = 'UNLIMITED' as const;

// Get transaction spending limits with proper access group configuration
const getTransactionSpendingLimits = (publicKey: string = '') => {
  return {
    GlobalDESOLimit: 5 * 1e9, // 5 DeSo in nanos
    TransactionCountLimitMap: {
      // Core messaging permissions
      NEW_MESSAGE: UNLIMITED,
      
      // Access group management for messaging
      ACCESS_GROUP: UNLIMITED,
      ACCESS_GROUP_MEMBERS: UNLIMITED,
      
      // Derived key authorization
      AUTHORIZE_DERIVED_KEY: 1,
      
      // Basic social interactions
      BASIC_TRANSFER: UNLIMITED,
      SUBMIT_POST: UNLIMITED,
      FOLLOW: UNLIMITED,
      LIKE: UNLIMITED,
      
      // Creator coin interactions
      CREATOR_COIN: UNLIMITED,
      CREATOR_COIN_TRANSFER: UNLIMITED,
      
      // NFT interactions
      CREATE_NFT: UNLIMITED,
      UPDATE_NFT: UNLIMITED,
      NFT_BID: UNLIMITED,
      ACCEPT_NFT_BID: UNLIMITED,
    },
    // Access group limits for messaging
    AccessGroupLimitMap: [
      {
        AccessGroupOwnerPublicKeyBase58Check: publicKey,
        ScopeType: 'Any' as const,
        AccessGroupKeyName: '',
        OperationType: 'Any' as const,
        OpCount: UNLIMITED,
      },
    ],
    AccessGroupMemberLimitMap: [
      {
        AccessGroupOwnerPublicKeyBase58Check: publicKey,
        ScopeType: 'Any' as const,
        AccessGroupKeyName: '',
        OperationType: 'Any' as const,
        OpCount: UNLIMITED,
      },
    ],
  };
};

// Configure DeSo protocol
export const initializeDeSoConfig = () => {
  configure({
    spendingLimitOptions: getTransactionSpendingLimits(''),
    nodeURI: DESO_CONFIG.nodeURL,
    identityURI: DESO_CONFIG.identityURL,
    appName: DESO_CONFIG.appName,
    network: 'mainnet',
    jwtAlgorithm: 'ES256',
    showSkip: true,
  });
};

// Export the spending limits function for use in components
export { getTransactionSpendingLimits };

// Initialize config on module load
initializeDeSoConfig();

// Export types for use throughout the app
export type DesoConfig = typeof DESO_CONFIG; 