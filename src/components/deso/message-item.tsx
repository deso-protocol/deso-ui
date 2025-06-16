'use client';

import React from 'react';
import { ProfilePicture } from './profile-picture';
import { UsernameDisplay } from './username-display';
import { Timestamp } from './timestamp';
import { cn } from '@/lib/utils';
import { UserInfo } from './user-info';

export interface MessageItemProps {
  publicKey: string;
  message: string;
  timestamp?: string | Date;
  isSent?: boolean;
  className?: string;
  showUserInfo?: boolean;
  bubbleVariant?: 'rounded' | 'square';
}

export function MessageItem({
  publicKey,
  message,
  timestamp,
  isSent = false,
  className,
  showUserInfo = true,
  bubbleVariant = 'rounded',
}: MessageItemProps) {
  // Bubble and username group
  const bubbleGroup = (
    <div className={cn(
      'flex flex-col gap-1 max-w-[80%]',
      isSent ? 'items-end' : 'items-start'
    )}>
      {showUserInfo && (
        <UserInfo
          publicKey={publicKey}
          showPublicKey
          showCopyButton={false}
          className={cn(
            'mb-1',
            isSent ? 'justify-end text-right gap-2' : 'justify-start text-left gap-2'
          )}
          layout={isSent ? 'row-reverse' : 'row'}
          usernameVariant="social"
        />
      )}
      <div className={cn(
        isSent ? 'mr-12 text-right' : 'ml-12 text-left'
      )}>
        <div className={cn(
          'px-4 py-2',
          bubbleVariant === 'rounded' 
            ? 'rounded-2xl' 
            : 'rounded-none',
          isSent 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        )}>
          {message}
        </div>
        {timestamp && (
          <Timestamp 
            timestamp={timestamp} 
            format="relative"
            className="text-xs text-muted-foreground"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className={cn(
      'flex items-start gap-2',
      isSent ? 'justify-end' : 'justify-start',
      className
    )}>
      {bubbleGroup}
    </div>
  );
} 