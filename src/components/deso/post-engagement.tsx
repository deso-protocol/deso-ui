import * as React from 'react';
import {
  Heart,
  MessageSquare,
  Repeat2,
  BarChart2,
  LucideIcon,
  Gem,
} from 'lucide-react';
import { cn } from '@/lib/utils/deso';
import NumberFlow, { continuous, type Format } from '@number-flow/react';

type EngagementVariant =
  | 'like'
  | 'repost'
  | 'comment'
  | 'diamond'
  | 'view'

interface PostEngagementProps {
  variant: EngagementVariant;
  count: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  value?: string;
  abbreviate?: boolean;
  decimals?: number;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'row' | 'column';
}

const variantConfig: {
    [key in EngagementVariant]: {
    Icon: LucideIcon;
    activeColor?: string;
    fillClass?: string;
    hoverBgClass?: string;
  };
} = {
  comment: {
    Icon: MessageSquare,
    activeColor: 'text-blue-500',
    hoverBgClass: 'hover:before:bg-blue-500/10',
  },
  like: {
    Icon: Heart,
    activeColor: 'text-pink-500',
    fillClass: 'fill-pink-500',
    hoverBgClass: 'hover:before:bg-pink-500/10',
  },
  repost: {
    Icon: Repeat2,
    activeColor: 'text-green-500',
    hoverBgClass: 'hover:before:bg-green-500/10',
  },
  diamond: {
    Icon: Gem,
    activeColor: 'text-blue-400',
    hoverBgClass: 'hover:before:bg-blue-400/10',
  },
  view: { Icon: BarChart2 },
};

export function PostEngagement({
  variant,
  count,
  active = false,
  onClick,
  className,
  value,
  abbreviate = true,
  decimals = 1,
  size = 'sm',
  layout = 'row',
}: PostEngagementProps) {
  const config = variantConfig[variant];

  const numberFormat: Format = {
    notation: abbreviate ? 'compact' : 'standard',
    compactDisplay: 'short',
    maximumFractionDigits: decimals,
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick && variant !== 'view'}
      className={cn(
        'group cursor-pointer relative flex items-center text-muted-foreground transition-colors',
        layout === 'row' ? 'gap-1.5' : 'flex-col gap-1',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base',
        'disabled:pointer-events-none disabled:opacity-50',
        onClick && 'hover:text-foreground',
        { [config.activeColor!]: active && config.activeColor },
        className
      )}
    >
      <div
        className={cn(
          "relative rounded-full before:content-[''] before:absolute before:-inset-1.5 before:rounded-full before:transition-colors",
          config.hoverBgClass
        )}
      >
        <config.Icon
          className={cn('transition-transform group-active:scale-90', {
            [config.fillClass!]: active && config.fillClass, 
            'h-5 w-5': size === 'sm',
            'h-6 w-6': size === 'md',
            'h-7 w-7': size === 'lg',
          })}
        />
      </div>

      {(count > 0 || variant === 'view') && (
        <NumberFlow
          value={count}
          format={numberFormat}
          plugins={[continuous]}
          className={cn(layout === 'column' && 'text-center')}
        />
      )}
      {value && (
        <span className={cn(
          "text-muted-foreground/80", 
          size === 'sm' && 'text-xs', 
          size === 'md' && 'text-sm', 
          size === 'lg' && 'text-base',
          layout === 'column' && 'text-center'
        )}>{value}</span>
      )}
    </button>
  );
} 