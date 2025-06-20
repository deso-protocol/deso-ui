import type { Meta, StoryObj } from '@storybook/react';
import { Providers } from '../../lib/providers';
import { VideoReel } from '../deso/video-reel';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY, LIVE_PUBLIC_KEY } from '../../lib/constants';
import { successHandlers } from '../../lib/mocks/msw-handlers';

// Sample video data with Pexels videos
const sampleVideos = [
  {
    id: 'video-1',
    publicKey: DEFAULT_PUBLIC_KEY,
    text: 'Beautiful sunset vibes ✨ #sunset #nature #peaceful',
    videoUrl: 'https://videos.pexels.com/video-files/27257647/12104068_1440_2560_30fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    engagement: {
      comments: 234,
      likes: 1520,
      reposts: 89,
      diamonds: 45,
      diamondValue: '($4.50)',
      views: 15420,
    },
  },
  {
    id: 'video-2',
    publicKey: LIVE_PUBLIC_KEY,
    text: 'City lights at night 🌃 Love this energy! #citylife #nightvibes #urban',
    videoUrl: 'https://videos.pexels.com/video-files/28121952/12305048_1440_2558_25fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    engagement: {
      comments: 456,
      likes: 3240,
      reposts: 156,
      diamonds: 78,
      diamondValue: '($7.80)',
      views: 32400,
    },
  },
  {
    id: 'video-3',
    publicKey: OTHER_PUBLIC_KEY,
    text: 'Ocean waves therapy 🌊 Nothing beats this sound #ocean #waves #meditation #nature',
    videoUrl: 'https://videos.pexels.com/video-files/32597285/13899996_1080_1920_30fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    engagement: {
      comments: 189,
      likes: 2890,
      reposts: 234,
      diamonds: 67,
      diamondValue: '($6.70)',
      views: 28900,
    },
  },
  {
    id: 'video-4',
    publicKey: DEFAULT_PUBLIC_KEY,
    text: 'Morning coffee ritual ☕ Starting the day right #coffee #morning #ritual #productivity',
    videoUrl: 'https://videos.pexels.com/video-files/28701276/12456304_1440_2560_60fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    engagement: {
      comments: 167,
      likes: 1890,
      reposts: 78,
      diamonds: 34,
      diamondValue: '($3.40)',
      views: 18900,
    },
  },
  {
    id: 'video-5',
    publicKey: LIVE_PUBLIC_KEY,
    text: 'Abstract art in motion 🎨 What do you see? #art #abstract #creative #inspiration',
    videoUrl: 'https://videos.pexels.com/video-files/30100836/12909163_1080_1920_60fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    engagement: {
      comments: 298,
      likes: 4560,
      reposts: 289,
      diamonds: 123,
      diamondValue: '($12.30)',
      views: 45600,
    },
  },
  {
    id: 'video-6',
    publicKey: OTHER_PUBLIC_KEY,
    text: 'Neon dreams 💫 Late night vibes in the city #neon #nightlife #aesthetic #mood',
    videoUrl: 'https://videos.pexels.com/video-files/32248867/13753744_1440_2560_30fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    engagement: {
      comments: 345,
      likes: 5670,
      reposts: 234,
      diamonds: 89,
      diamondValue: '($8.90)',
      views: 56700,
    },
  },
  {
    id: 'video-7',
    publicKey: DEFAULT_PUBLIC_KEY,
    text: 'Peaceful moments 🧘‍♀️ Finding zen in everyday life #meditation #peace #mindfulness #zen',
    videoUrl: 'https://videos.pexels.com/video-files/31950901/13612857_1080_1920_30fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    engagement: {
      comments: 123,
      likes: 2340,
      reposts: 145,
      diamonds: 56,
      diamondValue: '($5.60)',
      views: 23400,
    },
  },
  {
    id: 'video-8',
    publicKey: LIVE_PUBLIC_KEY,
    text: 'Golden hour magic ✨ Nature never fails to amaze #goldenhour #nature #beauty #magic',
    videoUrl: 'https://videos.pexels.com/video-files/32024433/13650057_1080_1920_24fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    engagement: {
      comments: 267,
      likes: 3890,
      reposts: 178,
      diamonds: 78,
      diamondValue: '($7.80)',
      views: 38900,
    },
  },
  {
    id: 'video-9',
    publicKey: OTHER_PUBLIC_KEY,
    text: 'Urban exploration 🏙️ Discovering hidden gems in the city #urban #exploration #city #adventure',
    videoUrl: 'https://videos.pexels.com/video-files/31960626/13618167_1080_1920_30fps.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    engagement: {
      comments: 198,
      likes: 2760,
      reposts: 123,
      diamonds: 67,
      diamondValue: '($6.70)',
      views: 27600,
    },
  },
];

const TikTokSingleLayout = () => {
  return (
    <div className="bg-black text-white w-full h-screen flex items-center justify-center">
      <VideoReel 
        videos={sampleVideos} 
        variant="single"
        showEngagement={true}
      />
    </div>
  );
};

const TikTokCarouselLayout = () => {
  return (
    <div className="bg-black text-white w-full h-screen flex items-center justify-center">
      <VideoReel 
        videos={sampleVideos} 
        variant="carousel"
        showEngagement={true}
      />
    </div>
  );
};

const TikTokCarouselWithArrowsLayout = () => {
  return (
    <div className="bg-black text-white w-full h-screen flex items-center justify-center">
      <VideoReel 
        videos={sampleVideos} 
        variant="carousel-with-arrows"
        showEngagement={true}
      />
    </div>
  );
};

const TikTokFullHeightLayout = () => {
  return (
    <div className="bg-black text-white w-full h-screen">
      <VideoReel 
        videos={sampleVideos} 
        variant="full-height"
        showEngagement={true}
      />
    </div>
  );
};

const meta: Meta = {
  title: 'Examples/TikTok',
  component: TikTokSingleLayout,
  decorators: [(Story) => <Providers>{Story()}</Providers>],
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: successHandlers,
    },
  },
};

export default meta;

export const ExampleFullHeight: StoryObj = {
  render: () => <TikTokFullHeightLayout />,
  name: 'Example Video Reel',
}; 