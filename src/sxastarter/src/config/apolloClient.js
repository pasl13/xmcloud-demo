import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Function to fetch the token securely from the server-side API route
const getToken = async () => {
  try {
    const response = await fetch('/api/getToken', {
      method: 'POST',
    });
    const data = await response.json();

    if (response.ok) {
      return data.access_token;
    } else {
      throw new Error(data.error || 'Failed to fetch token');
    }
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

// Set up Apollo Client
const httpLink = new HttpLink({
  uri: 'https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/sitecore/api/authoring/graphql/v1',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
