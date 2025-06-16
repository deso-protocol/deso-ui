'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '../ui/slider';

export interface PostAudioProps {
  url: string;
  className?: string;
}

const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds || 0);
  return date.toISOString().substr(14, 5);
};

export const PostAudio: React.FC<PostAudioProps> = ({ url, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ddd',
      progressColor: '#333',
      barWidth: 5,
      barGap: 4,
      barRadius: 100,
      height:40,
      url,
    });

    wavesurferRef.current = ws;
    ws.setVolume(volume);

    ws.on('play', () => setIsPlaying(true));
    ws.on('pause', () => setIsPlaying(false));
    ws.on('finish', () => setIsPlaying(false));
    ws.on('ready', (newDuration) => setDuration(newDuration));
    ws.on('timeupdate', (newTime) => setCurrentTime(newTime));

    return () => {
      ws.destroy();
    };
  }, [url]);

  const onPlayPause = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const onVolumeChange = useCallback((newVolume: number[]) => {
    const newVol = newVolume[0];
    wavesurferRef.current?.setVolume(newVol);
    setVolume(newVol);
    if (newVol > 0) {
      setIsMuted(false);
    }
  }, []);

  const onMuteToggle = useCallback(() => {
    const newMuted = !isMuted;
    wavesurferRef.current?.setMuted(newMuted);
    setIsMuted(newMuted);
  }, [isMuted]);

  return (
    <div className={cn('mt-2 rounded-lg border bg-muted', className)}>
      <div className="p-6 bg-background rounded-t-lg" ref={containerRef} />
      <div className="flex justify-between items-center border-t p-2">
        <div className="flex-grow flex gap-4">
          <Button onClick={onPlayPause} variant="outline" size="icon">
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <div className="flex items-center gap-2 w-full max-w-xs">
            <Button onClick={onMuteToggle} variant="ghost" size="icon">
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Volume2 className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={onVolumeChange}
              max={1}
              step={0.05}
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-foreground ml-auto text-right flex flex-row text-xs gap-1">
            <span className="text-muted-foreground">{formatTime(currentTime)} / </span><span className="text-foreground">{formatTime(duration)}</span>
          </div>
          <div className="text-xs text-muted-foreground truncate w-32 text-right">{url}</div>
        </div>
      </div>
    </div>
  );
}; 