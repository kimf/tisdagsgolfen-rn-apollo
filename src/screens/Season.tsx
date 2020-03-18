import React from 'react';
import { useQuery } from '@apollo/client';
import * as Kitten from '@ui-kitten/components';
import { RouteProp, useFocusEffect } from '@react-navigation/native';

import storage from '../localStorage';
import seasonQuery from '../graphql/queries/seasonQuery';
import CurrentSeason from '../components/CurrentSeason';
import JoinActive from '../components/JoinActive';
import { PlayIcon } from '../components/icons';
import { RootParamList } from '../Routes';
import {
  seasonQuery as QSeasonQuery,
  seasonQueryVariables,
  SeasonStatus,
  EventStatus,
} from '../../types/generatedTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStore } from '../store';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Season'>;
  route: RouteProp<RootParamList, 'Season'>;
};

const Season: React.FC<Props> = ({ navigation, route }) => {
  const { activeScoringSessionId, setActiveScoringSessionId } = useStore();
  const goToEvents = () => navigation.navigate('Events');
  const goSetupPlay = () => navigation.navigate('PlaySetupStack');
  const goPlay = () =>
    navigation.navigate('PlayStack', {
      scoringSessionId: activeScoringSessionId,
    });

  const { loading, data, refetch } = useQuery<
    QSeasonQuery,
    seasonQueryVariables
  >(seasonQuery, {
    variables: { id: Number(route.params.seasonId) },
  });

  const activeEvents =
    data && data.season
      ? data.season.events.filter(e => e.status !== EventStatus.FINISHED)
      : [];

  React.useLayoutEffect(() => {
    if (activeScoringSessionId) {
      navigation.setOptions({
        headerRight: () => (
          <Kitten.Button
            size="small"
            appearance="outline"
            status="success"
            icon={PlayIcon}
            onPress={goPlay}>
            FORTSÄTT
          </Kitten.Button>
        ),
      });
    } else if (
      data?.season?.status === SeasonStatus.REGULAR &&
      activeEvents.length === 0
    ) {
      navigation.setOptions({
        headerRight: () => (
          <Kitten.Button
            size="small"
            appearance="outline"
            status="primary"
            icon={PlayIcon}
            onPress={goSetupPlay}>
            NY RUNDA
          </Kitten.Button>
        ),
      });
    }
  }, [navigation, data, activeScoringSessionId]);

  React.useEffect(() => {
    storage.set('currentSeasonId', route.params.seasonId);
  }, [route.params.seasonId]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [route.params.seasonId]),
  );

  if (loading) {
    return null;
  }

  return (
    <Kitten.Layout>
      {activeEvents.map(activeEvent => (
        <JoinActive
          key={activeEvent.id}
          activeEvent={activeEvent}
          onPress={() => navigation.navigate('Event', { event: activeEvent })}
        />
      ))}

      <CurrentSeason season={data.season} />
      <Kitten.Button appearance="ghost" onPress={goToEvents}>
        Show Events
      </Kitten.Button>
      {activeScoringSessionId && (
        <Kitten.Button
          status="danger"
          onPress={() => setActiveScoringSessionId(null)}>
          RADERA AKTIV SESSION
        </Kitten.Button>
      )}
    </Kitten.Layout>
  );
};

export default Season;
