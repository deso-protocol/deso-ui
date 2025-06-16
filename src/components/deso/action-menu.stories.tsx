import type { Meta, StoryObj } from '@storybook/react';
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from './action-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Ban, Flag, Share2, Trash2 } from 'lucide-react';

const meta: Meta<typeof ActionMenu> = {
  title: 'DeSo/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ActionMenu>;

const menuItems = (
  <>
    <ActionMenuItem icon={Share2}>Share</ActionMenuItem>
    <ActionMenuItem icon={Flag}>Report</ActionMenuItem>
    <ActionMenuItem icon={Ban}>Block</ActionMenuItem>
    <ActionMenuSeparator />
    <ActionMenuItem icon={Trash2} variant="destructive">
      Delete
    </ActionMenuItem>
  </>
);

export const IconOnly: Story = {
  name: 'Icon Only Trigger',
  args: {
    trigger: (
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
    children: menuItems,
  },
};

export const WithText: Story = {
  name: 'With Text Trigger',
  args: {
    trigger: <Button variant="outline">Actions</Button>,
    children: menuItems,
  },
};

const menuItemsWithoutIcons = (
  <>
    <ActionMenuItem>Share</ActionMenuItem>
    <ActionMenuItem>Report</ActionMenuItem>
    <ActionMenuItem>Block</ActionMenuItem>
    <ActionMenuSeparator />
    <ActionMenuItem variant="destructive">Delete</ActionMenuItem>
  </>
);

export const NoIcons: Story = {
  name: 'No Icons',
  args: {
    trigger: <Button variant="outline">Actions</Button>,
    children: menuItemsWithoutIcons,
  },
};

const menuItemsWithConfirmation = (
  <>
    <ActionMenuItem icon={Share2}>Share</ActionMenuItem>
    <ActionMenuItem
      icon={Flag}
      confirmation={{
        title: 'Report this action?',
        description: 'This will submit a report. Are you sure?',
        onConfirm: () => alert('Reported'),
        confirmText: 'Report',
      }}
    >
      Report
    </ActionMenuItem>
    <ActionMenuItem
      icon={Ban}
      confirmation={{
        title: 'Block this user?',
        description: "You won't see their content. They won't see yours.",
        variant: 'destructive',
        onConfirm: () => alert('Blocked'),
        confirmText: 'Block',
      }}
    >
      Block
    </ActionMenuItem>
    <ActionMenuSeparator />
    <ActionMenuItem
      icon={Trash2}
      variant="destructive"
      confirmation={{
        title: 'Are you sure you want to delete?',
        description: 'This action cannot be undone.',
        variant: 'destructive',
        confirmText: 'Yes, delete',
        onConfirm: () => alert('Deleted'),
      }}
    >
      Delete
    </ActionMenuItem>
  </>
);

export const WithConfirmation: Story = {
  name: 'With Confirmation',
  args: {
    trigger: <Button variant="outline">Actions</Button>,
    children: menuItemsWithConfirmation,
  },
}; 