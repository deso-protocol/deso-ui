'use client';

import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { cn } from '@/lib/utils';

export interface PostVideoProps {
  url: string;
  className?: string;
}

export const PostVideo: React.FC<PostVideoProps> = ({ url, className }) => {
  return (
    <div
      className={cn('mt-2 rounded-lg overflow-hidden border', className)}
    >
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          className="absolute top-0 left-0"
          url={url}
          width="100%"
          height="100%"
          controls
        />
      </div>
    </div>
  );
}; 