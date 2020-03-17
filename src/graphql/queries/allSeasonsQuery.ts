import { gql } from '@apollo/client';

const allSeasonsQuery = gql`
  query allSeasonsQuery {
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

export default allSeasonsQuery;
