'use client';

import { Logo } from '@/components/deso/logo';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/login-button';
import { useIdentity } from '@/contexts/identity-context';
import { BalanceDisplay } from '../deso/balance-display';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import { CategoryNav } from '../news/category-nav';

export function AppHeader() {
  const { currentUser } = useIdentity();
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Logo width={100} />
          </div>
          <div className="flex items-center gap-2">
            {currentUser && (
              <div className="hidden md:block mr-2">
                <BalanceDisplay 
                  publicKey={currentUser.publicKey}
                  variant="compact"
                  showLabel={false}
                />
              </div>
            )}
            <div className="hidden sm:block">
              <LoginButton />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden h-9 w-9 px-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="pt-4 border-t">
                    <LoginButton />
                  </div>
                  {currentUser && (
                    <div className="pt-4 border-t">
                      <BalanceDisplay 
                        publicKey={currentUser.publicKey}
                        variant="default"
                        showLabel={true}
                      />
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 