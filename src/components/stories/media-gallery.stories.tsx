import type { Meta, StoryObj } from '@storybook/react';
import { MediaGallery } from '../deso/media-gallery';
import type { MediaType } from '../deso/media-item';

const meta: Meta<typeof MediaGallery> = {
  title: 'DeSo/MediaGallery',
  component: MediaGallery,
  argTypes: {
    onMediaClick: {
      action: 'mediaClicked',
      description: 'Callback for when a media card is clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaGallery>;

const generateMediaItems = (count: number) => {
  const mediaTypes: MediaType[] = ['image', 'video', 'carousel', 'audio'];
  
  // Predefined aspect ratios for better masonry distribution
  const dimensions = [
    { width: 300, height: 200 },   // 3:2 landscape
    { width: 300, height: 400 },   // 3:4 portrait  
    { width: 300, height: 300 },   // 1:1 square
    { width: 300, height: 500 },   // 3:5 tall
    { width: 300, height: 180 },   // 5:3 wide
    { width: 300, height: 600 },   // 1:2 very tall
    { width: 300, height: 150 },   // 2:1 very wide
    { width: 300, height: 450 },   // 2:3 portrait
    { width: 300, height: 250 },   // 6:5 slightly wide
    { width: 300, height: 350 },   // 6:7 slightly tall
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const dimension = dimensions[i % dimensions.length];
    return {
      id: `media-${i + 1}`,
      imageUrl: `https://picsum.photos/seed/${i + 1}/${dimension.width}/${dimension.height}`,
      mediaType: mediaTypes[i % mediaTypes.length],
      viewCount: Math.floor(Math.random() * 100000),
    };
  });
};

export const Default: Story = {
  args: {
    mediaItems: generateMediaItems(16),
  },
};

export const Masonry: Story = {
  args: {
    ...Default.args,
    variant: 'masonry',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const FewerItems: Story = {
  args: {
    mediaItems: generateMediaItems(4),
  },
};

export const MoreItems: Story = {
  args: {
    mediaItems: generateMediaItems(28),
  },
};

export const MasonryMoreItems: Story = {
  args: {
    mediaItems: generateMediaItems(50),
    variant: 'masonry',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}; 