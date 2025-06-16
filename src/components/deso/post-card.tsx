import { ProfilePicture } from './profile-picture';
import { UsernameDisplay } from './username-display';
import { UserPublicKey } from './user-public-key';
import {
  ActionMenu,
  ActionMenuItem,
  ActionMenuSeparator,
} from './action-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, UserPlus, Ban, Flag, Repeat, Pin, ExternalLink, ChevronUp, ChevronDown, AtSign, MessageSquare, Gem } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useUsername } from '@/hooks/useProfile';
import { PostEngagement } from './post-engagement';
import { useState } from 'react';
import { Timestamp } from './timestamp';
import { PostImage, PostImageActions } from './post-image';
import { PostEmbed } from './post-embed';
import { PostVideo } from './post-video';
import { PostAudio } from './post-audio';
import { PostReactions, Reaction } from './post-reactions';
import { PostShare } from './post-share';
import { PostPoll, PollOption } from './post-poll';
import { PostText } from './post-text';

export interface PostEngagementProps {
  comments: number;
  likes: number;
  reposts: number;
  diamonds: number;
  diamondValue: string;
  quotes: number;
  views: number;
  audioUrl?: string;
  status?: PostStatusProps;
  notification?: PostNotificationProps;
  videoUrl?: string;
  reactions?: Reaction[];
}

export interface PostStatusProps {
  type: 'repost' | 'pinned';
  reposterPublicKey?: string;
}

export interface NFTCardProps {
  publicKey: string;
  price: string;
  lastSale: string;
  lastUpdated: string | Date;
  royaltyFee: string;
  ownerPublicKey: string;
}

export interface PostNotificationProps {
  type: string;
  publicKey: string;
  username: string;
  timestamp: string | Date;
}

export interface PostQuoteProps {
  publicKey: string;
  postContent: string;
  timestamp: string | Date;
  images?: string[];
  embedUrl?: string;
  quotedPost?: PostQuoteProps;
  status?: PostStatusProps;
  videoUrl?: string;
  audioUrl?: string;
  reactions?: Reaction[];
}

export interface PostPollInfo {
  options: PollOption[];
  votes: number[];
  totalVotes: number;
  userVotedIndex: number | null;
}

export interface PostCardProps {
  publicKey: string;
  postContent: string;
  className?: string;
  actions?: PostEngagementProps;
  timestamp: string | Date;
  images?: string[];
  embedUrl?: string;
  quotedPost?: PostQuoteProps;
  status?: PostStatusProps;
  videoUrl?: string;
  audioUrl?: string;
  reactions?: Reaction[];
  comments?: PostCardProps[];
  postUrl?: string;
  poll?: PostPollInfo;
  layout?: 'default' | 'featured-media';
  nft?: NFTCardProps;
  notification?: PostNotificationProps;
  postBodyVariant?: 'simple' | 'rich';
  lineClamp?: number;
}

const RepostedBy = ({ publicKey }: { publicKey: string }) => {
  return (
    <div className="flex items-center gap-1">
      <span>Reposted by</span>
      <UsernameDisplay publicKey={publicKey} linkToProfile />
    </div>
  );
};


const PostNotification = ({ type, publicKey, username, timestamp }: PostNotificationProps) => {
  const notificationText = {
    mention: {
      text: `mentioned you on a post`,
      icon: <AtSign />,
    },
    repost: {
      text: `reposted your post`,
      icon: <Repeat />,
    },
    comment: {
      text: `commented on your post`,
      icon: <MessageSquare />,
    },
    diamond: {
      text: `gave you a diamond`,
      icon: <Gem />,
    },
    follow: {
      text: `followed you`,
      icon: <UserPlus />,
    },
  };
  const notificationClass = "flex items-center gap-1 text-sm text-muted-foreground border-b pb-2 -mx-4 px-4 -mt-2"
  const notificationViewLink = <Link href={`/post/${publicKey}`} className="text-sm text-muted-foreground ml-auto relative -top- self-end">View Post</Link>;
  
  return (
    <div className={notificationClass}>
      <div className="flex items-center gap-1 size-3 text-muted-foreground">
        {notificationText[type as keyof typeof notificationText].icon}
      </div>
      <ProfilePicture publicKey={publicKey} size="xxs" />
      <div className="flex items-center gap-1">
        <UsernameDisplay publicKey={publicKey} linkToProfile variant="social" truncate maxLength={10} />
        {notificationText[type as keyof typeof notificationText].text}
      </div>
      {notificationViewLink}
    </div>
  );
};


