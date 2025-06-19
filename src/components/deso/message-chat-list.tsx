'use client';

import React from 'react';
import { MessageChatItem } from './message-chat-item';
import { cn } from '@/lib/utils';
import { Reaction } from './post-reactions';

export interface Message {
  publicKey: string;
  message: string;
  style?: 'rounded' | 'square';
  timestamp: string | Date;
  reactions?: Reaction[];
  onReactionClick?: (emoji: string) => void;
}

export interface MessageChatListProps {
  messages: Message[];
  currentUserPublicKey: string;
  className?: string;
  groupingVariant?: 'grouped' | 'none';
  bubbleVariant?: 'rounded' | 'square';
}

export function MessageChatList({
  messages,
  currentUserPublicKey,
  className,
  groupingVariant = 'grouped',
  bubbleVariant = 'rounded',
}: MessageChatListProps) {
  // Group consecutive messages from the same user
  let rendered: React.ReactNode[] = [];
  if (groupingVariant === 'grouped') {
    let group: Message[] = [];
    let lastPublicKey: string | null = null;
    messages.forEach((msg, idx) => {
      if (msg.publicKey === lastPublicKey) {
        group.push(msg);
      } else {
        if (group.length > 0) {
          rendered.push(
            <MessageGroup
              key={group[0].timestamp + '-' + group[0].publicKey}
              group={group}
              currentUserPublicKey={currentUserPublicKey}
              bubbleVariant={bubbleVariant}
            />
          );
        }
        group = [msg];
        lastPublicKey = msg.publicKey;
      }
      // Push the last group
      if (idx === messages.length - 1 && group.length > 0) {
        rendered.push(
          <MessageGroup
            key={group[0].timestamp + '-' + group[0].publicKey}
            group={group}
            currentUserPublicKey={currentUserPublicKey}
            bubbleVariant={bubbleVariant}
          />
        );
      }
    });
  } else {
    rendered = messages.map((msg, idx) => (
      <MessageChatItem
        key={msg.timestamp + '-' + idx}
        publicKey={msg.publicKey}
        message={msg.message}
        timestamp={msg.timestamp}
        isSent={msg.publicKey === currentUserPublicKey}
        bubbleVariant={bubbleVariant}
        reactions={msg.reactions}
        onReactionClick={msg.onReactionClick}
      />
    ));
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {rendered}
    </div>
  );
}

interface MessageGroupProps {
  group: Message[];
  currentUserPublicKey: string;
  bubbleVariant: 'rounded' | 'square';
}

function MessageGroup({ group, currentUserPublicKey, bubbleVariant }: MessageGroupProps) {
  const isSent = group[0].publicKey === currentUserPublicKey;
  return (
    <div className={cn('flex flex-col gap-1', isSent ? 'items-end' : 'items-start')}>
      {group.map((msg, idx) => (
        <MessageChatItem
          key={msg.timestamp + '-' + idx}
          publicKey={msg.publicKey}
          message={msg.message}
          timestamp={idx === group.length - 1 ? msg.timestamp : undefined}
          isSent={isSent}
          showUserInfo={idx === 0}
          bubbleVariant={bubbleVariant}
          reactions={msg.reactions}
          onReactionClick={msg.onReactionClick}
        />
      ))}
    </div>
  );
} 