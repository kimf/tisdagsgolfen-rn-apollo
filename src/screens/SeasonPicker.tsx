import React from 'react';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';

import allSeasonsQuery from '../graphql/queries/allSeasonsQuery';
import { allSeasonsQuery_seasons as Season } from '../../generatedTypes';
import { RootParamList } from '../App';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Seasons'>;
};

const SeasonPicker: React.FC<Props> = ({ navigation }) => {
  const goToSeason = (seasonId: string) =>
    navigation.navigate('Home', { seasonId });
  const { loading, data } = useQuery<{ seasons: Season[] }>(allSeasonsQuery);

  if (loading) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Seasons</Text>
      {data.seasons.map(season => (
        <Text key={season.id}>
          {season.name} - {season.status}
          <Button title="Go" onPress={() => goToSeason(`${season.id}`)} />
        </Text>
      ))}
    </View>
  );
};

export default SeasonPicker;
