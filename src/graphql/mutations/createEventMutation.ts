import { gql } from '@apollo/client';

const createEventMutation = gql`
  mutation createEventMutation(
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

export default createEventMutation;
