'use client';

import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils/deso';
import { Profile } from '@/lib/schemas/deso';
import { EditorUpload, UploadedFile, UploadType } from './editor-upload';
import { PostImage } from './post-image';
import {
  Image,
  Video,
  Mic,
  Lock,
  LucideGlobe,
  LucideLock,
  Smile,
} from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { EditorEmojiPicker } from './editor-emoji-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { UserInfo } from './user-info';
import { ProfilePicture } from './profile-picture';
import { EditorMarkdown } from './editor-markdown';

const EditorVisibility = ({
  isExclusive,
  onVisibilityChange,
}: {
  isExclusive: boolean;
  onVisibilityChange: (value: string) => void;
}) => (
  <Select
    defaultValue={isExclusive ? 'exclusive' : 'public'}
    onValueChange={onVisibilityChange}
  >
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="public">
        <LucideGlobe className="w-4 h-4" /> Post to Everyone
      </SelectItem>
      <SelectItem value="exclusive">
        <LucideLock className="w-4 h-4" /> Post to Subscribers
      </SelectItem>
    </SelectContent>
  </Select>
);

const EditorActions = ({
  showImageUpload,
  showVideoUpload,
  showAudioUpload,
  showExclusiveContent,
  showEmojiPicker,
  onUploadClick,
  onExclusiveClick,
  onEmojiClick,
}: {
  showImageUpload: boolean;
  showVideoUpload: boolean;
  showAudioUpload: boolean;
  showExclusiveContent: boolean;
  showEmojiPicker: boolean;
  onUploadClick: (type: UploadType) => void;
  onExclusiveClick: () => void;
  onEmojiClick: (emoji: string) => void;
}) => {
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiClick(emoji);
    setEmojiPickerOpen(false);
  };

  const uploadButton = (
    handleClick: () => void,
    tooltipText: string,
    icon: React.ReactNode
  ) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          onClick={handleClick}
          variant="ghost"
          className="bg-transparent data-[state=active]:bg-accent"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="flex gap-1 -ml-2">
      {showImageUpload &&
        uploadButton(
          () => onUploadClick('image'),
          'Upload Image',
          <Image className="text-muted-foreground size-5" />
        )}
      {showVideoUpload &&
        uploadButton(
          () => onUploadClick('video'),
          'Upload Video',
          <Video className="text-muted-foreground size-5" />
        )}
      {showAudioUpload &&
        uploadButton(
          () => onUploadClick('audio'),
          'Upload Audio',
          <Mic className="text-muted-foreground size-5" />
        )}
      {showExclusiveContent &&
        uploadButton(
          onExclusiveClick,
          'Unlock Exclusive Content',
          <Lock className="text-muted-foreground size-5" />
        )}
      {showEmojiPicker && (
        <Popover open={isEmojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Smile className="text-muted-foreground size-5" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Emoji</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-auto p-0 border-0">
            <EditorEmojiPicker onEmojiClick={handleEmojiSelect} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

const EditorSubmit = ({
  showCharacterCount,
  remainingChars,
  isPostDisabled,
  onSubmit,
  submitButtonText,
}: {
  showCharacterCount: boolean;
  remainingChars: number;
  isPostDisabled: boolean;
  onSubmit: () => void;
  submitButtonText: string;
}) => (
  <div className="flex items-center gap-4">
    {showCharacterCount && (
      <span
        className={cn('text-sm text-muted-foreground', {
          'text-red-500': remainingChars < 0,
        })}
      >
        {remainingChars}
      </span>
    )}
    <Button onClick={onSubmit} disabled={isPostDisabled}>
      {submitButtonText}
    </Button>
  </div>
);

export interface EditorSubmitData {
  postText: string;
  files: File[];
  isExclusive?: boolean;
  priceNanos?: number;
  previewText?: string;
  showEmojiPicker?: boolean;
  showCharacterCount?: boolean;
  maxChars?: number;
  layout?: 'default' | 'compact';
  showVisibility?: boolean;
  showUserInfo?: boolean;
  submitButtonText?: string;
}

export interface EditorProps {
  currentUser: {
    publicKey: string;
    profile?: Profile;
  };
  onSubmit: (data: EditorSubmitData) => void;
  className?: string;
  placeholder?: string;
  showImageUpload?: boolean;
  showVideoUpload?: boolean;
  showAudioUpload?: boolean;
  showExclusiveContent?: boolean;
  showEmojiPicker?: boolean;
  showCharacterCount?: boolean;
  maxChars?: number;
  layout?: 'default' | 'compact';
  showVisibility?: boolean;
  showUserInfo?: boolean;
  submitButtonText?: string;
  submitOnEnter?: boolean;
  useMarkdownEditor?: boolean;
}

export function Editor({
  currentUser,
  onSubmit,
  className,
  placeholder = "What's happening?",
  showImageUpload = true,
  showVideoUpload = true,
  showAudioUpload = true,
  showExclusiveContent = true,
  showEmojiPicker: showEmojiPickerProp = true,
  showCharacterCount = true,
  showVisibility = true,
  showUserInfo = true,
  maxChars = 600,
  layout = 'default',
  submitButtonText = 'Post',
  submitOnEnter = false,
  useMarkdownEditor = false,
}: EditorProps) {
  const [postText, setPostText] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [price, setPrice] = useState('');
  const [isExclusive, setIsExclusive] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (submitOnEnter && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleMarkdownChange = (value: string) => {
    setPostText(value);
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
    setPrice('');
    setPreviewText('');
  };

  const handleEmojiClick = (emoji: string) => {
    if (isExclusive) {
      setPreviewText((prev) => prev + emoji);
    } else {
      setPostText((prev) => prev + emoji);
    }
    setShowEmojiPicker(false);
  };

  const remainingChars = maxChars - postText.length;
  const isPostDisabled =
    (!postText.trim() && files.length === 0) || remainingChars < 0;

  const handleVisibilityChange = (value: string) => {
    setIsExclusive(value === 'exclusive');
    setActiveUploadType(null);
    setFiles([]);
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

  if (layout === 'compact') {
    return (
      <div className={cn('flex items-end w-full gap-2', className)}>
        <div className="flex items-end gap-2 w-full">
          <ProfilePicture
            publicKey={currentUser.publicKey}
            profile={currentUser.profile}
            size="sm"
            className="relative -top-[2px]"
          />
          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={placeholder}
            className="bg-transparent border min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-2 text-md resize-none"
            rows={1}
            onKeyDown={handleKeyDown}
          />
        </div>
        <EditorSubmit
          showCharacterCount={false}
          remainingChars={remainingChars}
          isPostDisabled={isPostDisabled}
          onSubmit={handleSubmit}
          submitButtonText={submitButtonText}
        />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4 p-6 border rounded-xl', className)}>
      <div className="flex flex-col gap-4">
        {(showUserInfo || showVisibility) && (
          <div className="flex flex-row gap-2 justify-between items-center">
            {showUserInfo && (
              <div>
                <UserInfo
                  publicKey={currentUser.publicKey}
                  profile={currentUser.profile}
                  pictureSize="sm"
                  />
              </div>
            )}
            <div>
              {showVisibility && (
                <EditorVisibility
                  isExclusive={isExclusive}
                  onVisibilityChange={handleVisibilityChange}
                />
              )}
            </div>
          </div>
        )}
        <div className="flex-1">
          {isExclusive && (
            <div className="flex flex-col gap-2 mb-4">
              <Label htmlFor="previewText" className="text-sm font-semibold">
                Preview Content
              </Label>
              {useMarkdownEditor ? (
              <EditorMarkdown
                value={postText}
                onChange={handleMarkdownChange}
                placeholder={
                  isExclusive ? 'Write your exclusive content here...' : placeholder
                }
                className="border dark:border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg"
              />
            ) : (
              <Textarea
                id="previewText"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Write a public preview for your post..."
                className="border dark:border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg resize-none"
                rows={2}
              />
            )}
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
            {useMarkdownEditor ? (
              <EditorMarkdown
                value={postText}
                onChange={handleMarkdownChange}
                placeholder={
                  isExclusive ? 'Write your exclusive content here...' : placeholder
                }
                className="border dark:border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg"
              />
            ) : (
              <Textarea
                id="mainContent"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={
                  isExclusive ? 'Write your exclusive content here...' : placeholder
                }
                className="border dark:border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg resize-none"
                rows={3}
                onKeyDown={handleKeyDown}
              />
            )}
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
        <EditorActions
          showImageUpload={showImageUpload}
          showVideoUpload={showVideoUpload}
          showAudioUpload={showAudioUpload}
          showExclusiveContent={showExclusiveContent}
          showEmojiPicker={showEmojiPickerProp}
          onUploadClick={handleUploadClick}
          onExclusiveClick={handleExclusiveClick}
          onEmojiClick={handleEmojiClick}
        />
        <EditorSubmit
          showCharacterCount={showCharacterCount}
          remainingChars={remainingChars}
          isPostDisabled={isPostDisabled}
          onSubmit={handleSubmit}
          submitButtonText={submitButtonText}
        />
      </div>
    </div>
  );
} 