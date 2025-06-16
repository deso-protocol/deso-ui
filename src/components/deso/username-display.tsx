'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useUsername } from '@/hooks/useProfile';
import { cn, truncateText } from '@/lib/utils/deso';
import { CopyButton } from './copy-button';
import { VerificationBadge } from './verification-badge';

export interface UsernameDisplayProps {
  publicKey: string;
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
  const { data, loading, error } = useUsername(publicKey);
  const username = data?.accountByPublicKey?.username;

  const handleClick = () => {
    if (linkToProfile && username) {
      window.open(`https://diamondapp.com/u/${username}`, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  if (loading) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Skeleton className="h-4 w-20" />
        {showVerification && isVerified && <Skeleton className="h-4 w-4 rounded-full" />}
      </div>
    );
  }

  if (error || !username) {
    return (
      <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
        <span className="text-sm">{username || ''}</span>
      </div>
    );
  }

  const prefix = variant === 'social' ? '@' : variant === 'token' ? '$' : '';
  let displayText = `${prefix}${username}`;
  if (truncate) {
    displayText = truncateText(displayText, maxLength);
  }

  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-2', className)}>
        <div
          className={cn(
            'flex items-center gap-1',
            (onClick || linkToProfile) && 'cursor-pointer hover:opacity-80 transition-opacity'
          )}
          onClick={handleClick}
        >
          <span className="font-semibold text-foreground">{displayText}</span>
          {showVerification && isVerified && (
            <VerificationBadge isVerified={true} size="lg" />
          )}
        </div>

        {showCopyButton && username && <CopyButton textToCopy={username} size="sm" />}
      </div>
    </TooltipProvider>
  );
}

UsernameDisplay.displayName = 'UsernameDisplay'; 