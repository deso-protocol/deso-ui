import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface ProfileTagProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  link?: string;
  asChild?: boolean;
}

export const ProfileTag = ({
  icon,
  children,
  className,
  link,
  ...props
}: ProfileTagProps) => {
  return (
    link ? (
      <Link href={link || ''} className="hover:underline" target="_blank" rel="noopener noreferrer">
      <Badge
        variant="outline"
        className={cn(
          'text-xs font-medium text-muted-foreground gap-1.5',
          className
        )}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </Badge>
    </Link>
    ) : (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-medium text-muted-foreground gap-1.5',
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </Badge>
    )
  );
}; 