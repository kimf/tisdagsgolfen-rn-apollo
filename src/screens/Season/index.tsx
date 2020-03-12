import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as Kitten from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import seasonQuery from '../../graphql/queries/seasonQuery';
import {
  seasonQuery as seasonQueryType,
  seasonQueryVariables,
} from '../../../generatedTypes';

import CurrentSeason from '../../components/CurrentSeason';
import JoinActive from '../../components/JoinActive';
import { RootParamList } from '../../Routes';
import storage from '../../localStorage';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Season'>;
  route: RouteProp<RootParamList, 'Season'>;
};

const PlayIcon = style => <Kitten.Icon {...style} name="arrow-right" />;

const Season: React.FC<Props> = ({ navigation, route }) => {
  const goToEvents = () => navigation.navigate('Events');
  const goPlay = () => navigation.navigate('PlayStack');
  const joinActiveEvent = () =>
    navigation.navigate('SetupScoringSession', { eventId: activeEventId });

  const { loading, data } = useQuery<seasonQueryType, seasonQueryVariables>(
    seasonQuery,
    {
      variables: { id: route.params.seasonId },
    },
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Kitten.Button
          size="small"
          appearance="outline"
          status="primary"
          icon={PlayIcon}
          onPress={goPlay}>
          NY RUNDA
        </Kitten.Button>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    storage.set('currentSeasonId', route.params.seasonId);
  }, [route.params.seasonId]);

  if (loading) {
    return null;
  }

  const activeEvent =
    data.season.activeEvents && data.season.activeEvents.length > 0
      ? data.season.activeEvents[0]
      : null;

  return (
    <Kitten.Layout>
      {activeEvent && (
        <JoinActive activeEvent={activeEvent} onJoin={joinActiveEvent} />
      )}
      <CurrentSeason season={data.season} />
      <Kitten.Button appearance="ghost" onPress={goToEvents}>
        Show Events
      </Kitten.Button>
    </Kitten.Layout>
  );
};

export default Season;
