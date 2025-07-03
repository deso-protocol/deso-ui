# TASKS.md - DeSo News Application Development Plan

## 🎉 MAJOR MILESTONE: Backend Overhaul Complete!
**Status Update**: The news aggregation backend has been completely refactored. The app now fetches fresh content from **14 high-quality RSS feeds**, including Google News, NY Times, Washington Post, and ESPN. The old, stale CNN feed has been replaced. The system now aggregates **~200 unique articles** with intelligent deduplication.

## Project Overview

**Build a news aggregation and discussion platform powered by DeSo blockchain** that scrapes trending news from multiple sources, categorizes content by topics, and enables users to create DeSo posts with pre-populated news URLs for blockchain-based discussions.

### Architecture Overview
- **Frontend:** Next.js 15 with App Router, TypeScript (already configured)
- **Styling:** Tailwind CSS + Shadcn UI + DeSo UI components (47 components available)
- **Data Layer:** News scraping backend + DeSo REST API + React Query
- **Authentication:** DeSo Identity with derived key authorization
- **News Sources:** ✅ 14+ configurable RSS feeds (Google News, NYT, WaPo, BBC, etc.)
- **Backend:** ✅ Node.js scraping service with RSS proxy + Next.js API routes
- **Components:** Existing DeSo UI components + custom news components + ✅ Button-based navigation, custom news feed components

### Key Features for v1
1. **News Aggregation** - ✅ Scrape trending news from multiple high-quality sources
2. **Topic Categorization** - ✅ Sports, World, Business, Tech
3. **URL-based Navigation** - ✅ Simplified button navigation with dynamic routing (`/sports`, `/tech`, etc.), including a conditional "Custom" category.
4. **DeSo Integration** - "DISCUSS" button to create posts with pre-populated URLs
5. **Real-time Updates** - Background refresh of news content
6. **Multiple Sources** - ✅ Show source attribution and links for each news item
7. **User-Configurable Feeds** - 🚧 (In Progress) Allow users to select their news sources.

---

## Phase 1: News Scraping Infrastructure (✅ COMPLETED)

### 1.1 Backend News Scraping Service
**Technology:** ✅ **Node.js** with `rss-parser` and `cheerio` for OG data extraction.

**News Sources Implemented:**
- ✅ **General/World**: Google News, NY Times, Washington Post, Yahoo News, BBC
- ✅ **Business**: CNBC, BBC
- ✅ **Tech**: BBC
- ✅ **Sports**: ESPN, Yahoo Sports, Sky News, BBC, Reddit Sports

**Key Features Implemented:**
- ✅ **Smart OG Data Extraction**: Fetches `og:image` and `og:description` for high-quality content.
- ✅ **Intelligent Deduplication**: Uses Levenshtein distance to detect and merge similar articles, removing duplicates.
- ✅ **Scalable Architecture**: Sources are managed in a simple array, making it easy to add/remove feeds.

### 1.2 Database Schema
**Technology:** ✅ JSON files in `/data` directory.

### 1.3 Next.js API Routes
**Location:** `src/app/api/news/`
- ✅ `GET /api/news` - Fetches all news, filterable by category.
- ✅ `GET /api/news/[category]` - Fetches news for a specific category.
- ✅ `GET /api/news/trending` - Fetches trending news.

---

## Phase 2: Frontend News Display

### 2.1 News Components (✅ COMPLETED)
- ✅ `@media-card.tsx`: Adapted for displaying news items.
- ✅ `@tabs.tsx`: Used for category navigation.
- ✅ `@timestamp.tsx`, `@copy-button.tsx`, etc. are integrated.
- ✅ `NewsCard`, `NewsFeed`, `CategoryTabs` custom components created and functional.

### 2.2 Page Structure (✅ COMPLETED)
- ✅ `src/app/page.tsx`: Homepage displays the news feed.

### 2.3 Data Fetching Strategy (✅ COMPLETED)
- ✅ `useNews` hook with React Query fetches data from the API.
- ✅ Caching, loading, and error states are handled.

### 2.4 User-Configurable Feeds (🚧 IN PROGRESS)
**Goal:** Allow users to select which news sources they want to see in their feed via a dropdown checklist. Preferences will be saved to local storage.

**Components to Create:**
```typescript
// src/components/news/feed-selector.tsx
interface FeedSelectorProps {
  sources: SourcePreference[];
  onPreferencesChange: (updatedSources: SourcePreference[]) => void;
}

interface SourcePreference {
  name: string;
  url: string; // Used as a unique ID
  isEnabled: boolean;
}
```

