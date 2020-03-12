import gql from 'graphql-tag';

const playSetupQuery = gql`
  query playSetupQuery {
    courses: allCourses(orderBy: "club_DESC, name_DESC") {
      id
      club
      name
      par
      _holesMeta {
        count
      }
    }
    players: allPlayers(orderBy: "firstName_DESC, lastName_DESC") {
      id
      photo
      firstName
      lastName
    }
  }
`;

export default playSetupQuery;
