import { gql } from '@apollo/client';

export default gql`
  query playersQuery {
    players(orderBy: { firstName: desc }) {
      id
      photo
      firstName
      lastName
    }
  }
`;
