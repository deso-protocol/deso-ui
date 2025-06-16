'use client';

import React, { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ProfileDescriptionProps {
  publicKey: string;
  className?: string;
  lineClamp?: number;
  showMoreText?: string;
  showLessText?: string;
  formatted?: boolean;
}

/**
 * Formats a description string by converting URLs and @mentions to links and preserving line breaks.
 */
function formatDescription(text: string): React.ReactNode[] {
  // Convert URLs to links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Convert @mentions to links (assume /u/username route)
  const mentionRegex = /(^|\s)(@[a-zA-Z0-9_]+)/g;

  // Split by newlines to preserve line breaks
  return text.split(/\n/).map((line, i) => {
    // URLs
    let formatted = line.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    // Mentions
    formatted = formatted.replace(mentionRegex, (match, space, handle) => `${space}<a href="/u/${handle.slice(1)}" class="text-primary underline">${handle}</a>`);
    return <span key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
}

export const ProfileDescription = ({
  publicKey,
  className,
  lineClamp,
  showMoreText = 'Show more',
  showLessText = 'Show less',
  formatted = true,
}: ProfileDescriptionProps) => {
  const { profile, loading, error } = useProfile(publicKey);
  const [isExpanded, setIsExpanded] = useState(false);

  const description = profile?.description || '';

  // Only apply truncation logic if lineClamp is provided.
  const shouldTruncate =
    !!lineClamp && description.length > lineClamp * 50;

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-24 rounded"></div>
    );
  }

  if (error || !description) {
    return null;
  }

  const isCurrentlyClamped = shouldTruncate && !isExpanded;

  const style =
    isCurrentlyClamped && lineClamp
      ? {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical' as const,
          WebkitLineClamp: lineClamp,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }
      : {};

  return (
    <div className={cn('relative', className)}>
      <div style={style}>
        {formatted
          ? (isCurrentlyClamped
              ? formatDescription(description)
                  .slice(0, lineClamp ? lineClamp : undefined)
                  .map((el, i, arr) => [el, i < arr.length - 1 ? <br key={`br-${i}`} /> : null])
              : formatDescription(description).map((el, i, arr) => [el, i < arr.length - 1 ? <br key={`br-${i}`} /> : null])
            )
          : description}
      </div>
      {shouldTruncate && (
        <Button
          variant="link"
          className="p-0 h-auto text-sm underline mt-4 text-muted-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? showLessText : showMoreText}
        </Button>
      )}
    </div>
  );
}; 