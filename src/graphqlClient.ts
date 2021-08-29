import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuthWithAutoLogin } from './hooks/auth';
import { useMemo } from 'react';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API,
});

export const useAuthenticatedApolloClient = () => {
  const { authToken } = useAuthWithAutoLogin();

  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => ({
        headers: {
          ...headers,
          authorization: authToken ? `Bearer ${authToken}` : '',
        },
      })),
    [authToken]
  );

  return useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    [authLink]
  );
};
