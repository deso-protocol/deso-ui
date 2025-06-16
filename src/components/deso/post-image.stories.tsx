import type { Meta, StoryObj } from '@storybook/react';
import { PostImage } from './post-image';
import React, { useState } from 'react';

const meta: Meta<typeof PostImage> = {
  title: 'DeSo/PostImage',
  component: PostImage,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bento', 'carousel'],
    },
    onImageClick: { action: 'onImageClick' },
  },
};

export default meta;

type Story = StoryObj<typeof PostImage>;

const oneImage = ['https://placehold.co/1200x800/dbd8e3/352f44'];
const twoImages = [
  ...oneImage,
  'https://placehold.co/1200x800/a39ba8/352f44',
];
const threeImages = [
  ...twoImages,
  'https://placehold.co/1200x800/625772/352f44',
];
const fourImages = [
  ...threeImages,
  'https://placehold.co/1200x800/352f44/dbd8e3',
];
const fiveImages = [
  ...fourImages,
  'https://placehold.co/1200x800/b9b7bd/352f44',
];

export const Default: Story = {
  name: 'Default (1 Image)',
  args: {
    images: oneImage,
  },
};

export const Bento2: Story = {
  name: 'Bento (2 Images)',
  args: {
    images: twoImages,
  },
};

export const Bento3: Story = {
  name: 'Bento (3 Images)',
  args: {
    images: threeImages,
  },
};

export const Bento4: Story = {
  name: 'Bento (4 Images)',
  args: {
    images: fourImages,
  },
};

export const Carousel: Story = {
  name: 'Carousel (5+ Images)',
  args: {
    images: fiveImages,
  },
};

const StatefulPostImageWithModal = (
  props: React.ComponentProps<typeof PostImage>
) => {
  const [likes, setLikes] = useState({ count: 11, active: false });
  const [reposts, setReposts] = useState({ count: 2, active: false });
  const [diamonds, setDiamonds] = useState({
    count: 2,
    value: '($0.02)',
    active: false,
  });

  const handleLike = () =>
    setLikes((prev) => ({
      ...prev,
      active: !prev.active,
      count: !prev.active ? prev.count + 1 : prev.count - 1,
    }));
  const handleRepost = () =>
    setReposts((prev) => ({
      ...prev,
      active: !prev.active,
      count: !prev.active ? prev.count + 1 : prev.count - 1,
    }));
  const handleDiamond = () => {
    setDiamonds((prev) => {
      const newActive = !prev.active;
      const numericValue = parseFloat(prev.value.replace(/[($)]/g, ''));
      const newValue = newActive ? numericValue + 0.01 : numericValue - 0.01;
      return {
        active: newActive,
        count: newActive ? prev.count + 1 : prev.count - 1,
        value: `($${newValue.toFixed(2)})`,
      };
    });
  };

  const actions = {
    likes,
    reposts,
    diamonds,
    comments: { count: 1 },
    onLike: handleLike,
    onRepost: handleRepost,
    onDiamond: handleDiamond,
    onComment: () => alert('Comment clicked!'),
  };

  return <PostImage {...props} withModal withModalActions={actions} />;
};

export const WithModal: Story = {
  name: 'With Modal',
  render: (args) => <StatefulPostImageWithModal {...args} />,
  args: {
    images: fiveImages,
  },
}; 