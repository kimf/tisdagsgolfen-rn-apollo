import * as React from 'react';
import * as Kitten from '@ui-kitten/components';

import { PlayIcon } from '../components/icons';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../Routes';
import { useStore } from '../store';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Event'>;
  route: RouteProp<RootParamList, 'Event'>;
};

const Event: React.FC<Props> = ({ navigation, route }) => {
  const event = route.params.event;
  const { activeScoringSessionId } = useStore();

  const goSetupPlay = () =>
    navigation.navigate('PlayStack', {
      screen: 'PlayerPicker',
      params: { event },
    });

  const goPlay = () => null;
  // navigation.replace('PlayForRealStack', {
  //   screen: 'PlayerPicker',
  //   params: { event },
  // });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Kitten.Button
          size="small"
          appearance="outline"
          status={activeScoringSessionId ? 'success' : 'primary'}
          icon={PlayIcon}
          onPress={activeScoringSessionId ? goPlay : goSetupPlay}>
          {activeScoringSessionId ? `FORTSÄTT` : `GÅ MED`}
        </Kitten.Button>
      ),
    });
  }, [event]);

  return (
    <Kitten.Layout
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Kitten.Text>Ledartavla här....</Kitten.Text>
    </Kitten.Layout>
  );
};

export default Event;
