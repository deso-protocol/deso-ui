'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../ui/button';
import { X, File, Music, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress?: number;
}

export type UploadType = 'image' | 'video' | 'audio';

interface EditorUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  onFileUpload: (files: File[]) => void;
  uploadType: UploadType;
  className?: string;
  mainText?: string;
  subText?: string;
}


interface UploadAreaProps {
  onFileUpload: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  className?: string;
  mainText?: string;
  subText?: string;
}

export function UploadArea({
  onFileUpload,
  accept,
  multiple = true,
  className,
  mainText,
  subText,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles);
      setIsDragging(false);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    onDragOver: () => setIsDragging(true),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive || isDragging ? 'border-primary bg-primary/10' : 'hover:border-muted-foreground/50 hover:bg-muted/50',
        className
      )}
    >
      <input type="file" {...getInputProps()} />
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <UploadCloud className="w-10 h-10" />
        <p className="font-semibold text-foreground">{mainText}</p>
        <p className="text-xs text-muted-foreground">
          {subText}
        </p>
      </div>
    </div>
  );
} 

const uploadAreaTexts = {
    image: {
      mainText: 'Drag & drop images here, or click to select files',
      subText: 'Max file size: 100MB, Allowed types: .jpeg, .jpg, .png, .gif',
    },
    video: {
      mainText: 'Drag & drop videos here, or click to select files',
      subText: 'Max file size: 100MB, Allowed types: .mp4, .mov, .avi',
    },
    audio: {
      mainText: 'Drag & drop audio files here, or click to select files',
      subText: 'Max file size: 100MB, Allowed types: .mp3, .wav, .ogg',
    },
  }

function FilePreview({
  file,
  onRemove,
  uploadType,
}: {
  file: UploadedFile;
  onRemove: (id: string) => void;
  uploadType: UploadType;
}) {
  return (
    <div className="relative aspect-square">
      {uploadType === 'image' ? (
        <img
          src={file.preview}
          alt={file.file.name}
          className="w-full h-full object-cover rounded-lg"
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      ) : (
        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
          {uploadType === 'video' && <Video className="w-10 h-10" />}
          {uploadType === 'audio' && <Music className="w-10 h-10" />}
          {!['image', 'video', 'audio'].includes(uploadType) && (
            <File className="w-10 h-10" />
          )}
        </div>
      )}

      {file.progress !== undefined && file.progress < 100 && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="w-16 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
      )}
      <Button
        variant="destructive"
        size="icon"
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
        onClick={() => onRemove(file.id)}
      >
        <X size={12} />
      </Button>
    </div>
  );
}

function SortableFilePreview({
  id,
  file,
  onRemove,
  uploadType,
}: {
  id: string;
  file: UploadedFile;
  onRemove: (id: string) => void;
  uploadType: UploadType;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FilePreview file={file} onRemove={onRemove} uploadType={uploadType} />
    </div>
  );
}

const uploadConfig: Record<
  UploadType,
  { accept: Record<string, string[]>; typeName: string }
> = {
  image: { accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }, typeName: 'Images' },
  video: { accept: { 'video/*': ['.mp4', '.mov', '.avi'] }, typeName: 'Videos' },
  audio: { accept: { 'audio/*': ['.mp3', '.wav', '.ogg'] }, typeName: 'Audio' },
};

export function EditorUpload({
  files,
  onFilesChange,
  onFileUpload,
  uploadType,
  className,
}: EditorUploadProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleRemoveFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    onFilesChange(updatedFiles);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((item) => item.id === active.id);
      const newIndex = files.findIndex((item) => item.id === over.id);
      onFilesChange(arrayMove(files, oldIndex, newIndex));
    }
  };

  const { accept } = uploadConfig[uploadType];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {files.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={files} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {files.map((file) => (
                <SortableFilePreview
                  key={file.id}
                  id={file.id}
                  file={file}
                  onRemove={handleRemoveFile}
                  uploadType={uploadType}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      <UploadArea
        onFileUpload={onFileUpload}
        accept={accept}
        mainText={uploadAreaTexts[uploadType].mainText}
        subText={uploadAreaTexts[uploadType].subText}
      />
    </div>
  );
} 