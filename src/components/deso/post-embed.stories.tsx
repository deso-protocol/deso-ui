import type { Meta, StoryObj } from '@storybook/react';
import { PostEmbed } from './post-embed';

const meta: Meta<typeof PostEmbed> = {
  title: 'DeSo/PostEmbed',
  component: PostEmbed,
  argTypes: {
    url: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PostEmbed>;

export const YouTube: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  },
};

export const Twitter: Story = {
  args: {
    url: 'https://x.com/desoprotocol/status/1933587613434458243',
  },
};

export const Spotify: Story = {
  args: {
    url: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp',
  },
};

export const SoundCloud: Story = {
  args: {
    url: 'https://soundcloud.com/yungkaai/blue?in=trending-music-us/sets/folk',
  },
};

export const Website: Story = {
  args: {
    url: 'https://www.deso.org/',
  },
}; 