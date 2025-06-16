import { z } from 'zod';

// Base DeSo entity schemas
export const ProfileSchema = z.object({
  publicKey: z.string(),
  username: z.string().optional(),
  profilePic: z.string().url().optional(),
  description: z.string().optional(),
  extraData: z.record(z.string()).optional(),
  coinPriceDesoNanos: z.number().optional(),
  isVerified: z.boolean().optional(),
});

export const PostSchema = z.object({
  id: z.string(),
  postHash: z.string(),
  body: z.string(),
  timestamp: z.string(),
  extraData: z.record(z.string()).optional(),
  author: ProfileSchema,
  likeCount: z.number().default(0),
  diamondCount: z.number().default(0),
  commentCount: z.number().default(0),
  repostCount: z.number().default(0),
});

export const MediaSchema = z.object({
  url: z.string().url(),
  type: z.enum(['image', 'video', 'audio']),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional(),
});

// Component-specific schemas
export const ProfilePictureSchema = z.object({
  profilePic: z.string().url().optional(),
  username: z.string().optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).default('md'),
  showVerification: z.boolean().default(false),
  variant: z.enum(['default', 'nft', 'highres']).default('default'),
  className: z.string().optional(),
});

export const UsernameDisplaySchema = z.object({
  username: z.string().optional(),
  displayName: z.string().optional(),
  isVerified: z.boolean().default(false),
  showVerification: z.boolean().default(true),
  truncate: z.boolean().default(false),
  maxLength: z.number().optional(),
  className: z.string().optional(),
});

export const FeedItemSchema = z.object({
  postHash: z.string(),
  body: z.string(),
  timestamp: z.string(),
  author: ProfileSchema,
  likeCount: z.number().default(0),
  diamondCount: z.number().default(0),
  commentCount: z.number().default(0),
  repostCount: z.number().default(0),
  media: z.array(MediaSchema).optional(),
  extraData: z.record(z.string()).optional(),
  isLiked: z.boolean().default(false),
  isDiamonded: z.boolean().default(false),
});

export const ProfileStatsSchema = z.object({
  followerCount: z.number().default(0),
  followingCount: z.number().default(0),
  postCount: z.number().default(0),
  coinPriceDesoNanos: z.number().optional(),
});

// API Response schemas
export const GraphQLProfileResponse = z.object({
  accountByPublicKey: ProfileSchema.nullable(),
});

export const GraphQLPostResponse = z.object({
  postByPostHash: PostSchema.nullable(),
});

export const GraphQLFeedResponse = z.object({
  posts: z.object({
    edges: z.array(z.object({
      node: PostSchema,
    })),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string().optional(),
    }),
  }),
});

// Export types
export type Profile = z.infer<typeof ProfileSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type ProfilePictureProps = z.infer<typeof ProfilePictureSchema>;
export type UsernameDisplayProps = z.infer<typeof UsernameDisplaySchema>;
export type FeedItemProps = z.infer<typeof FeedItemSchema>;
export type ProfileStats = z.infer<typeof ProfileStatsSchema>; 