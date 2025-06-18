import type { Meta, StoryObj } from '@storybook/react';
import { MessageWindow, ChatUser, MessageWindowSidebarItem } from '../deso/message-window';
import { Message } from '../deso/message-list';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY } from '@/lib/constants';
import React, { useState } from 'react';

const users: ChatUser[] = [
  { publicKey: DEFAULT_PUBLIC_KEY },
  { publicKey: OTHER_PUBLIC_KEY },
];

const sidebarItems: MessageWindowSidebarItem[] = [
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
    unreadCount: 0,
  },
  {
    publicKey: 'BC1YLjSHfbJdMSHb2M128wtRKSo2rSJtwJvUVRrasX7XcUYJsPy2WLd',
    lastMessage: 'Happy Birthday! 🎉',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 2),
    unreadCount: 3,
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

const meta: Meta<typeof MessageWindow> = {
  title: 'DeSo/MessageWindow',
  component: MessageWindow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MessageWindow>;

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
      <MessageWindow
        {...args}
        users={users}
        currentUserPublicKey={currentUserPublicKey}
        messages={messages}
        selectedUserPublicKey={selectedUserPublicKey}
        onSendMessage={handleSendMessage}
        onSelectUser={handleSelectUser}
        sidebarItems={sidebarItems}
      />
    );
  },
}; 