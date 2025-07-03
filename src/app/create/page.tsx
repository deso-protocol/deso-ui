'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Editor } from '@/components/deso/editor';
import { useIdentity } from '@/contexts/identity-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Providers } from '@/lib/providers';
import { useCreateDiscussionPost } from '@/hooks/useCreateDiscussionPost';
import { NewsCard } from '@/components/news/news-card';
import { BaseNewsItem } from '@/types/news';

const CreatePageContent = () => {
  const searchParams = useSearchParams();
  const { currentUser } = useIdentity();
  const createPostMutation = useCreateDiscussionPost();
  
  const url = searchParams.get('url');
  const title = searchParams.get('title');
  const imageUrl = searchParams.get('imageUrl');
  const description = searchParams.get('description');
  const source = searchParams.get('source');
  const publishedAt = searchParams.get('publishedAt');
  const category = searchParams.get('category');

  const handlePostSubmit = async (data: any) => {
    if (!url) return;
    try {
      const result = await createPostMutation.mutateAsync({
        postText: data.postText,
        newsUrl: url,
      });
      console.log('Post submission result:', result);
    } catch (error) {
      console.error('Failed to submit post:', error);
    }
  };

  if (!url || !title) {
    return (
      <div className="container mx-auto flex-grow p-4 text-center text-red-500">
        Missing news article information. Please go back and try again.
      </div>
    );
  }

  const newsItem: BaseNewsItem = {
    id: url,
    url,
    title,
    imageUrl: imageUrl || undefined,
    description: description || undefined,
    source: source || undefined,
    publishedAt: publishedAt || undefined,
    category: category || undefined,
    scrapedAt: new Date().toISOString(),
    trending: false,
    viewCount: 0,
    discussionCount: 0,
  };

  const initialEditorText = `Check out this article: ${url}`;

  return (
    <div className="container mx-auto flex-grow p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {currentUser ? (
            <Editor
              currentUser={currentUser}
              onSubmit={handlePostSubmit}
              placeholder={`What are your thoughts on "${title}"?`}
              useMarkdownEditor={true}
              submitButtonText="Post Discussion"
              initialText={initialEditorText}
            />
          ) : (
            <div className="text-center text-muted-foreground">
              Please log in to join the discussion.
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reference Article</CardTitle>
            </CardHeader>
            <CardContent>
              <NewsCard newsItem={newsItem} showDiscussButton={false} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function CreatePage() {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <main className="flex flex-col gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <CreatePageContent />
          </Suspense>
        </main>
        <AppFooter />
      </div>
    </Providers>
  );
} 