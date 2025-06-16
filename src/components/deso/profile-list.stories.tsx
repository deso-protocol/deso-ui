import type { Meta, StoryObj } from '@storybook/react';
import { ProfileList } from './profile-list';
import { ProfileCardProps } from './profile-card';
import { DEFAULT_PUBLIC_KEY } from '@/lib/constants';
import { successHandlers } from '@/lib/mocks/msw-handlers';

const meta: Meta<typeof ProfileList> = {
  title: 'DeSo/ProfileList',
  component: ProfileList,
  parameters: {
    layout: 'centered',
    gap: 16,
    msw: {
      handlers: successHandlers,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileList>;

const containerWidth = 'max-w-full w-[600px]';
const cardWidth = 'max-w-full w-[600px]';

const sampleProfiles: ProfileCardProps[] = [
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    showFeaturedImage: false,
    showFollowButton: true,
    showMessageButton: true,
    showActionMenu: true,
    followButtonVariant: 'default',
    messageButtonVariant: 'icon-only',
    showDescription: true,
    showTags: true,
    showStats: true,
    className: cardWidth,
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    showFeaturedImage: false,
    showFollowButton: true,
    showMessageButton: true,
    showActionMenu: true,
    followButtonVariant: 'default',
    messageButtonVariant: 'icon-only',
    showDescription: true,
    showTags: true,
    showStats: true,
    className: cardWidth,
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    showFeaturedImage: false,
    showFollowButton: true,
    showMessageButton: true,
    showActionMenu: true,
    followButtonVariant: 'default',
    messageButtonVariant: 'icon-only',
    showDescription: true,
    showTags: true,
    showStats: true,
    className: cardWidth,
  },
  {
    publicKey: DEFAULT_PUBLIC_KEY,
    showFeaturedImage: false,
    showFollowButton: true,
    showMessageButton: true,
    showActionMenu: true,
    followButtonVariant: 'default',
    messageButtonVariant: 'icon-only',
    showDescription: true,
    showTags: true,
    showStats: true,
    className: cardWidth,
  },
];

export const Cards: Story = {
  args: {
    profiles: sampleProfiles,
    variant: 'cards',
    className: containerWidth,
    gap: 16,
  },
};

export const Seamless: Story = {
  args: {
    profiles: sampleProfiles,
    variant: 'seamless',
    className: containerWidth,
  },
}; 

export const CompactCards: Story = {
    args: {
        profiles: sampleProfiles,
        variant: 'cards',
        profileVariant: 'compact',
        className: containerWidth,
        gap: 16,
    },
}; 

export const CompactSeamless: Story = {
    args: {
        profiles: sampleProfiles,
        variant: 'seamless',
        profileVariant: 'compact',
        className: containerWidth,
    },
}; 