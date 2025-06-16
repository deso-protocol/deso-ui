import type { Meta, StoryObj } from '@storybook/react';
import { PostAudio } from './post-audio';

const meta: Meta<typeof PostAudio> = {
  title: 'DeSo/PostAudio',
  component: PostAudio,
  argTypes: {
    url: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostAudio>;

export const Default: Story = {
  args: {
    url: '/audio-sample.mp3',
  },
}; 