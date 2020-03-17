import { ApolloClient, InMemoryCache } from '@apollo/client';

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
  uri: 'https://tisdagsgolfen-2020.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  // typeDefs,
  // resolvers,
});
