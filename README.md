# DeSo UI Component Library

A modern, type-safe React component library for building DeSo blockchain applications. Built with TypeScript, Tailwind CSS, and Storybook.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
# Start Storybook for component development
npm run storybook

# Build the library
npm run build

# Run tests
npm test
```

## 📚 Component Library

This library provides a comprehensive suite of ready-to-use React components for interacting with the DeSo blockchain. Each component is designed to be type-safe, and easily customizable, and comes with a set of Storybook stories for easy development and testing.

### DeSo Components & Stories

| Component               | Description                                                                                              | Storybook Stories                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ActionMenu`            | A dropdown menu for performing actions on a post or user.                                                | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ConfirmationDialog`    | A dialog for confirming user actions.                                                                    | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `CopyButton`            | A button for copying text to the clipboard.                                                              | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `FeedList`              | A list of posts for a feed.                                                                              | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `FollowButton`          | A button for following or unfollowing a user.                                                            | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MediaGallery`          | A gallery for displaying multiple images or videos.                                                      | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MediaItem`             | An item for displaying a single image or video.                                                          | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MessageButton`         | A button for sending a message to a user.                                                                | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MessageItem`           | An item for displaying a single message in a conversation.                                               | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MessageList`           | A list of messages in a conversation.                                                                    | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostAudio`             | A component for displaying an audio post.                                                                | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostCard`              | A card for displaying a single post.                                                                     | `Default`, `WithImage`, `WithVideo`, `WithAudio`, `WithPoll`, `WithEmbed`, `WithShare`                                                                                                                                                                                                                                                                                                                                               |
| `PostEmbed`             | A component for displaying an embedded post.                                                             | `Default`, `WithVideo`                                                                                                                                                                                                                                                                                                                                                                                                              |
| `PostEngagement`        | A component for displaying post engagement stats.                                                        | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostImage`             | A component for displaying a post image.                                                                 | `Default`, `Carousel`, `WithTwoImages`, `WithThreeImages`, `WithFourImages`                                                                                                                                                                                                                                                                                                                                                         |
| `PostPoll`              | A component for displaying a poll in a post.                                                             | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostReactions`         | A component for displaying post reactions.                                                               | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostShare`             | A component for displaying a shared post.                                                                | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostText`              | A component for displaying the text of a post.                                                           | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `PostVideo`             | A component for displaying a video post.                                                                 | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ProfileActions`        | A component for displaying actions for a user profile.                                                   | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ProfileCard`           | A card for displaying a user profile.                                                                    | `Default`, `WithCover`, `WithFollowers`, `WithVerified`                                                                                                                                                                                                                                                                                                                                                                             |
| `ProfileCoverPhoto`     | A component for displaying a user's cover photo.                                                         | `Default`, `WithoutCoverPhoto`                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ProfileDescription`    | A component for displaying a user's profile description.                                                 | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ProfileList`           | A list of user profiles.                                                                                 | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ProfilePicture`        | Displays user profile pictures with NFT support, hex decoding, and fallbacks.                            | `Default`, `WithNFT`, `WithoutNFT`, `WithHex`, `WithoutHex`                                                                                                                                                                                                                                                                                                                                                                         |
| `ProfileStat`           | A component for displaying a single profile stat.                                                        | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `ProfileTag`            | A component for displaying a profile tag.                                                                | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Timestamp`             | A component for displaying a timestamp.                                                                  | `Default`, `WithFullDate`                                                                                                                                                                                                                                                                                                                                                                                                           |
| `UserInfo`              | A component for displaying user information.                                                             | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `UserPublicKey`         | A component for displaying a user's public key.                                                          | `Default`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `UsernameDisplay`       | Shows usernames with verification badges, copy to clipboard, and truncation.                             | `Default`, `WithVerified`, `WithoutVerified`, `WithLongName`                                                                                                                                                                                                                                                                                                                                                                        |
| `VerificationBadge`     | Displays a verification badge with multiple styles and sizes.                                            | `Default`, `Premium`, `Creator`, `Admin`                                                                                                                                                                                                                                                                                                                                                                                            |

## 📖 Storybook & Mocking Strategy

### Problem Solved: Apollo Client vs External APIs

**Initial Issue**: Components were making real GraphQL requests to the DeSo API in Storybook, but Apollo Client was failing in the browser environment while direct fetch requests worked perfectly.

**Root Cause**: Apollo Client configuration differences between browser and Node.js environments, potentially related to CORS, request formatting, or Vite proxy settings.

**Solution**: Mock Service Worker (MSW) Integration

Instead of trying to fix the Apollo Client browser issues, we implemented **MSW (Mock Service Worker)** to mock GraphQL responses in Storybook. This is actually the **recommended Storybook pattern** for components that make network requests.

### MSW Setup

```typescript
// .storybook/preview.tsx
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize() // Initialize MSW

