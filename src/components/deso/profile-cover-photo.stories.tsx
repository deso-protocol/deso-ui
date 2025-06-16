import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCoverPhoto } from './profile-cover-photo'
import { loadingHandlers } from '../../lib/mocks/msw-handlers'
import { DEFAULT_PUBLIC_KEY } from '@/lib/constants';

/**
 * The ProfileCoverPhoto component displays a user's cover photo from the DeSo blockchain,
 * with support for different aspect ratios and overlay options.
 * 
 * ## GraphQL Query
 * 
 * This component uses the following GraphQL query to fetch cover photo data:
 * 
 * ```graphql
 * query GetProfileData($publicKey: String!) {
 *   accountByPublicKey(publicKey: $publicKey) {
 *     extraData {
 *       FeaturedImageURL
 *     }
 *   }
 * }
 * ```
 */

const meta: Meta<typeof ProfileCoverPhoto> = {
  title: 'DeSo/ProfileCoverPhoto',
  component: ProfileCoverPhoto,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['16:9', '3:1', '2:1', '4:3'],
    },
    showOverlay: {
      control: 'boolean',
    },
    overlayOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
  },
  render: (args) => (
    <div className="w-full w-[400px] h-[400px] p-[20px]">
      <ProfileCoverPhoto {...args} className="h-full w-full border border-border" />
      <p className="text-sm text-foreground mt-4 px-[120px]">This is a profile cover photo.</p>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    aspectRatio: '16:9',
  },
};

export const WithOverlay: Story = {
  name: 'With Overlay (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    aspectRatio: '16:9',
    showOverlay: true,
    overlayOpacity: 0.5,
  },
};

export const UltraWideAspect: Story = {
  name: 'Ultra-Wide 3:1 (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    aspectRatio: '3:1',
  },
};

export const StandardAspect: Story = {
  name: 'Standard 4:3 (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    aspectRatio: '4:3',
  },
};

export const Loading: Story = {
  args: {
    publicKey: 'loading...',
    aspectRatio: '16:9',
  },
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
}; 