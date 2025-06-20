import type { Meta, StoryObj } from '@storybook/react';
import { NavigationList, NavigationItemProps } from '../deso/navigation-list';
import { UserMenu } from '../deso/user-menu';
import { Editor } from '../deso/editor';
import { FeedList } from '../deso/feed-list';
import { ProfileCard } from '../deso/profile-card';
import { UserSearch } from '../deso/user-search';
import {
  Home,
  Compass,
  Bell,
  Mail,
  Wallet,
  User,
  Settings,
} from 'lucide-react';
import { Providers } from '../../lib/providers';
import {
  DEFAULT_PUBLIC_KEY,
  DEFAULT_USERNAME,
  LIVE_PUBLIC_KEY,
  OTHER_PUBLIC_KEY,
} from '../../lib/constants';
import { PostCardProps } from '../deso/post-card';
import { searchUsers, mockProfiles } from '../../lib/mocks/deso-data';
import {
  successHandlers,
} from '@/lib/mocks/msw-handlers';
import { Logo } from '../deso/logo';
import { MessageInbox, MessageInboxSidebarItem } from '../deso/message-inbox';
import { Message } from '../deso/message-chat-list';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MediaGallery } from '../deso/media-gallery';
import { MediaType } from '../deso/media-item';
import { ProfileList } from '../deso/profile-list';

