'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { PostEngagement } from './post-engagement';
import { Button } from '../ui/button';

export interface PostImageActions {
  likes: { count: number; active: boolean };
  reposts: { count: number; active: boolean };
  diamonds: { count: number; value: string; active: boolean };
  comments: { count: number };
  views?: { count: number };
  onLike: () => void;
  onRepost: () => void;
  onDiamond: () => void;
  onComment: () => void;
}

export interface PostImageProps {
  images: string[];
  variant?: 'default' | 'carousel' | 'bento';
  className?: string;
  onImageClick?: (index: number) => void;
  withModal?: boolean;
  withModalActions?: PostImageActions;
}

export function PostImage({
  images,
  variant,
  className,
  onImageClick,
  withModal = true,
  withModalActions,
}: PostImageProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    onImageClick?.(index);
    if (withModal) {
      setSelectedIndex(index);
      setModalOpen(true);
    }
  };

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const imageCount = images.length;

  let determinedVariant = variant;
  if (!variant) {
    if (imageCount === 1) {
      determinedVariant = 'default';
    } else if (imageCount <= 4) {
      determinedVariant = 'bento';
    } else {
      determinedVariant = 'carousel';
    }
  }

  const ImageComponent = ({
    src,
    index,
    className: imgClassName,
  }: {
    src: string;
    index: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={`Post image ${index + 1}`}
      className={cn(
        'w-full h-full object-cover',
        withModal && 'cursor-pointer',
        imgClassName
      )}
      onClick={() => handleImageClick(index)}
    />
  );

  const modalContent = (
    <DialogContent data-no-default-close className="[&>button:last-child]:hidden bg-black/70 rounded-none backdrop-blur-sm !max-w-none !w-screen !h-screen border-0 p-0 inset-0 translate-x-0 translate-y-0">
      <DialogHeader>
        <DialogTitle className="sr-only">Image Modal</DialogTitle>
        <DialogDescription className="sr-only">
          Image modal with carousel and actions
        </DialogDescription>
      </DialogHeader>
      <div className="relative w-full h-full">       
        <Carousel
          setApi={setApi}
          opts={{ startIndex: selectedIndex, loop: true }}
          className="w-full h-full relative"
        >
          <CarouselContent className="h-full relative">           
            {images.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <div
                  className="w-full h-full flex items-center justify-center p-8"
                  onClick={() => setModalOpen(false)}
                >
                  <img
                    src={src}
                    alt={`Post image ${index + 1}`}
                    className="max-w-full max-h-full object-contain border border-black"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        {withModalActions && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-x-6 bg-black/50 text-white p-2 px-4 rounded-full border border-white/20">
            <PostEngagement
              variant="comment"
              count={withModalActions.comments.count}
              onClick={withModalActions.onComment}
              className="hover:text-white"
            />
            <PostEngagement
              variant="repost"
              count={withModalActions.reposts.count}
              active={withModalActions.reposts.active}
              onClick={withModalActions.onRepost}
              className="hover:text-white"
            />
            <PostEngagement
              variant="like"
              count={withModalActions.likes.count}
              active={withModalActions.likes.active}
              onClick={withModalActions.onLike}
              className="hover:text-white"
            />
            <PostEngagement
              variant="diamond"
              count={withModalActions.diamonds.count}
              value={withModalActions.diamonds.value}
              active={withModalActions.diamonds.active}
              onClick={withModalActions.onDiamond}
              className="hover:text-white"
            />
          </div>
        )}
      </div>
      <DialogClose asChild>
        <Button type="button" variant="secondary" size="icon" className="absolute top-4 right-4 text-lg bg-white/10 text-white hover:text-black cursor-pointer">
          &times;
        </Button>
      </DialogClose>
    </DialogContent>
  );

  const renderContent = () => {
    if (determinedVariant === 'default') {
      return (
        <div
          className={cn(
            'mt-2 rounded-lg overflow-hidden border max-h-[512px]',
            className
          )}
        >
          <ImageComponent src={images[0]} index={0} />
        </div>
      );
    }

    if (determinedVariant === 'bento' && imageCount > 1 && imageCount <= 4) {
      const gridClasses = {
        2: 'grid grid-cols-2 gap-0.5',
        3: 'grid grid-cols-2 grid-rows-2 gap-0.5',
        4: 'grid grid-cols-2 grid-rows-2 gap-0.5',
      };

      return (
        <div
          className={cn(
            'mt-2 rounded-lg overflow-hidden border aspect-video max-h-[512px]',
            className
          )}
        >
          <div className={cn('h-full', gridClasses[imageCount as 2 | 3 | 4])}>
            {imageCount === 2 && (
              <>
                <ImageComponent src={images[0]} index={0} />
                <ImageComponent src={images[1]} index={1} />
              </>
            )}
            {imageCount === 3 && (
              <>
                <div className="col-span-1 row-span-2">
                  <ImageComponent src={images[0]} index={0} />
                </div>
                <ImageComponent src={images[1]} index={1} />
                <ImageComponent src={images[2]} index={2} />
              </>
            )}
            {imageCount === 4 && (
              <>
                <ImageComponent src={images[0]} index={0} />
                <ImageComponent src={images[1]} index={1} />
                <ImageComponent src={images[2]} index={2} />
                <ImageComponent src={images[3]} index={3} />
              </>
            )}
          </div>
        </div>
      );
    }

    if (determinedVariant === 'carousel') {
      return (
        <div className={cn('mt-2 relative', className)}>
          <Carousel
            setApi={setApi}
            className="w-full relative"
          >
            {imageCount > 1 && (
              <div className="absolute top-4 right-4 z-10 rounded-full bg-black/20 px-2 py-1 text-xs text-white">
                {current + 1} / {imageCount}
              </div>
            )}
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="rounded-lg overflow-hidden border aspect-video">
                    <ImageComponent src={src} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  'w-2 h-2 rounded-full bg-background/50 transition-colors',
                  current === index ? 'bg-background' : 'hover:bg-background/75'
                )}
              />
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  if (withModal) {
    return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        {renderContent()}
        {modalContent}
      </Dialog>
    );
  }

  return renderContent();
} 