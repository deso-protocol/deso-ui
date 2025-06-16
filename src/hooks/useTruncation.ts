'use client';

import { useState, useMemo } from 'react';

export interface UseTruncationProps {
  text: string;
  lineClamp?: number;
}

export const useTruncation = ({ text, lineClamp }: UseTruncationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = useMemo(() => {
    if (!lineClamp) return false;
    // A simple approximation. The previous implementation used length > lineClamp * 50.
    return text.length > (lineClamp || 0) * 50;
  }, [text, lineClamp]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const isCurrentlyClamped = shouldTruncate && !isExpanded;

  const containerStyle: React.CSSProperties = isCurrentlyClamped
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineClamp,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    : {};

  return {
    isExpanded,
    toggleExpanded,
    shouldTruncate,
    isCurrentlyClamped,
    containerStyle,
  };
}; 