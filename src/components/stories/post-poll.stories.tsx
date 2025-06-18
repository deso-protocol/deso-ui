import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PostPoll as PostPollComponent, PostPollProps, PollOption } from '../deso/post-poll';

const meta: Meta<typeof PostPoll> = {
  title: 'DeSo/PostPoll',
  component: PostPollComponent,
  
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: {
      control: 'object',
    },
    votes: {
      control: 'object',
    },
    totalVotes: {
      control: 'number',
    },
    userVotedIndex: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostPoll>;

const pollOptions: PollOption[] = [
  { text: 'Dreams ✨' },
  { text: 'Music 🎶' },
  { text: 'Flowers 🌺' },
  { text: 'Something else 🌿' },
];

const PostPoll: React.FC<PostPollProps> = (args) => {
  const [votes, setVotes] = useState(args.votes);
  const [totalVotes, setTotalVotes] = useState(args.totalVotes);
  const [userVotedIndex, setUserVotedIndex] = useState<number | null>(
    args.userVotedIndex
  );

  const handleVote = (index: number) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
    setTotalVotes(totalVotes + 1);
    setUserVotedIndex(index);
  };

  return (
    <div className="w-lg">
      <PostPollComponent
        {...args}
        votes={votes}
        totalVotes={totalVotes}
        userVotedIndex={userVotedIndex}
        onVote={handleVote}
      />
    </div>
  );
};

export const NotVoted: Story = {
  args: {
    options: pollOptions,
    votes: [10, 20, 30, 5],
    totalVotes: 65,
    userVotedIndex: null,
  },
  render: (args) => <PostPoll {...args} />,
};

export const Voted: Story = {
  args: {
    options: pollOptions,
    votes: [1, 1, 1, 2],
    totalVotes: 5,
    userVotedIndex: 3,
  },
  render: (args) => <PostPoll {...args} />,
}; 