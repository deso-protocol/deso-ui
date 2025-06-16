import type { Meta, StoryObj } from '@storybook/react';
import { MessageList, Message } from './message-list';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY } from '@/lib/constants';

const now = new Date();
const messages: Message[] = [
  {
    publicKey: OTHER_PUBLIC_KEY,
    message: 'Hey! 👋',
    timestamp: new Date(now.getTime() - 1000 * 60 * 5),
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'Hi there! How are you?',
    timestamp: new Date(now.getTime() - 1000 * 60 * 4),
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    message: 'I\'m good, thanks! What about you?',
    timestamp: new Date(now.getTime() - 1000 * 60 * 3),
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'I\'m doing great! Just working on a new project.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 2),
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'It\'s a chat UI for DeSo.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 1.5),
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'Trying to make it look like iMessage!',
    timestamp: new Date(now.getTime() - 1000 * 60 * 1),
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    message: 'That\'s awesome! 🚀',
    timestamp: new Date(now.getTime() - 1000 * 60 * 0.5),
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    message: 'Can\'t wait to see it!',
    timestamp: new Date(now.getTime() - 1000 * 30),
  },
];

const meta: Meta<typeof MessageList> = {
  title: 'DeSo/MessageList',
  component: MessageList,
  argTypes: {
    groupingVariant: {
      control: 'select',
      options: ['grouped', 'none'],
      description: 'Whether to group consecutive messages from the same user',
    },
    bubbleVariant: {
      control: 'select',
      options: ['rounded', 'square'],
      description: 'Whether to use rounded or square bubbles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageList>;

export const GroupedBubbles: Story = {
  args: {
    messages,
    currentUserPublicKey: DEFAULT_PUBLIC_KEY,
    groupingVariant: 'grouped',
    bubbleVariant: 'rounded',
  },
};

export const NoGrouping: Story = {
  args: {
    messages,
    currentUserPublicKey: DEFAULT_PUBLIC_KEY,
    groupingVariant: 'none',
    bubbleVariant: 'square',
  },
}; 