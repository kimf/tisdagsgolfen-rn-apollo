import React from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { List, Text, Card } from '@ui-kitten/components';

import allSeasonsQuery from '../../graphql/queries/allSeasonsQuery';
import { allSeasonsQuery_seasons as Season } from '../../../generatedTypes';
import { RootParamList } from '../../Routes';
import ImageOverlay from '../../components/shared/ImageOverlay';
import styles from './styles';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Seasons'>;
};

export default ({ navigation }: Props): React.ReactElement => {
  const goToSeason = (seasonId: string) =>
    navigation.navigate('Season', { seasonId });
  const { loading, data } = useQuery<{ seasons: Season[] }>(allSeasonsQuery);

  const renderItem = (info: ListRenderItemInfo<Season>): React.ReactElement => (
    <Card
      onPress={() => goToSeason(`${info.item.id}`)}
      style={styles.item}
      activeOpacity={0.75}>
      <ImageOverlay
        style={styles.itemImage}
        source={{
          uri:
            info.item.photo ||
            'https://tisdagsgolfen.s3-eu-west-1.amazonaws.com/emptystate.png',
        }}>
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
