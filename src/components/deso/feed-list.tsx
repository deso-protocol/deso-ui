import React from 'react';
import { PostCard, PostCardProps } from './post-card';
import { cn } from '@/lib/utils';

export interface FeedListProps {
  posts: PostCardProps[];
  variant?: 'cards' | 'seamless';
  className?: string;
  gap?: number;
}

export const FeedList: React.FC<FeedListProps> = ({
  posts,
  variant = 'cards',
  className,
  gap = 16,
}) => {
  if (variant === 'seamless') {
    return (
      <div
        className={cn(
          'w-full max-w-2xl mx-auto border',
          className
        )}
      >
        {posts.map((post, index) => (
          <PostCard
            key={`${post.publicKey}-${post.timestamp?.toString()}-${index}`}
            {...post}
            className={cn(
              'border-x-0 border-t-0 shadow-none rounded-none',
              index < posts.length - 1 ? 'border-b border-border' : 'border-b-0',
            )}
          />
        ))}
      </div>
    );
  }

  // Default to 'cards' variant
  return (
    <div className={cn('flex flex-col', className)} style={{ gap: `${gap}px` }}>
      {posts.map((post, index) => (
        <PostCard
          key={`${post.publicKey}-${post.timestamp?.toString()}-${index}`}
          {...post}
        />
      ))}
    </div>
  );
}; 