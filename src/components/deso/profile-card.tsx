import { ProfileCoverPhoto } from './profile-cover-photo';
import { ProfileDescription } from './profile-description';
import { UserInfo } from './user-info';
import { FollowButton } from './follow-button';
import { MessageButton } from './message-button';
import { ProfileStat } from './profile-stat';
import { ProfileActions } from './profile-actions';
import { cn } from '@/lib/utils';
import { ProfileTag } from './profile-tag';
import { Calendar, LinkIcon, MapPin } from 'lucide-react';

export interface ProfileCardProps {
  publicKey: string;
  variant?: 'default' | 'compact';
  showFeaturedImage?: boolean;
  showFollowButton?: boolean;
  showMessageButton?: boolean;  
  showActionMenu?: boolean;
  followButtonVariant?: 'default' | 'icon-only';
  messageButtonVariant?: 'default' | 'icon-only';
  className?: string;
  showDescription?: boolean;
  showTags?: boolean;
  showStats?: boolean;
}

export function ProfileCard({
  publicKey,
  variant = 'default',
  showFeaturedImage = true,
  showFollowButton = true,
  showMessageButton = true,
  showActionMenu = true,
  followButtonVariant = 'default',
  messageButtonVariant = 'default',
  showDescription = true,
  showTags = true,
  showStats = true,
  className,
}: ProfileCardProps) {

  const profileTagList: Record<string, { icon: React.ReactNode, text: string, link?: string }> = {
    location: {
      icon: <MapPin className="size-3" />,
      text: 'New York, NY',
    },
    website: {
      icon: <LinkIcon className="size-3" />,
      text: 'deso.com',
      link: 'https://deso.com',
    },
    joined: {
      icon: <Calendar className="size-3" />,
      text: 'Joined June 2024',
    },
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'w-full max-w-lg mx-auto bg-background rounded-lg shadow-lg overflow-hidden border',
          className
        )}
      >
        <div className={cn('p-4 flex flex-col gap-4', className)}>
          <div className="flex items-center justify-between gap-2">
            <UserInfo
              publicKey={publicKey}
              pictureSize="sm"
              isVerified={true}
              showVerification
              showPublicKey
              className="z-10"
            />
            <div className="flex items-center gap-2">
              {showActionMenu && <ProfileActions />}
              {showMessageButton && <MessageButton variant={messageButtonVariant} showTooltip />}
              {showFollowButton && <FollowButton variant={followButtonVariant} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full max-w-lg mx-auto bg-background rounded-lg shadow-lg overflow-hidden border',
        className
      )}
    >
      {showFeaturedImage && (
        <ProfileCoverPhoto
          publicKey={publicKey}
          aspectRatio="16:9"
          showOverlay
          overlayOpacity={0.3}
          className="rounded-b-none"
        />
      )}
      <div className={cn('p-6 flex flex-col gap-4')}>
        <div className="flex items-center justify-between gap-2">
          <UserInfo
            publicKey={publicKey}
            pictureSize="sm"
            showVerification
            isVerified={true}
            showPublicKey
            className="z-10"
          />
          <div className="flex items-center gap-2">
            {showActionMenu && <ProfileActions />}
            {showMessageButton && <MessageButton variant={messageButtonVariant} showTooltip />}
            {showFollowButton && <FollowButton variant={followButtonVariant} />}
          </div>
        </div>
        {showStats && ( 
        <div className="flex items-center gap-4">
          <ProfileStat variant="followers" count={32430} />
          <ProfileStat variant="following" count={2540} />
        </div>
        )}
        {showDescription && (
          <ProfileDescription
            publicKey={publicKey}
            lineClamp={4}
            showMoreText="Show more"
            showLessText="Show less"
          />
        )}
        {showTags && (
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(profileTagList).map(([key, value]) => (
              <ProfileTag icon={value.icon} key={key} link={value.link}>
                {value.text}
              </ProfileTag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 