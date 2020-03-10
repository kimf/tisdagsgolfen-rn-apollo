import gql from 'graphql-tag';

const allSeasonsQuery = gql`
  query allSeasonsQuery {
    seasons: allSeasons(orderBy: "name") {
      id
      name
      status
    }
  }
`;

export default allSeasonsQuery;
