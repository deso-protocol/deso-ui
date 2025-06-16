import type { Meta, StoryObj } from '@storybook/react';
import { ProfileActions } from './profile-actions';

const meta: Meta<typeof ProfileActions> = {
  title: 'DeSo/ProfileActions',
  component: ProfileActions,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileActions>;

export const Default: Story = {}; 