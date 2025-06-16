import type { Meta, StoryObj } from '@storybook/react';
import { PostReactions, Reaction } from './post-reactions';
import { useState } from 'react';

const meta: Meta<typeof PostReactions> = {
  title: 'DeSo/PostReactions',
  component: PostReactions,
};

export default meta;

type Story = StoryObj<typeof PostReactions>;

const sampleReactions: Reaction[] = [
  { emoji: '👍', count: 12, userHasReacted: true },
  { emoji: '🔥', count: 5, userHasReacted: false },
  { emoji: '🤯', count: 2, userHasReacted: false },
];

const StatefulPostReactions = () => {
  const [reactions, setReactions] = useState<Reaction[]>(sampleReactions);

  const handleReactionClick = (emoji: string) => {
    setReactions((prevReactions) => {
      const reactionIndex = prevReactions.findIndex((r) => r.emoji === emoji);

      if (reactionIndex > -1) {
        // Reaction exists, update it
        const newReactions = [...prevReactions];
        const reaction = newReactions[reactionIndex];
        const userHasReacted = !reaction.userHasReacted;
        const count = userHasReacted ? reaction.count + 1 : reaction.count - 1;

        if (count > 0) {
          newReactions[reactionIndex] = { ...reaction, count, userHasReacted };
        } else {
          newReactions.splice(reactionIndex, 1);
        }
        return newReactions;
      } else {
        // Reaction does not exist, add it
        return [...prevReactions, { emoji, count: 1, userHasReacted: true }];
      }
    });
  };

  return (
    <PostReactions
      reactions={reactions}
      onReactionClick={handleReactionClick}
    />
  );
};

export const Default: Story = {
  render: () => <StatefulPostReactions />,
}; 