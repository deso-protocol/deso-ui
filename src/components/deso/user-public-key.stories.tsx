import type { Meta, StoryObj } from '@storybook/react';
import { UserPublicKey } from './user-public-key';
import { DEFAULT_PUBLIC_KEY } from '../../lib/constants';

const meta: Meta<typeof UserPublicKey> = {
  title: 'DeSo/UserPublicKey',
  component: UserPublicKey,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    truncate: { control: 'boolean' },
    showCopyButton: { control: 'boolean' },
    startChars: { control: 'number' },
    endChars: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Full Key)',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    truncate: false,
    showCopyButton: false,
  },
};

export const Truncated: Story = {
  name: 'Truncated Key',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    truncate: true,
    showCopyButton: false,
  },
};

export const WithCopyButton: Story = {
  name: 'Truncated with Copy Button',
  args: {
    publicKey: DEFAULT_PUBLIC_KEY,
    truncate: true,
    showCopyButton: true,
  },
}; 