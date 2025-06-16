import React from 'react';
import { ProfileCard } from './profile-card';
import { cn } from '@/lib/utils';
import { ProfileCardProps } from './profile-card';

export interface ProfileListProps {
  profiles: ProfileCardProps[];
  variant?: 'cards' | 'seamless';
  profileVariant?: 'default' | 'compact';
  gap?: number;
  className?: string;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  variant = 'cards',
  profileVariant = 'default',
  gap = 16,
  className,
}) => {
  if (variant === 'seamless') {
    return (
      <div
        className={cn(
          'w-full mx-auto border',
          className
        )}
      >
        {profiles.map((profile, index) => (
          <ProfileCard
            key={`${profile.publicKey}-${index}`}
            variant={profileVariant}
            {...profile}
            className={cn(
              'border-x-0 border-t-0 shadow-none rounded-none max-w-full last:border-b-0',
            )}
          />
        ))}
      </div>
    );
  }

  // Default to 'cards' variant
  return (
    <div className={cn('flex flex-col', className)} style={{ gap: `${gap}px` }}>
      {profiles.map((profile, index) => (
        <ProfileCard
          key={`${profile.publicKey}-${index}`}
          variant={profileVariant}
          {...profile}
        />
      ))}
    </div>
  );
}; 