**Hooks to Create:**
```typescript
// src/hooks/useFeedPreferences.ts
export function useFeedPreferences() {
  // - Load preferences from localStorage on mount.
  // - Provide a function to update preferences.
  // - Return the list of all sources with their enabled/disabled state.
}
```

**API Modification:**
- The `scrape-news.js` script will need to be updated to dynamically scrape feeds based on user selection, or the API will need to filter based on enabled sources. For now, we will filter on the client-side after fetching all data.

**UI Integration:**
- Add a "Filter Sources" button to the header or near the category tabs.
- This button will open the `FeedSelector` dropdown/popover.

---

## Phase 3: DeSo Integration (FUTURE)

### 3.1 DeSo Authentication Setup
**Leverage blockheights patterns.**

### 3.2 Post Creation Integration
- Implement `NewsPostCreator` component and `useNewsPost` hook.
- Wire up the "DISCUSS" button to open the post creator.

---

## Phase 4: Development Roadmap (Updated)

### Sprint 1: Foundation (✅ COMPLETED)
- [x] Set up scraping service (migrated from Python to Node.js)
- [x] Create basic news API endpoints
- [x] Implement scraping from multiple high-quality sources
- [x] Implement smart deduplication and OG data extraction
- [x] Create basic news display components

### Sprint 2: Frontend Core (✅ COMPLETED)
- [x] Implement news feed with media cards
- [x] Add category tabs navigation
- [x] Implement React Query data fetching
- [x] Add loading states and error handling

### Sprint 3: Frontend Polish & User Features (🚧 IN PROGRESS)
- [x] Implement user-configurable feed selector (✅ COMPLETED)
- [x] Store user feed preferences in local storage (✅ COMPLETED)
- [x] Filter news feed based on user preferences (✅ COMPLETED)
- [x] Add custom RSS feed support for users (✅ COMPLETED)
- [ ] **(NEXT)** Implement DeSo Identity & "DISCUSS" button
- [ ] Create news detail pages
- [ ] Add search functionality

### Sprint 4: DeSo Integration (FUTURE)
- [ ] Set up DeSo Identity authentication
- [ ] Create news post creator component
- [ ] Implement "DISCUSS" button functionality
- [ ] Add post submission to DeSo blockchain
- [ ] Test end-to-end news → DeSo post flow

---
## Technical Specifications

### News Scraping
- ✅ **Technology**: Node.js
- ✅ **Execution**: Manual via `npm run scrape`.
- ✅ **Data Storage**: Local JSON files in `/data`.

---
## Next Steps
1.  **Implement DeSo Integration:**
    -   **Identity:** Add Login/Logout functionality using `deso-js`.
    -   **UI:** Create a `NewsPostCreator` component with an editor.
    -   **Functionality:** Wire up the "DISCUSS" button to open the post creator, pre-populating the news article's URL.
    -   **API:** Submit the post to the DeSo blockchain.
2.  **Create individual news detail pages** (`/news/[id]`).
3.  **Implement search functionality.**

# DeSo News - Real News Data Management

## 🎉 Real News Integration Complete!

Your DeSo News app is now displaying **real, live news content** instead of mock data! The app fetches headlines from BBC and CNN RSS feeds across multiple categories.

## Current News Data Status

- **Total Articles**: 86 real news items (5 duplicates automatically removed)
- **News Sources**: BBC, CNN (Reuters had connectivity issues)
- **Categories**: General (20), Tech (20), Sports (20), World (18), Business (8)
- **Deduplication**: Smart duplicate detection prevents same stories from appearing multiple times
- **Last Updated**: Check your `data/metadata.json` file
- **Data Location**: `/deso-news/data/` directory

## Managing News Data

### View Current Data
```bash
# Check data directory contents
ls -la data/

# View metadata and stats
cat data/metadata.json

# View specific category (e.g., tech news)
cat data/tech.json | head -50
```

### Refresh News Data
```bash
# Manual refresh (fetches latest news)
npm run scrape

# Alternative command
npm run refresh-news
```

### API Endpoints for Real Data
- `http://localhost:3001/api/news` - All news (latest 20 by default)
- `http://localhost:3001/api/news/tech` - Tech news only  
- `http://localhost:3001/api/news/sports` - Sports news only
- `http://localhost:3001/api/news?trending=true` - Trending items

