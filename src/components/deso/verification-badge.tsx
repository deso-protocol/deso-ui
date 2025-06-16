'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, Shield, Star, Crown } from 'lucide-react';
import { cn } from '@/lib/utils/deso';

type BadgeStyle = 'default' | 'premium' | 'creator' | 'admin';
type BadgeSize = 'sm' | 'md' | 'lg';

interface VerificationBadgeProps {
  isVerified: boolean;
  style?: BadgeStyle;
  size?: BadgeSize;
  showTooltip?: boolean;
  tooltipText?: string;
  animated?: boolean;
  className?: string;
}

const badgeConfig = {
  default: {
    icon: CheckCircle,
    colors: 'bg-blue-500 hover:bg-blue-600 text-white',
    tooltip: 'Verified account',
  },
  premium: {
    icon: Star,
    colors: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white',
    tooltip: 'Premium verified account',
  },
  creator: {
    icon: Crown,
    colors: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
    tooltip: 'Verified creator',
  },
  admin: {
    icon: Shield,
    colors: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    tooltip: 'Platform administrator',
  },
} as const;

const sizeConfig = {
  sm: { badge: 'h-3 w-3', icon: 'h-2 w-2' },
  md: { badge: 'h-4 w-4', icon: 'h-3 w-3' },
  lg: { badge: 'h-5 w-5', icon: 'h-4 w-4' },
} as const;

export function VerificationBadge({
  isVerified,
  style = 'default',
  size = 'md',
  showTooltip = true,
  tooltipText,
  animated = true,
  className,
}: VerificationBadgeProps) {
  // Don't render if not verified
  if (!isVerified) {
    return null;
  }

  const config = badgeConfig[style];
  const sizeClasses = sizeConfig[size];
  const Icon = config.icon;
  const tooltip = tooltipText || config.tooltip;

  const badgeElement = (
    <Badge
      variant="secondary"
      className={cn(
        'p-0 rounded-full border-2 border-white transition-all duration-200',
        config.colors,
        sizeClasses.badge,
        animated && 'animate-in fade-in-0 zoom-in-95 duration-300',
        className
      )}
    >
      <Icon className={cn('text-current', sizeClasses.icon)} />
    </Badge>
  );

  if (!showTooltip) {
    return badgeElement;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeElement}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Export with display name for debugging
VerificationBadge.displayName = 'VerificationBadge'; 