import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../src/lib/graphql/client'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/app/globals.css'
import { withThemeByClassName } from '@storybook/addon-themes';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  parameters: {
    docs: {
      toc: true,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
  },
  loaders: [mswLoader], // Add MSW loader globally
  decorators: [
    (Story) => (
        <ApolloProvider client={apolloClient}>
          <div className="p-4">
            <Story />
          </div>
        </ApolloProvider>
    ),
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html'
    }),
  ],
};

export default preview;