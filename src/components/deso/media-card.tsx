import * as React from 'react';
import { cn, formatCount } from '@/lib/utils/deso';
import { MediaItem, MediaType } from './media-item';
import { UserInfo } from './user-info';
import { ProfilePicture } from './profile-picture';
import { Timestamp } from './timestamp';
import { PostText } from './post-text';
import { Profile } from '@/lib/schemas/deso';

export interface MediaCardProps {
  id: string;
  imageUrl: string;
  mediaType: MediaType;
  viewCount: number;
  duration?: string; // Video duration in format like "40:22"
  showStats?: boolean;
  showDuration?: boolean;
  
  // Content below the media
  publicKey: string;
  profile?: Profile;
  timestamp: Date | string;
  title: string;
  description?: string;
  
  onClick?: () => void;
  className?: string;
}

export const MediaCard = ({
  id,
  imageUrl,
  mediaType,
  viewCount,
  duration,
  showStats = true,
  showDuration = true,
  publicKey,
  profile,
  timestamp,
  title,
  description,
  onClick,
  className,
}: MediaCardProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Media Thumbnail */}
      <div className="relative">
        <MediaItem
          imageUrl={imageUrl}
          mediaType={mediaType}
          viewCount={showStats ? viewCount : 0}
          onClick={onClick}
          className="rounded-lg aspect-video"
        />
        
        {/* Duration Overlay */}
        {showDuration && duration && mediaType === 'video' && (
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
      </div>
      
      {/* Content Below */}
      <div className="flex gap-3">
        
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            {/* Title */}
            <h3 className="font-bold text-sm leading-tight line-clamp-2">
              {title}
            </h3>
          </div>                 
          
          {/* Description */}
          {description && (
            <PostText
              text={description}
              variant="simple"
              className="text-sm text-muted-foreground [&_p]:!text-muted-foreground"
              lineClamp={2}
            />
          )}

           {/* Channel Name and Timestamp */}
           <div className="items-center gap-1 text-xs text-muted-foreground my-2">
            <UserInfo
              publicKey={publicKey}
              profile={profile}
              pictureSize="sm"
              showVerification={true}
              gap="md"
              className="text-xs"
              usernameClassName="text-muted-foreground hover:text-foreground"
            >
              <div className="flex items-center gap-1"> 
                <Timestamp timestamp={timestamp} className="text-muted-foreground" />• <span className="text-muted-foreground"> {formatCount(viewCount)} views</span>
              </div>
            </UserInfo>
          </div>
        </div>
      </div>
    </div>
  );
}; 