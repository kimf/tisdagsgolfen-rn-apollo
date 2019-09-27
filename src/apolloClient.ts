import ApolloClient, { InMemoryCache } from 'apollo-boost';

const dataIdFromObject = result => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }
  return null;
};

export default new ApolloClient({
  uri: 'http://10.2.7.47:3001/api/graphql',
  cache: new InMemoryCache({
    dataIdFromObject,
  }),
});
