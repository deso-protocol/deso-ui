import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './post-card';
import { DEFAULT_PUBLIC_KEY, LIVE_PUBLIC_KEY } from '@/lib/constants';
import {
  successHandlers,
  errorHandlers,
  loadingHandlers,
} from '@/lib/mocks/msw-handlers';
import { simpleText, longSimpleText, richText, longRichText } from '@/lib/constants';

const meta: Meta<typeof PostCard> = {
  title: 'DeSo/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    postContent: {
      control: 'text',
    },
    publicKey: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostCard>;

const sampleActions = {
  comments: 1,
  likes: 11,
  reposts: 2,
  diamonds: 2,
  diamondValue: '($0.02)',
  quotes: 1,
  views: 135000,
};

const containerWidth = 'max-w-full w-[700px]';

const oneImage = ['https://placehold.co/1200x800/dbd8e3/352f44'];
const twoImages = [
  ...oneImage,
  'https://placehold.co/1200x800/a39ba8/352f44',
];
const threeImages = [
  ...twoImages,
  'https://placehold.co/1200x800/625772/352f44',
];
const fourImages = [
  ...threeImages,
  'https://placehold.co/1200x800/352f44/dbd8e3',
];
const fiveImages = [
  ...fourImages,
  'https://placehold.co/1200x800/b9b7bd/352f44',
];

const quotedPostSample = {
  publicKey: LIVE_PUBLIC_KEY,
  postContent:
    'This is the post that is being quoted. It can also have images and stuff.',
  timestamp: new Date('2023-05-20T10:00:00Z'),
  images: oneImage,
};

export const Default: Story = {
  name: 'Default (No Image)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent: simpleText,
    actions: sampleActions,
    timestamp: new Date(),
    postUrl: 'https://www.deso.org',
    postBodyVariant: 'simple',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithImage: Story = {
  name: 'With Image (default)',
  args: {
    ...Default.args,
    images: oneImage,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    ...Default.args,
    images: oneImage,
  },
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
};

export const Live: Story = {
  name: 'Live Data',
  args: {
    publicKey: LIVE_PUBLIC_KEY,
    postContent:
      'This is a post from a live user on the DeSo blockchain. The profile picture and username are fetched in real-time.',
    actions: sampleActions,
    timestamp: new Date(),
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: [], // Bypass MSW
    },
  },
};

