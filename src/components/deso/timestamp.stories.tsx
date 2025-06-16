import type { Meta, StoryObj } from '@storybook/react';
import { Timestamp } from './timestamp';

const meta: Meta<typeof Timestamp> = {
  title: 'DeSo/Timestamp',
  component: Timestamp,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    timestamp: {
      control: 'date',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Timestamp>;

const now = new Date();
const secondsAgo = new Date(now.getTime() - 30 * 1000);
const minutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
const hoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
const daysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
const longTimeAgo = new Date('2023-01-01T12:00:00Z');

export const JustNow: Story = {
  name: 'Just Now',
  args: {
    timestamp: new Date(),
  },
};

export const SecondsAgo: Story = {
  name: 'Seconds Ago',
  args: {
    timestamp: secondsAgo,
  },
};

export const MinutesAgo: Story = {
  name: 'Minutes Ago',
  args: {
    timestamp: minutesAgo,
  },
};

export const HoursAgo: Story = {
  name: 'Hours Ago',
  args: {
    timestamp: hoursAgo,
  },
};

export const DaysAgo: Story = {
  name: 'Days Ago',
  args: {
    timestamp: daysAgo,
  },
};

export const FullDate: Story = {
  name: 'Full Date',
  args: {
    timestamp: longTimeAgo,
    format: 'fullDate',
  },
};

export const FullDateTime: Story = {
  name: 'Full Date and Time',
  args: {
    timestamp: longTimeAgo,
    format: 'fullDateTime',
  },
}; 