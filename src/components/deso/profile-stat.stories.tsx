import type { Meta, StoryObj } from '@storybook/react';
import { ProfileStat } from './profile-stat';
import { Heart, Eye } from 'lucide-react';

const meta: Meta<typeof ProfileStat> = {
  title: 'DeSo/ProfileStat',
  component: ProfileStat,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['followers', 'following', 'subscribers'],
    },
    count: {
      control: 'number',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Followers: Story = {
  args: {
    variant: 'followers',
    count: 32430,
  },
};

export const Following: Story = {
  args: {
    variant: 'following',
    count: 2540,
  },
};

export const Subscribers: Story = {
  args: {
    variant: 'subscribers',
    count: 29,
  },
};

export const SingleFollower: Story = {
  name: 'Singular (1 Follower)',
  args: {
    variant: 'followers',
    count: 1,
  },
};

export const FullNumber: Story = {
  name: 'Full Number (Not Abbreviated)',
  args: {
    variant: 'followers',
    count: 1550,
    abbreviate: false,
  },
};

export const WithoutIcon: Story = {
  name: 'Without Icon',
  args: {
    count: 12345,
    label: 'Diamonds',
  },
};

export const Custom: Story = {
  name: 'Custom (Profile Views)',
  args: {
    count: 10500,
    label: 'Views',
    Icon: Eye,
  },
}; 