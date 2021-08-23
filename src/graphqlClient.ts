import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-ap-northeast-1.graphcms.com/v2/cksmy62k0109g01yuenvlba3g/master',
  cache: new InMemoryCache(),
});
