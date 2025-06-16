'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { queryClient } from './react-query/client';
import { apolloClient } from './graphql/client';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          {children}
          {/* Show React Query devtools in development */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ApolloProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
} 