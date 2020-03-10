import gql from 'graphql-tag';

const activeEventsQuery = gql`
  query activeEventsQuery {
    events: allEvents(where: { status_not: FINISHED }, first: 1) {
      id
      status
    }
  }
`;

export default activeEventsQuery;
