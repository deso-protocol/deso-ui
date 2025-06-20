import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from '../deso/editor';
import { Providers } from '../../lib/providers';
import { DEFAULT_PUBLIC_KEY } from '@/lib/constants';

const meta: Meta<typeof Editor> = {
  title: 'DeSo/Editor',
  component: Editor,
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
type Story = StoryObj<typeof Editor>;

const containerWidth = "w-[700px]";

export const Default: Story = {
  args: {
    currentUser: {
      publicKey: DEFAULT_PUBLIC_KEY,
    },
    className: containerWidth,
    onSubmit: (data) => {
      console.log('Submitted post:', data);
      alert(
        `Submitted post: ${data.postText} with ${data.files.length} image(s)`
      );
    },
  },
};

export const WithUserInfo: Story = {
  args: {
    ...Default.args,
    currentUser: {
      publicKey: DEFAULT_PUBLIC_KEY,
    },
    showUserInfo: true,
    showVisibility: true,
    className: containerWidth,
    onSubmit: (data) => {
      console.log('Submitted post:', data);
      alert(
        `Submitted post: ${data.postText} with ${data.files.length} image(s)`
      );
    },
  },
};

export const TextAndEmojiOnly: Story = {
  args: {
    ...Default.args,
    showImageUpload: false,
    showVideoUpload: false,
    showAudioUpload: false,
    showExclusiveContent: false,
  },
};

export const ImageAndVideoOnly: Story = {
  args: {
    ...Default.args,
    showAudioUpload: false,
    showExclusiveContent: false,
    showEmojiPicker: false,
  },
};

export const AudioAndExclusiveOnly: Story = {
  args: {
    ...Default.args,
    showImageUpload: false,
    showVideoUpload: false,
    showEmojiPicker: false,
  },
};

export const WithCharacterCount: Story = {
  args: {
    ...Default.args,
    showCharacterCount: true,
    maxChars: 100,
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    layout: 'compact',
    placeholder: 'Reply to...',
  },
};

export const WithSubmitOnEnter: Story = {
  args: {
    ...Default.args,
    submitOnEnter: true,
    placeholder: 'Type something and press Enter to post...',
  },
};

export const WithMarkdownEditor: Story = {
  args: {
    ...Default.args,
    useMarkdownEditor: true,
    placeholder: 'Write rich markdown content...',
  },
}; 