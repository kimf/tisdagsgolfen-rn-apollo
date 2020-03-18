import * as React from 'react';
import * as Kitten from '@ui-kitten/components';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMutation } from '@apollo/client';

import { PlayIcon } from '../components/icons';
import { RootParamList } from '../Routes';
import { useStore } from '../store';
import { delEvent, delEventVariables } from '../../types/generatedTypes';
import deleteEventMutation from '../graphql/mutations/deleteEventMutation';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Event'>;
  route: RouteProp<RootParamList, 'Event'>;
};

const Event: React.FC<Props> = ({ navigation, route }) => {
  const event = route.params.event;
  const { activeScoringSessionId } = useStore();

  const [delEvent] = useMutation<delEvent, delEventVariables>(
    deleteEventMutation,
    {
      variables: { id: route.params.event.id },
      onCompleted() {
        navigation.goBack();
      },
    },
  );

  const goSetupPlay = () =>
    navigation.navigate('PlaySetupStack', {
      screen: 'PlayerPicker',
      params: { event },
    });

  const goPlay = () =>
    navigation.navigate('PlayStack', {
      scoringSessionId: activeScoringSessionId,
    });

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
      <Kitten.Button status="danger" onPress={() => delEvent()}>
        RADERA
      </Kitten.Button>
    </Kitten.Layout>
  );
};

export default Event;
