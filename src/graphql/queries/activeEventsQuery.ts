import gql from 'graphql-tag';

const activeEventsQuery = gql`
  query activeEventsQuery {
    activeEvents: allEvents(where: { status_not: FINISHED }, first: 1) {
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
`;

export default activeEventsQuery;
