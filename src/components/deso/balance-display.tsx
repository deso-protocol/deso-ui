'use client';

import React from 'react';
import { useBalanceDisplay } from '@/hooks/useBalanceDisplay';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/deso';
import { AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface BalanceDisplayProps {
  publicKey?: string;
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
}

export function BalanceDisplay({ 
  publicKey, 
  className, 
  showLabel = true,
  variant = 'default' 
}: BalanceDisplayProps) {
  const { desoFormatted, usdFormatted, loading, error, desoAmount } = useBalanceDisplay(publicKey);

  if (!publicKey) {
    return null;
  }

  if (error) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
              <AlertCircle className="h-4 w-4" />
              {variant !== 'minimal' && <span className="text-sm">Balance unavailable</span>}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Failed to load balance: {error.message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (loading) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="space-y-1">
          {showLabel && variant === 'default' && (
            <Skeleton className="h-3 w-24" />
          )}
          <Skeleton className="h-4 w-16" />
          {variant !== 'minimal' && <Skeleton className="h-3 w-12" />}
        </div>
      </div>
    );
  }

  if (!desoFormatted) {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn('flex items-center gap-2 text-sm', className)}>
              <span className="font-medium">{desoFormatted}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p className="font-medium">{desoFormatted}</p>
              {usdFormatted && <p className="text-muted-foreground">{usdFormatted}</p>}
              <p className="text-xs text-muted-foreground mt-1">Available spending balance</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="text-right flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-0 flex-col">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-sm font-medium">
                      {desoFormatted}
                    </div>
                  </TooltipTrigger>
                  {desoAmount !== null && desoAmount < 0.01 && (
                    <TooltipContent>
                      <span>Full value: {desoAmount.toFixed(8)} DESO</span>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <div className="text-xs text-muted-foreground">{usdFormatted}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div>
        {showLabel && (
          <div className="text-xs text-muted-foreground">Available Spending Balance</div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm font-medium">
                {desoFormatted}
              </div>
            </TooltipTrigger>
            {desoAmount !== null && desoAmount < 0.01 && (
              <TooltipContent>
                <span>Full value: {desoAmount.toFixed(8)} DESO</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {usdFormatted && (
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            {usdFormatted}
          </div>
        )}
      </div>
    </div>
  );
} 