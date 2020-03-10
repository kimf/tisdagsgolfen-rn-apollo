import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Button,
  Text,
  Layout,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import seasonQuery from '../graphql/queries/seasonQuery';
import {
  seasonQuery as seasonQueryType,
  seasonQueryVariables,
} from '../../generatedTypes';

import CurrentSeason from '../components/CurrentSeason';
import { RootParamList } from '../Routes';
import storage from '../localStorage';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Home'>;
  route: RouteProp<RootParamList, 'Home'>;
};

const PlayIcon = style => <Icon {...style} name="arrow-right" />;

const Home: React.FC<Props> = ({ navigation, route }) => {
  const goToEvents = () => navigation.navigate('Events');
  const goPlay = () => navigation.navigate('PlayStack');

  const { loading, data } = useQuery<seasonQueryType, seasonQueryVariables>(
    seasonQuery,
    {
      variables: { id: route.params.seasonId },
    },
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TopNavigationAction onPress={goPlay} icon={PlayIcon} />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    storage.set('currentSeasonId', route.params.seasonId);
  }, [route.params.seasonId]);

  if (loading) {
    return null;
  }

  return (
    <Layout>
      <Text>Home Screen</Text>
      <CurrentSeason season={data.season} />
      <Button onPress={goToEvents}>Events</Button>
    </Layout>
  );
};

export default Home;
