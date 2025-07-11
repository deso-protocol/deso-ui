import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard, MediaType } from '../deso/media-card';
import { Providers } from '../../lib/providers';
import { successHandlers } from '../../lib/mocks/msw-handlers';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY, LIVE_PUBLIC_KEY } from '../../lib/constants';

const meta: Meta<typeof MediaCard> = {
  title: 'DeSo/MediaCard',
  component: MediaCard,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
  argTypes: {
    onClick: {
      action: 'cardClicked',
      description: 'Callback for when the media card is clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediaCard>;

const sampleCards = [
  {
    id: 'video-1',
    imageUrl: 'https://picsum.photos/seed/ux-design/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 552,
    duration: '40:22',
    publicKey: DEFAULT_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    title: 'How AI Will Change UX Design Forever (With Y-Combinator Backed Polymet CEO Yus Hilmi)',
    description: 'In this episode, we dive deep into the future of UX design and how artificial intelligence is revolutionizing the way we create digital experiences.',
  },
  {
    id: 'video-2',
    imageUrl: 'https://picsum.photos/seed/react-tutorial/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 12400,
    duration: '25:15',
    publicKey: LIVE_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    title: 'Building Modern React Applications with TypeScript and Next.js',
    description: 'Learn how to build scalable React applications using TypeScript, Next.js, and modern development practices.',
  },
  {
    id: 'video-3',
    imageUrl: 'https://picsum.photos/seed/crypto-defi/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 8900,
    duration: '18:45',
    publicKey: OTHER_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    title: 'DeFi Explained: Understanding Decentralized Finance',
    description: 'A comprehensive guide to decentralized finance, covering everything from yield farming to liquidity pools.',
  },
  {
    id: 'image-1',
    imageUrl: 'https://picsum.photos/seed/design-tips/640/360',
    mediaType: 'image' as MediaType,
    viewCount: 3200,
    publicKey: DEFAULT_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    title: '10 Essential Design Principles Every Designer Should Know',
    description: 'Master these fundamental design principles to create more effective and visually appealing designs.',
  },
  {
    id: 'audio-1',
    imageUrl: 'https://picsum.photos/seed/podcast/640/360',
    mediaType: 'audio' as MediaType,
    viewCount: 1800,
    duration: '52:30',
    publicKey: LIVE_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    title: 'The Future of Web3 and Decentralized Social Networks',
    description: 'Join us as we explore the evolution of social media and the role of blockchain technology in creating more open platforms.',
  },
  {
    id: 'audio-2',
    imageUrl: 'https://picsum.photos/seed/podcast-2/640/360',
    mediaType: 'audio' as MediaType,
    viewCount: 1800,
    duration: '52:30',
    publicKey: DEFAULT_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    title: 'Mastering AI: The Future of UX Design',
    description: 'This episode explores how AI is transforming the way we design user experiences, from automating tasks to creating more personalized interactions.',
  },
];

// Video cards with hover functionality
const videoHoverCards = [
  {
    id: 'video-hover-1',
    imageUrl: 'https://picsum.photos/seed/sunset-video/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 1247,
    duration: '2:45',
    videoUrl: 'https://videos.pexels.com/video-files/31985791/13630710_1080_1920_30fps.mp4',
    publicKey: DEFAULT_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    title: 'Amazing Sunset Vibes - Nature\'s Beauty Captured',
    description: 'Experience the breathtaking beauty of a golden sunset. Perfect for relaxation and meditation.',
  },
  {
    id: 'video-hover-2',
    imageUrl: 'https://picsum.photos/seed/city-night/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 2341,
    duration: '1:30',
    videoUrl: 'https://videos.pexels.com/video-files/16898787/16898787-uhd_1440_2560_60fps.mp4',
    publicKey: OTHER_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    title: 'City Lights at Night - Urban Energy',
    description: 'The vibrant energy of city life captured in stunning detail. Watch the urban jungle come alive.',
  },
  {
    id: 'video-hover-3',
    imageUrl: 'https://picsum.photos/seed/ocean-waves/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 3456,
    duration: '3:20',
    videoUrl: 'https://videos.pexels.com/video-files/27257647/12104068_1440_2560_30fps.mp4',
    publicKey: LIVE_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    title: 'Ocean Waves Therapy - Peaceful Sounds',
    description: 'Let the soothing sound of ocean waves wash away your stress. Perfect for meditation and relaxation.',
  },
];

export const Default: Story = {
  args: sampleCards[0],
};

export const Compact: Story = {
  args: {
    ...sampleCards[0],
    compact: true,
  },
};


export const WithoutStats: Story = {
  args: {
    ...sampleCards[0],
    showStats: false,
  },
};

export const WithoutDuration: Story = {
  args: {
    ...sampleCards[0],
    showDuration: false,
  },
};

export const ImageCard: Story = {
  args: sampleCards[3],
};

export const AudioCard: Story = {
  args: sampleCards[4],
};

export const VideoWithHover: Story = {
  args: videoHoverCards[0],
  parameters: {
    docs: {
      description: {
        story: 'Hover over the video thumbnail to see a preview of the video playing automatically, similar to YouTube\'s hover functionality.',
      },
    },
  },
};

export const VideoHoverGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {videoHoverCards.map((card) => (
        <MediaCard key={card.id} {...card} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout showing multiple video cards with hover preview functionality. Hover over any video thumbnail to see the preview.',
      },
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sampleCards.map((card) => (
        <MediaCard key={card.id} {...card} />
      ))}
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl p-4">
      {sampleCards.map((card) => (
        <MediaCard key={card.id} {...card} />
      ))}
    </div>
  ),
}; 

export const CompactList: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl p-4">
      {sampleCards.map((card) => (
        <MediaCard key={card.id} {...card} compact={true} />
      ))}
    </div>
  ),
}; 