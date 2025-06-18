'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserInfo } from './user-info';
import { MessageList, Message } from './message-list';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { MessageWindowItem } from './message-window-item';

export interface ChatUser {
  publicKey: string;
  username?: string;
}

export interface MessageWindowSidebarItem {
  publicKey: string;
  lastMessage: string;
  lastTimestamp: string | Date;
  unreadCount?: number;
}

export interface MessageWindowProps {
  users: ChatUser[];
  currentUserPublicKey: string;
  messages: Message[];
  onSendMessage?: (message: string) => void;
  selectedUserPublicKey: string;
  onSelectUser?: (publicKey: string) => void;
  className?: string;
  sidebarItems: MessageWindowSidebarItem[];
}

export function MessageWindow({
  users,
  currentUserPublicKey,
  messages,
  onSendMessage,
  selectedUserPublicKey,
  onSelectUser,
  className,
  sidebarItems,
}: MessageWindowProps) {
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Always scroll to bottom when messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage?.(input);
      setInput('');
    }
  };

  return (
    <div className={cn('flex border rounded-lg overflow-hidden h-[90vh] bg-background', className)}>
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted flex flex-col">
        <div className="p-2 font-semibold">Conversations</div>
        <div className="flex-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <MessageWindowItem
              key={item.publicKey}
              publicKey={item.publicKey}
              lastMessage={item.lastMessage}
              lastTimestamp={item.lastTimestamp}
              unreadCount={item.unreadCount}
              selected={item.publicKey === selectedUserPublicKey}
              onClick={() => onSelectUser?.(item.publicKey)}
            />
          ))}
        </div>
      </aside>
      {/* Main Chat Window */}
      <main className="flex-1 flex flex-col">
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
          <MessageList
            messages={messages}
            currentUserPublicKey={currentUserPublicKey}
          />
        </div>
        <form
          className="flex gap-2 p-4 border-t bg-background items-end"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Textarea
            className="flex-1 resize-none min-h-auto"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message…"
            rows={1}
          />
          <Button type="submit" disabled={!input.trim()}>
            Send
          </Button>
        </form>
      </main>
    </div>
  );
} 