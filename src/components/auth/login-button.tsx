'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Loader2 } from 'lucide-react';
import { useIdentity } from '@/contexts/identity-context';
import { UserMenu } from '@/components/deso/user-menu';
import { getUserProfilesByPublicKeys } from '@/lib/deso/api';
import { buildProfilePictureUrl } from 'deso-protocol';
import { Profile } from '@/lib/schemas/deso';

// Convert DeSo profile data to Profile format expected by components
function convertDeSoProfileToProfile(publicKey: string, profile?: any): Profile {
  const graphqlProfilePic = profile?.profilePic;
  const generatedProfilePic = buildProfilePictureUrl(publicKey);
  const finalProfilePic = graphqlProfilePic || generatedProfilePic;

  return {
    publicKey,
    username: profile?.username || undefined, // Don't use truncated public key as fallback
    profilePic: finalProfilePic,
    description: profile?.description,
    isVerified: profile?.isVerified || false,
    extraData: profile?.extraData,
    coinPriceDesoNanos: profile?.coinPriceDesoNanos,
  };
}

export default function LoginButton() {
  const { 
    isLoggedIn, 
    currentUser, 
    alternateUsers, 
    isLoading, 
    isDerivedKeyAuthorizing,
    login, 
    logout, 
    setActiveUser,
  } = useIdentity();
  
  const [userProfiles, setUserProfiles] = useState<Record<string, any>>({});

  // Fetch user profiles when users change
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!currentUser) return;

      try {
        // Collect all public keys (current + alternates)
        const allPublicKeys = [
          currentUser.publicKey,
          ...alternateUsers.map(user => user.publicKey)
        ];

        const profiles = await getUserProfilesByPublicKeys(allPublicKeys);
        setUserProfiles(profiles);
      } catch (error) {
        console.error('Failed to fetch user profiles:', error);
      }
    };

    fetchProfiles();
  }, [currentUser, alternateUsers]);

  // Show loading state during authentication or derived key authorization
  if (isLoading || isDerivedKeyAuthorizing) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        {isDerivedKeyAuthorizing ? 'Authorizing...' : 'Loading...'}
      </Button>
    );
  }

  // Show login button when not authenticated
  if (!isLoggedIn || !currentUser) {
    return (
      <Button onClick={login} className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <UserMenu 
        currentUser={{
          publicKey: currentUser.publicKey,
          profile: userProfiles[currentUser.publicKey] ? convertDeSoProfileToProfile(currentUser.publicKey, userProfiles[currentUser.publicKey]) : undefined
        }}
        otherAccounts={alternateUsers.map(user => ({
          publicKey: user.publicKey,
          profile: userProfiles[user.publicKey] ? convertDeSoProfileToProfile(user.publicKey, userProfiles[user.publicKey]) : undefined
        }))}
        onAccountSwitch={setActiveUser}
        onLogout={logout}
        onAddAccount={login}
      />
    </div>
  );
} 