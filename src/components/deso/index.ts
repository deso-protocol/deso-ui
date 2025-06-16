// Atomic Components (Phase 2)
export { ProfilePicture } from './profile-picture';
export { UsernameDisplay } from './username-display';
export { VerificationBadge } from './verification-badge';
export { ProfileCoverPhoto } from './profile-cover-photo';
export { UserInfo } from './user-info';
export { UserPublicKey } from './user-public-key';
export { CopyButton } from './copy-button';
 
// Re-export types
export type { ProfilePictureProps, UsernameDisplayProps } from '@/lib/schemas/deso';
export type { UserInfoProps } from './user-info';
export type { UserPublicKeyProps } from './user-public-key';
export type { CopyButtonProps } from './copy-button'; 