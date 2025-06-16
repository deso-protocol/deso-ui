import type { Meta, StoryObj } from '@storybook/react';
import { PostEngagement } from './post-engagement';
import React, { useState, useEffect } from 'react';

const meta: Meta<typeof PostEngagement> = {
  title: 'DeSo/PostEngagement',
  component: PostEngagement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['like', 'repost', 'comment', 'diamond', 'view'],
    },
    count: { control: 'number' },
    active: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PostEngagement>;

const StatefulPostEngagement = (
  props: React.ComponentProps<typeof PostEngagement>
) => {
  const [active, setActive] = useState(props.active || false);
  const [count, setCount] = useState(props.count);
  const [value, setValue] = useState(props.value);

  // Resets state when args change in Storybook controls
  useEffect(() => {
    setActive(props.active || false);
    setCount(props.count);
    setValue(props.value);
  }, [props.active, props.count, props.value]);

  const isToggleable = ['like', 'repost', 'comment', 'diamond'].includes(
    props.variant
  );

  const handleClick = () => {
    if (!isToggleable) return;

    const newActiveState = !active;
    setActive(newActiveState);

    let newCount: number = count;
    newCount = newActiveState ? newCount + 1 : newCount - 1;
    setCount(newCount);

    if (props.variant === 'diamond' && value) {
      const numericValue = parseFloat(value.replace(/[($)]/g, ''));
      const newValue = newActiveState ? numericValue + 0.01 : numericValue - 0.01;
      setValue(`($${newValue.toFixed(2)})`);
    }
  };

  return (
    <PostEngagement
      {...props}
      active={active}
      count={count}
      value={value}
      onClick={isToggleable ? handleClick : undefined}
    />
  );
};

export const Default: Story = {
  name: 'Default (Like)',
  render: (args) => <StatefulPostEngagement {...args} />,
  args: {
    variant: 'like',
    count: 11,
    active: false,
  },
};

export const Repost: Story = {
  name: 'Repost',
  render: (args) => <StatefulPostEngagement {...args} />,
  args: {
    variant: 'repost',
    count: 1,
    active: false,
  },
};

export const Comment: Story = {
  name: 'Comment',
  render: (args) => <StatefulPostEngagement {...args} />,
  args: {
    variant: 'comment',
    count: 1,
    active: false,
  },
};

export const Diamond: Story = {
  name: 'Diamond',
  render: (args) => <StatefulPostEngagement {...args} />,
  args: {
    variant: 'diamond',
    count: 1,
    active: false,
    value: '($0.12)',
  },
};

export const View: Story = {
  name: 'View',
  render: (args) => <StatefulPostEngagement {...args} />,
  args: {
    variant: 'view',
    count: 1,
  },
};

export const AllActions: Story = {
  name: 'Post Actions Bar',
  render: () => (
    <div className="flex w-[500px] items-center gap-x-6 rounded-lg bg-background p-4 border">
      <StatefulPostEngagement variant="comment" count={4} />
      <StatefulPostEngagement variant="repost" count={12} />
      <StatefulPostEngagement variant="like" count={43} active />
      <StatefulPostEngagement variant="diamond" count={5} value="($0.12)" />
      <div className="flex-grow" />
      <PostEngagement variant="view" count={1450} />
    </div>
  ),
}; 