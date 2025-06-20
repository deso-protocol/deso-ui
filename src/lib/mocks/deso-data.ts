import { DEFAULT_PUBLIC_KEY, DEFAULT_USERNAME } from '../constants';

const baseProfile = {
  id: '1',
  publicKey: DEFAULT_PUBLIC_KEY,
  profilePic: "/public/avatar-blank.png",
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
      description: `I'm a software engineer and designer. I'm currently working on a project called DeSo.`,
      extraData: {
        ...baseProfile.extraData,
        MarkdownDescription: `I'm a software engineer and designer. I'm currently working on a project called DeSo.`,
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

export const defaultProfile = mockProfiles[DEFAULT_USERNAME];

export const searchUsers = {
  nader: {
    publicKey: 'BC1YLgCeeN7nEfhE2N9SW9zgmS4uB4M4fA4yq2i7bYmFw2aKDYGAi1Z',
    username: 'nader',
    profilePic:
      'https://diamondapp.com/api/v0/get-single-profile-picture/BC1YLgCeeN7nEfhE2N9SW9zgmS4uB4M4fA4yq2i7bYmFw2aKDYGAi1Z?fallback=https://diamondapp.com/assets/img/default_profile_pic.png',
    isVerified: true,
  },
  mossified: {
    publicKey: 'BC1YLj5nB226dEpoV24b2kGbiQ1P21HkHcrKzdp5dGcq5S1Sg1iX28N',
    username: 'mossified',
    profilePic:
      'https://diamondapp.com/api/v0/get-single-profile-picture/BC1YLj5nB226dEpoV24b2kGbiQ1P21HkHcrKzdp5dGcq5S1Sg1iX28N?fallback=https://diamondapp.com/assets/img/default_profile_pic.png',
    isVerified: true,
  },
  zordon: {
    publicKey: 'BC1YLfWTsF4bciD2LpTBNnB4jKzP5t3fJpSgLgG8K9i5BHFC4tHh1dM',
    username: 'zordon',
    profilePic:
      'https://diamondapp.com/api/v0/get-single-profile-picture/BC1YLfWTsF4bciD2LpTBNnB4jKzP5t3fJpSgLgG8K9i5BHFC4tHh1dM?fallback=https://diamondapp.com/assets/img/default_profile_pic.png',
    isVerified: false,
  },
};

// GraphQL operation names for MSW matching
export const GRAPHQL_OPERATIONS = {
  GetProfilePicture: 'GetProfilePicture',
  GetUsernameInfo: 'GetUsernameInfo', 
  GetProfileData: 'GetProfileData'
} as const; 