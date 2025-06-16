'use client';

import React from 'react';
import { Users, User, BadgeDollarSign } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cn, formatCount, pluralize } from '@/lib/utils/deso';

type StatVariant = 'followers' | 'following' | 'subscribers';

export interface ProfileStatProps {
  variant?: StatVariant;
  count: number;
  label?: string;
  Icon?: React.FC<LucideProps>;
  className?: string;
  abbreviate?: boolean;
  decimals?: number;
}

const variantConfig = {
  followers: {
    label: 'Follower',
    Icon: Users,
  },
  following: {
    label: 'Following',
    Icon: User,
  },
  subscribers: {
    label: 'Subscriber',
    Icon: BadgeDollarSign,
  },
} as const;

export function ProfileStat({
  variant,
  count,
  label: labelOverride,
  Icon: IconOverride,
  className,
  abbreviate = true,
  decimals = 2,
}: ProfileStatProps) {
  const config = variant ? variantConfig[variant] : null;

  const Icon = IconOverride || (config ? config.Icon : null);
  
  let label = labelOverride;
  if (!label && config) {
    if (variant === 'following') {
      label = config.label;
    } else {
      label = pluralize(count, config.label);
    }
  }

  return (
    <div className={cn('flex items-center gap-1.5 text-sm text-foreground', className)}>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <span className="font-bold">{formatCount(count, abbreviate, decimals)}</span>
      {label && <span className="text-muted-foreground">{label}</span>}
    </div>
  );
} 