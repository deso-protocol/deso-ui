'use client';

import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ACCOUNT_BY_USERNAME } from '@/lib/graphql/queries';

// Hook to detect if we're on the client side
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

export function useResolveUsername(username: string) {
  const isClient = useIsClient();
  
  return useQuery(GET_ACCOUNT_BY_USERNAME, {
    variables: { username },
    skip: !username || username.startsWith('BC1') || !isClient, // Skip if it's already a public key or not on client
    errorPolicy: 'all',
  });
}

// Helper function to check if a string is a public key
export function isPublicKey(input: string): boolean {
  return input.startsWith('BC1YL') && input.length > 50;
}

// Helper function to resolve user input to public key
export const resolveUserInput = async (input: string): Promise<string | null> => {
  if (isPublicKey(input)) {
    return input;
  }
  
  // This would be used in a component with the hook
  // For now, return null to indicate it needs to be resolved via the hook
  return null;
}; 