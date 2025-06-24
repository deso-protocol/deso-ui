import type { Meta, StoryObj } from '@storybook/react';
import { PostVideo } from '../deso/post-video';
import { SAMPLE_VIDEO_URL } from '@/lib/constants';

const meta: Meta<typeof PostVideo> = {
  title: 'DeSo/PostVideo',
  component: PostVideo,
  argTypes: {
    url: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostVideo>;

export const Default: Story = {
  name: 'Video File',
  args: {
    url: SAMPLE_VIDEO_URL,
  },
};
