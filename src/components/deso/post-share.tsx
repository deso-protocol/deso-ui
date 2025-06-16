'use client';

import React from 'react';
import { ActionMenu, ActionMenuItem } from './action-menu';
import { Button } from '../ui/button';
import { Share } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PostShareProps {
  url: string;
  text: string;
  className?: string;
}

export const PostShare: React.FC<PostShareProps> = ({ url, text, className }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    // You can add a toast notification here
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <ActionMenu
      trigger={
        <Button variant="ghost" size="icon" className={cn(className)}>
          <Share className="h-4 w-4" />
        </Button>
      }
      align="end"
    >
      <ActionMenuItem onClick={handleCopy}>Copy Link</ActionMenuItem>
      <ActionMenuItem
        onClick={() =>
          handleShare(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
          )
        }
      >
        Share to X (Twitter)
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() =>
          handleShare(
            `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
          )
        }
      >
        Share to Telegram
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() =>
          handleShare(
            `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`
          )
        }
      >
        Share to Reddit
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() =>
          handleShare(`mailto:?subject=${encodedText}&body=${encodedUrl}`)
        }
      >
        Share via E-Mail
      </ActionMenuItem>
    </ActionMenu>
  );
}; 