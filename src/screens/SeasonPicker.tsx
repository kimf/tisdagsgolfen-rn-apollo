import React from 'react';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import allSeasonsQuery from '../graphql/queries/allSeasonsQuery';
import { allSeasonsQuery_seasons as Season } from '../../generatedTypes';

const Home = ({ navigation }) => {
  const goToSeason = (id: number) => navigation.navigate('Home', { id });
  const { loading, data } = useQuery<{ seasons: Season[] }>(allSeasonsQuery);

  if (loading) {
    return null;
  }

  // React.useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Seasons</Text>
      {data.seasons.map(season => (
        <Text key={season.id}>
          {season.name} - {season.status}
          <Button title="Go" onPress={() => goToSeason(season.id)} />
        </Text>
      ))}
    </View>
  );
};

export default Home;
