import type { Meta, StoryObj } from '@storybook/react';
import { PostVideo } from './post-video';

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
  name: 'Local Video',
  args: {
    url: '/video-sample.mp4',
  },
};
