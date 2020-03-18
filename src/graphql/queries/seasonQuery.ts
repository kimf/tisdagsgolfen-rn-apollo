import { gql } from '@apollo/client';

export default gql`
  query seasonQuery($id: Int!) {
    season(where: { id: $id }) {
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
