'use client';

import React from 'react';
import {
  ActionMenu,
  ActionMenuItem,
} from './action-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Share2, Flag, Ban } from 'lucide-react';

const confirmationItems = [
  {
    title: 'Report User?',
    description:
      'This will report the user for review. Please confirm.',
    confirmText: 'Report',
    onConfirm: () => console.log('User reported'),
    icon: Flag,
  }, 
  {
    title: 'Block User?',
    description:
      "This will block the user. You won't see their posts or notifications. They won't be able to follow you or message you.",
    icon: Ban,
    variant: 'destructive',
    confirmText: 'Block',
    onConfirm: () => console.log('User blocked'),
  },
];

export const ProfileActions = () => {
  return (
    <ActionMenu
      trigger={
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
    >
      <ActionMenuItem icon={Share2}>Share profile</ActionMenuItem>
      {confirmationItems.map((item) => (
        <ActionMenuItem
          key={item.title}
          icon={item.icon}
          confirmation={{
            title: item.title,
            description: item.description,
            confirmText: item.confirmText,
            onConfirm: item.onConfirm,
            variant: item.variant as 'destructive' | 'default' | 'success' | undefined,
          }}
        >
          {item.title}
        </ActionMenuItem>
      ))}
    </ActionMenu>
  );
}; 