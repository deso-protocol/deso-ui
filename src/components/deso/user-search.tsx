import * as React from 'react';
import { Loader2, Search } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { useDebounce } from '@/hooks/useDebounce';
import { UserInfo } from './user-info';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const UserSearch = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { users, isLoading } = useSearchUsers(debouncedSearchTerm);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const getCommandListContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-2">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      );
    }

    if (users.length > 0) {
      return (
        <CommandGroup heading="Users">
          {users.map((user) => (
            <CommandItem
              key={user.publicKey}
              value={user.username || user.publicKey}
              onSelect={() => {
                setSearchTerm(user.username || user.publicKey);
                setOpen(false);
              }}
            >
              <UserInfo
                publicKey={user.publicKey}
                profile={user}
                pictureSize="xs"
                showPublicKey={true}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      );
    }

    if (debouncedSearchTerm.length < 3) {
      return <CommandEmpty>Type at least 3 characters.</CommandEmpty>;
    }

    return <CommandEmpty>No users found.</CommandEmpty>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {searchTerm || 'Search users...'}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder="Search for a user..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>{getCommandListContent()}</CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}; 