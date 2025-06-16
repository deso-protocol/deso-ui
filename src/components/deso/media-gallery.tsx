import * as React from 'react';
import { VirtuosoMasonry } from '@virtuoso.dev/masonry';
import { MediaCard, MediaType } from './media-card';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  imageUrl: string;
  mediaType: MediaType;
  viewCount: number;
}

interface MediaGalleryProps {
  mediaItems: MediaItem[];
  onMediaClick?: (id: string) => void;
  className?: string;
  variant?: 'grid' | 'masonry';
}

const MasonryItem = ({
  data,
  context,
}: {
  data: unknown;
  context: unknown;
}) => {
  const item = data as MediaItem;
  const { onMediaClick } = context as {
    onMediaClick?: (id: string) => void;
  };
  return (
    <div className="p-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
      <MediaCard
        key={item.id}
        imageUrl={item.imageUrl}
        mediaType={item.mediaType}
        viewCount={item.viewCount}
        onClick={() => onMediaClick?.(item.id)}
      />
    </div>
  );
};

export const MediaGallery = ({
  mediaItems,
  onMediaClick,
  className,
  variant = 'grid',
}: MediaGalleryProps) => {
  if (variant === 'masonry') {
    return (
      <VirtuosoMasonry
        data={mediaItems}
        context={{ onMediaClick }}
        ItemContent={MasonryItem}
        className={cn('flex flex-wrap gap-1', className)}
        columnCount={4}
      />
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-0.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        className
      )}
    >
      {mediaItems.map((item) => (
        <MediaCard
          key={item.id}
          imageUrl={item.imageUrl}
          mediaType={item.mediaType}
          viewCount={item.viewCount}
          onClick={() => onMediaClick?.(item.id)}
          className="aspect-square"
        />
      ))}
    </div>
  );
}; 