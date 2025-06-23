import * as React from 'react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import { MediaItem, MediaType } from './media-item';
import { cn } from '@/lib/utils/deso';
import 'react-photo-album/masonry.css';

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
  columns?: number;
  columnGap?: number;
  mediaItemClassName?: string;
}

// Convert MediaItem to react-photo-album Photo format
const convertToPhotos = (mediaItems: MediaItem[]) => {
  return mediaItems.map((item) => ({
    src: item.imageUrl,
    width: 300, // Base width for calculations
    height: getHeightFromUrl(item.imageUrl), // Extract height from URL
    key: item.id,
    mediaType: item.mediaType,
    viewCount: item.viewCount,
  }));
};

const columnClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

// Extract height from Picsum URL format
const getHeightFromUrl = (url: string): number => {
  const match = url.match(/\/(\d+)\/(\d+)$/);
  if (match) {
    return parseInt(match[2], 10);
  }
  return 300; // fallback height
};

export const MediaGallery = ({
  mediaItems,
  onMediaClick,
  className,
  mediaItemClassName,
  variant = 'grid',
  columns = 6,
  columnGap = 4,
}: MediaGalleryProps) => {
  if (variant === 'masonry') {
    const photos = convertToPhotos(mediaItems);
    
    return (
      <div className={className}>
        <MasonryPhotoAlbum
          photos={photos}
          spacing={8}
          columns={(containerWidth) => {
            if (containerWidth < 640) return 2;
            if (containerWidth < 768) return 3;
            if (containerWidth < 1024) return 4;
            if (containerWidth < 1280) return 5;
            return 6;
          }}
          render={{
            photo: ({ onClick }, { photo, width, height }) => {
              const mediaItem = mediaItems.find(item => item.id === photo.key);
              if (!mediaItem) return null;
              
              return (
                <div style={{ width, height, position: 'relative' }}>
                  <MediaItem
                    imageUrl={mediaItem.imageUrl}
                    mediaType={mediaItem.mediaType}
                    viewCount={mediaItem.viewCount}
                    className={mediaItemClassName}
                    onClick={() => onMediaClick?.(mediaItem.id)}
                  />
                </div>
              );
            },
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{ gap: `${columnGap}px` }}
      className={cn(
        `grid ${columnClasses[columns as keyof typeof columnClasses]} `,
        className
      )}
    >
      {mediaItems.map((item) => (
        <MediaItem
          key={item.id}
          imageUrl={item.imageUrl}
          mediaType={item.mediaType}
          viewCount={item.viewCount}
          onClick={() => onMediaClick?.(item.id)}
          className={cn("aspect-square", mediaItemClassName)}
        />
      ))}
    </div>
  );
}; 