'use client';

import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils/deso';
import { SmilePlus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export interface Reaction {
  emoji: string;
  count: number;
  userHasReacted: boolean;
}

export const EMOJI_MAP: Record<string, string> = {
  '👍': 'Thumbs Up',
  '👎': 'Thumbs Down',
  '😂': 'Tears of Joy',
  '😢': 'Loudly Crying Face',
  '🔥': 'Fire',
  '😈': 'Smiling Face with Horns',
  '🤯': 'Mind Blown',
};

export interface PostReactionsProps {
  reactions: Reaction[];
  onReactionClick: (emoji: string) => void;
  className?: string;
}

export function PostReactionList({ reactions, onReactionClick, className }: PostReactionsProps) {
  return (
    <div className={cn(
      className,
      reactions.length > 0 && 'flex items-center gap-2 flex-wrap'
    )}>
      {reactions.map(
        ({ emoji, count, userHasReacted }) =>
          count > 0 && (
            <Button
              key={emoji}
              variant={userHasReacted ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => onReactionClick(emoji)}
              className="rounded-full px-3 h-8"
            >
              <span className="mr-2 text-md">{emoji}</span>
              <span className="text-xs font-semibold">{count}</span>
            </Button>
          )
      )}
    </div>
  );
}

export function PostReactionTrigger({ onReactionClick, className }: { onReactionClick: (emoji: string) => void; className?: string }) {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className={cn('rounded-full h-8 w-8 border border-border', className)}>
              <SmilePlus className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add a reaction</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="p-2 w-auto border border-border">
        <div className="flex gap-2">
          {Object.keys(EMOJI_MAP).map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              size="icon"
              onClick={() => onReactionClick(emoji)}
              className="text-xl"
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Default export: all-in-one layout for backward compatibility
export default function PostReactions({ reactions, onReactionClick, className }: PostReactionsProps) {
  return (
    <div className={cn('flex items-center gap-2 mt-4 flex-wrap', className)}>
      {reactions.length > 0 && <PostReactionList reactions={reactions} onReactionClick={onReactionClick} />}
      <PostReactionTrigger onReactionClick={onReactionClick} />
    </div>
  );
} 