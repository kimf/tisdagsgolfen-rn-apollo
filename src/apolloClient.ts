import ApolloClient, { InMemoryCache } from 'apollo-boost';

const dataIdFromObject = result => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }
  return null;
};

export default new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache({
    dataIdFromObject,
  }),
});
