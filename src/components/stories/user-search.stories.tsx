import type { Meta, StoryObj } from '@storybook/react';
import { UserSearch } from '../deso/user-search';
import { Providers } from '../../lib/providers';
import { SEARCH_USERS } from '../../lib/graphql/queries';
import { dedent } from 'ts-dedent';
import {
  errorHandlers,
  loadingHandlers,
  successHandlers,
} from '../../lib/mocks/msw-handlers';
import { graphql, HttpResponse } from 'msw';

const meta: Meta<typeof UserSearch> = {
  title: 'DeSo/UserSearch',
  component: UserSearch,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  parameters: {
    docs: {
      description: {
        component: dedent`
          ### Implementation Details

          This component provides a debounced user search input that queries the DeSo GraphQL API.

          **1. Data Fetching:**
          It uses a custom hook, \`useSearchUsers\`, which leverages TanStack Query (\`useQuery\`) for data fetching and caching. The search term is debounced using the \`useDebounce\` hook to avoid excessive API calls.

          **2. GraphQL Query:**
          The following GraphQL query is used to search for users by username or public key. It fetches essential profile information, including \`extraData\` to determine if a user is verified.

          \`\`\`graphql
          ${SEARCH_USERS.loc?.source.body}
          \`\`\`

          **3. Usage in an Application:**
          To use this component, you need to ensure your application is wrapped in the \`Providers\` component, which sets up the necessary \`ApolloProvider\` for GraphQL and \`QueryClientProvider\` for TanStack Query.

          Once the providers are in place, you can use the \`UserSearch\` component directly.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserSearch>;

export const Default: Story = {
  name: 'Live Data',
  render: () => (
    <div className="w-96">
      <UserSearch />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story uses live data from the DeSo API. No MSW handlers are used.',
      },
    },
  },
};

export const MockedSuccess: Story = {
  name: 'Mocked Success',
  render: () => (
    <div className="w-96">
      <UserSearch />
    </div>
  ),
  parameters: {
    msw: {
      handlers: [
        ...successHandlers,
        graphql.query('SearchUsers', () => {
          return HttpResponse.json({
            data: {
              profiles: {
                nodes: [
                  {
                    publicKey: 'BC1YLgCeeN7nEfhE2N9SW9zgmS4uB4M4fA4yq2i7bYmFw2aKDYGAi1Z',
                    username: 'nader',
                    profilePic: '',
                    extraData: { IsVerified: 'true' },
                  },
                ],
              },
            },
          });
        }),
      ],
    },
    docs: {
      description: {
        story:
          'This story uses mocked data to show a successful search result.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  render: () => (
    <div className="w-96">
      <UserSearch />
    </div>
  ),
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
    docs: {
      description: {
        story:
          'This story simulates a loading state by using handlers that add a delay.',
      },
    },
  },
};

export const Error: Story = {
  name: 'Error State',
  render: () => (
    <div className="w-96">
      <UserSearch />
    </div>
  ),
  parameters: {
    msw: {
      handlers: errorHandlers,
    },
    docs: {
      description: {
        story:
          'This story simulates an error state. Type at least 3 characters to trigger the error.',
      },
    },
  },
}; 