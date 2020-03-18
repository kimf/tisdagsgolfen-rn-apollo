import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Kitten from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { useMutation } from '@apollo/client';
import { DraxView, DraxProvider } from 'react-native-drax';

import { useStore } from '../../store';
import { PlayParamList } from '../../Routes';

import Saving from '../../components/Saving';
import {
  teamScoringSessionVariables,
  teamScoringSession,
} from '../../../types/generatedTypes';
import createScoringSessionMutation from '../../graphql/mutations/createTeamScoringSessionMutation';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'PlayerSettings'>;
  route: RouteProp<PlayParamList, 'PlayerSettings'>;
};

interface TeamState {
  index: number;
  strokes: number;
  playerIds: number[];
}

const TeamSettings: React.FC<Props> = ({ navigation, route }) => {
  const [teams, setTeams] = React.useState<TeamState[]>(() => {
    const arr = [...Array(Math.round(route.params.players.length / 2))];
    return arr.map((_, index) => ({
      index,
      strokes: 10,
      playerIds: [],
    }));
  });

  const { setActiveScoringSessionId } = useStore();

  const players = route.params.players;

  const [createScoringSession, { loading: saving }] = useMutation<
    teamScoringSession,
    teamScoringSessionVariables
  >(createScoringSessionMutation, {
    variables: {
      eventId: route.params.event.id,
      teams: {
        create: teams.map(team => ({
          players: {
            connect: team.playerIds.map(id => ({ id })),
          },
        })),
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

  const setStrokesForTeam = (index: number, value: number) => {
    const newTeams = teams.map(team => {
      return {
        ...team,
        strokes: team.index === index ? value : team.strokes,
      };
    });
    setTeams(newTeams);
  };

  const addPlayerToTeam = (index: number, id: number) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTeams = teams.map(team => {
      return {
        ...team,
        playerIds:
          index !== team.index
            ? team.playerIds.filter(pid => pid !== id)
            : [...new Set([...team.playerIds, id])],
      };
    });
    setTeams(newTeams);
  };

  const renderPlayer = ({ item }) => (
    <DraxView
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      hoverDraggingStyle={styles.hoverDragging}
      dragPayload={item.id}
      style={{
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        marginBottom: 4,
        width: '50%',
      }}
      renderContent={() => (
        <React.Fragment>
          <Kitten.Avatar
            size="small"
            source={{
              uri: item.photo,
            }}
          />
          <Kitten.Text
            style={{
              padding: 4,
            }}>
            {`${item.firstName} ${item.lastName[0]}`}
          </Kitten.Text>
        </React.Fragment>
      )}></DraxView>
  );

  const playersInTeams = teams.map(t => t.playerIds).flat();
  const playersNotInTeams = players.filter(p => !playersInTeams.includes(p.id));

  const readyToMoveOn = playersNotInTeams.length !== 0;

  return (
    <React.Fragment>
      <Kitten.Layout
        style={{
          padding: 8,
          flex: 1,
        }}>
        <DraxProvider>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 16,
              minHeight: '40%',
            }}>
            {teams.map(team => (
              <DraxView
                key={team.index}
                receivingStyle={styles.receiving}
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  minHeight: '30%',
                  borderRightColor: '#ccc',
                  borderRightWidth: team.index !== teams.length - 1 ? 1 : 0,
                }}
                renderContent={({ viewState }) => {
                  return (
                    <React.Fragment>
                      <Kitten.Text
                        category="label"
                        style={{
                          marginVertical: 8,
                        }}>
                        Lag {`${team.index + 1}`}
                      </Kitten.Text>
                      <Kitten.Input
                        style={{
                          width: '100%',
                        }}
                        textStyle={{
                          fontSize: 18,
                          textAlign: 'center',
                        }}
                        value={`${team.strokes}`}
                        autoCompleteType="off"
                        keyboardType="number-pad"
                        label="Slag"
                        onChangeText={value =>
                          setStrokesForTeam(team.index, Number(value))
                        }
                      />
                      {team.playerIds.map(pid => {
                        const player = players.find(p => p.id === pid);
                        return (
                          <DraxView
                            draggingStyle={styles.dragging}
                            dragReleasedStyle={styles.dragging}
                            hoverDraggingStyle={styles.hoverDragging}
                            dragPayload={player.id}
                            style={{
                              flexDirection: 'row',
                              padding: 8,
                              backgroundColor: '#eee',
                              borderRadius: 4,
                              marginBottom: 4,
                            }}
                            renderContent={() => (
                              <React.Fragment>
                                <Kitten.Avatar
                                  size="small"
                                  source={{
                                    uri: player.photo,
                                  }}
                                />
                                <Kitten.Text
                                  style={{
                                    padding: 4,
                                  }}>
                                  {`${player.firstName} ${player.lastName[0]}`}
                                </Kitten.Text>
                              </React.Fragment>
                            )}></DraxView>
                        );
                      })}
                    </React.Fragment>
                  );
                }}
                onReceiveDragDrop={event => {
                  if (event.dragged.payload) {
                    addPlayerToTeam(team.index, event.dragged.payload);
                  }
                }}
              />
            ))}
          </View>
          <Kitten.Text
            category="c1"
            appearance="hint"
            style={{
              paddingVertical: 8,
            }}>
            Dra spelaren till det lag den ska spela i
          </Kitten.Text>
          <Kitten.List
            style={{
              flex: 1,
            }}
            data={playersNotInTeams}
            renderItem={renderPlayer}
          />
        </DraxProvider>
        <Kitten.Button
          onPress={saveScoringSession}
          style={{
            marginBottom: 24,
          }}
          disabled={readyToMoveOn}>
          GÅ VIDARE
        </Kitten.Button>
      </Kitten.Layout>
      {saving && <Saving />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    backgroundColor: '#feb',
  },
  receiving: {
    backgroundColor: '#eee',
  },
});

export default TeamSettings;
