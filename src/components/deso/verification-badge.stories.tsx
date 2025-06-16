import type { Meta, StoryObj } from '@storybook/react'
import { VerificationBadge } from './verification-badge'

/**
 * The VerificationBadge component displays a verification badge for DeSo users.
 * This is a presentational component that doesn't make GraphQL queries directly,
 * but is used by other components like UsernameDisplay.
 */

const meta: Meta<typeof VerificationBadge> = {
  title: 'DeSo/VerificationBadge',
  component: VerificationBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isVerified: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showTooltip: {
      control: 'boolean',
    },
    tooltipText: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Verified: Story = {
  args: {
    isVerified: true,
  },
}

export const Unverified: Story = {
  args: {
    isVerified: false,
  },
}

export const Small: Story = {
  args: {
    isVerified: true,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    isVerified: true,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    isVerified: true,
    size: 'lg',
  },
}

export const PremiumStyle: Story = {
  args: {
    isVerified: true,
    style: 'premium',
  },
}

export const CreatorStyle: Story = {
  args: {
    isVerified: true,
    style: 'creator',
  },
}

export const AdminStyle: Story = {
  args: {
    isVerified: true,
    style: 'admin',
  },
}

export const WithTooltip: Story = {
  args: {
    isVerified: true,
    showTooltip: true,
  },
}

export const WithCustomStyling: Story = {
  args: {
    isVerified: true,
    className: 'bg-blue-500 text-white p-1 rounded-md',
  },
} 