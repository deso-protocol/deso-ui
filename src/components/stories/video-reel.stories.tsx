import type { Meta, StoryObj } from '@storybook/react';
import { VideoReel, VideoReelItem } from '../deso/video-reel';
import { successHandlers } from '../../lib/mocks/msw-handlers';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY } from '../../lib/constants';
import { Providers } from '../../lib/providers';

const meta: Meta<typeof VideoReel> = {
  title: 'DeSo/VideoReel',
  component: VideoReel,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: successHandlers,
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['single', 'carousel', 'carousel-with-arrows'],
    },
    autoPlay: {
      control: { type: 'boolean' },
    },
    showEngagement: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoReel>;

const sampleVideos: VideoReelItem[] = [
  {
    id: '1',
    videoUrl: 'https://videos.pexels.com/video-files/31985791/13630710_1080_1920_30fps.mp4',
    publicKey: DEFAULT_PUBLIC_KEY,
    text: 'Amazing sunset vibes 🌅 Nothing beats nature\'s beauty! #sunset #nature #peaceful',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    engagement: {
      likes: 1247,
      comments: 89,
      reposts: 156,
      diamonds: 23,
      diamondValue: '($1.15)',
      views: 8942,
    },
    isLiked: false,
    isReposted: false,
  },
  {
    id: '2',
    videoUrl: 'https://videos.pexels.com/video-files/16898787/16898787-uhd_1440_2560_60fps.mp4',
    publicKey: OTHER_PUBLIC_KEY,
    text: 'City lights at night ✨ The energy of the urban jungle never stops! #citylife #nightvibes #urban',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    engagement: {
      likes: 2341,
      comments: 156,
      reposts: 89,
      diamonds: 45,
      diamondValue: '($2.25)',
      views: 12534,
    },
    isLiked: true,
    isReposted: false,
  },
  {
    id: '3',
    videoUrl: 'https://videos.pexels.com/video-files/27257647/12104068_1440_2560_30fps.mp4',
    publicKey: 'BC1YLjDmr185njjDoYLGkUTagzLvcfgxrtKVc5SdBBXCCaWXkM6LXfP',
    text: 'Ocean waves therapy 🌊 Sometimes you just need to disconnect and listen to the waves. #ocean #meditation #peaceful',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    engagement: {
      likes: 3456,
      comments: 234,
      reposts: 178,
      diamonds: 67,
      diamondValue: '($3.35)',
      views: 18765,
    },
    isLiked: false,
    isReposted: true,
  },
  {
    id: '4',
    videoUrl: 'https://videos.pexels.com/video-files/31985791/13630710_1080_1920_30fps.mp4',
    publicKey: DEFAULT_PUBLIC_KEY,
    text: 'Golden hour magic ✨ This light hits different every single time! #goldenhour #photography #magic',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    engagement: {
      likes: 892,
      comments: 67,
      reposts: 34,
      diamonds: 12,
      diamondValue: '($0.60)',
      views: 5432,
    },
    isLiked: true,
    isReposted: false,
  },
  {
    id: '5',
    videoUrl: 'https://videos.pexels.com/video-files/16898787/16898787-uhd_1440_2560_60fps.mp4',
    publicKey: OTHER_PUBLIC_KEY,
    text: 'Night photography tips 📸 Here\'s how I capture the perfect city shot! #photography #tips #nightphotography',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    engagement: {
      likes: 1567,
      comments: 123,
      reposts: 89,
      diamonds: 34,
      diamondValue: '($1.70)',
      views: 9876,
    },
    isLiked: false,
    isReposted: true,
  },
];

export const Single: Story = {
  args: {
    videos: [sampleVideos[0]],
    variant: 'single',
    autoPlay: true,
    showEngagement: true,
  },
};

export const Carousel: Story = {
  args: {
    videos: sampleVideos,
    variant: 'carousel',
    autoPlay: true,
    showEngagement: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scroll with mouse wheel to navigate between videos, just like TikTok or YouTube Shorts.',
      },
    },
  },
};

export const CarouselWithArrows: Story = {
  args: {
    videos: sampleVideos,
    variant: 'carousel-with-arrows',
    autoPlay: true,
    showEngagement: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigate between videos using the up/down arrow buttons on the right side.',
      },
    },
  },
};

export const WithoutEngagement: Story = {
  args: {
    videos: sampleVideos.slice(0, 3),
    variant: 'carousel',
    autoPlay: true,
    showEngagement: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Video reel without engagement buttons for a cleaner viewing experience.',
      },
    },
  },
};

export const SingleVideoEngaged: Story = {
  args: {
    videos: [sampleVideos[1]], // The liked and engaged video
    variant: 'single',
    autoPlay: true,
    showEngagement: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Single video showing active engagement states (liked and reposted).',
      },
    },
  },
}; 