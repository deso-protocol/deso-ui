import type { Meta, StoryObj } from '@storybook/react';
import { ProfileDescription } from './profile-description';
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants';
import { loadingHandlers, errorHandlers } from '../../lib/mocks/msw-handlers';

const meta: Meta<typeof ProfileDescription> = {
  title: 'DeSo/ProfileDescription',
  component: ProfileDescription,
  argTypes: {
    publicKey: {
      control: 'text',
    },
    lineClamp: {
      control: 'number',
    },
    showMoreText: {
      control: 'text',
    },
    showLessText: {
      control: 'text',
    },
    formatted: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = {
  name: 'Live Data',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
};

export const LiveTruncated: Story = {
  name: 'Live Data (Truncated)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    lineClamp: 4,
  },
};

export const CustomShowMoreText: Story = {
  name: 'Custom Show More/Less Text',
  args: {
    ...LiveTruncated.args,
    showMoreText: 'Read more',
    showLessText: 'Collapse',
  },
};

export const Loading: Story = {
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
};

export const Formatted: Story = {
  name: 'Formatted',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    formatted: true,
  },
};

export const FormattedTruncated: Story = {
  name: 'Formatted (Truncated)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    formatted: true,
    lineClamp: 4,
  },
};
