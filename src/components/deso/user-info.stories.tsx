import type { Meta, StoryObj } from '@storybook/react';
import { UserInfo } from './user-info';
import { loadingHandlers } from '../../lib/mocks/msw-handlers';
import { DEFAULT_PUBLIC_KEY } from '@/lib/constants';

/**
 * The UserInfo component combines ProfilePicture and UsernameDisplay,
 * providing a complete user information display.
 */
const meta: Meta<typeof UserInfo> = {
  title: 'DeSo/UserInfo',
  component: UserInfo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pictureSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showVerification: { control: 'boolean' },
    showCopyButton: { control: 'boolean' },
    showPublicKey: { control: 'boolean' },
    truncate: { control: 'boolean' },
    layout: {
      control: 'select',
      options: ['row', 'column'],
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
  },
};

export const WithPublicKey: Story = {
  name: 'With Public Key (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    showPublicKey: true,
  },
};

export const ColumnLayout: Story = {
  name: 'Column Layout (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    layout: 'column',
    showPublicKey: true,
  },
};

export const WithCopyButton: Story = {
  name: 'With Copy Button (Live Data)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    showCopyButton: true,
  },
};

export const Loading: Story = {
  args: {
    publicKey: 'loading...',
  },
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
}; 