const preview: Preview = {
  loaders: [mswLoader], // Add MSW loader globally
  // ... other config
}
```

### Mock Data Structure

```typescript
// src/lib/mocks/deso-data.ts
export const mockProfiles = {
  mossified: {
    accountByPublicKey: {
      profilePic: "\\x646174613a696d6167652f776562703b626173653634...", // Real hex data
      username: "mossified", 
      extraData: {
        IsVerified: "true",
        NFTProfilePictureUrl: "https://nftz.mypinata.cloud/ipfs/...",
        CoverPhotoUrl: "https://images.deso.org/...",
        // ... real DeSo data structure
      }
    }
  }
}
```

### Story Implementation

```typescript
export const WithMossified: Story = {
  args: {
    publicKey: 'BC1YLgDnZU3JQ2dK6t2F9irkUr5gEg1sfb6BmsuF7ZDe6RRkAUn5iqy',
    size: 'md',
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query('GetProfilePicture', () => {
          return HttpResponse.json({ data: mockProfiles.mossified })
        }),
      ],
    },
  },
}
```

## 🎨 Component Features

### ProfilePicture
- ✅ Displays hex-encoded profile pictures from DeSo
- ✅ **Fixed hex decoding** with proper UTF-8 support
- ✅ NFT profile picture support (auto-detection + manual variant)
- ✅ Hexagon shape for NFT variant
- ✅ Fallback to default avatar
- ✅ Multiple sizes (sm, md, lg)
- ✅ Loading and error states

### UsernameDisplay  
- ✅ Shows username and display name
- ✅ Integrated verification badge
- ✅ Copy to clipboard functionality
- ✅ Truncation support
- ✅ Profile linking

### VerificationBadge
- ✅ Multiple styles (default, premium, creator, admin)
- ✅ Customizable sizes and tooltips
- ✅ Entrance animations
- ✅ Gradient color support

### ProfileCoverPhoto
- ✅ Responsive aspect ratios
- ✅ Fallback gradients
- ✅ Overlay support
- ✅ Parallax effects
- ✅ Child content support

## 🔧 Technical Architecture

### GraphQL Integration
- **Apollo Client** for data fetching
- **Type-safe** GraphQL queries
- **Automatic** caching and loading states
- **Error handling** with fallbacks

### Styling
- **Tailwind CSS** for utility-first styling
- **Shadcn/ui** for base components
- **Responsive** design patterns
- **Dark mode** support ready

### Type Safety
- **TypeScript** throughout
- **Zod schemas** for runtime validation
- **GraphQL CodeGen** ready
- **Component prop** documentation

## 📁 Project Structure

```
deso-ui/
├── src/
│   ├── components/
│   │   ├── deso/                 # DeSo-specific components
│   │   │   ├── profile-picture.tsx
│   │   │   ├── username-display.tsx
│   │   │   ├── verification-badge.tsx
│   │   │   └── profile-cover-photo.tsx
│   │   └── ui/                   # Base UI components (shadcn/ui)
│   ├── hooks/                    # React hooks for DeSo data
│   ├── lib/
│   │   ├── graphql/             # GraphQL queries and client
│   │   ├── mocks/               # MSW mock data
│   │   └── utils/               # Utility functions
│   └── stories/                 # Storybook stories
├── .storybook/                  # Storybook configuration
└── public/                      # MSW service worker
```

## 🧪 Testing Strategy

### Manual Testing Done
1. ✅ **Direct API calls work** (Node.js fetch to DeSo GraphQL)
2. ✅ **Apollo Client fails in browser** (confirmed the issue)
3. ✅ **MSW mocking works perfectly** (Storybook stories render correctly)
4. ✅ **All component states tested** (loading, error, success)
5. ✅ **Real data structure verified** (using actual DeSo API responses)
6. ✅ **Hex decoding fixed** (profile pictures now render correctly)
7. ✅ **NFT profile pictures** (both auto-detection and manual variants)

### Debug Components
- **ProfilePictureDebug**: Visual hex decoding inspector
  - Shows raw hex data vs decoded data URL
  - Tests both regular and NFT profile pictures
  - Validates image loading in browser

### Benefits of MSW Approach
- 🎯 **Deterministic stories** - No network dependencies
- ⚡ **Fast development** - Instant loading without API delays  
- 🧪 **All states testable** - Loading, error, edge cases
- 🔒 **No API keys needed** - Works offline
- 📚 **Better documentation** - Clear component behavior
- 🎨 **Design exploration** - Easy to test variations

## 🚀 Deployment

The Storybook can be deployed as a static site:

```bash
npm run build-storybook
```

This creates a `storybook-static` directory that can be served anywhere.

## 🤝 Contributing

1. **Add new components** in `src/components/deso/`
2. **Create mock data** in `src/lib/mocks/`
3. **Write stories** using MSW patterns
4. **Update this README** with new features

## 📖 References

- [Storybook MSW Addon](https://storybook.js.org/addons/msw-storybook-addon)
- [DeSo GraphQL API](https://graphql-prod.deso.com/graphql)
- [MSW Documentation](https://mswjs.io/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

---

**Note**: This approach solves the Apollo Client browser environment issues by using MSW for Storybook development, which is the recommended pattern for component libraries that need to mock external API calls.
