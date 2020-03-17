import React from 'react';
import { useQuery } from '@apollo/client';
import * as Kitten from '@ui-kitten/components';
import { RouteProp } from '@react-navigation/native';

import seasonQuery from '../../graphql/queries/seasonQuery';
import CurrentSeason from '../../components/CurrentSeason';
import JoinActive from '../../components/JoinActive';
import { RootParamList } from '../../Routes';
import storage from '../../localStorage';
import {
  seasonQuery as QSeasonQuery,
  seasonQueryVariables,
  SeasonStatus,
  EventStatus,
} from '../../../types/generatedTypes';

type Props = {
  navigation: any; // TODO: StackNavigationProp<RootParamList, 'Season'>;
  route: RouteProp<RootParamList, 'Season'>;
};

const PlayIcon = style => <Kitten.Icon {...style} name="arrow-right" />;

const Season: React.FC<Props> = ({ navigation, route }) => {
  const goToEvents = () => navigation.navigate('Events');
  const goPlay = () => navigation.navigate('PlayStack');

  const { loading, data } = useQuery<QSeasonQuery, seasonQueryVariables>(
    seasonQuery,
    {
      variables: { id: Number(route.params.seasonId) },
    },
  );

  React.useLayoutEffect(() => {
    if (data?.season?.status === SeasonStatus.REGULAR) {
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
    }
  }, [navigation, data]);

  React.useEffect(() => {
    storage.set('currentSeasonId', route.params.seasonId);
  }, [route.params.seasonId]);

  if (loading) {
    return null;
  }

  const activeEvents = data.season.events.filter(
    e => e.status !== EventStatus.FINISHED,
  );

  return (
    <Kitten.Layout>
      {activeEvents.map(activeEvent => (
        <JoinActive
          key={activeEvent.id}
          activeEvent={activeEvent}
          onJoin={() =>
            navigation.navigate('PlayStack', {
              screen: 'PlayerPicker',
              params: {
                event: {
                  id: activeEvent.id,
                  special: activeEvent.special,
                  type: activeEvent.type,
                  scoring: activeEvent.scoring,
                  course: {
                    club: activeEvent.course.club,
                    name: activeEvent.course.name,
                  },
                },
              },
            })
          }
        />
      ))}

      <CurrentSeason season={data.season} />
      <Kitten.Button appearance="ghost" onPress={goToEvents}>
        Show Events
      </Kitten.Button>
    </Kitten.Layout>
  );
};

export default Season;
