import type { Meta, StoryObj } from '@storybook/react';
import { MessageItem } from './message-item';
import { DEFAULT_PUBLIC_KEY } from '@/lib/constants';
import { useState } from 'react';

const meta: Meta<typeof MessageItem> = {
  title: 'DeSo/MessageItem',
  component: MessageItem,
  argTypes: {
    isSent: {
      control: 'boolean',
      description: 'Whether the message was sent by the current user',
    },
    showUserInfo: {
      control: 'boolean',
      description: 'Whether to show the user info above the message',
    },
    message: {
      control: 'text',
      description: 'The message content',
    },
    timestamp: {
      control: 'date',
      description: 'The timestamp of the message',
    },
    bubbleVariant: {
      control: 'select',
      options: ['rounded', 'square'],
      description: 'The style of the message bubble',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageItem>;

export const Received: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'Hey, how are you doing?',
    timestamp: new Date(),
    isSent: false,
    showUserInfo: true,
    bubbleVariant: 'rounded',
  },
};

export const Sent: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'I\'m doing great! How about you?',
    timestamp: new Date(),
    isSent: true,
    showUserInfo: true,
    bubbleVariant: 'rounded',
  },
};

export const SquareBubble: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'This message uses a square bubble style',
    timestamp: new Date(),
    isSent: true,
    showUserInfo: true,
    bubbleVariant: 'square',
  },
};

export const WithoutUserInfo: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'This message doesn\'t show the user info',
    timestamp: new Date(),
    isSent: false,
    showUserInfo: false,
    bubbleVariant: 'rounded',
  },
};

export const LongMessage: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'This is a much longer message that will probably wrap to multiple lines. It demonstrates how the message bubble handles longer content while maintaining its shape and alignment.',
    timestamp: new Date(),
    isSent: true,
    showUserInfo: true,
    bubbleVariant: 'rounded',
  },
};

export const WithReactions: Story = {
  render: (args) => {
    const [reactions, setReactions] = useState([
      { emoji: '👍', count: 2, userHasReacted: false },
      { emoji: '😂', count: 1, userHasReacted: true },
      { emoji: '🔥', count: 1, userHasReacted: false },
    ]);
    const handleReactionClick = (emoji: string) => {
      setReactions((prev) =>
        prev.map((r) =>
          r.emoji === emoji
            ? { ...r, count: r.count + 1, userHasReacted: true }
            : r
        )
      );
    };
    return <MessageItem {...args} reactions={reactions} onReactionClick={handleReactionClick} />;
  },
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'This message supports reactions! Try clicking an emoji.',
    timestamp: new Date(),
    isSent: false,
    showUserInfo: true,
    bubbleVariant: 'rounded',
  },
}; 