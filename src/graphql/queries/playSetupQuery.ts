import { gql } from '@apollo/client';

const playSetupQuery = gql`
  query playSetupQuery {
    courses: courses(orderBy: {name: desc}) {
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

export default playSetupQuery;
