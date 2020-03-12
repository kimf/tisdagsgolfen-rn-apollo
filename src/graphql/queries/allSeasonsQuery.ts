import gql from 'graphql-tag';

const allSeasonsQuery = gql`
  query allSeasonsQuery {
    seasons: allSeasons(orderBy: "name_DESC") {
      id
      name
      status
      photo
    }
  }
`;

export default allSeasonsQuery;
