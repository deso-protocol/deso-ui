'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useProfile } from '@/hooks/useProfile';
import { cn, truncateText } from '@/lib/utils/deso';
import { CopyButton } from './copy-button';
// import { VerificationBadge } from './verification-badge';
import Link from 'next/link';
import { Profile } from '@/lib/schemas/deso';

export interface UsernameDisplayProps {
  publicKey: string;
  profile?: Profile;
  isVerified?: boolean;
  showVerification?: boolean;
  truncate?: boolean;
  maxLength?: number;
  className?: string;
  onClick?: () => void;
  showCopyButton?: boolean;
  linkToProfile?: boolean;
  variant?: 'social' | 'token';
}

export function UsernameDisplay({
  publicKey,
  profile: profileProp,
  isVerified = false,
  showVerification = true,
  truncate = false,
  maxLength = 20,
  className,
  onClick,
  showCopyButton = false,
  linkToProfile = false,
  variant,
}: UsernameDisplayProps) {
  // Only fetch profile if not provided as prop
  const shouldFetchProfile = !profileProp;
  const {
    profile: fetchedProfile,
    loading,
    error,
  } = useProfile(shouldFetchProfile ? publicKey : '');

  const profile = profileProp || fetchedProfile;
  const username = profile?.username;
  const verificationStatus = isVerified || profile?.isVerified;

  const handleClick = (e: React.MouseEvent) => {
    if (linkToProfile && username) {
      e.preventDefault();
      // This will navigate to the user's page within the app
    } else if (onClick) {
      onClick();
    }
  };

  if (shouldFetchProfile && loading) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Skeleton className="h-4 w-20" />
        {showVerification && verificationStatus && <Skeleton className="h-4 w-4 rounded-full" />}
      </div>
    );
  }

  if ((shouldFetchProfile && error) || !username) {
    return (
      <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
        <span className="text-sm">{truncateText(publicKey, 12)}</span>
      </div>
    );
  }

  const prefix = variant === 'social' ? '@' : variant === 'token' ? '$' : '';
  let displayText = `${prefix}${username}`;
  if (truncate) {
    displayText = truncateText(displayText, maxLength);
  }

  const content = (
    <div
      className={cn(
        'flex items-center gap-1',
        (onClick || linkToProfile) && 'cursor-pointer hover:opacity-80 transition-opacity'
      )}
      onClick={handleClick}
    >
      <span className="font-semibold text-foreground">{displayText}</span>
      {showVerification && verificationStatus && (
        // <VerificationBadge isVerified={true} size="lg" />
        <span>(V)</span> // Placeholder
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-2', className)}>
        {linkToProfile && username ? (
          <Link href={`/${username}`} passHref>
            {content}
          </Link>
        ) : (
          content
        )}

        {showCopyButton && username && <CopyButton textToCopy={username} size="sm" />}
      </div>
    </TooltipProvider>
  );
}

UsernameDisplay.displayName = 'UsernameDisplay'; 