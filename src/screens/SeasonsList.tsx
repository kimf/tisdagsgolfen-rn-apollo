import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { List, Text, Card } from '@ui-kitten/components';

import allSeasonsQuery from '../graphql/queries/allSeasonsQuery';
import {
  seasonsQuery_seasons as Season,
  seasonsQuery,
} from '../../types/generatedTypes';
import { RootParamList } from '../Routes';
import ImageOverlay from '../components/shared/ImageOverlay';
import Saving from '../components/Saving';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Seasons'>;
};

const emptyStateImg = require('../assets/emptystate.png');

export default ({ navigation }: Props): React.ReactElement => {
  const goToSeason = (seasonId: string) =>
    navigation.navigate('Season', { seasonId });
  const { loading, data, refetch } = useQuery<seasonsQuery>(allSeasonsQuery);

  if (loading) {
    return null;
  }

  const renderItem = (info: ListRenderItemInfo<Season>): React.ReactElement => (
    <Card
      onPress={() => goToSeason(`${info.item.id}`)}
      style={styles.item}
      activeOpacity={0.75}>
      <ImageOverlay
        style={styles.itemImage}
        source={
          info.item.finalInfo
            ? {
                uri: info.item.finalInfo.photo,
              }
            : emptyStateImg
        }>
        <Text style={styles.itemTitle} category="h2" status="control">
          {info.item.name}
        </Text>
      </ImageOverlay>
    </Card>
  );

  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={data.seasons}
      renderItem={renderItem}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
    height: 160,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    height: 160,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
});
