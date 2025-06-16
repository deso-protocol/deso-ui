'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils/deso';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface CopyButtonProps {
  textToCopy: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  successTooltipText?: string;
  successLabel?: string;
}

export function CopyButton({ 
  textToCopy, 
  size = 'md', 
  label, 
  className,
  showTooltip = true,
  tooltipText = 'Copy to clipboard',
  successTooltipText = 'Copied!',
  successLabel,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const buttonContent = (
    <button
      onClick={handleCopy}
      className={cn(
        'cursor-pointer flex items-center gap-1 p-1 text-muted-foreground hover:text-foreground focus:outline-none',
        className
      )}
      aria-label={tooltipText}
    >
      {copied ? (
        <Check className={cn('text-green-500', iconSizes[size])} />
      ) : (
        <Copy className={iconSizes[size]} />
      )}
      {copied && successLabel && <span className="text-sm">{successLabel}</span>}
      {!copied && label && <span className="text-sm">{label}</span>}
    </button>
  );

  if (!showTooltip) {
    return buttonContent;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent>
          {copied ? successTooltipText : tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 