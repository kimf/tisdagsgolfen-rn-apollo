import gql from 'graphql-tag';

const seasonQuery = gql`
  query seasonQuery($id: ID!) {
    season: Season(where: { id: $id }) {
      id
      name
      status
      activeEvents: events(where: { status_not: FINISHED }, first: 1) {
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
