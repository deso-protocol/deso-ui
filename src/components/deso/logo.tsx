'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  const { theme } = useTheme();

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      <Image
        src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
        alt="DeSo Logo"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}; 