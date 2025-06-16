import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationDialog } from './confirmation-dialog';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'DeSo/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialog>;

export const Default: Story = {
  name: 'Default',
  args: {
    trigger: <Button variant="outline">Open Dialog</Button>,
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    variant: 'default',
    onConfirm: () => alert('Confirmed!'),
  },
};

export const Destructive: Story = {
  name: 'Destructive',
  args: {
    ...Default.args,
    title: 'Delete Post?',
    description: 'This will permanently delete the post. This cannot be undone.',
    variant: 'destructive',
    confirmText: 'Delete',
  },
};

export const Success: Story = {
  name: 'Success',
  args: {
    ...Default.args,
    title: 'Confirm Purchase',
    description: 'You are about to purchase this item.',
    variant: 'success',
    confirmText: 'Purchase',
  },
}; 