import type { Meta, StoryObj } from '@storybook/react';
import { PostShare } from './post-share';

const meta: Meta<typeof PostShare> = {
  title: 'DeSo/PostShare',
  component: PostShare,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof PostShare>;

export const Default: Story = {
  args: {
    url: 'https://www.deso.org',
    text: 'Check out DeSo!',
  },
}; 