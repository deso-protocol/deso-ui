'use client';

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatTimestamp } from '@/lib/utils/deso';
import { cn } from '@/lib/utils';

export interface TimestampProps {
  timestamp: string | Date;
  className?: string;
  format?: 'relative' | 'fullDate' | 'fullDateTime';
}

export function Timestamp({
  timestamp,
  className,
  format = 'relative',
}: TimestampProps) {
  const formatted = formatTimestamp(timestamp);
  const displayValue = formatted[format];
  const tooltipValue = formatted.fullDateTime;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              'cursor-default',
              className
            )}
          >
            {displayValue}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 