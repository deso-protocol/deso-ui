import type { Meta, StoryObj } from '@storybook/react'
import { ProfilePicture } from './profile-picture'
import { http, HttpResponse } from 'msw'
import { mockProfiles, defaultProfile } from '../../lib/mocks/deso-data'
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants'
import { successHandlers, errorHandlers, loadingHandlers } from '../../lib/mocks/msw-handlers'

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