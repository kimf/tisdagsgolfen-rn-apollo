import React from 'react';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import lastSeasonQuery from '../graphql/queries/lastSeasonQuery';
import { lastSeasonQuery_seasons as Season } from '../../generatedTypes';

import CurrentSeason from '../components/CurrentSeason';

const Home = ({ navigation }) => {
  const goToEvents = () => navigation.navigate('Events');
  const { loading, data } = useQuery<{ seasons: Season[] }>(lastSeasonQuery);

  if (loading) {
    return null;
  }

  const currentSeason = data.seasons[0];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <CurrentSeason season={currentSeason} />
      <Button title="Go to Events" onPress={goToEvents} />
    </View>
  );
};

export default Home;
