import gql from 'graphql-tag';

const playSetupQuery = gql`
  query playSetupQuery {
    activeEvents: allEvents(where: { status_not: FINISHED }, first: 1) {
      id
      status
    }
    courses: allCourses(orderBy: "club_DESC, name_DESC") {
      id
      club
      name
      par
      _holesMeta {
        count
      }
    }
  }
`;

export default playSetupQuery;
