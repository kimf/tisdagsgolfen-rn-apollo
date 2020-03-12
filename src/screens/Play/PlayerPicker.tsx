import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, List, ListItem, Button } from '@ui-kitten/components';

import { PlayParamList } from '../../Routes';
import allPlayersQuery from '../../graphql/queries/allPlayersQuery';
import { allPlayersQuery as allPlayersQueryType } from '../../../generatedTypes';

type Props = {
  navigation: StackNavigationProp<PlayParamList, 'SelectPlayers'>;
};

const PlayerPicker: React.FC<Props> = ({ navigation }) => {
  const { loading, data } = useQuery<allPlayersQueryType>(allPlayersQuery);

  if (loading) {
    return null;
  }

  const renderPlayer = ({ item }) => (
    <ListItem
      title={`${item.firstName} ${item.lastName}`}
      onPress={() => console.log(item)}
    />
  );

  return (
    <Layout style={{ padding: 8, flex: 1 }}>
      <List data={data.players} renderItem={renderPlayer} />
      <Button onPress={() => null} style={{ marginBottom: 24 }} disabled>
        SÄTT SLAG
      </Button>
    </Layout>
  );
};

export default PlayerPicker;
