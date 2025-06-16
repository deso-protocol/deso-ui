import type { Meta, StoryObj } from '@storybook/react';
import { MessageButton } from './message-button';

const meta: Meta<typeof MessageButton> = {
  title: 'DeSo/MessageButton',
  component: MessageButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon', 'icon-only'],
      description: 'The button style variant.',
    },
    showTooltip: {
      control: 'boolean',
    },
    tooltipText: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    variant: 'icon',
  },
};

export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    variant: 'icon-only',
  },
};

export const WithTooltip: Story = {
  name: 'Icon Only with Tooltip',
  args: {
    variant: 'icon-only',
    showTooltip: true,
    tooltipText: 'Send a direct message',
  },
}; 