import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from './copy-button';

const meta: Meta<typeof CopyButton> = {
  title: 'DeSo/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    textToCopy: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    showTooltip: {
      control: 'boolean',
    },
    tooltipText: {
      control: 'text',
    },
    successTooltipText: {
      control: 'text',
    },
    successLabel: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    textToCopy: 'This text will be copied to clipboard',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    textToCopy: 'This text will be copied to clipboard',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    textToCopy: 'This text will be copied to clipboard',
    size: 'lg',
  },
};

export const CustomStyling: Story = {
  args: {
    textToCopy: 'This text will be copied to clipboard',
    size: 'md',
    className: 'bg-blue-100 rounded-md p-2',
  },
};

export const WithLabel: Story = {
  args: {
    textToCopy: 'This text will be copied to clipboard',
    size: 'md',
    label: 'Copy',
  },
};

export const NoTooltip: Story = {
  args: {
    ...Default.args,
    showTooltip: false,
    label: 'No Tooltip',
  },
};

export const CustomTooltipText: Story = {
  args: {
    ...Default.args,
    tooltipText: 'Click me to copy!',
    successTooltipText: 'Awesome! You copied it!',
  },
};

export const WithSuccessLabel: Story = {
  args: {
    ...Default.args,
    label: 'Copy',
    successLabel: 'Copied!',
  },
}; 