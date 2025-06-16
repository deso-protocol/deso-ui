import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard } from './media-card';

const meta: Meta<typeof MediaCard> = {
  title: 'DeSo/MediaCard',
  component: MediaCard,
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL of the image to display',
    },
    mediaType: {
      control: {
        type: 'select',
      },
      options: ['image', 'video', 'carousel'],
      description: 'Type of media to display',
    },
    viewCount: {
      control: 'number',
      description: 'Number of views to display',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/seed/picsum/600/600',
    mediaType: 'image',
    viewCount: 1200,
  },
};

export const Video: Story = {
  args: {
    ...Default.args,
    mediaType: 'video',
    viewCount: 24500,
    imageUrl: 'https://picsum.photos/seed/video/600/600',
  },
};

export const Carousel: Story = {
  args: {
    ...Default.args,
    mediaType: 'carousel',
    viewCount: 350,
    imageUrl: 'https://picsum.photos/seed/carousel/600/600',
  },
};

export const Audio: Story = {
  args: {
    ...Default.args,
    mediaType: 'audio',
    viewCount: 100,
  },
};

export const NoViews: Story = {
  args: {
    ...Default.args,
    mediaType: 'image',
    viewCount: 0,
    imageUrl: 'https://picsum.photos/seed/noviews/600/600',
  },
}; 