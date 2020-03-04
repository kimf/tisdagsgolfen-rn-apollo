import gql from 'graphql-tag';

const activeEventsQuery = gql`
  query activeEventsQuery {
    events(where: { status: { _neq: FINISHED } }) {
      id
      status
    }
  }
`;

export default activeEventsQuery;
