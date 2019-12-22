import gql from 'graphql-tag';

const lastSeasonQuery = gql`
  query lastSeasonQuery {
    seasons(order_by: { name: asc }, limit: 1) {
      id
      name
      status
    }
  }
`;

export default lastSeasonQuery;
