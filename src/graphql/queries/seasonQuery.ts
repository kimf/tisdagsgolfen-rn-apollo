import { gql } from '@apollo/client';

const seasonQuery = gql`
  query seasonQuery($id: Int!) {
    season: season(where: { id: $id }) {
      id
      name
      status
      events {
        id
        status
        special
        type
        scoring
        course {
          id
          club
          name
        }
      }
    }
  }
`;

export default seasonQuery;
