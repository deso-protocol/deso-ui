import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { EditorUpload, UploadedFile, UploadType } from '../deso/editor-upload';
import { Providers } from '../../lib/providers';

const meta: Meta<typeof EditorUpload> = {
  title: 'DeSo/EditorUpload',
  component: EditorUpload,
  decorators: [
    (Story) => (
      <Providers>
        <div className="max-w-xl mx-auto">
          <Story />
        </div>
      </Providers>
    ),
  ],
  argTypes: {
    uploadType: {
      control: { type: 'radio' },
      options: ['image', 'video', 'audio'],
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditorUpload>;

export const ImageUpload: Story = {
  args: {
    uploadType: 'image',
  },
  render: (args) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const handleFileUpload = (uploadedFiles: File[]) => {
      const newFiles: UploadedFile[] = uploadedFiles.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
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

    return (
      <EditorUpload
        {...args}
        files={files}
        onFilesChange={setFiles}
        onFileUpload={handleFileUpload}
      />
    );
  },
}; 


export const VideoUpload: Story = {
  args: {
    uploadType: 'video',
  },
  render: (args) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const handleFileUpload = (uploadedFiles: File[]) => {
      const newFiles: UploadedFile[] = uploadedFiles.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
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

    return (
      <EditorUpload
        {...args}
        files={files}
        onFilesChange={setFiles}
        onFileUpload={handleFileUpload}
      />
    );
  },
}; 

export const AudioUpload: Story = {
  args: {
    uploadType: 'audio',
  },
  render: (args) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const handleFileUpload = (uploadedFiles: File[]) => {
      const newFiles: UploadedFile[] = uploadedFiles.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
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

    return (
      <EditorUpload
        {...args}
        files={files}
        onFilesChange={setFiles}
        onFileUpload={handleFileUpload}
      />
    );
  },
}; 