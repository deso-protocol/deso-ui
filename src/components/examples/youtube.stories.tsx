import type { Meta, StoryObj } from '@storybook/react';
import { Providers } from '../../lib/providers';
import { PostVideo } from '../deso/post-video';
import { UserInfo } from '../deso/user-info';
import { FollowButton } from '../deso/follow-button';
import { MessageButton } from '../deso/message-button';
import { ProfileActions } from '../deso/profile-actions';
import { PostText } from '../deso/post-text';
import { PostCardProps } from '../deso/post-card';
import { MediaCard, MediaType } from '../deso/media-card';
import { FeedList } from '../deso/feed-list';
import { DEFAULT_PUBLIC_KEY, OTHER_PUBLIC_KEY, LIVE_PUBLIC_KEY } from '../../lib/constants';
import { successHandlers } from '../../lib/mocks/msw-handlers';
import { Timestamp } from '../deso/timestamp';
import { PostEngagement } from '../deso/post-engagement';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PostShare } from '../deso/post-share';
import { UserMenu } from '../deso/user-menu';
import { Logo } from '../deso/logo';
import { SearchBar } from '../deso/search-bar';

const videoDescription = `
# Building the Future of Decentralized Social Media

In this comprehensive deep dive, we explore how DeSo is revolutionizing social media through blockchain technology. From creator monetization to user ownership of data, discover how decentralized networks are changing the game.

## What we cover:
- The problems with traditional social media platforms
- How blockchain solves content ownership issues  
- Creator monetization through diamonds and NFTs
- The importance of decentralized identity
- Building on DeSo: Tools and opportunities for developers

🔗 **Links mentioned:**
- DeSo Documentation: https://docs.deso.org
- DeSo GitHub: https://github.com/deso-protocol
- Creator Coin Guide: https://deso.org/creator-coins

📱 **Follow us:**
- Twitter: @desoprotocol
- Discord: https://discord.gg/deso

#DeSo #Blockchain #SocialMedia #Web3 #Decentralization
`;

const sampleComments: PostCardProps[] = [
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'Amazing explanation! This really helped me understand the benefits of decentralized social media. The creator monetization aspect is particularly interesting.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    actions: { 
      comments: 5, 
      likes: 127, 
      reposts: 12, 
      diamonds: 8, 
      diamondValue: '($0.80)', 
      quotes: 2, 
      views: 1200 
    },
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: 'Great video! I\'ve been following DeSo for a while and it\'s exciting to see how the ecosystem is growing. The developer tools are getting really powerful.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    actions: { 
      comments: 2, 
      likes: 89, 
      reposts: 6, 
      diamonds: 4, 
      diamondValue: '($0.40)', 
      quotes: 1, 
      views: 800 
    },
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'Thanks for breaking this down in such detail. The comparison with traditional platforms really highlights why we need this shift to decentralization.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    actions: { 
      comments: 1, 
      likes: 45, 
      reposts: 3, 
      diamonds: 2, 
      diamondValue: '($0.20)', 
      quotes: 0, 
      views: 500 
    },
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'Love the technical deep dive! As a developer, I\'m excited to start building on DeSo. The API documentation looks comprehensive.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    actions: { 
      comments: 3, 
      likes: 67, 
      reposts: 8, 
      diamonds: 5, 
      diamondValue: '($0.50)', 
      quotes: 1, 
      views: 650 
    },
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: 'The creator coin concept is fascinating. It\'s like having your own personal stock market for content creators.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    actions: { 
      comments: 0, 
      likes: 34, 
      reposts: 2, 
      diamonds: 1, 
      diamondValue: '($0.10)', 
      quotes: 0, 
      views: 400 
    },
  },
];

const relatedVideos = [
  {
    id: 'related-1',
    imageUrl: 'https://picsum.photos/seed/deso-intro/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 25400,
    duration: '12:34',
    videoUrl: 'https://videos.pexels.com/video-files/31985791/13630710_1080_1920_30fps.mp4',
    publicKey: LIVE_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    title: 'DeSo Protocol Explained: The Complete Beginner\'s Guide',
    description: 'Everything you need to know about DeSo protocol, from basic concepts to advanced features.',
  },
  {
    id: 'related-2',
    imageUrl: 'https://picsum.photos/seed/creator-coins/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 18900,
    duration: '8:45',
    videoUrl: 'https://videos.pexels.com/video-files/16898787/16898787-uhd_1440_2560_60fps.mp4',
    publicKey: OTHER_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    title: 'Creator Coins: How to Monetize Your Content on DeSo',
    description: 'Learn how creator coins work and how content creators are earning money on decentralized platforms.',
  },
  {
    id: 'related-3',
    imageUrl: 'https://picsum.photos/seed/nft-guide/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 14200,
    duration: '15:22',
    publicKey: DEFAULT_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    title: 'NFTs on DeSo: Minting and Trading Digital Assets',
    description: 'Complete guide to creating, minting, and trading NFTs on the DeSo blockchain.',
  },
  {
    id: 'related-4',
    imageUrl: 'https://picsum.photos/seed/web3-social/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 31500,
    duration: '20:18',
    publicKey: LIVE_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    title: 'The Future of Social Media: Web3 vs Web2 Platforms',
    description: 'Comparing traditional social media with decentralized alternatives and why the shift matters.',
  },
  {
    id: 'related-5',
    imageUrl: 'https://picsum.photos/seed/deso-dev/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 9800,
    duration: '25:47',
    publicKey: OTHER_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    title: 'Building Apps on DeSo: Developer Tutorial',
    description: 'Step-by-step guide for developers to build applications on the DeSo blockchain.',
  },
  {
    id: 'related-6',
    imageUrl: 'https://picsum.photos/seed/defi-social/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 22100,
    duration: '11:33',
    publicKey: DEFAULT_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    title: 'DeFi Meets Social: Understanding Social Tokens',
    description: 'How decentralized finance concepts are being applied to social media platforms.',
  },
  {
    id: 'related-7',
    imageUrl: 'https://picsum.photos/seed/content-ownership/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 16700,
    duration: '9:12',
    publicKey: LIVE_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16),
    title: 'Content Ownership in the Age of Blockchain',
    description: 'Why owning your content matters and how blockchain technology makes it possible.',
  },
  {
    id: 'related-8',
    imageUrl: 'https://picsum.photos/seed/deso-ecosystem/640/360',
    mediaType: 'video' as MediaType,
    viewCount: 12300,
    duration: '18:56',
    publicKey: OTHER_PUBLIC_KEY,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18),
    title: 'DeSo Ecosystem Overview: Apps, Tools, and Opportunities',
    description: 'Explore the growing ecosystem of applications and tools built on DeSo.',
  },
];

