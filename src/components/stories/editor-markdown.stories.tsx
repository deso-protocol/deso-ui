import type { Meta, StoryObj } from '@storybook/react';
import { EditorMarkdown } from '../deso/editor-markdown';
import { Providers } from '../../lib/providers';
import { richText } from '@/lib/constants';

const meta: Meta<typeof EditorMarkdown> = {
  title: 'DeSo/EditorMarkdown',
  component: EditorMarkdown,
  decorators: [
    (Story) => (
      <Providers>
        <div>
          <Story />
        </div>
      </Providers>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditorMarkdown>;

export const Default: Story = {
  args: {
    placeholder: 'Start writing your markdown content...',
    onChange: (value: string) => {
      console.log('Markdown content:', value);
    },
  },
};

export const WithRichContent: Story = {
  args: {
    value: richText,
    onChange: (value: string) => {
      console.log('Markdown content:', value);
    },
  },
};

export const Disabled: Story = {
  args: {
    value: '# This is disabled content\n\nYou cannot edit this.',
    disabled: true,
  },
}; 