import * as React from 'react';
import * as Kitten from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { useMutation } from '@apollo/client';

import { PlayParamList } from '../../Routes';
import {
  playersQuery_players,
  scoringSessionVariables,
  scoringSession,
} from '../../../types/generatedTypes';

import createScoringSessionMutation from '../../graphql/mutations/createScoringSessionMutation';
import { useStore } from '../../store';
import Saving from '../../components/Saving';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'PlayerSettings'>;
  route: RouteProp<PlayParamList, 'PlayerSettings'>;
};

interface PlayingPlayer extends playersQuery_players {
  strokes: number;
}

const PlayerSettings: React.FC<Props> = ({ navigation, route }) => {
  const [players, setPlayers] = React.useState<PlayingPlayer[]>(() =>
    route.params.players.map(player => ({ ...player, strokes: 10 })),
  );

  const { setActiveScoringSessionId } = useStore();

  const setStrokesForPlayer = (id: number, value: string) => {
    const newPlayers = players.map(player => ({
      ...player,
      strokes: player.id === id ? Number(value) : player.strokes,
    }));
    setPlayers(newPlayers);
  };

  const [createScoringSession, { loading: saving }] = useMutation<
    scoringSession,
    scoringSessionVariables
  >(createScoringSessionMutation, {
    variables: {
      eventId: route.params.event.id,
      players: {
        connect: players.map(player => ({ id: player.id })),
      },
    },
    onCompleted({ createOneScoringSession }) {
      setActiveScoringSessionId(`${createOneScoringSession.id}`);
      // navigation.replace('PlayerPicker', {});
    },
  });

  const saveScoringSession = async () => {
    await createScoringSession();
  };

  const renderPlayer = ({ item }) => {
    const avatar = () => (
      <React.Fragment>
        <Kitten.Avatar source={{ uri: item.photo }} />
      </React.Fragment>
    );

    const input = () => (
      <Kitten.Input
        style={{ width: 100 }}
        textStyle={{ fontSize: 18, textAlign: 'center' }}
        value={`${item.strokes}`}
        autoCompleteType="off"
        keyboardType="number-pad"
        onChangeText={value => setStrokesForPlayer(item.id, value)}
        clearTextOnFocus
      />
    );

    return (
      <Kitten.ListItem
        key={item.id}
        title={`${item.firstName} ${item.lastName}`}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
        accessory={input}
        icon={avatar}
      />
    );
  };

  return (
    <React.Fragment>
      <Kitten.Layout style={{ padding: 8, flex: 1 }}>
        <Kitten.List
          style={{ flex: 1 }}
          data={players}
          renderItem={renderPlayer}
        />
        <Kitten.Button
          onPress={saveScoringSession}
          style={{ marginBottom: 24 }}>
          GÅ VIDARE
        </Kitten.Button>
      </Kitten.Layout>
      {saving && <Saving />}
    </React.Fragment>
  );
};

export default PlayerSettings;
