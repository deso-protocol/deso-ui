import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from '../deso/user-menu';
import { Providers } from '../../lib/providers';
import { searchUsers, mockProfiles } from '../../lib/mocks/deso-data';
import { DEFAULT_PUBLIC_KEY, DEFAULT_USERNAME } from '../../lib/constants';

const meta: Meta<typeof UserMenu> = {
  title: 'DeSo/UserMenu',
  component: UserMenu,
  decorators: [
    (Story) => (
      <div className="flex justify-center">
        <Providers>
          <Story />
        </Providers>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'compact'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockAccounts = Object.values(searchUsers).map((user) => ({
  publicKey: user.publicKey,
  profile: {
    username: user.username,
    profilePic: user.profilePic,
    isVerified: user.isVerified,
    publicKey: user.publicKey,
    description: 'A mock user profile.',
  },
}));

export const Default: Story = {
  args: {
    currentUser: {
      publicKey: DEFAULT_PUBLIC_KEY,
      profile: mockProfiles[DEFAULT_USERNAME].accountByPublicKey,
    },
    otherAccounts: mockAccounts,
    variant: 'full',
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
  },
}; 