import React from 'react';
import { UserInfo } from './user-info';
import { Timestamp } from './timestamp';
import { cn } from '@/lib/utils';
import { ActionMenu, ActionMenuItem } from './action-menu';
import { MoreHorizontal, Check, Archive } from 'lucide-react';

export interface MessageInboxItemProps {
  publicKey: string;
  lastMessage: string;
  lastTimestamp: string | Date;
  unreadCount?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  onMarkAsRead?: () => void;
  onArchive?: () => void;
}

export function MessageInboxItem({
  publicKey,
  lastMessage,
  lastTimestamp,
  unreadCount = 0,
  selected = false,
  onClick,
  className,
  onMarkAsRead,
  onArchive,
}: MessageInboxItemProps) {
  const handleMenuInteraction = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        'group relative flex items-center gap-2 p-2 cursor-pointer hover:bg-background/50',
        selected &&
          'bg-accent border-b border-border/50 bg-background hover:bg-background',
        !selected && 'border-b border-border/50',
        className
      )}
      onClick={onClick}
    >
      <UserInfo
        publicKey={publicKey}
        pictureSize="lg"
        usernameClassName="text-xs"
      >
        <div className="flex items-center gap-2 mt-0.5">
          <span className="truncate text-xs text-muted-foreground max-w-[220px]">
            {lastMessage}
          </span>
          {unreadCount > 0 && (
            <span
              className="ml-1 inline-block w-1 h-1 rounded-full bg-red-500 absolute right-3 top-3"
              title={`${unreadCount} unread`}
            />
          )}
        </div>
        <Timestamp
          timestamp={lastTimestamp}
          className="w-fit text-[10px] text-muted-foreground mt-0.5"
          format="relative"
        />
      </UserInfo>

      <div
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleMenuInteraction}
      >
        <ActionMenu
          trigger={
            <div className="p-1.5 rounded-full hover:bg-accent">
              <MoreHorizontal size={16} />
            </div>
          }
          align="end"
        >
          {unreadCount > 0 && onMarkAsRead && (
            <ActionMenuItem icon={Check} onClick={onMarkAsRead}>
              Mark as read
            </ActionMenuItem>
          )}
          {onArchive && (
            <ActionMenuItem icon={Archive} onClick={onArchive}>
              Archive
            </ActionMenuItem>
          )}
        </ActionMenu>
      </div>
    </div>
  );
} 