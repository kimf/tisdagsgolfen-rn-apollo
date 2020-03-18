import { gql } from '@apollo/client';

export default gql`
  mutation teamScoringSession(
    $eventId: Int!
    $teams: TeamCreateManyWithoutScoringSessionInput
  ) {
    createOneScoringSession(
      data: {
        currentHole: 1
        event: { connect: { id: $eventId } }
        teams: $teams
      }
    ) {
      id
    }
  }
`;
