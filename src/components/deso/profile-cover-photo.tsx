'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils/deso';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type AspectRatioString = '16:9' | '3:1' | '2:1' | '4:3';
type GradientColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'random';

interface ProfileCoverPhotoProps {
  publicKey: string;
  aspectRatio?: AspectRatioString;
  fallbackGradient?: GradientColor;
  showOverlay?: boolean;
  overlayOpacity?: number;
  enableParallax?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Aspect ratio configurations
const aspectRatioConfig = {
  '16:9': 'aspect-video',
  '3:1': 'aspect-[3/1]',
  '2:1': 'aspect-[2/1]',
  '4:3': 'aspect-[4/3]',
} as const;

// Gradient configurations
const gradientConfig = {
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
  green: 'bg-gradient-to-br from-green-400 to-green-600',
  orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
  random: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400',
} as const;

const getAspectRatioValue = (ratio: AspectRatioString): number => {
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
};

export function ProfileCoverPhoto({
  publicKey,
  aspectRatio = '16:9',
  fallbackGradient = 'blue',
  showOverlay = false,
  overlayOpacity = 0.3,
  enableParallax = false,
  className,
  children,
}: ProfileCoverPhotoProps) {
  // Fetch profile data using Apollo Client
  const { profile, loading, error } = useProfile(publicKey);

  // Use FeaturedImageURL from extraData for the cover photo
  const featuredImage = profile?.extraData?.FeaturedImageURL;
  const aspectClass = aspectRatioConfig[aspectRatio];
  const gradientClass = gradientConfig[fallbackGradient];

  const aspectRatioValue = getAspectRatioValue(aspectRatio);

  if (loading) {
    return (
      <AspectRatio ratio={aspectRatioValue}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>
    );
  }

  if (error || !featuredImage) {
    return (
      <AspectRatio ratio={aspectRatioValue}>
        <div className="w-full h-full bg-slate-200" />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio
      ratio={aspectRatioValue}
      className={cn(
        'relative w-full h-full overflow-hidden rounded-lg',
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${featuredImage}")` }}
      />
      {showOverlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
          {children}
    </AspectRatio>
  );
}

// Export with display name for debugging
ProfileCoverPhoto.displayName = 'ProfileCoverPhoto'; 