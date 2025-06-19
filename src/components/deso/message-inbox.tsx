'use client';

import React, { useRef, useEffect } from 'react';
import { MessageChatList, Message } from './message-chat-list';
import { cn } from '@/lib/utils';
import { MessageInboxItem } from './message-inbox-item';
import { UserSearch } from './user-search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Editor, EditorSubmitData } from './editor';

export interface ChatUser {
  publicKey: string;
  username?: string;
}

export interface MessageInboxSidebarItem {
  publicKey: string;
  lastMessage: string;
  lastTimestamp: string | Date;
  unreadCount?: number;
}

export interface MessageInboxProps {
  users: ChatUser[];
  currentUserPublicKey: string;
  messages: Message[];
  onSendMessage?: (message: string) => void;
  selectedUserPublicKey: string;
  onSelectUser?: (publicKey: string) => void;
  className?: string;
  primaryItems: MessageInboxSidebarItem[];
  requestItems?: MessageInboxSidebarItem[];
  onMarkAsRead?: (publicKey: string) => void;
  onArchive?: (publicKey: string) => void;
}

export function MessageInbox({
  users,
  currentUserPublicKey,
  messages,
  onSendMessage,
  selectedUserPublicKey,
  onSelectUser,
  className,
  primaryItems,
  requestItems = [],
  onMarkAsRead,
  onArchive,
}: MessageInboxProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Always scroll to bottom when messages change
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (data: EditorSubmitData) => {
    if (data.postText.trim()) {
      onSendMessage?.(data.postText);
    }
  };

  return (
    <div className={cn('flex border rounded-lg overflow-hidden h-[90vh] bg-background', className)}>
      {/* Sidebar */}
      <aside className="w-80 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          {onSelectUser && <UserSearch onSelectUser={onSelectUser} />}
        </div>
        <Tabs
          defaultValue="primary"
          className="flex-1 flex flex-col overflow-y-hidden gap-0"
        >
          <TabsList className="h-12 p-2 w-full rounded-none border-b bg-accent -mb-[1px]">
            <TabsTrigger value="primary" className="flex-1 cursor-pointer border">
              Primary
              {primaryItems.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 rounded-full px-1.5"
                >
                  {primaryItems.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex-1 cursor-pointer border">
              Requests
              {requestItems.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 rounded-full px-1.5"
                >
                  {requestItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="primary"
            className="flex-1 overflow-y-auto mt-0"
          >
            {primaryItems.map((item) => (
              <MessageInboxItem
                key={item.publicKey}
                publicKey={item.publicKey}
                lastMessage={item.lastMessage}
                lastTimestamp={item.lastTimestamp}
                unreadCount={item.unreadCount}
                selected={item.publicKey === selectedUserPublicKey}
                onClick={() => onSelectUser?.(item.publicKey)}
                onMarkAsRead={() => onMarkAsRead?.(item.publicKey)}
                onArchive={() => onArchive?.(item.publicKey)}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="requests"
            className="flex-1 overflow-y-auto mt-0"
          >
            {requestItems.map((item) => (
              <MessageInboxItem
                key={item.publicKey}
                publicKey={item.publicKey}
                lastMessage={item.lastMessage}
                lastTimestamp={item.lastTimestamp}
                unreadCount={item.unreadCount}
                selected={item.publicKey === selectedUserPublicKey}
                onClick={() => onSelectUser?.(item.publicKey)}
                onMarkAsRead={() => onMarkAsRead?.(item.publicKey)}
                onArchive={() => onArchive?.(item.publicKey)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </aside>
      {/* Main Chat Window */}
      <main className="flex-1 flex flex-col">
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
          <MessageChatList
            messages={messages}
            currentUserPublicKey={currentUserPublicKey}
          />
        </div>
        <div className="p-4 border-t bg-background">
          <Editor
            currentUser={{ publicKey: currentUserPublicKey }}
            onSubmit={handleSendMessage}
            showUserInfo={false}
            showVisibility={false}
            submitButtonText="Send"
            showImageUpload={true}
            showVideoUpload={false}
            showAudioUpload={false}
            showExclusiveContent={false}
            placeholder="Type your message…"
          />
        </div>
      </main>
    </div>
  );
} 