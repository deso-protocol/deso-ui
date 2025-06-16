import type { Meta, StoryObj } from '@storybook/react';
import { PostText } from './post-text';
import { simpleText, richText, longSimpleText, longRichText } from '@/lib/constants';

const meta: Meta<typeof PostText> = {
  title: 'DeSo/PostText',
  component: PostText,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof PostText>;

export const Simple: Story = {
  args: {
    text: simpleText,
    variant: 'simple',
    className: 'w-[600px]',
  },
};

export const Rich: Story = {
  args: {
    text: richText,
    variant: 'rich',
    className: 'w-[600px]',
  },
};

export const SimpleTruncated: Story = {
  name: 'Simple (Truncated)',
  args: {
    text: longSimpleText,
    variant: 'simple',
    className: 'w-[600px]',
    lineClamp: 4,
  },
};

export const RichTruncated: Story = {
  name: 'Rich (Truncated)',
  args: {
    text: longRichText,
    variant: 'rich',
    className: 'w-[600px]',
    lineClamp: 10,
  },
}; 