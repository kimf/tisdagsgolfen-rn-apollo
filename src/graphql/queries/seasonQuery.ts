import gql from 'graphql-tag';

const seasonQuery = gql`
  query seasonQuery($id: Int!) {
    season: seasons_by_pk(id: $id) {
      id
      name
      status
    }
  }
`;

export default seasonQuery;
