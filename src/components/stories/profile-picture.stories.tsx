import type { Meta, StoryObj } from '@storybook/react'
import { ProfilePicture } from '../deso/profile-picture'
import { searchUsers } from '../../lib/mocks/deso-data'
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants'
import { loadingHandlers } from '../../lib/mocks/msw-handlers'
import { Providers } from '../../lib/providers'
import { Plus } from 'lucide-react'

/**
 * The ProfilePicture component displays a user's profile picture from the DeSo blockchain,
 * with support for regular, NFT, and high-resolution profile pictures.
 * 
 * ## GraphQL Query
 * 
 * This component uses the following GraphQL query to fetch profile picture data:
 * 
 * ```graphql
 * query GetProfilePicture($publicKey: String!) {
 *   accountByPublicKey(publicKey: $publicKey) {
 *     profilePic
 *     extraData {
 *       NFTProfilePictureUrl
 *       LargeProfilePicURL
 *     }
 *   }
 * }
 * ```
 */

const meta: Meta<typeof ProfilePicture> = {
  title: 'DeSo/ProfilePicture',
  component: ProfilePicture,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'nft', 'highres'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    border: {
      control: 'select',
      options: ['none', 'gradient', 'solid'],
    },
    isLive: {
      control: 'boolean',
    },
    associatedPublicKey: {
      control: 'text',
    },
    actionIcon: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LIVE_PUBLIC_KEY = DEFAULT_PUBLIC_KEY;

export const Circle: Story = {
  name: 'Shape: Circle',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    shape: 'circle',
  },
};

export const Rounded: Story = {
  name: 'Shape: Rounded',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    shape: 'rounded',
  },
};

export const Square: Story = {
  name: 'Shape: Square',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    shape: 'square',
  },
};

export const NFT: Story = {
  name: 'Variant: NFT (Hexagon)',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    variant: 'nft',
  },
};

export const GradientBorder: Story = {
  name: 'Gradient Border',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    shape: 'circle',
    border: 'gradient',
  },
};

export const GradientBorderRounded: Story = {
  name: 'Gradient Border (Rounded)',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    shape: 'rounded',
    border: 'gradient',
  },
};

export const SolidBorder: Story = {
  name: 'Solid Border',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    shape: 'circle',
    border: 'solid',
  },
};

export const LiveIndicator: Story = {
  name: 'Adornment: Live Indicator',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    isLive: true,
  },
};

export const AssociatedProfile: Story = {
  name: 'Adornment: Associated Profile',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    associatedPublicKey: searchUsers.nader.publicKey,
  },
};

export const ActionIcon: Story = {
  name: 'Adornment: Action Icon',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    actionIcon: (
      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white">
        <Plus size={16} />
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    publicKey: 'loading...',
    size: 'md',
    variant: 'default',
  },
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
}; 