import gql from 'graphql-tag';

const allSeasonsQuery = gql`
  query allSeasonsQuery {
    seasons(order_by: { name: asc }) {
      id
      name
      status
    }
  }
`;

export default allSeasonsQuery;
