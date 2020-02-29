import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';

import allSeasonsQuery from '../graphql/queries/allSeasonsQuery';
import { allSeasonsQuery_seasons as Season } from '../../generatedTypes';
import { RootParamList } from '../App';
import { TouchableHighlight } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 16,
    paddingBottom: 24,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  innerRow: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});

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
    <ScrollView>
      {data.seasons.map((season, i) => (
        <TouchableHighlight
          key={i}
          onPress={() => goToSeason(`${season.id}`)}
          underlayColor="rgba(255, 255, 255, 0.5)"
          style={[
            styles.row,
            { borderBottomWidth: i === data.seasons.length - 1 ? 0 : 1 },
          ]}>
          <View style={styles.innerRow}>
            <Text style={styles.title}>
              {season.name} - {season.status}
            </Text>
            <Image
              style={styles.image}
              source={{ uri: 'https://placekitten.com/g/300/200' }}
            />
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};

export default SeasonPicker;
