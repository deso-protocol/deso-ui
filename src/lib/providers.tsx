'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { queryClient } from './react-query/client';
import { apolloClient } from './graphql/client';
import { IdentityProvider } from '@/contexts/identity-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <IdentityProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="deso-ui-theme"
      >
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            {children}
          </ApolloProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </IdentityProvider>
  );
} 