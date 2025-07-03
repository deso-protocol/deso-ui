'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useFeedPreferences } from '@/hooks/useFeedPreferences';
import { Input } from '@/components/ui/input';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

interface FeedSelectorProps {
  preferences: ReturnType<typeof useFeedPreferences>['preferences'];
  updatePreference: ReturnType<typeof useFeedPreferences>['updatePreference'];
  setAllPreferences: ReturnType<typeof useFeedPreferences>['setAllPreferences'];
  addCustomSource: ReturnType<typeof useFeedPreferences>['addCustomSource'];
  removeCustomSource: ReturnType<typeof useFeedPreferences>['removeCustomSource'];
}

export function FeedSelector({ 
  preferences, 
  updatePreference, 
  setAllPreferences, 
  addCustomSource,
  removeCustomSource,
}: FeedSelectorProps) {
  const [newSourceName, setNewSourceName] = React.useState('');
  const [newSourceUrl, setNewSourceUrl] = React.useState('');

  const handleSelectAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setAllPreferences(true);
  };

  const handleSelectNone = (e: React.MouseEvent) => {
    e.preventDefault();
    setAllPreferences(false);
  };
  
  const handleAddSource = (e: React.MouseEvent) => {
    e.preventDefault();
    addCustomSource(newSourceName, newSourceUrl);
    setNewSourceName('');
    setNewSourceUrl('');
  };
  
  const enabledCount = preferences.filter(p => p.isEnabled).length;
  const customSources = preferences.filter(p => p.isCustom);
  const defaultSources = preferences.filter(p => !p.isCustom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Sources ({enabledCount} / {preferences.length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>Toggle News Sources</DropdownMenuLabel>
        <div className="flex justify-between px-2 py-1 text-xs">
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleSelectAll}>Select All</Button>
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleSelectNone}>Select None</Button>
        </div>
        <DropdownMenuSeparator />

        {defaultSources.map(source => (
          <DropdownMenuCheckboxItem
            key={source.url}
            checked={source.isEnabled}
            onCheckedChange={checked => updatePreference(source.url, checked)}
          >
            {source.name} <span className="text-muted-foreground ml-2">({source.category})</span>
          </DropdownMenuCheckboxItem>
        ))}
        
        {customSources.length > 0 && <DropdownMenuSeparator />}
        
        {customSources.map(source => (
           <div key={source.url} className="flex items-center justify-between pr-2">
            <DropdownMenuCheckboxItem
              className="flex-grow"
              checked={source.isEnabled}
              onCheckedChange={checked => updatePreference(source.url, checked)}
            >
              {source.name}
            </DropdownMenuCheckboxItem>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeCustomSource(source.url)}>
              <TrashIcon className="h-4 w-4 text-red-500"/>
            </Button>
          </div>
        ))}

        <DropdownMenuSeparator />
        <div className="p-2 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Add Custom RSS Feed</p>
            <Input 
                placeholder="Feed Name (e.g., Ars Technica)"
                value={newSourceName}
                onChange={e => setNewSourceName(e.target.value)}
            />
            <Input 
                placeholder="https://arstechnica.com/rss"
                value={newSourceUrl}
                onChange={e => setNewSourceUrl(e.target.value)}
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleAddSource}
              disabled={!newSourceName.trim() || !newSourceUrl.trim()}
            >
                <PlusIcon className="mr-2 h-4 w-4"/>
                Add Source
            </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 