const PostStatus = ({ type, reposterPublicKey }: PostStatusProps) => {
  if (type === 'pinned') {
    return (
      <div className="ml-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Pin className="h-4 w-4" />
        <span>Pinned Post</span>
      </div>
    );
  }

  if (type === 'repost' && reposterPublicKey) {
    return (
      <div className="ml-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Repeat className="h-4 w-4" />
        <RepostedBy publicKey={reposterPublicKey} />
      </div>
    );
  }

  return null;
};
const NFTActions = ({ price, royaltyFee, lastSale, className, showDetails, lastUpdated, ownerPublicKey }: NFTCardProps & { className?: string, showDetails?: boolean, lastUpdated?: string, ownerPublicKey?: string }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(showDetails || false);

  return (
    <div className={cn("w-full bg-accent p-2 rounded-lg", className)}>
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium">{price}</h3>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Last Sale: {lastSale}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">                    
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsDetailsVisible(!isDetailsVisible)}
            className="flex items-center gap-2"
          >
            {isDetailsVisible ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show Details
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2"> 
            <ExternalLink className="h-4 w-4" />
            View NFT
          </Button>
          <Button variant="default" size="sm">
            Place Offer
          </Button>
        </div>
      </div>
      {isDetailsVisible && (
        <div className="flex flex-col divide-y justify-between w-full mt-2 border p-sm rounded-md bg-background">
          <NFTDetails type="Owner" value={<UsernameDisplay variant="social" publicKey={ownerPublicKey} linkToProfile />}/>
          <NFTDetails type="Last Updated" value={<Timestamp timestamp={lastUpdated} />}/>
          <NFTDetails type="Last Sale" value={lastSale} />
          <NFTDetails type="Royalty Fee" value={royaltyFee} />
          <NFTDetails type="Price" value={price} />
        </div>
      )}
    </div>
  );
};

const NFTDetails = ({ type, value, className }: { type: string, value: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("text-xs text-muted-foreground w-full flex justify-between p-2", className)}>
      <span>{type}</span>
      <span>{value}</span>
    </div>
  );
};


const PostCardHeader = ({
  publicKey,
  username,
  timestamp,
}: {
  publicKey: string;
  username?: string;
  timestamp: string | Date;
}) => (
  <div className="flex justify-between items-start">
    <div className="flex flex-col">
      <UsernameDisplay publicKey={publicKey} showVerification linkToProfile />
      <div className="flex items-center gap-1 text-muted-foreground">
        <UserPublicKey publicKey={publicKey} truncate />
        <span className="text-xs">·</span>
        <Timestamp timestamp={timestamp} className="text-sm text-muted-foreground" />
      </div>
    </div>
    <ActionMenu
      trigger={
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </Button>
      }
    >
      <ActionMenuItem icon={UserPlus}>
        Follow <UsernameDisplay publicKey={publicKey} linkToProfile variant="social" truncate maxLength={10} />
      </ActionMenuItem>
      <ActionMenuItem icon={Flag}>Report post</ActionMenuItem>
      <ActionMenuItem
        icon={Ban}
        confirmation={{
          title: 'Block User?',
          description:
            "This will block the user. You won't see their posts or notifications. They won't be able to follow you or message you.",
          variant: 'destructive',
          confirmText: 'Block',
          onConfirm: () => console.log('User blocked'),
        }}
      >
        Block <UsernameDisplay publicKey={publicKey} linkToProfile variant="social" truncate maxLength={10} />
      </ActionMenuItem>
    </ActionMenu>
  </div>
);

