import gql from 'graphql-tag';

const createEventMutation = gql`
  mutation createEventMutation(
    $courseId: ID!
    $seasonId: ID!
    $special: Boolean!
    $type: EventTypeType!
    $scoring: EventScoringType!
  ) {
    createEvent(
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
    }
  }
`;

export default createEventMutation;
