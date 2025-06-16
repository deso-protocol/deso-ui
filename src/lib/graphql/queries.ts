import { gql } from '@apollo/client';

// Profile Picture Query
export const GET_PROFILE_PICTURE = gql`
  query GetProfilePicture($publicKey: String!) {
    accountByPublicKey(publicKey: $publicKey) {
      id
      publicKey
      profilePic
      username
      extraData
    }
  }
`;

// Username Display Query
export const GET_USERNAME_INFO = gql`
  query GetUsernameInfo($publicKey: String!) {
    accountByPublicKey(publicKey: $publicKey) {
      id
      publicKey
      username
      extraData
    }
  }
`;

// Profile Data Query (comprehensive)
export const GET_PROFILE_DATA = gql`
  query GetProfileData($publicKey: String!) {
    accountByPublicKey(publicKey: $publicKey) {
      id
      publicKey
      username
      description
      profilePic
      extraData
      coinPriceDesoNanos
    }
  }
`;

// Feed Posts Query
export const GET_FEED_POSTS = gql`
  query GetFeedPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after, orderBy: [TIMESTAMP_DESC]) {
      edges {
        node {
          id
          postHash
          body
          timestamp
          extraData
          poster {
            publicKey
            username
            profilePic
            extraData
          }
          likes(first: 1) {
            totalCount
          }
          diamonds(first: 1) {
            totalCount
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// User Posts Query
export const GET_USER_POSTS = gql`
  query GetUserPosts($publicKey: String!, $first: Int!, $after: String) {
    accountByPublicKey(publicKey: $publicKey) {
      posts(first: $first, after: $after, orderBy: [TIMESTAMP_DESC]) {
        edges {
          node {
            id
            postHash
            body
            timestamp
            extraData
            likes(first: 1) {
              totalCount
            }
            diamonds(first: 1) {
              totalCount
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Single Post Query
export const GET_POST_BY_HASH = gql`
  query GetPostByHash($postHash: String!) {
    postByPostHash(postHash: $postHash) {
      id
      postHash
      body
      timestamp
      extraData
      poster {
        publicKey
        username
        profilePic
        extraData
      }
      likes(first: 1) {
        totalCount
      }
      diamonds(first: 1) {
        totalCount
        nodes {
          diamondLevel
        }
      }
    }
  }
`;

// Profile Stats Query
export const GET_PROFILE_STATS = gql`
  query GetProfileStats($publicKey: String!) {
    accountByPublicKey(publicKey: $publicKey) {
      posts(first: 1) {
        totalCount
      }
      coinPriceDesoNanos
    }
  }
`;

// Username to Public Key Resolution
export const GET_ACCOUNT_BY_USERNAME = gql`
  query GetAccountByUsername($username: String!) {
    accountByUsername(username: $username) {
      id
      publicKey
      username
      description
      profilePic
      extraData
    }
  }
`; 