const PostCardBody = ({
  postContent,
  embedUrl,
  images,
  modalActions,
  quotedPost,
  videoUrl,
  audioUrl,
  reactions,
  poll,
  onPollVote,
  hideMedia,
  postBodyVariant,
  lineClamp,
}: {
  postContent: string;
  embedUrl?: string;
  images?: string[];
  modalActions: PostImageActions;
  quotedPost?: PostQuoteProps;
  videoUrl?: string;
  audioUrl?: string;
  reactions?: Reaction[];
  poll?: PostPollInfo;
  onPollVote: (index: number) => void;
  hideMedia?: boolean;
  postBodyVariant?: 'simple' | 'rich';
  lineClamp?: number;
}) => (
  <>
    <div className="mt-2 text-foreground">
      <PostText text={postContent} variant={postBodyVariant} lineClamp={lineClamp} showMoreText="Show more" showLessText="Show less" />
    </div>
    {!hideMedia && audioUrl && <PostAudio url={audioUrl} className="mt-4" />}
    {!hideMedia && videoUrl && <PostVideo url={videoUrl} className="mt-4" />}
    {embedUrl && <PostEmbed url={embedUrl} className="mt-4" />}
    {!hideMedia && images && images.length > 0 && (
      <PostImage images={images} withModal withModalActions={modalActions} className="mt-4" />
    )}
    {poll && (
      <PostPoll
        options={poll.options}
        votes={poll.votes}
        totalVotes={poll.totalVotes}
        userVotedIndex={poll.userVotedIndex}
        onVote={onPollVote}
      />
    )}
    {quotedPost && <PostQuote {...quotedPost} />}
    {reactions && reactions.length > 0 && (
      <PostReactions
        reactions={reactions}
        onReactionClick={(emoji) => {
          // Handle reaction click
        }}
      />
    )}
  </>
);

const PostCardFooter = ({
  actions,
  like,
  repost,
  diamond,
  toggleLike,
  toggleRepost,
  giveDiamond,
  postUrl,
  postContent,
}: {
  actions: PostEngagementProps;
  like: { active: boolean; count: number };
  repost: { active: boolean; count: number };
  diamond: { active: boolean; count: number; value: string };
  toggleLike: () => void;
  toggleRepost: () => void;
  giveDiamond: () => void;
  postUrl?: string;
  postContent: string;
}) => (
  <div className="mt-4 flex w-full items-center gap-x-4 text-muted-foreground">
    <PostEngagement
      variant="comment"
      count={actions.comments}
      onClick={() => alert('Comment!')}
      size="sm"
    />
    <PostEngagement
      variant="repost"
      count={repost.count}
      active={repost.active}
      onClick={toggleRepost}
      size="sm"
    />
    <PostEngagement
      variant="like"
      count={like.count}
      active={like.active}
      onClick={toggleLike}
      size="sm"
    />
    <PostEngagement
      variant="diamond"
      count={diamond.count}
      value={diamond.value}
      active={diamond.active}
      onClick={giveDiamond}
      size="sm"
    />
    <div className="flex-grow" />
    <PostEngagement variant="view" count={actions.views} size="sm" />
    {postUrl && <PostShare url={postUrl} text={postContent} className="p-0 h-auto hover:bg-transparent w-auto" />}
  </div>
);

