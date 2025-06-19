import type { Meta, StoryObj } from '@storybook/react';
import { MessageInboxItem } from '../deso/message-inbox-item';
import { Providers } from '../../lib/providers';

const meta: Meta<typeof MessageInboxItem> = {
  title: 'DeSo/MessageInboxItem',
  component: MessageInboxItem,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageInboxItem>;

export const Default: Story = {
  args: {
    publicKey: 'BC1YLhyuDGeWVgHmh3UQEoKstda525T1LnonYWURBdpgWbFBfRuntP5',
    lastMessage: 'Thanks for the update!',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    publicKey: 'BC1YLiUt3iQG4QY8KHLPXP8LznyFp3k9vFTg2mhhu76d1Uu2WMw9RVY',
    lastMessage: 'Let me know if you need anything.',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    selected: true,
  },
};

export const WithUnread: Story = {
  args: {
    publicKey: 'BC1YLjSHfbJdMSHb2M128wtRKSo2rSJtwJvUVRrasX7XcUYJsPy2WLd',
    lastMessage: 'Happy Birthday! 🎉',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 2),
    unreadCount: 3,
    selected: false,
  },
};

export const LongMessage: Story = {
  args: {
    publicKey: 'BC1YLhyuDGeWVgHmh3UQEoKstda525T1LnonYWURBdpgWbFBfRuntP5',
    lastMessage: 'This is a very long message preview that should be truncated in the sidebar to keep the UI clean and readable for users.',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 10),
    unreadCount: 1,
    selected: false,
  },
}; 