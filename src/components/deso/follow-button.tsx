'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/deso';
import { UserPlus, UserMinus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface FollowButtonProps {
  isFollowing?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'icon' | 'icon-only';
  showTooltip?: boolean;
  tooltipText?: string;
  unfollowTooltipText?: string;
}

export function FollowButton({
  isFollowing: initialIsFollowing = false,
  className,
  onClick,
  variant = 'default',
  showTooltip = false,
  tooltipText = 'Follow',
  unfollowTooltipText = 'Unfollow',
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
    if (onClick) {
      onClick();
    }
  };

  let buttonText = 'Follow';
  let buttonVariant: 'default' | 'outline' | 'destructive' = 'default';
  let Icon = UserPlus;
  let currentTooltipText = tooltipText;

  if (isFollowing) {
    buttonText = isHovering ? 'Unfollow?' : 'Following';
    buttonVariant = isHovering ? 'destructive' : 'outline';
    Icon = isHovering ? UserMinus : UserPlus;
    currentTooltipText = isHovering ? unfollowTooltipText : 'Following';
  }
  
  const showIcon = variant === 'icon' || variant === 'icon-only';
  const showText = variant === 'default' || variant === 'icon';

  const buttonContent = (
    <Button
      variant={buttonVariant}
      className={cn('transition-all duration-200 flex items-center gap-2', className)}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showIcon && <Icon className="h-4 w-4" />}
      {showText && <span>{buttonText}</span>}
    </Button>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent>
            <p>{currentTooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return buttonContent;
} 