const PostQuote = (props: PostQuoteProps) => {
  const { publicKey, postContent, timestamp, images, embedUrl, reactions } =
    props;
  const { data: userData } = useUsername(publicKey);
  const username = userData?.accountByPublicKey?.username;

  const dummyModalActions: PostImageActions = {
    likes: { count: 0, active: false },
    reposts: { count: 0, active: false },
    diamonds: { count: 0, value: '', active: false },
    comments: { count: 0 },
    onLike: () => {},
    onRepost: () => {},
    onDiamond: () => {},
    onComment: () => {},
  };

  return (
    <div className="border rounded-lg mt-4 p-6">
      <div className="flex gap-3">
        <div>
          <ProfilePicture publicKey={publicKey} size="sm" />
        </div>
        <div className="flex-grow flex flex-col">
          <PostCardHeader
            publicKey={publicKey}
            username={username}
            timestamp={timestamp}
          />
          <div className="my-2 text-foreground">
            <PostText text={postContent} variant="rich" lineClamp={10} showMoreText="Show more" showLessText="Show less" />
          </div>
          {embedUrl && <PostEmbed url={embedUrl} />}
          {images && images.length > 0 && (
            <PostImage
              images={images}
              withModal
              withModalActions={dummyModalActions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface PostCardContentProps extends PostCardProps {
  hideMedia?: boolean;
}

const PostCardContent = (props: PostCardContentProps) => {
  const {
    publicKey,
    postContent,
    actions = {
      comments: 0,
      likes: 0,
      reposts: 0,
      diamonds: 0,
      diamondValue: '($0.00)',
      quotes: 0,
      views: 0,
    },
    timestamp,
    images,
    embedUrl,
    quotedPost,
    videoUrl,
    audioUrl,
    reactions: initialReactions,
    postUrl,
    poll: initialPoll,
    hideMedia,
    postBodyVariant,
    lineClamp,
  } = props;
  const { data: userData } = useUsername(publicKey);
  const username = userData?.accountByPublicKey?.username;

  const [like, setLike] = useState({ active: false, count: actions.likes });
  const [repost, setRepost] = useState({
    active: false,
    count: actions.reposts,
  });
  const [diamond, setDiamond] = useState({
    active: false,
    count: actions.diamonds,
    value: actions.diamondValue,
  });
  const [reactions, setReactions] = useState(initialReactions || []);
  const [poll, setPoll] = useState(initialPoll);

  const handlePollVote = (index: number) => {
    if (poll) {
      const newVotes = [...poll.votes];
      newVotes[index]++;
      setPoll({
        ...poll,
        votes: newVotes,
        totalVotes: poll.totalVotes + 1,
        userVotedIndex: index,
      });
    }
  };

  const toggleLike = () => {
    setLike((prev) => ({
      active: !prev.active,
      count: !prev.active ? prev.count + 1 : prev.count - 1,
    }));
  };

  const toggleRepost = () => {
    setRepost((prev) => ({
      active: !prev.active,
      count: !prev.active ? prev.count + 1 : prev.count - 1,
    }));
  };

  const giveDiamond = () => {
    setDiamond((prev) => {
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

  const handleReactionClick = (emoji: string) => {
    setReactions((prevReactions) => {
      const reactionIndex = prevReactions.findIndex((r) => r.emoji === emoji);

      if (reactionIndex > -1) {
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
        return [...prevReactions, { emoji, count: 1, userHasReacted: true }];
      }
    });
  };

  const modalActions: PostImageActions = {
    likes: like,
    reposts: repost,
    diamonds: diamond,
    comments: { count: actions.comments },
    onLike: toggleLike,
    onRepost: toggleRepost,
    onDiamond: giveDiamond,
    onComment: () => alert('Comment!'),
  };

  return (
    <div className="flex-grow flex flex-col">
      <PostCardHeader
        publicKey={publicKey}
        username={username}
        timestamp={timestamp}
      />
      <PostCardBody
        postContent={postContent}
        embedUrl={embedUrl}
        images={images}
        modalActions={modalActions}
        quotedPost={quotedPost}
        videoUrl={videoUrl}
        audioUrl={audioUrl}
        poll={poll}
        onPollVote={handlePollVote}
        hideMedia={hideMedia}
        postBodyVariant={postBodyVariant}
        lineClamp={lineClamp}
      />
      <PostReactions
        reactions={reactions}
        onReactionClick={handleReactionClick}
      />
      <PostCardFooter
        actions={actions}
        like={like}
        repost={repost}
        diamond={diamond}
        toggleLike={toggleLike}
        toggleRepost={toggleRepost}
        giveDiamond={giveDiamond}
        postUrl={postUrl}
        postContent={postContent}
      />
    </div>
  );
};

export function PostCard(props: PostCardProps) {
  const {
    className,
    status,
    comments,
    layout = 'default',
    videoUrl,
    audioUrl,
    images,
    nft,
    notification,
  } = props;

  // Threaded View
  if (comments && comments.length > 0) {
    const allPosts = [props, ...comments];
    return (
      <div className="w-full max-w-2xl mx-auto">
        {status && <PostStatus {...status} />}
        <div
          className={cn(
            'w-full bg-background rounded-xl shadow-sm p-6 border',
            className
          )}
        >
          {allPosts.map((post, index) => {
            const isLast = index === allPosts.length - 1;
            return (
              <div
                key={`${post.publicKey}-${index}`}
                className={cn('flex gap-4', index > 0 && 'pt-4')}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <ProfilePicture publicKey={post.publicKey} size="md" />
                  {!isLast && (
                    <div className="w-0.5 grow relative bg-muted mt-2 before:content-[''] before:w-0.5 before:h-5 before:bg-muted before:absolute before:-bottom-[10px]" />
                  )}
                </div>
                <div className="flex-1">
                  <PostCardContent {...post} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Featured Media Layout
  if (layout === 'featured-media') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div
          className={cn(
            'w-full bg-background rounded-xl shadow-sm border overflow-hidden',
            className
          )}
        >
          {videoUrl && <PostVideo url={videoUrl} className="mt-0 border-none rounded-b-none" />}
          {audioUrl && !videoUrl && <PostAudio url={audioUrl} className="mt-0 border-none rounded-b-none" />}
          {images && images.length > 0 && !videoUrl && !audioUrl && (
            <PostImage images={images} withModal className="mt-0 border-none rounded-b-none" />
          )}
          <div className="p-6">
            {status && (
              <div className="mb-4">
                <PostStatus {...status} />
              </div>
            )}
            <div className="flex-grow flex gap-4">
              <div className="flex-shrink-0">
                <ProfilePicture publicKey={props.publicKey} size="md" />
              </div>
              <PostCardContent {...props} hideMedia />
            </div>
          </div>
          {nft && (
            <div>
              <NFTActions publicKey={props.publicKey} price={nft.price} lastSale={nft.lastSale} royaltyFee={nft.royaltyFee} lastUpdated={nft.lastUpdated.toString()} className="rounded-t-none" ownerPublicKey={nft.ownerPublicKey} />
            </div>
          )}
        </div>       
      </div>
    );
  }

  // Default Single Post View
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={cn(
          'w-full bg-background rounded-xl shadow-sm p-6 border',
          className,
          status && 'flex-col'
        )}
      >
        {notification && (
          <div className="flex-1 mb-4">
            <PostNotification {...notification} />
          </div>
        )}
        {status && (
          <div className="flex-1 mb-4">
            <PostStatus {...status} />
          </div>
        )}
        <div className="flex-grow flex gap-4">
          <div className="flex-shrink-0">
            <ProfilePicture publicKey={props.publicKey} size="md" />
          </div>
          <PostCardContent {...props} />
        </div>
        {nft && (
          <div className="mt-4">
            <NFTActions publicKey={props.publicKey} price={nft.price} lastSale={nft.lastSale} royaltyFee={nft.royaltyFee} lastUpdated={nft.lastUpdated.toString()} ownerPublicKey={nft.ownerPublicKey} />
          </div>
        )}
      </div>      
    </div>
  );
} 