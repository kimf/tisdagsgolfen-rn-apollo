import { gql } from '@apollo/client';

export default gql`
  mutation createEvent(
    $courseId: Int!
    $seasonId: Int!
    $special: Boolean!
    $type: EventType!
    $scoring: EventScoring!
  ) {
    createOneEvent(
      data: {
        course: { connect: { id: $courseId } }
        season: { connect: { id: $seasonId } }
        special: $special
        type: $type
        scoring: $scoring
        status: STARTED
      }
    ) {
      id
      status
      course {
        id
      }
    }
  }
`;
