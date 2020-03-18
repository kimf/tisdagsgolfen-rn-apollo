import * as React from 'react';
import { View } from 'react-native';
import * as Kitten from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';

import { PlaySetupParamList } from '../../Routes';
import allPlayersQuery from '../../graphql/queries/allPlayersQuery';
import { playersQuery, EventType } from '../../../types/generatedTypes';
// import EventHeader from '../../components/Play/EventHeader';

type Props = {
  navigation: StackNavigationProp<PlaySetupParamList, 'PlayerPicker'>;
  route: RouteProp<PlaySetupParamList, 'PlayerPicker'>;
};

const PlayerPicker: React.FC<Props> = ({ navigation, route }) => {
  const { loading, data } = useQuery<playersQuery>(allPlayersQuery);
  const [playerIds, setPlayerIds] = React.useState<number[]>([]);

  if (loading) {
    return null;
  }

  const event = route.params.event;
  const isTeamEvent = event.type === EventType.TEAM;

  const goToSetup = () => {
    navigation.navigate(isTeamEvent ? 'TeamSettings' : 'PlayerSettings', {
      event,
      players: data.players.filter(p => playerIds.includes(p.id)),
    });
  };

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
        {item.photo ? (
          <Kitten.Avatar size="small" source={{ uri: item.photo }} />
        ) : (
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 34,
              backgroundColor: '#ccc',
              marginLeft: -2,
            }}
          />
        )}
      </React.Fragment>
    );

    const toggle = () => togglePlayer(item.id);

    const isSelected = playerIds.includes(item.id);

    return (
      <Kitten.ListItem
        key={item.id}
        title={`${item.firstName} ${item.lastName}`}
        onPress={toggle}
        activeOpacity={0.75}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          backgroundColor: isSelected ? 'rgba(0,200,100,0.1)' : null,
        }}
        icon={avatar}
      />
    );
  };

  return (
    <React.Fragment>
      <Kitten.Layout style={{ padding: 8, flex: 1 }}>
        {/* <EventHeader event={event} /> */}
        <Kitten.List
          style={{ flex: 1, marginBottom: 20 }}
          data={data.players}
          renderItem={renderPlayer}
        />
        <Kitten.Button
          onPress={goToSetup}
          style={{ marginBottom: 24 }}
          disabled={playerIds.length === 0}>
          {isTeamEvent ? `SÄTT LAG & SLAG` : `SÄTT SLAG`}
        </Kitten.Button>
      </Kitten.Layout>
    </React.Fragment>
  );
};

export default PlayerPicker;
