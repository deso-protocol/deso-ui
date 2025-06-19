import React from 'react';
import { UserInfo } from './user-info';
import { Timestamp } from './timestamp';
import { cn } from '@/lib/utils';

export interface MessageInboxItemProps {
  publicKey: string;
  lastMessage: string;
  lastTimestamp: string | Date;
  unreadCount?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MessageInboxItem({
  publicKey,
  lastMessage,
  lastTimestamp,
  unreadCount = 0,
  selected = false,
  onClick,
  className,
}: MessageInboxItemProps) {
  return (
    <div
      className={cn(
        'relative flex items-center gap-2 p-2 cursor-pointer hover:bg-background/50',
        selected && 'bg-accent border-y border-border bg-background hover:bg-background',
        !selected && 'border-y border-transparent',
        className
      )}
      onClick={onClick}
    >
      <UserInfo publicKey={publicKey} pictureSize="lg" usernameClassName="text-xs">
        <div className="flex items-center gap-2 mt-0.5">
          <span className="truncate text-xs text-muted-foreground max-w-[220px]">{lastMessage}</span>
          {unreadCount > 0 && (
            <span className="ml-1 inline-block w-1 h-1 rounded-full bg-primary absolute right-4 top-4" title={`${unreadCount} unread`} />
          )}
        </div>
        <Timestamp timestamp={lastTimestamp} className="w-fit text-[10px] text-muted-foreground mt-0.5" format="relative" />
      </UserInfo>
    </div>
  );
} 