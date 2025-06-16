'use client';

import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ParsedText } from '@/lib/utils/deso';
import { cn } from '@/lib/utils';
import { useTruncation } from '@/hooks/useTruncation';
import { Button } from '@/components/ui/button';

export interface PostTextProps {
  text: string;
  variant?: 'simple' | 'rich';
  className?: string;
  lineClamp?: number;
  showMoreText?: string;
  showLessText?: string;
}

const markdownComponents: Components = {
  h2: ({ node, ...props }) => <h2 {...props} />,
  h3: ({ node, ...props }) => <h3 {...props} />,
  ul: ({ node, ...props }) => <ul {...props} />,
  ol: ({ node, ...props }) => <ol {...props} />,
  a: ({ node, ...props }) => <a {...props} />,
};

export const PostText: React.FC<PostTextProps> = ({
  text,
  variant = 'simple',
  className,
  lineClamp,
  showMoreText = 'Show more',
  showLessText = 'Show less',
}) => {
  const { isExpanded, toggleExpanded, shouldTruncate, containerStyle } =
    useTruncation({
      text,
      lineClamp,
    });
  
  const content =
    variant === 'rich' ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    ) : (
      <p className="whitespace-pre-wrap text-foreground">
        <ParsedText text={text} />
      </p>
    );

  const proseClasses = cn(
    'mt-2 prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-li:text-muted-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-pre:text-muted-foreground prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-md prose-pre:p-2 prose-pre:border prose-pre:border-border prose-table:text-muted-foreground prose-table:border-border prose-table:border prose-table:rounded-md prose-table:overflow-hidden prose-table:text-foreground prose-code:text-muted-foreground prose-code:bg-muted prose-code:text-foreground prose-code:rounded-md prose-code:p-2 prose-code:border prose-code:border-border',
    'prose',
    'prose-pre:whitespace-pre-wrap',
    'prose-h1:text-2xl',
    'prose-h2:text-xl',
    'prose-h3:text-lg',
    'prose-h4:text-base',
    'prose-h5:text-sm',
    className);

  return (
    <div className={cn('relative', className)}>
      <div style={containerStyle} className={proseClasses}>{content}</div>
      {shouldTruncate && (
        <Button
          variant="link"
          className="p-0 h-auto text-sm mt-4 hover:underline text-blue-500 cursor-pointer"
          onClick={toggleExpanded}
        >
          {isExpanded ? showLessText : showMoreText}
        </Button>
      )}
    </div>
  );
}; 