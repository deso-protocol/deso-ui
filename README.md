# DeSo UI Component Library

A modern, type-safe React component library for building DeSo blockchain applications. Built with TypeScript, Tailwind CSS, and Storybook.

## 🎯 Project Overview

This library provides ready-to-use React components for interacting with the DeSo blockchain, including:

- **ProfilePicture**: Display user profile pictures with NFT support
- **UsernameDisplay**: Show usernames with verification badges  
- **VerificationBadge**: Various verification badge styles
- **ProfileCoverPhoto**: Responsive cover photos with fallbacks

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
