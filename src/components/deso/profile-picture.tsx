'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfilePicture } from '@/hooks/useProfile';
import { cn, getUsernameInitial, getSingleProfilePictureUrl, buildProfilePictureUrl } from '@/lib/utils/deso';

// Size configurations
const sizeConfig = {
  xxs: { avatar: 'h-4 w-4', text: 'text-xs' },
  xs: { avatar: 'h-6 w-6', text: 'text-xs' },
  sm: { avatar: 'h-8 w-8', text: 'text-sm' },
  md: { avatar: 'h-10 w-10', text: 'text-base' },
  lg: { avatar: 'h-12 w-12', text: 'text-lg' },
  xl: { avatar: 'h-16 w-16', text: 'text-xl' },
} as const;

interface ProfilePictureComponentProps {
  publicKey: string;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  lazy?: boolean;
  variant?: 'default' | 'nft' | 'highres';
  shape?: 'circle' | 'rounded' | 'square';
  border?: 'none' | 'gradient' | 'solid';
}

export function ProfilePicture({
  publicKey,
  size = 'md',
  className,
  onClick,
  lazy = true,
  variant = 'default',
  shape = 'circle',
  border = 'none',
}: ProfilePictureComponentProps) {
  const { data, loading, error } = useProfilePicture(publicKey);
  const profile = data?.accountByPublicKey;
  const extraData = profile?.extraData || {};
  const sizeClasses = sizeConfig[size];

  const shapeStyle =
    variant === 'nft'
      ? 'nft-hexagon'
      : shape === 'square'
      ? 'rounded-none'
      : shape === 'rounded'
      ? 'rounded-xl'
      : 'rounded-full';

  const initialProfilePicUrl = buildProfilePictureUrl(profile?.profilePic, extraData, variant) || getSingleProfilePictureUrl(publicKey);
  const [imgSrc, setImgSrc] = useState<string | undefined>(initialProfilePicUrl);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setImgSrc(initialProfilePicUrl);
    setTriedFallback(false);
  }, [initialProfilePicUrl]);

  const fallbackInitial = profile?.username
    ? getUsernameInitial(profile.username)
    : publicKey
      ? publicKey[0].toUpperCase()
      : '?';

  const handleImgError = () => {
    if (!triedFallback) {
      setImgSrc(getSingleProfilePictureUrl(publicKey));
      setTriedFallback(true);
    } else {
      setImgSrc(undefined);
    }
  };
  
  const innerContent = (
    loading ? (
      <Skeleton className={cn('w-full h-full', shapeStyle)} />
    ) : (error || !imgSrc) ? (
      <div
        className={cn(
          'flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-400 to-gray-600',
          shapeStyle
        )}
      >
        <span className={cn('text-white font-semibold', sizeClasses.text)}>
          {error ? '?' : fallbackInitial}
        </span>
      </div>
    ) : (
      <Avatar className={cn('w-full h-full', shapeStyle)}>
        <AvatarImage
          src={imgSrc}
          alt={`${profile?.username || 'User'}'s profile picture`}
          loading={lazy ? 'lazy' : 'eager'}
          className={cn('object-cover', shapeStyle)}
          onError={handleImgError}
        />
        <AvatarFallback className={cn('bg-gradient-to-br from-blue-500 to-purple-600', shapeStyle)}>
          <span className={cn('text-white font-semibold', sizeClasses.text)}>
            {fallbackInitial}
          </span>
        </AvatarFallback>
      </Avatar>
    )
  );
  
  const borderGradientClass = 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500';
  const borderSolidClass = 'bg-neutral-200';

  let containerClasses = cn(sizeClasses.avatar, className);

  if (border === 'gradient') {
    containerClasses = cn('p-0.5', borderGradientClass, shapeStyle, sizeClasses.avatar, className);
  } else if (border === 'solid') {
    containerClasses = cn('p-px', borderSolidClass, shapeStyle, sizeClasses.avatar, className);
  }

  return (
    <div className={containerClasses} onClick={onClick}>
      {innerContent}
    </div>
  );
}

ProfilePicture.displayName = 'ProfilePicture'; 