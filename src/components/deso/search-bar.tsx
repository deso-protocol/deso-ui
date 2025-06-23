'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/deso';

export interface SearchBarAutocompleteItem {
  id: string;
  label: string;
  value: string;
  data?: any;
}

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  className?: string;
  showSearchButton?: boolean;
  showClearButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  
  // Autocomplete props
  showAutocomplete?: boolean;
  autocompleteItems?: SearchBarAutocompleteItem[];
  onSelectItem?: (item: SearchBarAutocompleteItem) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  minCharsForAutocomplete?: number;
  renderItem?: (item: SearchBarAutocompleteItem) => React.ReactNode;
}

export function SearchBar({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  onFocus,
  className,
  showSearchButton = false,
  showClearButton = true,
  size = 'md',
  
  // Autocomplete props
  showAutocomplete = false,
  autocompleteItems = [],
  onSelectItem,
  isLoading = false,
  emptyMessage = 'No results found',
  minCharsForAutocomplete = 1,
  renderItem,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const shouldShowDropdown = showAutocomplete && showDropdown && value.length >= minCharsForAutocomplete;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    
    if (showAutocomplete) {
      setShowDropdown(true);
      setFocusedIndex(-1);
    }
  };

  const handleFocus = () => {
    onFocus?.();
    if (showAutocomplete && value.length >= minCharsForAutocomplete) {
      setShowDropdown(true);
    }
  };

  const handleSearch = () => {
    onSearch?.(value);
    setShowDropdown(false);
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.('');
    onClear?.();
    setShowDropdown(false);
    setFocusedIndex(-1);
  };

  const handleSelectItem = (item: SearchBarAutocompleteItem) => {
    if (controlledValue === undefined) {
      setInternalValue(item.value);
    }
    onChange?.(item.value);
    onSelectItem?.(item);
    setShowDropdown(false);
    setFocusedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldShowDropdown) {
      if (e.key === 'Enter') {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && autocompleteItems[focusedIndex]) {
          handleSelectItem(autocompleteItems[focusedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < autocompleteItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Escape':
        setShowDropdown(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const getDropdownContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      );
    }

    if (autocompleteItems.length === 0) {
      return (
        <div className="p-4 text-sm text-muted-foreground text-center">
          {emptyMessage}
        </div>
      );
    }

    return (
      <div className="py-1">
        {autocompleteItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'px-3 py-2 cursor-pointer text-sm transition-colors',
              'hover:bg-muted focus:bg-muted',
              focusedIndex === index && 'bg-muted'
            )}
            onClick={() => handleSelectItem(item)}
            onMouseEnter={() => setFocusedIndex(index)}
          >
            {renderItem ? renderItem(item) : item.label}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn('relative flex items-center', className)}>
      <div className="relative flex-1">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={cn(
            'rounded-full',
            showClearButton && value && 'pr-10',
            sizeClasses[size]
          )}
        />
        {showClearButton && value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-[8px] top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-muted/50"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        
        {/* Autocomplete Dropdown */}
        {shouldShowDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl z-50 max-h-60 overflow-y-auto">
            {getDropdownContent()}
          </div>
        )}
      </div>
      {showSearchButton && (
        <Button
          onClick={handleSearch}
          className={cn('ml-2', sizeClasses[size])}
        >
          Search
        </Button>
      )}
    </div>
  );
} 