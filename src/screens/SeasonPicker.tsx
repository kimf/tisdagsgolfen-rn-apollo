import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Text, Card } from '@ui-kitten/components';

import allSeasonsQuery from '../graphql/queries/allSeasonsQuery';
import { allSeasonsQuery_seasons as Season } from '../../generatedTypes';
import { RootParamList } from '../Routes';

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  image: {
    flex: 1,
    height: 140,
    resizeMode: 'cover',
  },
  headerText: {
    marginTop: 16,
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
    <Layout level="4">
      <ScrollView style={{ width: '100%', height: '100%' }}>
        {data.seasons.map((season, i) => (
          <Card
            key={i}
            onPress={() => goToSeason(`${season.id}`)}
            style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: 'https://placekitten.com/g/600/200' }}
            />
            <Text style={styles.headerText} category="label">
              {`${season.name} - ${season.status}`}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </Layout>
  );
};

export default SeasonPicker;
