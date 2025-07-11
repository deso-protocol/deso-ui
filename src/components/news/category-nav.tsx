'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import { useFeedPreferences } from '@/hooks/useFeedPreferences';

export const CategoryNav = () => {
  const pathname = usePathname();
  const { preferences } = useFeedPreferences();
  
  const activeCategoryName = pathname.split('/')[1] || 'general';
  const hasCustomFeeds = preferences.some(p => p.isCustom);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((category) => (
          <Button
            key={category.name}
            variant={activeCategoryName.toLowerCase() === category.name.toLowerCase() ? 'default' : 'outline'}
            size="sm"
            asChild
            className="rounded-full px-4 py-2 transition-all"
          >
            <Link href={category.path}>
              {category.emoji}
              <span className="ml-2 hidden sm:inline">{category.name}</span>
            </Link>
          </Button>
        ))}

        {hasCustomFeeds && (
          <Button
            variant={activeCategoryName.toLowerCase() === 'custom' ? 'default' : 'outline'}
            size="sm"
            asChild
            className="rounded-full px-4 py-2 transition-all"
          >
            <Link href="/custom">
              <span role="img" aria-label="custom">🎨</span>
              <span className="ml-2 hidden sm:inline">Custom</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}; 