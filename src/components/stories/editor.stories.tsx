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
        <div className="max-w-xl mx-auto">
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