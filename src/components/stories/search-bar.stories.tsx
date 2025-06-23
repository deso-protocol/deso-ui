import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../deso/search-bar';
import { useState } from 'react';

const meta: Meta<typeof SearchBar> = {
  title: 'DeSo/SearchBar',
  component: SearchBar,
  argTypes: {
    onSearch: {
      action: 'searched',
      description: 'Callback for when search is triggered',
    },
    onChange: {
      action: 'changed',
      description: 'Callback for when input value changes',
    },
    onClear: {
      action: 'cleared',
      description: 'Callback for when clear button is clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search for ideas...',
  },
};

export const WithSearchButton: Story = {
  args: {
    placeholder: 'Search for ideas...',
    showSearchButton: true,
  },
};

export const WithoutClearButton: Story = {
  args: {
    placeholder: 'Search for ideas...',
    showClearButton: false,
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Search...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Search for ideas...',
    size: 'lg',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <SearchBar
          {...args}
          value={value}
          onChange={setValue}
          placeholder="Type something..."
        />
        <p className="text-sm text-muted-foreground">
          Current value: "{value}"
        </p>
      </div>
    );
  },
};

export const PinterestStyle: Story = {
  args: {
    placeholder: 'Search for ideas',
    size: 'lg',
    className: 'max-w-2xl',
  },
}; 