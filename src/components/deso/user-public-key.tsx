'use client';

import React from 'react';
import { cn, truncateMiddle } from '@/lib/utils/deso';
import { CopyButton } from './copy-button';

export interface UserPublicKeyProps {
  publicKey: string;
  className?: string;
  truncate?: boolean;
  startChars?: number;
  endChars?: number;
  showCopyButton?: boolean;
}

export function UserPublicKey({
  publicKey,
  className,
  truncate = false,
  startChars = 6,
  endChars = 6,
  showCopyButton = true,
}: UserPublicKeyProps) {
  const displayKey = truncate
    ? truncateMiddle(publicKey, startChars, endChars)
    : publicKey;

  return (
    <div className={cn('flex items-center gap-1 font-mono text-sm', className)}>
      <span>{displayKey}</span>
      {showCopyButton && <CopyButton textToCopy={publicKey} size="sm" />}
    </div>
  );
} 