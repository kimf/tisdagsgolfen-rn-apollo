import { gql } from '@apollo/client';

export default gql`
  query coursesQuery {
    courses(orderBy: { name: desc }) {
      id
      club
      name
      par
      holes {
        id
      }
    }
  }
`;
