import type { Meta, StoryObj } from '@storybook/react';
import { Editor } from '../deso/editor';
import { Providers } from '../../lib/providers';
import { DEFAULT_PUBLIC_KEY, DEFAULT_USERNAME } from '@/lib/constants';
import { mockProfiles } from '../../lib/mocks/deso-data';

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

const containerWidth = "w-[500px]";

export const Default: Story = {
  args: {
    currentUser: {
      publicKey: DEFAULT_PUBLIC_KEY,
      profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
    },
    className: containerWidth,
    onSubmit: (postText, images) => {
      console.log('Submitted post:', { postText, images });
      alert(`Submitted post: ${postText} with ${images.length} image(s)`);
    },
  },
}; 