export const WithFullDate: Story = {
  name: 'With Full Date',
  args: {
    ...Default.args,
    timestamp: new Date('2023-01-01T12:00:00Z'),
    images: twoImages,
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithBento3: Story = {
  name: 'With Bento (3 images)',
  args: {
    ...Default.args,
    images: threeImages,
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithBento4: Story = {
  name: 'With Bento (4 images)',
  args: {
    ...Default.args,
    images: fourImages,
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithCarousel: Story = {
  name: 'With Carousel',
  args: {
    ...Default.args,
    images: fiveImages,
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithQuotePost: Story = {
  name: 'With Quote Post',
  args: {
    ...Default.args,
    postContent: "I'm quoting this post, what do you all think?",
    quotedPost: quotedPostSample,
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithYouTubeEmbed: Story = {
  name: 'With YouTube Embed',
  args: {
    ...Default.args,
    postContent: 'Check out this cool video!',
    className: containerWidth,
    embedUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithSpotifyEmbed: Story = {
  name: 'With Spotify Embed',
  args: {
    ...Default.args,
    postContent: 'Listening to this banger!',
    className: containerWidth,
    embedUrl: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp',
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithSoundCloudEmbed: Story = {
  name: 'With SoundCloud Embed',
  args: {
    ...Default.args,
    postContent: 'New track on SoundCloud!',
    className: containerWidth,
    embedUrl:
      'https://soundcloud.com/yungkaai/blue?in=trending-music-us/sets/folk',
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithTwitterEmbed: Story = {
  name: 'With Twitter Embed',
  args: {
    ...Default.args,
    postContent: 'Interesting tweet!',
    className: containerWidth,
    embedUrl: 'https://x.com/desoprotocol/status/1933587613434458243',
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithWebsiteEmbed: Story = {
  name: 'With Website Embed',
  args: {
    ...Default.args,
    postContent: 'Check out the DeSo website.',
    className: containerWidth,
    embedUrl: 'https://www.deso.org/',
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const Reposted: Story = {
  name: 'Reposted',
  args: {
    ...Default.args,
    status: {
      type: 'repost',
      reposterPublicKey: LIVE_PUBLIC_KEY,
    },
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const Pinned: Story = {
  name: 'Pinned Post',
  args: {
    ...Default.args,
    status: {
      type: 'pinned',
    },
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const SingleComment: Story = {
  name: 'With Single Comment',
  args: {
    ...Default.args,
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent:
      'Fully censorship-resistant & decentralized social media platforms will become more important than ever.',
    comments: [
      {
        ...Default.args,
        publicKey: 'BC1YLgi66tdjAaVfYpmM447cxsve3TpvfXD9h8X6JMak7gbKABoEVaT',
        postContent: 'Keep up posting every day🔥🔥🔥',
        timestamp: new Date(),
        postUrl: 'https://www.deso.org',
      },
    ],
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const MultipleComments: Story = {
  name: 'With Multiple Comments',
  args: {
    ...Default.args,
    publicKey: DEFAULT_PUBLIC_KEY,
    postContent:
      'Fully censorship-resistant & decentralized social media platforms will become more important than ever.',
    comments: [
      {
        ...Default.args,
        publicKey: 'BC1YLgi66tdjAaVfYpmM447cxsve3TpvfXD9h8X6JMak7gbKABoEVaT',
        postContent: 'Keep up posting every day🔥🔥🔥',
        timestamp: new Date(),
        postUrl: 'https://www.deso.org',
      },
      {
        ...Default.args,
        publicKey: DEFAULT_PUBLIC_KEY,
        postContent: 'This is another great point!',
        timestamp: new Date(),
        postUrl: 'https://www.deso.org',
      },
    ],
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithReactions: Story = {
  name: 'With Reactions',
  args: {
    ...Default.args,
    reactions: [
      { emoji: '👍', count: 12, userHasReacted: true },
      { emoji: '🔥', count: 5, userHasReacted: false },
    ],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithAudio: Story = {
  name: 'With Audio',
  args: {
    ...Default.args,
    postContent: 'Check out this cool audio!',
    audioUrl: '/audio-sample.mp3',
    className: containerWidth,
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithVideo: Story = {
  name: 'With Video',
  args: {
    ...Default.args,
    postContent: 'Check out this cool video!',
    videoUrl: '/video-sample.mp4',
    className: containerWidth,
    images: [],
    postUrl: 'https://www.deso.org',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithNFT: Story = {
  name: 'With NFT',
  args: {
    ...Default.args,
    postContent: 'Check out this cool NFT!',
    className: containerWidth,
    images: ['https://placehold.co/1200x800/dbd8e3/352f44'],
    postUrl: 'https://www.deso.org',
    nft: {
      publicKey: DEFAULT_PUBLIC_KEY,
      price: '4.403 DESO',
      lastSale: '0.203 DESO',
      royaltyFee: '10%',
      lastUpdated: '2023-01-01T12:00:00Z',
      ownerPublicKey: DEFAULT_PUBLIC_KEY,
    },
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithPollNotVoted: Story = {
  name: 'With Poll (Not Voted)',
  args: {
    ...Default.args,
    postContent: 'What is your favorite season?',
    className: containerWidth,
    images: [],
    poll: {
      options: [
        { text: 'Spring 🌷' },
        { text: 'Summer ☀️' },
        { text: 'Autumn 🍂' },
        { text: 'Winter ❄️' },
      ],
      votes: [120, 350, 210, 80],
      totalVotes: 760,
      userVotedIndex: null,
    },
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithPollVoted: Story = {
  name: 'With Poll (Voted)',
  args: {
    ...Default.args,
    postContent: 'What is your favorite season?',
    className: containerWidth,
    images: [],
    poll: {
      options: [
        { text: 'Spring 🌷' },
        { text: 'Summer ☀️' },
        { text: 'Autumn 🍂' },
        { text: 'Winter ❄️' },
      ],
      votes: [120, 350, 210, 80],
      totalVotes: 760,
      userVotedIndex: 1,
    },
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const FeaturedVideo: Story = {
  name: 'With Featured Video',
  args: {
    ...Default.args,
    postContent: 'Check out this amazing featured video!',
    videoUrl: '/video-sample.mp4',
    className: containerWidth,
    images: [],
    layout: 'featured-media',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const FeaturedImage: Story = {
  name: 'With Featured Image',
  args: {
    ...Default.args,
    postContent: 'Check out this amazing featured image!',
    className: containerWidth,
    images: ['https://placehold.co/1200x800/dbd8e3/352f44'],
    layout: 'featured-media',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const FeaturedAudio: Story = {
  name: 'With Featured Audio',
  args: {
    ...Default.args,
    postContent: 'Check out this amazing featured audio!',
    className: containerWidth,
    audioUrl: '/audio-sample.mp3',
    layout: 'featured-media',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const FeaturedNFTCard: Story = {
  name: 'With Featured NFT',
  args: {
    ...Default.args,
    postContent: 'Check out this amazing NFT!',
    className: containerWidth,
    images: ['https://placehold.co/1200x800/dbd8e3/352f44'],
    layout: 'featured-media',
    nft: {
      publicKey: DEFAULT_PUBLIC_KEY,
      price: '4.403 DESO',
      lastSale: '0.203 DESO',
      royaltyFee: '10%',
      lastUpdated: '2023-01-01T12:00:00Z',
      ownerPublicKey: DEFAULT_PUBLIC_KEY,
    },
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const WithNotification: Story = {
  name: 'With Notification',
  args: {
    ...Default.args,
    notification: {
      type: 'mention',
      publicKey: DEFAULT_PUBLIC_KEY,
      username: 'John Doe',
      timestamp: new Date(),
    },
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export const RichText: Story = {
  name: 'With Rich Text',
  args: {
    ...Default.args,
    postContent: longRichText,
    postBodyVariant: 'rich',
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}; 


export const RichTextTruncated: Story = {
  name: 'With Rich Text (Truncated)',
  args: {
    ...Default.args,
    postContent: longRichText,
    postBodyVariant: 'rich',
    lineClamp: 4,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
}; 