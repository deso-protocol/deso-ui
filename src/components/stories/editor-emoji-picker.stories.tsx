import type { Meta, StoryObj } from '@storybook/react';
import { EditorEmojiPicker } from '../deso/editor-emoji-picker';
import { Providers } from '../../lib/providers';

const meta: Meta<typeof EditorEmojiPicker> = {
  title: 'DeSo/EditorEmojiPicker',
  component: EditorEmojiPicker,
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditorEmojiPicker>;

export const Default: Story = {
  args: {
    onEmojiClick: (emoji: string) => {
      console.log('Selected emoji:', emoji);
      alert(`Selected emoji: ${emoji}`);
    },
  },
}; 