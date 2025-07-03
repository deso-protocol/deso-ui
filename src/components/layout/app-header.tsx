'use client';

import { Logo } from '@/components/deso/logo';
import { SearchBar } from '@/components/deso/search-bar';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Logo width={32} height={32} />
            <div>
              <h1 className="text-xl font-bold">DeSo News</h1>
              <p className="text-xs text-muted-foreground">Blockchain-powered news discussion</p>
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar placeholder="Search news..." />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 