### Sample Real Headlines Currently Live
- "Microsoft to cut up to 9,000 jobs as it invests in AI"
- "Trump pleads not guilty to 34 felony counts" 
- "Tesla deliveries fall for second quarter in a row"
- "Four charged over break-in at RAF Brize Norton"
- "Global Climate Summit Reaches Historic Agreement"

## Technical Details

### News Scraper
- **Technology**: Node.js with RSS Parser (instead of Python due to environment issues)
- **Sources**: BBC RSS feeds, CNN RSS feeds
- **Frequency**: Manual (run `npm run scrape` to update)
- **Data Format**: JSON files stored in `/data/` directory

### Data Structure
```typescript
interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string; // Real BBC/CNN URLs
  imageUrl: string; // Real images from news sources
  category: string; // tech, sports, world, business, general
  source: string; // bbc, cnn
  publishedAt: string;
  scrapedAt: string;
  trending: boolean;
  viewCount: number;
  discussionCount: number;
}
```

### Deduplication Features ✅
- **URL-based deduplication**: Identical article URLs are automatically detected
- **Title similarity detection**: Articles with 85%+ similar titles are merged
- **Category prioritization**: Tech/Business/Sports articles preferred over General
- **Smart merging**: Best image, description, and metadata are preserved
- **Transparent logging**: Console shows which duplicates were removed

### Future Enhancements
1. **Automated Refresh**: Set up cron job to run scraper every 12 hours
2. **More Sources**: Add Reuters, AP, other news outlets when connectivity improves
3. **Image Processing**: Better image extraction and fallbacks
4. ~~**Content Filtering**: Remove duplicate stories across sources~~ ✅ **COMPLETED**
5. **Trending Algorithm**: Smart ranking based on recency and engagement

## Troubleshooting

### No News Data Showing?
1. Check if data files exist: `ls data/`
2. Refresh data: `npm run scrape`
3. Restart dev server: `npm run dev`
4. Check API directly: `curl http://localhost:3001/api/news`

### Scraper Issues?
- Check network connection
- Some RSS feeds may be temporarily unavailable
- The scraper gracefully handles failures and continues with available sources

### Want to Add More News Sources?
Edit `scripts/scrape-news.js` and add new RSS feeds to the `RSS_SOURCES` object.

---

**Next Steps**: Ready for DeSo Integration! The next phase involves adding the "DISCUSS" button functionality to create DeSo posts from news articles. 

---
### Phase 5: DeSo Identity Integration (✅ COMPLETED)

- [x] **Copy & Adapt Identity Context**:
  - [x] Copy `blockheights/src/contexts/identity-context.tsx` to `deso-news/src/contexts/identity-context.tsx`.
  - [x] Adapt the context for the deso-news app. Permissions will be simpler to start.

- [x] **Update Constants**:
  - [x] Copy `DESO_IDENTITY_CONFIG` and `PERMISSIONS` from `blockheights/src/lib/constants.ts` to `deso-news/src/lib/constants.ts`.
  - [x] Create a `NEWS_CONFIG` object and set the `appName` to "DeSo News".

- [x] **Create Auth Components**:
  - [x] Create `deso-news/src/components/auth/` directory.
  - [x] Copy `blockheights/src/components/auth/login-button.tsx` to `deso-news/src/components/auth/login-button.tsx`.
  - [x] Copy `blockheights/src/components/deso/user-menu.tsx` to `deso-news/src/components/deso/user-menu.tsx`.
  - [x] Adapt components to use the `deso-news` identity context and hooks.

- [x] **Update Providers**:
  - [x] Import `IdentityProvider` in `deso-news/src/lib/providers.tsx`.
  - [x] Wrap the main `ThemeProvider` with the `IdentityProvider`.

- [x] **Integrate Login Button**:
  - [x] Import and add the `LoginButton` component to `deso-news/src/components/layout/app-header.tsx`.

- [x] **Manage Dependencies**:
  - [x] Add `deso-protocol` and `linkify-react` to `deso-news/package.json`.
  - [x] Run `npm install` in the `deso-news` directory.

- [x] **Helper Functions**:
    - [x] Review `blockheights/src/lib/utils/deso.tsx` and `blockheights/src/lib/deso/api.ts` and copy over any necessary helper functions for user profiles and authentication that aren't already present in `deso-news`.
    - [x] This includes `getUserProfilesByPublicKeys` and its dependencies on GraphQL.

</rewritten_file>