import * as React from 'react';
import * as Kitten from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { DraxProvider, DraxView } from 'react-native-drax';

import { PlayParamList } from '../../Routes';
import allPlayersQuery from '../../graphql/queries/allPlayersQuery';
import {
  allPlayersQuery as allPlayersQueryType,
  EventType,
} from '../../../types/generatedTypes';
import { View, LayoutAnimation, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/core';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'PlayerPicker'>;
  route: RouteProp<PlayParamList, 'PlayerPicker'>;
};

const PlayerPicker: React.FC<Props> = ({ navigation, route }) => {
  const { loading, data } = useQuery<allPlayersQueryType>(allPlayersQuery);
  const [playerIds, setPlayerIds] = React.useState<number[]>([]);
  const [playerStrokes, setPlayerStrokes] = React.useState<{
    [key: string]: number;
  }>({});
  const [showingSetup, setShowingSetup] = React.useState(false);
  const [teamStrokes, setTeamStrokes] = React.useState<number[]>([]);
  const [teams, setTeams] = React.useState<
    {
      index: number;
      playerIds: number[];
    }[]
  >();

  const event = route.params.event;
  const isTeamEvent = event.type === EventType.TEAM;

  if (loading) {
    return null;
  }

  const togglePlayer = (id: number) => {
    if (playerIds.includes(id)) {
      setPlayerIds(playerIds.filter(pid => pid !== id));
    } else {
      setPlayerIds([...playerIds, id]);
    }
  };

  const renderPlayer = ({ item }) => {
    const avatar = () => (
      <React.Fragment>
        <Kitten.Avatar source={{ uri: item.photo }} />
      </React.Fragment>
    );

    const toggle = () => (showingSetup ? null : togglePlayer(item.id));

    const setStrokesForPlayer = (value: string) => {
      setPlayerStrokes({
        ...playerStrokes,
        [item.id]: value,
      });
    };

    const input = () => (
      <Kitten.Input
        style={{ width: 80 }}
        textStyle={{ fontSize: 18, textAlign: 'center' }}
        value={playerStrokes[item.id]?.toString() || ''}
        status={playerStrokes[item.id] ? 'basic' : 'danger'}
        autoCompleteType="off"
        autoFocus={item.id === playerIds[0]}
        keyboardType="number-pad"
        onChangeText={value => setStrokesForPlayer(value)}
        clearTextOnFocus
      />
    );

    return (
      <DraxView
        key={item.id}
        dragPayload={item.id}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        draggable={isTeamEvent && showingSetup}
        renderContent={({ viewState }) => (
          <Kitten.ListItem
            title={`${item.firstName} ${item.lastName}`}
            onPress={toggle}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              backgroundColor: playerIds.includes(item.id)
                ? 'rgba(0,200,100,0.1)'
                : null,
            }}
            accessory={showingSetup && !isTeamEvent ? input : null}
            icon={avatar}
          />
        )}
      />
    );
  };

  const toggleSetup = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isTeamEvent) {
      const arr = [...Array(Math.round(playerIds.length / 2))];
      const teams = arr.map((_, index) => ({
        index,
        playerIds: [],
      }));
      setTeams(teams);
    }
    setShowingSetup(!showingSetup);
  };

  const players = showingSetup
    ? data.players.filter(p => playerIds.includes(p.id))
    : data.players;

  const setStrokesForTeam = (index: number, value: number) => {
    const newTeamStrokes = [...teamStrokes];
    newTeamStrokes[index] = value;
    setTeamStrokes(newTeamStrokes);
  };
  const addPlayerToTeam = (index: number, id: number) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTeams = teams.map(team => {
      if (index !== team.index) {
        return {
          index: team.index,
          playerIds: team.playerIds.filter(pid => pid !== id),
        };
      }
      if (index === team.index) {
        const newids = new Set([...team.playerIds, id]);
        return { index: team.index, playerIds: [...newids] };
      }
      return team;
    });
    setTeams(newTeams);
  };

  const playerInTeams = teams ? teams.map(t => t.playerIds).flat() : [];

  return (
    <Kitten.Layout style={{ padding: 8, flex: 1 }}>
      <View
        style={{ padding: 16, flexDirection: 'row', backgroundColor: '#feb' }}>
        <View>
          <Kitten.Text category="label">
            {event.course.club} / {event.course.name}
          </Kitten.Text>
          <Kitten.Text category="c1">
            {event.special && 'Special / '}
            {!isTeamEvent ? 'Individuell' : 'Lag'}
            {' / '}
            {event.scoring === 'POINTS' ? 'Poäng' : 'Slag'}
          </Kitten.Text>
        </View>
      </View>
      {isTeamEvent && showingSetup && (
        <Kitten.Text
          category="c1"
          appearance="hint"
          style={{ paddingVertical: 8 }}>
          Dra spelaren till det lag den ska spela i
        </Kitten.Text>
      )}
      <DraxProvider>
        <Kitten.List
          style={{ flex: 1 }}
          data={players.filter(p => !playerInTeams.includes(p.id))}
          renderItem={renderPlayer}
        />
        {isTeamEvent && showingSetup && (
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
                      <Kitten.Text category="label">
                        Lag {`${team.index + 1}`}
                      </Kitten.Text>
                      <Kitten.Input
                        style={{ width: '100%' }}
                        textStyle={{ fontSize: 18, textAlign: 'center' }}
                        value={teamStrokes[team.index]?.toString() || ''}
                        status={teamStrokes[team.index] ? 'basic' : 'danger'}
                        autoCompleteType="off"
                        keyboardType="number-pad"
                        onChangeText={value =>
                          setStrokesForTeam(team.index, Number(value))
                        }
                        clearTextOnFocus
                      />
                      {team.playerIds.map(pid => {
                        const player = data.players.find(p => p.id === pid);
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
                                  source={{ uri: player.photo }}
                                />
                                <Kitten.Text style={{ padding: 4 }}>
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
        )}
      </DraxProvider>
      <Kitten.Button
        onPress={toggleSetup}
        style={{ marginBottom: 24 }}
        disabled={playerIds.length === 0}>
        SÄTT SLAG
      </Kitten.Button>
    </Kitten.Layout>
  );
};

const styles = StyleSheet.create({
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    backgroundColor: '#feb',
  },
  receiving: {
    backgroundColor: '#eee',
  },
});

export default PlayerPicker;
