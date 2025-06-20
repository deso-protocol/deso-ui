import type { Preview } from '@storybook/nextjs-vite'
import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../src/lib/graphql/client'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/app/globals.css'
import { ThemeProvider, useTheme } from 'next-themes'
import { withThemeByClassName } from '@storybook/addon-themes'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

const ThemeUpdater = ({ theme }: { theme: string | undefined }) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    if (theme) {
      setTheme(theme)
    }
  }, [theme, setTheme])

  return null
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: false,
      codePanel: true,
      interactions: { disable: true }
    },
    actions: { disable: true },
    interactions: { disable: true },
    options: {
      storySort: {
        order: ['Examples', 'DeSo'],
      },
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: '', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#000000' },
      ],
    },
  },
  loaders: [mswLoader], 
  decorators: [
    (Story, context) => (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeUpdater theme={context.globals.theme} />
          <div className="p-4">
            <Story />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    ),
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'body',
    }),
  ],
}

export default preview