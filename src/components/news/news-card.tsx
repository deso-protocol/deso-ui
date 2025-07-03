'use client';

import * as React from 'react';
import { MediaCard } from '@/components/deso/media-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { Timestamp } from '@/components/deso/timestamp';
import { BaseNewsItem } from '@/types/news';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface NewsCardProps {
  newsItem: BaseNewsItem;
  showDiscussButton?: boolean;
  onDiscuss?: (url: string, title: string) => void;
  onClick?: () => void;
  className?: string;
}

export const NewsCard = ({
  newsItem,
  showDiscussButton = false,
  onDiscuss,
}: NewsCardProps) => {
  const handleDiscussClick = () => {
    if (onDiscuss && newsItem.url && newsItem.title) {
      onDiscuss(newsItem.url, newsItem.title);
    }
  };

  const formattedUrl = newsItem.url ? new URL(newsItem.url).hostname.replace('www.', '') : 'N/A';

  return (
    <Card className="flex flex-col h-full border border-border gap-0 p-0 rounded-lg">
      {newsItem.imageUrl && (
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title || 'News article image'}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </AspectRatio>
        </CardHeader>
      )}
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold leading-snug mb-2">
          <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {newsItem.title || 'Untitled Article'}
          </a>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {newsItem.description || 'No description available.'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center flex-row gap-2">
          {newsItem.publishedAt && <Timestamp timestamp={newsItem.publishedAt} />} •
          {newsItem.source && <span className="font-medium text-balance">{newsItem.source}</span>}
        </div>
        {showDiscussButton && (
          <Button variant="outline" size="sm" onClick={handleDiscussClick} disabled={!newsItem.url || !newsItem.title}>
            <MessageCircle className="h-3 w-3 mr-1.5" />
            Discuss
          </Button>
        )}
      </CardFooter>
      <div className="p-4 flex justify-between items-center text-xs text-muted-foreground border-t border-border">
        {newsItem.url && (
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
              {formattedUrl}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
        )}
        <div className="flex items-center gap-2">
          {newsItem.category && <Badge variant="secondary">{newsItem.category}</Badge>}
          {(newsItem.discussionCount ?? 0) > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{newsItem.discussionCount}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}; 