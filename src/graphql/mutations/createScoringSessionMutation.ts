import { gql } from '@apollo/client';

export default gql`
  mutation scoringSession(
    $eventId: Int!
    $players: PlayerCreateManyWithoutScoringSessionInput
  ) {
    createOneScoringSession(
      data: {
        currentHole: 1
        event: { connect: { id: $eventId } }
        players: $players
      }
    ) {
      id
    }
  }
`;
