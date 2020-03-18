import { gql } from '@apollo/client';

export default gql`
  mutation delEvent($id: Int!) {
    deleteManyScoringSession(where: { event: { id: { equals: $id } } }) {
      count
    }
    deleteOneEvent(where: { id: $id }) {
      __typename
    }
  }
`;
