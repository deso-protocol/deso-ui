'use client';

import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
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

export const PostReactions: React.FC<PostReactionsProps> = ({
  reactions,
  onReactionClick,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2 mt-4 flex-wrap', className)}>
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

      <Popover>
        <Tooltip>
            <TooltipTrigger asChild>
							<PopoverTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full h-8 w-8 border">
										<SmilePlus className="h-4 w-4 text-muted-foreground" />
								</Button>
							</PopoverTrigger>
            </TooltipTrigger>
          <TooltipContent>
            <p>Add a reaction</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-2 w-auto">
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
    </div>
  );
}; 