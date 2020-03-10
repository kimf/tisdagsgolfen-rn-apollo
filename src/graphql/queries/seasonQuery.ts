import gql from 'graphql-tag';

const seasonQuery = gql`
  query seasonQuery($id: Int!) {
    season: Season(where: { id: $id }) {
      id
      name
      status
    }
  }
`;

export default seasonQuery;