const getNavItems = (activeLabel: string): NavigationItemProps[] => {
  const baseItems: Omit<NavigationItemProps, 'isActive'>[] = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/explore', icon: Compass, label: 'Discover' },
    {
      href: '/notifications',
      icon: Bell,
      label: 'Notifications',
      unreadCount: 71,
    },
    { href: '/messages', icon: Mail, label: 'Messages', unreadCount: 120 },
    { href: '/wallet', icon: Wallet, label: 'Wallet' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return baseItems.map((item) => ({
    ...item,
    isActive: item.label === activeLabel,
  }));
};

const mockAccounts = Object.values(searchUsers).map((user) => ({
  publicKey: user.publicKey,
  profile: {
    username: user.username,
    profilePic: user.profilePic,
    isVerified: user.isVerified,
    publicKey: user.publicKey,
    description: 'A mock user profile.',
  },
}));

const samplePosts: PostCardProps[] = [
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'This is a standard post in the feed.',
    timestamp: new Date(),
    actions: {
      comments: 5,
      likes: 25,
      reposts: 10,
      diamonds: 2,
      diamondValue: '($0.10)',
      quotes: 3,
      views: 1200,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'A post with an image!',
    images: ['https://placehold.co/1200x800/dbd8e3/352f44'],
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    actions: {
      comments: 12,
      likes: 150,
      reposts: 30,
      diamonds: 5,
      diamondValue: '($0.50)',
      quotes: 8,
      views: 5400,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent:
      'Just tried out the new markdown editor, it is awesome! #DeSo',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actions: {
      comments: 20,
      likes: 75,
      reposts: 5,
      diamonds: 1,
      diamondValue: '($0.05)',
      quotes: 1,
      views: 2300,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'This post includes a poll. What do you think?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    poll: {
      options: [{ text: 'Great!' }, { text: 'Needs work' }, { text: 'Not sure' }],
      votes: [15, 5, 10],
      totalVotes: 30,
      userVotedIndex: null,
    },
    actions: {
      comments: 8,
      likes: 30,
      reposts: 2,
      diamonds: 0,
      diamondValue: '($0.00)',
      quotes: 1,
      views: 1500,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'Check out this YouTube video!',
    embedUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    actions: {
      comments: 15,
      likes: 200,
      reposts: 50,
      diamonds: 10,
      diamondValue: '($1.00)',
      quotes: 12,
      views: 10000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: 'Loving this track on Spotify.',
    embedUrl: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    actions: {
      comments: 3,
      likes: 40,
      reposts: 8,
      diamonds: 1,
      diamondValue: '($0.10)',
      quotes: 2,
      views: 2500,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'This is a repost of another great post.',
    status: {
      type: 'repost',
      reposterPublicKey: LIVE_PUBLIC_KEY,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    actions: {
      comments: 1,
      likes: 10,
      reposts: 0,
      diamonds: 0,
      diamondValue: '($0.00)',
      quotes: 0,
      views: 500,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'This is an exclusive post, unlock to see the image!',
    images: ['https://placehold.co/1200x800/ff69b4/ffffff'],
    isUnlockable: true,
    blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
    actions: {
      comments: 50,
      likes: 500,
      reposts: 100,
      diamonds: 25,
      diamondValue: '($5.00)',
      quotes: 20,
      views: 50000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent:
      'I am quoting this amazing post. A must read for everyone in #DeSo',
    quotedPost: {
      publicKey: DEFAULT_PUBLIC_KEY,
      postContent: 'The future of social media is decentralized.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 100),
    actions: {
      comments: 18,
      likes: 80,
      reposts: 22,
      diamonds: 4,
      diamondValue: '($0.40)',
      quotes: 0,
      views: 4000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'Here are multiple images in a bento box layout.',
    images: [
      'https://placehold.co/800x600/352f44/dbd8e3',
      'https://placehold.co/800x600/625772/dbd8e3',
      'https://placehold.co/800x600/a39ba8/dbd8e3',
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 150),
    actions: {
      comments: 9,
      likes: 65,
      reposts: 14,
      diamonds: 3,
      diamondValue: '($0.30)',
      quotes: 4,
      views: 3200,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'This post is a featured video!',
    videoUrl: '/video-sample.mp4',
    layout: 'featured-media',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 180),
    actions: {
      comments: 30,
      likes: 300,
      reposts: 70,
      diamonds: 15,
      diamondValue: '($1.50)',
      quotes: 25,
      views: 25000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: 'Check out this NFT post.',
    images: ['https://placehold.co/1200x800/dbd8e3/352f44'],
    nft: {
      publicKey: OTHER_PUBLIC_KEY,
      price: '5.5 DESO',
      lastSale: '1.2 DESO',
      royaltyFee: '5%',
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
      ownerPublicKey: LIVE_PUBLIC_KEY,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 200),
    actions: {
      comments: 22,
      likes: 120,
      reposts: 35,
      diamonds: 8,
      diamondValue: '($0.80)',
      quotes: 10,
      views: 8000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'This is a rich text post with markdown!',
    postBodyVariant: 'rich',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 220),
    actions: {
      comments: 4,
      likes: 45,
      reposts: 9,
      diamonds: 2,
      diamondValue: '($0.20)',
      quotes: 3,
      views: 2800,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'Listen to my new track!',
    audioUrl: '/audio-sample.mp3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 240),
    actions: {
      comments: 15,
      likes: 120,
      reposts: 25,
      diamonds: 7,
      diamondValue: '($0.70)',
      quotes: 5,
      views: 6000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'A simple video post.',
    videoUrl: '/video-sample.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 260),
    actions: {
      comments: 20,
      likes: 250,
      reposts: 60,
      diamonds: 12,
      diamondValue: '($1.20)',
      quotes: 15,
      views: 15000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: 'Four images in a bento box!',
    images: [
      'https://placehold.co/800x600/fca5a5/4b5563',
      'https://placehold.co/800x600/fdba74/4b5563',
      'https://placehold.co/800x600/fde047/4b5563',
      'https://placehold.co/800x600/a7f3d0/4b5563',
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 280),
    actions: {
      comments: 11,
      likes: 88,
      reposts: 22,
      diamonds: 4,
      diamondValue: '($0.44)',
      quotes: 6,
      views: 4400,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'Carousel of my recent trip!',
    images: [
      'https://placehold.co/1200x800/352f44/dbd8e3',
      'https://placehold.co/1200x800/625772/dbd8e3',
      'https://placehold.co/1200x800/a39ba8/dbd8e3',
      'https://placehold.co/1200x800/b9b7bd/352f44',
      'https://placehold.co/1200x800/dbd8e3/352f44',
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 300),
    actions: {
      comments: 33,
      likes: 180,
      reposts: 45,
      diamonds: 11,
      diamondValue: '($1.10)',
      quotes: 14,
      views: 9800,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'An important announcement has been pinned to my profile.',
    status: { type: 'pinned' },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 320),
    actions: {
      comments: 100,
      likes: 1000,
      reposts: 200,
      diamonds: 50,
      diamondValue: '($50.00)',
      quotes: 80,
      views: 100000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: 'Interesting take from the DeSo team on X.',
    embedUrl: 'https://x.com/desoprotocol/status/1933587613434458243',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 340),
    actions: {
      comments: 25,
      likes: 150,
      reposts: 40,
      diamonds: 6,
      diamondValue: '($0.60)',
      quotes: 16,
      views: 7500,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent:
      'This is a very long rich text post that should be truncated by default. It talks about the future of decentralized social media and how platforms like DeSo are paving the way for a more open and fair internet. It goes on and on to demonstrate the line-clamping functionality. It should show a "Show more" button to expand the full content. This is crucial for keeping the feed clean and readable, especially for very verbose posts. Users can then choose to expand the ones they are interested in.',
    postBodyVariant: 'rich',
    lineClamp: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 360),
    actions: {
      comments: 7,
      likes: 60,
      reposts: 11,
      diamonds: 2,
      diamondValue: '($0.20)',
      quotes: 5,
      views: 3300,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: 'So many reactions on this one!',
    reactions: [
      { emoji: '👍', count: 122, userHasReacted: true },
      { emoji: '🔥', count: 85, userHasReacted: false },
      { emoji: '🚀', count: 53, userHasReacted: true },
      { emoji: '🤯', count: 44, userHasReacted: false },
      { emoji: '❤️', count: 150, userHasReacted: true },
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 380),
    actions: {
      comments: 45,
      likes: 454,
      reposts: 110,
      diamonds: 33,
      diamondValue: '($3.30)',
      quotes: 40,
      views: 45000,
    },
    postUrl: 'https://deso.org',
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'Quoting a video post!',
    quotedPost: {
      publicKey: LIVE_PUBLIC_KEY,
      postContent: 'This video is amazing!',
      videoUrl: '/video-sample.mp4',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 440),
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 420),
    actions: {
      comments: 14,
      likes: 77,
      reposts: 19,
      diamonds: 3,
      diamondValue: '($0.30)',
      quotes: 0,
      views: 5100,
    },
    postUrl: 'https://deso.org',
  },
];

const sampleNotifications: PostCardProps[] = [
  // like notification
  {
    ...samplePosts[1],
    notification: {
      type: 'diamond',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  },
  // comment notification
  {
    ...samplePosts[2],
    notification: {
      type: 'comment',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  },
  // repost notification
  {
    ...samplePosts[0],
    notification: {
      type: 'repost',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  },
  // mention notification
  {
    ...samplePosts[3],
    notification: {
      type: 'mention',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
  },
  // follow notification
  {
    publicKey: LIVE_PUBLIC_KEY,
    postContent: '',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    notification: {
      type: 'follow',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    actions: undefined,
  },
  // Diamond notification on a video post
  {
    ...samplePosts[14],
    notification: {
      type: 'diamond',
      publicKey: DEFAULT_PUBLIC_KEY,
      username: 'DefaultUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  },
  // Comment on a quoted post
  {
    ...samplePosts[8],
    notification: {
      type: 'comment',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  },
  // Follow notification
  {
    publicKey: OTHER_PUBLIC_KEY,
    postContent: '',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    notification: {
      type: 'follow',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    },
    actions: undefined,
  },
  // Mention in a rich text post
  {
    ...samplePosts[12],
    notification: {
      type: 'mention',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  },
  // Repost of an audio post
  {
    ...samplePosts[13],
    notification: {
      type: 'repost',
      publicKey: DEFAULT_PUBLIC_KEY,
      username: 'DefaultUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
  },
  // Diamond on an NFT post
  {
    ...samplePosts[11],
    notification: {
      type: 'diamond',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
    },
  },
  // Comment on a poll post
  {
    ...samplePosts[3],
    notification: {
      type: 'comment',
      publicKey: DEFAULT_PUBLIC_KEY,
      username: 'DefaultUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    },
  },
  // Follow notification
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: '',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9),
    notification: {
      type: 'follow',
      publicKey: DEFAULT_PUBLIC_KEY,
      username: 'DefaultUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9),
    },
    actions: undefined,
  },
  // Repost of a post with multiple images
  {
    ...samplePosts[9],
    notification: {
      type: 'repost',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
    },
  },
  // Mention in a post with a Spotify embed
  {
    ...samplePosts[5],
    notification: {
      type: 'mention',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11),
    },
  },
  // Diamond on a featured video post
  {
    ...samplePosts[10],
    notification: {
      type: 'diamond',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  },
  // Comment on a repost
  {
    ...samplePosts[6],
    notification: {
      type: 'comment',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 13),
    },
  },
  // Repost of an unlockable post
  {
    ...samplePosts[7],
    notification: {
      type: 'repost',
      publicKey: DEFAULT_PUBLIC_KEY,
      username: 'DefaultUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14),
    },
  },
  // Mention in a long rich text post
  {
    ...samplePosts[19],
    notification: {
      type: 'mention',
      publicKey: OTHER_PUBLIC_KEY,
      username: 'OtherUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15),
    },
  },
  // Diamond on a post with reactions
  {
    ...samplePosts[20],
    notification: {
      type: 'diamond',
      publicKey: LIVE_PUBLIC_KEY,
      username: 'LiveUser',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 16),
    },
  },
];

const mockPrimaryItems: MessageInboxSidebarItem[] = [
  {
    publicKey: LIVE_PUBLIC_KEY,
    lastMessage: "Hey, did you see the latest DeSo update? It's pretty cool.",
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 3,
  },
  {
    publicKey: OTHER_PUBLIC_KEY,
    lastMessage: 'Yeah, I saw it. The new features look promising. Let me know what you think.',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
  },
  {
    publicKey: 'BC1YLjBJ591mJzB3iTfE6XkYgXMrVvC9k6pGqXyYwZzZzZzZzZzZz',
    lastMessage: 'Can you send me the link to the documentation?',
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 1,
  },
];

const mockRequestItems: MessageInboxSidebarItem[] = [
  {
    publicKey: 'BC1YLg7hV2p13KxS6aHh9iWJmK8a3dZ2YXVbF1aE3H4XoJpE8bF2Z',
    lastMessage: "Hi, I'm new to DeSo and had a few questions.",
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unreadCount: 1,
  },
];

const initialMessages: { [key: string]: Message[] } = {
  [LIVE_PUBLIC_KEY]: [
    {
      publicKey: LIVE_PUBLIC_KEY,
      message: "Hey, did you see the latest DeSo update? It's pretty cool.",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      publicKey: DEFAULT_PUBLIC_KEY,
      message: "No, I missed it. What's new?",
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
    },
    {
      publicKey: LIVE_PUBLIC_KEY,
      message: "They've added a bunch of new features for developers. The documentation is updated too.",
      timestamp: new Date(Date.now() - 1000 * 60 * 6),
    },
  ],
  [OTHER_PUBLIC_KEY]: [
    {
      publicKey: OTHER_PUBLIC_KEY,
      message: 'Yeah, I saw it. The new features look promising. Let me know what you think.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ],
  'BC1YLjBJ591mJzB3iTfE6XkYgXMrVvC9k6pGqXyYwZzZzZzZzZzZz': [
    {
      publicKey: 'BC1YLjBJ591mJzB3iTfE6XkYgXMrVvC9k6pGqXyYwZzZzZzZzZzZz',
      message: 'Can you send me the link to the documentation?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ],
  'BC1YLg7hV2p13KxS6aHh9iWJmK8a3dZ2YXVbF1aE3H4XoJpE8bF2Z': [
    {
      publicKey: 'BC1YLg7hV2p13KxS6aHh9iWJmK8a3dZ2YXVbF1aE3H4XoJpE8bF2Z',
      message: "Hi, I'm new to DeSo and had a few questions.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
  ],
};

const mediaItems = [
  ...samplePosts
    .filter((post) => post.images || post.videoUrl || post.audioUrl)
    .flatMap((post, postIndex) => {
      if (post.images) {
        return post.images.map((img, i) => ({
          id: `${post.publicKey}-img-${postIndex}-${i}`,
          imageUrl: `https://picsum.photos/seed/${post.publicKey}${postIndex}${i}/400/600`,
          mediaType: 'image' as MediaType,
          viewCount: post.actions?.views || Math.floor(Math.random() * 10000),
        }));
      }
      if (post.videoUrl) {
        return [
          {
            id: `${post.publicKey}-video-${postIndex}`,
            imageUrl: `https://picsum.photos/seed/${post.publicKey}${postIndex}/400/600`,
            mediaType: 'video' as MediaType,
            viewCount: post.actions?.views || 0,
          },
        ];
      }
      if (post.audioUrl) {
        return [
          {
            id: `${post.publicKey}-audio-${postIndex}`,
            imageUrl: `https://picsum.photos/seed/${post.publicKey}${postIndex}/400/600`,
            mediaType: 'audio' as MediaType,
            viewCount: post.actions?.views || 0,
          },
        ];
      }
      return [];
    }),
];

const discoverProfiles = Object.values(searchUsers)
  .slice(0, 20)
  .map((user) => ({
    publicKey: user.publicKey,
    showFeaturedImage: false,
    showTags: true,
    showDescription: true,
    showStats: true,
  }));

const TwitterLayout = () => {
  const navItems = getNavItems('Home');
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full max-w-7xl justify-center mx-auto gap-6">
        <aside className="w-[240px]">
          <div className="pl-4 mb-4">
            <Logo width={90} />
          </div>
          <NavigationList items={navItems} />
          <div className="mt-4 ml-4">
            <UserMenu
              currentUser={{
                publicKey: DEFAULT_PUBLIC_KEY,
                profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
              }}
              otherAccounts={mockAccounts}
              variant="full"
              triggerClassName="rounded-full"
            />
          </div>
        </aside>

        <main className="w-[700px] flex-col gap-6 flex">
          <Editor
            currentUser={{ publicKey: DEFAULT_PUBLIC_KEY }}
            onSubmit={() => {}}
          />
          <FeedList posts={samplePosts} variant="cards" gap={24} />
        </main>

        <aside className="w-[350px]">
          <div className="mb-4">
            <UserSearch onSelectUser={() => {}} />
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="text-lg font-bold mb-4">Who to follow</h2>
            <div className="flex flex-col gap-4">
              <ProfileCard
                publicKey={LIVE_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
              <ProfileCard
                publicKey={OTHER_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const MessagesLayout = () => {
  const navItems = getNavItems('Messages');
  const [selectedUser, setSelectedUser] = useState<string>(LIVE_PUBLIC_KEY);
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      publicKey: DEFAULT_PUBLIC_KEY,
      message: message,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser]: [...(prevMessages[selectedUser] || []), newMessage],
    }));
  };

  const handleSelectUser = (publicKey: string) => {
    setSelectedUser(publicKey);
  };

  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full max-w-7xl justify-center mx-auto gap-6">
        <aside className="w-[240px]">
          <div className="pl-4 mb-4">
            <Logo width={90} />
          </div>
          <NavigationList items={navItems} />
          <div className="mt-4 ml-4">
            <UserMenu
              currentUser={{
                publicKey: DEFAULT_PUBLIC_KEY,
                profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
              }}
              otherAccounts={mockAccounts}
              variant="full"
              triggerClassName="rounded-full"
            />
          </div>
        </aside>

        <main className="w-[calc(100%-240px)] flex-col flex">
          <MessageInbox
            users={Object.values(searchUsers).map((u) => ({
              publicKey: u.publicKey,
              username: u.username,
            }))}
            currentUserPublicKey={DEFAULT_PUBLIC_KEY}
            messages={messages[selectedUser] || []}
            onSendMessage={handleSendMessage}
            selectedUserPublicKey={selectedUser}
            onSelectUser={handleSelectUser}
            primaryItems={mockPrimaryItems}
            requestItems={mockRequestItems}
            onMarkAsRead={(pk) => console.log('Mark as read:', pk)}
            onArchive={(pk) => console.log('Archive:', pk)}
          />
        </main>
      </div>
    </div>
  );
};

const NotificationsLayout = () => {
  const navItems = getNavItems('Notifications');
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full max-w-7xl justify-center mx-auto gap-6">
        <aside className="w-[240px]">
          <div className="pl-4 mb-4">
            <Logo width={90} />
          </div>
          <NavigationList items={navItems} />
          <div className="mt-4 ml-4">
            <UserMenu
              currentUser={{
                publicKey: DEFAULT_PUBLIC_KEY,
                profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
              }}
              otherAccounts={mockAccounts}
              variant="full"
              triggerClassName="rounded-full"
            />
          </div>
        </aside>

        <main className="w-[700px] flex-col gap-6 flex">
          <h1 className="text-2xl font-bold pb-0">Notifications</h1>
          <FeedList posts={sampleNotifications} variant="cards" gap={24} />
        </main>

        <aside className="w-[350px]">
          <div className="mb-4">
            <UserSearch onSelectUser={() => {}} />
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="text-lg font-bold mb-4">Who to follow</h2>
            <div className="flex flex-col gap-4">
              <ProfileCard
                publicKey={LIVE_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
              <ProfileCard
                publicKey={OTHER_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ProfileLayout = () => {
  const navItems = getNavItems('Profile');
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full max-w-7xl justify-center mx-auto gap-6">
        <aside className="w-[240px]">
          <div className="pl-4 mb-4">
            <Logo width={90} />
          </div>
          <NavigationList items={navItems} />
          <div className="mt-4 ml-4">
            <UserMenu
              currentUser={{
                publicKey: DEFAULT_PUBLIC_KEY,
                profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
              }}
              otherAccounts={mockAccounts}
              variant="full"
              triggerClassName="rounded-full"
            />
          </div>
        </aside>

        <main className="w-[700px] flex-col gap-6 flex">
          <ProfileCard publicKey={DEFAULT_PUBLIC_KEY} />
          <Tabs defaultValue="posts">
            <TabsList className="w-full mb-2">
              <TabsTrigger value="posts" className="flex-1">
                Posts
              </TabsTrigger>
              <TabsTrigger value="media" className="flex-1">
                Media
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <FeedList posts={samplePosts} variant="cards" gap={24} />
            </TabsContent>
            <TabsContent value="media">
              <MediaGallery mediaItems={mediaItems} variant="masonry" />
            </TabsContent>
          </Tabs>
        </main>

        <aside className="w-[350px]">
          <div className="mb-4">
            <UserSearch onSelectUser={() => {}} />
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="text-lg font-bold mb-4">Who to follow</h2>
            <div className="flex flex-col gap-4">
              <ProfileCard
                publicKey={LIVE_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
              <ProfileCard
                publicKey={OTHER_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const DiscoverLayout = () => {
  const navItems = getNavItems('Discover');
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground w-full">
      <div className="flex w-full max-w-7xl justify-center mx-auto gap-6">
        <aside className="w-[240px]">
          <div className="pl-4 mb-4">
            <Logo width={90} />
          </div>
          <NavigationList items={navItems} />
          <div className="mt-4 ml-4">
            <UserMenu
              currentUser={{
                publicKey: DEFAULT_PUBLIC_KEY,
                profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
              }}
              otherAccounts={mockAccounts}
              variant="full"
              triggerClassName="rounded-full"
            />
          </div>
        </aside>

        <main className="w-[700px] flex-col gap-6 flex">
          <h1 className="text-2xl font-bold pb-0">Discover</h1>
          <ProfileList profiles={discoverProfiles} />
          <ProfileList profiles={discoverProfiles} />
          <ProfileList profiles={discoverProfiles} />
          <ProfileList profiles={discoverProfiles} />
          <ProfileList profiles={discoverProfiles} />
          <ProfileList profiles={discoverProfiles} />
        </main>

        <aside className="w-[350px]">
          <div className="mb-4">
            <UserSearch onSelectUser={() => {}} />
          </div>
          <div className="border rounded-xl p-4">
            <h2 className="text-lg font-bold mb-4">Who to follow</h2>
            <div className="flex flex-col gap-4">
              <ProfileCard
                publicKey={LIVE_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
              <ProfileCard
                publicKey={OTHER_PUBLIC_KEY}
                variant="compact"
                showMessageButton={false}
                showActionMenu={false}
                followButtonVariant="icon-only"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Examples/Twitter',
  component: TwitterLayout,
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

export const ExampleFeed: StoryObj = {
  render: () => <TwitterLayout />,
};

export const ExampleDiscover: StoryObj = {
  render: () => <DiscoverLayout />,
}; 

export const ExampleNotifications: StoryObj = {
  render: () => <NotificationsLayout />,
};

export const ExampleMessages: StoryObj = {
  render: () => <MessagesLayout />,
};

export const ExampleProfile: StoryObj = {
  render: () => <ProfileLayout />,
};