import gql from 'graphql-tag';

const allPlayersQuery = gql`
  query allPlayersQuery {
    players: allPlayers(orderBy: "firstName_DESC, lastName_DESC") {
      id
      firstName
      lastName
      photo
    }
  }
`;

export default allPlayersQuery;
