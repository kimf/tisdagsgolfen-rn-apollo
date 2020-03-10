import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';

const dataIdFromObject = result => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }
  return null;
};

// const typeDefs = gql`
//   extend type allSeasonsQuery_seasons {
//     winnerImage: String!
//   }
// `;

// const resolvers = {
//   allSeasonsQuery_seasons: {
//     winnerImage: () => 'https://placekitten.com/g/200/300',
//   },
// };

export default new ApolloClient({
  uri: 'http://localhost:3000/admin/api',
  cache: new InMemoryCache({
    dataIdFromObject,
  }),
  // typeDefs,
  // resolvers,
});
