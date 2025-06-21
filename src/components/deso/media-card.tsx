import * as React from 'react';
import { cn, formatCount } from '@/lib/utils/deso';
import { ImageIcon, PlayCircle, ImagesIcon, Music } from 'lucide-react';
import { UserInfo } from './user-info';
import { ProfilePicture } from './profile-picture';
import { Timestamp } from './timestamp';
import { PostText } from './post-text';
import { PostEngagement } from './post-engagement';
import { Profile } from '@/lib/schemas/deso';
import ReactPlayer from 'react-player/lazy';

export type MediaType = 'image' | 'video' | 'audio' | 'carousel';

export interface MediaCardProps {
  id: string;
  imageUrl: string;
  mediaType: MediaType;
  viewCount: number;
  duration?: string; // Video duration in format like "40:22"
  showStats?: boolean;
  showDuration?: boolean;
  videoUrl?: string; // Optional video URL for hover preview
  
  // Content below the media
  publicKey: string;
  profile?: Profile;
  timestamp: Date | string;
  title: string;
  description?: string;
  
  onClick?: () => void;
  className?: string;
}

const mediaTypeConfig: {
  [key in MediaType]: {
    Icon: React.ComponentType<{ className?: string }>;
  };
} = {
  image: { Icon: ImageIcon },
  video: { Icon: PlayCircle },
  audio: { Icon: Music },
  carousel: { Icon: ImagesIcon },
};

export const MediaCard = ({
  id,
  imageUrl,
  mediaType,
  viewCount,
  duration,
  showStats = true,
  showDuration = true,
  videoUrl,
  publicKey,
  profile,
  timestamp,
  title,
  description,
  onClick,
  className,
}: MediaCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);
  const [fadeState, setFadeState] = React.useState<'thumbnail' | 'transitioning' | 'video'>('thumbnail');
  const { Icon } = mediaTypeConfig[mediaType];

  // Handle fade transitions when hovering
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isHovered && videoUrl && mediaType === 'video') {
      // Start fade out of thumbnail
      setFadeState('transitioning');
      timeoutId = setTimeout(() => {
        // Show video and fade in
        setShowVideo(true);
        setFadeState('video');
      }, 200); // 200ms for fade out, then show video
    } else {
      // Fade out video and show thumbnail
      if (showVideo) {
        setFadeState('transitioning');
        setTimeout(() => {
          setShowVideo(false);
          setFadeState('thumbnail');
        }, 200); // 200ms fade out before switching back
      } else {
        setFadeState('thumbnail');
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovered, videoUrl, mediaType, showVideo]);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Media Thumbnail */}
      <div 
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden">
          {/* Video Player - with fade transition */}
          {(showVideo || fadeState === 'transitioning') && videoUrl && mediaType === 'video' && (
            <div 
              className={cn(
                "absolute inset-0 bg-black group shadow-md transition-all duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                fadeState === 'video' ? 'opacity-100' : 'opacity-0'
              )}
            >
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                playing={showVideo}
                muted={true}
                controls={false}
                loop={true}
                className="absolute inset-0"
                style={{ 
                  objectFit: 'cover',
                }}
              />
              
              {/* Duration Overlay */}
              {showDuration && duration && (
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {duration}
                </div>
              )}
              
              {/* View Count Overlay */}
              {showStats && viewCount > 0 && (
                <div className="absolute bottom-4 right-4 z-10 opacity-100 transition-opacity">
                  <PostEngagement
                    variant="view"
                    count={viewCount}
                    className="text-white drop-shadow-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* Static Thumbnail - with fade transition */}
          <div 
            className={cn(
              "group relative w-full h-full shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              fadeState === 'thumbnail' ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={imageUrl}
              alt="Media content"
              className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 transition-opacity" />

            <div className="absolute bottom-4 left-4 z-10 opacity-100 transition-opacity">
              <Icon className="h-5 w-5 text-white drop-shadow-md" />
            </div>

            {showStats && (
              <div className="absolute bottom-4 right-4 z-10 opacity-100 transition-opacity">
                <PostEngagement
                  variant="view"
                  count={viewCount}
                  className="text-white drop-shadow-md"
                />
              </div>
            )}
            
            {/* Duration Overlay */}
            {showDuration && duration && mediaType === 'video' && (
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {duration}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Below */}
      <div className="flex gap-3 mt-2">
        
        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
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