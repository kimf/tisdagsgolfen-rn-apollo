import { gql } from '@apollo/client';

const allPlayersQuery = gql`
  query allPlayersQuery {
    players: players(orderBy: { firstName: desc}) {
      id
      photo
      firstName
      lastName
    }
  }
`;
export default allPlayersQuery;
