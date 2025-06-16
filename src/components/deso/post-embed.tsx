import React from 'react';
import { cn } from '@/lib/utils';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Image from 'next/image';

interface PostEmbedProps {
  url: string;
  className?: string;
}

const getYouTubeVideoId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (
      urlObj.hostname === 'www.youtube.com' ||
      urlObj.hostname === 'youtube.com'
    ) {
      if (urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v');
      }
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.slice(7);
      }
    }
  } catch (error) {
    console.error('Invalid YouTube URL:', error);
  }
  return null;
};

const getSpotifyEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'open.spotify.com') {
      return `https://open.spotify.com/embed${urlObj.pathname}`;
    }
  } catch (error) {
    console.error('Invalid Spotify URL:', error);
  }
  return null;
};

const getTweetId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname === 'twitter.com' ||
      urlObj.hostname === 'x.com'
    ) {
      const match = urlObj.pathname.match(/\/status\/(\d+)/);
      if (match) {
        return match[1];
      }
    }
  } catch (error) {
    console.error('Invalid Twitter URL:', error);
  }
  return null;
};

export const PostEmbed: React.FC<PostEmbedProps> = ({ url, className }) => {
  const youtubeVideoId = getYouTubeVideoId(url);
  if (youtubeVideoId) {
    return (
      <div className={cn('mt-2 rounded-lg overflow-hidden', className)}>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  const spotifyEmbedUrl = getSpotifyEmbedUrl(url);
  if (spotifyEmbedUrl) {
    return (
      <div className={cn('mt-2 rounded-lg overflow-hidden', className)}>
        <iframe
          src={spotifyEmbedUrl}
          width="100%"
          height="160"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </div>
    );
  }

  const tweetId = getTweetId(url);
  if (tweetId) {
    return (
      <div className={cn('mt-2 rounded-lg overflow-hidden', className)}>
        <TwitterTweetEmbed tweetId={tweetId} />
      </div>
    );
  }

  if (url.includes('soundcloud.com')) {
    return (
      <div className={cn('mt-2 rounded-lg overflow-hidden', className)}>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          src={`https://w.soundcloud.com/player/?url=${url}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mt-2 rounded-lg border bg-muted flex',
        className
      )}
    >
      <div className="rounded-tl-lg rounded-bl-lg overflow-hidden">
        <Image src="https://placehold.co/1200x800/dbd8e3/352f44" alt="Website Embed" width={150} height={100} />
      </div>
      <div className="flex-1 flex-col p-4 gap-0">
        <p className="font-bold m-0">Website Embed</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-xs"
        >
          {url}
        </a>
        <p className="text-sm text-muted-foreground">
          This is a placeholder for the OG meta tags.
        </p>
      </div>
    </div>
  );
}; 