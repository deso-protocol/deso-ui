import type { Meta, StoryObj } from '@storybook/react';
import { ProfileTag } from './profile-tag';
import { Calendar, LinkIcon, MapPin } from 'lucide-react';

const meta: Meta<typeof ProfileTag> = {
  title: 'DeSo/ProfileTag',
  component: ProfileTag,
  argTypes: {
    children: {
      control: 'text',
    },
    icon: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileTag>;

export const Default: Story = {
  args: {
    children: 'New York, NY',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <MapPin className="size-3" />,
    children: 'New York, NY',
  },
};

export const Website: Story = {
  render: (args) => (
    <a href="https://deso.com" target="_blank" rel="noopener noreferrer">
      <ProfileTag {...args} />
    </a>
  ),
  args: {
    icon: <LinkIcon className="size-3" />,
    children: 'deso.com',
  },
};

export const Joined: Story = {
  args: {
    icon: <Calendar className="size-3" />,
    children: 'Joined June 2024',
  },
}; 