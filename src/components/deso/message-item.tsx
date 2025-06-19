'use client';

import React from 'react';
import { ProfilePicture } from './profile-picture';
import { UsernameDisplay } from './username-display';
import { Timestamp } from './timestamp';
import { cn } from '@/lib/utils';
import { UserInfo } from './user-info';
import PostReactions, { PostReactionList, PostReactionTrigger, Reaction } from './post-reactions';

export interface MessageItemProps {
  publicKey: string;
  message: string;
  timestamp?: string | Date;
  isSent?: boolean;
  className?: string;
  showUserInfo?: boolean;
  bubbleVariant?: 'rounded' | 'square';
  reactions?: Reaction[];
  onReactionClick?: (emoji: string) => void;
}

export function MessageItem({
  publicKey,
  message,
  timestamp,
  isSent = false,
  className,
  showUserInfo = true,
  bubbleVariant = 'rounded',
  reactions,
  onReactionClick,
}: MessageItemProps) {
  const hasReactions = reactions && reactions.length > 0 && onReactionClick;
  return (
    <div className={cn(
      'flex items-start gap-2',
      isSent ? 'justify-end' : 'justify-start',
      className
    )}>
      {/* Bubble and username group */}
      <div className={cn(
        'flex flex-col gap-1',
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
          isSent ? 'mr-12 text-right' : 'ml-12 text-left',
          'relative max-w-[80%]'
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
          {/* Reactions under the bubble */}
          {hasReactions && (
            <PostReactionList
              reactions={reactions}
              onReactionClick={onReactionClick}
              className={cn('mt-2 mb-1', isSent ? 'justify-end' : 'justify-start')}
            />
          )}
          {/* Timestamp */}
          {timestamp && (
            <Timestamp 
              timestamp={timestamp} 
              format="relative"
              className="text-xs text-muted-foreground"
            />
          )}
          {/* Trigger to the side of the bubble */}
          {onReactionClick && (
            <div className={cn(
              'absolute',
              isSent ? 'right-[-44px] top-1' : 'left-[-44px] top-1'
            )}>
              <PostReactionTrigger onReactionClick={onReactionClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 