const YouTubeLayout = () => {
  const [like, setLike] = useState({ active: false, count: 2847 });
  const [dislike, setDislike] = useState({ active: false, count: 23 });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [repost, setRepost] = useState({ active: false, count: 12 });
  const toggleLike = () => {
    setLike(prev => ({
      active: !prev.active,
      count: prev.active ? prev.count - 1 : prev.count + 1
    }));
    // If liking, remove dislike
    if (!like.active && dislike.active) {
      setDislike(prev => ({ active: false, count: prev.count - 1 }));
    }
  };

  const toggleRepost = () => {
    setRepost(prev => ({
      active: !prev.active,
      count: prev.active ? prev.count - 1 : prev.count + 1
    }));
  };

  return (
    <div className="bg-background text-foreground w-full h-screen border border-border rounded-xl bg-clip-border overflow-scroll relative">

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo width={100} height={32} />
            </div>
            
            {/* Search Bar */}
            <div className="flex flex-1 gap-4 max-w-sm items-center">
              <SearchBar
                placeholder="Search..."
                size="md"
                className="w-full"
              />
              {/* User Menu */}
              <UserMenu 
                variant="compact"
                currentUser={{
                  publicKey: DEFAULT_PUBLIC_KEY,
                  profile: {
                    username: 'testuser',
                    profilePic: 'https://picsum.photos/200/300',
                    isVerified: true,
                    publicKey: DEFAULT_PUBLIC_KEY,
                    description: 'A mock user profile.',
                  },
                }} />
            </div>
          </div>
        </div>
      </header>


      <div className="max-w-7xl mx-auto p-4 flex gap-6">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* Video Player */}
          <div className="mb-4">
            <PostVideo 
              url="/video-sample.mp4" 
              className="mt-0 rounded-lg aspect-video w-full"
            />
          </div>

          {/* Video Title */}
          <div className="flex gap-4 text-sm justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold max-w-xl">
                Building the Future of Decentralized Social Media with DeSo Protocol
              </h1>
              <div className="flex items-center justify-between mb-4 pb-4">
              <div className="flex items-center gap-4">
                <PostEngagement
                  variant="like"
                  count={like.count}
                  active={like.active}
                  onClick={toggleLike}
                />
                  <PostEngagement
                  variant="repost"
                  count={repost.count}
                  active={repost.active}
                  onClick={toggleRepost}
                />
              </div>              
            </div>
            </div>
            <div className="flex items-end text-sm text-muted-foreground flex-col">             
              <PostShare 
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                text="Check out this video!"
                label="Share"
                buttonVariant="outline"
              />
            </div>
          </div>

          {/* Video Stats and Actions */}
          

          {/* Channel Info and Actions */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <UserInfo
                publicKey={LIVE_PUBLIC_KEY}
                pictureSize="lg"
                showVerification={true}
                layout="row"
                gap="md"
              >
                <div className="text-sm text-muted-foreground">
                  1.2M subscribers
                </div>
              </UserInfo>
            </div>
            
            <div className="flex items-center gap-3">
              <FollowButton
                isFollowing={isSubscribed}
                onClick={() => setIsSubscribed(!isSubscribed)}
                variant="default"
              />
              <MessageButton variant="icon-only" showTooltip />
              <ProfileActions />
            </div>
          </div>

          {/* Video Description */}
          <div className="mb-8 p-8 rounded-xl bg-card">
            <div className="flex mb-6 flex-row">  
              <span className="text-sm text-muted-foreground">127,543 views • </span>
              <span className="text-sm text-muted-foreground"> Posted <Timestamp timestamp={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)} /> </span>
            </div>
            <PostText 
              text={videoDescription} 
              variant="rich" 
            />
          </div>

          {/* Comments Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Comments ({sampleComments.length})</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Sort by</span>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Top comments" />
                  </SelectTrigger>
                  <SelectContent className="border border-border">
                    <SelectItem value="top">Top comments</SelectItem>
                    <SelectItem value="newest">Newest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <FeedList 
              posts={sampleComments} 
              variant="cards" 
              gap={16}
              className="border-none p-0"
            />
          </section>
        </div>

        {/* Sidebar - Related Videos */}
        <aside className="w-96 flex-shrink-0">
          <div className="sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <MediaCard 
                  key={video.id} 
                  showStats={false}
                  showIcon={false}
                  {...video} 
                  compact={true}
                  description=""
                  onClick={() => console.log('Related video clicked:', video.title)}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Examples/YouTube',
  component: YouTubeLayout,
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

export const ExampleVideoPage: StoryObj = {
  render: () => <YouTubeLayout />,
}; 