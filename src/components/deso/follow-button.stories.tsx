import type { Meta, StoryObj } from '@storybook/react';
import { FollowButton } from './follow-button';

const meta: Meta<typeof FollowButton> = {
  title: 'DeSo/FollowButton',
  component: FollowButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isFollowing: {
      control: 'boolean',
      description: 'The initial follow state of the button.',
    },
    variant: {
      control: 'select',
      options: ['default', 'icon', 'icon-only'],
      description: 'The button style variant.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Not Following)',
  args: {
    isFollowing: false,
  },
};

export const Following: Story = {
  name: 'Following (Hover to see Unfollow)',
  args: {
    isFollowing: true,
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    isFollowing: false,
    variant: 'icon',
  },
};

export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    isFollowing: false,
    variant: 'icon-only',
  },
};

export const WithTooltip: Story = {
  name: 'Icon Only with Tooltip',
  args: {
    isFollowing: false,
    variant: 'icon-only',
    showTooltip: true,
  },
}; 