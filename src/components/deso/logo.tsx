'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '@/lib/utils/deso';

export interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  width = 120,
  height = 40,
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we're in dark mode
  const getDarkMode = () => {
    if (!mounted) {
      // During SSR/initial render, check if document has dark class
      if (typeof document !== 'undefined') {
        return document.documentElement.classList.contains('dark');
      }
      return false;
    }
    
    // Use resolvedTheme which handles system preference, fallback to theme
    const currentTheme = resolvedTheme || theme;
    return currentTheme === 'dark';
  };

  const isDark = getDarkMode();

  // Show a placeholder during initial render to avoid hydration mismatch
  if (!mounted) {
    return (
      <div 
        className={cn('relative bg-muted animate-pulse rounded', className)} 
        style={{ width, height }}
      />
    );
  }

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      <Image
        src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
        alt="DeSo Logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}; 