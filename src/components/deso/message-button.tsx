'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/deso';
import { Mail } from 'lucide-react';

export interface MessageButtonProps {
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'icon' | 'icon-only';
  showTooltip?: boolean;
  tooltipText?: string;
}

export function MessageButton({
  className,
  onClick,
  variant = 'default',
  showTooltip = false,
  tooltipText = 'Send Message',
}: MessageButtonProps) {
  const showIcon = variant === 'icon' || variant === 'icon-only';
  const showText = variant === 'default' || variant === 'icon';

  const buttonContent = (
    <Button
      variant="outline"
      className={cn('transition-all duration-200 flex items-center gap-2', className)}
      onClick={onClick}
    >
      {showIcon && <Mail className="h-4 w-4" />}
      {showText && <span>Message</span>}
    </Button>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
} 