import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface NavigationItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  unreadCount?: number;
}

export function NavigationItem({
  href,
  icon: Icon,
  label,
  isActive = false,
  unreadCount,
}: NavigationItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'flex items-center gap-3 rounded-full px-4 py-2 text-lg font-normal transition-colors',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'hover:bg-accent/50 text-muted-foreground hover:text-accent-foreground'
        )}
      >
        <Icon className="h-6 w-6" />
        <span>{label}</span>
        {unreadCount && unreadCount > 0 && (
          <Badge variant="destructive" className="ml-auto rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Link>
    </li>
  );
}

export interface NavigationListProps {
  items: NavigationItemProps[];
  className?: string;
}

export function NavigationList({ items, className }: NavigationListProps) {
  return (
    <nav className={cn('w-full', className)}>
      <ul className="space-y-1">
        {items.map((item) => (
          <NavigationItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
} 