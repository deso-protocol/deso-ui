import { useMutation } from '@tanstack/react-query';
import { useIdentity } from '@/contexts/identity-context';
import { submitPost } from 'deso-protocol';
import { createPostAssociation } from '@/lib/deso/api';
import { NEWS_ASSOCIATION_APP_PUBLIC_KEY } from '@/lib/constants';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useCreateDiscussionPost = () => {
  const { currentUser } = useIdentity();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { postText: string; newsUrl: string }) => {
      if (!currentUser) {
        throw new Error('You must be logged in to post.');
      }

      // Step 1: Submit the post
      const postResponse: any = await submitPost({
        UpdaterPublicKeyBase58Check: currentUser.publicKey,
        BodyObj: {
          Body: data.postText,
          ImageURLs: [],
          VideoURLs: [],
        },
        PostExtraData: {
          NewsUrl: data.newsUrl,
        },
      });

      console.log('Post creation response:', JSON.stringify(postResponse, null, 2));

      const postHashHex =
        postResponse.submittedTransactionResponse?.PostEntryResponse?.PostHashHex;

      if (!postHashHex) {
        throw new Error(
          'Failed to create post. The response did not include a post hash.'
        );
      }

      // Step 2: Create the post association
      const associationResponse = await createPostAssociation({
        TransactorPublicKeyBase58Check: currentUser.publicKey,
        PostHashHex: postHashHex,
        AppPublicKeyBase58Check: NEWS_ASSOCIATION_APP_PUBLIC_KEY,
        AssociationType: 'NEWS_ITEM',
        AssociationValue: data.newsUrl,
        ExtraData: {},
        MinFeeRateNanosPerKB: 1000,
        TransactionFees: [],
      });

      return { postResponse, associationResponse };
    },
    onSuccess: (data) => {
      toast.success('Post submitted successfully!');
      console.log('Successfully created post and association', data);
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(
        error.message || 'An unexpected error occurred during post creation.'
      );
      console.error(error);
    },
  });
}; 