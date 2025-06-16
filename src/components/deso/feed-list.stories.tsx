import type { Meta, StoryObj } from '@storybook/react';
import { FeedList } from './feed-list';
import { PostCardProps } from './post-card';
import { DEFAULT_PUBLIC_KEY, LIVE_PUBLIC_KEY } from '@/lib/constants';
import { successHandlers } from '@/lib/mocks/msw-handlers';

const meta: Meta<typeof FeedList> = {
  title: 'DeSo/FeedList',
  component: FeedList,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: successHandlers,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FeedList>;

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
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: 'This post includes a poll. What do you think?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    poll: {
      options: [{ text: 'Option A' }, { text: 'Option B' }],
      votes: [15, 30],
      totalVotes: 45,
      userVotedIndex: null,
    },
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
    publicKey: 'BC1YLgi66tdjAaVfYpmM447cxsve3TpvfXD9h8X6JMak7gbKABoEVaT',
    postContent:
      'Here is a reposted item in the feed, notice the status line.',
    status: {
      type: 'repost',
      reposterPublicKey: LIVE_PUBLIC_KEY,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    actions: {
      comments: 2,
      likes: 15,
      reposts: 3,
      diamonds: 0,
      diamondValue: '($0.00)',
      quotes: 0,
      views: 800,
    },
    postUrl: 'https://deso.org',
  },
];

export const Cards: Story = {
  args: {
    posts: samplePosts,
    variant: 'cards',
  },
};

export const Seamless: Story = {
  args: {
    posts: samplePosts,
    variant: 'seamless',
  },
}; 