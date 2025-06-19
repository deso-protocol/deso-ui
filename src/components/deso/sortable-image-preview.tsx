'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImagePreview, UploadedImage } from './editor-image-upload';

interface SortableImagePreviewProps {
  id: string;
  image: UploadedImage;
  onRemove: (id: string) => void;
}

export function SortableImagePreview({
  id,
  image,
  onRemove,
}: SortableImagePreviewProps) {
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
      <ImagePreview image={image} onRemove={onRemove} />
    </div>
  );
} 