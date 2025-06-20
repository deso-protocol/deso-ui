'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/deso';
import { Button } from '@/components/ui/button';
import { UserInfo } from './user-info';
import { PostText } from './post-text';
import { PostEngagement } from './post-engagement';
import { Profile } from '@/lib/schemas/deso';
import ReactPlayer from 'react-player/lazy';
import { Timestamp } from './timestamp';

export interface VideoReelItem {
  id: string;
  videoUrl: string;
  publicKey: string;
  profile?: Profile;
  text?: string;
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    reposts: number;
    diamonds: number;
    diamondValue?: string;
    views: number;
  };
  isLiked?: boolean;
  isReposted?: boolean;
}

export interface VideoReelProps {
  videos: VideoReelItem[];
  variant?: 'single' | 'carousel' | 'carousel-with-arrows';
  className?: string;
  autoPlay?: boolean;
  showEngagement?: boolean;
  onLike?: (videoId: string) => void;
  onComment?: (videoId: string) => void;
  onRepost?: (videoId: string) => void;
  onDiamond?: (videoId: string) => void;
}

export function VideoReel({
  videos,
  variant = 'single',
  className,
  autoPlay = true,
  showEngagement = true,
  onLike,
  onComment,
  onRepost,
  onDiamond,
}: VideoReelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentVideo = videos[currentIndex];

  const handleScroll = (e: React.WheelEvent) => {
    if (variant === 'carousel' && videos.length > 1 && !isScrolling) {
      e.preventDefault();
      // Only change video if scroll is significant enough
      if (Math.abs(e.deltaY) > 50) {
        setIsScrolling(true);
        if (e.deltaY > 0 && currentIndex < videos.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
        // Reset scrolling flag after a delay
        setTimeout(() => setIsScrolling(false), 500);
      }
    }
  };

  const navigateUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const navigateDown = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (variant === 'carousel' || variant === 'carousel-with-arrows') {
      const container = containerRef.current;
      if (container) {
        const targetScrollTop = currentIndex * container.clientHeight;
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex, variant]);

  if (!currentVideo && variant === 'single') {
    return null;
  }

  const renderVideo = (video: VideoReelItem, index: number) => (
    <div
      key={video.id}
      className="relative w-full h-full bg-black"
    >
      {/* Video */}
      <div className="absolute inset-0">
        <ReactPlayer
          url={video.videoUrl}
          width="100%"
          height="100%"
          controls={false}
          playing={autoPlay}
          loop
          muted
          className={cn(
            'object-cover',
            variant === 'single' ? 'rounded-lg overflow-hidden' : ''
          )}
          style={{ 
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 via-black/80 to-transparent pointer-events-none" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex pointer-events-none">
        {/* Left side - User info and text */}
        <div className="flex-1 flex flex-col justify-end p-4 pointer-events-auto relative z-10">
          <div className="space-y-3 max-w-xs">
            <UserInfo
              publicKey={video.publicKey}
              profile={video.profile}
              pictureSize="md"
              className="text-white"
              usernameClassName="text-white font-semibold"
            >
              <Timestamp timestamp={video.timestamp} className="text-white/40 text-sm" />
            </UserInfo>
            {video.text && (
              <PostText
                text={video.text}
                className="text-white text-sm"
                lineClamp={3}
              />
            )}
          </div>
        </div>

        {/* Right side - Engagement */}
        {showEngagement && (
          <div className="flex flex-col justify-end items-center p-4 pb-20 space-y-4 pointer-events-auto relative z-10">
            <PostEngagement
              variant="like"
              count={video.engagement.likes}
              active={video.isLiked}
              onClick={() => onLike?.(video.id)}
              layout="column"
              size="md"
              className="text-white"
            />
            <PostEngagement
              variant="comment"
              count={video.engagement.comments}
              onClick={() => onComment?.(video.id)}
              layout="column"
              size="md"
              className="text-white"
            />
            <PostEngagement
              variant="repost"
              count={video.engagement.reposts}
              active={video.isReposted}
              onClick={() => onRepost?.(video.id)}
              layout="column"
              size="md"
              className="text-white"
            />
            <PostEngagement
              variant="diamond"
              count={video.engagement.diamonds}
              value={video.engagement.diamondValue}
              onClick={() => onDiamond?.(video.id)}
              layout="column"
              size="md"
              className="text-white"
            />
            <PostEngagement
              variant="view"
              count={video.engagement.views}
              layout="column"
              size="md"
              className="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );

  if (variant === 'single') {
    return (
      <div className={cn('w-full aspect-[9/16] max-w-sm mx-auto bg-black rounded-xl overflow-hidden relative', className)}>
        {renderVideo(currentVideo, 0)}
      </div>
    );
  }

  return (
    <div className={cn('relative w-full aspect-[9/16] overflow-hidden rounded-xl bg-black max-w-sm mx-auto', className)}>
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
        onWheel={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex flex-col">
          {videos.map((video, index) => (
            <div key={video.id} className="snap-start w-full aspect-[9/16]">
              {renderVideo(video, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {variant === 'carousel-with-arrows' && videos.length > 1 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateUp}
            disabled={currentIndex === 0}
            className="bg-black/30 text-white hover:bg-black/50 disabled:opacity-30"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateDown}
            disabled={currentIndex === videos.length - 1}
            className="bg-black/30 text-white hover:bg-black/50 disabled:opacity-30"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      )}


    </div>
  );
} 