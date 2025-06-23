import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Wallet,
  DollarSign,
  LogOut,
  PlusCircle,
  Users,
} from 'lucide-react';
import { UserInfo } from './user-info';
import { ProfilePicture } from './profile-picture';
import { cn } from '@/lib/utils/deso';
import { Profile } from '@/lib/schemas/deso';
import { UserPublicKey } from './user-public-key';
import { UsernameDisplay } from './username-display';

export interface UserMenuAccount {
  publicKey: string;
  profile?: Profile;
}

interface UserMenuProps {
  currentUser: UserMenuAccount;
  otherAccounts?: UserMenuAccount[];
  onAccountSwitch?: (publicKey: string) => void;
  onLogout?: () => void;
  onAddAccount?: () => void;
  onMyProfile?: () => void;
  onMyWallet?: () => void;
  onMyEarnings?: () => void;
  variant?: 'full' | 'compact';
  align?: 'center' | 'start' | 'end';
  triggerClassName?: string;
}

export function UserMenu({
  currentUser,
  otherAccounts = [],
  onAccountSwitch,
  onLogout,
  onAddAccount,
  onMyProfile,
  onMyWallet,
  onMyEarnings,
  variant = 'full',
  align = 'end',
  triggerClassName,
}: UserMenuProps) {
  const trigger =
    variant === 'full' ? (
      <UserInfo
        publicKey={currentUser.publicKey}
        profile={currentUser.profile}
        pictureSize="sm"
        className={cn(
          'cursor-pointer hover:bg-accent p-2 rounded-lg -m-2 w-full w-fit',
          triggerClassName
        )}
      />
    ) : (
      <ProfilePicture
        publicKey={currentUser.publicKey}
        profile={currentUser.profile}
        size="md"
        className={cn('cursor-pointer', triggerClassName)}
      />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">{trigger}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 border border-border" align={align}>
        <div className="p-2 space-y-1">
          <p className="text-xs text-muted-foreground px-2">Logged in as:</p>
          <div className="px-2">
            <UsernameDisplay
              publicKey={currentUser.publicKey}
              profile={currentUser.profile}
              className="font-semibold"
            />
            <UserPublicKey
              publicKey={currentUser.publicKey}
              showCopyButton
              truncate
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onMyProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onMyWallet}>
          <Wallet className="mr-2 h-4 w-4" />
          <span>My Wallet</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onMyEarnings}>
          <DollarSign className="mr-2 h-4 w-4" />
          <span>My Earnings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            <span>Switch Account</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="border border-border">
            {otherAccounts.map((account) => (
              <DropdownMenuItem
                key={account.publicKey}
                onSelect={() => onAccountSwitch?.(account.publicKey)}
              >
                <UserInfo
                  publicKey={account.publicKey}
                  profile={account.profile}
                  pictureSize="xs"
                />
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onAddAccount}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Add account</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 