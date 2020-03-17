import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { List, Text, Card } from '@ui-kitten/components';

import allSeasonsQuery from '../../graphql/queries/allSeasonsQuery';
import {
  allSeasonsQuery as QSeasons,
  allSeasonsQuery_seasons as Season,
} from '../../../types/generatedTypes';
import { RootParamList } from '../../Routes';
import ImageOverlay from '../../components/shared/ImageOverlay';
import styles from './styles';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Seasons'>;
};

const emptyStateImg = require('../../assets/emptystate.png');

export default ({ navigation }: Props): React.ReactElement => {
  const goToSeason = (seasonId: string) =>
    navigation.navigate('Season', { seasonId });
  const { loading, data } = useQuery(allSeasonsQuery);

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

  if (loading) {
    return null;
  }

  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={data.seasons}
      renderItem={renderItem}
    />
  );
};
