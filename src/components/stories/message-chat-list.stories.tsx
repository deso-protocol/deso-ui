import type { Meta, StoryObj } from '@storybook/react';
import { MessageChatList, Message } from '../deso/message-chat-list';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY } from '../../lib/constants';
import { useState } from 'react';
import { Providers } from '../../lib/providers';

const now = new Date();
const baseMessages: Message[] = [
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
    reactions: [
      { emoji: '👍', count: 1, userHasReacted: false },
      { emoji: '😂', count: 2, userHasReacted: false },
    ],
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
    reactions: [
      { emoji: '🔥', count: 1, userHasReacted: true },
    ],
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

const meta: Meta<typeof MessageChatList> = {
  title: 'DeSo/MessageChatList',
  component: MessageChatList,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  argTypes: {
    groupingVariant: {
      control: 'select',
      options: ['grouped', 'none'],
      description: 'Whether to group consecutive messages from the same user',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageChatList>;

export const GroupedChat: Story = {
  args: {
    messages: baseMessages,
    currentUserPublicKey: DEFAULT_PUBLIC_KEY,
    groupingVariant: 'grouped',
  },
};

export const NoGrouping: Story = {
  args: {
    messages: baseMessages,
    currentUserPublicKey: DEFAULT_PUBLIC_KEY,
    groupingVariant: 'none',
  },
};

export const WithReactions: Story = {
  render: (args) => {
    const [messages, setMessages] = useState(baseMessages);
    const handleReactionClick = (msgIdx: number, emoji: string) => {
      setMessages((prevMsgs) =>
        prevMsgs.map((msg, idx) => {
          if (idx !== msgIdx) return msg;
          const reactions = msg.reactions || [];
          const found = reactions.find((r) => r.emoji === emoji);
          if (found) {
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, userHasReacted: true }
                  : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...reactions,
                { emoji, count: 1, userHasReacted: true },
              ],
            };
          }
        })
      );
    };
    // Attach onReactionClick to each message
    const messagesWithHandlers = messages.map((msg, idx) => ({
      ...msg,
      onReactionClick: (emoji: string) => handleReactionClick(idx, emoji),
    }));
    return <MessageChatList {...args} messages={messagesWithHandlers} />;
  },
  args: {
    messages: baseMessages,
    currentUserPublicKey: DEFAULT_PUBLIC_KEY,
    groupingVariant: 'grouped',
  },
}; 