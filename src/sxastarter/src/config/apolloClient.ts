import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import { getServerToken } from './auth';

// Create HTTP link for connecting to the GraphQL API
const createHttpLink = (): HttpLink =>
  new HttpLink({
    uri: process.env.AUTHORING_GRAPH_QL_ENDPOINT,
    fetch,
  });

// Create an authentication link with token retrieval
const createAuthLink = async (): Promise<ApolloLink> => {
  try {
    const token = await getServerToken();

    return setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  } catch (error) {
    console.error('Error creating auth link:', error);
    throw new Error('Failed to create authentication link');
  }
};

// Create and return an Apollo Client instance
export const createApolloClient = async (): Promise<ApolloClient<NormalizedCacheObject>> => {
  try {
    const httpLink = createHttpLink();
    const authLink = await createAuthLink();

    return new ApolloClient({
      link: ApolloLink.from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  } catch (error) {
    console.error('Error creating Apollo Client:', error);
    throw new Error('Failed to create Apollo Client');
  }
};
