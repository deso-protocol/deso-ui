import type { Meta, StoryObj } from '@storybook/react'
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants'
import { successHandlers } from '../../lib/mocks/msw-handlers';
import { ProfileCard } from './profile-card';

const meta: Meta<typeof ProfileCard> = {
  title: 'DeSo/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: successHandlers,
    },
  },
  argTypes: {
    publicKey: {
      control: 'text',
      description: 'The public key of the DeSo user',
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact'],
    },
    showFollowButton: {
      control: 'boolean',
    },
    showMessageButton: {
      control: 'boolean',
    },
    showActionMenu: {
      control: 'boolean',
    },
    showFeaturedImage: {
      control: 'boolean',
    },
    followButtonVariant: {
      control: 'radio',
      options: ['default', 'icon-only'],
    },
    messageButtonVariant: {
      control: 'radio',
      options: ['default', 'icon-only'],
    },
    showDescription: {
      control: 'boolean',
    },
    showTags: {
      control: 'boolean',
    },
    showStats: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const containerWidth = 'max-w-full w-[500px]';

export const Default: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    messageButtonVariant: 'icon-only',
    className: containerWidth,
  },
};

export const NoFeaturedImage: Story = {
  args: {
    ...Default.args,
    showFeaturedImage: false,
    className: containerWidth,
  },
};

export const NoDescription: Story = {
  args: {
    ...Default.args,
    showDescription: false,
    className: containerWidth,
  },
};

export const NoTags: Story = {
  args: {
    ...Default.args,
    showTags: false,
    className: containerWidth,
  },
};

export const NoStats: Story = {
  args: {
    ...Default.args,
    showStats: false,
    className: containerWidth,
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
    className: containerWidth,
  },
};

export const CompactWithFollow: Story = {
  name: 'Compact (Follow only)',
  args: {
    ...Compact.args,
    showMessageButton: false,
    showActionMenu: false,
    className: containerWidth,
  },
};

export const CompactWithMessage: Story = {
  name: 'Compact (Message only)',
  args: {
    ...Compact.args,
    showFollowButton: false,
    messageButtonVariant: 'default',
    showActionMenu: false,
    className: containerWidth,
  },
};

export const CompactWithActions: Story = {
  name: 'Compact (Actions only)',
  args: {
    ...Compact.args,
    showFollowButton: false,
    showMessageButton: false,
    className: containerWidth,
  },
};

export const CompactNoButtons: Story = {
  name: 'Compact (No Buttons)',
  args: {
    ...Compact.args,
    showFollowButton: false,
    showMessageButton: false,
    showActionMenu: false,
    className: containerWidth,
  },
};
