import { DEFAULT_PUBLIC_KEY, DEFAULT_USERNAME } from '../constants';

const baseProfile = {
  id: '1',
  publicKey: DEFAULT_PUBLIC_KEY,
  profilePic: "https://images.deso.org/d930d9edacc6d156e7cf01b5c73bb16bf46378d9799ce306fa19036412149e49.webp",
  username: DEFAULT_USERNAME,
  description: '',
  coinPriceDesoNanos: 100000000,
  extraData: {
    DisplayName: "mossified",
    FeaturedImageURL: "https://images.deso.org/7ed40194dba6ce264e505afa8f2f308825fa82309d3bfe3d71cb32af3d9a48fa.webp",
    NFTProfilePictureUrl: "https://nftz.mypinata.cloud/ipfs/bafybeif5mf54prcg4mr4p4v4o4s2w7bhfagord7y267u5sy344sjpk5lsm",
    IsVerified: "true",
    DiscordURL: "",
    TwitterURL: "",
    WebsiteURL: "",
    TelegramURL: "",
    PinnedPostHashHex: "4aa8254ced807fc2884b93ec6fa81c3984525579553b07dffddf2d08f2d8a79f",
    MarkdownDescription: "",
    HighQualityProfilePicUrl: "",
    NFTProfilePicturePostHashHex: "34b9d6d06632c58aa1695f06e9c2e6624830fa98e61cdc8193e2f511098d5136"
  }
};

// Mock DeSo API responses for Storybook
export const mockProfiles = {
  [DEFAULT_USERNAME]: {
    accountByPublicKey: {
      ...baseProfile,
      description: `# Hello, DeSo!

This is a **bold** and *italicized* description filled with markdown!

- List item 1
- List item 2
- List item 3

A link to [DeSo](https://deso.org).

---

> A blockquote for good measure.

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
`,
      extraData: {
        ...baseProfile.extraData,
        MarkdownDescription: ``,
      },
    },
  },
  NoDescriptionUser: {
    accountByPublicKey: {
      ...baseProfile,
      username: 'NoDescriptionUser',
      description: '',
      extraData: {
        ...baseProfile.extraData,
        MarkdownDescription: "",
      }
    }
  },

  // Mock for loading/error states
  loading: {
    // This will be used when we want to show loading state
  },
  
  error: {
    // This will trigger an error response
  }
};

// Default profile for easy access
export const defaultProfile = mockProfiles[DEFAULT_USERNAME];

// GraphQL operation names for MSW matching
export const GRAPHQL_OPERATIONS = {
  GetProfilePicture: 'GetProfilePicture',
  GetUsernameInfo: 'GetUsernameInfo', 
  GetProfileData: 'GetProfileData'
} as const; 