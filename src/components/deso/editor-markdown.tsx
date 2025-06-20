'use client';

import React, { useEffect, useRef } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import { cn } from '@/lib/utils/deso';

export interface EditorMarkdownProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function EditorMarkdown({
  value = '',
  onChange,
  placeholder = 'Start writing...',
  className,
  disabled = false,
}: EditorMarkdownProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const crepeRef = useRef<Crepe | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize Crepe editor
    const crepe = new Crepe({
      root: editorRef.current,
      defaultValue: value,
    });

    crepeRef.current = crepe;
    crepe.create();

    return () => {
      if (crepeRef.current) {
        crepeRef.current.destroy();
        crepeRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={editorRef}
      className={cn(
        'prose prose-sm max-w-none focus:outline-none border-border rounded-md !p-0',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    />
  );
} 