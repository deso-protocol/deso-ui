'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
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
  variant?: 'single' | 'carousel' | 'carousel-with-arrows' | 'full-height';
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
  const [visibleVideoIds, setVisibleVideoIds] = useState<Set<string>>(new Set());
  const [pausedVideoIds, setPausedVideoIds] = useState<Set<string>>(new Set());
  const [showPlayIcon, setShowPlayIcon] = useState<Set<string>>(new Set());
  const [mutedVideoIds, setMutedVideoIds] = useState<Set<string>>(new Set(videos.map(v => v.id))); // Start all muted
  const [videoDurations, setVideoDurations] = useState<Map<string, number>>(new Map());
  const [videoProgress, setVideoProgress] = useState<Map<string, number>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const playerRefs = useRef<Map<string, any>>(new Map());
  const currentVideo = videos[currentIndex];

  const handleScroll = (e: React.WheelEvent) => {
    if ((variant === 'carousel' || variant === 'full-height') && videos.length > 1 && !isScrolling) {
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
    if (variant === 'carousel' || variant === 'carousel-with-arrows' || variant === 'full-height') {
      const container = containerRef.current;
      if (container) {
        const targetScrollTop = variant === 'full-height' 
          ? currentIndex * window.innerHeight 
          : currentIndex * container.clientHeight;
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex, variant]);

  // Set up intersection observer for video visibility
  useEffect(() => {
    if (variant === 'single') {
      // For single variant, always show the current video
      setVisibleVideoIds(new Set([currentVideo?.id].filter(Boolean)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleIds = new Set<string>();
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          if (videoId && entry.isIntersecting && entry.intersectionRatio > 0.5) {
            newVisibleIds.add(videoId);
          }
        });
        setVisibleVideoIds(newVisibleIds);
      },
      {
        root: containerRef.current,
        threshold: [0.5], // Video must be at least 50% visible
      }
    );

    // Observe all video elements
    videoRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos, variant, currentVideo?.id]);

  // Helper function to set video ref
  const setVideoRef = (videoId: string, element: HTMLDivElement | null) => {
    if (element) {
      videoRefs.current.set(videoId, element);
    } else {
      videoRefs.current.delete(videoId);
    }
  };

  // Helper function to set player ref
  const setPlayerRef = (videoId: string, player: any) => {
    if (player) {
      playerRefs.current.set(videoId, player);
    } else {
      playerRefs.current.delete(videoId);
    }
  };

  // Handle video duration
  const handleDuration = (videoId: string, duration: number) => {
    setVideoDurations(prev => new Map(prev).set(videoId, duration));
  };

  // Handle video progress
  const handleProgress = (videoId: string, progress: { played: number, playedSeconds: number }) => {
    setVideoProgress(prev => new Map(prev).set(videoId, progress.playedSeconds));
  };

  // Handle seeking
  const handleSeek = (videoId: string, seconds: number) => {
    const player = playerRefs.current.get(videoId);
    if (player) {
      player.seekTo(seconds, 'seconds');
    }
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle video click to play/pause
  const handleVideoClick = (videoId: string) => {
    const isPaused = pausedVideoIds.has(videoId);
    
    if (isPaused) {
      // Resume playing
      setPausedVideoIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
      // Hide play icon after a delay
      setShowPlayIcon(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    } else {
      // Pause video
      setPausedVideoIds(prev => {
        const newSet = new Set(prev).add(videoId);
        return newSet;
      });
      // Show play icon
      setShowPlayIcon(prev => new Set(prev).add(videoId));
    }
  };

  // Handle mute/unmute toggle
  const handleMuteToggle = (videoId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setMutedVideoIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  if (!currentVideo && variant === 'single') {
    return null;
  }

  const renderVideo = (video: VideoReelItem, index: number) => {
    const isVisible = visibleVideoIds.has(video.id);
    const isPaused = pausedVideoIds.has(video.id);
    const isMuted = mutedVideoIds.has(video.id);
    const shouldPlay = autoPlay && isVisible && !isPaused;
    const showIcon = showPlayIcon.has(video.id);

    return (
      <div
        key={video.id}
        ref={(el) => setVideoRef(video.id, el)}
        data-video-id={video.id}
        className="relative w-full h-full bg-black cursor-pointer"
        onClick={(e) => {
          // Only handle click if it's not on a UI element
          const target = e.target as HTMLElement;
          const isUIElement = target.closest('[data-ui-element="true"]') || 
                             target.closest('button') || 
                             target.closest('a') ||
                             target.closest('[role="button"]');
          
          if (!isUIElement) {
            handleVideoClick(video.id);
          }
        }}
      >
        {/* Video */}
        <div className="absolute inset-0">
          <ReactPlayer
            ref={(player) => setPlayerRef(video.id, player)}
            url={video.videoUrl}
            width="100%"
            height="100%"
            controls={false}
            playing={shouldPlay}
            loop
            muted={isMuted}
            onDuration={(duration) => handleDuration(video.id, duration)}
            onProgress={(progress) => handleProgress(video.id, progress)}
            progressInterval={100}
            className={cn(
              'object-cover',
              variant === 'single' ? 'rounded-lg overflow-hidden' : ''
            )}
            style={{ 
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Mute/Unmute Button */}
        <div className="absolute top-4 right-4 z-30 pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleMuteToggle(video.id, e);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="bg-black/50 text-white hover:bg-black/70 rounded-full h-10 w-10 backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Video Scrubber */}
        {(() => {
          const duration = videoDurations.get(video.id) || 0;
          const currentTime = videoProgress.get(video.id) || 0;
          const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

          return (
            <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto w-[70%]">
              <div className="flex items-center gap-2 text-white text-xs">
                <span className="min-w-[32px]">{formatTime(currentTime)}</span>
                <div className="flex-1 relative">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                      const newTime = parseFloat(e.target.value);
                      handleSeek(video.id, newTime);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="min-w-[32px]">{formatTime(duration)}</span>
              </div>
            </div>
          );
        })()}

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 via-black/80 to-transparent pointer-events-none" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex pointer-events-none">
          {/* Left side - User info and text */}
          <div className="flex-1 flex flex-col justify-end p-4  pb-14 pointer-events-auto relative z-20" >
            <div className="space-y-3 max-w-xs">
              <UserInfo
                publicKey={video.publicKey}
                profile={video.profile}
                pictureSize="md"
                className="!text-white [&_span]:!text-white"
                usernameClassName="!text-white font-semibold"
              >
                <Timestamp timestamp={video.timestamp} className="text-white/40 text-sm inline-block w-fit" />
              </UserInfo>
              {video.text && (
                <PostText
                  text={video.text}
                  className="!text-white text-sm [&_p]:!text-white [&_a]:!text-white"
                  lineClamp={3}
                />
              )}
            </div>
          </div>

          {/* Right side - Engagement */}
          {showEngagement && (
            <div className="flex flex-col justify-end items-center p-4 space-y-4 pointer-events-auto relative z-20">
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



        {/* Play/Pause Icon Overlay */}
        {(isPaused || showIcon) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
              {isPaused ? (
                <Play className="h-12 w-12 text-white fill-white" />
              ) : (
                <Pause className="h-12 w-12 text-white" />
              )}
            </div>
          </div>
        )}
    </div>
    );
  };

  if (variant === 'single') {
    return (
      <div className={cn('w-full aspect-[9/16] max-w-sm mx-auto bg-black rounded-xl overflow-hidden relative', className)}>
        {renderVideo(currentVideo, 0)}
      </div>
    );
  }

  // Full height variant
  if (variant === 'full-height') {
    return (
      <div className={cn('relative w-full h-screen overflow-hidden bg-black', className)}>
        <div
          ref={containerRef}
          className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
          onWheel={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex flex-col">
            {videos.map((video, index) => (
              <div key={video.id} className="snap-start w-full h-screen">
                {renderVideo(video, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Video Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl bg-black max-w-sm mx-auto">
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
      </div>

      {/* Navigation Arrows */}
      {variant === 'carousel-with-arrows' && videos.length > 1 && (
        <div className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateUp}
            disabled={currentIndex === 0}
            className="bg-black/10 text-foreground hover:bg-black/20 disabled:opacity-30 border"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateDown}
            disabled={currentIndex === videos.length - 1}
            className="bg-black/10 text-foreground hover:bg-black/20 disabled:opacity-30 border"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 