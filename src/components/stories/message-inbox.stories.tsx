import type { Meta, StoryObj } from '@storybook/react';
import { MessageInbox, ChatUser, MessageInboxSidebarItem } from '../deso/message-inbox';
import { Message } from '../deso/message-chat-list';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY } from '@/lib/constants';
import React, { useState } from 'react';
import { Providers } from '../../lib/providers';

const users: ChatUser[] = [
  { publicKey: DEFAULT_PUBLIC_KEY },
  { publicKey: OTHER_PUBLIC_KEY },
];

const primaryItems: MessageInboxSidebarItem[] = [
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    lastMessage: 'See you at 5pm!',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    lastMessage: 'Can you send the file?',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2,
  },
  {
    publicKey: 'BC1YLhyuDGeWVgHmh3UQEoKstda525T1LnonYWURBdpgWbFBfRuntP5',
    lastMessage: 'Thanks for the update!',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 1,
  },
  {
    publicKey: 'BC1YLiUt3iQG4QY8KHLPXP8LznyFp3k9vFTg2mhhu76d1Uu2WMw9RVY',
    lastMessage: 'Let me know if you need anything.',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const requestItems: MessageInboxSidebarItem[] = [
  {
    publicKey: 'BC1YLgzcfyi5GZoMb9xoVzDCMy9KEzzvTqoJzRrVDfhWE2FfFubxaVm',
    lastMessage: 'Hey, I have a proposal for you.',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    unreadCount: 1,
  },
  {
    publicKey: 'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
    lastMessage: 'Can we connect?',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    unreadCount: 1,
  },
  {
    publicKey: 'BC1YLgHnQNC2Qi2LXoEFLdyCvjxuXZYi8zdibDxZzjXsFw5AZiyHKny',
    lastMessage: 'Check out my new post!',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    unreadCount: 1,
  },
];

const initialMessages: Message[] = [
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    message: 'Hey there!',
    timestamp: new Date(),
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    message: 'Hello! How are you?',
    timestamp: new Date(),
  },
];

const meta: Meta<typeof MessageInbox> = {
  title: 'DeSo/MessageInbox',
  component: MessageInbox,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageInbox>;

export const Interactive: Story = {
  render: (args) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [selectedUserPublicKey, setSelectedUserPublicKey] = useState(users[1].publicKey);
    const currentUserPublicKey = DEFAULT_PUBLIC_KEY;

    const handleSendMessage = (msg: string) => {
      const newMsg: Message = {
        publicKey: currentUserPublicKey,
        message: msg,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMsg]);
      // Simulate a reply after 1s
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            publicKey: selectedUserPublicKey,
            message: 'This is a hardcoded reply! 😊',
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    };

    const handleSelectUser = (pk: string) => {
      setSelectedUserPublicKey(pk);
      // Optionally, clear messages or load new ones for the selected user
      setMessages(initialMessages);
    };

    return (
      <MessageInbox
        {...args}
        users={users}
        currentUserPublicKey={currentUserPublicKey}
        messages={messages}
        selectedUserPublicKey={selectedUserPublicKey}
        onSendMessage={handleSendMessage}
        onSelectUser={handleSelectUser}
        primaryItems={primaryItems}
        requestItems={requestItems}
        onMarkAsRead={(publicKey) => console.log('mark-as-read', publicKey)}
        onArchive={(publicKey) => console.log('archive', publicKey)}
      />
    );
  },
}; 