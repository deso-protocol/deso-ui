import type { Meta, StoryObj } from '@storybook/react';
import { Providers } from '../../lib/providers';
import { MediaGallery } from '../deso/media-gallery';
import { SearchBar } from '../deso/search-bar';
import { Logo } from '../deso/logo';
import { Button } from '../ui/button';
import { successHandlers } from '../../lib/mocks/msw-handlers';
import { useState } from 'react';
import type { MediaType } from '../deso/media-card';
import { UserMenu } from '../deso/user-menu';
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants';

// Pinterest-style tag categories
const pinterestTags = [
  'All',
  'Home decor',
  'Fashion',
  'Food',
  'Travel',
  'Art',
  'DIY',
  'Photography',
  'Wedding',
  'Beauty',
];

// Generate Pinterest-style media items with varied aspect ratios
const generatePinterestMediaItems = (count: number) => {
  const mediaTypes: MediaType[] = ['image', 'video', 'carousel'];
  
  // More varied aspect ratios for better masonry distribution
  const aspectRatios = [
    { width: 300, height: 200 },  // Wide landscape
    { width: 300, height: 400 },  // Portrait
    { width: 300, height: 300 },  // Square
    { width: 300, height: 500 },  // Tall portrait
    { width: 300, height: 150 },  // Very wide
    { width: 300, height: 600 },  // Very tall
    { width: 300, height: 350 },  // Medium portrait
    { width: 300, height: 250 },  // Medium landscape
    { width: 300, height: 450 },  // Tall
    { width: 300, height: 180 },  // Wide
    { width: 300, height: 700 },  // Extra tall
    { width: 300, height: 320 },  // Slightly tall
  ];

  return Array.from({ length: count }, (_, i) => {
    const ratio = aspectRatios[i % aspectRatios.length];
    const seedTopics = [
      'minimalist-interior', 'boho-fashion', 'food-photography', 'travel-landscape',
      'abstract-art', 'diy-crafts', 'portrait-photography', 'wedding-decor',
      'makeup-beauty', 'fitness-workout', 'garden-plants', 'modern-architecture',
      'inspirational-quotes', 'cute-animals', 'vintage-style', 'nature-scenery',
      'street-art', 'healthy-recipes', 'home-organization', 'fashion-outfit'
    ];
    
    return {
      id: `pin-${i + 1}`,
      imageUrl: `https://picsum.photos/seed/${seedTopics[i % seedTopics.length]}${i}/${ratio.width}/${ratio.height}`,
      mediaType: mediaTypes[i % mediaTypes.length],
      viewCount: Math.floor(Math.random() * 50000) + 1000,
    };
  });
};

const PinterestLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [mediaItems] = useState(() => generatePinterestMediaItems(100));

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    console.log('Selected tag:', tag);
  };

  return (
    <div className="bg-background text-foreground w-full min-h-screen border rounded-xl bg-clip-border overflow-scroll">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo width={100} height={32} />
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <SearchBar
                placeholder="Search for ideas"
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                size="lg"
                className="w-full"
              />
            </div>

            {/* User Menu */}
            <UserMenu 
            variant="compact"
            currentUser={{
              publicKey: DEFAULT_PUBLIC_KEY,
              profile: {
                username: 'testuser',
                profilePic: 'https://picsum.photos/200/300',
                isVerified: true,
                publicKey: DEFAULT_PUBLIC_KEY,
                description: 'A mock user profile.',
              },
            }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tags Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {pinterestTags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTagClick(tag)}
                className={`rounded-full px-4 py-2 transition-all ${
                  activeTag === tag 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="w-full" style={{ height: 'calc(100vh - 200px)' }}>
          <MediaGallery
            mediaItems={mediaItems}
            variant="masonry"
            mediaItemClassName="[&_.react-photo-album]:rounded-xl"
            onMediaClick={(item) => console.log('Clicked media:', item)}
          />
        </div>
      </main>
    </div>
  );
};

const meta: Meta = {
  title: 'Examples/Pinterest',
  component: PinterestLayout,
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

export const ExamplePinterestBoard: StoryObj = {
  render: () => <PinterestLayout />,
}; 