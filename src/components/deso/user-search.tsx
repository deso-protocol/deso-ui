import * as React from 'react';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { useDebounce } from '@/hooks/useDebounce';
import { UserInfo } from './user-info';
import { SearchBar, SearchBarAutocompleteItem } from './search-bar';
import { cn } from '@/lib/utils/deso';

export interface UserSearchProps {
  onSelectUser: (publicKey: string) => void;
  className?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UserSearch = ({
  onSelectUser,
  className,
  placeholder = 'Search users...',
  size = 'md',
}: UserSearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { users, isLoading } = useSearchUsers(debouncedSearchTerm);

  // Convert users to autocomplete items
  const autocompleteItems: SearchBarAutocompleteItem[] = users.map(user => ({
    id: user.publicKey,
    label: user.username || user.publicKey,
    value: user.username || user.publicKey,
    data: user,
  }));

  const handleSelectItem = (item: SearchBarAutocompleteItem) => {
    onSelectUser(item.id);
    setSearchTerm('');
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const renderUserItem = (item: SearchBarAutocompleteItem) => {
    return (
      <UserInfo
        publicKey={item.id}
        profile={item.data}
        pictureSize="xs"
        showPublicKey={true}
        className="w-full"
      />
    );
  };

  const getEmptyMessage = () => {
    if (searchTerm.length === 0) {
      return 'Start typing to search for users';
    }
    if (searchTerm.length < 3) {
      return 'Type at least 3 characters';
    }
    return 'No users found';
  };

  return (
    <SearchBar
      placeholder={placeholder}
      value={searchTerm}
      onChange={setSearchTerm}
      onSearch={handleSearch}
      onClear={handleClear}
      size={size}
      className={cn('w-full', className)}
      showClearButton={true}
      showAutocomplete={true}
      autocompleteItems={autocompleteItems}
      onSelectItem={handleSelectItem}
      isLoading={isLoading}
      emptyMessage={getEmptyMessage()}
      minCharsForAutocomplete={1}
      renderItem={renderUserItem}
    />
  );
}; 