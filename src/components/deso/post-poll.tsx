'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import NumberFlow, { continuous } from '@number-flow/react'; // Import NumberFlow

export interface PollOption {
  text: string;
}

export interface PostPollProps {
  options: PollOption[];
  votes: number[];
  totalVotes: number;
  userVotedIndex: number | null;
  onVote: (index: number) => void;
}

export const PostPoll: React.FC<PostPollProps> = ({
  options,
  votes,
  totalVotes,
  userVotedIndex,
  onVote,
}) => {
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(
    Array(options.length).fill(0)
  );

  useEffect(() => {
    if (userVotedIndex !== null) {
      const newPercentages = options.map((_, index) =>
        totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0
      );
      // A timeout to ensure the transition is applied after the component has rendered.
      const timer = setTimeout(() => {
        setAnimatedPercentages(newPercentages);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [userVotedIndex, options, votes, totalVotes]);

  const handleVote = (index: number) => {
    if (userVotedIndex === null) {
      onVote(index);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      {options.map((option, index) => {
        if (userVotedIndex !== null) {
          // Voted state
          const percentage =
            totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0;
          const isUserChoice = userVotedIndex === index;

          return (
            <div
              key={index}
              className="relative flex items-center justify-between overflow-hidden rounded-lg border bg-background p-3 text-foreground"
            >
              <div
                className="absolute left-0 top-0 h-full bg-muted transition-all duration-700 ease-out"
                style={{ width: `${animatedPercentages[index] || 0}%` }}
              />
              <div className="relative z-10 flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{option.text}</span>
                  {isUserChoice && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <span className="font-semibold">
                  <NumberFlow value={Math.round(animatedPercentages[index])} plugins={[continuous]} />
                  %
                </span>
              </div>
            </div>
          );
        } else {
          // Not voted state
          return (
            <button
              key={index}
              onClick={() => handleVote(index)}
              className="w-full rounded-lg cursor-pointer border p-3 text-left text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={userVotedIndex !== null}
            >
              {option.text}
            </button>
          );
        }
      })}
      <div className="pt-2 text-sm text-muted-foreground">
        {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
      </div>
    </div>
  );
};