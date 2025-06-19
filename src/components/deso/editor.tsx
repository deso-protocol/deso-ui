'use client';

import React, { useState } from 'react';
import { ProfilePicture } from './profile-picture';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Profile } from '@/lib/schemas/deso';
import { EditorUpload, UploadedFile, UploadType } from './editor-upload';
import { PostImage } from './post-image';
import { Image, Video, Mic } from 'lucide-react';

export interface EditorProps {
  currentUser: {
    publicKey: string;
    profile?: Profile;
  };
  onSubmit: (postText: string, files: File[]) => void;
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
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeUploadType, setActiveUploadType] = useState<UploadType | null>(
    null
  );

  const handleSubmit = () => {
    if (postText.trim() || files.length > 0) {
      onSubmit(
        postText,
        files.map((f) => f.file)
      );
      setPostText('');
      setFiles([]);
      setActiveUploadType(null);
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
          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={placeholder}
            className="bg-transparent border-none min-h-auto focus-visible:ring-0 focus-visible:ring-offset-0 p-4 text-lg resize-none"
            rows={3}
          />
        </div>
      </div>

      {renderUploadUI()}

      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleUploadClick('image')}
            data-state={activeUploadType === 'image' ? 'active' : 'inactive'}
            className="data-[state=active]:bg-accent"
          >
            <Image className="text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleUploadClick('video')}
            data-state={activeUploadType === 'video' ? 'active' : 'inactive'}
            className="data-[state=active]:bg-accent"
          >
            <Video className="text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleUploadClick('audio')}
            data-state={activeUploadType === 'audio' ? 'active' : 'inactive'}
            className="data-[state=active]:bg-accent"
          >
            <Mic className="text-muted-foreground" />
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!postText.trim() && files.length === 0}
        >
          Post
        </Button>
      </div>
    </div>
  );
} 