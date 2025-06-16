# How to Add and Mock Stories in the DeSo UI Library

This guide outlines the standardized process for creating stories for DeSo UI components, with a focus on our centralized data mocking strategy using Mock Service Worker (MSW). Following these steps ensures that our Storybook is consistent, maintainable, and easy to work with.

## Core Concepts

Our Storybook setup relies on a few key principles:

1.  **Component Isolation**: Stories should render a single component in various states to allow for isolated development and testing.
2.  **Centralized Mocking**: All API mocking logic is centralized to avoid duplication and keep stories clean. We use MSW to intercept GraphQL requests.
3.  **Single Source of Truth for Data**: All mock data (e.g., profile info, image URLs) is stored in `deso-ui/src/lib/mocks/deso-data.ts`.
4.  **GraphQL Operation-Based Handlers**: We use MSW's `graphql.query()` to mock responses based on the GraphQL operation name (e.g., `GetProfileData`), not on raw HTTP endpoints.

---

## Step-by-Step Guide to Creating Stories

The process for creating a story depends on the type of component.

### Part 1: Stories for Data-Fetching Components

These components, like `ProfilePicture` or `ProfileCard`, interact with the DeSo GraphQL API. Their stories must account for loading, error, and success states, which we manage with MSW.

**Example: Creating a story for `ProfilePicture`**

#### 1. Create the Story File

Create a new file named `ProfilePicture.stories.tsx` inside the same directory as your component (`deso-ui/src/components/deso/ProfilePicture.stories.tsx`).

#### 2. Add Story Boilerplate

Add the basic boilerplate. We import our centralized MSW handlers and constants for public keys.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProfilePicture } from './profile-picture';
import { DEFAULT_PUBLIC_KEY, LIVE_PUBLIC_KEY } from '@/lib/constants';
import { successHandlers, errorHandlers, loadingHandlers } from '@/lib/mocks/msw-handlers';

const meta: Meta<typeof ProfilePicture> = {
  title: 'DeSo/ProfilePicture',
  component: ProfilePicture,
  tags: ['autodocs'],
  argTypes: {
    // Define arg types for your component's props here
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
```

#### 3. Add Stories for Different States

Instead of creating local mock handlers in every story, we use a set of shared handlers defined in `deso-ui/src/lib/mocks/msw-handlers.ts`. These handlers use a regular expression (`/GetProfile/`) to automatically respond to any GraphQL query whose name starts with "GetProfile".

**Success Story (Default State):**
This story represents the component when data is fetched successfully. We use `DEFAULT_PUBLIC_KEY` which is linked to our mock data.

```tsx
export const Default: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
  parameters: {
    msw: {
      handlers: successHandlers, // <-- Use the shared success handlers
    },
  },
};
```

**Loading State Story:**
The `loadingHandlers` introduce an artificial delay, allowing you to test your loading UI.

```tsx
export const Loading: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
  parameters: {
    msw: {
      handlers: loadingHandlers, // <-- Use the shared loading handlers
    },
  },
};
```

**Error State Story:**
The `errorHandlers` simulate a GraphQL error, allowing you to test your component's fallback UI.

```tsx
export const Error: Story = {
  args: {
    publicKey: 'invalid-key',
  },
  parameters: {
    msw: {
      handlers: errorHandlers, // <-- Use the shared error handlers
    },
  },
};
```

**Live Data Story:**
To hit the actual DeSo API, provide a real public key (like `LIVE_PUBLIC_KEY`) and simply omit the `parameters.msw` object. This relies on the MSW bypass behavior configured in `.storybook/preview.tsx`.

```tsx
export const Live: Story = {
  name: 'Live Data',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
  },
  // No MSW handlers means the request will not be mocked
};
```

This same pattern applies to more **composite components** like `ProfileCard`. Because `ProfileCard` is composed of smaller data-fetching components, the same MSW handlers will be caught by its children, allowing you to test the entire composite component in its different states.

### Part 2: Stories for Presentational Components

These components, like `Button` or our `ActionMenu`, do not fetch data. They only receive props and render UI. Their stories are simpler and do not require MSW.

**Example: Creating a story for `ActionMenu`**

#### 1. Create the Story File

Create a file named `ActionMenu.stories.tsx`.

#### 2. Add Story Boilerplate and Define Stories

For these components, you just need to demonstrate their different visual states by passing different props.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu, ActionMenuItem } from './action-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Share2, Ban } from 'lucide-react';

const meta: Meta<typeof ActionMenu> = {
  title: 'DeSo/ActionMenu',
  component: ActionMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

export const IconOnly: Story = {
  args: {
    trigger: (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
    children: (
      <>
        <ActionMenuItem icon={Share2}>Share</ActionMenuItem>
        <ActionMenuItem icon={Ban} variant="destructive">Block</ActionMenuItem>
      </>
    ),
  },
};
```
In this example, we show how `ActionMenu` looks with an icon-only button as a trigger and how to compose `ActionMenuItem` components as children. No mocking is needed.

---

## Important Gotchas and Best Practices

### 1. Apollo Client Cache and Mock Data

**Problem:** You see Apollo Client cache errors in the console, or your component doesn't render data even though MSW returns a 200 OK status.

**Cause:** Apollo Client requires a unique identifier to normalize and cache data. By default, it looks for an `id` or `_id` field. For our DeSo data, the `accountByPublicKey` object type needs a unique identifier.

**Solution:**
*   **In your GraphQL Query:** Always include `id` and `publicKey`.
*   **In your Mock Data (`deso-data.ts`):** Ensure the mock objects have `id` and `publicKey` fields.

```ts
// Example of a well-formed mock object in deso-ui/src/lib/mocks/deso-data.ts
const baseProfile = {
  id: '1', // <-- Crucial for Apollo cache
  publicKey: DEFAULT_PUBLIC_KEY, // <-- Crucial for Apollo cache
  username: DEFAULT_USERNAME,
  // ... other fields
};
```

### 2. Bypassing MSW for Live Data

As shown in the data-fetching example, you can render a component with live data. This is enabled by two things:
1.  **Omitting `parameters.msw`** from the story definition.
2.  **Configuring MSW to bypass unhandled requests.** This is set globally in `.storybook/preview.tsx`.

    ```tsx
    // .storybook/preview.tsx
    import { initialize } from 'msw-storybook-addon';

    initialize({
      onUnhandledRequest: 'bypass', // <-- This is the key!
    });
    ```

### 3. Data Structure Mismatches

**Problem:** Your component is blank, but the network tab shows a 200 OK with the correct data.

**Cause:** There's a mismatch between the data structure returned by the API and the structure your component expects. For example, the live API might return `extraData` as a JSON string, while mocks provide it as a pre-parsed object.

**Solution:**
*   **Check the live API response:** Use your browser's network tools to inspect the real JSON response.
*   **Use higher-level hooks:** Our custom hooks like `useProfile` are designed to handle these inconsistencies (e.g., parsing `extraData` strings). Prefer using these hooks over lower-level GraphQL queries to ensure data consistency.
*   **Keep mocks aligned:** Ensure your mock data in `deso-data.ts` mirrors the structure returned by the higher-level hooks. 