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
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: false,
      codePanel: true,
      interactions: { disable: true }
    },
    actions: { disable: true },
    interactions: { disable: true }
  },
  loaders: [mswLoader], 
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