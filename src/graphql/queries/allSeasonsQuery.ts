import { gql } from '@apollo/client';

export default gql`
  query seasonsQuery {
    seasons(orderBy: { name: desc }) {
      id
      name
      status
      finalInfo {
        photo
      }
    }
  }
`;
