import React from 'react';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import activeEventsQuery from '../graphql/queries/activeEventsQuery';

import { activeEventsQuery as activeEventQueryType } from '../../generatedTypes';
import { RootParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<RootParamList, 'Play'>;
};

const Play: React.FC<Props> = ({ navigation }) => {
  const { loading, data } = useQuery<activeEventQueryType>(activeEventsQuery);

  if (loading) {
    return null;
  }

  const activeEventId = data && data.events ? data.events[0].id : false;
  const joinActiveEvent = () =>
    navigation.navigate('NewScoringSession', { eventId: activeEventId });

  if (activeEventId) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Active Event Found</Text>
        <Button title="Join Event" onPress={joinActiveEvent} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Create new Event</Text>
      </View>
    );
  }
};

export default Play;
