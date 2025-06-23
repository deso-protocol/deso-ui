'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Palette, Code, Database, Zap, Star, Download, Users, Heart, Youtube } from "lucide-react";
import Link from "next/link";

// Import DeSo UI Components
import { ProfileCard } from "@/components/deso/profile-card";
import { PostCard } from "@/components/deso/post-card";
import { MediaCard } from "@/components/deso/media-card";
import { UserInfo } from "@/components/deso/user-info";
import { FollowButton } from "@/components/deso/follow-button";
import { MessageButton } from "@/components/deso/message-button";
import { PostEngagement } from "@/components/deso/post-engagement";
import { Timestamp } from "@/components/deso/timestamp";
import { Logo } from "@/components/deso/logo";
import { SearchBar } from "@/components/deso/search-bar";
import { CopyButton } from "@/components/deso/copy-button";
import { VerificationBadge } from "@/components/deso/verification-badge";
import { Providers } from "@/lib/providers";

// Sample data
import { DEFAULT_PUBLIC_KEY, LIVE_PUBLIC_KEY, OTHER_PUBLIC_KEY } from "@/lib/constants";

export default function Home() {

  const examples = [
    {
      id: 'youtube',
      title: 'YouTube Example',
      href: 'https://ui.deso.com/?path=/story/examples-youtube--example-video-page',
    },
    {
      id: 'twitter',
      title: 'Twitter Example',
      href: 'https://ui.deso.com/?path=/story/examples-twitter--example-feed',
    },
    {
      id: 'substack',
      title: 'Substack Example',
      href: 'https://ui.deso.com/?path=/story/examples-substack--example-article',
    },
    {
      id: 'tiktok',
      title: 'TikTok Example',
      href: 'https://ui.deso.com/?path=/story/examples-tiktok--example-full-height',
    },
    {
      id: 'pinterest',
      title: 'Pinterest Example',
      href: 'https://ui.deso.com/?path=/story/examples-pinterest--example-pinterest-board',
    },
    
  ]

  const sampleMediaCards = [
    {
      id: 'video-1',
      imageUrl: 'https://picsum.photos/seed/ux-design/640/360',
      mediaType: 'video' as const,
      viewCount: 552,
      duration: '40:22',
      publicKey: DEFAULT_PUBLIC_KEY,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      title: 'How AI Will Change UX Design Forever',
      description: 'In this episode, we dive deep into the future of UX design and AI.',
    },
    {
      id: 'video-2',
      imageUrl: 'https://picsum.photos/seed/react-tutorial/640/360',
      mediaType: 'video' as const,
      viewCount: 12400,
      duration: '25:15',
      publicKey: LIVE_PUBLIC_KEY,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      title: 'Building Modern React Applications',
      description: 'Learn how to build scalable React applications with TypeScript.',
    },
    {
      id: 'image-1',
      imageUrl: 'https://picsum.photos/seed/design-tips/640/360',
      mediaType: 'image' as const,
      viewCount: 3200,
      publicKey: DEFAULT_PUBLIC_KEY,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      title: '10 Essential Design Principles',
      description: 'Master fundamental design principles for better designs.',
    },
  ];

  const sampleActions = {
    comments: 24,
    likes: 156,
    reposts: 12,
    diamonds: 8,
    diamondValue: '($0.08)',
    quotes: 3,
    views: 1250,
  };

  return (
    <Providers>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-8">
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center space-y-8">
              
              <div className="space-y-4">
                <Logo width={80} height={40} className="mx-auto"/>
                <h1 className="text-4xl font-bold">
                  DeSo UI Library
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A comprehensive, production-ready React component library for building DeSo blockchain applications. 
                  45+ components, TypeScript-first, fully customizable.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Production Ready
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Code className="w-4 h-4 mr-2" />
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Palette className="w-4 h-4 mr-2" />
                  Shadcn/ui
                </Badge>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="https://github.com/deso-protocol/deso-ui" target="_blank">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </Link>
                <Link href="https://ui.deso.com" target="_blank">
                  <Button variant="outline" size="lg" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Storybook
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quick Installation</CardTitle>
                <CardDescription>
                  Install components individually using the shadcn CLI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                                 <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                   <div className="flex items-center justify-between">
                     <span>npx shadcn@latest add http://ui.deso.com/r/post-card.json</span>
                     <CopyButton textToCopy="npx shadcn@latest add http://ui.deso.com/r/post-card.json" />
                   </div>
                 </div>
                <div className="text-center text-sm text-muted-foreground">
                  Components are added to <code className="bg-muted px-2 py-1 rounded">/components/deso-ui</code> in your project
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples Section */}
        <section className="pb-16 max-w-3xl mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {examples.map((example) => (
                <Link key={example.id} href={example.href} target="_blank">
                  <Button variant="outline" size="lg" className="gap-2">
                    {example.title}
                  </Button>
                </Link>
            ))}
          </div>
        </section>

        {/* Component Showcase */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Component Showcase</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive collection of DeSo-specific components with live examples
              </p>
            </div>

            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="ui">UI</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="mt-8">
                <div className="grid gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        PostCard Component
                      </CardTitle>
                      <CardDescription>
                        Complete post display with engagement, media, and interaction features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="max-w-2xl">
                        <PostCard
                          publicKey={DEFAULT_PUBLIC_KEY}
                          postContent="Just shipped a new feature for our DeSo app! The new media gallery with masonry layout looks incredible. What do you think? 🚀"
                          actions={sampleActions}
                          timestamp={new Date()}
                          images={['https://picsum.photos/seed/feature/800/600']}
                          postUrl="https://www.deso.org"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Interaction</CardTitle>
                        <CardDescription>Follow buttons and user actions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                           <UserInfo
                             publicKey={DEFAULT_PUBLIC_KEY}
                           />
                           <div className="flex gap-2">
                             <FollowButton />
                             <MessageButton />
                           </div>
                         </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Engagement:</span>
                          <PostEngagement variant="like" count={156} />
                          <PostEngagement variant="comment" count={24} />
                          <PostEngagement variant="repost" count={12} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Search & Utility</CardTitle>
                        <CardDescription>Search and utility components</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <SearchBar
                          placeholder="Search for users, posts, or content..."
                          onSearch={(query) => console.log('Search:', query)}
                        />
                        <div className="flex items-center gap-2">
                           <span className="text-sm">Verified user:</span>
                           <VerificationBadge isVerified={true} style="default" size="sm" />
                           <VerificationBadge isVerified={true} style="premium" size="sm" />
                         </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Posted</span>
                          <Timestamp timestamp={new Date(Date.now() - 1000 * 60 * 60 * 2)} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Media Components
                    </CardTitle>
                    <CardDescription>
                      Video cards with hover previews, image galleries, and media players
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {sampleMediaCards.map((card) => (
                        <MediaCard key={card.id} {...card} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Profile Components
                    </CardTitle>
                    <CardDescription>
                      Complete profile cards with stats, descriptions, and actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4">Default Profile Card</h4>
                        <ProfileCard
                          publicKey={DEFAULT_PUBLIC_KEY}
                          messageButtonVariant="icon-only"
                          className="max-w-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Compact Profile Card</h4>
                        <ProfileCard
                          publicKey={LIVE_PUBLIC_KEY}
                          variant="compact"
                          showMessageButton={false}
                          className="max-w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ui" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Buttons & Actions</CardTitle>
                      <CardDescription>Interactive elements and controls</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         <FollowButton />
                         <FollowButton variant="icon-only" />
                         <MessageButton />
                       </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Display</CardTitle>
                      <CardDescription>Information presentation components</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge>New Feature</Badge>
                          <Badge variant="secondary">Beta</Badge>
                          <Badge variant="outline">Coming Soon</Badge>
                        </div>
                                                 <div className="flex items-center gap-2">
                           <VerificationBadge isVerified={true} style="default" />
                           <span className="text-sm">Verified Creator</span>
                         </div>
                        <div className="text-sm text-muted-foreground">
                          Component count: <span className="font-mono">47</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose DeSo UI?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for modern DeSo applications with developer experience in mind
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <Palette className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">45+ Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Complete set of DeSo-specific components for posts, profiles, messaging, and media
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">TypeScript First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Built with TypeScript for better developer experience and type safety
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Shadcn/ui Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Built on top of shadcn/ui for consistency and easy customization
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Database className="w-8 h-8 text-orange-600 mb-2" />
                  <CardTitle className="text-lg">DeSo Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Pre-configured for DeSo blockchain with GraphQL integration and mock data
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Logo width={80} height={26} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
                <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                <a href="#" className="hover:text-foreground transition-colors">Storybook</a>
                <a href="#" className="hover:text-foreground transition-colors">DeSo.com</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Providers>
  );
}
