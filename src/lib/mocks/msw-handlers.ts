import { graphql, HttpResponse, delay } from 'msw';
import {
  mockProfiles,
  defaultProfile,
  GRAPHQL_OPERATIONS,
  searchUsers,
} from './deso-data';

// STRONGLY RECOMMENDED: Use live data for all default stories. Only use these mock handlers for explicit loading, error, or fallback stories. See HOW_TO_ADD_STORIES.md for best practices.

/**
 * A utility to create a GraphQL handler for a specific profile-related query.
 * This can be used if a story needs to override a specific query.
 */
const createProfileQueryHandler = (operationName: string, data: any) => {
  return graphql.query(operationName, () => {
    return HttpResponse.json({ data });
  });
};

/**
 * Default success handlers that use a regex to catch all common profile queries.
 * This simplifies story setup as most components just need a successful profile response.
 */
export const successHandlers = [
  graphql.query(/GetProfile/, () => {
    return HttpResponse.json({
      data: defaultProfile,
    });
  }),
];

/**
 * Handlers for simulating a generic error state.
 */
export const errorHandlers = [
  graphql.query(/GetProfile/, async () => {
    await delay(800);
    return HttpResponse.json({
      errors: [{ message: 'Failed to fetch profile data' }],
    });
  }),
];

/**
 * Handlers for simulating a loading state.
 * It will eventually resolve with data after a delay.
 */
export const loadingHandlers = [
  graphql.query(/GetProfile/, async () => {
    await delay(3000); // Simulate a long network request
    return HttpResponse.json({
      data: defaultProfile,
    });
  }),
];

/**
 * A specific handler for testing a profile that does not have a cover photo.
 */
export const noCoverHandlers = [
  graphql.query(/GetProfile/, () => {
    return HttpResponse.json({
      data: {
        accountByPublicKey: {
          ...defaultProfile.accountByPublicKey,
          extraData: {
            ...defaultProfile.accountByPublicKey.extraData,
            FeaturedImageURL: '', // Ensure cover photo is empty
          },
        },
      },
    });
  }),
];

export const handlers = [
  ...successHandlers,
  ...errorHandlers,
  ...loadingHandlers,
  ...noCoverHandlers,
  graphql.query('SearchUsers', ({ variables }) => {
    const searchTerm =
      variables.filter?.or?.[0]?.username?.startsWithInsensitive;

    if (!searchTerm) {
      return HttpResponse.json({
        data: {
          profiles: {
            nodes: [],
          },
        },
      });
    }

    const users = Object.values(searchUsers).filter((user) =>
      user.username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return HttpResponse.json({
      data: {
        profiles: {
          nodes: users,
        },
      },
    });
  }),
]; 