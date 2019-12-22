import React from 'react';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import seasonQuery from '../graphql/queries/seasonQuery';
import {
  seasonQuery as seasonQueryType,
  seasonQueryVariables,
} from '../../generatedTypes';

import CurrentSeason from '../components/CurrentSeason';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootParamList } from '../App';
import storage from '../localStorage';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Home'>;
  route: RouteProp<RootParamList, 'Home'>;
};

const Home: React.FC<Props> = ({ navigation, route }) => {
  const goToEvents = () => navigation.navigate('Events');
  const { loading, data } = useQuery<seasonQueryType, seasonQueryVariables>(
    seasonQuery,
    {
      variables: { id: Number(route.params.seasonId) },
    },
  );

  React.useEffect(() => {
    storage.set('currentSeasonId', route.params.seasonId);
  }, [route.params.seasonId]);

  if (loading) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <CurrentSeason season={data.season} />
      <Button title="Go to Events" onPress={goToEvents} />
    </View>
  );
};

export default Home;
