# DeSo UI Component Library

A modern, type-safe React component library for building DeSo blockchain applications.

[![GitHub](https://img.shields.io/badge/GitHub-deso--protocol%2Fdeso--ui-blue?logo=github)](https://github.com/deso-protocol/deso-ui)
[![Storybook](https://img.shields.io/badge/Storybook-ui.deso.com-ff4785?logo=storybook)](https://ui.deso.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

Built with TypeScript, [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), and [Storybook](https://storybook.js.org/).

This library provides a comprehensive suite of ready-to-use React components for interacting with the DeSo blockchain. Each component is designed to be type-safe, easily customizable, and comes with a complete set of Storybook stories for easy development and testing.

## 🚀 Quick Start

### Installation

DeSo UI is built with [Shadcn UI](https://ui.shadcn.com/) and can be installed with the ShadCN CLI using the `shadcn@latest add` command.

Components will be added to `/components/deso-ui` in your project.

```bash
npx shadcn@latest add http://ui.deso.com/r/copy-button.json
```

You can also install individual shadcn components:

```bash
npx shadcn@latest add button
```

To install all shadcn components:

```bash
npx shadcn@latest add --all 
```

### Development

```bash
# Install dependencies
npm install

# Start Storybook for component development
npm run storybook

# Build Storybook
npm run build-storybook

# Build the registry
npm run registry:build

# Build the library
npm run build

# Run tests
npm test
```

For monolithic applications, see: [Shadcn Monorepo](https://ui.shadcn.com/docs/monorepo)

## 📚 Component Library

This library includes 47 production-ready components for building DeSo applications:

### Core Components
- **ActionMenu** - Dropdown menu for post/user actions
- **ConfirmationDialog** - User action confirmation dialogs
- **CopyButton** - Copy text to clipboard functionality
- **Logo** - DeSo logo with light/dark mode support
- **SearchBar** - Reusable search with autocomplete
- **Timestamp** - Formatted timestamp display

### Editor Components
- **Editor** - Rich text editor with media support
- **EditorEmojiPicker** - Emoji selection component
- **EditorMarkdown** - Markdown editor for posts
- **EditorUpload** - File upload handling

### Post Components
- **PostCard** - Complete post display
- **PostText** - Post text rendering
- **PostImage** - Image display with bento grids
- **PostVideo** - Video player component
- **PostAudio** - Audio player component
- **PostEmbed** - URL embeds (YouTube, Spotify, etc.)
- **PostPoll** - Interactive polls
- **PostEngagement** - Like, comment, repost stats
- **PostReactions** - Reaction display
- **PostShare** - Shared post component

### User Components
- **UserInfo** - User information display
- **UserMenu** - User dropdown menu
- **UserSearch** - User search with typeahead
- **UserPublicKey** - Public key display
- **Username** - Username display options
- **UsernameDisplay** - Username with verification
- **VerificationBadge** - Verification badges

### Profile Components
- **ProfileCard** - User profile card
- **ProfilePicture** - Profile pictures with NFT support
- **ProfileCoverPhoto** - Cover photo display
- **ProfileDescription** - Profile bio text
- **ProfileStat** - Profile statistics
- **ProfileTag** - Profile tags
- **ProfileActions** - Profile action buttons
- **ProfileList** - List of profiles

### Media Components
- **MediaCard** - Media cards with video hover
- **MediaGallery** - Masonry layout gallery
- **MediaItem** - Individual media items
- **VideoReel** - TikTok-style video reels

### Messaging Components
- **MessageButton** - Send message button
- **MessageInbox** - Complete chat interface
- **MessageInboxItem** - Conversation list item
- **MessageChatList** - Message list
- **MessageChatItem** - Individual messages

### Navigation Components
- **NavigationList** - Sidebar navigation
- **FeedList** - Post feed display
- **FollowButton** - Follow/unfollow functionality

## 🌐 DeSo Ecosystem

### Applications
- [**DeSo**](https://deso.com) - Blockchain explorer and validator hub
- [**DeSo Wallet**](https://wallet.deso.com) - Asset and key management
- [**DeSo Explorer**](https://explorer.deso.com) - Blockchain explorer
- [**Focus**](https://focus.xyz) - Crypto social network
- [**NFTz**](https://nftz.xyz) - NFT marketplace with auctions
- [**Openfund**](https://openfund.com) - On-chain orderbook exchange

### Developer Resources
- [**DeSo GraphQL API**](https://graphql-prod.deso.com/) - Query the DeSo blockchain
- [**NextJS Starter**](https://docs.deso.org/frontend-nextjs-example) - Frontend starter kit
- [**JavaScript SDK**](https://github.com/deso-protocol/deso-js/tree/main) - TypeScript/JavaScript library
- [**Python SDK**](https://github.com/deso-protocol/deso-python-sdk) - Python library
- [**HeroSwap API**](https://heroswap.com/docs) - Wrapped assets integration
- [**Developer Docs**](https://docs.deso.org) - Complete documentation
- [**Revolution PoS**](https://revolution.deso.com/) - Proof of stake protocol

## 📦 Component Installation

Each component can be installed individually using the shadcn CLI:

```bash
# Essential components
npx shadcn@latest add http://ui.deso.com/r/post-card.json
npx shadcn@latest add http://ui.deso.com/r/user-info.json
npx shadcn@latest add http://ui.deso.com/r/feed-list.json

# Editor components
npx shadcn@latest add http://ui.deso.com/r/editor.json
npx shadcn@latest add http://ui.deso.com/r/editor-upload.json

# Media components
npx shadcn@latest add http://ui.deso.com/r/media-gallery.json
npx shadcn@latest add http://ui.deso.com/r/video-reel.json

# Messaging components
npx shadcn@latest add http://ui.deso.com/r/message-inbox.json
npx shadcn@latest add http://ui.deso.com/r/message-chat-list.json

# Profile components
npx shadcn@latest add http://ui.deso.com/r/profile-card.json
npx shadcn@latest add http://ui.deso.com/r/profile-picture.json
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- React 18+
- Modern ESM-compatible bundler

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start Storybook: `npm run storybook`
4. View components at `http://localhost:6006`

### Building Components
```bash
# Build the registry
npm run registry:build

# Build Storybook for production
npm run build-storybook

# Run tests
npm test
```

### Registry Structure
Components are organized following the [Shadcn Registry](https://ui.shadcn.com/docs/registry/getting-started) pattern:
- Source files in `src/components/deso/`
- Registry definitions in `registry.json`
- Built registry in `public/r/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your component with Storybook stories
4. Update the registry.json
5. Submit a pull request

## 📄 License

MIT © 2025 DeSo Protocol

## 🔗 Links

- [Documentation](https://ui.deso.com)
- [GitHub Repository](https://github.com/deso-protocol/deso-ui)
- [DeSo Protocol](https://deso.org)
- [Shadcn UI](https://ui.shadcn.com/)
- [Storybook](https://storybook.js.org/)
