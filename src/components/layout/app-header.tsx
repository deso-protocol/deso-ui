'use client';

import { Logo } from '@/components/deso/logo';
import { SearchBar } from '@/components/deso/search-bar';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/login-button';
import { Settings } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Logo width={100} />
          </div>
          <div className="flex items-center gap-2">
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
} 