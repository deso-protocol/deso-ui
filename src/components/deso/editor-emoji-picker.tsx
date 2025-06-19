'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { EmojiStyle, Theme } from 'emoji-picker-react';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

export interface EditorEmojiPickerProps {
  onEmojiClick: (emoji: string) => void;
  theme?: Theme;
}

export function EditorEmojiPicker({
  onEmojiClick,
  theme = Theme.AUTO,
}: EditorEmojiPickerProps) {
  return (
    <Picker
      onEmojiClick={(emojiData) => onEmojiClick(emojiData.emoji)}
      autoFocusSearch={false}
      emojiStyle={EmojiStyle.NATIVE}
      theme={theme}
    />
  );
} 