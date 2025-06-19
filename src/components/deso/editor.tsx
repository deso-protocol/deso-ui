'use client';

import React, { useState } from 'react';
import { ProfilePicture } from './profile-picture';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Profile } from '@/lib/schemas/deso';
import { EditorUpload, UploadedFile, UploadType } from './editor-upload';
import { PostImage } from './post-image';
import { Image, Video, Mic, Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export interface EditorSubmitData {
  postText: string;
  files: File[];
  isExclusive?: boolean;
  priceNanos?: number;
  previewText?: string;
}

export interface EditorProps {
  currentUser: {
    publicKey: string;
    profile?: Profile;
  };
  onSubmit: (data: EditorSubmitData) => void;
  className?: string;
  placeholder?: string;
}

export function Editor({
  currentUser,
  onSubmit,
  className,
  placeholder = "What's happening?",
}: EditorProps) {
  const [postText, setPostText] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [price, setPrice] = useState('');
  const [isExclusive, setIsExclusive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeUploadType, setActiveUploadType] = useState<UploadType | null>(
    null
  );

  const handleSubmit = () => {
    if (postText.trim() || files.length > 0) {
      onSubmit({
        postText,
        files: files.map((f) => f.file),
        ...(isExclusive && {
          isExclusive: true,
          // NOTE: converting DESO to nanos. We may want to do this conversion
          // in the submit handler instead of here.
          priceNanos: parseFloat(price) * 1e9,
          previewText,
        }),
      });
      setPostText('');
      setFiles([]);
      setActiveUploadType(null);
      setIsExclusive(false);
      setPrice('');
      setPreviewText('');
    }
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles: UploadedFile[] = uploadedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress: 100 } : f))
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
          );
        }
      }, 200);
    });
  };

  const handleUploadClick = (type: UploadType) => {
    if (activeUploadType === type) {
      setActiveUploadType(null);
    } else {
      setActiveUploadType(type);
      setFiles([]);
    }
  };

  const handleExclusiveClick = () => {
    setIsExclusive((prev) => !prev);
    setActiveUploadType(null);
    setFiles([]);
  };

  const uploadButton = (handleClick: () => void, tooltipText: string, icon: React.ReactNode) => {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            onClick={handleClick}
            className="bg-transparent data-[state=active]:bg-accent"
          > {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    )
  };

  const renderUploadUI = () => {
    if (!activeUploadType) {
      if (files.length > 0) {
        // This part needs to be smarter based on file types
        return (
          <div
            onClick={() => setActiveUploadType('image')}
            className="cursor-pointer"
          >
            <PostImage images={files.map((f) => f.preview)} />
          </div>
        );
      }
      return null;
    }

    return (
      <EditorUpload
        files={files}
        onFilesChange={setFiles}
        onFileUpload={handleFileUpload}
        uploadType={activeUploadType}
      />
    );
  };

  return (
    <div className={cn('flex flex-col gap-4 p-4 border rounded-lg', className)}>
      <div className="flex flex-col gap-4">
        <div>
          <ProfilePicture
            publicKey={currentUser.publicKey}
            profile={currentUser.profile}
            size="md"
          />
        </div>
        <div className="flex-1">
          {isExclusive && (
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="previewText" className="text-sm font-semibold">
                Preview Content
              </Label>
              <Textarea
                id="previewText"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Write a public preview for your post..."
                className="border dark:border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg resize-none"
                rows={2}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="mainContent"
              className={cn('text-sm font-semibold', {
                'sr-only': !isExclusive,
              })}
            >
              {isExclusive ? 'Exclusive Content' : 'Post Content'}
            </Label>
            <Textarea
              id="mainContent"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={
                isExclusive ? 'Write your exclusive content here...' : placeholder
              }
              className="border dark:border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {renderUploadUI()}

      {isExclusive && (
        <div className="flex flex-row gap-2">
          <Label htmlFor="price" className="text-sm font-semibold flex-4">
            Unlock Price (in $DESO)
          </Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 1.0"
            className="bg-transparent flex-2"
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {uploadButton(() => handleUploadClick('image'), 'Upload Image', <Image className="text-muted-foreground" />)}
          {uploadButton(() => handleUploadClick('video'), 'Upload Video', <Video className="text-muted-foreground" />)}
          {uploadButton(() => handleUploadClick('audio'), 'Upload Audio', <Mic className="text-muted-foreground" />)}
          {uploadButton(handleExclusiveClick, 'Unlock Exclusive Content', <Lock className="text-muted-foreground" />)}
        </div>
        <div className="flex gap-1">
          <Button
            onClick={handleSubmit}
            disabled={!postText.trim() && files.length === 0}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
} 