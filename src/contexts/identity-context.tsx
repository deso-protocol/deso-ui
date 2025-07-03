'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { identity, configure } from 'deso-protocol';
import { DESO_IDENTITY_CONFIG, PERMISSIONS } from '@/lib/constants';
import type { IdentityState } from 'deso-protocol';
import { toast } from 'sonner';

interface IdentityContextType {
  // Authentication state
  isLoggedIn: boolean;
  currentUser: any | null;
  alternateUsers: any[];
  isLoading: boolean;
  error: string | null;
  isDerivedKeyAuthorizing: boolean;

  // Authentication actions
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setActiveUser: (publicKey: string) => Promise<void>;

  // Permission management
  hasPermissions: (permissions?: any) => Promise<boolean>;
  requestPermissions: (permissions?: any) => Promise<void>;

  // Identity state
  identityState: IdentityState | null;
}

const IdentityContext = createContext<IdentityContextType | null>(null);

export function IdentityProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [alternateUsers, setAlternateUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [identityState, setIdentityState] = useState<IdentityState | null>(
    null
  );
  const [isDerivedKeyAuthorizing, setIsDerivedKeyAuthorizing] =
    useState(false);

  // Initialize DeSo Identity
  useEffect(() => {
    const initializeIdentity = async () => {
      try {
        // Configure the DeSo Identity service with permissions for news app
        configure({
          identityURI: DESO_IDENTITY_CONFIG.identityURI,
          nodeURI: DESO_IDENTITY_CONFIG.nodeURI,
          network: DESO_IDENTITY_CONFIG.network,
          appName: DESO_IDENTITY_CONFIG.appName,
          spendingLimitOptions: PERMISSIONS.DISCUSS_NEWS, // Use simplified permissions
          showSkip: DESO_IDENTITY_CONFIG.showSkip,
        });

        // Subscribe to identity state changes
        identity.subscribe((state) => {
          // Handle derived key authorization events
          if (state.event === 'AUTHORIZE_DERIVED_KEY_START') {
            setIsDerivedKeyAuthorizing(true);
            setIsLoading(true);
            return;
          }

          if (state.event === 'AUTHORIZE_DERIVED_KEY_END') {
            setIsDerivedKeyAuthorizing(false);
            setIsLoading(false);
          }

          if (state.event === 'AUTHORIZE_DERIVED_KEY_FAIL') {
            setIsDerivedKeyAuthorizing(false);
            setIsLoading(false);
            setError(
              'Failed to authorize derived key. Please try logging in again.'
            );
            return;
          }

          // Update state
          setIdentityState(state);
          setCurrentUser(state.currentUser);
          setAlternateUsers(
            Array.isArray(state.alternateUsers)
              ? state.alternateUsers
              : Object.values(state.alternateUsers || {})
          );
          setIsLoggedIn(!!state.currentUser);

          // Reconfigure spending limits when user changes (only for valid users)
          if (
            state.currentUser?.publicKey &&
            state.currentUser?.primaryDerivedKey?.IsValid
          ) {
            configure({
              identityURI: DESO_IDENTITY_CONFIG.identityURI,
              nodeURI: DESO_IDENTITY_CONFIG.nodeURI,
              network: DESO_IDENTITY_CONFIG.network,
              appName: DESO_IDENTITY_CONFIG.appName,
              spendingLimitOptions: PERMISSIONS.DISCUSS_NEWS,
              showSkip: DESO_IDENTITY_CONFIG.showSkip,
            });
          }
        });

        // Get initial state
        const initialState = await identity.snapshot();
        setIdentityState(initialState);
        setCurrentUser(initialState.currentUser);
        setAlternateUsers(
          Array.isArray(initialState.alternateUsers)
            ? initialState.alternateUsers
            : Object.values(initialState.alternateUsers || {})
        );
        setIsLoggedIn(!!initialState.currentUser);
      } catch (err) {
        console.error('Failed to initialize identity:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to initialize identity'
        );
      } finally {
        setIsLoading(false);
      }
    };

    initializeIdentity();
  }, []);

  // Login function
  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔐 Starting login process...');

      await identity.login({
        getFreeDeso: true,
        derivedKeyLogin: true,
      });

      console.log('✅ Login process completed');
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await identity.logout();
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Switch active user function
  const setActiveUser = useCallback(async (publicKey: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Switching to user:', publicKey);

      await identity.setActiveUser(publicKey);

      toast.success('Account switched successfully!');
      
      console.log('✅ User switch successful');
    } catch (err) {
      console.error('❌ User switch failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to switch user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check permissions
  const hasPermissions = useCallback(
    async (permissions = PERMISSIONS.DISCUSS_NEWS) => {
      try {
        return await identity.hasPermissions(permissions);
      } catch (err) {
        console.error('Permission check failed:', err);
        return false;
      }
    },
    []
  );

  // Request permissions
  const requestPermissions = useCallback(
    async (permissions = PERMISSIONS.DISCUSS_NEWS) => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('🔐 Requesting permissions:', permissions);

        await identity.requestPermissions(permissions);
        console.log('✅ Permissions granted successfully');
      } catch (err) {
        console.error('❌ Permission request failed:', err);

        if (
          err instanceof Error &&
          err.message.includes('Identity window was closed')
        ) {
          console.log('User cancelled permission request');
          setError(null);
        } else {
          setError(
            err instanceof Error ? err.message : 'Permission request failed'
          );
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const contextValue: IdentityContextType = {
    isLoggedIn,
    currentUser,
    alternateUsers,
    isLoading,
    error,
    isDerivedKeyAuthorizing,
    login,
    logout,
    setActiveUser,
    hasPermissions,
    requestPermissions,
    identityState,
  };

  return (
    <IdentityContext.Provider value={contextValue}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useIdentity(): IdentityContextType {
  const context = useContext(IdentityContext);
  if (!context) {
    throw new Error('useIdentity must be used within an IdentityProvider');
  }
  return context;
}

export function useIsLoggedIn(): boolean {
  return useIdentity().isLoggedIn;
}

export function useCurrentUser() {
  return useIdentity().currentUser;
}

export function useIdentityState() {
  return useIdentity().identityState;
} 